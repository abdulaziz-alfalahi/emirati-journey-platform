import React from 'react';
import { cn } from '../../lib/utils';

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  showLogo = true,
  showLanguageToggle = true,
  className 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Dubai Government Header */}
        {showLogo && (
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#1B365D] to-[#B8860B] rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">د</span>
            </div>
            <h1 className="text-3xl font-bold text-[#1B365D] mb-2">
              Dubai Government
            </h1>
            <p className="text-sm text-gray-600">
              Emirati Pathways Platform
            </p>
          </div>
        )}

        {/* Language Toggle */}
        {showLanguageToggle && (
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button className="px-3 py-1 text-sm font-medium text-[#1B365D] bg-[#1B365D] text-white rounded-md transition-colors">
                English
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-[#1B365D] transition-colors">
                العربية
              </button>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className={cn(
          "bg-white rounded-xl shadow-lg border border-gray-200 p-8",
          className
        )}>
          {/* Title Section */}
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && (
                <h2 className="text-2xl font-bold text-[#1B365D] mb-2">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-gray-600 text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Form Content */}
          {children}
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mb-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Help</span>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 Dubai Government. All rights reserved.
          </p>
        </div>

        {/* Accessibility Skip Links */}
        <div className="sr-only">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <a href="#auth-form" className="skip-link">
            Skip to authentication form
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

