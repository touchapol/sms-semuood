'use client';

import { useState } from 'react';
import { Phone, Loader2, Shuffle } from 'lucide-react';

interface RegistrationPopupProps {
    onRegister: (phoneNumber: string) => Promise<boolean>;
    onGenerateRandom: () => void;
    isLoading: boolean;
}

export default function RegistrationPopup({ onRegister, onGenerateRandom, isLoading }: RegistrationPopupProps) {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError('Please enter a phone number');
            return;
        }

        let formattedPhone = phone.trim();
        if (!formattedPhone.startsWith('+')) {
            formattedPhone = '+' + formattedPhone;
        }

        setError('');
        const success = await onRegister(formattedPhone);
        if (!success) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-sm rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="px-6 py-8">
                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto">
                        <Phone className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                        Welcome to SMS Simulation
                    </h2>
                    <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6 px-2">
                        Enter a phone number to bind to this session, or generate a random one. If the number is already in use by someone else, you will take it over.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                    +
                                </span>
                                <input
                                    type="tel"
                                    placeholder="66812345678"
                                    value={phone.replace(/^\+/, '')}
                                    onChange={(e) => {
                                        let val = e.target.value.replace(/\D/g, '');
                                        if (val.startsWith('0')) {
                                            val = '66' + val.slice(1);
                                        }
                                        setPhone(val);
                                    }}
                                    disabled={isLoading}
                                    className="w-full bg-slate-100 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-3.5 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs mt-2 px-1">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !phone.trim()}
                            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-primary/20"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Set Phone Number
                        </button>
                    </form>

                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">OR</span>
                        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
                    </div>

                    <button
                        type="button"
                        onClick={onGenerateRandom}
                        disabled={isLoading}
                        className="w-full mt-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <Shuffle className="w-4 h-4" />
                        Generate Random Number
                    </button>
                </div>
            </div>
        </div>
    );
}
