import React from 'react';
import { cn } from '@/lib/utils';

const UAECard = React.forwardRef(({ 
  className, 
  variant = "default",
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "card-uae",
    featured: "card-uae-featured",
    glass: "glass",
    gradient: "gradient-uae-primary text-white"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

UAECard.displayName = "UAECard";

const UAECardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));

UAECardHeader.displayName = "UAECardHeader";

const UAECardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-uae-navy",
      className
    )}
    {...props}
  />
));

UAECardTitle.displayName = "UAECardTitle";

const UAECardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

UAECardDescription.displayName = "UAECardDescription";

const UAECardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));

UAECardContent.displayName = "UAECardContent";

const UAECardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));

UAECardFooter.displayName = "UAECardFooter";

export { 
  UAECard, 
  UAECardHeader, 
  UAECardFooter, 
  UAECardTitle, 
  UAECardDescription, 
  UAECardContent 
};

