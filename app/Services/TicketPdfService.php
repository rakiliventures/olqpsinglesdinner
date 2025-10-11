<?php

namespace App\Services;

use App\Models\Attendee;
use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class TicketPdfService
{
    public function generateTicketPdf(Attendee $attendee, Payment $payment): ?string
    {
        try {
            // Load attendee with all payments and group ticket
            $attendee = $attendee->load(['payments', 'groupTicket']);
            
            // Check if attendee is fully paid using the model method
            if (!$attendee->isFullyPaid()) {
                Log::info('Ticket not generated - attendee not fully paid', [
                    'attendee_id' => $attendee->id,
                    'required_amount' => $attendee->getRequiredAmount(),
                    'is_group_ticket' => $attendee->group_ticket_id ? true : false
                ]);
                return null;
            }
            
            // Calculate total confirmed amount for display
            $totalConfirmedAmount = $attendee->payments
                ->where('status', 'confirmed')
                ->sum('amount');
            
            // Determine ticket type
            $ticketType = $attendee->group_ticket_id ? 'Group-of-5' : 'Individual';
            
            // Generate QR code data
            $qrData = json_encode([
                'ticket_number' => $attendee->id,
                'attendee_name' => $attendee->name,
                'ticket_type' => $ticketType,
                'total_confirmed' => $totalConfirmedAmount,
                'event' => 'OLQP Singles Dinner 2025'
            ]);
            
            // Generate QR code as SVG (doesn't require Imagick)
            $qrCode = QrCode::format('svg')
                ->size(150)
                ->margin(2)
                ->errorCorrection('H')
                ->generate($qrData);
            
            // Convert SVG to base64 for PDF
            $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($qrCode);
            
            // Determine ticket type
            $ticketType = $attendee->group_ticket_id ? 'Group-of-5' : 'Individual';

            // Prepare data for PDF
            $data = [
                'attendee' => $attendee,
                'payment' => $payment,
                'event' => $attendee->event,
                'totalConfirmedAmount' => $totalConfirmedAmount,
                'qrCodeBase64' => $qrCodeBase64,
                'qrData' => $qrData,
                'ticketType' => $ticketType
            ];
            
            // Generate PDF
            $pdf = Pdf::loadView('pdfs.event-ticket', $data);
            $pdf->setPaper('A4', 'portrait');
            
            // Generate filename
            $filename = 'ticket_' . $attendee->id . '_' . date('Y-m-d_H-i-s') . '.pdf';
            $filepath = 'tickets/' . $filename;
            
            // Save PDF to storage
            Storage::disk('public')->put($filepath, $pdf->output());
            
            Log::info('Ticket PDF generated successfully', [
                'attendee_id' => $attendee->id,
                'filename' => $filename,
                'filepath' => $filepath
            ]);
            
            return Storage::disk('public')->path($filepath);
            
        } catch (\Exception $e) {
            Log::error('Failed to generate ticket PDF', [
                'attendee_id' => $attendee->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return null;
        }
    }
    
    public function cleanupOldTickets(): void
    {
        try {
            // Clean up tickets older than 7 days
            $files = Storage::disk('public')->files('tickets');
            $cutoff = now()->subDays(7);
            
            foreach ($files as $file) {
                $lastModified = Storage::disk('public')->lastModified($file);
                if ($lastModified < $cutoff->timestamp) {
                    Storage::disk('public')->delete($file);
                    Log::info('Cleaned up old ticket file', ['file' => $file]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Failed to cleanup old tickets', [
                'error' => $e->getMessage()
            ]);
        }
    }
}
