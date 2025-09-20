import React, { useState, useEffect, createContext, useContext } from 'react';
import { translations } from '../lib/i18n';

export type Language = 'en' | 'ar';
type Translations = typeof translations.en;

interface TranslationContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('cv-lang');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('cv-lang', lang);
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = translations[lang];

  // FIX: Replaced JSX with React.createElement to be compatible with a .ts file extension.
  // The original JSX syntax caused parsing errors because this file isn't a .tsx file.
  return React.createElement(TranslationContext.Provider, { value: { lang, setLang, t } }, children);
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
