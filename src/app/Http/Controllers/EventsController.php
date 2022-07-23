<?php

namespace App\Http\Controllers;
use Log;
use App\Models\Event;
use App\Models\Domain;
use Helper;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Sinergi\BrowserDetector\Browser;



class EventsController extends Controller
{
    public function postEvent(Request $request) {
        $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : '';

        $userAgent = $request->server('HTTP_USER_AGENT');

        //TODO: include a salt
        $visitorHash = \Hash::make(hash('sha256', json_encode([$clientIp, $userAgent, $request->location_host ])));
        $requestHash = \Hash::make(hash('sha256', json_encode([$clientIp, $userAgent, $request->location_host, $request->location_pathname ])));

        $domain = Domain::where('domain_name', $request->domain)->first();
        //TODO: determine if this is a subsequest request for the same visitor_hash in the last 30 minutes
            //TODO: if yes, update the previous request with an exit time
            
        //TODO: insert the event


        $systemInfo = Helper::systemInfo($userAgent);
        

        $event = new Event;
        $event->domain_id = $domain->id;
        $event->event_name = $request->event_name;
        $event->ip_address = $clientIp;
        $event->user_agent = $userAgent;
        $event->visitor_hash = $visitorHash;
        $event->request_hash = $requestHash;
        $event->is_unique = false; //TODO
        $event->location_href = $request->location_href;
        $event->host = $request->location_host;
        $event->path = $request->location_pathname;
        $event->referrer = $request->referrer;
        $event->inner_width = $request->inner_width;
        $event->language = $request->lang;
        $event->country = Helper::getCountry($request->client_time_zone);
        $event->region = Helper::getRegion($request->client_time_zone);
        $event->browser = (new Browser())->getName();
        $event->device = $systemInfo['device'];
        $event->os = $systemInfo['os'];
        $event->time_zone = $request->client_time_zone;
        $event->client_time = $request->client_time;
        $event->enter_time = Carbon::now();
        $event->exit_time = null;
        $event->save();


        //TODO: factory
        //TODO: see the database

        return $event;
       
    }

    public function getEvents (Request $request) {

        $range = $request->has('range') ? $request->input('range') : 'today';
       
        if(!$request->has('domain')) {
            throw new Exception('no domain');
        }

        //TODO: need to validate that the domain belongs to the user
        $domain = $request->input('domain');

        return ['pageviews' => [0 => 23, 1 => 45, 2 => 59, 3 => 492, 4 => 920, 5 => 294]];
    }
}
