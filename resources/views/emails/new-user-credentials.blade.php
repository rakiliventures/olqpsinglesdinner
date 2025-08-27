<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OLQP Admin Account Credentials</title>
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
        .credentials-box {
            background-color: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .credentials-box h3 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
            font-size: 18px;
        }
        .credential-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .credential-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .credential-label {
            font-weight: 600;
            color: #555;
        }
        .credential-value {
            color: #1a1a1a;
            font-weight: 500;
            font-family: 'Courier New', monospace;
            background-color: #fff;
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        .warning-box {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .warning-box h4 {
            margin: 0 0 10px 0;
            color: #856404;
            font-size: 16px;
        }
        .warning-box p {
            margin: 5px 0;
            color: #856404;
        }
        .login-link {
            background-color: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            margin: 20px 0;
            font-weight: 600;
        }
        .login-link:hover {
            background-color: #0056b3;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
            color: #666;
            font-size: 14px;
        }
        .security-note {
            background-color: #d1ecf1;
            border: 1px solid #bee5eb;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .security-note h4 {
            margin: 0 0 10px 0;
            color: #0c5460;
            font-size: 16px;
        }
        .security-note p {
            margin: 5px 0;
            color: #0c5460;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Welcome to OLQP Admin Portal</h1>
            <div class="subtitle">Your account has been created successfully</div>
        </div>

        <div class="content">
            <div class="greeting">
                Dear {{ $user->name }},
            </div>

            <div class="message">
                Welcome to the OLQP Singles Dinner 2025 Admin Portal! Your account has been created by an administrator, and you can now access the system to manage events, attendees, and payments.
            </div>

            <div class="credentials-box">
                <h3>📋 Your Login Credentials</h3>
                <div class="credential-row">
                    <span class="credential-label">Email Address:</span>
                    <span class="credential-value">{{ $user->email }}</span>
                </div>
                <div class="credential-row">
                    <span class="credential-label">Temporary Password:</span>
                    <span class="credential-value">{{ $temporaryPassword }}</span>
                </div>
                <div class="credential-row">
                    <span class="credential-label">Login URL:</span>
                    <span class="credential-value">{{ url('/login') }}</span>
                </div>
            </div>

            <div class="warning-box">
                <h4>⚠️ Important Security Notice</h4>
                <p><strong>This is a temporary password.</strong> For security reasons, please change your password immediately after your first login.</p>
                <p>The temporary password will expire after 24 hours for security purposes.</p>
            </div>

            <div class="security-note">
                <h4>🔒 Security Best Practices</h4>
                <p>• Change your password immediately after first login</p>
                <p>• Use a strong, unique password</p>
                <p>• Never share your credentials with others</p>
                <p>• Log out when you're done using the system</p>
            </div>

            <div style="text-align: center;">
                <a href="{{ url('/login') }}" class="login-link">
                    🚀 Login to Admin Portal
                </a>
            </div>

            <div class="message">
                <strong>What you can do:</strong><br>
                • View and manage event attendees<br>
                • Process and confirm payments<br>
                • Manage event details<br>
                • Generate reports and analytics<br>
                • Manage other admin users
            </div>

            <div class="message">
                If you have any questions or need assistance, please contact the system administrator at <strong>0777111000</strong> or email <strong>info@olqp.org</strong>.
            </div>
        </div>

        <div class="footer">
            <p>Welcome to the OLQP Singles Dinner 2025 Admin Team!</p>
            <p>© 2025 OLQP Parish. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
