<?php

namespace App\Http\Controllers;
use Log;
use App\Models\Event;
use App\Models\Domain;
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

class EventsController extends Controller
{
    public function postEvent(Request $request) {
        $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : '';

        $userAgent = $request->server('HTTP_USER_AGENT');

        //TODO: include a salt
        $visitorHash = \Hash::make(hash('sha256', json_encode([$clientIp, $userAgent, $request->location_host ])));
        $requestHash = \Hash::make(hash('sha256', json_encode([$clientIp, $userAgent, $request->location_host, $request->location_pathname ])));

        $domain = Domain::where('domain_name', $request->domain)->first();
        //TODO: determine if this is a subsequest request for the same visitor_hash in the last 30 minutes
            //TODO: if yes, update the previous request with an exit time

        $systemInfo = Helper::systemInfo($userAgent);

        $event = new Event;
        $event->domain_id = $domain->id;
        $event->event_name = $request->event_name;
        $event->ip_address = $clientIp;
        $event->user_agent = $userAgent;
        $event->request_hash = '';
        $event->visitor_id = '';
        $event->is_unique = false; //TODO
        $event->location_href = $request->location_href;
        $event->host = $request->location_host;
        $event->path = $request->location_pathname;
        $event->referrer = $request->referrer;
        $event->inner_width = $request->inner_width;
        $event->language = $request->lang;
        $event->country = Helper::getCountry($request->client_time_zone);
        $event->region = Helper::getRegion($request->client_time_zone);
        $event->browser = (new Browser())->getName();
        $event->device = $systemInfo['device'];
        $event->os = $systemInfo['os'];
        $event->time_zone = $request->client_time_zone;
        $event->client_time = $request->client_time;
        $event->enter_time = Carbon::now();
        $event->exit_time = null;
        $event->save();

        return $event;
    }

    public function postTimeOnPage(Request $request) {
        DB::table('events')
            ->where('id',$request->id) 
            ->increment('time_on_page_seconds', 15);

        return 'SUCCESS';
    }

