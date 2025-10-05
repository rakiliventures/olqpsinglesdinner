<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OLQP Singles Dinner 2025 - Event Ticket</title>
    <style>
        @page {
            margin: 0;
            padding: 10px;
            size: A4;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #333;
            font-size: 12px;
        }
        
        .ticket-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            position: relative;
            max-height: 100vh;
        }
        
        .logo-section {
            text-align: center;
            padding: 10px;
            background: #f8f9fa;
            border-bottom: 2px solid #d4af37;
        }
        
        .logo-section img {
            max-height: 60px;
            width: auto;
        }
        
        .header {
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
            color: #1a1a1a;
            padding: 15px;
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
            font-size: 20px;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1;
        }
        
        .header .subtitle {
            font-size: 12px;
            margin-top: 5px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .ticket-number {
            background: #1a1a1a;
            color: #d4af37;
            padding: 8px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 1px;
        }
        
        .content {
            padding: 15px;
        }
        
        .attendee-info {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
            border-left: 3px solid #d4af37;
        }
        
        .attendee-info h3 {
            margin: 0 0 10px 0;
            color: #1a1a1a;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
        }
        
        .info-item {
            display: flex;
            flex-direction: column;
        }
        
        .info-label {
            font-weight: bold;
            color: #666;
            font-size: 10px;
            margin-bottom: 2px;
        }
        
        .info-value {
            font-size: 11px;
            color: #1a1a1a;
            font-weight: 500;
        }
        
        .event-details {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
            border: 2px solid #2196f3;
        }
        
        .event-details h3 {
            margin: 0 0 10px 0;
            color: #1565c0;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .payment-summary {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
            border: 2px solid #4caf50;
        }
        
        .payment-summary h3 {
            margin: 0 0 10px 0;
            color: #2e7d32;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .status-badge {
            background: #4caf50;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            display: inline-block;
        }
        
        .footer {
            background: #1a1a1a;
            color: white;
            padding: 15px;
            text-align: center;
            position: relative;
        }
        
        .qr-section {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;
        }
        
        .qr-code {
            text-align: center;
        }
        
        .qr-code img {
            border: 2px solid #d4af37;
            border-radius: 8px;
            background: white;
            padding: 5px;
            width: 80px;
            height: 80px;
        }
        
        .qr-info {
            text-align: left;
        }
        
        .qr-info h4 {
            margin: 0 0 8px 0;
            color: #d4af37;
            font-size: 12px;
        }
        
        .qr-info p {
            margin: 2px 0;
            font-size: 10px;
            opacity: 0.9;
        }
        
        .terms {
            font-size: 8px;
            opacity: 0.8;
            margin-top: 8px;
            line-height: 1.2;
        }
        
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 40px;
            color: rgba(212, 175, 55, 0.1);
            font-weight: bold;
            pointer-events: none;
            z-index: 0;
        }
        
        .icon {
            font-size: 12px;
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
        
        <div class="content">
            <div class="attendee-info">
                <h3>Attendee Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Full Name</div>
                        <div class="info-value">{{ $attendee->name }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email Address</div>
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
                        <div class="info-label">Ticket Status</div>
                        <div class="info-value">
                            <span class="status-badge">✅ FULLY PAID</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="event-details">
                <h3>Event Details</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Event Name</div>
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
            
            <div class="payment-summary">
                <h3> Payment Summary</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Total Amount Paid</div>
                        <div class="info-value">Ksh. {{ number_format($totalConfirmedAmount) }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Latest Payment</div>
                        <div class="info-value">Ksh. {{ number_format($payment->amount) }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Payment Method</div>
                        <div class="info-value">{{ ucfirst($payment->method) }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Payment Date</div>
                        <div class="info-value">{{ $payment->created_at->format('F j, Y \a\t g:i A') }}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="qr-section">
                <div class="qr-code">
                    <img src="{{ $qrCodeBase64 }}" alt="QR Code" width="80" height="80">
                    <p style="margin-top: 5px; font-size: 8px; opacity: 0.8;">Scan for verification</p>
                </div>
                <div class="qr-info">
                    <h4>📱 QR Code Information</h4>
                    <p><strong>Ticket Number:</strong> {{ $attendee->id }}</p>
                    <p><strong>Attendee:</strong> {{ $attendee->name }}</p>
                    <p><strong>Total Paid:</strong> Ksh. {{ number_format($totalConfirmedAmount) }}</p>
                    <p><strong>Event:</strong> OLQP Singles Dinner 2025</p>
                </div>
            </div>
            
            <div class="terms">
                <strong>Important:</strong> This ticket is valid for one person only. Please present this ticket (digital or printed) at the event entrance. 
                The QR code contains verification information. For any questions, contact us at 0717186600 or olqpsouthbsecretary@gmail.com.
                <br><br>
                <strong>Terms:</strong> This ticket is non-transferable and non-refundable. OLQP reserves the right to refuse entry if the ticket is invalid or duplicated.
            </div>
        </div>
    </div>
</body>
</html>
