
import React from 'react';
import { AccessibilityProvider } from './AccessibilityProvider';
import { AccessibilityPanel } from './AccessibilityPanel';
import './accessibility.css';

interface AccessibilityEnhancedLayoutProps {
  children: React.ReactNode;
}

export const AccessibilityEnhancedLayout: React.FC<AccessibilityEnhancedLayoutProps> = ({ children }) => {
  return (
    <AccessibilityProvider>
      <div className="accessibility-enhanced">
        {children}
        <AccessibilityPanel />
      </div>
    </AccessibilityProvider>
  );
};
