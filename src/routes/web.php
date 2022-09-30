<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TestPageController;
use App\Http\Controllers\SubscriptionController;
use App\Models\Domain;
use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome');
})->middleware(['auth'])->name('welcome');

Route::get('/dashboard/demo.com', function () {
    $domain = Domain::where('domain_name', 'demo.com')->firstOrFail();
    return Inertia::render('DemoDashboard', ['domain' => $domain->domain_name ]);
})->name('demo-dashboard');


Route::middleware(['auth', 'require_one_domain'])->group(function () {
    Route::get('/dashboard/{domain?}', function ($domain = null) {
        if($domain === null) {
            $firstDomain = Domain::where('user_id', Auth::user()->id)->oldest()->first();
            return redirect('/dashboard/'. $firstDomain->domain_name);
        }

        $domain = Domain::where('domain_name', $domain)->where('user_id', Auth::user()->id)->firstOrFail();
        return Inertia::render('Dashboard', ['domain' => $domain->domain_name ]);
    })->name('dashboard');

    Route::get('/manage-domains', function () {
        return Inertia::render('ManageDomains', ['domains' => Domain::where('user_id', Auth::user()->id)->get()]);
    })->name('manage-domains');

    Route::get('/add-domain', function () {
        return Inertia::render('AddDomain');
    })->name('add-domain');

    Route::get('/profile', function () {
        return Inertia::render('Profile', ['subscription_status' => App\Services\SubscriptionService::getSubscriptionStatus()]);
    })->name('profile');

    Route::get('/domain/{domain_name}/script', function ($domainName) {
        $domain = Domain::where('domain_name', $domainName)->where('user_id', Auth::user()->id)->firstOrFail();
        return Inertia::render('DomainScript', ['domain' => $domain]);
    })->name('web.domain');

    Route::controller(SubscriptionController::class)->group(function () {
        Route::get('/subscriptions', 'getSubscriptionsPage')->name('subscriptions');
        Route::get('/subscription-checkout', 'getSubscriptionCheckoutPage');
        Route::get('/subscription-success', 'getSubscriptionSuccessPage')->name('subscription-success');
        Route::get('/billing-portal', 'getSubscriptionBillingPortalPage');
        Route::get('/subscription-cancel', 'getSubscriptionCancelPage')->name('subscription-cancel');
    });
});

Route::get('/test-page', [TestPageController::class, 'get']);
Route::get('/test-page/nested', [TestPageController::class, 'getNested']);


//static pages
Route::get('/docs', function () { return Inertia::render('Docs');})->name('docs');
Route::get('/docs/about', function () { return Inertia::render('DocsAbout');})->name('about');
Route::get('/docs/adding-a-domain', function () { return Inertia::render('DocsAddingADomain'); })->name('DocsAddingADomain');
Route::get('/docs/faq', function () { return Inertia::render('DocsFrequentlyAskedQuestions'); })->name('DocsFrequentlyAskedQuestions');
Route::get('/docs/getting-started', function () { return Inertia::render('DocsGettingStarted'); })->name('DocsGettingStarted');
Route::get('/terms', function () { return Inertia::render('terms'); })->name('Terms');
Route::get('/privacy-policy', function () { return Inertia::render('PrivacyPolicy'); })->name('PrivacyPolicy');
Route::get('/contact', function () { return Inertia::render('Contact'); })->name('Contact');

require __DIR__.'/auth.php';
