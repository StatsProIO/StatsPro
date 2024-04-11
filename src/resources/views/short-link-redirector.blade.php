<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Redirecting...</title>

    <script data-short-link-id="{{$id}}" data-short-link-url="{{$url}}" src="/js/broadcaster.js" async></script>
    <script>
        window.onload = function () {
            setTimeout(
                () => document.getElementById('redirect-text').style.display= "block",
                3000
            );
        }
    </script>

  </head>
  <body>
    <main>
        <div id="redirect-text" style="display: none;">
            <h1>Redirecting...</h1>
            <a href="{{$url}}">If you are not redirected, click here.</a>
        </div>
    </main>
  </body>
</html>
