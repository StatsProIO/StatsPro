<?php

namespace App\Repositories;

use App\Models\Event;
use App\Models\Domain;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Carbon\CarbonInterface;

class EventRepository
{
    public static function getPageviews($timeRangeInfo, Domain $domain, $timeBuckets) {
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

        $pageviews = array_merge($timeBuckets, $pageviewsCountByDate);
        uksort($pageviews,  function ($dt1, $dt2) {return strtotime($dt1) - strtotime($dt2);});

        return $pageviews;
    }

    public static function getVisitors($timeRangeInfo, Domain $domain, $timeBuckets) {
        $visitors = DB::select(
            DB::raw("SELECT {$timeRangeInfo['groupBy']} as date, count(*)
                FROM events 
                WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                AND referrer is null
                GROUP BY {$timeRangeInfo['groupBy']}
                
                "), 
            array('domain' => $domain->id)
            );

        

        $visitorsCountByDate = [];
        foreach($visitors as $visitor) {
            $visitorsCountByDate[$visitor->date] = $visitor->count;
        }

        

        $visitors = array_merge($timeBuckets, $visitorsCountByDate);
        uksort($visitors,  function ($dt1, $dt2) {return strtotime($dt1) - strtotime($dt2);});

        return $visitors;
    }

    public static function getRealTime(Domain $domain) { 
        $realTimeInterval = [
                    Carbon::now()->subMinutes(5)->toDateTimeString(),
                    Carbon::now()->toDateTimeString()
                ];
        return DB::select( DB::raw("SELECT path, enter_time
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '$realTimeInterval[0]' AND enter_time <= '$realTimeInterval[1]'
                                        ORDER BY enter_time desc"), 
                                array('domain' => $domain->id)
                            );
    }

    public static function getTopSources($timeRangeInfo, Domain $domain) { 
        return DB::select( DB::raw("SELECT source as label, count(*) as count
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                        GROUP BY source
                                        ORDER BY count DESC
                                        LIMIT 8
                                        "), 
                                array('domain' => $domain->id)
                            );
    }

    public static function getTopPages($timeRangeInfo, Domain $domain) { 
        return DB::select( DB::raw("SELECT path as label, count(*) as count
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                        GROUP BY path
                                        ORDER BY count DESC
                                        LIMIT 8
                                        "), 
                                array('domain' => $domain->id)
                            );
    }

    public static function getDevices($timeRangeInfo, Domain $domain) { 
        return DB::select( DB::raw("SELECT device, count(*)
                                        FROM events 
                                        WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                        GROUP BY device
                                        ORDER BY count DESC
                                        LIMIT 5" ), 
                                array('domain' => $domain->id)
                            );
    }

    public static function getLocations($timeRangeInfo, Domain $domain) { 
        return DB::select( DB::raw("SELECT country, count(*)
                                FROM events 
                                WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                                GROUP BY country" ), 
                        array('domain' => $domain->id)
                    );
    }

    public static function getPageviewsCount($timeRangeInfo, Domain $domain) { 
        $pageviewsCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events 
                    WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                    "), 
                array('domain' => $domain->id)
                );
        return $pageviewsCount[0]->count;
    }

    public static function getVisitorsCount($timeRangeInfo, Domain $domain) { 
        $visitorsCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events 
                    WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                    AND referrer is null
                    "), 
                array('domain' => $domain->id)
                );
        return $visitorsCount[0]->count;
    }

    public static function getVisitDuration($timeRangeInfo, Domain $domain) { 
        $visitDuration = DB::select(
                DB::raw("SELECT AVG(time_on_page_seconds) as average_visit_duration
                    FROM events 
                    WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                    "), 
                array('domain' => $domain->id)
                );

        return CarbonInterval::seconds(floatval($visitDuration[0]->average_visit_duration))->cascade()->forHumans([CarbonInterface::DIFF_ABSOLUTE], true);
    }

    public static function getBounceCount($timeRangeInfo, Domain $domain) { 
        $bounceCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events 
                    WHERE domain_id = :domain AND event_name='pageview' AND enter_time >= '{$timeRangeInfo['interval']['start']}' AND enter_time <= '{$timeRangeInfo['interval']['end']}'
                    AND time_on_page_seconds = 0
                    AND referrer is null
                    "), 
                array('domain' => $domain->id)
                );
        return $bounceCount[0]->count;
    }

 
}