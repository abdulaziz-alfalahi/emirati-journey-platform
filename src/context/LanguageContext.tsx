
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<string>(defaultLanguage);

  useEffect(() => {
    // Set initial language from i18n
    setLanguageState(i18n.language || defaultLanguage);
  }, [i18n.language, defaultLanguage]);

  const setLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      isRTL,
      direction
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
