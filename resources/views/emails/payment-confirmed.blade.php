<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmed - OLQP Singles Dinner 2025</title>
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
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
        }
        .header h1 {
            color: #1a1a1a;
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header .subtitle {
            color: #666;
            font-size: 16px;
            margin-top: 5px;
        }
        .content {
            margin-bottom: 30px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #1a1a1a;
        }
        .message {
            font-size: 16px;
            margin-bottom: 25px;
            color: #444;
        }
        .payment-details {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .payment-details h3 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
            font-size: 18px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #555;
        }
        .detail-value {
            color: #1a1a1a;
            font-weight: 500;
        }
        .amount {
            font-size: 20px;
            font-weight: bold;
            color: #28a745;
        }
        .status {
            background-color: #d4edda;
            color: #155724;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }
        .ticket-status {
            background-color: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .ticket-status h3 {
            margin: 0 0 15px 0;
            color: #1565c0;
            font-size: 18px;
        }
        .ticket-status.fully-paid {
            background-color: #d4edda;
            border-color: #c3e6cb;
        }
        .ticket-status.partially-paid {
            background-color: #fff3cd;
            border-color: #ffeaa7;
        }
        .event-info {
            background-color: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .event-info h3 {
            margin: 0 0 15px 0;
            color: #1565c0;
            font-size: 18px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
            color: #666;
            font-size: 14px;
        }
        .contact-info {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .contact-info h4 {
            margin: 0 0 10px 0;
            color: #856404;
            font-size: 16px;
        }
        .contact-info p {
            margin: 5px 0;
            color: #856404;
        }
        .payment-summary {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .payment-summary h3 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
            font-size: 18px;
        }
        .balance-amount {
            font-size: 18px;
            font-weight: bold;
            color: #dc3545;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Payment Confirmed!</h1>
            <div class="subtitle">OLQP Singles Dinner 2025</div>
        </div>

        <div class="content">
            <div class="greeting">
                Dear {{ $attendee->name }},
            </div>

            <div class="message">
                Great news! Your payment has been successfully confirmed. You are now officially registered for the OLQP Singles Dinner 2025 event.
            </div>

            <div class="payment-details">
                <h3>📋 Latest Payment Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Event Ticket Number:</span>
                    <span class="detail-value">{{ $attendee->id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount Confirmed:</span>
                    <span class="detail-value amount">Ksh. {{ number_format($payment->amount) }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">M-Pesa Code:</span>
                    <span class="detail-value">{{ $payment->mpesa_code }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value">{{ ucfirst($payment->method) }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="status">✅ Confirmed</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">{{ $payment->created_at->format('F j, Y \a\t g:i A') }}</span>
                </div>
            </div>

            <div class="payment-summary">
                <h3>💰 Payment Summary</h3>
                <div class="detail-row">
                    <span class="detail-label">Total Confirmed Payments:</span>
                    <span class="detail-value amount">Ksh. {{ number_format($totalConfirmedAmount) }}</span>
                </div>
                @if($pendingAmount > 0)
                <div class="detail-row">
                    <span class="detail-label">Pending Payments:</span>
                    <span class="detail-value">Ksh. {{ number_format($pendingAmount) }}</span>
                </div>
                @endif
                @if($failedAmount > 0)
                <div class="detail-row">
                    <span class="detail-label">Failed Payments:</span>
                    <span class="detail-value">Ksh. {{ number_format($failedAmount) }}</span>
                </div>
                @endif
            </div>

            <div class="ticket-status {{ $totalConfirmedAmount >= 4999 ? 'fully-paid' : 'partially-paid' }}">
                <h3>🎫 Ticket Status</h3>
                @if($totalConfirmedAmount >= 4999)
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value status">✅ Fully Booked</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Message:</span>
                        <span class="detail-value">Your ticket is fully paid and confirmed!</span>
                    </div>
                @else
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value">⚠️ Partially Paid</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Remaining Balance:</span>
                        <span class="detail-value balance-amount">Ksh. {{ number_format(4999 - $totalConfirmedAmount) }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Message:</span>
                        <span class="detail-value">Please complete your payment to secure your full ticket.</span>
                    </div>
                @endif
            </div>

            <div class="event-info">
                <h3>🎭 Event Information</h3>
                <div class="detail-row">
                    <span class="detail-label">Event:</span>
                    <span class="detail-value">{{ $event->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">{{ $event->date->format('F j, Y') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">6:00 PM - 12:00 AM</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Venue:</span>
                    <span class="detail-value">The Edge, South C</span>
                </div>
            </div>

            <div class="message">
                <strong>What's Next?</strong><br>
                @if($totalConfirmedAmount >= 4999)
                    🎫 <strong>Your event ticket is attached to this email!</strong> Please save both this confirmation email and the attached PDF ticket. You may be required to show either at the event entrance. The ticket contains a QR code for quick verification.
                @else
                    Please save this confirmation email. You may be required to show it at the event entrance. Once your payment is complete (Ksh. 4,999), you will receive an event ticket with QR code for verification.
                @endif
                <br><br>
                We look forward to seeing you at this exciting evening of connection and fine dining!
            </div>

            <div class="contact-info">
                <h4>📞 Need Help?</h4>
                <p><strong>Contact:</strong> 0777111000</p>
                <p><strong>Email:</strong> info@olqp.org</p>
                <p>For any questions or concerns, please don't hesitate to reach out to us.</p>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for choosing OLQP Singles Dinner 2025!</p>
            <p>© 2025 OLQP Parish. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
