<?php

namespace App\Http\Controllers;

use App\Models\Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function get()
    {
        $errorsGroupedByDate = DB::table('errors')
            ->select(DB::raw('date(created_at) as created_date'), DB::raw('count(*) as total'))
            ->orderBy(DB::raw('created_date'), 'DESC')
            ->groupBy(DB::raw('date(created_at)'))
            ->get();

        $latestErrors = DB::table('errors')
            ->select('message', 'created_at')
            ->limit(10)
            ->get();

        $eventsGroupedByDate = DB::table('events')
            ->select(DB::raw('date(created_at) as created_date'), DB::raw('count(*) as total'))
            ->orderBy(DB::raw('created_date'), 'DESC')
            ->groupBy(DB::raw('date(created_at)'))
            ->get();

        $users = DB::table('users')
            ->select(DB::raw('*'))
            ->get();

         $domains = DB::table('domains')
             ->select(DB::raw('*'))
             ->get();

        return view('admin', compact('errorsGroupedByDate', 'latestErrors', 'eventsGroupedByDate', 'users', 'domains'));
    }


}
