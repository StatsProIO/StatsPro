<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\DomainsController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/get-visitor-id', [EventsController::class, 'getVisitorId']);

Route::post('/collect', [EventsController::class, 'postEvent']);
Route::post('/event/time-on-page', [EventsController::class, 'postTimeOnPage']);


Route::get('/2Vj2pBn.jpg', [EventsController::class, 'getTrackerPixel']);


//TODO: this needs to be authenticated
Route::get('/events', [EventsController::class, 'getEvents']);

//TODO: this needs to be authenticated
Route::get('/event-status/{domainName}', [EventsController::class, 'getEventStatus']);

Route::middleware('auth:sanctum')->post('/domain', [DomainsController::class, 'postDomain'])->name('domain');

