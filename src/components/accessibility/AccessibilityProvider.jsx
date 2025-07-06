import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  // Load settings from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse accessibility settings from localStorage');
        }
      }
    }
    
    return {
      highContrast: false,
      fontSize: 'normal', // normal, large, extra-large
      reducedMotion: false,
      screenReaderMode: false,
      keyboardNavigation: true,
      focusIndicators: true,
      language: 'ar' // ar, en
    };
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    }
  }, [settings]);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large');
    root.classList.add(`font-size-${settings.fontSize}`);

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Screen reader mode
    if (settings.screenReaderMode) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('focus-indicators');
    } else {
      root.classList.remove('focus-indicators');
    }

    // Language direction
    root.setAttribute('dir', settings.language === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', settings.language);

  }, [settings]);

  // Detect user preferences
  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !settings.reducedMotion) {
      updateSetting('reducedMotion', true);
    }

    // Check for prefers-contrast
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    if (contrastQuery.matches && !settings.highContrast) {
      updateSetting('highContrast', true);
    }

    // Listen for changes
    const handleMotionChange = (e) => {
      updateSetting('reducedMotion', e.matches);
    };

    const handleContrastChange = (e) => {
      updateSetting('highContrast', e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleHighContrast = () => {
    updateSetting('highContrast', !settings.highContrast);
  };

  const increaseFontSize = () => {
    const sizes = ['normal', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextIndex = Math.min(currentIndex + 1, sizes.length - 1);
    updateSetting('fontSize', sizes[nextIndex]);
  };

  const decreaseFontSize = () => {
    const sizes = ['normal', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextIndex = Math.max(currentIndex - 1, 0);
    updateSetting('fontSize', sizes[nextIndex]);
  };

  const toggleReducedMotion = () => {
    updateSetting('reducedMotion', !settings.reducedMotion);
  };

  const toggleScreenReaderMode = () => {
    updateSetting('screenReaderMode', !settings.screenReaderMode);
  };

  const toggleLanguage = () => {
    updateSetting('language', settings.language === 'ar' ? 'en' : 'ar');
  };

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      fontSize: 'normal',
      reducedMotion: false,
      screenReaderMode: false,
      keyboardNavigation: true,
      focusIndicators: true,
      language: 'ar'
    });
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip to main content (Alt + M)
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const main = document.querySelector('main') || document.querySelector('[role="main"]');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Skip to navigation (Alt + N)
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
        if (nav) {
          const firstLink = nav.querySelector('a, button');
          if (firstLink) {
            firstLink.focus();
          }
        }
      }

      // Toggle accessibility menu (Alt + A)
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        const accessibilityButton = document.querySelector('[data-accessibility-toggle]');
        if (accessibilityButton) {
          accessibilityButton.click();
        }
      }
    };

    if (settings.keyboardNavigation) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [settings.keyboardNavigation]);

  const value = {
    settings,
    updateSetting,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleReducedMotion,
    toggleScreenReaderMode,
    toggleLanguage,
    resetSettings,
    
    // Computed values
    isHighContrast: settings.highContrast,
    fontSize: settings.fontSize,
    isReducedMotion: settings.reducedMotion,
    isScreenReaderMode: settings.screenReaderMode,
    language: settings.language,
    isRTL: settings.language === 'ar'
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <div 
        className={`accessibility-wrapper ${settings.highContrast ? 'high-contrast' : ''} ${settings.reducedMotion ? 'reduce-motion' : ''}`}
        data-font-size={settings.fontSize}
        data-language={settings.language}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

