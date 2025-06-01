
// EHRDC Design System Tokens
// Based on Dubai Government guidelines and EHRDC brand standards

export const designTokens = {
  // Color Palette
  colors: {
    // Primary Colors (EHRDC Brand)
    primary: {
      teal: '#006E6D',
      darkTeal: '#005A59', 
      lightTeal: '#4A9B9A',
      white: '#FFFFFF',
    },
    
    // Neutral Colors
    neutral: {
      dark: '#1A1A1A',
      medium: '#666666',
      light: '#F5F5F5',
      white: '#FFFFFF',
    },
    
    // Semantic Colors
    semantic: {
      success: '#16A34A',
      error: '#EF4444',
      warning: '#F97316',
      info: '#3B82F6',
    },
    
    // Government Colors (Dubai Standards)
    government: {
      blue: '#0079C1',
      gold: '#C3992A',
      red: '#D32F2F',
      green: '#00A651',
    }
  },

  // Typography Scale
  typography: {
    fontFamily: {
      primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      display: ['SF Pro Display', 'Inter', 'sans-serif'],
      government: ['Dubai', 'Arial', 'sans-serif'],
    },
    
    fontSize: {
      // Mobile-first approach
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '28px'],
      xl: ['20px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['30px', '36px'],
      '4xl': ['36px', '40px'],
      '5xl': ['48px', '48px'],
      '6xl': ['60px', '60px'],
      '7xl': ['72px', '72px'],
      '8xl': ['96px', '96px'],
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    lineHeight: {
      tight: '1.1',
      snug: '1.2',
      normal: '1.4',
      relaxed: '1.6',
      loose: '1.8',
    },
  },

  // Spacing Scale (4px base)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    56: '224px',
    64: '256px',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    default: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 2px 4px rgba(0, 110, 109, 0.05)',
    default: '0 4px 8px rgba(0, 110, 109, 0.1)',
    md: '0 6px 16px rgba(0, 110, 109, 0.1)',
    lg: '0 8px 24px rgba(0, 110, 109, 0.15)',
    xl: '0 12px 32px rgba(0, 110, 109, 0.2)',
    inner: 'inset 0 2px 4px rgba(0, 110, 109, 0.05)',
  },

  // Breakpoints (Mobile-first)
  breakpoints: {
    sm: '480px',   // Large mobile
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Large desktop
    '2xl': '1536px', // Extra large desktop
  },

  // Animation Durations
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    
    easing: {
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    overlay: 20,
    modal: 30,
    tooltip: 40,
    toast: 50,
  },

  // Component Specific Tokens
  components: {
    button: {
      height: {
        sm: '40px',
        default: '48px',
        lg: '56px',
        xl: '64px',
      },
      
      padding: {
        sm: '12px 16px',
        default: '16px 24px',
        lg: '20px 32px',
        xl: '24px 40px',
      },
    },
    
    input: {
      height: {
        default: '48px',
        lg: '56px',
      },
      
      padding: '16px',
      borderWidth: '2px',
    },
    
    card: {
      padding: {
        sm: '16px',
        default: '24px',
        lg: '32px',
      },
      
      borderWidth: '1px',
    },
  },

  // Accessibility
  accessibility: {
    minTouchTarget: '44px',
    focusRingWidth: '2px',
    focusRingOffset: '2px',
  },
};

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};
  
  // Colors
  Object.entries(designTokens.colors.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });
  
  Object.entries(designTokens.colors.neutral).forEach(([key, value]) => {
    cssVars[`--color-neutral-${key}`] = value;
  });
  
  Object.entries(designTokens.colors.semantic).forEach(([key, value]) => {
    cssVars[`--color-semantic-${key}`] = value;
  });
  
  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  // Typography
  Object.entries(designTokens.typography.fontSize).forEach(([key, value]) => {
    const [fontSize, lineHeight] = Array.isArray(value) ? value : [value, value];
    cssVars[`--font-size-${key}`] = fontSize;
    cssVars[`--line-height-${key}`] = lineHeight;
  });
  
  return cssVars;
};

export default designTokens;
