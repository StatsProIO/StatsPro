@component('mail::message')
# You've added a website to StatsPro!

One last step to start seeing amazing data! Click the button below to get the tracking code to add to your website:

@component('mail::button', ['url' =>  config('app.url') . '/domain/'. $domainName . '/script'])
    Get the code!
@endcomponent

@endcomponent
