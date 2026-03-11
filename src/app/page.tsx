'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import MessagesScreen from '../components/MessagesScreen';
import ApiDocsScreen from '../components/ApiDocsScreen';
import SettingsScreen from '../components/SettingsScreen';
import BottomNav from '../components/BottomNav';
import IPhoneFrame from '../components/IPhoneFrame';
import RegistrationPopup from '../components/RegistrationPopup';

import { useDevice } from '../hooks/useSimulator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('messages');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const device = useDevice();

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 640px)');
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    return () => mql.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const content = (
    <>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {currentScreen === 'messages' && <MessagesScreen token={device.token} />}
        {currentScreen === 'api' && <ApiDocsScreen phoneNumber={device.phoneNumber} token={device.token} />}
        {currentScreen === 'settings' && <SettingsScreen phoneNumber={device.phoneNumber} onReset={device.resetDevice} />}
      </div>
      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

      {!device.isLoading && !device.phoneNumber && (
        <RegistrationPopup
          onRegister={device.registerDevice}
          onGenerateRandom={device.generateDevice}
          isLoading={device.isLoading}
        />
      )}
    </>
  );

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-neutral-950 flex items-center justify-center p-8 font-display relative transition-colors duration-300">
        <IPhoneFrame>{content}</IPhoneFrame>

        <button
          onClick={toggleTheme}
          className="absolute bottom-8 right-8 size-14 rounded-full bg-white dark:bg-neutral-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:scale-105 transition-transform border border-slate-200 dark:border-neutral-700"
          title="Toggle Dark/Light Mode"
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex flex-col font-display text-slate-900 dark:text-neutral-100 transition-colors duration-300">
      {content}
    </div>
  );
}
