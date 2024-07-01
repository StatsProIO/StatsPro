<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AddedDomain extends Mailable
{
    use Queueable, SerializesModels;

    public string $domainName;

    /**
     * Create a new message instance.
     */
    public function __construct($domainName)
    {
        $this->domainName = $domainName;
    }

    public function build()
    {
        return $this
            ->subject('Your website is added to StatsPro!')
            ->markdown('emails.added-domain');
    }
}
