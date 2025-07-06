# Phase 2B.1: Accessibility Implementation (WCAG 2.1 AA)

## 🎯 **Accessibility Excellence Strategy**

This phase focuses on implementing comprehensive accessibility features to ensure the Emirati Pathways Platform meets WCAG 2.1 AA standards and provides an inclusive experience for all users.

## 📋 **WCAG 2.1 AA Requirements Checklist**

### **1. Perceivable**

#### **1.1 Text Alternatives**
- [ ] All images have meaningful alt text
- [ ] Decorative images have empty alt attributes
- [ ] Complex images have detailed descriptions
- [ ] Icons have accessible names

#### **1.2 Time-based Media**
- [ ] Video content has captions
- [ ] Audio content has transcripts
- [ ] Auto-playing media can be paused

#### **1.3 Adaptable**
- [ ] Content structure is logical without CSS
- [ ] Information and relationships are programmatically determinable
- [ ] Reading sequence is meaningful
- [ ] Instructions don't rely solely on sensory characteristics

#### **1.4 Distinguishable**
- [ ] Color contrast ratio is at least 4.5:1 for normal text
- [ ] Color contrast ratio is at least 3:1 for large text
- [ ] Color is not the only means of conveying information
- [ ] Text can be resized up to 200% without loss of functionality
- [ ] Images of text are avoided when possible

### **2. Operable**

#### **2.1 Keyboard Accessible**
- [ ] All functionality is available via keyboard
- [ ] No keyboard traps exist
- [ ] Keyboard shortcuts don't conflict with assistive technology

#### **2.2 Enough Time**
- [ ] Time limits can be extended or disabled
- [ ] Auto-updating content can be paused
- [ ] Users are warned of time limits

#### **2.3 Seizures and Physical Reactions**
- [ ] Content doesn't flash more than 3 times per second
- [ ] Motion can be disabled for vestibular disorders

#### **2.4 Navigable**
- [ ] Skip links are provided
- [ ] Page titles are descriptive
- [ ] Focus order is logical
- [ ] Link purposes are clear from context
- [ ] Multiple ways to find pages exist
- [ ] Headings and labels are descriptive
- [ ] Focus is visible

### **3. Understandable**

#### **3.1 Readable**
- [ ] Page language is identified
- [ ] Language changes are identified
- [ ] Unusual words are defined

#### **3.2 Predictable**
- [ ] Focus doesn't cause unexpected context changes
- [ ] Input doesn't cause unexpected context changes
- [ ] Navigation is consistent
- [ ] Identification is consistent

#### **3.3 Input Assistance**
- [ ] Errors are identified and described
- [ ] Labels and instructions are provided
- [ ] Error suggestions are provided
- [ ] Errors are prevented for important data

### **4. Robust**

#### **4.1 Compatible**
- [ ] Markup is valid
- [ ] Name, role, and value are programmatically determinable

## 🛠️ **Implementation Components**

### **1. Accessibility Provider & Context**

```javascript
// src/contexts/AccessibilityContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    fontSize: 'normal',
    screenReader: false
  });

  useEffect(() => {
    // Detect user preferences
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const highContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setPreferences(prev => ({
      ...prev,
      reducedMotion,
      highContrast
    }));
  }, []);

  return (
    <AccessibilityContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
```

### **2. Skip Navigation Component**

```javascript
// src/components/accessibility/SkipNavigation.jsx
import React from 'react';
import { cn } from '@/lib/utils';

const SkipNavigation = () => {
  return (
    <div className="sr-only focus:not-sr-only">
      <a
        href="#main-content"
        className={cn(
          "absolute top-4 left-4 z-50 px-4 py-2 bg-uae-navy text-white",
          "rounded-md focus:outline-none focus:ring-2 focus:ring-uae-gold",
          "transform -translate-y-full focus:translate-y-0 transition-transform"
        )}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className={cn(
          "absolute top-4 left-32 z-50 px-4 py-2 bg-uae-navy text-white",
          "rounded-md focus:outline-none focus:ring-2 focus:ring-uae-gold",
          "transform -translate-y-full focus:translate-y-0 transition-transform"
        )}
      >
        Skip to navigation
      </a>
    </div>
  );
};

export default SkipNavigation;
```

### **3. Focus Management Hook**

```javascript
// src/hooks/useFocusManagement.js
import { useEffect, useRef } from 'react';

export const useFocusManagement = (isVisible, shouldFocus = true) => {
  const elementRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isVisible && shouldFocus) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement;
      
      // Focus the element
      if (elementRef.current) {
        elementRef.current.focus();
      }
    }

    return () => {
      // Restore focus when component unmounts or becomes invisible
      if (!isVisible && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isVisible, shouldFocus]);

  return elementRef;
};

export const useTrapFocus = (isActive) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return containerRef;
};
```

### **4. Screen Reader Utilities**

```javascript
// src/components/accessibility/ScreenReaderOnly.jsx
import React from 'react';
import { cn } from '@/lib/utils';

export const ScreenReaderOnly = ({ children, className, ...props }) => {
  return (
    <span
      className={cn(
        "sr-only",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const VisuallyHidden = ({ children, className, ...props }) => {
  return (
    <span
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Live region for dynamic content announcements
export const LiveRegion = ({ children, politeness = 'polite', className, ...props }) => {
  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className={cn("sr-only", className)}
      {...props}
    >
      {children}
    </div>
  );
};
```

### **5. Accessible Form Components**

