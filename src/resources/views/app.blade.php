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
        <style>
            /* roboto-regular - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                src: url('/fonts/roboto-v30-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
            /* roboto-500 - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 500;
                src: url('/fonts/roboto-v30-latin-500.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
            /* roboto-700 - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                src: url('/fonts/roboto-v30-latin-700.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
            /* barlow-regular - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Barlow';
                font-style: normal;
                font-weight: 400;
                src: url('../fonts/barlow-v12-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
            /* barlow-500 - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Barlow';
                font-style: normal;
                font-weight: 500;
                src: url('../fonts/barlow-v12-latin-500.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
            /* barlow-600 - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Barlow';
                font-style: normal;
                font-weight: 600;
                src: url('../fonts/barlow-v12-latin-600.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
        </style>
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
