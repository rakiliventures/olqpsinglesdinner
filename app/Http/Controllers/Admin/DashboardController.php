<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Get total attendees count
        $totalAttendees = Attendee::count();
        
        // Get attendees with confirmed payments
        $attendeesWithConfirmedPayments = Attendee::whereHas('payments', function ($query) {
            $query->where('status', 'confirmed');
        })->count();
        
        // Get fully paid attendees using the model method
        // Load the necessary relationships for group attendees
        $fullyPaidAttendees = Attendee::with(['payment', 'groupTicket', 'payments'])
            ->where(function ($query) {
                $query->whereHas('payments', function ($q) {
                    $q->where('status', 'confirmed');
                })->orWhereHas('payment', function ($q) {
                    $q->where('status', 'confirmed');
                });
            })
            ->get()
            ->filter(function ($attendee) {
                return $attendee->isFullyPaid();
            });
        
        $fullyPaidCount = $fullyPaidAttendees->count();
        
        // Get breakdown of fully paid attendees by ticket type
        $fullyPaidIndividual = $fullyPaidAttendees->filter(function ($attendee) {
            return !$attendee->group_ticket_id;
        })->count();
        
        // For group tickets, count all attendees in each group (not just the number of groups)
        $fullyPaidGroup = $fullyPaidAttendees->filter(function ($attendee) {
            return $attendee->group_ticket_id;
        })->count();
        
        
        // Calculate total confirmed revenue without duplicating group payments
        $totalConfirmedRevenue = 0;
        $processedGroupPayments = [];
        
        // Get all confirmed payments
        $confirmedPayments = Payment::where('status', 'confirmed')->get();
        
        foreach ($confirmedPayments as $payment) {
            // Check if this payment is for a group ticket
            $attendee = $payment->attendee;
            if ($attendee && $attendee->group_ticket_id && $attendee->payment_id) {
                // For group payments, only count once per unique payment_id
                if (!in_array($payment->id, $processedGroupPayments)) {
                    $totalConfirmedRevenue += $payment->amount;
                    $processedGroupPayments[] = $payment->id;
                }
            } else {
                // For individual payments, count normally
                $totalConfirmedRevenue += $payment->amount;
            }
        }
        
        // Get partially paid attendees using the model method
        $partiallyPaidAttendees = Attendee::whereHas('payments', function ($query) {
            $query->where('status', 'confirmed');
        })->get()->filter(function ($attendee) {
            return !$attendee->isFullyPaid();
        })->count();
        
        // Get gender distribution for attendees with confirmed payments
        $genderDistribution = Attendee::whereHas('payments', function ($query) {
            $query->where('status', 'confirmed');
        })->select('gender', DB::raw('count(*) as count'))
          ->groupBy('gender')
          ->get()
          ->mapWithKeys(function ($item) {
              return [$item->gender ?? 'Not Specified' => $item->count];
          });
        
        // Get OLQP member distribution for attendees with confirmed payments
        $olqpMemberDistribution = Attendee::whereHas('payments', function ($query) {
            $query->where('status', 'confirmed');
        })->select('is_olqp_member', DB::raw('count(*) as count'))
          ->groupBy('is_olqp_member')
          ->get()
          ->mapWithKeys(function ($item) {
              return [$item->is_olqp_member ? 'OLQP Member' : 'Non-Member' => $item->count];
          });

        return Inertia::render('dashboard', [
            'stats' => [
                'totalAttendees' => $totalAttendees,
                'attendeesWithConfirmedPayments' => $attendeesWithConfirmedPayments,
                'fullyPaidAttendees' => $fullyPaidCount,
                'fullyPaidIndividual' => $fullyPaidIndividual,
                'fullyPaidGroup' => $fullyPaidGroup,
                'partiallyPaidAttendees' => $partiallyPaidAttendees,
                'totalConfirmedRevenue' => $totalConfirmedRevenue,
            ],
            'charts' => [
                'genderDistribution' => $genderDistribution,
                'olqpMemberDistribution' => $olqpMemberDistribution,
            ],
        ]);
    }
}
