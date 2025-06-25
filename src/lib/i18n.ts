import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enNavigation from '../locales/en/navigation.json';
import enHome from '../locales/en/home.json';
import enCommon from '../locales/en/common.json';
import enForms from '../locales/en/forms.json';
import enSummerCamps from '../locales/en/summer-camps.json';
import enSchoolPrograms from '../locales/en/school-programs.json';
import enScholarships from '../locales/en/scholarships.json';
import enGraduatePrograms from '../locales/en/graduate-programs.json';

import arNavigation from '../locales/ar/navigation.json';
import arHome from '../locales/ar/home.json';
import arCommon from '../locales/ar/common.json';
import arForms from '../locales/ar/forms.json';
import arSummerCamps from '../locales/ar/summer-camps.json';
import arSchoolPrograms from '../locales/ar/school-programs.json';
import arScholarships from '../locales/ar/scholarships.json';
import arGraduatePrograms from '../locales/ar/graduate-programs.json';

// Define the resources
const resources = {
  en: {
    navigation: enNavigation,
    home: enHome,
    common: enCommon,
    forms: enForms,
    'summer-camps': enSummerCamps,
    'school-programs': enSchoolPrograms,
    'scholarships': enScholarships,
    'graduate-programs': enGraduatePrograms,
    // Keep the existing pages namespace for backward compatibility
    pages: enHome
  },
  ar: {
    navigation: arNavigation,
    home: arHome,
    common: arCommon,
    forms: arForms,
    'summer-camps': arSummerCamps,
    'school-programs': arSchoolPrograms,
    'scholarships': arScholarships,
    'graduate-programs': arGraduatePrograms,
    // Keep the existing pages namespace for backward compatibility
    pages: arHome
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    defaultNS: 'common',
    ns: ['navigation', 'home', 'common', 'forms', 'pages', 'summer-camps', 'school-programs', 'scholarships', 'graduate-programs'],
    
    // Add these options to ensure proper loading and updates
    react: {
      useSuspense: false,
    },
    
    // Ensure resources are loaded before initialization
    initImmediate: false,

    // Translation key validation
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${lng}.${ns}.${key}`);
      }
    },

    // Namespace fallback for missing keys
    nsSeparator: ':',
    keySeparator: '.',
    
    // Return key if translation is missing in development
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
  });

// Add event listeners for debugging and monitoring
i18n.on('languageChanged', (lng) => {
  console.log('i18n language changed to:', lng);
  
  // Update document direction and language
  if (typeof document !== 'undefined') {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // Update CSS custom property for direction-aware styles
    document.documentElement.style.setProperty('--text-direction', lng === 'ar' ? 'rtl' : 'ltr');
  }
});

i18n.on('loaded', (loaded) => {
  console.log('i18n resources loaded:', loaded);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error('i18n failed loading:', lng, ns, msg);
});

i18n.on('missingKey', (lng, namespace, key, res) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Missing i18n key [${lng}] ${namespace}:${key}`, res);
  }
});

export default i18n;

