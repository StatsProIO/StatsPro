<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSalt extends Model
{
    use HasFactory;

    protected $fillable = [
        'salt',
        'valid_day'
    ];
}
