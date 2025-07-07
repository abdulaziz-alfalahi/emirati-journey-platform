import React from 'react';
import { cn } from '@/lib/utils';

const DDSButton = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "medium",
  children,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props 
}, ref) => {
  
  // Dubai Design System color palette
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 hover:border-gray-400 focus:ring-gray-500",
    success: "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 focus:ring-green-500",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 hover:border-yellow-600 focus:ring-yellow-500",
    danger: "bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 focus:ring-red-500",
    outline: "bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent hover:border-gray-300 focus:ring-gray-500",
    link: "bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-700 border-transparent hover:border-transparent focus:ring-blue-500 underline-offset-4 hover:underline"
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base"
  };

  const baseClasses = cn(
    // Base styling
    "inline-flex items-center justify-center font-medium rounded-md border transition-all duration-200",
    // Focus styling
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    // Disabled styling
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    // Loading styling
    loading && "cursor-wait",
    // Full width
    fullWidth && "w-full",
    // Variant styling
    variants[variant],
    // Size styling
    sizes[size],
    className
  );

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          {children && <span className="ml-2">{children}</span>}
        </>
      );
    }

    if (icon && iconPosition === "left") {
      return (
        <>
          <span className="mr-2">{icon}</span>
          {children}
        </>
      );
    }

    if (icon && iconPosition === "right") {
      return (
        <>
          {children}
          <span className="ml-2">{icon}</span>
        </>
      );
    }

    return children;
  };

  return (
    <button
      ref={ref}
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

DDSButton.displayName = "DDSButton";

export { DDSButton };

