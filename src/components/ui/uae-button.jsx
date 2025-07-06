import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const UAEButton = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default",
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "btn-uae-primary",
    secondary: "btn-uae-secondary", 
    success: "btn-uae-success",
    outline: "border-2 border-[var(--color-uae-gold)] text-[var(--color-uae-gold)] hover:bg-[var(--color-uae-gold)] hover:text-[var(--color-uae-navy)] bg-transparent",
    ghost: "text-[var(--color-uae-gold)] hover:bg-[var(--color-uae-gold)]/10 bg-transparent",
    link: "text-[var(--color-uae-gold)] underline-offset-4 hover:underline bg-transparent p-0 h-auto"
  };

  return (
    <Button
      className={cn(
        "transition-smooth hover-lift focus-ring",
        variants[variant],
        className
      )}
      size={size}
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});

UAEButton.displayName = "UAEButton";

export { UAEButton };

