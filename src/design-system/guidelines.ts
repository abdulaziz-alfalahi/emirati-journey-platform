/**
 * Design System Guidelines
 * Comprehensive usage guidelines for the unified Dubai Government design system
 */

import { designTokens } from './tokens';

// ============= Color Usage Guidelines =============
export const colorGuidelines = {
  primary: {
    description: 'Primary EHRDC colors should be used for government services, official content, and primary actions',
    usage: {
      backgrounds: 'Use ehrdc-teal for primary backgrounds, ehrdc-light-teal for subtle backgrounds',
      text: 'Use ehrdc-neutral-dark for primary text, ehrdc-teal for accent text',
      actions: 'Use ehrdc-teal for primary buttons and interactive elements'
    },
    examples: [
      'Government service cards',
      'Primary navigation',
      'Call-to-action buttons',
      'Official badges and indicators'
    ]
  },

  secondary: {
    description: 'Secondary colors for modern, innovation-focused content and tech initiatives',
    usage: {
      backgrounds: 'Use blue-600 to indigo-700 gradients for modern interfaces',
      text: 'Use white text on dark backgrounds, blue-700 on light backgrounds',
      actions: 'Use blue-600 for secondary actions and modern interfaces'
    },
    examples: [
      'Innovation programs',
      'Technology showcases',
      'Future-focused content',
      'Educational technology'
    ]
  },

  semantic: {
    description: 'Use semantic colors consistently across all components',
    usage: {
      success: 'Green for successful actions, confirmations, and positive states',
      warning: 'Orange for warnings, cautions, and attention-required states',
      error: 'Red for errors, destructive actions, and critical states',
      info: 'Blue for informational messages and neutral states'
    }
  }
} as const;

// ============= Typography Guidelines =============
export const typographyGuidelines = {
  hierarchy: {
    display: {
      usage: 'Hero sections, landing page headlines',
      sizes: ['text-6xl', 'text-7xl'],
      weight: 'font-bold',
      spacing: 'tracking-tight'
    },
    h1: {
      usage: 'Page titles, section headers',
      sizes: ['text-3xl', 'text-4xl', 'text-5xl'],
      weight: 'font-bold',
      spacing: 'tracking-tight'
    },
    h2: {
      usage: 'Subsection headers, card titles',
      sizes: ['text-2xl', 'text-3xl', 'text-4xl'],
      weight: 'font-semibold',
      spacing: 'tracking-tight'
    },
    h3: {
      usage: 'Component headers, small section titles',
      sizes: ['text-xl', 'text-2xl', 'text-3xl'],
      weight: 'font-semibold',
      spacing: 'tracking-tight'
    },
    body: {
      usage: 'Paragraph text, descriptions',
      sizes: ['text-base', 'text-lg'],
      weight: 'font-normal',
      spacing: 'leading-relaxed'
    },
    caption: {
      usage: 'Metadata, labels, supplementary text',
      sizes: ['text-sm', 'text-base'],
      weight: 'font-normal',
      color: 'text-muted-foreground'
    }
  },

  rules: [
    'Always maintain proper heading hierarchy (h1 > h2 > h3)',
    'Use consistent font weights across similar elements',
    'Maintain adequate line height for readability',
    'Use appropriate text contrast ratios (4.5:1 minimum)',
    'Limit line length to 60-80 characters for optimal readability'
  ]
} as const;

// ============= Spacing Guidelines =============
export const spacingGuidelines = {
  principles: [
    'Use consistent spacing scale based on 4px/8px grid system',
    'Maintain visual rhythm through consistent spacing',
    'Increase spacing proportionally for larger components',
    'Use adequate white space to improve readability'
  ],

  components: {
    buttons: {
      padding: 'Use component tokens for consistent button sizing',
      margin: 'Minimum 8px between buttons in groups'
    },
    cards: {
      padding: 'Internal padding should be proportional to card size',
      margin: 'Maintain consistent gaps in card grids'
    },
    sections: {
      padding: 'Use section spacing tokens for consistent layout',
      margin: 'Separate major sections with adequate spacing'
    }
  }
} as const;

// ============= Component Guidelines =============
export const componentGuidelines = {
  buttons: {
    variants: {
      primary: {
        usage: 'Main actions, form submissions, primary CTAs',
        style: 'ehrdc-primary colors with medium font weight',
        states: 'Hover, focus, disabled, and loading states required'
      },
      secondary: {
        usage: 'Secondary actions, cancel buttons, alternative options',
        style: 'Outline or subtle background with primary text color',
        states: 'All interactive states must be defined'
      },
      destructive: {
        usage: 'Delete, remove, dangerous actions',
        style: 'Error color background with white text',
        states: 'Require confirmation for destructive actions'
      }
    },
    accessibility: [
      'Minimum 44px touch target size',
      'Clear focus indicators',
      'Descriptive aria-labels',
      'Keyboard navigation support'
    ]
  },

  cards: {
    structure: {
      header: 'Optional header with title and actions',
      content: 'Main content area with appropriate padding',
      footer: 'Optional footer for actions or metadata'
    },
    variants: {
      default: 'Standard card with subtle shadow and border',
      elevated: 'Enhanced shadow for important content',
      interactive: 'Hover effects for clickable cards'
    }
  },

  forms: {
    layout: [
      'Group related fields together',
      'Use clear labels and helpful descriptions',
      'Provide immediate validation feedback',
      'Maintain consistent field spacing'
    ],
    validation: [
      'Show validation state clearly',
      'Use semantic colors for different states',
      'Provide helpful error messages',
      'Support both inline and summary validation'
    ]
  }
} as const;

