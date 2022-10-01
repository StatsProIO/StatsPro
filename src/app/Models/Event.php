<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'domain_id',
        'event_name',
        'user_agent',
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
        'keyword',
        'q',
        'ref',
        'utm_campaign',
        'utm_content',
        'utm_medium',
        'utm_source',
        'utm_term'
    ];

    use HasFactory;
}
