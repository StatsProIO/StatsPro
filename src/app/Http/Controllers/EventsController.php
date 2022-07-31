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
        $event->visitor_hash = $visitorHash;
        $event->request_hash = $requestHash;
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

    function rangeToInterval(string $range) {
        switch ($range) {
            case '24h':
                return [
                    Carbon::now()->subHours(24)->toDateString(),
                    Carbon::now()->toDateString()
                ];
                break;
            case '7d':
                return [
                    Carbon::now()->subDays(7)->toDateString(),
                    Carbon::now()->toDateString()
                ];
                break;
            case '30d':
                return [
                    Carbon::now()->subDays(30)->toDateString(),
                    Carbon::now()->toDateString()
                ];
                break;
            case 'last-month':
                return [
                    Carbon::now()->startOfMonth()->subMonthsNoOverflow(1)->toDateString(),
                    Carbon::now()->subMonthsNoOverflow(1)->endOfMonth()->toDateString()
                ];
                break;
            case 'year-to-date':
                return [
                    Carbon::now()->firstOfYear()->toDateString(),
                    Carbon::now()->toDateString()
                ];
                break;
            case '12m':
                return [
                    Carbon::now()->subMonthsNoOverflow(12)->toDateString(),
                    Carbon::now()->toDateString()
                ];
                break;
            case 'all-time':
                return [
                    Carbon::create(2022, 1, 1, 0, 0, 0)->toDateString(),
                    Carbon::now()->toDateString()
                ];
                break;
        }
    }

    public function getEvents (Request $request) {

        $range = $request->has('range') ? $request->input('range') : 'today';
        $interval = $this->rangeToInterval($range);

        //TODO: need to validate that the domain belongs to the user
        //TODO: change firstdomain to the users first domain
        $domainString = $request->has('domain') ? $request->input('domain') : 'firstdomain.com';

        $domain = Domain::firstWhere('domain_name', $domainString);
        
        $pageviews = DB::select( DB::raw("SELECT enter_time::date as date, count(*)
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time > '$interval[0]' AND enter_time < '$interval[1]'
                                        GROUP BY enter_time::date" ), 
                                array('domain' => $domain->id)
                            );

        $realTimeInterval = [
                    Carbon::now()->subMinutes(5)->toDateString(),
                    Carbon::now()->toDateString()
                ];
                            
                            
        //find the pageviews from the last 5 minutes, deduplicate pageviews by the same visitor
        $realTime = DB::select( DB::raw("SELECT distinct on (visitor_hash) visitor_hash, location_href, enter_time
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time > '$realTimeInterval[0]' AND enter_time < '$realTimeInterval[1]'
                                        ORDER BY visitor_hash, enter_time desc"), 
                                array('domain' => $domain->id)
                            );
        $topSourcesQueryResult = DB::select( DB::raw("SELECT source, array_to_json(array_agg(jsonb_build_object(date, count) ORDER BY date asc)) as counts_by_day
                                        FROM (
                                            SELECT enter_time::date as date, source, count(*) as count
                                            FROM events 
                                            WHERE domain_id = :domain AND event_name='pageview'  AND enter_time > '$interval[0]' AND enter_time < '$interval[1]'
                                            GROUP BY enter_time::date, source
                                        ) as a
                                        GROUP BY source
                                        "), 
                                array('domain' => $domain->id)
                            );

        $topSources = [];

        foreach($topSourcesQueryResult as $topSourceQueryResult) {
            $topSourceQueryResult->counts_by_day = json_decode($topSourceQueryResult->counts_by_day);

            $dates = [];
            $counts = [];

            foreach($topSourceQueryResult->counts_by_day as $index => $countByDay) {

                foreach ($countByDay as $date => $count) {
                    array_push($dates, $date);
                    array_push($counts, $count);
                }

                
            }
            
            $topSources[] = ["dates" => $dates, "counts" => $counts, "source" => $topSourceQueryResult->source];
        }

     
        $topPages = DB::select( DB::raw("SELECT path, array_agg(jsonb_build_object(date, count) ORDER BY date asc)
                                        FROM (
                                            SELECT enter_time::date as date, path, count(*) as count
                                            FROM events 
                                            WHERE domain_id = :domain AND event_name='pageview'  AND enter_time > '$interval[0]' AND enter_time < '$interval[1]'
                                            GROUP BY enter_time::date, path
                                        ) as a
                                        GROUP BY path
                                        "), 
                                array('domain' => $domain->id)
                            );



        $devices = DB::select( DB::raw("SELECT device, count(*)
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview'  AND enter_time > '$interval[0]' AND enter_time < '$interval[1]'
                                        GROUP BY device
                                        LIMIT 5" ), 
                                array('domain' => $domain->id)
                            );

        $locations = DB::select( DB::raw("SELECT country, count(*)
                                FROM events 
                                WHERE domain_id = :domain AND event_name='pageview'  AND enter_time > '$interval[0]' AND enter_time < '$interval[1]'
                                GROUP BY country" ), 
                        array('domain' => $domain->id)
                    );


        return [
            'domains' => Domain::where('user_id', Auth::user()->id)->get()->pluck('domain_name'),
            'pageviews' => $pageviews,
            'realtime' => $realTime,
            'top_sources' => $topSources,
            'top_pages' => $topPages,
            'devices' => $devices,
            'locations' => $locations
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
