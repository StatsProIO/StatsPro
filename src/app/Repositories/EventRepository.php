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
use Locale;

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
                                        WHERE domain_id = :domain
                                            AND event_name='pageview'
                                            AND created_at >= '{$interval->getStart()}'
                                            AND created_at <= '{$interval->getEnd()}'
                                            AND source IS NOT NULL
                                            AND source <> :domain_name
                                        GROUP BY source
                                        ORDER BY count DESC
                                        LIMIT 8
                                        "),
                                array('domain' => $domain->id, 'domain_name' => $domain->domain_name)
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

    public static function getLocationsForMap(Interval $interval, Domain $domain) {
        return DB::select( DB::raw("SELECT country, count(*)
                                FROM events
                                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                GROUP BY country
                                ORDER BY count DESC" ),
                        array('domain' => $domain->id)
                    );
    }

    public static function getLocationsForList(Interval $interval, Domain $domain) {
        $locations = DB::select( DB::raw("SELECT country, count(*)
                                FROM events
                                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                GROUP BY country
                                ORDER BY count DESC
                                LIMIT 5" ),
            array('domain' => $domain->id)
        );

        foreach($locations as $location) {
            $location->country = (new \League\ISO3166\ISO3166)->alpha3($location->country)['name'];
        }

        return $locations;
    }

    public static function getBrowsers(Interval $interval, Domain $domain) {
        return DB::select( DB::raw("SELECT browser, count(*)
                                FROM events
                                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                GROUP BY browser
                                ORDER BY count DESC
                                LIMIT 5" ),
            array('domain' => $domain->id)
        );
    }

    public static function getLanguages(Interval $interval, Domain $domain) {
        $languages = DB::select( DB::raw("SELECT language, count(*)
                                FROM events
                                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                GROUP BY language
                                ORDER BY count DESC
                                LIMIT 5" ),
            array('domain' => $domain->id)
        );

        foreach($languages as $language) {
            $language->language = Locale::getDisplayName(Locale::getPrimaryLanguage($language->language), 'en');
        }

        return $languages;
    }

    public static function getOses(Interval $interval, Domain $domain) {
        return DB::select( DB::raw("SELECT os, count(*)
                                FROM events
                                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                                GROUP BY os
                                ORDER BY count DESC
                                LIMIT 5" ),
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

    public static function getBounceRate(TimeRangeInfo $timeRangeInfo, Interval $interval, Domain $domain, $timeBuckets) {
        $bouncedPageviews = DB::select(
            DB::raw("SELECT {$timeRangeInfo->getGroupBy()} as date, count(*)
                FROM events
                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$timeRangeInfo->getInterval()->getStart()}' AND created_at <= '{$timeRangeInfo->getInterval()->getEnd()}'
                AND time_on_page_seconds = 0
                AND referrer is null
                GROUP BY {$timeRangeInfo->getGroupBy()}

                "),
            array('domain' => $domain->id)
        );

        $visitors = DB::select(
            DB::raw("SELECT {$timeRangeInfo->getGroupBy()} as date, count(*)
                FROM events
                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$timeRangeInfo->getInterval()->getStart()}' AND created_at <= '{$timeRangeInfo->getInterval()->getEnd()}'
                AND referrer is null
                GROUP BY {$timeRangeInfo->getGroupBy()}

                "),
            array('domain' => $domain->id)
        );

        $visitorsByDate = [];
        foreach($visitors as $visitor) {
            $visitorsByDate[$visitor->date] = $visitor->count;
        }

        $bounceRateByDate = [];
        foreach($bouncedPageviews as $bouncedPageview) {
            if (array_key_exists($bouncedPageview->date, $visitorsByDate)) {
                $bounceRateByDate[$bouncedPageview->date] = 100 * ($bouncedPageview->count / ($visitorsByDate[$bouncedPageview->date]));
            }
        }

        //fill the gaps in with 0s
        $bounceRateByDate = array_merge($timeBuckets, $bounceRateByDate);
        uksort($bounceRateByDate,  function ($dt1, $dt2) {return strtotime($dt1) - strtotime($dt2);});

        return $bounceRateByDate;
    }

    public static function getTimeOnPage(TimeRangeInfo $timeRangeInfo, Interval $interval, Domain $domain, $timeBuckets) {
        $timesOnPage = DB::select(
            DB::raw("SELECT {$timeRangeInfo->getGroupBy()} as date, AVG(time_on_page_seconds) as average_visit_duration
                FROM events
                WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$timeRangeInfo->getInterval()->getStart()}' AND created_at <= '{$timeRangeInfo->getInterval()->getEnd()}'
                AND referrer is null
                GROUP BY {$timeRangeInfo->getGroupBy()}
                "),
            array('domain' => $domain->id)
        );

        $timeOnPageByDate = [];
        foreach($timesOnPage as $timeOnPage) {
            $timeOnPageByDate[$timeOnPage->date] = $timeOnPage->average_visit_duration;
        }

        $visitors = array_merge($timeBuckets, $timeOnPageByDate);
        uksort($visitors,  function ($dt1, $dt2) {return strtotime($dt1) - strtotime($dt2);});

        return $visitors;
    }

    public static function getBusiestDayOfWeek(Interval $interval, Domain $domain) {
        $countsWithDayOfWeek = collect(DB::select(
            DB::raw("SELECT extract(dow from created_at) as day_of_week, count(*) as count
                    FROM events
                    WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                    GROUP BY extract(dow from created_at)
                    "),
            array('domain' => $domain->id)
        ));

        $DAYS_OF_WEEK = array('Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday');

        foreach($countsWithDayOfWeek as $countWithDayOfWeek) {
            $countWithDayOfWeek->day_of_week = $DAYS_OF_WEEK[$countWithDayOfWeek->day_of_week];
        }

        $maxDayOfWeek = $countsWithDayOfWeek->reduce(function ($previousCountWithDayOfWeek, $currentCountWithDayOfWeek) {
            if (!$previousCountWithDayOfWeek) {
                return $currentCountWithDayOfWeek;
            }

            if ($previousCountWithDayOfWeek->count > $currentCountWithDayOfWeek->count) {
                return $previousCountWithDayOfWeek;
            } else {
                return $currentCountWithDayOfWeek;
            }
        });

        return $maxDayOfWeek ? $maxDayOfWeek->day_of_week : 'None';
    }

    public static function getBusiestHourOfDay(Interval $interval, Domain $domain) {
        $countsWithHourOfDay = collect(DB::select(
            DB::raw("SELECT extract(hour from created_at) as hour_of_day , count(*) as count
                    FROM events
                    WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                    GROUP BY extract(hour from created_at)
                    "),
            array('domain' => $domain->id)
        ));

        $maxHourOfDay = $countsWithHourOfDay->reduce(function ($previousCountWithHourOfDay, $currentCountWithHourOfDay) {
            if (!$previousCountWithHourOfDay) {
                return $currentCountWithHourOfDay;
            }

            if ($previousCountWithHourOfDay->count > $currentCountWithHourOfDay->count) {
                return $previousCountWithHourOfDay;
            } else {
                return $currentCountWithHourOfDay;
            }
        });

        return $maxHourOfDay ? ($maxHourOfDay->hour_of_day%12).($maxHourOfDay->hour_of_day < 12 ? ' AM' : ' PM') : 0;
    }

    public static function getTimeTrends(Interval $interval, Domain $domain) {
        $countsWithHourAndDayOfWeek = collect(DB::select(
            DB::raw("SELECT extract(dow from created_at) as day_of_week, floor(extract(hour from created_at)/3) as hour_of_day, count(*) as count
                    FROM events
                    WHERE domain_id = :domain AND event_name='pageview' AND created_at >= '{$interval->getStart()}' AND created_at <= '{$interval->getEnd()}'
                    GROUP BY extract(dow from created_at), floor(extract(hour from created_at)/3)
                    "),
            array('domain' => $domain->id)
        ));

        $max = $countsWithHourAndDayOfWeek->max('count');

        $countsGroupedByHourAndDayOfWeek = array_fill(0, 7, array_fill(0, 8, 0));
        foreach($countsWithHourAndDayOfWeek as $countWithHourAndDayOfWeek) {
            $countsGroupedByHourAndDayOfWeek[$countWithHourAndDayOfWeek->day_of_week][$countWithHourAndDayOfWeek->hour_of_day] = $countWithHourAndDayOfWeek->count/$max;
        }

        return $countsGroupedByHourAndDayOfWeek;
    }
}
