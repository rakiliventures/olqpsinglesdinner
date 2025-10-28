<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\Admin\PaymentsController;
use App\Http\Controllers\Admin\AttendeesController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventsController as AdminEventsController;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('events', [AdminEventsController::class, 'index'])->name('admin.events.index');
    Route::post('events', [AdminEventsController::class, 'store'])->name('admin.events.store');
    Route::put('events/{event}', [AdminEventsController::class, 'update'])->name('admin.events.update');
    Route::delete('events/{event}', [AdminEventsController::class, 'destroy'])->name('admin.events.destroy');

    Route::get('attendees', [AttendeesController::class, 'index'])->name('admin.attendees.index');
    Route::post('attendees', [AttendeesController::class, 'store'])->name('admin.attendees.store');
    Route::put('attendees/{attendee}', [AttendeesController::class, 'update'])->name('admin.attendees.update');
    Route::delete('attendees/{attendee}', [AttendeesController::class, 'destroy'])->name('admin.attendees.destroy');
    Route::post('attendees/{attendee}/resend-ticket', [AttendeesController::class, 'resendTicket'])->name('admin.attendees.resend-ticket');
    Route::post('attendees/{attendee}/send-reminder', [AttendeesController::class, 'sendReminder'])->name('admin.attendees.send-reminder');
    Route::post('attendees/bulk-send-reminders', [AttendeesController::class, 'bulkSendReminders'])->name('admin.attendees.bulk-send-reminders');
    Route::post('attendees/bulk-resend-tickets', [AttendeesController::class, 'bulkResendTickets'])->name('admin.attendees.bulk-resend-tickets');
    Route::post('attendees/{attendee}/send-pre-event', [AttendeesController::class, 'sendPreEventMessage'])->name('admin.attendees.send-pre-event');
    Route::post('attendees/bulk-send-pre-event', [AttendeesController::class, 'bulkSendPreEventMessages'])->name('admin.attendees.bulk-send-pre-event');
    Route::get('attendees/export-pdf', [AttendeesController::class, 'exportPdf'])->name('admin.attendees.export-pdf');
    Route::get('attendees/export-excel', [AttendeesController::class, 'exportExcel'])->name('admin.attendees.export-excel');

    Route::get('payments', [PaymentsController::class, 'index'])->name('admin.payments.index');
    Route::post('payments', [PaymentsController::class, 'store'])->name('admin.payments.store');
    Route::put('payments/{payment}', [PaymentsController::class, 'update'])->name('admin.payments.update');
    Route::delete('payments/{payment}', [PaymentsController::class, 'destroy'])->name('admin.payments.destroy');
    Route::post('payments/{payment}/resend-notification', [PaymentsController::class, 'resendNotification'])->name('admin.payments.resend-notification');
    Route::get('payments/export/pdf', [PaymentsController::class, 'exportPdf'])->name('admin.payments.export.pdf');
    Route::get('payments/export/excel', [PaymentsController::class, 'exportExcel'])->name('admin.payments.export.excel');

    // User Management Routes
    Route::get('users', [\App\Http\Controllers\Admin\UsersController::class, 'index'])->name('admin.users.index');
    Route::post('users', [\App\Http\Controllers\Admin\UsersController::class, 'store'])->name('admin.users.store');
    Route::put('users/{user}/deactivate', [\App\Http\Controllers\Admin\UsersController::class, 'deactivate'])->name('admin.users.deactivate');
    Route::put('users/{user}/activate', [\App\Http\Controllers\Admin\UsersController::class, 'activate'])->name('admin.users.activate');
    Route::delete('users/{user}', [\App\Http\Controllers\Admin\UsersController::class, 'destroy'])->name('admin.users.destroy');
});

Route::get('/', [EventsController::class, 'singlesEvent'])
    ->name('singles-event');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/terms-of-service', function () {
    return Inertia::render('TermsOfService');
})->name('terms-of-service');

Route::post('/singles-event/purchase-ticket', [EventsController::class, 'purchaseTicket'])
    ->name('singles-event.purchase-ticket');

Route::post('/singles-event/purchase-group-ticket', [EventsController::class, 'purchaseGroupTicket'])
    ->name('singles-event.purchase-group-ticket');

Route::get('/singles-event/find-attendee', [EventsController::class, 'findAttendee'])
    ->name('singles-event.find-attendee');

Route::post('/singles-event/add-payment', [EventsController::class, 'addPayment'])
    ->name('singles-event.add-payment')
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

Route::get('/singles-event/download-ticket/{attendee}', [EventsController::class, 'downloadTicket'])
    ->name('singles-event.download-ticket');

Route::post('/singles-event/check-mpesa-code', [EventsController::class, 'checkMpesaCode'])
    ->name('singles-event.check-mpesa-code')
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
