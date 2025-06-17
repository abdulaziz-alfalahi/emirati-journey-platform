
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
  // Initialize with a safe default first
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Use useEffect to load from localStorage after component mounts
  useEffect(() => {
    try {
      const stored = localStorage.getItem('language');
      if (stored && (stored === 'en' || stored === 'ar')) {
        setLanguageState(stored as Language);
      }
    } catch (error) {
      console.warn('Failed to load language from localStorage:', error);
    }
  }, []);

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  const setLanguage = (newLanguage: Language) => {
    console.log('Changing language to:', newLanguage);
    setLanguageState(newLanguage);
    
    // Save to localStorage safely
    try {
      localStorage.setItem('language', newLanguage);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
    
    // Change language in i18n
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(newLanguage);
    }
  };

  useEffect(() => {
    // Update document direction and language
    if (typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = language;
    }
    
    // Set initial language in i18n
    if (i18n && i18n.isInitialized && i18n.changeLanguage) {
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
