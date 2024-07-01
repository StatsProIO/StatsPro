<?php

namespace App\Http\Controllers;

use App\Mail\ContactForm;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactsController extends Controller
{
    function postContact(Request $request) {
        $contact = new Contact();
        $contact->email = $request->email;
        $contact->message = $request->message;
        $contact->save();

        Mail::to('statsproapp@gmail.com')->bcc('ipod998@gmail.com')->send(new ContactForm($contact->email, $contact->message));

        return redirect()->intended('/contact')->with('message', 'Message sent! We\'ll be in touch shortly!');
    }
}
