<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\DomainsController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\ErrorController;
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

Route::get('/events/demo.com', [EventsController::class, 'getDemoEvents']);
Route::get('/events/real-time/demo.com', [EventsController::class, 'getDemoEventsRealTime']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/events/{domainName}', [EventsController::class, 'getEventsByDomainName']);
    Route::get('/events/real-time/{domainName}', [EventsController::class, 'getEventsRealTimeByDomain']);
    Route::get('/events/audience/{domainName}', [EventsController::class, 'getEventsAudienceTimeByDomain']);
    Route::get('/event-status/{domainName}', [EventsController::class, 'getEventStatus']);

    Route::get('/subscription-status', [SubscriptionController::class, 'getSubscriptionStatus']);

    Route::get('/user', function (Request $request) { return $request->user(); });

    Route::post('/domain', [DomainsController::class, 'postDomain'])->name('domain');
});


Route::post('/collect', [EventsController::class, 'postEvent']);
Route::post('/event/time-on-page', [EventsController::class, 'postTimeOnPage']);
Route::get('/2Vj2pBn.jpg', [EventsController::class, 'getTrackerPixel']);
Route::post('/contact', [ContactsController::class, 'postContact'])->name('contact');
Route::post('/error', [ErrorController::class, 'add'])->name('error');

