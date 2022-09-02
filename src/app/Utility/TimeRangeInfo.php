<?php
namespace App\Utility;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use Carbon\CarbonInterface;


class TimeRangeInfo
{
    protected Interval $interval;
    protected Interval $comparisonInterval;
    protected string $comparisonIntervalDescriptionSuffix;
    protected string $groupBy;
    protected int $bucketSizeHours;

    public function __construct(Interval $interval, Interval $comparisonInterval, string $comparisonIntervalDescriptionSuffix, $groupBy, $bucketSizeHours) {
        $this->interval = $interval;
        $this->comparisonInterval = $comparisonInterval;
        $this->comparisonIntervalDescriptionSuffix = $comparisonIntervalDescriptionSuffix;
        $this->groupBy = $groupBy;
        $this->bucketSizeHours = $bucketSizeHours;
    }

    public function getInterval() {
        return $this->interval;
    }

    public function getComparisonInterval() {
        return $this->comparisonInterval;
    }

    public function getComparisonIntervalDescriptionSuffix() {
        return $this->comparisonIntervalDescriptionSuffix;
    }

    public function getGroupBy() {
        return $this->groupBy;
    }

    public function getBucketSizeHours() {
        return $this->bucketSizeHours;
    }

    public static function rangeStringToQueryInfo(string $range) {
        //TODO: make this into an object
        switch ($range) {
            case '24h':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subHours(24)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subHours(48)->toDateTimeString(), Carbon::now()->subHours(24)->toDateTimeString()),
                    'vs previous 24h',
                    "date_trunc('hour', enter_time)",
                    1
                );
            case '7d':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subDays(7)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subDays(14)->toDateTimeString(), Carbon::now()->subDays(7)->toDateTimeString()),
                    'vs previous 7d',
                    'enter_time::date',
                    24
                );
            case '30d':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subDays(30)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subDays(60)->toDateTimeString(), Carbon::now()->subDays(30)->toDateTimeString()),
                    'vs previous 30d',
                    'enter_time::date',
                    24
                );
            case 'month-to-date':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->startOfMonth()->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subMonthsNoOverflow(1)->startOfMonth()->toDateTimeString(), Carbon::now()->subMonthsNoOverflow(1)->toDateTimeString()),
                    'vs same time last month',
                    'enter_time::date',
                    24
                );
            case 'last-month':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->startOfMonth()->subMonthsNoOverflow(1)->toDateTimeString(), Carbon::now()->subMonthsNoOverflow(1)->endOfMonth()->toDateTimeString()),
                    new Interval(Carbon::now()->startOfMonth()->subMonthsNoOverflow(2)->toDateTimeString(), Carbon::now()->startOfMonth()->subMonthsNoOverflow(2)->endOfMonth()->toDateTimeString()),
                    'vs the previous month',
                    'enter_time::date',
                    24
                );
            case 'year-to-date':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->firstOfYear()->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->firstOfYear()->subYear(1)->toDateTimeString(), Carbon::now()->subYear(1)->toDateTimeString()),
                    'vs same time last year',
                    'enter_time::date',
                    24
                );
            case '12m':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subMonthsNoOverflow(12)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subMonthsNoOverflow(24)->toDateTimeString(), Carbon::now()->subMonthsNoOverflow(12)->toDateTimeString()),
                    'vs the previous 12 months',
                    'enter_time::date',
                    24
                );
            case 'all-time':
                return new TimeRangeInfo(
                    new Interval(Carbon::create(2022, 1, 1, 0, 0, 0)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::create(2022, 1, 1, 0, 0, 0)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    '',
                    'enter_time::date',
                    24
                );
                
        }
    }

}
