import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

/**
 * Enhanced translation hook for Lifelong Engagement sections
 * Provides proper namespace loading and language change handling
 */
export const useLifelongEngagementTranslation = (namespace: string) => {
  const { language } = useLanguage();
  const [isReady, setIsReady] = useState(false);
  const { t, i18n, ready } = useTranslation(namespace, {
    useSuspense: false,
    bindI18n: 'languageChanged loaded',
  });

  useEffect(() => {
    const loadNamespace = async () => {
      if (language && i18n.language !== language) {
        setIsReady(false);
        
        try {
          await i18n.changeLanguage(language);
          await i18n.reloadResources(language, namespace);
          setIsReady(true);
        } catch (error) {
          console.error(`Failed to load namespace ${namespace}:`, error);
          setIsReady(true);
        }
      } else if (ready) {
        setIsReady(true);
      }
    };

    loadNamespace();
  }, [language, namespace, i18n, ready]);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      if (lng === language) {
        setIsReady(true);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, language, namespace]);

  return { 
    t, 
    isReady, 
    language: i18n.language 
  };
};

export default useLifelongEngagementTranslation;