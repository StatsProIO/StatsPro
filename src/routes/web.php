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
})->middleware(['auth',])->name('welcome');

Route::get('/dashboard', function () {
    $domain = Domain::where('user_id', Auth::user()->id)->oldest()->first();
    return Inertia::render('Dashboard', ['firstDomain' => $domain->domain_name ]);
})->middleware(['auth', 'verified', 'require_one_domain'])->name('dashboard');

Route::get('/manage-domains', function () {
    return Inertia::render('ManageDomains', ['domains' => Domain::where('user_id', Auth::user()->id)->get()]);
})->middleware(['auth', 'verified', 'require_one_domain'])->name('manage-domains');

Route::get('/add-domain', function () {
    return Inertia::render('AddDomain');
})->middleware(['auth', 'verified', 'require_one_domain'])->name('add-domain');

Route::get('/profile', function () {
    return Inertia::render('Profile', ['subscription_status' => App\Services\SubscriptionService::getSubscriptionStatus()]);
})->middleware(['auth', 'verified', 'require_one_domain'])->name('profile');

//TODO: make sure that the domain is owned by this user
Route::get('/domain/{domain_name}/script', function ($domainName) {
    return Inertia::render('DomainScript', ['domain' => Domain::where('domain_name', $domainName)->first()]);
})->middleware(['auth', 'verified', 'require_one_domain'])->name('web.domain');

Route::get('/test-page', [TestPageController::class, 'get']);

Route::get('/subscriptions', [SubscriptionController::class, 'getSubscriptionsPage'])
    ->middleware(['auth', 'verified', 'require_one_domain'])
    ->name('subscriptions');

Route::get('/subscription-checkout', [SubscriptionController::class, 'getSubscriptionCheckoutPage'])
    ->middleware(['auth', 'verified', 'require_one_domain']);

Route::get('/subscription-success', [SubscriptionController::class, 'getSubscriptionSuccessPage'])
    ->middleware(['auth', 'verified', 'require_one_domain'])
    ->name('subscription-success');

Route::get('/billing-portal', [SubscriptionController::class, 'getSubscriptionBillingPortalPage'])
    ->middleware(['auth', 'verified', 'require_one_domain']);

Route::get('/subscription-cancel', [SubscriptionController::class, 'getSubscriptionCancelPage'])
    ->middleware(['auth', 'verified', 'require_one_domain'])
    ->name('subscription-cancel');

Route::get('/docs', function () {
     return Inertia::render('Docs');
})->name('docs');

Route::get('/docs/about', function () {
     return Inertia::render('DocsAbout');
})->name('about');

Route::get('/docs/adding-a-domain', function () {
     return Inertia::render('DocsAddingADomain');
})->name('DocsAddingADomain');

Route::get('/docs/faq', function () {
     return Inertia::render('DocsFrequentlyAskedQuestions');
})->name('DocsFrequentlyAskedQuestions');

Route::get('/docs/getting-started', function () {
     return Inertia::render('DocsGettingStarted');
})->name('DocsGettingStarted');

Route::get('/terms', function () {
     return Inertia::render('terms');
})->name('Terms');

Route::get('/privacy-policy', function () {
     return Inertia::render('PrivacyPolicy');
})->name('PrivacyPolicy');


Route::get('/contact', function () {
     return Inertia::render('Contact');
})->name('Contact');

require __DIR__.'/auth.php';
