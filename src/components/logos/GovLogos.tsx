
import React from 'react';
import { Link } from 'react-router-dom';

interface GovLogosProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const GovLogos: React.FC<GovLogosProps> = ({ 
  variant = 'horizontal', 
  size = 'medium',
  className = ''
}) => {
  // Set consistent fixed heights based on size prop
  const logoSize = {
    small: 'h-6 md:h-8',
    medium: 'h-8 md:h-10',
    large: 'h-10 md:h-14',
  };

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col space-y-4 items-center ${className}`}>
        {/* Dubai Government Logo */}
        <a 
          href="https://tec.gov.ae/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center"
        >
          <img 
            src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
            alt="Government of Dubai"
            className={`${logoSize[size]}`}
          />
        </a>

        {/* Emirati Human Resources Development Council Logo */}
        <Link 
          to="/" 
          className="flex items-center"
        >
          <img 
            src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
            alt="Emirati Human Resources Development Council"
            className={`${logoSize[size]}`}
          />
        </Link>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full flex items-center ${className}`}
      style={{ direction: 'ltr' }}
    >
      {/* Dubai Government Logo - Fixed to Left */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <a 
          href="https://tec.gov.ae/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center"
        >
          <img 
            src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
            alt="Government of Dubai"
            className={`${logoSize[size]}`}
          />
        </a>
      </div>

      {/* Emirati Human Resources Development Council Logo - Fixed to Right */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <Link 
          to="/" 
          className="flex items-center"
        >
          <img 
            src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
            alt="Emirati Human Resources Development Council"
            className={`${logoSize[size]}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default GovLogos;
