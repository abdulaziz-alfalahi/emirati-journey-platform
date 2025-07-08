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
      console.log(`[${namespace}] Loading namespace for language ${language}`);
      console.log(`[${namespace}] Current i18n language: ${i18n.language}, ready: ${ready}`);
      console.log(`[${namespace}] Available resources:`, i18n.getResourceBundle(language, namespace));
      
      if (language && i18n.language !== language) {
        console.log(`[${namespace}] Language mismatch: i18n=${i18n.language}, context=${language}`);
        setIsReady(false);
        
        try {
          // Change language first
          await i18n.changeLanguage(language);
          console.log(`[${namespace}] Language changed to: ${i18n.language}`);
          
          // Force reload the specific namespace
          await i18n.reloadResources(language, namespace);
          console.log(`[${namespace}] Resources reloaded for ${language}`);
          
          // Check if resources are now available
          const bundle = i18n.getResourceBundle(language, namespace);
          console.log(`[${namespace}] Available resources after reload:`, bundle);
          
          if (bundle && Object.keys(bundle).length > 0) {
            console.log(`[${namespace}] Successfully loaded namespace for ${language}`);
            setIsReady(true);
          } else {
            console.warn(`[${namespace}] No resources found after reload for ${language}`);
            setIsReady(true); // Still set ready to avoid infinite loading
          }
        } catch (error) {
          console.error(`[${namespace}] Failed to load namespace:`, error);
          setIsReady(true); // Still set ready to avoid infinite loading
        }
      } else if (ready) {
        const bundle = i18n.getResourceBundle(language, namespace);
        console.log(`[${namespace}] Already ready - checking resources:`, bundle);
        if (bundle && Object.keys(bundle).length > 0) {
          console.log(`[${namespace}] Resources available, setting ready`);
          setIsReady(true);
        } else {
          console.warn(`[${namespace}] No resources available, forcing reload`);
          try {
            await i18n.reloadResources(language, namespace);
            setIsReady(true);
          } catch (error) {
            console.error(`[${namespace}] Failed to force reload:`, error);
            setIsReady(true);
          }
        }
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