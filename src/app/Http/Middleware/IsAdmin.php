<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;

class IsAdmin extends Middleware
{

    public function handle(Request $request, Closure $next) {

        if (!$request->user()->isAdmin() )
        {
            return abort(404);
            //or redirect to somewhere
        }

        return $next($request);
    }

}
