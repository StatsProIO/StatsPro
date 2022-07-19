<?php

namespace App\Http\Controllers;
use Log;

use Illuminate\Http\Request;

class CollectorController extends Controller
{
    public function post(Request $request) {
        $clientIp = \Request::ip();

        $clientSuppliedUserAgentString = $request->server('HTTP_USER_AGENT');
        $clientSuppliedHost = $request->all()['location_host'];
        $clientSuppliedPath = $request->all()['location_pathname'];

        $userIdHash = \Hash::make(hash('sha256', json_encode([$clientIp, $clientSuppliedUserAgentString, $clientSuppliedHost ])));

        $requestHash = \Hash::make(hash('sha256', json_encode([$clientIp, $clientSuppliedUserAgentString, $clientSuppliedHost, $clientSuppliedPath ])));

        return [$clientIp, $request->all(), $clientSuppliedUserAgentString, $userIdHash, $requestHash];
    }
}
