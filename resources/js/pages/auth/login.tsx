import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, CrownIcon, SparklesIcon, LockIcon, MailIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="" description="">
            <Head title="Admin Login" />

            {/* Enhanced Header */}
            <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                 
                    <h1 className="text-3xl font-black text-gray-500 tracking-tight font-serif">
                        OLQP PARISH
                    </h1>
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                    <SparklesIcon className="size-5 text-yellow-500 animate-pulse" />
                    <p className="text-yellow-500 text-sm font-bold tracking-widest uppercase">Admin LOGIN</p>
                    <SparklesIcon className="size-5 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-gray-500 text-sm italic">
                    Access the singles dinner admin portal
                </p>
            </div>

            {/* Enhanced Form Container */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-yellow-500/30 hover:shadow-3xl transition-all duration-500">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* Enhanced Email Field */}
                        <div className="grid gap-3">
                            <Label htmlFor="email" className="text-yellow-400 font-semibold text-sm tracking-wide">
                                Email Address
                            </Label>
                            <div className="relative group">
                                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-yellow-500 group-focus-within:text-yellow-400 transition-colors duration-300" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email address"
                                    className="pl-12 bg-gray-800/50 border-yellow-500/30 text-gray-100 placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-300 rounded-xl"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Enhanced Password Field */}
                        <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-yellow-400 font-semibold text-sm tracking-wide">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink 
                                        href={route('password.request')} 
                                        className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors duration-300" 
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative group">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-yellow-500 group-focus-within:text-yellow-400 transition-colors duration-300" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className="pl-12 bg-gray-800/50 border-yellow-500/30 text-gray-100 placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-300 rounded-xl"
                                />
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Enhanced Remember Me */}
                        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                            />
                            <Label htmlFor="remember" className="text-gray-300 text-sm font-medium cursor-pointer">
                                Remember me for 30 days
                            </Label>
                        </div>

                        {/* Enhanced Submit Button */}
                        <Button 
                            type="submit" 
                            className="mt-6 w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300" 
                            tabIndex={4} 
                            disabled={processing}
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <LoaderCircle className="h-5 w-5 animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <LockIcon className="h-5 w-5" />
                                    <span>Sign In to Admin Portal</span>
                                </div>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Enhanced Status Message */}
                {status && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30 text-center">
                        <div className="text-sm font-medium text-green-400">{status}</div>
                    </div>
                )}
            </div>

            {/* Enhanced Footer */}
            <div className="text-center mt-8">
                <p className="text-gray-400 text-xs">
                    Secure access to OLQP Singles Dinner 2025 management system
                </p>
                <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </AuthLayout>
    );
}
