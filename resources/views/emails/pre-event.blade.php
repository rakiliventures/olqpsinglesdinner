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
            <h1>Masks Available at Venue Tonight!</h1>
            <div class="subtitle">OLQP Singles Dinner 2025</div>
        </div>

        <div class="content">
            <div class="greeting">
                Dear <strong>{{ $attendee->name }}</strong>,
            </div>

            <div class="message">
                Exciting news! For those who haven't found the perfect masquerade mask yet, we'll have a vendor on-site at The Boma Hotel this evening selling beautiful masks.
                <br><br>
                See you at 6:00 PM for an amazing night!
            </div>
        </div>

        <div class="footer">
            <p>The OLQP Singles Dinner Team</p>
            <p>© 2025 OLQP Parish. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
