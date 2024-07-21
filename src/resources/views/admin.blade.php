<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin</title>

    <style>
        table {
            border-collapse: collapse;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            text-align: center;
            border-radius: 5px;

        }

        td{
            padding: 2px;
        }

        th {
            padding-top: 10px;
        }

    </style>

  </head>
  <body>
    <main>
    <h1>Admin</h1>
    <div>
        <h2>Errors</h2>
        <h3>Aggregate Errors</h3>

        <table>
            <tr>
                <th>Date</th>
                <th>Count</th>
            </tr>
            @foreach ($errorsGroupedByDate as $errorCountByDate)
                <tr>
                    <td>{{$errorCountByDate->created_date}}<td>
                    <td>{{$errorCountByDate->total}}</td>
                </tr>
            @endforeach
        </table>
    </div>

    <h3>Recent Errors</h3>
    @foreach ($latestErrors as $latestError)
    <pre>
        {{$latestError->message}}
        {{$latestError->created_at}}
    </pre>
    @endforeach


    <h3>Events</h3>

    <h3>Aggregate Events</h3>

    <table>
        <tr>
            <th>Date</th>
            <th>Count</th>
        </tr>
        @foreach ($eventsGroupedByDate as $eventCountByDate)
            <tr>
                <td>{{$eventCountByDate->created_date}}<td>
                <td>{{$eventCountByDate->total}}</td>
            </tr>
        @endforeach
    </table>


    <h3>Users</h3>
    <table>
        <tr>
            <th>Email</th>
            <th>Created At</th>
        </tr>
        @foreach ($users as $user)
            <tr>
                <td>{{$user->email}}<td>
                <td>{{$user->created_at}}</td>
            </tr>
        @endforeach
    </table>

    <h3>Domains</h3>
    <table>
        <tr>
            <th>Domain</th>
            <th>Created At</th>
        </tr>
        @foreach ($domains as $domain)
            <tr>
                <td>{{$domain->domain_name}}<td>
                <td>{{$domain->created_at}}</td>
            </tr>
        @endforeach
    </table>

    </main>
  </body>

</html>
