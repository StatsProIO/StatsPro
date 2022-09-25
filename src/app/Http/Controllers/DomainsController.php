<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Domain;

class DomainsController extends Controller
{

    public function postDomain(Request $request) {
        //TODO: don't allow duplicate domains

        $domainName = $request->domain_name;
        $domainName = strpos($domainName, 'http') !== 0 ? "https://$domainName" : $domainName;

        if (filter_var($domainName, FILTER_VALIDATE_URL ) === FALSE) {
            return response()->json(['message' => 'Not a valid URL.'], 400);
        }

        $domainNameHost = parse_url($domainName, PHP_URL_HOST);

        if($domainNameHost === null || $domainNameHost === '') {
            return response()->json(['message' => 'Invalid URL. Missing host.'], 400);
        }

        //make sure there is at least 1 period in the domain
        if(preg_match('/.*\..*/', $domainNameHost) === 0) {
            return response()->json(['message' => 'Invalid URL. Missing top-level domain (.com, .gov, etc).'], 400);
        }

        $domain = new Domain;
        $domain->user_id = Auth::user()->id;
        $domain->domain_name = $domainNameHost;
        $domain->save();

        return redirect()->intended('/domain/' . $domain->domain_name . '/script');
    }


}
