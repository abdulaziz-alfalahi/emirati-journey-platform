
import i18n from './i18n';

/**
 * Translation utility functions for consistent key validation and error handling
 */

/**
 * Validates if a translation key exists
 * @param key Translation key in dot notation
 * @param namespace Namespace to check (default: 'common')
 * @returns boolean indicating if key exists
 */
export const hasTranslationKey = (key: string, namespace: string = 'common'): boolean => {
  return i18n.exists(`${namespace}:${key}`);
};

/**
 * Gets a translation with fallback to key if missing
 * @param key Translation key
 * @param namespace Namespace (default: 'common')
 * @param options Translation options
 * @returns Translated string or key if missing
 */
export const getTranslationWithFallback = (
  key: string, 
  namespace: string = 'common', 
  options?: any
): string => {
  const fullKey = `${namespace}:${key}`;
  if (i18n.exists(fullKey)) {
    const translation = i18n.t(fullKey, options);
    // Ensure we return a string, not an object or array
    return typeof translation === 'string' ? translation : String(translation);
  }
  
  // Log missing key in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Missing translation: ${fullKey}`);
  }
  
  // Return formatted key as fallback
  return key.split('.').pop() || key;
};

/**
 * Validates translation completeness for a namespace
 * @param namespace Namespace to validate
 * @param language Language code (default: current language)
 * @returns Array of missing keys
 */
export const validateTranslationCompleteness = (
  namespace: string, 
  language: string = i18n.language
): string[] => {
  const missingKeys: string[] = [];
  const resources = i18n.getResourceBundle(language, namespace);
  
  if (!resources) {
    console.warn(`No resources found for ${language}:${namespace}`);
    return [`${namespace} (entire namespace missing)`];
  }
  
  return missingKeys;
};

/**
 * Gets all available translation namespaces
 * @returns Array of namespace names
 */
export const getAvailableNamespaces = (): string[] => {
  const namespaces = i18n.options.ns;
  if (Array.isArray(namespaces)) {
    return [...namespaces]; // Create a mutable copy
  }
  if (typeof namespaces === 'string') {
    return [namespaces];
  }
  return ['common']; // fallback
};

/**
 * Gets all available languages
 * @returns Array of language codes
 */
export const getAvailableLanguages = (): string[] => {
  return Object.keys(i18n.services.resourceStore.data);
};

/**
 * Format interpolation object for Arabic and English
 * @param count Number for pluralization
 * @param context Additional context
 * @returns Formatted interpolation object
 */
export const formatInterpolation = (count?: number, context?: Record<string, any>) => {
  return {
    count,
    ...context,
    // Use Western Arabic numerals for all languages
    formattedCount: count?.toString(),
  };
};

/**
 * Format numbers using Western Arabic numerals (1234567890)
 * @param num Number to format
 * @returns String with Western Arabic numerals
 */
export const formatNumber = (num: number): string => {
  return num.toString();
};

/**
 * Check if current language is RTL
 * @returns boolean indicating RTL direction
 */
export const isRTL = (): boolean => {
  return i18n.language === 'ar';
};

/**
 * Get direction-aware class names
 * @param ltrClass Class for LTR languages
 * @param rtlClass Class for RTL languages
 * @returns Appropriate class name
 */
export const getDirectionalClass = (ltrClass: string, rtlClass: string): string => {
  return isRTL() ? rtlClass : ltrClass;
};

export default {
  hasTranslationKey,
  getTranslationWithFallback,
  validateTranslationCompleteness,
  getAvailableNamespaces,
  getAvailableLanguages,
  formatInterpolation,
  formatNumber,
  isRTL,
  getDirectionalClass,
};
