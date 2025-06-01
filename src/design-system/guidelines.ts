
// EHRDC Design System Guidelines
// Implementation guidelines for consistent component usage

export const componentGuidelines = {
  buttons: {
    usage: {
      primary: 'Use for the main action on a page. Only one primary button per section.',
      secondary: 'Use for secondary actions that support the primary action.',
      outline: 'Use for alternative actions or when button needs less visual weight.',
      ghost: 'Use for subtle actions or in toolbars and navigation.',
      destructive: 'Use for delete, remove, or other destructive actions.',
    },
    
    sizing: {
      sm: 'Use in compact spaces like table cells or secondary areas.',
      default: 'Standard size for most use cases.',
      lg: 'Use for prominent actions or call-to-action buttons.',
      xl: 'Use for hero sections or very prominent actions.',
    },
    
    accessibility: [
      'Always provide descriptive text or aria-label',
      'Ensure minimum 44px touch target on mobile',
      'Use loading state to provide feedback during processing',
      'Disable button and show loading spinner for async actions',
    ],
  },

  forms: {
    layout: {
      spacing: 'Use 24px (space-6) between form fields',
      grouping: 'Group related fields with additional spacing (32px)',
      labels: 'Always place labels above input fields',
      helpText: 'Use description prop for additional context',
    },
    
    validation: {
      realTime: 'Validate on blur for better UX',
      errorMessages: 'Be specific and actionable in error messages',
      successStates: 'Show success confirmation for important actions',
      required: 'Mark required fields with red asterisk',
    },
    
    accessibility: [
      'Associate labels with form controls using htmlFor',
      'Use aria-describedby for error and help text',
      'Provide clear error messages with aria-invalid',
      'Ensure proper focus management and keyboard navigation',
    ],
  },

  cards: {
    content: {
      hierarchy: 'Use consistent heading levels within cards',
      density: 'Balance content density - avoid overcrowding',
      actions: 'Place primary actions in footer or prominently in content',
      imagery: 'Use consistent aspect ratios for card images',
    },
    
    interaction: {
      clickable: 'Make entire card clickable for navigation cards',
      hover: 'Use subtle hover effects to indicate interactivity',
      focus: 'Ensure keyboard focus is visible and logical',
    },
    
    variants: {
      default: 'For general content organization',
      service: 'For presenting government services',
      information: 'For displaying important data or metrics',
      profile: 'For user or entity profiles',
    },
  },

  typography: {
    hierarchy: {
      h1: 'Page titles - one per page',
      h2: 'Section headings',
      h3: 'Subsection headings',
      h4: 'Component headings',
      h5: 'Small component headings',
      h6: 'Labels and captions',
    },
    
    content: {
      bodyLarge: 'Important introductory text',
      body: 'Standard body text',
      caption: 'Secondary information, metadata',
    },
    
    rules: [
      'Use semantic heading levels (don\'t skip levels)',
      'Limit line length to 60-70 characters for readability',
      'Use adequate white space around text blocks',
      'Ensure sufficient color contrast (4.5:1 minimum)',
    ],
  },

  colors: {
    primary: {
      usage: 'Use EHRDC teal for primary actions, links, and brand elements',
      contrast: 'Ensure white text on teal backgrounds meets contrast requirements',
      variations: 'Use dark teal for hover states, light teal for accents',
    },
    
    semantic: {
      success: 'Green for positive actions, confirmations, success states',
      error: 'Red for errors, warnings, destructive actions',
      warning: 'Orange for cautions, important notices',
      info: 'Blue for informational content, neutral states',
    },
    
    neutral: {
      text: 'Use neutral dark for primary text content',
      background: 'Use neutral light for page backgrounds',
      borders: 'Use neutral light for subtle borders and dividers',
    },
  },

  spacing: {
    principles: [
      'Use 4px base unit for all spacing decisions',
      'Maintain consistent spacing between related elements',
      'Use more space to separate unrelated content sections',
      'Follow the spacing scale to ensure consistency',
    ],
    
    sections: {
      sm: 'For compact content areas (32-48px)',
      md: 'For standard content sections (48-64px)',
      lg: 'For major page sections (64-80px)',
      xl: 'For hero sections and major breaks (80px+)',
    },
    
    components: {
      internal: 'Use smaller spacing within components (4-16px)',
      between: 'Use medium spacing between components (16-24px)',
      sections: 'Use larger spacing between sections (32px+)',
    },
  },

  responsive: {
    approach: 'Mobile-first design with progressive enhancement',
    
    breakpoints: {
      mobile: '0-767px - Single column, larger touch targets',
      tablet: '768-1023px - Two columns, medium density',
      desktop: '1024px+ - Multi-column, higher density',
    },
    
    principles: [
      'Design for mobile first, enhance for larger screens',
      'Ensure minimum 44px touch targets on mobile',
      'Use appropriate font sizes for each breakpoint',
      'Test on actual devices, not just browser resize',
    ],
  },

  accessibility: {
    requirements: [
      'Meet WCAG 2.1 AA standards',
      'Ensure keyboard navigation works for all interactive elements',
      'Provide alternative text for images and icons',
      'Use semantic HTML elements',
      'Maintain focus management in dynamic content',
    ],
    
    testing: [
      'Test with screen readers (NVDA, JAWS, VoiceOver)',
      'Verify keyboard-only navigation',
      'Check color contrast ratios',
      'Test with users who have disabilities',
    ],
    
    implementation: [
      'Use aria-labels for icon buttons',
      'Implement skip navigation links',
      'Provide live regions for dynamic content updates',
      'Ensure error messages are announced to screen readers',
    ],
  },

  performance: {
    images: [
      'Use appropriate image formats (WebP when supported)',
      'Implement lazy loading for images',
      'Provide multiple image sizes for responsive images',
      'Optimize image file sizes',
    ],
    
    animations: [
      'Respect user motion preferences',
      'Use transform and opacity for smooth animations',
      'Limit animation duration to 300ms or less',
      'Provide reduced motion alternatives',
    ],
    
    code: [
      'Tree-shake unused code',
      'Use code splitting for large applications',
      'Optimize bundle sizes',
      'Implement proper caching strategies',
    ],
  },
};

export const usageExamples = {
  buttons: `
// Primary action
<Button variant="default">Submit Application</Button>

// Secondary action
<Button variant="secondary">Save Draft</Button>

// Destructive action
<Button variant="destructive">Delete Account</Button>

// With loading state
<Button loading={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
  `,
  
  forms: `
// Proper form field with validation
<FormField 
  label="Email Address" 
  description="Enter your work email"
  error={errors.email}
  required
>
  <Input 
    type="email" 
    placeholder="john.doe@company.ae"
    {...register('email', { required: 'Email is required' })}
  />
</FormField>
  `,
  
  cards: `
// Service card with proper structure
<DubaiCard variant="service" interactive>
  <DubaiCardHeader>
    <DubaiCardTitle>Career Development</DubaiCardTitle>
    <DubaiCardDescription>
      Enhance your skills and advance your career
    </DubaiCardDescription>
  </DubaiCardHeader>
  <DubaiCardContent>
    <p>Access training programs and mentorship opportunities.</p>
  </DubaiCardContent>
</DubaiCard>
  `,
  
  typography: `
// Proper heading hierarchy
<DubaiHeading 
  level={2}
  subtitle="Supporting text for the main heading"
  badge="Section Label"
>
  Main Section Title
</DubaiHeading>
  `,
};

export default componentGuidelines;
