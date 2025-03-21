
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
        
        // Variants
        variant === 'primary' && "premium-button",
        variant === 'secondary' && "bg-white text-emirati-navy hover:shadow-md border border-gray-100",
        variant === 'outline' && "bg-transparent hover:bg-gray-100 text-emirati-navy border border-gray-300",
        variant === 'ghost' && "bg-transparent hover:bg-gray-100 text-emirati-navy",
        
        // Sizes
        size === 'sm' && "text-sm py-2 px-4",
        size === 'md' && "py-3 px-6",
        size === 'lg' && "text-lg py-4 px-8",
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
