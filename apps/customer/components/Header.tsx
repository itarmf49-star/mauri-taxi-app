'use client';

import { useLanguage } from '@/app/providers/LanguageProvider';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-chinguetti-mosque text-chinguetti-sand py-3 px-4 shadow-lg relative overflow-hidden">
      <div className="chevon-pattern absolute inset-0 pointer-events-none" />
      <div className="relative flex justify-between items-center">
        <h1 className="text-xl font-bold font-arabic">{t.appName}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-3 py-1 rounded text-sm ${language === 'ar' ? 'bg-chinguetti-terracotta' : 'bg-chinguetti-stone/50 hover:bg-chinguetti-stone'}`}
          >
            العربية
          </button>
          <button
            onClick={() => setLanguage('fa')}
            className={`px-3 py-1 rounded text-sm ${language === 'fa' ? 'bg-chinguetti-terracotta' : 'bg-chinguetti-stone/50 hover:bg-chinguetti-stone'}`}
          >
            فارسی
          </button>
        </div>
      </div>
    </header>
  );
}