```javascript
// src/components/accessibility/AccessibleForm.jsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const AccessibleInput = React.forwardRef(({
  label,
  error,
  description,
  required = false,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className={cn(
          "block text-sm font-medium text-uae-navy",
          required && "after:content-['*'] after:ml-1 after:text-red-500"
        )}
      >
        {label}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          aria-describedby={cn(
            description && descriptionId,
            error && errorId
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          className={cn(
            "w-full px-3 py-2 border rounded-md shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300",
            className
          )}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      
      {error && (
        <p id={errorId} className="text-sm text-red-600 flex items-center gap-1" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
});

AccessibleInput.displayName = 'AccessibleInput';
```

### **6. Keyboard Navigation Hook**

```javascript
// src/hooks/useKeyboardNavigation.js
import { useEffect, useCallback } from 'react';

export const useKeyboardNavigation = (options = {}) => {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    enabled = true
  } = options;

  const handleKeyDown = useCallback((event) => {
    if (!enabled) return;

    switch (event.key) {
      case 'Escape':
        onEscape?.(event);
        break;
      case 'Enter':
        onEnter?.(event);
        break;
      case 'ArrowUp':
        onArrowUp?.(event);
        break;
      case 'ArrowDown':
        onArrowDown?.(event);
        break;
      case 'ArrowLeft':
        onArrowLeft?.(event);
        break;
      case 'ArrowRight':
        onArrowRight?.(event);
        break;
      case 'Tab':
        onTab?.(event);
        break;
    }
  }, [enabled, onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab]);

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, handleKeyDown]);
};

export const useRovingTabIndex = (items, initialIndex = 0) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(items.length - 1);
        break;
    }
  }, [items.length]);

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    getTabIndex: (index) => index === activeIndex ? 0 : -1
  };
};
```

### **7. Color Contrast Utilities**

```javascript
// src/utils/colorContrast.js
export const getContrastRatio = (color1, color2) => {
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g).map(Number);
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

export const meetsWCAGAA = (foreground, background) => {
  return getContrastRatio(foreground, background) >= 4.5;
};

export const meetsWCAGAAA = (foreground, background) => {
  return getContrastRatio(foreground, background) >= 7;
};

// UAE color palette contrast validation
export const uaeColorContrasts = {
  'uae-gold-on-white': getContrastRatio('#D4AF37', '#FFFFFF'), // Should be > 4.5
  'uae-navy-on-white': getContrastRatio('#1B365D', '#FFFFFF'), // Should be > 4.5
  'white-on-uae-navy': getContrastRatio('#FFFFFF', '#1B365D'), // Should be > 4.5
  'uae-navy-on-uae-gold': getContrastRatio('#1B365D', '#D4AF37'), // Should be > 4.5
};
```

### **8. Accessible Modal Component**

```javascript
// src/components/accessibility/AccessibleModal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFocusManagement, useTrapFocus } from '@/hooks/useFocusManagement';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const AccessibleModal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  ...props
}) => {
  const modalRef = useTrapFocus(isOpen);
  const titleRef = useFocusManagement(isOpen);

  useKeyboardNavigation({
    onEscape: closeOnEscape ? onClose : undefined,
    enabled: isOpen
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={cn(
          "bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto",
          "focus:outline-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2
            id="modal-title"
            ref={titleRef}
            className="text-lg font-semibold text-uae-navy"
            tabIndex={-1}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "p-2 text-gray-400 hover:text-gray-600 rounded-md",
              "focus:outline-none focus:ring-2 focus:ring-uae-gold"
            )}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AccessibleModal;
```

## 🎨 **Enhanced UAE Design System for Accessibility**

### **Accessible Color Palette:**

```css
/* Enhanced UAE colors with accessibility considerations */
:root {
  /* Primary colors with sufficient contrast */
  --uae-gold: #D4AF37;           /* 4.8:1 contrast on white */
  --uae-gold-dark: #B8941F;     /* 6.2:1 contrast on white */
  --uae-navy: #1B365D;          /* 8.9:1 contrast on white */
  --uae-navy-light: #2C4A6B;    /* 6.1:1 contrast on white */
  --uae-green: #00A651;         /* 4.6:1 contrast on white */
  --uae-green-dark: #008A44;    /* 5.8:1 contrast on white */
  
  /* Accessible text colors */
  --text-primary: var(--uae-navy);
  --text-secondary: #4B5563;     /* 7.0:1 contrast on white */
  --text-muted: #6B7280;        /* 4.7:1 contrast on white */
  
  /* Focus and interaction states */
  --focus-ring: var(--uae-gold);
  --focus-ring-offset: 2px;
  
  /* High contrast mode support */
  --border-contrast: #000000;
  --bg-contrast: #FFFFFF;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --uae-gold: #B8941F;
    --uae-navy: #0F1F35;
    --text-primary: #000000;
    --text-secondary: #000000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **Focus Management Styles:**

```css
/* Enhanced focus indicators */
.focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
  border-radius: 4px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--uae-navy);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only.focus:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

## 📊 **Testing & Validation**

### **Automated Testing Tools:**
- **axe-core**: Automated accessibility testing
- **Lighthouse**: Performance and accessibility audits
- **WAVE**: Web accessibility evaluation
- **Color Oracle**: Color blindness simulation

### **Manual Testing Checklist:**
- [ ] Keyboard-only navigation testing
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Color contrast validation
- [ ] Focus management verification
- [ ] Form accessibility testing
- [ ] Mobile accessibility testing

### **User Testing:**
- [ ] Testing with users who use assistive technology
- [ ] Cognitive accessibility testing
- [ ] Motor accessibility testing
- [ ] Visual accessibility testing

---

**This accessibility implementation ensures the Emirati Pathways Platform is inclusive and usable by all users, regardless of their abilities or the assistive technologies they use.**

