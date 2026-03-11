'use client';

import { MessageCircle, FileText, Settings } from 'lucide-react';

export default function BottomNav({ currentScreen, setCurrentScreen }: { currentScreen: string, setCurrentScreen: (s: string) => void }) {
  return (
    <div className="sticky bottom-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-slate-100 dark:border-[#2c2c2e] pb-6 pt-2 z-20">
      <div className="flex justify-around items-center px-4">
        <button
          onClick={() => setCurrentScreen('messages')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'messages' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
        >
          <MessageCircle className={`w-6 h-6 ${currentScreen === 'messages' ? 'fill-current' : ''}`} strokeWidth={currentScreen === 'messages' ? 2 : 1.5} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Messages</span>
        </button>
        <button
          onClick={() => setCurrentScreen('api')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'api' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
        >
          <FileText className={`w-6 h-6 ${currentScreen === 'api' ? 'fill-current' : ''}`} strokeWidth={currentScreen === 'api' ? 2 : 1.5} />
          <span className="text-[10px] font-medium uppercase tracking-wider">API Docs</span>
        </button>
        <button
          onClick={() => setCurrentScreen('settings')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'settings' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
        >
          <Settings className={`w-6 h-6 ${currentScreen === 'settings' ? 'fill-current' : ''}`} strokeWidth={currentScreen === 'settings' ? 2 : 1.5} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Settings</span>
        </button>
      </div>
    </div>
  );
}
