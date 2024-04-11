<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShortLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'long_url',
        'short_code',
        'name',
        'expires_at'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

}
