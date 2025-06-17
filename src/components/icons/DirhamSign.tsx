
import React from 'react';
import { LucideProps } from 'lucide-react';

export const DirhamSign: React.FC<LucideProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2,
  className,
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Capital D shape */}
      <path d="M6 4 L6 20 L14 20 C18.4183 20 22 16.4183 22 12 C22 7.58172 18.4183 4 14 4 L6 4 Z" />
      {/* First horizontal line - extends beyond the D */}
      <line x1="2" y1="9" x2="18" y2="9" />
      {/* Second horizontal line - extends beyond the D */}
      <line x1="2" y1="15" x2="18" y2="15" />
    </svg>
  );
};
