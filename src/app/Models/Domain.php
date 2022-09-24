<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
     protected $fillable = [
        'user_id',
        'domain_name'
     ];
    use HasFactory;
}
