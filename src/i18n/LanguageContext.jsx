import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from './translations';

const LanguageContext = createContext();

export const AVAILABLE_LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
  { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
  { code: 'ar', label: 'العربية', flag: '🇩🇿', short: 'عربي' }
];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('auto_showroom_lang') || 'fr';
  });

  const isRTL = language === 'ar';

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('auto_showroom_lang', lang);
    } catch (e) {
      console.warn('localStorage error', e);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language, isRTL]);

  // Nested translation lookup helper
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    
    // Try current language
    let current = TRANSLATIONS[language];
    for (const p of parts) {
      if (current && current[p] !== undefined) {
        current = current[p];
      } else {
        current = null;
        break;
      }
    }
    if (current !== null && current !== undefined) return current;

    // Fallback to French
    let fallbackCurr = TRANSLATIONS.fr;
    for (const p of parts) {
      if (fallbackCurr && fallbackCurr[p] !== undefined) {
        fallbackCurr = fallbackCurr[p];
      } else {
        fallbackCurr = null;
        break;
      }
    }
    if (fallbackCurr !== null && fallbackCurr !== undefined) return fallbackCurr;

    return fallback || path;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      isRTL,
      t,
      languages: AVAILABLE_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
