<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DomainsController extends Controller
{

    public function postDomain(Request $request) {
        $domain = new Domain;
        $domain->user_id = Auth::user()->id;
        $domain->domain_name = $request->domain;
        $domain->save();

        return $domain;
    }

}
