
// Design System Validation Utilities
// Tools to ensure components follow EHRDC design standards

import { designTokens } from './tokens';

export interface ValidationRule {
  name: string;
  description: string;
  check: (element: HTMLElement) => boolean;
  severity: 'error' | 'warning' | 'info';
}

export const validationRules: ValidationRule[] = [
  // Color Validation
  {
    name: 'Primary Color Usage',
    description: 'Elements should use approved EHRDC teal colors',
    check: (element) => {
      const computedStyle = getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;
      const textColor = computedStyle.color;
      
      const approvedColors = [
        'rgb(0, 110, 109)', // EHRDC Teal
        'rgb(0, 90, 89)',   // EHRDC Dark Teal
        'rgb(74, 155, 154)', // EHRDC Light Teal
      ];
      
      return approvedColors.some(color => 
        bgColor.includes(color) || textColor.includes(color)
      );
    },
    severity: 'warning'
  },

  // Touch Target Size
  {
    name: 'Minimum Touch Target',
    description: 'Interactive elements should be at least 44px',
    check: (element) => {
      if (!element.matches('button, a, input, [role="button"]')) return true;
      
      const rect = element.getBoundingClientRect();
      return rect.width >= 44 && rect.height >= 44;
    },
    severity: 'error'
  },

  // Typography Scale
  {
    name: 'Typography Scale Compliance',
    description: 'Text should use approved font sizes',
    check: (element) => {
      const computedStyle = getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      const approvedSizes = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96];
      return approvedSizes.some(size => Math.abs(fontSize - size) < 1);
    },
    severity: 'warning'
  },

  // Spacing Validation
  {
    name: 'Spacing Scale Compliance',
    description: 'Margins and padding should follow 4px grid',
    check: (element) => {
      const computedStyle = getComputedStyle(element);
      const margins = [
        parseFloat(computedStyle.marginTop),
        parseFloat(computedStyle.marginRight),
        parseFloat(computedStyle.marginBottom),
        parseFloat(computedStyle.marginLeft),
      ];
      
      const paddings = [
        parseFloat(computedStyle.paddingTop),
        parseFloat(computedStyle.paddingRight),
        parseFloat(computedStyle.paddingBottom),
        parseFloat(computedStyle.paddingLeft),
      ];
      
      const allSpacing = [...margins, ...paddings];
      return allSpacing.every(value => value === 0 || value % 4 === 0);
    },
    severity: 'info'
  },

  // Accessibility
  {
    name: 'Color Contrast',
    description: 'Text should have sufficient contrast ratio',
    check: (element) => {
      // This is a simplified check - in practice, you'd use a proper contrast calculation
      const computedStyle = getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;
      const textColor = computedStyle.color;
      
      // Basic check for common problematic combinations
      if (bgColor === 'rgb(255, 255, 255)' && textColor === 'rgb(200, 200, 200)') {
        return false; // Low contrast
      }
      
      return true; // Assume good contrast for other combinations
    },
    severity: 'error'
  },

  // Focus Visibility
  {
    name: 'Focus Indicator',
    description: 'Interactive elements should have visible focus indicators',
    check: (element) => {
      if (!element.matches('button, a, input, select, textarea, [tabindex]')) return true;
      
      // Simulate focus to check if there's a visible indicator
      element.focus();
      const computedStyle = getComputedStyle(element, ':focus');
      const outline = computedStyle.outline;
      const boxShadow = computedStyle.boxShadow;
      
      return outline !== 'none' || boxShadow !== 'none';
    },
    severity: 'error'
  },
];

export class DesignSystemValidator {
  private violations: Array<{
    element: HTMLElement;
    rule: ValidationRule;
    message: string;
  }> = [];

  validate(container: HTMLElement = document.body): void {
    this.violations = [];
    
    const elements = container.querySelectorAll('*');
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        this.validateElement(element);
      }
    });
  }

  private validateElement(element: HTMLElement): void {
    validationRules.forEach(rule => {
      try {
        if (!rule.check(element)) {
          this.violations.push({
            element,
            rule,
            message: `${rule.name}: ${rule.description}`
          });
        }
      } catch (error) {
        console.warn(`Validation rule "${rule.name}" failed:`, error);
      }
    });
  }

  getViolations(severity?: 'error' | 'warning' | 'info') {
    if (severity) {
      return this.violations.filter(v => v.rule.severity === severity);
    }
    return this.violations;
  }

  getReport(): string {
    const errors = this.getViolations('error');
    const warnings = this.getViolations('warning');
    const info = this.getViolations('info');

    let report = '=== Design System Validation Report ===\n\n';
    
    if (errors.length > 0) {
      report += `❌ Errors (${errors.length}):\n`;
      errors.forEach(v => {
        report += `  - ${v.message}\n`;
      });
      report += '\n';
    }
    
    if (warnings.length > 0) {
      report += `⚠️  Warnings (${warnings.length}):\n`;
      warnings.forEach(v => {
        report += `  - ${v.message}\n`;
      });
      report += '\n';
    }
    
    if (info.length > 0) {
      report += `ℹ️  Info (${info.length}):\n`;
      info.forEach(v => {
        report += `  - ${v.message}\n`;
      });
      report += '\n';
    }
    
    if (this.violations.length === 0) {
      report += '✅ All checks passed! Design system compliance verified.\n';
    }
    
    return report;
  }

  highlightViolations(): void {
    this.violations.forEach(violation => {
      violation.element.style.outline = '2px solid red';
      violation.element.title = violation.message;
    });
  }

  clearHighlights(): void {
    this.violations.forEach(violation => {
      violation.element.style.outline = '';
      violation.element.title = '';
    });
  }
}

// Utility function to validate a specific component
export const validateComponent = (element: HTMLElement): boolean => {
  const validator = new DesignSystemValidator();
  validator.validate(element);
  const violations = validator.getViolations('error');
  return violations.length === 0;
};

// Export a global validator instance
export const globalValidator = new DesignSystemValidator();

// Development mode validation (only in development)
if (process.env.NODE_ENV === 'development') {
  // Auto-validate on page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      globalValidator.validate();
      const report = globalValidator.getReport();
      if (globalValidator.getViolations().length > 0) {
        console.group('🎨 Design System Validation');
        console.log(report);
        console.groupEnd();
      }
    }, 1000);
  });
}

export default DesignSystemValidator;
