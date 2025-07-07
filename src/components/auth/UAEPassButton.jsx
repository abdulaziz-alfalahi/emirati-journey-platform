import React, { useState } from 'react';
import { Shield, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const UAEPassButton = ({ 
  onSuccess, 
  onError, 
  className,
  size = 'lg',
  variant = 'primary',
  disabled = false,
  children
}) => {
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();

  // Handle UAE Pass authentication
  const handleUAEPassLogin = async () => {
    setLoading(true);
    
    try {
      // Placeholder for UAE Pass integration
      // In production, this would redirect to UAE Pass authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate UAE Pass response
      const mockUserData = {
        emiratesId: '784-1990-1234567-1',
        fullName: 'Ahmed Mohammed Al Mansouri',
        email: 'ahmed.almansouri@example.ae',
        phone: '+971501234567',
        nationality: 'UAE',
        verified: true,
        uaePassId: 'uaepass_123456789'
      };

      if (onSuccess) {
        onSuccess(mockUserData);
      }
    } catch (error) {
      const errorMessage = 'UAE Pass authentication failed. Please try again or use email login.';
      handleError(error, errorMessage);
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Variant styles
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#1B365D] to-[#2A4A7A] hover:from-[#0F2847] hover:to-[#1B365D] text-white border-transparent',
    secondary: 'bg-white border-2 border-[#1B365D] text-[#1B365D] hover:bg-[#1B365D] hover:text-white',
    outline: 'bg-transparent border-2 border-[#1B365D] text-[#1B365D] hover:bg-[#1B365D] hover:text-white'
  };

  return (
    <button
      type="button"
      onClick={handleUAEPassLogin}
      disabled={disabled || loading}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center font-semibold rounded-lg',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-4 focus:ring-[#B8860B] focus:ring-opacity-50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'shadow-lg hover:shadow-xl',
        
        // Size
        sizeClasses[size],
        
        // Variant
        variantClasses[variant],
        
        // Loading state
        loading && 'cursor-wait',
        
        className
      )}
      aria-label="Sign in with UAE Pass"
      aria-describedby="uae-pass-description"
    >
      {/* UAE Flag Icon */}
      <div className="mr-3 flex items-center">
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <div className="relative">
            {/* UAE Flag representation */}
            <div className="w-8 h-6 rounded-sm overflow-hidden border border-gray-300 shadow-sm">
              <div className="h-2 bg-red-600"></div>
              <div className="h-2 bg-white"></div>
              <div className="h-2 bg-black"></div>
              <div className="absolute left-0 top-0 w-2 h-6 bg-green-600"></div>
            </div>
            {/* Security shield overlay */}
            <div className="absolute -top-1 -right-1 bg-[#B8860B] rounded-full p-0.5">
              <Shield className="h-3 w-3 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Button text */}
      <span className="flex-1 text-center">
        {children || (loading ? 'Connecting to UAE Pass...' : 'Sign in with UAE Pass')}
      </span>

      {/* External link icon */}
      {!loading && (
        <ExternalLink className="ml-3 h-5 w-5 opacity-75" />
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg flex items-center justify-center">
          <div className="flex items-center space-x-2 text-white">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Authenticating...</span>
          </div>
        </div>
      )}
    </button>
  );
};

// UAE Pass Info Component
export const UAEPassInfo = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-blue-800 mb-1">
            What is UAE Pass?
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            UAE Pass is the official digital identity for all UAE residents and citizens. 
            It provides secure access to government services across the UAE.
          </p>
          <div className="text-xs text-blue-600">
            <p className="mb-1">✓ Secure government authentication</p>
            <p className="mb-1">✓ No need to remember passwords</p>
            <p className="mb-1">✓ Verified identity and credentials</p>
            <p>✓ Access to all government services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// UAE Pass Status Component
export const UAEPassStatus = ({ user, onDisconnect }) => {
  if (!user) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-green-800">
              Connected to UAE Pass
            </p>
            <p className="text-sm text-green-700">
              {user.fullName} • {user.emiratesId}
            </p>
          </div>
        </div>
        {onDisconnect && (
          <button
            onClick={onDisconnect}
            className="text-sm text-green-700 hover:text-green-900 font-medium"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default UAEPassButton;

