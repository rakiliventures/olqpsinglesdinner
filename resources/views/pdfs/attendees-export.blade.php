<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendees Export - {{ $event->name ?? 'OLQP Singles Dinner 2025' }}</title>
    <style>
        @page {
            margin: 0.5in;
            size: A4;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 10px;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #d4af37;
        }
        
        .header h1 {
            color: #1a1a1a;
            margin: 0;
            font-size: 18px;
            font-weight: bold;
        }
        
        .header .subtitle {
            color: #666;
            font-size: 12px;
            margin-top: 5px;
        }
        
        .export-info {
            background: #f8f9fa;
            padding: 8px;
            margin-bottom: 15px;
            border-radius: 4px;
            font-size: 9px;
        }
        
        .export-info strong {
            color: #1a1a1a;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th {
            background: #d4af37;
            color: #1a1a1a;
            padding: 6px 4px;
            text-align: left;
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #b8941f;
        }
        
        td {
            padding: 4px;
            border: 1px solid #ddd;
            font-size: 8px;
            vertical-align: top;
        }
        
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        
        tr:hover {
            background: #f5f5f5;
        }
        
        .ticket-type {
            font-weight: bold;
        }
        
        .ticket-type.individual {
            color: #2e7d32;
        }
        
        .ticket-type.group {
            color: #1976d2;
        }
        
        .status-badge {
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 7px;
            font-weight: bold;
        }
        
        .status-badge.confirmed {
            background: #d4edda;
            color: #155724;
        }
        
        .status-badge.pending {
            background: #fff3cd;
            color: #856404;
        }
        
        .status-badge.failed {
            background: #f8d7da;
            color: #721c24;
        }
        
        .amount {
            font-weight: bold;
            color: #2e7d32;
        }
        
        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 8px;
            color: #666;
        }
        
        .summary {
            background: #e3f2fd;
            padding: 8px;
            margin-bottom: 15px;
            border-radius: 4px;
            font-size: 9px;
        }
        
        .summary h3 {
            margin: 0 0 5px 0;
            color: #1565c0;
            font-size: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Attendees Export</h1>
        <div class="subtitle">{{ $event->name ?? 'OLQP Singles Dinner 2025' }}</div>
    </div>

    <div class="export-info">
        <strong>Exported on:</strong> {{ $exported_at }}<br>
        <strong>Total Attendees:</strong> {{ count($attendees) }}<br>
        @if($event)
        <strong>Event Date:</strong> {{ $event->date->format('F j, Y') }}<br>
        <strong>Event Venue:</strong> The Boma, South C
        @endif
    </div>

    @if(count($attendees) > 0)
        <div class="summary">
            <h3>Summary</h3>
        @php
            $individualCount = $attendees->where('ticket_type', 'Individual')->count();
            $groupCount = $attendees->where('ticket_type', 'Group-of-5')->count();
            $totalAmount = $total_revenue ?? 0; // Use pre-calculated revenue from controller
            $confirmedCount = $attendees->where('status', 'confirmed')->count();
        @endphp
            <strong>Individual Tickets:</strong> {{ $individualCount }} | 
            <strong>Group Tickets:</strong> {{ $groupCount }} | 
            <strong>Total Amount:</strong> Ksh. {{ number_format($totalAmount) }} | 
            <strong>Confirmed:</strong> {{ $confirmedCount }}
        </div>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>WhatsApp</th>
                    <th>Gender</th>
                    <th>OLQP Member</th>
                    <th>Ticket Type</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach($attendees as $attendee)
                <tr>
                    <td>{{ $attendee['id'] }}</td>
                    <td>{{ $attendee['name'] }}</td>
                    <td>{{ $attendee['email'] }}</td>
                    <td>{{ $attendee['whatsapp'] }}</td>
                    <td>{{ $attendee['gender'] ?? 'Not specified' }}</td>
                    <td>{{ $attendee['is_olqp_member'] ? 'Yes' : 'No' }}</td>
                    <td>
                        <span class="ticket-type {{ strtolower(str_replace('-', '', $attendee['ticket_type'])) }}">
                            {{ $attendee['ticket_type'] }}
                        </span>
                    </td>
                    <td class="amount">Ksh. {{ number_format($attendee['total_amount']) }}</td>
                    <td>
                        <span class="status-badge {{ $attendee['status'] }}">
                            {{ ucfirst($attendee['status']) }}
                        </span>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <div class="summary">
            <h3>No attendees found</h3>
            <p>There are no attendees to export at this time.</p>
        </div>
    @endif

    <div class="footer">
        <p>Generated by OLQP Singles Dinner 2025 System</p>
        <p>© 2025 OLQP Parish. All rights reserved.</p>
    </div>
</body>
</html>
