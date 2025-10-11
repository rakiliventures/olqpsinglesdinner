<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OLQP Singles Dinner 2025 - Event Ticket</title>
    <style>
        @page {
            margin: 0;
            padding: 5px;
            size: A5;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #333;
            font-size: 9px;
        }
        
        .ticket-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            position: relative;
            max-height: 100vh;
        }
        
        .logo-section {
            text-align: center;
            padding: 5px;
            background: #f8f9fa;
            border-bottom: 1px solid #d4af37;
        }
        
        .logo-section img {
            max-height: 35px;
            width: auto;
        }
        
        .header {
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
            color: #1a1a1a;
            padding: 8px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), 
                        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            opacity: 0.3;
        }
        
        .header h1 {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1;
        }
        
        .header .subtitle {
            font-size: 8px;
            margin-top: 3px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .ticket-number {
            background: #1a1a1a;
            color: #d4af37;
            padding: 4px;
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            letter-spacing: 0.5px;
        }
        
        .content {
            padding: 8px;
        }
        
        .attendee-info {
            background: #f8f9fa;
            border-radius: 6px;
            padding: 6px;
            margin-bottom: 6px;
            border-left: 2px solid #d4af37;
        }
        
        .attendee-info h3 {
            margin: 0 0 5px 0;
            color: #1a1a1a;
            font-size: 10px;
            display: flex;
            align-items: center;
            gap: 3px;
        }
        
        .info-grid {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        
        .info-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2px;
            padding: 1px 0;
        }
        
        .info-label {
            font-weight: bold;
            color: #666;
            font-size: 7px;
            flex: 0 0 auto;
            margin-right: 5px;
        }
        
        .info-value {
            font-size: 8px;
            color: #1a1a1a;
            font-weight: 500;
            flex: 1;
            text-align: right;
        }
        
        .event-details {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-radius: 6px;
            padding: 6px;
            margin-bottom: 6px;
            border: 1px solid #2196f3;
        }
        
        .event-details h3 {
            margin: 0 0 5px 0;
            color: #1565c0;
            font-size: 10px;
            display: flex;
            align-items: center;
            gap: 3px;
        }
        
        .payment-summary {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border-radius: 6px;
            padding: 6px;
            margin-bottom: 6px;
            border: 1px solid #4caf50;
        }
        
        .payment-summary h3 {
            margin: 0 0 5px 0;
            color: #2e7d32;
            font-size: 10px;
            display: flex;
            align-items: center;
            gap: 3px;
        }
        
        .status-badge {
            background: #4caf50;
            color: white;
            padding: 2px 4px;
            border-radius: 8px;
            font-size: 7px;
            font-weight: bold;
            display: inline-block;
        }
        
        .footer {
            background: #1a1a1a;
            color: white;
            padding: 8px;
            text-align: center;
            position: relative;
        }
        
        .qr-section {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-bottom: 5px;
        }
        
        .qr-code {
            text-align: center;
        }
        
        .qr-code img {
            border: 1px solid #d4af37;
            border-radius: 4px;
            background: white;
            padding: 2px;
            width: 50px;
            height: 50px;
        }
        
        .qr-info {
            text-align: left;
        }
        
        .qr-info h4 {
            margin: 0 0 4px 0;
            color: #d4af37;
            font-size: 8px;
        }
        
        .qr-info p {
            margin: 1px 0;
            font-size: 6px;
            opacity: 0.9;
        }
        
        .terms {
            font-size: 5px;
            opacity: 0.8;
            margin-top: 4px;
            line-height: 1.1;
        }
        
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 25px;
            color: rgba(212, 175, 55, 0.1);
            font-weight: bold;
            pointer-events: none;
            z-index: 0;
        }
        
        .icon {
            font-size: 8px;
        }
    </style>
</head>
<body>
    <div class="ticket-container">
        <div class="watermark">OLQP</div>
        
        <div class="logo-section">
            <img src="{{ public_path('images/logo.png') }}" alt="OLQP Logo">
        </div>
        
        <div class="header">
            <h1>OLQP SINGLES DINNER 2025</h1>
            <div class="subtitle">An evening of fun, networking and great experiences</div>
        </div>
        
        <div class="ticket-number">
            TICKET #{{ $attendee->id }}
        </div>
        
        <div class="ticket-type" style="background: #2c3e50; color: #ecf0f1; padding: 3px; text-align: center; font-size: 8px; font-weight: bold; letter-spacing: 0.3px;">
            {{ $ticketType }}
        </div>
        
        <div class="content">
            <div style="display: flex; gap: 6px; margin-bottom: 6px;">
                <div class="attendee-info" style="flex: 1;">
                    <h3>Attendee Info</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Name</div>
                            <div class="info-value">{{ $attendee->name }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Email</div>
                            <div class="info-value">{{ $attendee->email }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">WhatsApp</div>
                            <div class="info-value">{{ $attendee->whatsapp }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Gender</div>
                            <div class="info-value">{{ $attendee->gender ?? 'Not specified' }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">OLQP Member</div>
                            <div class="info-value">{{ $attendee->is_olqp_member ? 'Yes' : 'No' }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Status</div>
                            <div class="info-value">
                                <span class="status-badge">PAID</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="payment-summary" style="flex: 1;">
                    <h3>Payment Summary</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Total Paid</div>
                            <div class="info-value">Ksh. {{ number_format($totalConfirmedAmount) }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Latest Payment</div>
                            <div class="info-value">Ksh. {{ number_format($payment->amount) }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Method</div>
                            <div class="info-value">{{ ucfirst($payment->method) }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Date</div>
                            <div class="info-value">{{ $payment->created_at->format('M j, Y') }}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="event-details">
                <h3>Event Details</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Event</div>
                        <div class="info-value">{{ $event->name }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Date</div>
                        <div class="info-value">{{ $event->date->format('F j, Y') }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Time</div>
                        <div class="info-value">6:00 PM - 12:00 AM</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Venue</div>
                        <div class="info-value">The Boma, South C</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="qr-section">
                <div class="qr-code">
                    <img src="{{ $qrCodeBase64 }}" alt="QR Code" width="50" height="50">
                    <p style="margin-top: 2px; font-size: 5px; opacity: 0.8;">Scan to verify</p>
                </div>
            </div>
            
            <div class="terms">
                <strong>Important:</strong> Present this ticket at entrance. QR code for verification. Contact: 0717186600 or olqpsouthbsecretary@gmail.com
                <br>
                <strong>Terms:</strong> Non-transferable, non-refundable. OLQP reserves right to refuse entry for invalid/duplicate tickets.
            </div>
        </div>
    </div>
</body>
</html>
