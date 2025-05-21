
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
    large: 'h-10 md:h-14'
  };

  return (
    <div className={`flex ${variant === 'horizontal' ? 'flex-row space-x-6 md:space-x-10 justify-between w-full' : 'flex-col space-y-4'} items-center ${className}`}>
      {/* Dubai Government Logo - Left */}
      <a href="https://tec.gov.ae/" target="_blank" rel="noopener noreferrer" className="flex items-center">
        <img 
          src="/lovable-uploads/856b95de-60c1-4994-a684-4ad2ff7c37e1.png" 
          alt="Dubai Government" 
          className={`${logoSize[size]}`} 
        />
      </a>

      {/* Emirati Human Resources Development Council Logo - Right */}
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/2e2851a5-be5e-4411-9f32-7ca28fd8b1b2.png" 
          alt="EHRDC" 
          className={`${logoSize[size]}`} 
        />
      </Link>
    </div>
  );
};

export default GovLogos;
