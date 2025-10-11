<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Payment Notification</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .title {
            font-size: 20px;
            color: #27ae60;
            margin: 0;
        }
        .alert {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 25px;
            text-align: center;
            font-weight: bold;
        }
        .payment-details {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
            flex: 1;
        }
        .detail-value {
            font-weight: 500;
            color: #212529;
            flex: 1;
            text-align: right;
        }
        .amount {
            color: #28a745;
            font-weight: bold;
            font-size: 18px;
        }
        .ticket-type {
            background: #007bff;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .action-button {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 10px 5px;
            transition: background-color 0.3s;
        }
        .action-button:hover {
            background: #0056b3;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
        }
        .admin-info {
            background: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 5px;
            padding: 15px;
            margin-top: 20px;
        }
        .admin-info h4 {
            margin: 0 0 10px 0;
            color: #1976d2;
        }
        .admin-info p {
            margin: 5px 0;
            color: #424242;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">OLQP Singles Dinner 2025</div>
            <h1 class="title">New Payment Received</h1>
        </div>

        <div class="alert">
            🔔 A new payment has been received and requires your confirmation
        </div>

        <div class="payment-details">
            <h3 style="margin-top: 0; color: #2c3e50;">Payment Information</h3>
            
            <div class="detail-row">
                <span class="detail-label">Payment ID:</span>
                <span class="detail-value">#{{ $payment->id }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Attendee Name:</span>
                <span class="detail-value">{{ $attendee?->name ?? 'N/A' }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">{{ $attendee?->email ?? 'N/A' }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">WhatsApp:</span>
                <span class="detail-value">{{ $attendee?->whatsapp ?? 'N/A' }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Ticket Type:</span>
                <span class="detail-value">
                    <span class="ticket-type">{{ $ticketType }}</span>
                </span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Amount Paid:</span>
                <span class="detail-value amount">Ksh. {{ number_format($payment->amount) }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">M-Pesa Code:</span>
                <span class="detail-value"><strong>{{ $payment->mpesa_code }}</strong></span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Payment Method:</span>
                <span class="detail-value">{{ ucfirst($payment->method) }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value" style="color: #ffc107; font-weight: bold;">{{ ucfirst($payment->status) }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Received At:</span>
                <span class="detail-value">{{ $payment->created_at->format('M d, Y \a\t g:i A') }}</span>
            </div>
        </div>

        <div class="admin-info">
            <h4>Admin Action Required</h4>
            <p><strong>Next Steps:</strong></p>
            <p>1. Log into the admin panel</p>
            <p>2. Navigate to the Payments section</p>
            <p>3. Find payment #{{ $payment->id }} for {{ $attendee?->name ?? 'Unknown' }}</p>
            <p>4. Verify the M-Pesa code: <strong>{{ $payment->mpesa_code }}</strong></p>
            <p>5. Confirm the payment to send tickets to the attendee</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <a href="{{ route('admin.payments.index') }}" class="action-button">
                View Payments Dashboard
            </a>
        </div>

        <div class="footer">
            <p>This is an automated notification from the OLQP Singles Dinner 2025 system.</p>
            <p>Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
