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
        'client_time'
    ];

    use HasFactory;
}
