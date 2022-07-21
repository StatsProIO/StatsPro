<?php

namespace App\Http\Controllers;
use Log;

use Illuminate\Http\Request;

class CollectorController extends Controller
{
    public function post(Request $request) {
        $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : '';
       


        $clientSuppliedUserAgentString = $request->server('HTTP_USER_AGENT');

        
        $clientSuppliedEventName = $request->all()['event_name'];
        $clientSuppliedLocationHref = $request->all()['location_href'];
        $clientSuppliedHost = $request->all()['location_host'];
        $clientSuppliedPath = $request->all()['location_pathname'];
        $clientSuppliedDomain = $request->all()['domain'];
        $clientSuppliedReferrer = $request->all()['referrer'];
        $clientSuppliedInnerWidth = $request->all()['inner_width'];
        $clientSuppliedLang = $request->all()['lang'];
        $clientSuppliedTimeZone = $request->all()['client_time_zone'];
        $clientSuppliedTime = $request->all()['client_time'];

        //TODO: include a salt
        $userIdHash = \Hash::make(hash('sha256', json_encode([$clientIp, $clientSuppliedUserAgentString, $clientSuppliedHost ])));
        $requestHash = \Hash::make(hash('sha256', json_encode([$clientIp, $clientSuppliedUserAgentString, $clientSuppliedHost, $clientSuppliedPath ])));
                
        echo json_encode($_SERVER, JSON_PRETTY_PRINT);

        //TODO: look up the domain
        //TODO: determine if this is a subsequest request for the same visitor_hash in the last 30 minutes
            //TODO: if yes, update the previous request with an exit time
            
        //TODO: insert the event

        return [$clientIp, $request->all(), $clientSuppliedUserAgentString, $userIdHash, $requestHash];
       
    }
}
