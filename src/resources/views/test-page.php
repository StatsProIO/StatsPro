<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>

      <script data-domain="roastmygame.com" src="http://localhost/js/broadcaster.js" async></script>
      <script> window.sp_events = window.sp_events || []; function sp_track(){window.sp_events.push(arguments)} </script>
      <script>sp_track("my-test-event")</script>

  </head>
  <body>
    <main>
        <h1>Test Page</h1>
        <a href="/test-page/nested">Go to nested page</a>

        <button onclick="history.pushState({}, '', 'test-page/nested');">Go to nested page via pushState</button>

        <button onclick="history.replaceState({}, '', 'test-page/nested');">Go to nested page via replaceState</button>

    </main>

  <script>
      setTimeout(function(){
          sp_track('my-test-event-delay')
      }, 2000);
  </script>
  </body>
</html>
