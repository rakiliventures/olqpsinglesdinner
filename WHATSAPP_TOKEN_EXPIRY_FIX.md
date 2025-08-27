# WhatsApp API Token Expiration Fix

## 🚨 Current Issue
Your WhatsApp Business API access token has expired on **Tuesday, August 19th, 2025**. The error message indicates:

```
Error validating access token: Session has expired on Tuesday, 19-Aug-25 16:00:00 PDT. 
The current time is Thursday, 21-Aug-25 05:57:26 PDT. (Code: 190) (Subcode: 463)
```

## 🔧 Solution Steps

### Step 1: Generate a New Permanent Access Token

1. **Go to Meta for Developers**
   - Visit: https://developers.facebook.com/
   - Log in to your Meta developer account

2. **Navigate to Your App**
   - Go to "My Apps" 
   - Select your WhatsApp Business API app

3. **Access WhatsApp Business API**
   - In the left sidebar, click on "WhatsApp" → "Getting Started"
   - Or go to "Products" → "WhatsApp" → "Getting Started"

4. **Generate Permanent Token**
   - Look for "Access Tokens" section
   - Click "Generate Token" or "Create Token"
   - Select "Permanent" token type
   - Grant necessary permissions (WhatsApp Business API)
   - Copy the new token immediately

### Step 2: Update Your Environment Variables

1. **Edit your `.env` file**
   ```bash
   nano .env
   ```

2. **Update the WhatsApp API key**
   ```env
   WHATSAPP_API_KEY=your_new_permanent_access_token_here
   ```

3. **Verify other WhatsApp settings**
   ```env
   WHATSAPP_API_URL=https://graph.facebook.com/v18.0
   WHATSAPP_PHONE_NUMBER_ID=768926626298528
   ```

### Step 3: Clear Configuration Cache

```bash
php artisan config:clear
php artisan cache:clear
```

### Step 4: Test the New Token

1. **Run the WhatsApp API test command**
   ```bash
   php artisan test:whatsapp
   ```

2. **Check the response**
   - If successful: "WhatsApp API connection successful!"
   - If failed: Check the error message and repeat steps above

## 🔍 Verification Steps

### Check Current Configuration
```bash
# Check if environment variables are loaded
php artisan tinker
>>> config('services.whatsapp')
```

### Test with a Simple API Call
```bash
# Test the API directly
curl -X GET "https://graph.facebook.com/v18.0/768926626298528" \
  -H "Authorization: Bearer YOUR_NEW_TOKEN_HERE"
```

## 🛡️ Prevention Tips

### 1. Use Permanent Tokens
- Always generate "Permanent" tokens, not "User" tokens
- User tokens expire after 60 days
- Permanent tokens don't expire unless revoked

### 2. Monitor Token Status
- Set up alerts for token expiration
- Check token status regularly in Meta Developer Console
- Keep backup tokens ready

### 3. Implement Token Refresh Logic
Consider implementing automatic token refresh in your application:

```php
// In WhatsAppService.php
protected function refreshTokenIfNeeded(): bool
{
    // Check token validity
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . $this->apiKey
    ])->get("https://graph.facebook.com/v18.0/me");
    
    if (!$response->successful()) {
        // Token is invalid, trigger refresh process
        Log::warning('WhatsApp API token appears to be invalid');
        return false;
    }
    
    return true;
}
```

## 🚨 Emergency Fallback

If you need to temporarily disable WhatsApp notifications:

1. **Comment out WhatsApp sending in PaymentsController**
   ```php
   // In app/Http/Controllers/Admin/PaymentsController.php
   // Comment out this line temporarily:
   // $this->whatsappService->sendPaymentConfirmation($payment);
   ```

2. **Keep email notifications working**
   - Email notifications will continue to work
   - Only WhatsApp will be disabled

## 📞 Support Resources

### Meta Developer Documentation
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Access Token Management](https://developers.facebook.com/docs/facebook-login/access-tokens)
- [Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)

### Common Error Codes
- **190**: Token expired or invalid
- **463**: Session expired
- **100**: Invalid parameter
- **102**: Session has expired

## 🔄 After Fixing

1. **Test a payment confirmation**
   - Go to admin panel
   - Confirm a test payment
   - Check logs for success message

2. **Monitor logs**
   ```bash
   tail -f storage/logs/laravel.log | grep -i "whatsapp"
   ```

3. **Verify notifications**
   - Check if WhatsApp message is received
   - Verify email is still working
   - Confirm PDF attachment (if applicable)

## ✅ Success Indicators

When the fix is successful, you should see:
- ✅ "WhatsApp API connection successful!" in test command
- ✅ "Payment confirmation WhatsApp message sent successfully" in logs
- ✅ WhatsApp message received by attendee
- ✅ No more "Session has expired" errors

---

**Note**: If you continue to have issues after following these steps, please check:
1. Your Meta app permissions
2. Phone number ID validity
3. WhatsApp Business API approval status
4. Rate limiting on your account