    public function getTrackerPixel(Request $request) {
        $domain = Domain::where('domain_name', $request->domain)->first();

        $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : '';

        $userAgent = $request->server('HTTP_USER_AGENT');

        //TODO: include a salt
        $visitorHash = \Hash::make(hash('sha256', json_encode([$clientIp, $userAgent, $request->location_host ])));
        $requestHash = \Hash::make(hash('sha256', json_encode([$clientIp, $userAgent, $request->location_host, $request->location_pathname ])));

        $event = new Event;
        $event->domain_id = $domain->id;
        $event->event_name = 'pixel_pageview';
        $event->ip_address = $clientIp;
        $event->user_agent = $userAgent;
        $event->visitor_hash = $visitorHash;
        $event->request_hash = $requestHash;
        $event->is_unique = false; //TODO
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
        $event->enter_time = Carbon::now();
        $event->exit_time = null;
        $event->save();

        return response(base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='))
            ->header('content-type', 'image/gif')
            ->header ("Pragma-directive", "no-cache")
            ->header ("Cache-directive", "no-cache")
            ->header ("Cache-control", "no-cache")
            ->header ("Pragma", "no-cache")
            ->header ("Expires", "0");
    }

    function rangeStringToQueryInfo(string $range) {
        //TODO: make this into an object
        switch ($range) {
            case '24h':
                return [
                    'interval' => ['start' => Carbon::now()->subHours(24)->toDateTimeString(), 'end' => Carbon::now()->toDateTimeString()],
                    'groupBy' => "date_trunc('hour', enter_time)",
                    'bucketSizeHours' => 1
                ];
                break;
            case '7d':
                return [
                    'interval' => ['start' => Carbon::now()->subDays(7)->toDateString(), 'end' => Carbon::now()->toDateString()],
                    'groupBy' => "enter_time::date",
                    'bucketSizeHours' => 24
                ];
                break;
            case '30d':
                return [
                    'interval' => ['start' => Carbon::now()->subDays(30)->toDateString(), 'end' => Carbon::now()->toDateString()],
                    'groupBy' => "enter_time::date",
                    'bucketSizeHours' => 24
                ];
                break;
            case 'month-to-date':
                return [
                    'interval' => ['start' => Carbon::now()->startOfMonth()->toDateString(), 'end' => Carbon::now()->toDateString()],
                    'groupBy' => "enter_time::date",
                    'bucketSizeHours' => 24
                ];
                break;
            case 'last-month':
                return [
                    'interval' => ['start' => Carbon::now()->startOfMonth()->subMonthsNoOverflow(1)->toDateString(), 'end' =>Carbon::now()->subMonthsNoOverflow(1)->endOfMonth()->toDateString()],
                    'groupBy' => "enter_time::date",
                    'bucketSizeHours' => 24
                ];
                break;
            case 'year-to-date':
                return [
                    'interval' => ['start' => Carbon::now()->firstOfYear()->toDateString(), 'end' =>Carbon::now()->toDateString()],
                    'groupBy' => "enter_time::date",
                    'bucketSizeHours' => 24
                ];
                break;
            case '12m':
                return [
                    'interval' => ['start' => Carbon::now()->subMonthsNoOverflow(12)->toDateString(), 'end' =>Carbon::now()->toDateString()],
                    'groupBy' => "enter_time::date",
                    'bucketSizeHours' => 24
                ];
                break;
            case 'all-time':
                return [
                    'interval' => ['start' => Carbon::create(2022, 1, 1, 0, 0, 0)->toDateString(), 'end' =>Carbon::now()->toDateString()],
                    'groupBy' => "enter_time::date",
                    'bucketSizeHours' => 24
                ];
                break;
        }
    }

    public function getTimeBuckets($timeRangeInfo) {
        $timeBuckets = [];
        $currentBucket = new Carbon($timeRangeInfo['interval']['start']);

        if($timeRangeInfo['bucketSizeHours'] === 1) {
            $currentBucket->minute = 0;
            $currentBucket->second = 0;
        }
        while($currentBucket <= new Carbon($timeRangeInfo['interval']['end'] )) {
            $timeBuckets[$timeRangeInfo['bucketSizeHours'] === 1 ? $currentBucket->toDateTimeString() : $currentBucket->toDateString()] = 0;
            $currentBucket->addHour($timeRangeInfo['bucketSizeHours']);
        }

        return $timeBuckets;
    }

    public function getEvents (Request $request) {
        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = $this->rangeStringToQueryInfo($range);

        //TODO: need to validate that the domain belongs to the user
        if($request->has('domain')) {
            $domain = Domain::firstWhere('domain_name', $request->input('domain'));
        } else {
            $domain = Domain::firstWhere('user_id', Auth::user()->id);
        }

        $timeBuckets = $this->getTimeBuckets($timeRangeInfo);

        $bounceCount = EventRepository::getBounceCount($timeRangeInfo, $domain);
        $visitorsCount = EventRepository::getVisitorsCount($timeRangeInfo, $domain);

        $bounceRate = $visitorsCount === 0 ? 0 : $bounceCount/$visitorsCount;
        
        return [
            'domains' => Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name'),
            'time_buckets' => $timeBuckets,
            'pageviews' => EventRepository::getPageviews($timeRangeInfo, $domain, $timeBuckets),
            'visitors' => EventRepository::getVisitors($timeRangeInfo, $domain, $timeBuckets),
            'realtime' => EventRepository::getRealTime($domain),
            'top_sources' => EventRepository::getTopSources($timeRangeInfo, $domain),
            'top_pages' => EventRepository::getTopPages($timeRangeInfo, $domain),
            'devices' => EventRepository::getDevices($timeRangeInfo, $domain),
            'locations' => EventRepository::getLocations($timeRangeInfo, $domain),
            'unique_visitors_count' => $visitorsCount,
            'pageviews_count' => EventRepository::getPageviewsCount($timeRangeInfo, $domain),
            'bounce_rate' => ($bounceRate * 100) . '%',
            'visit_duration' => EventRepository::getVisitDuration($timeRangeInfo, $domain)
        ];
    }

    public function getEventsRealTime(Request $request) {
        if($request->has('domain')) {
            $domain = Domain::firstWhere('domain_name', $request->input('domain'));
        } else {
            $domain = Domain::firstWhere('user_id', Auth::user()->id);
        }

        return EventRepository::getRealTime($domain);
    }

    public function getEventStatus($domainName) {
        //TODO: need to validate that the domain belongs to the user
        //TODO: change firstdomain to the users first domain
        
        $domain = Domain::where('domain_name', $domainName)->first();
        
        $event = Event::where('domain_id', $domain->id)->limit(1)->get();

        

        if(count($event) > 0) {
            return "SUCCESS";
        } else {
            return "NO_DATA";
        }
    }
}
