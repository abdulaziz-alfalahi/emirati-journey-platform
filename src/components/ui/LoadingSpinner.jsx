
import React from 'react';

const LoadingSpinner = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex items-center justify-center min-h-[inherit]">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-emirati-teal ${sizeClasses[size]} ${className}`}></div>
    </div>
  );
};

export default LoadingSpinner;
