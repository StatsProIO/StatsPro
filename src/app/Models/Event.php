<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'domain_id',
        'event_name',
        'ip_address',
        'user_agent',
        'visitor_id',
        'request_hash',
        'is_unique',
        'location_href',
        'host',
        'path',
        'referrer',
        'inner_width',
        'language',
        'country',
        'region',
        'browser',
        'device',
        'os',
        'time_zone',
        'client_time',
        'enter_time',
        'exit_time'
    ];

    use HasFactory;
}
