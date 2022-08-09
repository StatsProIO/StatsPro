<?php

namespace App\Utility;


class Interval
{
    protected $start;
    protected $end;

    public function __construct($start, $end) {
        $this->start = $start;
        $this->end = $end;
    }

    public function getStart() {
        return $this->start;
    }

    public function getEnd() {
        return $this->end;
    }

}
