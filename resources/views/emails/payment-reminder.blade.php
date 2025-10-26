<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Reminder - OLQP Singles Dinner 2025</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #d4af37;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1a1a1a;
            margin: 0;
            font-size: 24px;
        }
        .header .subtitle {
            color: #666;
            margin-top: 5px;
            font-size: 14px;
        }
        .content {
            margin-bottom: 30px;
        }
        .greeting {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .payment-summary {
            background: #f8f9fa;
            border-left: 4px solid #d4af37;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .payment-summary h3 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
            font-size: 18px;
        }
        .amount-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .amount-row:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 16px;
            color: #d4af37;
        }
        .label {
            font-weight: 500;
        }
        .amount {
            font-weight: bold;
        }
        .remaining {
            color: #dc3545;
        }
        .event-info {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border: 2px solid #2196f3;
        }
        .event-info h3 {
            margin: 0 0 15px 0;
            color: #1565c0;
            font-size: 18px;
        }
        .event-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .event-detail {
            display: flex;
            flex-direction: column;
        }
        .event-detail .label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }
        .event-detail .value {
            font-weight: bold;
            color: #1a1a1a;
        }
        .cta-section {
            text-align: center;
            margin: 30px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
            color: #1a1a1a;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .payment-methods {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .payment-methods h4 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
            font-size: 16px;
        }
        .method {
            margin: 10px 0;
            padding: 10px;
            background: white;
            border-radius: 5px;
            border-left: 3px solid #d4af37;
        }
        .method strong {
            color: #1a1a1a;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
            font-size: 14px;
        }
        .contact-info {
            margin: 15px 0;
        }
        .contact-info a {
            color: #d4af37;
            text-decoration: none;
        }
        .urgency {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
        }
        .urgency strong {
            color: #dc3545;
        }
        @media (max-width: 600px) {
            .event-details {
                grid-template-columns: 1fr;
            }
            .amount-row {
                flex-direction: column;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>OLQP Singles Dinner 2025</h1>
            <div class="subtitle">Payment Reminder</div>
        </div>

        <div class="content">
            <div class="greeting">
                <strong>Hello {{ $attendee->name }},</strong>
            </div>

            <p>This is a friendly reminder about your payment status for the OLQP Singles Dinner 2025.</p>

            @if($daysRemaining <= 7)
                <div class="urgency">
                    <strong>URGENT:</strong> Only {{ $daysRemaining }} {{ $daysRemaining == 1 ? 'day' : 'days' }} remaining until the event! Please complete your payment immediately.
                </div>
            @elseif($daysRemaining <= 14)
                <div class="urgency">
                    <strong>Reminder:</strong> Only {{ $daysRemaining }} days remaining until the event. Please complete your payment soon.
                </div>
            @else
                <div class="urgency">
                    <strong>Payment Due:</strong> {{ $daysRemaining }} days remaining until the event. Please complete your payment to secure your spot.
                </div>
            @endif

            <div class="payment-summary">
                <h3>💰 Payment Summary</h3>
                <div class="amount-row">
                    <span class="label">Ticket Type:</span>
                    <span class="amount">{{ $ticketType }}</span>
                </div>
                <div class="amount-row">
                    <span class="label">Event Fee:</span>
                    <span class="amount">Ksh. {{ number_format($eventAmount) }}</span>
                </div>
                <div class="amount-row">
                    <span class="label">Amount Paid:</span>
                    <span class="amount">Ksh. {{ number_format($totalPaid) }}</span>
                </div>
                <div class="amount-row">
                    <span class="label">Remaining Balance:</span>
                    <span class="amount remaining">Ksh. {{ number_format($remainingBalance) }}</span>
                </div>
            </div>

            <div class="event-info">
                <h3>📅 Event Details</h3>
                <div class="event-details">
                    <div class="event-detail">
                        <div class="label">Date</div>
                        <div class="value">October 31, 2025</div>
                    </div>
                    <div class="event-detail">
                        <div class="label">Time</div>
                        <div class="value">6:00 PM - 12:00 AM</div>
                    </div>
                    <div class="event-detail">
                        <div class="label">Venue</div>
                        <div class="value">The Boma Hotel, South C</div>
                    </div>
                </div>
            </div>

            <div class="payment-methods">
                <h4>💳 How to Complete Payment</h4>
                <div class="method">
                    <strong>Step 1:</strong> After paying amount via M-Pesa, Paybill: 7171186, Account: DINNER
                </div>
                <div class="method">
                    <strong>Step 2:</strong> Go to www.olqpdinner.com and click 'Update Ticket' button
                </div>
                <div class="method">
                    <strong>Step 3:</strong> Enter your Ticket ID: <strong>{{ $attendee->id }}</strong> (Your ticket ID is {{ $attendee->id }})
                </div>
                <div class="method">
                    <strong>Step 4:</strong> Enter your M-Pesa transaction code and amount
                </div>
            </div>

            <div class="cta-section">
                <a href="{{ route('singles-event') }}" class="cta-button">
                    Complete Payment Now
                </a>
            </div>

            <p><strong>Important:</strong> Complete your payment to secure your spot. Once fully paid, you'll receive your event ticket with QR code for entry.</p>
        </div>

        <div class="footer">
            <div class="contact-info">
                <strong>Contact:</strong> 0712328325 | olqpsouthbsecretary@gmail.com
            </div>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
                This is an automated reminder. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
