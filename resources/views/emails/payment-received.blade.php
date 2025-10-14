<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Received - OLQP Singles Dinner 2025</title>
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
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .success-banner {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 25px;
        }
        .success-banner h2 {
            margin: 0 0 10px 0;
            font-size: 20px;
        }
        .success-banner p {
            margin: 0;
            font-size: 14px;
            opacity: 0.95;
        }
        .payment-details {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .payment-details h3 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
            font-size: 18px;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 10px;
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
            font-size: 14px;
        }
        .detail-value {
            font-weight: 500;
            color: #1a1a1a;
            font-size: 14px;
        }
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .amount {
            font-size: 18px;
            font-weight: bold;
            color: #059669;
        }
        .next-steps {
            background-color: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 20px;
            margin-bottom: 25px;
        }
        .next-steps h3 {
            margin: 0 0 15px 0;
            color: #1976d2;
            font-size: 16px;
        }
        .next-steps ul {
            margin: 0;
            padding-left: 20px;
        }
        .next-steps li {
            margin-bottom: 8px;
            font-size: 14px;
            color: #424242;
        }
        .contact-info {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        .contact-info h3 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
            font-size: 16px;
        }
        .contact-info p {
            margin: 5px 0;
            font-size: 14px;
            color: #495057;
        }
        .footer {
            background-color: #1a1a1a;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer p {
            margin: 5px 0;
            opacity: 0.8;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .content {
                padding: 20px 15px;
            }
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎭 OLQP Singles Dinner 2025</h1>
            <p>Our Lady Queen of Peace Catholic Parish, South B</p>
        </div>

        <div class="content">
            <div class="success-banner">
                <h2>✅ Payment Received Successfully!</h2>
                <p>Your payment has been received and is now awaiting admin confirmation.</p>
            </div>

            <div class="payment-details">
                <h3>Payment Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Attendee Name:</span>
                    <span class="detail-value">{{ $attendee->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">{{ $attendee->email }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">WhatsApp:</span>
                    <span class="detail-value">{{ $attendee->whatsapp }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Ticket Type:</span>
                    <span class="detail-value">{{ $ticketType }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount Paid:</span>
                    <span class="detail-value amount">Ksh. {{ number_format($payment->amount) }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">M-Pesa Code:</span>
                    <span class="detail-value">{{ $payment->mpesa_code }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Date:</span>
                    <span class="detail-value">{{ $payment->created_at->format('F j, Y \a\t g:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value">
                        <span class="status-pending">Awaiting Confirmation</span>
                    </span>
                </div>
            </div>

            <div class="next-steps">
                <h3>What Happens Next?</h3>
                <ul>
                    <li><strong>Admin Review:</strong> Our team will review your payment details</li>
                    <li><strong>Confirmation:</strong> You'll receive a confirmation email once approved</li>
                    <li><strong>Ticket Delivery:</strong> Your event ticket will be sent via email and WhatsApp</li>
                    <li><strong>Event Day:</strong> Present your ticket at The Boma Hotel, South C</li>
                </ul>
            </div>

            <div class="contact-info">
                <h3>Need Help?</h3>
                <p><strong>Phone:</strong> 0712328325</p>
                <p><strong>Email:</strong> For any inquiries or support</p>
                <p><strong>Event Date:</strong> October 31, 2025 at 6:00 PM</p>
                <p><strong>Venue:</strong> The Boma Hotel, South C</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Our Lady Queen of Peace Catholic Parish, South B</strong></p>
            <p>Thank you for your registration. We look forward to seeing you at this exciting evening!</p>
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
