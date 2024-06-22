<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestPageController extends Controller
{
    public function get()
    {
        return view('test-page');
    }

     public function getNested()
        {
            return view('test-page-nested');
        }
}
