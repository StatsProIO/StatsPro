<?php

namespace App\Http\Controllers;
use App\Helpers\VisitorIdHelper;
use App\Models\Domain;
use App\Models\DomainBlacklistIp;
use App\Models\Event;
use App\Repositories\EventRepository;
use App\Repositories\EventSaltRepository;
use App\Utility\EventSaver;
use App\Utility\TimeRange;
use App\Utility\TimeRangeInfo;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Carbon\CarbonInterval;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Sinergi\BrowserDetector\Browser;

class EventsController extends Controller
{
    public function postEvent(Request $request) {
        try {

            $requestAll = $request->all();

            $domain = null;
            $requestDomain = $requestAll[0]['domain'] ?? $request->domain ?? null;
            if ($requestDomain) { // the domain in the first event is what all events will be associated with
                $domain = Domain::where('domain_name', $requestDomain)->first();
                if ($domain === null) {
                    return response()->json(['message' => 'Domain ' . $requestDomain . ' not found'], 404);
                }

                //don't record events for blacklisted IPs
                $domainBlacklistedIps = DomainBlacklistIp::where('domain_id', $domain->id)->pluck('ip')->all();

                $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : null;
                if (in_array($clientIp, $domainBlacklistedIps)) {
                    return response()->json(['message' => 'IP blacklisted'], 200);
                }
            }

            $source = null;
            if ($request->referrer != null) {
                $parsedUrl = parse_url($request->referrer);
                if ($parsedUrl !== false) {
                    $source = $parsedUrl['host'];
                }
            }

            $userAgent = $request->server('HTTP_USER_AGENT');
            $parsedUserAgent = new \WhichBrowser\Parser($userAgent);

            $visitorId = VisitorIdHelper::getVisitorId($request);

            $lastEvent = null;
            $lastPageviewEvent = null;

            // handle requests from legacy script by checking if its a list, if not convert to list
            if (!array_is_list($requestAll)) {
                $requestAll = [$requestAll];
            }

            foreach ($requestAll as $eventPayload) {
                $lastEvent = $this->saveEventFromPayload($visitorId, $domain, $eventPayload, $userAgent, $parsedUserAgent, $source);
                if ($lastEvent->event_name === 'pageview') {
                    $lastPageviewEvent = $lastEvent;
                }
            }

            // if there are multiple events, return the ID of the pageview so we can track time on page
            // otherwise, just return the last event id
            if ($lastPageviewEvent) {
                return ['id' => $lastPageviewEvent->id];
            } else {
                return ['id' => $lastEvent->id];
            }

        } catch (\Throwable $t) {
            Log::error("Error collecting event!");
            report($t);
            abort(500);
        }
    }

    private function saveEventFromPayload($visitorId, $domain, $request, $userAgent, $parsedUserAgent, $source)
    {
        $event = new Event;
        $event->visitor_id = $visitorId;
        $event->domain_id = $domain ? $domain->id : null;
        $event->short_link_id = $request['short_link_id'] ?? null;
        $event->event_name = $request['event_name'];
        $event->user_agent = $userAgent;
        $event->location_href = $request['location_href'];
        $event->host = $request['location_host'];
        $event->path = $request['location_pathname'] ?? null;
        $event->referrer = $request['referrer'] ?? null;
        $event->source = $source;
        $event->inner_width = $request['inner_width'] ?? null;
        $event->language = $request['lang'] ?? null;
        $event->country = \App\Helpers\Helper::getCountry($request['client_time_zone']);
        $event->region = \App\Helpers\Helper::getRegion($request['client_time_zone']);
        $event->browser = (new Browser())->getName();
        $event->device = $parsedUserAgent->device->type ?? null;
        $event->os = $parsedUserAgent->os->name ?? null;
        $event->time_zone = $request['client_time_zone'] ?? null;
        $event->client_time = $request['client_time'] ?? null;
        $event->page_load_time = max($request['page_load_time'] ?? 0, 0);
        $event->custom_event_name = $request['custom_event_name'] ?? null;

        if (array_key_exists('query_params', $request)) {
            $event->keyword = $request['query_params']['keyword'] ?? null;
            $event->q = $request['query_params']['q'] ?? null;
            $event->ref = $request['query_params']['ref'] ?? null;
            $event->utm_campaign = $request['query_params']['utm_campaign'] ?? null;
            $event->utm_content = $request['query_params']['utm_content'] ?? null;
            $event->utm_medium = $request['query_params']['utm_medium'] ?? null;
            $event->utm_source = $request['query_params']['utm_source'] ?? null;
            $event->utm_term = $request['query_params']['utm_term'] ?? null;
        }
        $event->save();
        return $event;
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

    public function getDashboardEventsTopRowByDomainName (Request $request, $domainName = '') {
        if (!Auth::user() || $domainName === '') { ///not logged in or no domain name
            $domainName = 'demo.com';
            $domain = Domain::where('domain_name', $domainName)->firstOrFail();
        } else { //otherwise get the domain the user asked for
            $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        }

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

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
            'unique_visitors_count' => $visitorsCount,
            'unique_visitors_count_difference_rate' => $comparisonVisitorsCount == 0 ? 100 : (($visitorsCount - $comparisonVisitorsCount)/$comparisonVisitorsCount),

            'pageviews_count' => $pageviewCount,
            'pageviews_count_difference_rate' => $comparisonPageviewsCount == 0 ? 100 : (($pageviewCount - $comparisonPageviewsCount)/$comparisonPageviewsCount),

            'bounce_rate' => round($bounceRate, 1) . '%',
            'bounce_rate_difference_rate' => $comparisonBounceRate == 0 ? 100 : (($bounceRate - $comparisonBounceRate)/$comparisonBounceRate),

            'visit_duration' => CarbonInterval::seconds($visitDuration)->cascade()->forHumans([CarbonInterface::DIFF_ABSOLUTE], true),
            'visit_duration_difference_rate' => $comparisonVisitDuration == 0 ? 100 : (($visitDuration - $comparisonVisitDuration)/$comparisonVisitDuration),

            'comparison_interval_description_suffix' => $timeRangeInfo->getComparisonIntervalDescriptionSuffix()
        ];
    }

