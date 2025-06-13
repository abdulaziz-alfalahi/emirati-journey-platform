/**
 * Design System Tokens
 * Comprehensive design tokens for the unified Dubai Government design system
 */

// ============= Color Tokens =============
export const colorTokens = {
  // Primary EHRDC Palette (Government Standard)
  primary: {
    teal: '#006E6D',
    darkTeal: '#005A59',
    lightTeal: '#4A9B9A',
    neutralDark: '#1A1A1A',
    neutralLight: '#F5F5F5',
    white: '#FFFFFF',
    gold: '#C3992A'
  },

  // Secondary Dubai Design System
  secondary: {
    blue: '#0079C1',
    darkBlue: '#005A92',
    lightBlue: '#4DA6D9',
    indigo: '#6366F1',
    purple: '#8B5CF6'
  },

  // Semantic Colors
  semantic: {
    success: '#00A651',
    warning: '#F57C00',
    error: '#D32F2F',
    info: '#0079C1'
  },

  // Neutral Palette
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },

  // Background Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #006E6D 0%, #4A9B9A 100%)',
    secondary: 'linear-gradient(135deg, #0079C1 0%, #6366F1 100%)',
    subtle: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
    accent: 'linear-gradient(135deg, #C3992A 0%, #F57C00 100%)'
  }
} as const;

// ============= Typography Tokens =============
export const typographyTokens = {
  fontFamily: {
    primary: ['Inter', 'system-ui', 'sans-serif'],
    display: ['SF Pro Display', 'Inter', 'sans-serif'],
    mono: ['SF Mono', 'Monaco', 'monospace']
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem'     // 72px
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75'
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em'
  }
} as const;

// ============= Spacing Tokens =============
export const spacingTokens = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem'     // 128px
} as const;

// ============= Border Radius Tokens =============
export const borderRadiusTokens = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.25rem',    // 4px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
} as const;

// ============= Shadow Tokens =============
export const shadowTokens = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  // Dubai-specific shadows
  dubai: '0 2px 8px rgba(0, 121, 193, 0.1)',
  dubaiStrong: '0 8px 24px rgba(0, 121, 193, 0.15)',
  ehrdc: '0 4px 20px rgba(0, 110, 109, 0.1)',
  ehrdcStrong: '0 8px 40px rgba(0, 110, 109, 0.15)'
} as const;

// ============= Animation Tokens =============
export const animationTokens = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },

  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },

  keyframes: {
    fadeIn: 'fade-in 0.3s ease-out',
    fadeOut: 'fade-out 0.3s ease-out',
    slideUp: 'slide-up 0.3s ease-out',
    slideDown: 'slide-down 0.3s ease-out',
    scaleIn: 'scale-in 0.2s ease-out',
    scaleOut: 'scale-out 0.2s ease-out'
  }
} as const;

// ============= Breakpoint Tokens =============
export const breakpointTokens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// ============= Component Tokens =============
export const componentTokens = {
  button: {
    height: {
      sm: '2rem',       // 32px
      md: '2.5rem',     // 40px
      lg: '3rem'        // 48px
    },
    padding: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem'
    },
    borderRadius: borderRadiusTokens.lg
  },

  input: {
    height: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem'
    },
    padding: '0.75rem 1rem',
    borderRadius: borderRadiusTokens.lg
  },

  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem'
    },
    borderRadius: borderRadiusTokens.xl,
    shadow: shadowTokens.md
  }
} as const;

// ============= Layout Tokens =============
export const layoutTokens = {
  container: {
    maxWidth: '1280px',
    padding: '1rem'
  },

  section: {
    padding: {
      sm: '2rem 0',
      md: '4rem 0',
      lg: '6rem 0'
    }
  },

  grid: {
    gap: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem'
    }
  }
} as const;

// ============= Design Pattern Definitions =============
export const designPatterns = {
  group1: {
    name: 'EHRDC Government Standard',
    description: 'Primary pattern for government services and official content',
    gradient: 'bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal',
    textColor: 'text-ehrdc-neutral-dark',
    accentColor: 'ehrdc-teal',
    useCases: ['Government services', 'Official documentation', 'Administrative interfaces']
  },

  group2: {
    name: 'Dubai Innovation',
    description: 'Secondary pattern for modern, tech-forward initiatives',
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-700',
    textColor: 'text-white',
    accentColor: 'blue-600',
    useCases: ['Innovation programs', 'Technology initiatives', 'Future-focused content']
  }
} as const;

// Export all tokens as a single object for easier consumption
export const designTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  borderRadius: borderRadiusTokens,
  shadows: shadowTokens,
  animations: animationTokens,
  breakpoints: breakpointTokens,
  components: componentTokens,
  layout: layoutTokens,
  patterns: designPatterns
} as const;

export default designTokens;