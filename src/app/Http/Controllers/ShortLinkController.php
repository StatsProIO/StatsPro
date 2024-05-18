<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ShortLinkController extends Controller
{
    public function createShortLink(Request $request) {
        return 0;

        switch($request->expires) {
            case 'no-expiration':
                $expiresAt = null;
                break;
            case '24-hours':
                $expiresAt = Carbon::now()->addDays(1);
                break;
            case '72-hours':
                $expiresAt = Carbon::now()->addDays(3);
                break;
        }

        $shortLink = new ShortLink();
        $shortLink->long_url = $request->long_url;
        $shortLink->user_id = Auth::user() ? Auth::user()->id : null;
        $shortLink->short_code = Str::random(6);
        $shortLink->name = $request->name;
        $shortLink->expires_at = $expiresAt;

        $shortLink->save();

        return response()->json($shortLink);
    }

    public function getShortLink(string $shortCode, Request $request) {
        $shortLink = ShortLink::where('short_code', $shortCode)->first();

        if ($shortLink->expires_at != null && Carbon::now() > $shortLink->expires_at) {
            Logger::info("Expired short link clicked");
            abort(404);
        }

        if ($shortCode) {
            return view ('short-link-redirector', ['id' => $shortLink->id, 'url' => $shortLink->long_url]);
        }

        return abort(404);
    }
}