    public function getDashboardEventsAboveTheFoldByDomainName (Request $request, $domainName = '') {
        if (!Auth::user() || $domainName === '') { //not logged in and no domain name
            $domainName = 'demo.com';
            $domain = Domain::where('domain_name', $domainName)->firstOrFail();
        } else { //otherwise get the domain the user asked for
            $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        }

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        $timeBuckets = $this->getTimeBuckets($timeRangeInfo);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'pageviews' => EventRepository::getPageviews($timeRangeInfo, $domain, $timeBuckets),
            'visitors' => EventRepository::getVisitors($timeRangeInfo, $domain, $timeBuckets),
            'realtime' => EventRepository::getRealTime($domain),
        ];
    }

    public function getDashboardEventsBelowTheFoldByDomainName (Request $request, $domainName = '') {
        if (!Auth::user() || $domainName === '') { //not logged in and no domain name
            $domainName = 'demo.com';
            $domain = Domain::where('domain_name', $domainName)->firstOrFail();
        } else { //otherwise get the domain the user asked for
            $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        }

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        return [
            'top_sources' => EventRepository::getTopSources($timeRangeInfo->getInterval(), $domain),
            'top_pages' => EventRepository::getTopPages($timeRangeInfo->getInterval(), $domain),
            'devices' => EventRepository::getDevices($timeRangeInfo->getInterval(), $domain),
            'locations' => EventRepository::getLocationsForMap($timeRangeInfo->getInterval(), $domain),
        ];
    }

    public function getEventsRealTimeByDomain($domainName = '') {
        if (!Auth::user() || $domainName === '') { //not logged in and no domain name
            $domainName = 'demo.com';
            $domain = Domain::where('domain_name', $domainName)->firstOrFail();
        } else { //otherwise get the domain the user asked for
            $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        }

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

    public function getEventsAudienceTimeByDomain($domainName, Request $request) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'devices' => EventRepository::getDevices($timeRangeInfo->getInterval(), $domain),
            'locations' => EventRepository::getLocationsForList($timeRangeInfo->getInterval(), $domain),
            'browsers' => EventRepository::getBrowsers($timeRangeInfo->getInterval(), $domain),
            'languages' => EventRepository::getLanguages($timeRangeInfo->getInterval(), $domain),
            'oses' => EventRepository::getOses($timeRangeInfo->getInterval(), $domain),
        ];
    }

    public function getEventsBehaviorTimeByDomain($domainName, Request $request) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        $timeBuckets = $this->getTimeBuckets($timeRangeInfo);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'bounceRate' => EventRepository::getBounceRate($timeRangeInfo, $timeRangeInfo->getInterval(), $domain, $timeBuckets),
            'timeOnPage' => EventRepository::getTimeOnPage($timeRangeInfo, $timeRangeInfo->getInterval(), $domain, $timeBuckets),
            'busiestDayOfWeek' => EventRepository::getBusiestDayOfWeek($timeRangeInfo->getInterval(), $domain),
            'busiestHourOfDay' => EventRepository::getBusiestHourOfDay($timeRangeInfo->getInterval(), $domain),
            'timeTrends' => EventRepository::getTimeTrends($timeRangeInfo->getInterval(), $domain),
        ];
    }

    public function getEventsAcquisitionByDomain($domainName, Request $request) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'topSources' => EventRepository::getTopSources($timeRangeInfo->getInterval(), $domain),
            'topUTMSources' => EventRepository::getTopUTMSources($timeRangeInfo->getInterval(), $domain),
            'topEntryPages' => EventRepository::getTopEntryPages($timeRangeInfo->getInterval(), $domain)
        ];
    }

    public function getEventsSessionsByDomain($domainName, Request $request) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        $sessions = EventRepository::getSessions($timeRangeInfo, $domain);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'sessions' => $sessions
        ];
    }

    public function getLatestEventByDomainAndVisitorId($domainName, $visitorId, Request $request) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();

        $event = EventRepository::getLatestEvent($domain, $visitorId);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'event' => $event
        ];
    }

    public function getEventsPerformanceByDomain($domainName, Request $request) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo($range);

        $timeBuckets = $this->getTimeBuckets($timeRangeInfo);

        return [
            'domains' => Auth::user() ? Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name') : ['demo.com'],
            'pageLoadTime' => EventRepository::getPageLoadTime($timeRangeInfo, $timeRangeInfo->getInterval(), $domain, $timeBuckets),
        ];
    }
}
