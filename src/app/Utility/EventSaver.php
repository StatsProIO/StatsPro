<?php

namespace App\Utility;

use App\Helpers\Helper;
use App\Models\Domain;
use App\Models\DomainBlacklistIp;
use App\Models\Event;
use Sinergi\BrowserDetector\Browser;
use Illuminate\Http\Request;

class EventSaver {

    /**
     * Used for tracking webpage loads
     */
    public function saveEventFromClientSideRequest(Request $request) {

        $userAgent = $request->server('HTTP_USER_AGENT');

        $domain = null;
        if ($request->domain) {
            $domain = Domain::where('domain_name', $request->domain)->first();
            if ($domain === null) {
                return response()->json(['message' => 'Domain ' . $request->domain . ' not found'], 404);
            }

            //don't record events for blacklisted IPs
            $domainBlacklistedIps = DomainBlacklistIp::where('domain_id', $domain->id)->pluck('ip')->all();

            $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : null;
            if (in_array($clientIp, $domainBlacklistedIps)) {
                return response()->json(['message' => 'IP blacklisted'], 403);
            }
        }


        $source = null;
        if($request->referrer != null) {
            $parsedUrl = parse_url($request->referrer);
            if($parsedUrl !== false) {
                $source = $parsedUrl['host'];
            }
        }

        $parsedUserAgent = new \WhichBrowser\Parser($userAgent);

        $event = new Event;
        $event->domain_id = $domain ? $domain->id : null;
        $event->short_link_id = $request->short_link_id ? $request->short_link_id : null;
        $event->event_name = $request->event_name;
        $event->user_agent = $userAgent;
        $event->location_href = $request->location_href;
        $event->host = $request->location_host;
        $event->path = $request->location_pathname;
        $event->referrer = $request->referrer;
        $event->source = $source;
        $event->inner_width = $request->inner_width;
        $event->language = $request->lang;
        $event->country = Helper::getCountry($request->client_time_zone);
        $event->region = Helper::getRegion($request->client_time_zone);
        $event->browser = (new Browser())->getName();
        $event->device = $parsedUserAgent->device->type;
        $event->os = $parsedUserAgent->os->name;
        $event->time_zone = $request->client_time_zone;
        $event->client_time = $request->client_time;

        if ($request->query_params) {
            $event->keyword = $request->query_params['keyword'] ?? null;
            $event->q = $request->query_params['q'] ?? null;
            $event->ref = $request->query_params['ref'] ?? null;
            $event->utm_campaign = $request->query_params['utm_campaign'] ?? null;
            $event->utm_content = $request->query_params['utm_content'] ?? null;
            $event->utm_medium = $request->query_params['utm_medium'] ?? null;
            $event->utm_source = $request->query_params['utm_source'] ?? null;
            $event->utm_term = $request->query_params['utm_term'] ?? null;
        }

        $event->save();

        return $event;
    }

}
