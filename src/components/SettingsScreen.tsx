'use client';
import { ArrowLeft, User, ChevronRight, Bell, Lock, Trash2, RefreshCw } from 'lucide-react';

export default function SettingsScreen({ phoneNumber, onReset }: { phoneNumber: string, onReset: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-black">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-[#2c2c2e] pt-2">
        <div className="flex items-center p-4 justify-between w-full">
          <div className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Settings</h2>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-8">
        <div className="mt-4 px-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">Account</h3>
          <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden border border-slate-200 dark:border-[#2c2c2e]">
            <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between hover:bg-slate-50 dark:hover:bg-[#2c2c2e]/50 cursor-pointer transition-colors border-b border-slate-100 dark:border-[#2c2c2e]">
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 dark:text-slate-100 text-base font-medium leading-normal truncate">Profile</p>
                  <p className="text-slate-500 text-sm font-mono truncate">{phoneNumber}</p>
                </div>
              </div>
              <div className="shrink-0 text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">Maintenance</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white dark:bg-[#1c1c1e] text-red-500 font-semibold rounded-xl border border-red-100 dark:border-[#2c2c2e] hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors shadow-sm">
              <Trash2 className="w-5 h-5" />
              Reset All Messages
            </button>
            <button onClick={onReset} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white dark:bg-[#1c1c1e] text-primary font-semibold rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors shadow-sm">
              <RefreshCw className="w-5 h-5" />
              Reset Phone Number
            </button>
            <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 px-4 pt-1">
              Warning: These actions are permanent and cannot be undone. Data will be completely wiped from the device.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
