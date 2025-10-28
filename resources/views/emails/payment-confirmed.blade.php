<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmed - OLQP Singles Dinner 2025</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.4;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 10px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 600px) {
            body {
                padding: 5px;
            }
            .container {
                padding: 10px;
                border-radius: 5px;
            }
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f0f0f0;
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
            margin-top: 3px;
        }
        .content {
            margin-bottom: 15px;
        }
        .greeting {
            font-size: 14px;
            margin-bottom: 10px;
            color: #1a1a1a;
        }
        .message {
            font-size: 13px;
            margin-bottom: 12px;
            color: #444;
        }
        
        @media (max-width: 600px) {
            .header h1 {
                font-size: 16px;
            }
            .header .subtitle {
                font-size: 11px;
            }
            .greeting {
                font-size: 13px;
            }
            .message {
                font-size: 12px;
            }
        }
        .payment-details {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 12px;
            margin: 10px 0;
        }
        .payment-details h3 {
            margin: 0 0 8px 0;
            color: #1a1a1a;
            font-size: 14px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            padding: 4px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #555;
            font-size: 12px;
        }
        .detail-value {
            color: #1a1a1a;
            font-weight: 500;
            font-size: 12px;
        }
        .amount {
            font-size: 14px;
            font-weight: bold;
            color: #28a745;
        }
        .status {
            background-color: #d4edda;
            color: #155724;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
        }
        
        @media (max-width: 600px) {
            .payment-details {
                padding: 8px;
                margin: 8px 0;
            }
            .payment-details h3 {
                font-size: 13px;
            }
            .detail-label, .detail-value {
                font-size: 11px;
            }
            .amount {
                font-size: 13px;
            }
            .status {
                font-size: 9px;
                padding: 2px 6px;
            }
        }
        .ticket-status {
            background-color: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 6px;
            padding: 12px;
            margin: 10px 0;
        }
        .ticket-status h3 {
            margin: 0 0 8px 0;
            color: #1565c0;
            font-size: 14px;
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
            border-radius: 6px;
            padding: 12px;
            margin: 10px 0;
        }
        .event-info h3 {
            margin: 0 0 8px 0;
            color: #1565c0;
            font-size: 14px;
        }
        
        @media (max-width: 600px) {
            .ticket-status, .event-info {
                padding: 8px;
                margin: 8px 0;
            }
            .ticket-status h3, .event-info h3 {
                font-size: 13px;
            }
        }
        .footer {
            text-align: center;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid #f0f0f0;
            color: #666;
            font-size: 11px;
        }
        .contact-info {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 10px;
            margin: 10px 0;
        }
        .contact-info h4 {
            margin: 0 0 6px 0;
            color: #856404;
            font-size: 12px;
        }
        .contact-info p {
            margin: 3px 0;
            color: #856404;
            font-size: 11px;
        }
        .payment-summary {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 12px;
            margin: 10px 0;
        }
        .payment-summary h3 {
            margin: 0 0 8px 0;
            color: #1a1a1a;
            font-size: 14px;
        }
        .balance-amount {
            font-size: 14px;
            font-weight: bold;
            color: #dc3545;
        }
        
        @media (max-width: 600px) {
            .footer {
                font-size: 10px;
                margin-top: 10px;
            }
            .contact-info {
                padding: 8px;
                margin: 8px 0;
            }
            .contact-info h4 {
                font-size: 11px;
            }
            .contact-info p {
                font-size: 10px;
            }
            .payment-summary {
                padding: 8px;
                margin: 8px 0;
            }
            .payment-summary h3 {
                font-size: 13px;
            }
            .balance-amount {
                font-size: 13px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Payment Confirmed!</h1>
            <div class="subtitle">OLQP Singles Dinner 2025</div>
        </div>

        <div class="content">
            <div class="greeting">
                Dear {{ $attendee->name }},
            </div>

            <div class="message">
                🎉 <strong>Thank you for registering!</strong> We truly appreciate your participation in the OLQP Singles Dinner 2025!
            </div>

            <div class="payment-details">
                <h3>Latest Payment Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Event Ticket Number:</span>
                    <span class="detail-value">{{ $attendee->id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Ticket Type:</span>
                    <span class="detail-value">{{ $ticketType }}</span>
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
                <h3>Payment Summary</h3>
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

            @php
                // Determine required amount based on ticket type
                $requiredAmount = $ticketType === 'Group-of-5' ? 22500 : 4999;
                $isFullyPaid = $totalConfirmedAmount >= $requiredAmount;
            @endphp

            <div class="ticket-status {{ $isFullyPaid ? 'fully-paid' : 'partially-paid' }}">
                <h3>Ticket Status</h3>
                @if($isFullyPaid)
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value status">✅ Fully Booked</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Message:</span>
                        <span class="detail-value">Your {{ $ticketType }} ticket is fully paid and confirmed!</span>
                    </div>
                @else
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value"> Partially Paid</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Remaining Balance:</span>
                        <span class="detail-value balance-amount">Ksh. {{ number_format($requiredAmount - $totalConfirmedAmount) }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Message:</span>
                        <span class="detail-value">Please complete your payment to secure your full {{ $ticketType }} ticket.</span>
                    </div>
                @endif
            </div>

            @php
                $eventDate = \Carbon\Carbon::create(2025, 10, 31);
                $daysRemaining = max(0, (int) now()->diffInDays($eventDate, false));
            @endphp

            <div class="event-info">
                <h3>Event Information</h3>
                <div class="detail-row">
                    <span class="detail-label">Event:</span>
                    <span class="detail-value">{{ $event->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">October 31, 2025</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">6:00 PM - 12:00 AM</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Venue:</span>
                    <span class="detail-value">The Boma Hotel, South C</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Days Remaining:</span>
                    <span class="detail-value" style="color: #28a745; font-weight: bold;">{{ $daysRemaining }} {{ $daysRemaining == 1 ? 'day' : 'days' }}</span>
                </div>
            </div>

            <div class="event-info">
                <h3>🚗 Arrival & Check-in Information</h3>
                <div class="detail-row">
                    <span class="detail-label">Arrival Time:</span>
                    <span class="detail-value">Please arrive between 5:30 PM - 6:30 PM</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-in Process:</span>
                    <span class="detail-value">Present your ticket (PDF or QR code) at the entrance</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Parking:</span>
                    <span class="detail-value">Free parking available at The Boma Hotel</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Dress Code:</span>
                    <span class="detail-value">Elegant with a masquerade</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">What to Bring:</span>
                    <span class="detail-value">Valid ID, your ticket, and a great attitude!</span>
                </div>
            </div>

            <div class="message">
                @if($isFullyPaid)
                    <strong>🎫 Your Event Ticket is Attached!</strong><br>
                    Save this email and the attached PDF ticket. Show either at the event entrance. The ticket contains a QR code for quick verification.
                    <br><br>
                    <strong>🎉 We're excited to welcome you to an evening of fun, networking, and great experiences!</strong><br>
                    Get ready for delicious food, engaging conversations, and memorable moments. Don't forget to bring your positive energy and be ready to make new connections!
                @else
                    <strong>📧 Save this confirmation email</strong> - you may need to show it at the event entrance. Complete your payment (Ksh. {{ number_format($requiredAmount) }}) to receive your event ticket with QR code.
                    <br><br>
                    <strong>We look forward to seeing you at this exciting evening!</strong>
                @endif
            </div>

            <div class="contact-info">
                <h4>📞 Need Help?</h4>
                <p><strong>Contact:</strong> 0712328325</p>
                <p><strong>Email:</strong> olqpsouthbsecretary@gmail.com</p>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for choosing OLQP Singles Dinner 2025!</p>
            <p>© 2025 OLQP Parish. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
