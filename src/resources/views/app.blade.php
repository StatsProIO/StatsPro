<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" sizes="180x180" href="{{asset("/images/favicon/apple-touch-icon.png")}}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{asset("/images/favicon/favicon-32x32.png")}}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{asset("/images/favicon/favicon-16x16.png")}}">
        <link rel="manifest" href="{{asset("/images/favicon/site.webmanifest")}}">
        <link rel="mask-icon" href="{{asset("/images/favicon/safari-pinned-tab.svg")}}" color="#3163e3">
        <link rel="shortcut icon" href="{{asset("/images/favicon/favicon.ico")}}">
        <meta name="msapplication-TileColor" content="#2b5797">
        <meta name="msapplication-config" content="{{asset("/images/favicon/browserconfig.xml")}}">
        <meta name="theme-color" content="#ffffff">


        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <style>
            /* inter-regular - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                src: url('{{asset('/fonts/inter-v13-latin-regular.woff2')}}') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
            /* inter-600 - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                src: url('{{asset('/fonts/inter-v13-latin-600.woff2')}}') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
            /* inter-800 - latin */
            @font-face {
                font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                font-family: 'Inter';
                font-style: normal;
                font-weight: 800;
                src: url('{{asset('/fonts/inter-v13-latin-800.woff2')}}') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
            }
        </style>
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead

        <script data-domain="statspro.io" src="{{ config('app.url') }}/js/broadcaster.js" async> </script>

    </head>
    <body class="font-sans antialiased" style="background-color: #f7f9fc">
        @inertia

    </body>

</html>
