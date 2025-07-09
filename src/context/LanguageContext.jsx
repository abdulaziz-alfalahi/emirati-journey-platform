
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import i18n from '../lib/i18n';

interface LanguageContextType {
  language: string;
  direction: string;
  setLanguage: (lang: string) => Promise<void>;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  // Initialize state with a safer approach
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
      return stored || defaultLanguage;
    } catch (error) {
      console.warn('Failed to read language from localStorage:', error);
      return defaultLanguage;
    }
  });

  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  const setLanguage = async (newLanguage: string) => {
    // Prevent unnecessary changes
    if (language === newLanguage) return;
    
    try {
      // Save to localStorage first
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', newLanguage);
      }
      
      // Change the language
      await i18n.changeLanguage(newLanguage);
      
      // CRITICAL FIX: Force reload all Lifelong Engagement namespaces
      const lifelongNamespaces = [
        'youth-development', 'national-service', 'thought-leadership',
        'share-success-stories', 'retiree'
      ];
      
      await Promise.all(
        lifelongNamespaces.map(ns => i18n.reloadResources(newLanguage, ns))
      );
      
      // Update state only after i18n change is complete
      setLanguageState(newLanguage);
      
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  useEffect(() => {
    console.log('Language effect triggered:', language);
    console.log('i18n current language:', i18n.language);
    
    // Update document direction and language
    if (typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = language;
      
      // Update CSS custom property for direction-aware styles
      document.documentElement.style.setProperty('--text-direction', direction);
    }
    
    // Set initial language in i18n
    const changeLanguage = async () => {
      try {
        if (i18n.isInitialized) {
          console.log('i18n is initialized, changing language to:', language);
          await i18n.changeLanguage(language);
        } else {
          console.log('i18n not initialized, waiting...');
          // Wait for i18n to initialize
          i18n.on('initialized', async () => {
            console.log('i18n initialized, changing language to:', language);
            await i18n.changeLanguage(language);
          });
        }
      } catch (error) {
        console.error('Failed to initialize language in i18n:', error);
      }
    };
    
    changeLanguage();
  }, [language, direction]);

  const value = {
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
