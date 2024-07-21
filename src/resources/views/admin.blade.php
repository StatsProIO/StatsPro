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
              width: 100%;
              color: #333;
              font-family: Arial, sans-serif;
              font-size: 14px;
              text-align: left;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              margin: auto;
              margin-top: 50px;
              margin-bottom: 50px;
          }

          table th {
              background-color: #226bb5;
              color: #fff;
              font-weight: bold;
              padding: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-top: 1px solid #fff;
              border-bottom: 1px solid #ccc;
          }

          table tr:nth-child(even) td {
              background-color: #f2f2f2;
          }

          table tr:hover td {
              background-color: #ffedcc;
          }

          table td {
              background-color: #fff;
              padding: 10px;
              border-bottom: 1px solid #ccc;
              font-weight: bold;
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
                    <td>{{$errorCountByDate->created_date}}</td>
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
                <td>{{$eventCountByDate->created_date}}</td>
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
                <td>{{$user->email}}</td>
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
                <td>{{$domain->domain_name}}</td>
                <td>{{$domain->created_at}}</td>
            </tr>
        @endforeach
    </table>

    </main>
  </body>

</html>
