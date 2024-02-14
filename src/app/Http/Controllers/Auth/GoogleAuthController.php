<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;
use App\Mail\Welcome;
use Illuminate\Support\Facades\Mail;


class GoogleAuthController extends Controller
{

    public function redirect()
    {
        return response('', 409)
            ->header('X-Inertia-Location', Socialite::driver('google')->redirect()->getTargetUrl());
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = \App\Models\User::where('google_id', $googleUser->id)->first();

        if($user === null) {
            $user = new \App\Models\User();
            $user->email = $googleUser->email;
            $user->email_verified_at = Carbon::now();
            $user->google_id = $googleUser->id;
            $user->password = encrypt(substr(md5(rand()), 0, 10));
            $user->trial_ends_at = now()->addYears(10);
            $user->save();

            Mail::to($user)->send(new Welcome());
        }

        Auth::login($user);
        return redirect('/dashboard');
    }
}
