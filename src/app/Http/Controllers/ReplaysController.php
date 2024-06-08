<?php

namespace App\Http\Controllers;

use App\Helpers\VisitorIdHelper;
use App\Models\Domain;
use App\Models\DomainBlacklistIp;
use App\Models\Replay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReplaysController extends Controller
{

    public function postReplay($domainName, Request $request)
    {
        $domain = null;
        if ($domainName) {
            $domain = Domain::where('domain_name', $domainName)->first();
            if ($domain === null) {
                return response()->json(['message' => 'Domain ' . $domainName . ' not found'], 404);
            }

            //don't record events for blacklisted IPs
            $domainBlacklistedIps = DomainBlacklistIp::where('domain_id', $domain->id)->pluck('ip')->all();

            $clientIp = array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : null;
            if (in_array($clientIp, $domainBlacklistedIps)) {
                return response()->json(['message' => 'IP blacklisted'], 403);
            }
        }

        $decompressed = gzdecode($request->getContent());

        if ($decompressed === "[]") {
            return response()->json(['message' => 'Nothing to record'], 200);
        }

        $replay = new Replay();
        $replay->domain_id = $domain->id;
        $replay->visitor_id = VisitorIdHelper::getVisitorId($request);
        $replay->events = $decompressed;
        $replay->save();

        return response()->json(['message' => 'OK'], 200);
    }

    public function getReplay(string $domainName, string $visitorId)
    {
        if (!Auth::user() || $domainName === '') { ///not logged in or no domain name
            $domainName = 'demo.com';
            $domain = Domain::where('domain_name', $domainName)->firstOrFail();
        } else { //otherwise get the domain the user asked for
            $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        }

        $replays = Replay::where('visitor_id', $visitorId)->where('domain_id', $domain->id)->orderBy('id', 'ASC')->get();
        $events = [];
        foreach ($replays as $replay) {
            $events = array_merge($events, json_decode($replay->events, JSON_UNESCAPED_SLASHES));
        }

        return $events;
    }
}
