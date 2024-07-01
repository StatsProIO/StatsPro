<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactForm extends Mailable
{
    use Queueable, SerializesModels;

    public string $email;
    public string $message;


    /**
     * Create a new message instance.
     */
    public function __construct($email, $message)
    {
        $this->email = $email;
        $this->message = $message;
    }

    public function build()
    {
        return $this
            ->subject('Contact StatsPro')
            ->markdown('emails.contact-form');
    }
}
