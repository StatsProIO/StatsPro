<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
        <link rel="manifest" href="/images/favicon/site.webmanifest">
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#3163e3">
        <link rel="shortcut icon" href="/images/favicon/favicon.ico">
        <meta name="msapplication-TileColor" content="#2b5797">
        <meta name="msapplication-config" content="/images/favicon/browserconfig.xml">
        <meta name="theme-color" content="#ffffff">


        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Roboto:wght@500;700&display=swap" rel="stylesheet">
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead

        <script data-domain="stats.io" src="{{ config('app.url') }}/js/broadcaster.js" async> </script>
    </head>
    <body class="font-sans antialiased" style="background-color: #f7f9fc">
        @inertia
    </body>
</html>
