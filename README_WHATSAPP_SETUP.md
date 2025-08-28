# WhatsApp Notification Setup

This guide explains how to set up WhatsApp notifications for payment confirmations in the OLQP Singles Dinner system.

## Overview

When an admin confirms a payment, the system automatically sends:
1. **Email notification** to the attendee's email address
2. **WhatsApp message** to the attendee's phone number

## WhatsApp Business API Setup

### Option 1: Meta WhatsApp Business API (Recommended)

1. **Create a Meta Developer Account**
   - Go to [Meta for Developers](https://developers.facebook.com/)
   - Create a new app or use an existing one
   - Add WhatsApp Business API to your app

2. **Configure WhatsApp Business API**
   - Get your Phone Number ID
   - Generate a Permanent Access Token
   - Set up webhook (optional for this implementation)

3. **Environment Variables**
   Add these to your `.env` file:
   ```env
   WHATSAPP_API_URL=https://graph.facebook.com/v18.0
   WHATSAPP_API_KEY=your_permanent_access_token_here
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
   ```

### Option 2: Twilio WhatsApp (Alternative)

1. **Create a Twilio Account**
   - Sign up at [Twilio](https://www.twilio.com/)
   - Get your Account SID and Auth Token
   - Set up WhatsApp Sandbox or Business number

2. **Environment Variables**
   Add these to your `.env` file:
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number_here
   ```

3. **Enable Twilio Integration**
   - Uncomment the Twilio code in `app/Services/WhatsAppService.php`
   - Install Twilio SDK: `composer require twilio/sdk`

## Email Configuration

Make sure your email is properly configured in `.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@olqp.org
MAIL_FROM_NAME="OLQP Singles Dinner"
```

## Testing the Notifications

1. **Create a test attendee** with valid email and WhatsApp number
2. **Create a test payment** for that attendee
3. **Confirm the payment** in the admin panel
4. **Check logs** for notification status:
   ```bash
   tail -f storage/logs/laravel.log
   ```

## Message Format

### Email Message
- Professional HTML email with payment details
- Event information and contact details
- Responsive design for mobile devices

### WhatsApp Message
```
🎉 Payment Confirmed!

Dear [Attendee Name],

Your payment has been successfully confirmed for the OLQP Singles Dinner 2025.

📋 Payment Details:
• Amount: Ksh. 1,000
• M-Pesa Code: ABC123XYZ
• Total Paid: Ksh. 4,999
• Status: ✅ Fully Paid

🎭 Event Details:
• Event: OLQP Singles Dinner 2025
• Date: October 31, 2025
• Time: 6:00 PM - 12:00 AM
• Venue: The Edge, South C

Please save this message. You may need to show it at the event entrance.

For any questions, contact us at 0777111000.

We look forward to seeing you! 🎊
```

## Troubleshooting

### Common Issues

1. **WhatsApp API not configured**
   - Check that all environment variables are set
   - Verify API credentials are correct
   - Check logs for specific error messages

2. **Phone number format issues**
   - Ensure phone numbers are in international format (254XXXXXXXXX for Kenya)
   - The system automatically formats numbers starting with 0

3. **Email not sending**
   - Verify SMTP configuration
   - Check email credentials
   - Ensure MAIL_FROM_ADDRESS is set

4. **Notifications not triggering**
   - Verify the payment status is changing from 'pending' to 'confirmed'
   - Check that attendee has email and/or WhatsApp number
   - Review application logs for errors

### Log Monitoring

Monitor these log entries:
```bash
# Successful notifications
grep "Payment confirmation email sent" storage/logs/laravel.log
grep "Payment confirmation WhatsApp message sent" storage/logs/laravel.log

# Errors
grep "Failed to send" storage/logs/laravel.log
grep "WhatsApp API error" storage/logs/laravel.log
```

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Rate Limiting**: WhatsApp API has rate limits, monitor usage
3. **Phone Number Validation**: Validate phone numbers before sending
4. **Error Handling**: System gracefully handles notification failures

## Support

For technical support:
- Check the Laravel logs for detailed error messages
- Verify all environment variables are correctly set
- Test with a known working phone number and email address
