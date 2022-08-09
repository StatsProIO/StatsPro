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
                    new Interval(Carbon::now()->subDays(7)->toDateString(), Carbon::now()->toDateString()),
                    new Interval(Carbon::now()->subDays(14)->toDateString(), Carbon::now()->subDays(7)->toDateString()),
                    'vs previous 7d',
                    'enter_time::date',
                    24
                );
            case '30d':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subDays(30)->toDateString(), Carbon::now()->toDateString()),
                    new Interval(Carbon::now()->subDays(60)->toDateString(), Carbon::now()->subDays(30)->toDateString()),
                    'vs previous 30d',
                    'enter_time::date',
                    24
                );
            case 'month-to-date':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->startOfMonth()->toDateString(), Carbon::now()->toDateString()),
                    new Interval(Carbon::now()->subMonthsNoOverflow(1)->startOfMonth()->toDateString(), Carbon::now()->subMonthsNoOverflow(1)->toDateString()),
                    'vs same time last month',
                    'enter_time::date',
                    24
                );
            case 'last-month':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->startOfMonth()->subMonthsNoOverflow(1)->toDateString(), Carbon::now()->subMonthsNoOverflow(1)->endOfMonth()->toDateString()),
                    new Interval(Carbon::now()->startOfMonth()->subMonthsNoOverflow(2)->toDateString(), Carbon::now()->startOfMonth()->subMonthsNoOverflow(2)->endOfMonth()->toDateString()),
                    'vs the previous month',
                    'enter_time::date',
                    24
                );
            case 'year-to-date':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->firstOfYear()->toDateString(), Carbon::now()->toDateString()),
                    new Interval(Carbon::now()->firstOfYear()->subYear(1)->toDateString(), Carbon::now()->subYear(1)->toDateString()),
                    'vs same time last year',
                    'enter_time::date',
                    24
                );
            case '12m':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subMonthsNoOverflow(12)->toDateString(), Carbon::now()->toDateString()),
                    new Interval(Carbon::now()->subMonthsNoOverflow(24)->toDateString(), Carbon::now()->subMonthsNoOverflow(12)->toDateString()),
                    'vs the previous 12 months',
                    'enter_time::date',
                    24
                );
            case 'all-time':
                return new TimeRangeInfo(
                    new Interval(Carbon::create(2022, 1, 1, 0, 0, 0)->toDateString(), Carbon::now()->toDateString()),
                    new Interval(Carbon::create(2022, 1, 1, 0, 0, 0)->toDateString(), Carbon::now()->toDateString()),
                    'enter_time::date',
                    '',
                    24
                );
                
        }
    }

}
