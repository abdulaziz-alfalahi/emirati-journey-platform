
import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../lib/i18n';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Simplified initialization without try-catch
    const stored = localStorage.getItem('language');
    return (stored as Language) || defaultLanguage;
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  const setLanguage = (newLanguage: Language) => {
    console.log('Changing language to:', newLanguage);
    setLanguageState(newLanguage);
    
    // Save to localStorage
    localStorage.setItem('language', newLanguage);
    
    // Change language in i18n
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // Set initial language in i18n
    if (i18n.isInitialized) {
      i18n.changeLanguage(language);
    }
  }, [language, direction]);

  const value: LanguageContextType = {
    language,
    direction,
    setLanguage,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
