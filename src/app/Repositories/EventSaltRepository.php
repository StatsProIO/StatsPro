<?php

namespace App\Repositories;

use App\Models\EventSalt;
use Carbon\Carbon;
use Illuminate\Support\Str;

class EventSaltRepository
{
    public static function getOrCreateCurrentEventSalt() {
        $day = Carbon::now()->toDateString();
        return EventSalt::where(['valid_day' => $day])->firstOr(function() use ($day) {
            return EventSalt::create([
                'valid_day' => $day,
                'salt' => Str::random(64)
            ]);
        });

    }


}
