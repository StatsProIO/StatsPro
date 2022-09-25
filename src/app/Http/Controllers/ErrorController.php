<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Error;

class ErrorController extends Controller
{
    function add(Request $request) {
        $error = new Error;
        $error->message = json_encode($request->all());
        $error->save();

        return 'SUCCESS';
    }
}
