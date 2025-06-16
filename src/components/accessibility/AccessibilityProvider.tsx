
import React, { createContext, useContext, useEffect } from 'react';
import { useAccessibilityPreferences } from '@/hooks/useAccessibilityPreferences';
import { AccessibilityPreferences } from '@/types/accessibility';
import { SkipNavigation } from './SkipNavigation';
import { ColorBlindFilters } from './ColorBlindFilters';

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (updates: Partial<Omit<AccessibilityPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => void;
  isLoading: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const { preferences, updatePreferences, isLoading, applyPreferences } = useAccessibilityPreferences();

  useEffect(() => {
    // Apply preferences on mount and when they change
    applyPreferences(preferences);
  }, [preferences, applyPreferences]);

  useEffect(() => {
    // Add keyboard event listeners for accessibility shortcuts
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content (Alt + 1)
      if (event.altKey && event.key === '1') {
        event.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      }

      // Skip to navigation (Alt + 2)
      if (event.altKey && event.key === '2') {
        event.preventDefault();
        const navigation = document.getElementById('navigation');
        if (navigation) {
          navigation.focus();
          navigation.scrollIntoView();
        }
      }

      // Toggle high contrast (Alt + H)
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        updatePreferences({
          visual_preferences: {
            ...preferences.visual_preferences,
            high_contrast: !preferences.visual_preferences.high_contrast
          }
        });
      }

      // Increase text size (Alt + Plus)
      if (event.altKey && event.key === '+') {
        event.preventDefault();
        const sizes = ['small', 'medium', 'large', 'extra-large'];
        const currentIndex = sizes.indexOf(preferences.visual_preferences.text_size);
        const nextIndex = Math.min(currentIndex + 1, sizes.length - 1);
        updatePreferences({
          visual_preferences: {
            ...preferences.visual_preferences,
            text_size: sizes[nextIndex] as 'small' | 'medium' | 'large' | 'extra-large'
          }
        });
      }

      // Decrease text size (Alt + Minus)
      if (event.altKey && event.key === '-') {
        event.preventDefault();
        const sizes = ['small', 'medium', 'large', 'extra-large'];
        const currentIndex = sizes.indexOf(preferences.visual_preferences.text_size);
        const nextIndex = Math.max(currentIndex - 1, 0);
        updatePreferences({
          visual_preferences: {
            ...preferences.visual_preferences,
            text_size: sizes[nextIndex] as 'small' | 'medium' | 'large' | 'extra-large'
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [preferences, updatePreferences]);

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreferences, isLoading }}>
      <SkipNavigation />
      <ColorBlindFilters />
      {children}
    </AccessibilityContext.Provider>
  );
};
