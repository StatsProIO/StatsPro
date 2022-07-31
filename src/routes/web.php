<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TestPageController;
use App\Models\Domain;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    //TODO: make sure the user has atleast 1 domain, otherwise redirect to manage-sites
    $domain = Domain::where('user_id', Auth::user()->id)->oldest()->first();
    

    if($domain == null) {
        return Redirect::route('manage-domains');
    }

    return Inertia::render('Dashboard', ['firstDomain' => $domain->domain_name ]);
})->middleware(['auth', 'verified'])->name('dashboard');


//TODO: return only the domains that 
Route::get('/manage-domains', function () {
    return Inertia::render('ManageDomains', ['domains' => Domain::where('user_id', Auth::user()->id)->get()]);
})->middleware(['auth', 'verified'])->name('manage-domains');

Route::get('/add-domain', function () {
    return Inertia::render('AddDomain');
})->middleware(['auth', 'verified'])->name('add-domain');

//TODO: make sure that the domain is owned by this user
Route::get('/domain/{domain_name}/script', function ($domainName) {
    return Inertia::render('DomainScript', ['domain' => Domain::where('domain_name', $domainName)->first()]);
})->middleware(['auth', 'verified'])->name('web.domain');

Route::get('/test-page', [TestPageController::class, 'get']);





require __DIR__.'/auth.php';
