<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\NewUserCredentials;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->orderBy('created_at', 'desc')
            ->get(['id', 'name', 'email', 'email_verified_at', 'created_at', 'updated_at'])
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at->toDateTimeString(),
                    'updated_at' => $user->updated_at->toDateTimeString(),
                    'is_active' => $user->email_verified_at !== null,
                ];
            });

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);

        // Generate a temporary password
        $temporaryPassword = Str::random(12);

        // Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($temporaryPassword),
            'email_verified_at' => null, // User needs to verify email
        ]);

        // Send email with credentials
        try {
            Mail::to($user->email)->send(new NewUserCredentials($user, $temporaryPassword));
            
            return back()->with('success', "User '{$user->name}' created successfully. Login credentials have been sent to {$user->email}.");
        } catch (\Exception $e) {
            // If email fails, still create the user but inform admin
            return back()->with('warning', "User '{$user->name}' created successfully, but failed to send email. Temporary password: {$temporaryPassword}");
        }
    }

    public function deactivate(Request $request, User $user): RedirectResponse
    {
        // Prevent deactivating yourself
        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot deactivate your own account.');
        }

        // Deactivate by removing email verification
        $user->update(['email_verified_at' => null]);

        return back()->with('success', "User '{$user->name}' has been deactivated successfully.");
    }

    public function activate(Request $request, User $user): RedirectResponse
    {
        // Activate by setting email verification
        $user->update(['email_verified_at' => now()]);

        return back()->with('success', "User '{$user->name}' has been activated successfully.");
    }

    public function destroy(User $user): RedirectResponse
    {
        // Prevent deleting yourself
        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $userName = $user->name;
        $user->delete();

        return back()->with('success', "User '{$userName}' has been deleted successfully.");
    }
}
