# WhatsApp API Access Token Troubleshooting Guide

## 🚨 Error: "There was a problem with the access token or permissions"

This error indicates issues with your WhatsApp Business API access token or permissions. Here's how to fix it:

## 🔍 Step 1: Run the Diagnostic Command

First, run our diagnostic command to identify the specific issue:

```bash
php artisan whatsapp:test
```

For a complete test including message sending:
```bash
php artisan whatsapp:test --phone=254XXXXXXXXX
```

## 🔧 Step 2: Common Issues and Solutions

### Issue 1: Invalid or Expired Access Token

**Symptoms:**
- Error code: 190 (Invalid OAuth 2.0 Access Token)
- "Access token has expired" message

**Solutions:**
1. **Generate a new Permanent Access Token:**
   - Go to [Meta for Developers](https://developers.facebook.com/)
   - Navigate to your app → WhatsApp → Getting Started
   - Click "Generate Token"
   - Select "Permanent" token type
   - Copy the new token

2. **Update your .env file:**
   ```env
   WHATSAPP_API_KEY=your_new_permanent_access_token
   ```

3. **Clear config cache:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

### Issue 2: Missing WhatsApp Business API Permissions

**Symptoms:**
- Error code: 100 (Invalid parameter)
- "Permissions error" message

**Solutions:**
1. **Add WhatsApp Business API to your app:**
   - Go to your Meta app dashboard
   - Click "Add Product"
   - Search for "WhatsApp Business API"
   - Click "Set Up"

2. **Configure WhatsApp Business API:**
   - Go to WhatsApp → Getting Started
   - Add your business phone number
   - Complete the verification process

3. **Verify permissions:**
   - Go to App Review → Permissions and Features
   - Ensure "WhatsApp Business API" is approved
   - Check that "whatsapp_business_messaging" permission is granted

### Issue 3: Incorrect Phone Number ID

**Symptoms:**
- Error code: 100 (Invalid parameter)
- "Phone number ID not found" message

**Solutions:**
1. **Get the correct Phone Number ID:**
   - Go to WhatsApp → Getting Started
   - Find your phone number in the list
   - Copy the Phone Number ID (not the phone number itself)

2. **Update your .env file:**
   ```env
   WHATSAPP_PHONE_NUMBER_ID=your_correct_phone_number_id
   ```

### Issue 4: App Not Approved for WhatsApp Business API

**Symptoms:**
- Error code: 4 (Application request limit reached)
- "App not approved" message

**Solutions:**
1. **Submit your app for review:**
   - Go to App Review → Permissions and Features
   - Find "WhatsApp Business API"
   - Click "Request"
   - Fill out the required information
   - Submit for review

2. **Use WhatsApp Business API in Development Mode:**
   - You can test with up to 5 phone numbers in development mode
   - Add test phone numbers in WhatsApp → Getting Started

### Issue 5: Wrong API Version

**Symptoms:**
- Error code: 100 (Invalid parameter)
- "API version not supported" message

**Solutions:**
1. **Update API URL in .env:**
   ```env
   WHATSAPP_API_URL=https://graph.facebook.com/v18.0
   ```

2. **Check for newer versions:**
   - Visit [Meta Graph API Changelog](https://developers.facebook.com/docs/graph-api/changelog)
   - Update to the latest stable version

## 🔍 Step 3: Verify Your Setup

### Check Environment Variables

Ensure your `.env` file has all required variables:

```env
# WhatsApp Business API Configuration
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_API_KEY=your_permanent_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here

# Email Configuration (for backup notifications)
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@olqp.org
MAIL_FROM_NAME="OLQP Singles Dinner"
```

### Test Each Component

1. **Test API Connection:**
   ```bash
   php artisan whatsapp:test
   ```

2. **Test with a Real Phone Number:**
   ```bash
   php artisan whatsapp:test --phone=254XXXXXXXXX
   ```

3. **Check Logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

## 🚀 Step 4: Alternative Solutions

### Option 1: Use Twilio WhatsApp (Easier Setup)

If Meta WhatsApp Business API is too complex, switch to Twilio:

1. **Sign up for Twilio:**
   - Go to [Twilio](https://www.twilio.com/)
   - Create an account
   - Get your Account SID and Auth Token

2. **Install Twilio SDK:**
   ```bash
   composer require twilio/sdk
   ```

3. **Update .env:**
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
   ```

4. **Enable Twilio in WhatsAppService:**
   - Uncomment the Twilio code in `app/Services/WhatsAppService.php`
   - Comment out the Meta API code

### Option 2: Email-Only Notifications

If WhatsApp setup is problematic, you can use email-only notifications:

1. **Disable WhatsApp temporarily:**
   - Comment out the WhatsApp notification code in `PaymentsController.php`
   - Keep only email notifications

2. **Test email notifications:**
   - Ensure your email configuration is working
   - Test with a real email address

## 📋 Step 5: Monitoring and Debugging

### Enable Detailed Logging

Add this to your `.env` file for detailed logging:
```env
LOG_LEVEL=debug
```

### Monitor API Usage

Check your Meta app dashboard for:
- API call limits
- Error rates
- Phone number status

### Common Error Codes

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 190 | Invalid OAuth 2.0 Access Token | Generate new permanent token |
| 100 | Invalid parameter | Check phone number ID and permissions |
| 4 | Application request limit reached | Submit app for review |
| 33 | User request limit reached | Wait or upgrade plan |
| 613 | Calls to this api have exceeded the rate limit | Implement rate limiting |

## 🆘 Getting Help

### Check Logs First
```bash
grep "WhatsApp API error" storage/logs/laravel.log
grep "Failed to send WhatsApp" storage/logs/laravel.log
```

### Meta Developer Support
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta Developer Community](https://developers.facebook.com/community/)
- [WhatsApp Business API Support](https://developers.facebook.com/support/)

### Laravel Logs
The system logs detailed information about:
- API requests and responses
- Error messages and codes
- Configuration issues
- Phone number formatting

## ✅ Success Checklist

- [ ] Access token is permanent and valid
- [ ] App has WhatsApp Business API permissions
- [ ] Phone Number ID is correct
- [ ] App is approved or in development mode
- [ ] Environment variables are properly set
- [ ] API version is current
- [ ] Test command runs successfully
- [ ] Test message is received

## 🔄 Quick Fix Commands

```bash
# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Test WhatsApp API
php artisan whatsapp:test

# Check logs
tail -f storage/logs/laravel.log

# Test with phone number
php artisan whatsapp:test --phone=254XXXXXXXXX
```

Follow these steps systematically, and your WhatsApp notifications should work correctly! 🎉
