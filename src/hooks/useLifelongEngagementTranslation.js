import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

/**
 * Enhanced translation hook for Lifelong Engagement sections
 * Provides proper namespace loading and language change handling
 */
export const useLifelongEngagementTranslation = (namespace) => {
  const { language } = useLanguage();
  const [isReady, setIsReady] = useState(false);
  const { t, i18n, ready } = useTranslation(namespace, {
    useSuspense: false,
    // CRITICAL FIX: Ensure namespace is loaded and reloaded on changes
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
  });

  useEffect(() => {
    const loadNamespace = async () => {
      console.log(`Loading namespace ${namespace} for language ${language}`);
      
      if (language && i18n.language !== language) {
        console.log(`Language mismatch: i18n=${i18n.language}, context=${language}`);
        setIsReady(false);
        
        try {
          // Change language first
          await i18n.changeLanguage(language);
          
          // Force reload the specific namespace
          await i18n.reloadResources(language, namespace);
          
          console.log(`Successfully loaded ${namespace} for ${language}`);
          setIsReady(true);
        } catch (error) {
          console.error(`Failed to load namespace ${namespace}:`, error);
          setIsReady(true); // Still set ready to avoid infinite loading
        }
      } else if (ready) {
        console.log(`Namespace ${namespace} already ready for ${language}`);
        setIsReady(true);
      }
    };

    loadNamespace();
  }, [language, namespace, i18n, ready]);

  // Also listen for i18n events
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      console.log(`i18n language changed event for ${namespace}: ${lng}`);
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
    language: i18n.language,
    ready 
  };
};

export default useLifelongEngagementTranslation;