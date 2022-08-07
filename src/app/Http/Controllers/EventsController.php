<?php

namespace App\Http\Controllers;
use Log;
use App\Models\Event;
use App\Models\Domain;
use Helper;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Sinergi\BrowserDetector\Browser;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;




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
            
        //TODO: insert the event


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

    public function getVisitorId(Request $request) {

        if($request->headers->has('If-None-Match')) {
            $uuid = \Ramsey\Uuid\Uuid::fromString(str_replace('"', '', $request->header('If-None-Match')));
            $uuidCreatedAt = new Carbon($uuid->getDateTime());
            $expirationDate = $uuidCreatedAt->addMinutes(24*60*60);

            $now = new Carbon();
            if($now->greaterThan($expirationDate)) {   
                return $this->newVisitorIdResponse();
            } else {
                return response('', 304);
            } 
        } else {
            return $this->newVisitorIdResponse();
        }
    }

    function newVisitorIdResponse() {
        $sessionUuid = Uuid::uuid1()->toString();
        return response(['value' => $sessionUuid], 200)
                  ->header('ETag', "\"$sessionUuid\"")
                  ->header('Content-Type', 'application/json')
                  ->header('Cache-Control', 'private, max-age=' . 24*60*60);
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

    

    public function getEvents (Request $request) {

        $range = $request->has('range') ? $request->input('range') : '24h';
        $timeRangeInfo = $this->rangeStringToQueryInfo($range);

        //TODO: need to validate that the domain belongs to the user
        //TODO: change firstdomain to the users first domain
        $domainString = $request->has('domain') ? $request->input('domain') : 'firstdomain.com';

        $domain = Domain::firstWhere('domain_name', $domainString);
        
        $pageviews = DB::select(
            DB::raw("SELECT {$timeRangeInfo['groupBy']} as date, count(*)
                FROM events 
                WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                GROUP BY {$timeRangeInfo['groupBy']}
                "), 
            array('domain' => $domain->id)
            );

        $pageviewsCountByDate = [];
        foreach($pageviews as $pageview) {
            $pageviewsCountByDate[$pageview->date] = $pageview->count;
        }
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

        $pageviews = array_merge($timeBuckets, $pageviewsCountByDate);
        uksort($pageviews,  function ($dt1, $dt2) {return strtotime($dt1) - strtotime($dt2);});

        $visitors =  DB::select(
            DB::raw("SELECT {$timeRangeInfo['groupBy']} as date, count(*)
                FROM events 
                WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                GROUP BY {$timeRangeInfo['groupBy']}
                "), 
            array('domain' => $domain->id)
            );

        $realTimeInterval = [
                    Carbon::now()->subMinutes(5)->toDateTimeString(),
                    Carbon::now()->toDateTimeString()
                ];
        //find the pageviews from the last 5 minutes, deduplicate pageviews by the same visitor
        $realTime = DB::select( DB::raw("SELECT distinct on (visitor_hash) visitor_hash, path, enter_time
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '$realTimeInterval[0]' AND enter_time <= '$realTimeInterval[1]'
                                        ORDER BY visitor_hash, enter_time desc"), 
                                array('domain' => $domain->id)
                            );
        $topSources = DB::select( DB::raw("SELECT source as label, count(*) as count
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                        GROUP BY source
                                        ORDER BY count DESC
                                        LIMIT 8
                                        "), 
                                array('domain' => $domain->id)
                            );
        
     
        $topPages = DB::select( DB::raw("SELECT path as label, count(*) as count
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                        GROUP BY path
                                        ORDER BY count DESC
                                        LIMIT 8
                                        "), 
                                array('domain' => $domain->id)
                            );

        $devices = DB::select( DB::raw("SELECT device, count(*)
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                        GROUP BY device
                                        ORDER BY count DESC
                                        LIMIT 5" ), 
                                array('domain' => $domain->id)
                            );

        $locations = DB::select( DB::raw("SELECT country, count(*)
                                FROM events 
                                WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                GROUP BY country" ), 
                        array('domain' => $domain->id)
                    );


        $pageviewsCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events 
                    WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                    "), 
                array('domain' => $domain->id)
                );

        $visitorsCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events 
                    WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                    AND referrer is null
                    "), 
                array('domain' => $domain->id)
                );

        return [
            'domains' => Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name'),
            'time_buckets' => $timeBuckets,
            'pageviews' => $pageviews,
            'realtime' => $realTime,
            'top_sources' => $topSources,
            'top_pages' => $topPages,
            'devices' => $devices,
            'locations' => $locations,
            'unique_visitors_count' => $visitorsCount[0]->count,
            'pageviews_count' => $pageviewsCount[0]->count,
            'bounce_rate' => '539%',
            'visit_duration' => '4m 49s'
        ];
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
