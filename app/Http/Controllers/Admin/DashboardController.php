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
        
        // Get fully paid attendees (total confirmed payments >= 4999)
        $fullyPaidAttendees = Attendee::whereHas('payments', function ($query) {
            $query->where('status', 'confirmed');
        })->get()->filter(function ($attendee) {
            return $attendee->payments()->where('status', 'confirmed')->sum('amount') >= 4999;
        })->count();
        
        // Get partially paid attendees (total confirmed payments < 4999)
        $partiallyPaidAttendees = Attendee::whereHas('payments', function ($query) {
            $query->where('status', 'confirmed');
        })->get()->filter(function ($attendee) {
            return $attendee->payments()->where('status', 'confirmed')->sum('amount') < 4999;
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
                'fullyPaidAttendees' => $fullyPaidAttendees,
                'partiallyPaidAttendees' => $partiallyPaidAttendees,
            ],
            'charts' => [
                'genderDistribution' => $genderDistribution,
                'olqpMemberDistribution' => $olqpMemberDistribution,
            ],
        ]);
    }
}
