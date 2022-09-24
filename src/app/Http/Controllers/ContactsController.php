<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactsController extends Controller
{
    function postContact(Request $request) {
        $contact = new Contact();
        $contact->email = $request->email;
        $contact->message = $request->message;
        $contact->save();

        return redirect()->intended('/contact')->with('message', 'Message sent! We\'ll be in touch shortly!');
    }
}
