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
    protected string $labelFormat;

    public function __construct(Interval $interval, Interval $comparisonInterval, string $comparisonIntervalDescriptionSuffix, $groupBy, $bucketSizeHours, $labelFormat) {
        $this->interval = $interval;
        $this->comparisonInterval = $comparisonInterval;
        $this->comparisonIntervalDescriptionSuffix = $comparisonIntervalDescriptionSuffix;
        $this->groupBy = $groupBy;
        $this->bucketSizeHours = $bucketSizeHours;
        $this->labelFormat = $labelFormat;
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

    public function getLabelFormat() {
        return $this->labelFormat;
    }

    public function convertDateTimeKeysIntoLabelFormat($dataByTimestamp) {
        $result = [];
        foreach ($dataByTimestamp as $dateTimeKey => $value) {
            $formattedKey = Carbon::parse($dateTimeKey)->format($this->getLabelFormat());

            $result[ $formattedKey ] = $value;
        }

        return $result;
    }

    public static function rangeStringToQueryInfo(string $range) {
        switch ($range) {
            case '24h':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subHours(24)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subHours(48)->toDateTimeString(), Carbon::now()->subHours(24)->toDateTimeString()),
                    'vs previous 24h',
                    "date_trunc('hour', created_at)",
                    1,
                    'g:i A'
                );
            case '7d':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subDays(7)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subDays(14)->toDateTimeString(), Carbon::now()->subDays(7)->toDateTimeString()),
                    'vs previous 7d',
                    'created_at::date',
                    24,
                    'M d'
                );
            case '30d':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subDays(30)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subDays(60)->toDateTimeString(), Carbon::now()->subDays(30)->toDateTimeString()),
                    'vs previous 30d',
                    'created_at::date',
                    24,
                    'M d'
                );
            case 'month-to-date':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->startOfMonth()->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subMonthsNoOverflow(1)->startOfMonth()->toDateTimeString(), Carbon::now()->subMonthsNoOverflow(1)->toDateTimeString()),
                    'vs same time last month',
                    'created_at::date',
                    24,
                    'M d'
                );
            case 'last-month':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->startOfMonth()->subMonthsNoOverflow(1)->toDateTimeString(), Carbon::now()->subMonthsNoOverflow(1)->endOfMonth()->toDateTimeString()),
                    new Interval(Carbon::now()->startOfMonth()->subMonthsNoOverflow(2)->toDateTimeString(), Carbon::now()->startOfMonth()->subMonthsNoOverflow(2)->endOfMonth()->toDateTimeString()),
                    'vs the previous month',
                    'created_at::date',
                    24,
                    'M d'
                );
            case 'year-to-date':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->firstOfYear()->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->firstOfYear()->subYear(1)->toDateTimeString(), Carbon::now()->subYear(1)->toDateTimeString()),
                    'vs same time last year',
                    'created_at::date',
                    24,
                    'M d'
                );
            case '12m':
                return new TimeRangeInfo(
                    new Interval(Carbon::now()->subMonthsNoOverflow(12)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::now()->subMonthsNoOverflow(24)->toDateTimeString(), Carbon::now()->subMonthsNoOverflow(12)->toDateTimeString()),
                    'vs the previous 12 months',
                    'created_at::date',
                    24,
                    'M d'
                );
            case 'all-time':
                return new TimeRangeInfo(
                    new Interval(Carbon::create(2022, 1, 1, 0, 0, 0)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    new Interval(Carbon::create(2022, 1, 1, 0, 0, 0)->toDateTimeString(), Carbon::now()->toDateTimeString()),
                    '',
                    'created_at::date',
                    24,
                    'M d'
                );

        }
    }

}
