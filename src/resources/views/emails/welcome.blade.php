@component('mail::message')
# Welcome!

Thanks for signing up with Marble Metrics! The first step is to register a new domain and add the tracking script to your website.

@component('mail::button', ['url' =>  config('app.url') . '/dashboard'])
Go to your Dashboard
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
