<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pre-Event Message - OLQP Singles Dinner 2025</title>
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
        
        @media (max-width: 600px) {
            .event-info {
                padding: 8px;
                margin: 8px 0;
            }
            .event-info h3 {
                font-size: 13px;
            }
            .detail-label, .detail-value {
                font-size: 11px;
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
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to the Singles Dinner!</h1>
            <div class="subtitle">OLQP Singles Dinner 2025</div>
        </div>

        <div class="content">
            <div class="greeting">
                Dear <strong>{{ $attendee->name }}</strong>,
            </div>

            <div class="message">
                <strong>Thank you for registering for the Singles Dinner scheduled for October 31st.</strong> We look forward to hosting you for an evening of fun and networking. Please find below the event details for your reference!
            </div>

            @php
                $eventDate = \Carbon\Carbon::create(2025, 10, 31);
                $daysRemaining = max(0, (int) now()->diffInDays($eventDate, false));
            @endphp

            <div class="event-info">
                <h3>🎭 Event Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">Oct 31, 2025</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">6:30PM-10:30PM</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Venue:</span>
                    <span class="detail-value">The Boma Hotel, South C</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Days Left:</span>
                    <span class="detail-value" style="color: #28a745; font-weight: bold;">{{ $daysRemaining }} {{ $daysRemaining == 1 ? 'day' : 'days' }}</span>
                </div>
            </div>

            <div class="event-info">
                <h3>🚗 Arrival & Check-in</h3>
                <div class="detail-row">
                    <span class="detail-label">Arrival Time:</span>
                    <span class="detail-value">6:00 PM - 6:30 PM. Kick-off at 6:35 PM</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-in:</span>
                    <span class="detail-value">Present ticket (PDF or QR code) at venue entrance</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Parking:</span>
                    <span class="detail-value">Complimentary parking available at The Boma Hotel</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Dress Code:</span>
                    <span class="detail-value">Elegant attire with a masquerade touch</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">What to Bring:</span>
                    <span class="detail-value">Valid ID, your ticket, and great energy!</span>
                </div>
            </div>

            <div class="message">
                <strong>🎫 Your ticket</strong> Your event ticket is attached to this email. Please save it and present either the PDF or QR code at the entrance.
                <br><br>
                We look forward to an evening of great food, good conversations, and meeting new people.
            </div>

            <div class="contact-info">
                <h4>📞 Need Help?</h4>
                <p><strong>Contact:</strong> 0712328325</p>
                <p><strong>Email:</strong> olqpsouthbsecretary@gmail.com</p>
            </div>
        </div>

        <div class="footer">
            <p>We can't wait to see you at OLQP Singles Dinner 2025!</p>
            <p>© 2025 OLQP Parish. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
