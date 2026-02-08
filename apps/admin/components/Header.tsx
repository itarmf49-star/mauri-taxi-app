'use client';

import { useLanguage } from '@/app/providers/LanguageProvider';
import Link from 'next/link';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-chinguetti-mosque text-chinguetti-sand py-3 px-4 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">{t.appName} - {t.dashboard}</h1>
        <div className="flex items-center gap-4">
          <nav className="flex gap-2">
            <Link href="/" className="px-3 py-1 rounded bg-chinguetti-stone/50 hover:bg-chinguetti-stone text-white">الرئيسية</Link>
            <Link href="/rides" className="px-3 py-1 rounded bg-chinguetti-stone/50 hover:bg-chinguetti-stone text-white">{t.allRides}</Link>
            <Link href="/drivers" className="px-3 py-1 rounded bg-chinguetti-stone/50 hover:bg-chinguetti-stone text-white">{t.manageDrivers}</Link>
          </nav>
          <div className="flex gap-2">
            <button onClick={() => setLanguage('ar')} className={`px-3 py-1 rounded text-sm ${language === 'ar' ? 'bg-chinguetti-terracotta' : 'bg-chinguetti-stone/50'}`}>العربية</button>
            <button onClick={() => setLanguage('fa')} className={`px-3 py-1 rounded text-sm ${language === 'fa' ? 'bg-chinguetti-terracotta' : 'bg-chinguetti-stone/50'}`}>فارسی</button>
          </div>
        </div>
      </div>
    </header>
  );
}
