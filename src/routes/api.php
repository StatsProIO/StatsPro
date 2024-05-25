<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\DomainsController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\ShortLinkController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/events/dashboard/top-bar/demo.com', [EventsController::class, 'getDashboardEventsTopRowByDomainName']);
Route::get('/events/dashboard/above-the-fold/demo.com', [EventsController::class, 'getDashboardEventsAboveTheFoldByDomainName']);
Route::get('/events/dashboard/below-the-fold/demo.com', [EventsController::class, 'getDashboardEventsBelowTheFoldByDomainName']);
Route::get('/events/real-time/demo.com', [EventsController::class, 'getEventsRealTimeByDomain']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/events/dashboard/top-bar/{domainName}', [EventsController::class, 'getDashboardEventsTopRowByDomainName']);
    Route::get('/events/dashboard/above-the-fold/{domainName}', [EventsController::class, 'getDashboardEventsAboveTheFoldByDomainName']);
    Route::get('/events/dashboard/below-the-fold/{domainName}', [EventsController::class, 'getDashboardEventsBelowTheFoldByDomainName']);
    Route::get('/events/real-time/{domainName}', [EventsController::class, 'getEventsRealTimeByDomain']);
    Route::get('/events/audience/{domainName}', [EventsController::class, 'getEventsAudienceTimeByDomain']);
    Route::get('/events/behavior/{domainName}', [EventsController::class, 'getEventsBehaviorTimeByDomain']);
    Route::get('/events/acquisition/{domainName}', [EventsController::class, 'getEventsAcquisitionByDomain']);
    Route::get('/events/sessions/{domainName}', [EventsController::class, 'getEventsSessionsByDomain']);
    Route::get('/events/performance/{domainName}', [EventsController::class, 'getEventsPerformanceByDomain']);
    Route::get('/event-status/{domainName}', [EventsController::class, 'getEventStatus']);

    Route::get('/subscription-status', [SubscriptionController::class, 'getSubscriptionStatus']);

    Route::get('/user', function (Request $request) { return $request->user(); });

    Route::post('/domain', [DomainsController::class, 'postDomain'])->name('domain');
});

Route::post('/shortLink', [ShortLinkController::class, 'createShortLink'])->name('createShortLink');

Route::post('/collect', [EventsController::class, 'postEvent']);
Route::post('/event/time-on-page', [EventsController::class, 'postTimeOnPage']);
Route::get('/2Vj2pBn.jpg', [EventsController::class, 'getTrackerPixel']);
Route::post('/contact', [ContactsController::class, 'postContact'])->name('contact');
Route::post('/error', [ErrorController::class, 'add'])->name('error');



