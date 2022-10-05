<?php

namespace App\Http\Controllers;
use Log;
use App\Models\Event;
use App\Models\Domain;
use App\Models\DomainBlacklistIp;
use Helper;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\Auth;
use Sinergi\BrowserDetector\Browser;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Repositories\EventRepository;
use App\Utility\TimeRangeInfo;
use App\Utility\TimeRange;

class EventsController extends Controller
{
    public function postEvent(Request $request) {
        $userAgent = $request->server('HTTP_USER_AGENT');

        $domain = Domain::where('domain_name', $request->domain)->first();
        if($domain === null) {
            return response()->json(['message' => 'Domain ' . $request->domain . ' not found'], 404);
        }

        //don't record events for blacklisted IPs
        $domainBlacklistedIps = DomainBlacklistIp::where('domain_id', $domain->id)->pluck('ip')->all();

        $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : null;
        if (in_array($clientIp, $domainBlacklistedIps)) {
            return response()->json(['message' => 'IP blacklisted'], 403);
        }

        $source = null;
        if($request->referrer != null) {
            $parsedUrl = parse_url($request->referrer);
            if($parsedUrl !== false) {
                $source = $parsedUrl['host'];
            }
        }

        $parsedUserAgent = new \WhichBrowser\Parser($userAgent);

        $event = new Event;
        $event->domain_id = $domain->id;
        $event->event_name = $request->event_name;
        $event->user_agent = $userAgent;
        $event->location_href = $request->location_href;
        $event->host = $request->location_host;
        $event->path = $request->location_pathname;
        $event->referrer = $request->referrer;
        $event->source = $source;
        $event->inner_width = $request->inner_width;
        $event->language = $request->lang;
        $event->country = Helper::getCountry($request->client_time_zone);
        $event->region = Helper::getRegion($request->client_time_zone);
        $event->browser = (new Browser())->getName();
        $event->device = $parsedUserAgent->device->type;
        $event->os = $parsedUserAgent->os->name;
        $event->time_zone = $request->client_time_zone;
        $event->client_time = $request->client_time;

        if ($request->query_params) {
            $event->keyword = $request->query_params['keyword'] ?? null;
            $event->q = $request->query_params['q'] ?? null;
            $event->ref = $request->query_params['ref'] ?? null;
            $event->utm_campaign = $request->query_params['utm_campaign'] ?? null;
            $event->utm_content = $request->query_params['utm_content'] ?? null;
            $event->utm_medium = $request->query_params['utm_medium'] ?? null;
            $event->utm_source = $request->query_params['utm_source'] ?? null;
            $event->utm_term = $request->query_params['utm_term'] ?? null;
        }

        $event->save();

        return ['id' => $event->id];
    }

    public function postTimeOnPage(Request $request) {
        DB::table('events')
            ->where('id',$request->id)
            ->increment('time_on_page_seconds', 15, ['updated_at' => Carbon::now()]);

        return ['status' => 'SUCCESS'];
    }

    public function getTrackerPixel(Request $request) {
        $domain = Domain::where('domain_name', $request->domain)->first();

        $userAgent = $request->server('HTTP_USER_AGENT');

        $event = new Event;
        $event->domain_id = $domain->id;
        $event->event_name = 'pixel_pageview';
        $event->user_agent = $userAgent;
        $event->location_href =  $request->server('HTTP_REFERER') ?? '';
        $event->host = '';
        $event->path = '';
        $event->referrer = '';
        $event->inner_width = 0;
        $event->language = 0;
        $event->country = '';
        $event->region = '';
        $event->browser = '';
        $event->device = '';
        $event->os = '';
        $event->time_zone = '';
        $event->client_time = Carbon::now();
        $event->save();

        return response(base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='))
            ->header('content-type', 'image/gif')
            ->header ("Pragma-directive", "no-cache")
            ->header ("Cache-directive", "no-cache")
            ->header ("Cache-control", "no-cache")
            ->header ("Pragma", "no-cache")
            ->header ("Expires", "0");
    }



    public function getTimeBuckets(TimeRangeInfo $timeRangeInfo) {
        $timeBuckets = [];
        $currentBucket = new Carbon($timeRangeInfo->getInterval()->getStart());

        if($timeRangeInfo->getBucketSizeHours() === 1) {
            $currentBucket->minute = 0;
            $currentBucket->second = 0;
        }
        while($currentBucket <= new Carbon($timeRangeInfo->getInterval()->getEnd() )) {
            $timeBuckets[$timeRangeInfo->getBucketSizeHours() === 1 ? $currentBucket->toDateTimeString() : $currentBucket->toDateString()] = 0;
            $currentBucket->addHour($timeRangeInfo->getBucketSizeHours());
        }

        return $timeBuckets;
    }

    public function getDemoEvents(Request $request) {
        $domain = Domain::where('domain_name', 'demo.com')->firstOrFail();
        return $this->getEvents($domain, $request);
    }

    public function getEventsByDomainName ($domainName, Request $request) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        return $this->getEvents($domain, $request);
    }

