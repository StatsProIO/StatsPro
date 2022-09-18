<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;


class GoogleAuthController extends Controller
{

    public function redirect()
    {
        return response('', 409)
            ->header('X-Inertia-Location', Socialite::driver('google')->redirect()->getTargetUrl());
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();

        Log::error($googleUser->id);
        Log::error($googleUser->name);
        Log::error($googleUser->email);

        $user = \App\Models\User::updateOrCreate([
            'google_id' => $googleUser->id,
        ], [
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'email_verified_at' => Carbon::now(),
            'google_id' => $googleUser->id,
            'password' => encrypt(substr(md5(rand()), 0, 10)),
            'trial_ends_at' => now()->addYears(10),
        ]);

        dd(\App\Models\User::all(), $user);

        Auth::login($user);
        return redirect('/dashboard');
    }
}
