<?php

namespace App\Services;

use App\Models\Payment;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WhatsAppService
{
    protected string $apiUrl;
    protected string $apiKey;
    protected string $phoneNumberId;

    public function __construct()
    {
        // You can configure these in your .env file
        $this->apiUrl = config('services.whatsapp.api_url', 'https://graph.facebook.com/v18.0');
        $this->apiKey = config('services.whatsapp.api_key', '');
        $this->phoneNumberId = config('services.whatsapp.phone_number_id', '');
    }

    public function sendPaymentConfirmation(Payment $payment): bool
    {
        try {
            $attendee = $payment->attendee;
            $event = $attendee->event;

            if (!$attendee->whatsapp) {
                Log::warning('No WhatsApp number found for attendee', [
                    'attendee_id' => $attendee->id,
                    'attendee_name' => $attendee->name
                ]);
                return false;
            }

            // Validate API configuration
            if (!$this->validateApiConfiguration()) {
                return false;
            }

            $message = $this->buildPaymentConfirmationMessage($payment, $attendee, $event);

            // Generate PDF ticket if attendee is fully paid
            $ticketService = new TicketPdfService();
            $pdfPath = $ticketService->generateTicketPdf($attendee, $payment);

            if ($pdfPath) {
                // Send message with PDF attachment
                return $this->sendMessageWithAttachment($attendee->whatsapp, $message, $pdfPath);
            } else {
                // Send text message only
                return $this->sendMessage($attendee->whatsapp, $message);
            }

        } catch (\Exception $e) {
            Log::error('Failed to send WhatsApp payment confirmation', [
                'payment_id' => $payment->id,
                'attendee_id' => $payment->attendee_id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }

    protected function validateApiConfiguration(): bool
    {
        $errors = [];

        if (empty($this->apiKey)) {
            $errors[] = 'WhatsApp API key is not configured';
        }

        if (empty($this->phoneNumberId)) {
            $errors[] = 'WhatsApp Phone Number ID is not configured';
        }

        if (empty($this->apiUrl)) {
            $errors[] = 'WhatsApp API URL is not configured';
        }

        if (!empty($errors)) {
            Log::error('WhatsApp API configuration errors', [
                'errors' => $errors,
                'api_url' => $this->apiUrl,
                'has_api_key' => !empty($this->apiKey),
                'has_phone_number_id' => !empty($this->phoneNumberId)
            ]);
            return false;
        }

        return true;
    }

    protected function buildPaymentConfirmationMessage(Payment $payment, $attendee, $event): string
    {
        // Load attendee with all payments to calculate summaries
        $attendee = $attendee->load('payments');
        
        // Calculate payment summaries
        $totalConfirmedAmount = $attendee->payments
            ->where('status', 'confirmed')
            ->sum('amount');
            
        $pendingAmount = $attendee->payments
            ->where('status', 'pending')
            ->sum('amount');
            
        $failedAmount = $attendee->payments
            ->where('status', 'failed')
            ->sum('amount');

        $message = "🎉 *Payment Confirmed!*\n\n";
        $message .= "Dear *{$attendee->name}*,\n\n";
        $message .= "Your payment has been successfully confirmed for the *OLQP Singles Dinner 2025*.\n\n";
        
        $message .= "📋 *Latest Payment Details:*\n";
        $message .= "• Event Ticket Number: {$attendee->id}\n";
        $message .= "• Amount Confirmed: Ksh. " . number_format($payment->amount) . "\n";
        $message .= "• M-Pesa Code: {$payment->mpesa_code}\n";
        $message .= "• Payment Method: " . ucfirst($payment->method) . "\n";
        $message .= "• Date: " . $payment->created_at->format('F j, Y \a\t g:i A') . "\n\n";
        
        $message .= "💰 *Payment Summary:*\n";
        $message .= "• Total Confirmed: Ksh. " . number_format($totalConfirmedAmount) . "\n";
        
        if ($pendingAmount > 0) {
            $message .= "• Pending: Ksh. " . number_format($pendingAmount) . "\n";
        }
        
        if ($failedAmount > 0) {
            $message .= "• Failed: Ksh. " . number_format($failedAmount) . "\n";
        }
        
        $message .= "\n🎫 *Ticket Status:*\n";
        if ($totalConfirmedAmount >= 4999) {
            $message .= "• Status: ✅ *Fully Booked*\n";
            $message .= "• Message: Your ticket is fully paid and confirmed!\n";
            $message .= "• 🎫 *Your event ticket is attached to this message!*\n";
        } else {
            $remainingBalance = 4999 - $totalConfirmedAmount;
            $message .= "• Status: ⚠️ *Partially Paid*\n";
            $message .= "• Remaining Balance: Ksh. " . number_format($remainingBalance) . "\n";
            $message .= "• Message: Please complete your payment to secure your full ticket.\n";
        }

        $message .= "\n🎭 *Event Details:*\n";
        $message .= "• Event: {$event->name}\n";
        $message .= "• Date: " . $event->date->format('F j, Y') . "\n";
        $message .= "• Time: 6:00 PM - 12:00 AM\n";
        $message .= "• Venue: The Edge, South C\n\n";

        if ($totalConfirmedAmount >= 4999) {
            $message .= "🎫 *Your event ticket is attached to this message!* Please save both this message and the attached PDF ticket. You may need to show either at the event entrance. The ticket contains a QR code for quick verification.\n\n";
        } else {
            $message .= "Please save this message. You may need to show it at the event entrance. Once your payment is complete (Ksh. 4,999), you will receive an event ticket with QR code for verification.\n\n";
        }

        $message .= "For any questions, contact us at 0777111000.\n\n";
        $message .= "We look forward to seeing you! 🎊";

        return $message;
    }

    protected function sendMessageWithAttachment(string $phoneNumber, string $message, string $pdfPath): bool
    {
        // Remove any non-numeric characters and ensure it starts with country code
        $phoneNumber = $this->formatPhoneNumber($phoneNumber);

        if (!$this->apiKey || !$this->phoneNumberId) {
            Log::warning('WhatsApp API credentials not configured', [
                'phone_number' => $phoneNumber,
                'has_api_key' => !empty($this->apiKey),
                'has_phone_number_id' => !empty($this->phoneNumberId)
            ]);
            return false;
        }

        try {
            // First, upload the document to WhatsApp
            $uploadUrl = "{$this->apiUrl}/{$this->phoneNumberId}/media";
            $pdfContent = file_get_contents($pdfPath);
            $pdfBase64 = base64_encode($pdfContent);

            $uploadBody = [
                'messaging_product' => 'whatsapp',
                'file' => $pdfBase64,
                'type' => 'application/pdf',
                'filename' => 'OLQP_Singles_Dinner_2025_Ticket.pdf'
            ];

            $uploadResponse = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($uploadUrl, $uploadBody);

            if (!$uploadResponse->successful()) {
                Log::error('Failed to upload PDF to WhatsApp', [
                    'phone_number' => $phoneNumber,
                    'status_code' => $uploadResponse->status(),
                    'response' => $uploadResponse->json()
                ]);
                // Fallback to text message only
                return $this->sendMessage($phoneNumber, $message);
            }

            $uploadData = $uploadResponse->json();
            $mediaId = $uploadData['id'];

            // Send text message first
            $textSent = $this->sendMessage($phoneNumber, $message);
            if (!$textSent) {
                return false;
            }

            // Then send the document
            $documentUrl = "{$this->apiUrl}/{$this->phoneNumberId}/messages";
            $documentBody = [
                'messaging_product' => 'whatsapp',
                'to' => $phoneNumber,
                'type' => 'document',
                'document' => [
                    'id' => $mediaId,
                    'caption' => '🎫 Your OLQP Singles Dinner 2025 Event Ticket'
                ]
            ];

            $documentResponse = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($documentUrl, $documentBody);

            if ($documentResponse->successful()) {
                Log::info('WhatsApp message with PDF ticket sent successfully', [
                    'phone_number' => $phoneNumber,
                    'media_id' => $mediaId
                ]);
                return true;
            } else {
                Log::error('Failed to send PDF ticket via WhatsApp', [
                    'phone_number' => $phoneNumber,
                    'status_code' => $documentResponse->status(),
                    'response' => $documentResponse->json()
                ]);
                // At least the text message was sent
                return true;
            }

        } catch (\Exception $e) {
            Log::error('WhatsApp API exception with attachment', [
                'phone_number' => $phoneNumber,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            // Fallback to text message only
            return $this->sendMessage($phoneNumber, $message);
        }
    }

    protected function sendMessage(string $phoneNumber, string $message): bool
    {
        // Remove any non-numeric characters and ensure it starts with country code
        $phoneNumber = $this->formatPhoneNumber($phoneNumber);

        if (!$this->apiKey || !$this->phoneNumberId) {
            Log::warning('WhatsApp API credentials not configured', [
                'phone_number' => $phoneNumber,
                'has_api_key' => !empty($this->apiKey),
                'has_phone_number_id' => !empty($this->phoneNumberId)
            ]);
            return false;
        }

        try {
            $requestUrl = "{$this->apiUrl}/{$this->phoneNumberId}/messages";
            $requestBody = [
                'messaging_product' => 'whatsapp',
                'to' => $phoneNumber,
                'type' => 'text',
                'text' => [
                    'body' => $message
                ]
            ];

            Log::info('Sending WhatsApp message', [
                'url' => $requestUrl,
                'phone_number' => $phoneNumber,
                'message_length' => strlen($message),
                'has_api_key' => !empty($this->apiKey)
            ]);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($requestUrl, $requestBody);

            $responseData = $response->json();
            $statusCode = $response->status();

            Log::info('WhatsApp API response', [
                'status_code' => $statusCode,
                'response_data' => $responseData,
                'phone_number' => $phoneNumber
            ]);

            if ($response->successful()) {
                Log::info('WhatsApp message sent successfully', [
                    'phone_number' => $phoneNumber,
                    'message_id' => $responseData['messages'][0]['id'] ?? null
                ]);
                return true;
            } else {
                // Handle specific error cases
                $errorMessage = $this->parseWhatsAppError($responseData, $statusCode);
                
                Log::error('WhatsApp API error', [
                    'phone_number' => $phoneNumber,
                    'status_code' => $statusCode,
                    'error_message' => $errorMessage,
                    'response_data' => $responseData,
                    'request_url' => $requestUrl,
                    'api_key_length' => strlen($this->apiKey),
                    'phone_number_id' => $this->phoneNumberId
                ]);

                return false;
            }

        } catch (\Exception $e) {
            Log::error('WhatsApp API exception', [
                'phone_number' => $phoneNumber,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }

    protected function parseWhatsAppError(array $responseData, int $statusCode): string
    {
        $errorMessage = 'Unknown WhatsApp API error';

        if (isset($responseData['error'])) {
            $error = $responseData['error'];
            
            if (isset($error['message'])) {
                $errorMessage = $error['message'];
            }
            
            if (isset($error['code'])) {
                $errorMessage .= " (Code: {$error['code']})";
            }
            
            if (isset($error['error_subcode'])) {
                $errorMessage .= " (Subcode: {$error['error_subcode']})";
            }
        }

        // Add specific guidance based on error type
        if (str_contains(strtolower($errorMessage), 'access token') || str_contains(strtolower($errorMessage), 'permissions')) {
            $errorMessage .= "\n\nTroubleshooting:\n";
            $errorMessage .= "1. Check if your access token is valid and not expired\n";
            $errorMessage .= "2. Verify the token has WhatsApp Business API permissions\n";
            $errorMessage .= "3. Ensure the phone number ID is correct\n";
            $errorMessage .= "4. Check if your app is approved for WhatsApp Business API";
        }

        return $errorMessage;
    }

    protected function formatPhoneNumber(string $phoneNumber): string
    {
        // Remove all non-numeric characters
        $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);

        // If it starts with 0, replace with 254 (Kenya country code)
        if (strlen($phoneNumber) === 10 && $phoneNumber[0] === '0') {
            $phoneNumber = '254' . substr($phoneNumber, 1);
        }

        // If it doesn't start with country code, assume it's Kenya (254)
        if (strlen($phoneNumber) === 9) {
            $phoneNumber = '254' . $phoneNumber;
        }

        return $phoneNumber;
    }

    // Alternative method using a different WhatsApp service (like Twilio)
    public function sendViaTwilio(string $phoneNumber, string $message): bool
    {
        // This is an alternative implementation using Twilio
        // You would need to install: composer require twilio/sdk
        
        try {
            // $twilio = new \Twilio\Rest\Client(
            //     config('services.twilio.account_sid'),
            //     config('services.twilio.auth_token')
            // );
            
            // $message = $twilio->messages->create(
            //     "whatsapp:+" . $this->formatPhoneNumber($phoneNumber),
            //     [
            //         'from' => 'whatsapp:' . config('services.twilio.whatsapp_number'),
            //         'body' => $message
            //     ]
            // );
            
            Log::info('Twilio WhatsApp message sent', ['phone_number' => $phoneNumber]);
            return true;
            
        } catch (\Exception $e) {
            Log::error('Twilio WhatsApp error', [
                'phone_number' => $phoneNumber,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    // Test method to validate API configuration
    public function testApiConnection(): array
    {
        $result = [
            'success' => false,
            'errors' => [],
            'details' => []
        ];

        // Check configuration
        if (!$this->validateApiConfiguration()) {
            $result['errors'][] = 'API configuration is invalid';
            return $result;
        }

        try {
            // Test API connection by getting phone number details
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->get("{$this->apiUrl}/{$this->phoneNumberId}");

            $result['details']['status_code'] = $response->status();
            $result['details']['response'] = $response->json();

            if ($response->successful()) {
                $result['success'] = true;
                $result['details']['phone_number_info'] = $response->json();
            } else {
                $result['errors'][] = 'API connection failed: ' . $response->body();
            }

        } catch (\Exception $e) {
            $result['errors'][] = 'Exception: ' . $e->getMessage();
        }

        return $result;
    }
}
