<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Domain;

class DomainsController extends Controller
{

    public function postDomain(Request $request) {
        $domainName = $request->domain_name;
        $domainName = strpos($domainName, 'http') !== 0 ? "https://$domainName" : $domainName;

        if (filter_var($domainName, FILTER_VALIDATE_URL ) === FALSE) {
            return redirect()->back()->with('message', 'Not a valid URL.');
        }

        $domainNameHost = parse_url($domainName, PHP_URL_HOST);

        if($domainNameHost === null || $domainNameHost === '') {
            return redirect()->back()->with('message', 'Invalid URL. Missing host.');
        }

        //make sure there is at least 1 period in the domain
        if(preg_match('/.*\..*/', $domainNameHost) === 0) {
            return redirect()->back()->with('message', 'Invalid URL. Missing top-level domain (.com, .gov, etc).');
        }

        $existingDomains = Domain::where('domain_name', $domainNameHost)->count();
        if ($existingDomains > 0) {
            return redirect()->back()->with('message', 'Domain ' . $domainNameHost . ' has already been registered.');
        }

        $domain = new Domain;
        $domain->user_id = Auth::user()->id;
        $domain->domain_name = $domainNameHost;
        $domain->save();

        return redirect()->intended('/domain/' . $domain->domain_name . '/script');
    }


}
