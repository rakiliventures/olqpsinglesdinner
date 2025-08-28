<?php

namespace App\Console\Commands;

use App\Services\WhatsAppService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class TestWhatsAppApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'whatsapp:test {--phone= : Phone number to test with}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test WhatsApp API connection and configuration';

    /**
     * Execute the console command.
     */
    public function handle(WhatsAppService $whatsappService)
    {
        $this->info('🔍 Testing WhatsApp API Configuration...');
        $this->newLine();

        // Test 1: Check configuration
        $this->info('1. Checking API Configuration...');
        $this->checkConfiguration();
        $this->newLine();

        // Test 2: Test API connection
        $this->info('2. Testing API Connection...');
        $this->testApiConnection($whatsappService);
        $this->newLine();

        // Test 3: Test message sending (if phone number provided)
        if ($phone = $this->option('phone')) {
            $this->info('3. Testing Message Sending...');
            $this->testMessageSending($whatsappService, $phone);
            $this->newLine();
        }

        $this->info('✅ WhatsApp API test completed!');
        $this->info('📋 Check the logs for detailed information: tail -f storage/logs/laravel.log');
    }

    protected function checkConfiguration()
    {
        $config = [
            'WHATSAPP_API_URL' => config('services.whatsapp.api_url'),
            'WHATSAPP_API_KEY' => config('services.whatsapp.api_key'),
            'WHATSAPP_PHONE_NUMBER_ID' => config('services.whatsapp.phone_number_id'),
        ];

        $hasErrors = false;

        foreach ($config as $key => $value) {
            if (empty($value)) {
                $this->error("❌ {$key}: Not configured");
                $hasErrors = true;
            } else {
                if ($key === 'WHATSAPP_API_KEY') {
                    $this->line("✅ {$key}: " . str_repeat('*', min(10, strlen($value))) . '...');
                } else {
                    $this->line("✅ {$key}: {$value}");
                }
            }
        }

        if ($hasErrors) {
            $this->error('Please configure the missing environment variables in your .env file');
            $this->line('Required variables:');
            $this->line('  WHATSAPP_API_URL=https://graph.facebook.com/v18.0');
            $this->line('  WHATSAPP_API_KEY=your_permanent_access_token');
            $this->line('  WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id');
        }
    }

    protected function testApiConnection(WhatsAppService $whatsappService)
    {
        $result = $whatsappService->testApiConnection();

        if ($result['success']) {
            $this->info('✅ API connection successful!');
            $this->line('Phone number info:');
            
            if (isset($result['details']['phone_number_info'])) {
                $info = $result['details']['phone_number_info'];
                $this->line("  - ID: {$info['id']}");
                $this->line("  - Phone Number: {$info['phone_number']}");
                $this->line("  - Display Name: {$info['display_phone_number']}");
                $this->line("  - Quality Rating: {$info['quality_rating']}");
                $this->line("  - Verified Name: {$info['verified_name']}");
            }
        } else {
            $this->error('❌ API connection failed!');
            
            foreach ($result['errors'] as $error) {
                $this->error("  - {$error}");
            }

            if (isset($result['details']['status_code'])) {
                $this->line("Status Code: {$result['details']['status_code']}");
            }

            if (isset($result['details']['response'])) {
                $this->line('Response: ' . json_encode($result['details']['response'], JSON_PRETTY_PRINT));
            }

            $this->newLine();
            $this->warn('🔧 Troubleshooting Steps:');
            $this->line('1. Verify your access token is valid and not expired');
            $this->line('2. Check if the token has WhatsApp Business API permissions');
            $this->line('3. Ensure the phone number ID is correct');
            $this->line('4. Verify your app is approved for WhatsApp Business API');
            $this->line('5. Check if you have the correct permissions in your Meta app');
        }
    }

    protected function testMessageSending(WhatsAppService $whatsappService, string $phone)
    {
        $this->line("Testing with phone number: {$phone}");

        // Create a test message
        $testMessage = "🧪 *Test Message*\n\nThis is a test message from the OLQP Singles Dinner system.\n\nTime: " . now()->format('Y-m-d H:i:s') . "\n\nIf you receive this, the WhatsApp API is working correctly! ✅";

        try {
            // Use reflection to access the protected method for testing
            $reflection = new \ReflectionClass($whatsappService);
            $sendMessageMethod = $reflection->getMethod('sendMessage');
            $sendMessageMethod->setAccessible(true);

            $result = $sendMessageMethod->invoke($whatsappService, $phone, $testMessage);

            if ($result) {
                $this->info('✅ Test message sent successfully!');
                $this->line('Check the recipient\'s WhatsApp for the test message.');
            } else {
                $this->error('❌ Failed to send test message');
                $this->line('Check the logs for detailed error information.');
            }

        } catch (\Exception $e) {
            $this->error('❌ Exception during test message sending: ' . $e->getMessage());
        }
    }
}
