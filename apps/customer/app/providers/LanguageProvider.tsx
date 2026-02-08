'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from '@moshwar/shared';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ar;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('moshwar-lang') as Language | null;
    if (saved && (saved === 'ar' || saved === 'fa')) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (mounted) localStorage.setItem('moshwar-lang', lang);
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'fa';
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'rtl';
  };

  const t = translations[language];

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir="rtl" lang={language} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