// ============= Layout Guidelines =============
export const layoutGuidelines = {
  grids: {
    responsive: [
      'Use mobile-first approach',
      'Implement consistent breakpoints',
      'Ensure touch-friendly sizing on mobile',
      'Optimize for common screen sizes'
    ],
    spacing: [
      'Maintain consistent gaps between grid items',
      'Use responsive spacing that scales appropriately',
      'Ensure adequate margins on mobile devices'
    ]
  },

  containers: {
    maxWidth: 'Use standard container widths for consistency',
    padding: 'Maintain adequate padding on all screen sizes',
    centering: 'Center content containers for optimal readability'
  },

  sections: {
    structure: [
      'Clear visual separation between sections',
      'Consistent section padding and margins',
      'Logical content hierarchy within sections'
    ]
  }
} as const;

// ============= Design Pattern Selection Guidelines =============
export const patternSelectionGuidelines = {
  group1_ehrdc: {
    when: [
      'Government service interfaces',
      'Official documentation and forms',
      'Administrative dashboards',
      'Public-facing government content',
      'Policy and regulation pages'
    ],
    characteristics: [
      'Formal and trustworthy appearance',
      'High contrast and accessibility',
      'Traditional government branding',
      'Professional and authoritative tone'
    ]
  },

  group2_innovation: {
    when: [
      'Innovation and technology programs',
      'Future-focused initiatives',
      'Educational technology platforms',
      'Digital transformation content',
      'Modern service interfaces'
    ],
    characteristics: [
      'Modern and progressive appearance',
      'Vibrant and engaging colors',
      'Tech-forward branding',
      'Dynamic and inspiring tone'
    ]
  },

  hybridApproach: {
    when: [
      'Complex applications with multiple user types',
      'Platforms serving both traditional and modern needs',
      'Transitional interfaces between old and new systems'
    ],
    implementation: [
      'Use Group 1 for primary navigation and core functions',
      'Apply Group 2 for feature highlights and modern sections',
      'Maintain consistent component structure across patterns',
      'Ensure smooth visual transitions between patterns'
    ]
  }
} as const;

// ============= Accessibility Guidelines =============
export const accessibilityGuidelines = {
  colorContrast: [
    'Maintain minimum 4.5:1 contrast ratio for normal text',
    'Use 3:1 minimum for large text and UI components',
    'Provide high contrast mode support',
    'Never rely solely on color to convey information'
  ],

  keyboard: [
    'All interactive elements must be keyboard accessible',
    'Provide clear focus indicators',
    'Implement logical tab order',
    'Support standard keyboard shortcuts'
  ],

  screenReaders: [
    'Use semantic HTML elements',
    'Provide descriptive alt text for images',
    'Include proper ARIA labels and descriptions',
    'Ensure content is properly structured'
  ],

  motor: [
    'Minimum 44px touch targets on mobile',
    'Adequate spacing between interactive elements',
    'Support for various input methods',
    'Avoid time-sensitive interactions'
  ]
} as const;

// ============= Best Practices =============
export const bestPractices = {
  consistency: [
    'Use design tokens instead of hard-coded values',
    'Follow established patterns and conventions',
    'Maintain consistent spacing and sizing',
    'Apply semantic color usage consistently'
  ],

  performance: [
    'Optimize component rendering',
    'Use appropriate image formats and sizes',
    'Minimize animation complexity',
    'Implement lazy loading where appropriate'
  ],

  maintenance: [
    'Document component usage and variations',
    'Create reusable component patterns',
    'Version control design system changes',
    'Regular accessibility audits'
  ],

  testing: [
    'Test across different browsers and devices',
    'Validate accessibility compliance',
    'User testing for usability',
    'Performance testing on various connections'
  ]
} as const;

// Export comprehensive guidelines
export const designGuidelines = {
  colors: colorGuidelines,
  typography: typographyGuidelines,
  spacing: spacingGuidelines,
  components: componentGuidelines,
  layout: layoutGuidelines,
  patterns: patternSelectionGuidelines,
  accessibility: accessibilityGuidelines,
  bestPractices
} as const;

export default designGuidelines;