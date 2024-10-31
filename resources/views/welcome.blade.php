<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="images/favicon.svg" sizes="any" type="image/svg+xml">
        <title>Журнал ТО</title>
        @vite('resources/app.js')
        @vite('resources/css/app.css')
    </head>
    <body class="antialiased">
        <div id="app"></div>
    </body>
</html>
