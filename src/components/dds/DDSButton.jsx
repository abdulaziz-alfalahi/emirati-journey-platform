import React from 'react';
import { cn } from '../../lib/utils';

const DDSButton = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  children, 
  ...props 
}, ref) => {
  
  // Dubai Government Design System Button Variants
  const variants = {
    primary: "bg-[#1B365D] hover:bg-[#0F1F35] text-white border-[#1B365D] hover:border-[#0F1F35]",
    secondary: "bg-[#B8860B] hover:bg-[#9A7209] text-white border-[#B8860B] hover:border-[#9A7209]",
    success: "bg-[#228B22] hover:bg-[#1A5F1A] text-white border-[#228B22] hover:border-[#1A5F1A]",
    warning: "bg-[#FFA500] hover:bg-[#E6940A] text-black border-[#FFA500] hover:border-[#E6940A]",
    danger: "bg-[#C41E3A] hover:bg-[#8B1538] text-white border-[#C41E3A] hover:border-[#8B1538]",
    outline: "bg-transparent hover:bg-[#1B365D] text-[#1B365D] hover:text-white border-[#1B365D]",
    ghost: "bg-transparent hover:bg-[#F8F9FA] text-[#1B365D] border-transparent hover:border-[#1B365D]",
    link: "bg-transparent hover:bg-transparent text-[#1B365D] hover:text-[#0F1F35] border-transparent underline-offset-4 hover:underline"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base",
    xl: "h-14 px-10 text-lg"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    default: "w-4 h-4", 
    lg: "w-5 h-5",
    xl: "w-6 h-6"
  };

  return (
    <button
      className={cn(
        // Base styles - Dubai Government standards
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "border border-solid",
        "font-semibold tracking-wide",
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Loading state
        loading && "opacity-70 cursor-not-allowed",
        
        // Custom className
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg 
          className={cn("animate-spin mr-2", iconSizes[size])} 
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
      )}
      
      {/* Left icon */}
      {icon && iconPosition === "left" && !loading && (
        <span className={cn("mr-2", iconSizes[size])}>
          {icon}
        </span>
      )}
      
      {/* Button text */}
      {children}
      
      {/* Right icon */}
      {icon && iconPosition === "right" && !loading && (
        <span className={cn("ml-2", iconSizes[size])}>
          {icon}
        </span>
      )}
    </button>
  );
});

DDSButton.displayName = "DDSButton";

export default DDSButton;

// Usage Examples:
/*
// Primary button (Dubai Blue)
<DDSButton variant="primary">
  Primary Action
</DDSButton>

// Secondary button (Dubai Gold)
<DDSButton variant="secondary">
  Secondary Action
</DDSButton>

// Success button (Dubai Green)
<DDSButton variant="success">
  Success Action
</DDSButton>

// Warning button (Dubai Orange)
<DDSButton variant="warning">
  Warning Action
</DDSButton>

// Danger button (Dubai Red)
<DDSButton variant="danger">
  Danger Action
</DDSButton>

// Outline button
<DDSButton variant="outline">
  Outline Action
</DDSButton>

// Ghost button
<DDSButton variant="ghost">
  Ghost Action
</DDSButton>

// Link button
<DDSButton variant="link">
  Link Action
</DDSButton>

// With loading state
<DDSButton loading>
  Loading...
</DDSButton>

// With icon
<DDSButton icon={<SomeIcon />} iconPosition="left">
  With Icon
</DDSButton>

// Different sizes
<DDSButton size="sm">Small</DDSButton>
<DDSButton size="default">Default</DDSButton>
<DDSButton size="lg">Large</DDSButton>
<DDSButton size="xl">Extra Large</DDSButton>
*/

