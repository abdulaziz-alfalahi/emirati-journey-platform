
import { useState, useEffect } from 'react';
import { AccessibilityPreferences } from '@/types/accessibility';
import { useAuth } from '@/context/AuthContext';

const defaultPreferences: Omit<AccessibilityPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  visual_preferences: {
    text_size: 'medium',
    high_contrast: false,
    color_blind_filter: 'none',
    magnification_level: 1,
    reduce_motion: false,
  },
  audio_preferences: {
    screen_reader_enabled: false,
    audio_descriptions: false,
    voice_navigation: false,
    audio_feedback: false,
    speech_rate: 1,
  },
  motor_preferences: {
    keyboard_only: false,
    voice_control: false,
    simplified_interactions: false,
    touch_assistance: false,
    hover_timeout: 500,
  },
  cognitive_preferences: {
    simplified_language: false,
    step_by_step_guidance: false,
    progress_indicators: true,
    auto_save: true,
    reading_assistance: false,
  },
};

export const useAccessibilityPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    id: '',
    user_id: user?.id || '',
    ...defaultPreferences,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, [user]);

  const loadPreferences = async () => {
    try {
      // Load from localStorage for now (in a real app, this would be from a database)
      const stored = localStorage.getItem(`accessibility_preferences_${user?.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
        applyPreferences(parsed);
      } else {
        // Apply system preferences detection
        detectSystemPreferences();
      }
    } catch (error) {
      console.error('Failed to load accessibility preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const detectSystemPreferences = () => {
    const systemPreferences = { ...defaultPreferences };

    // Detect system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      systemPreferences.visual_preferences.reduce_motion = true;
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      systemPreferences.visual_preferences.high_contrast = true;
    }

    // Check for large text preference
    if (window.matchMedia('(prefers-reduced-data: reduce)').matches) {
      systemPreferences.visual_preferences.text_size = 'large';
    }

    setPreferences(prev => ({
      ...prev,
      ...systemPreferences,
    }));

    applyPreferences({
      ...preferences,
      ...systemPreferences,
    });
  };

  const updatePreferences = async (updates: Partial<Omit<AccessibilityPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    const updatedPreferences = {
      ...preferences,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    setPreferences(updatedPreferences);
    
    try {
      // Save to localStorage (in a real app, this would save to a database)
      localStorage.setItem(`accessibility_preferences_${user?.id}`, JSON.stringify(updatedPreferences));
      applyPreferences(updatedPreferences);
    } catch (error) {
      console.error('Failed to save accessibility preferences:', error);
    }
  };

  const applyPreferences = (prefs: AccessibilityPreferences) => {
    const root = document.documentElement;
    
    // Apply text size
    root.classList.remove('text-size-small', 'text-size-medium', 'text-size-large', 'text-size-extra-large');
    root.classList.add(`text-size-${prefs.visual_preferences.text_size}`);
    
    // Apply high contrast
    if (prefs.visual_preferences.high_contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Apply color blind filters
    root.classList.remove('filter-protanopia', 'filter-deuteranopia', 'filter-tritanopia');
    if (prefs.visual_preferences.color_blind_filter !== 'none') {
      root.classList.add(`filter-${prefs.visual_preferences.color_blind_filter}`);
    }
    
    // Apply reduced motion
    if (prefs.visual_preferences.reduce_motion) {
      root.style.setProperty('--animation-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
    }
    
    // Apply enhanced focus for keyboard navigation
    if (prefs.motor_preferences.keyboard_only) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    // Apply dyslexia-friendly font if reading assistance is enabled
    if (prefs.cognitive_preferences.reading_assistance) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }

    // Announce changes to screen readers
    if (prefs.audio_preferences.screen_reader_enabled) {
      announceToScreenReader('Accessibility settings updated');
    }
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const resetPreferences = () => {
    const resetPrefs = {
      ...preferences,
      ...defaultPreferences,
      updated_at: new Date().toISOString(),
    };
    
    setPreferences(resetPrefs);
    localStorage.removeItem(`accessibility_preferences_${user?.id}`);
    applyPreferences(resetPrefs);
  };

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    isLoading,
    applyPreferences,
  };
};