   private function getEvents ($domain, Request $request) {
        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        $timeBuckets = $this->getTimeBuckets($timeRangeInfo);

        $bounceCount = EventRepository::getBounceCount($timeRangeInfo->getInterval(), $domain);
        $comparisonBounceCount = EventRepository::getBounceCount($timeRangeInfo->getComparisonInterval(), $domain);

        $visitorsCount = EventRepository::getVisitorsCount($timeRangeInfo->getInterval(), $domain);
        $comparisonVisitorsCount = EventRepository::getVisitorsCount($timeRangeInfo->getComparisonInterval(), $domain);

        $bounceRate = $visitorsCount === 0 ? 0 : ($bounceCount/$visitorsCount)*100;
        $comparisonBounceRate = $comparisonVisitorsCount === 0 ? 0 : ($comparisonBounceCount/$comparisonVisitorsCount)*100;

        $pageviewCount = EventRepository::getPageviewsCount($timeRangeInfo->getInterval(), $domain);
        $comparisonPageviewsCount = EventRepository::getPageviewsCount($timeRangeInfo->getComparisonInterval(), $domain);

        $visitDuration = EventRepository::getVisitDuration($timeRangeInfo->getInterval(), $domain);
        $comparisonVisitDuration = EventRepository::getVisitDuration($timeRangeInfo->getComparisonInterval(), $domain);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'time_buckets' => $timeBuckets,
            'pageviews' => EventRepository::getPageviews($timeRangeInfo, $domain, $timeBuckets),
            'visitors' => EventRepository::getVisitors($timeRangeInfo, $domain, $timeBuckets),
            'realtime' => EventRepository::getRealTime($domain),
            'top_sources' => EventRepository::getTopSources($timeRangeInfo->getInterval(), $domain),
            'top_pages' => EventRepository::getTopPages($timeRangeInfo->getInterval(), $domain),
            'devices' => EventRepository::getDevices($timeRangeInfo->getInterval(), $domain),
            'locations' => EventRepository::getLocations($timeRangeInfo->getInterval(), $domain),
            'unique_visitors_count' => $visitorsCount,
            'unique_visitors_count_difference_rate' => $comparisonVisitorsCount == 0 ? 100 : (($visitorsCount - $comparisonVisitorsCount)/$comparisonVisitorsCount),
            'pageviews_count' => $pageviewCount,
            'pageviews_count_difference_rate' => $comparisonPageviewsCount == 0 ? 100 : (($pageviewCount - $comparisonPageviewsCount)/$comparisonPageviewsCount),
            'bounce_rate' => round($bounceRate, 1) . '%',
            'bounce_rate_difference_rate' => $comparisonBounceRate == 0 ? 100 : (($bounceRate - $comparisonBounceRate)/$comparisonBounceRate),
            'visit_duration' => CarbonInterval::seconds($visitDuration)->cascade()->forHumans([CarbonInterface::DIFF_ABSOLUTE], true),
            'visit_duration_difference_rate' => $comparisonVisitDuration == 0 ? 100 : (($visitDuration - $comparisonVisitDuration)/$comparisonVisitDuration),
            'comparison_visit_duration' => EventRepository::getVisitDuration($timeRangeInfo->getComparisonInterval(), $domain),
            'comparison_interval_description_suffix' => $timeRangeInfo->getComparisonIntervalDescriptionSuffix()
        ];
    }

    public function getDemoEventsRealTime() {
        $domain = Domain::where('domain_name', 'demo.com')->firstOrFail();
        return EventRepository::getRealTime($domain);
    }

    public function getEventsRealTimeByDomain($domain) {
        $domain = Domain::where('domain_name', $domain)->where('user_id', Auth::user()->id)->firstOrFail();
        return EventRepository::getRealTime($domain);
    }

    public function getEventStatus($domainName) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        $event = Event::where('domain_id', $domain->id)->limit(1)->get();

        if(count($event) > 0) {
            return "SUCCESS";
        } else {
            return "NO_DATA";
        }
    }
}
