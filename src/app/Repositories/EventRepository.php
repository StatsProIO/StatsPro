<?php

namespace App\Repositories;

use App\Models\Event;
use App\Models\Domain;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Carbon\CarbonInterface;
use App\Utility\Interval;
use App\Utility\TimeRangeInfo;

class EventRepository
{
    public static function getPageviews(TimeRangeInfo $timeRangeInfo, Domain $domain, $timeBuckets) {
        $pageviews = DB::select(
            DB::raw("SELECT {$timeRangeInfo->getGroupBy()} as date, count(*)
                FROM events
                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$timeRangeInfo->getInterval()->getStart()}' AND created_at <= '{$timeRangeInfo->getInterval()->getEnd()}'
                GROUP BY {$timeRangeInfo->getGroupBy()}
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

    public static function getVisitors(TimeRangeInfo $timeRangeInfo, Domain $domain, $timeBuckets) {
        $visitors = DB::select(
            DB::raw("SELECT {$timeRangeInfo->getGroupBy()} as date, count(*)
                FROM events
                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$timeRangeInfo->getInterval()->getStart()}' AND created_at <= '{$timeRangeInfo->getInterval()->getEnd()}'
                AND referrer is null
                GROUP BY {$timeRangeInfo->getGroupBy()}

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
        return DB::select( DB::raw("SELECT id, path, created_at
                                        FROM events
                                        WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '$realTimeInterval[0]' AND created_at <= '$realTimeInterval[1]'
                                        ORDER BY created_at desc"),
                                array('domain' => $domain->id)
                            );
    }

    public static function getTopSources(Interval $interval, Domain $domain) {
        return DB::select( DB::raw("SELECT source as label, count(*) as count
                                        FROM events
                                        WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                        GROUP BY source
                                        ORDER BY count DESC
                                        LIMIT 8
                                        "),
                                array('domain' => $domain->id)
                            );
    }

    public static function getTopPages(Interval $interval, Domain $domain) {
        return DB::select( DB::raw("SELECT path as label, count(*) as count
                                        FROM events
                                        WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                        GROUP BY path
                                        ORDER BY count DESC
                                        LIMIT 8
                                        "),
                                array('domain' => $domain->id)
                            );
    }

    public static function getDevices(Interval $interval, Domain $domain) {
        return DB::select( DB::raw("SELECT device, count(*)
                                        FROM events
                                        WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                        GROUP BY device
                                        ORDER BY count DESC
                                        LIMIT 5" ),
                                array('domain' => $domain->id)
                            );
    }

    public static function getLocations(Interval $interval, Domain $domain) {
        return DB::select( DB::raw("SELECT country, count(*)
                                FROM events
                                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                GROUP BY country" ),
                        array('domain' => $domain->id)
                    );
    }

    public static function getPageviewsCount(Interval $interval, Domain $domain) {
        $pageviewsCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events
                    WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                    "),
                array('domain' => $domain->id)
                );
        return $pageviewsCount[0]->count;
    }

    public static function getVisitorsCount(Interval $interval, Domain $domain) {
        $visitorsCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events
                    WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                    AND referrer is null
                    "),
                array('domain' => $domain->id)
                );
        return $visitorsCount[0]->count;
    }

    public static function getVisitDuration(Interval $interval, Domain $domain) {
        $visitDuration = DB::select(
                DB::raw("SELECT AVG(time_on_page_seconds) as average_visit_duration
                    FROM events
                    WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                    "),
                array('domain' => $domain->id)
                );

        return floatval($visitDuration[0]->average_visit_duration);
    }

    public static function getBounceCount(Interval $interval, Domain $domain) {
        $bounceCount = DB::select(
                DB::raw("SELECT count(*) as count
                    FROM events
                    WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                    AND time_on_page_seconds = 0
                    AND referrer is null
                    "),
                array('domain' => $domain->id)
                );
        return $bounceCount[0]->count;
    }

}
