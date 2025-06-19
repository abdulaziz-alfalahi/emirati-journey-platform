
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

  return (
    <div 
      className={`flex ${variant === 'horizontal' ? 'flex-row justify-between w-full' : 'flex-col space-y-4'} items-center ${className}`}
      dir="ltr"
      style={{ direction: 'ltr' }}
    >
      {/* Dubai Government Logo - Always Left (using CSS order to force position) */}
      <a 
        href="https://tec.gov.ae/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center"
        style={{ order: 1 }}
      >
        <img 
          src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
          alt="Government of Dubai"
          className={`${logoSize[size]}`}
          style={{ height: logoSize[size].split(' ')[0].replace('h-', '') + 'rem' }}
        />
      </a>

      {/* Spacer for horizontal layout */}
      {variant === 'horizontal' && <div className="flex-1" style={{ order: 2 }} />}

      {/* Emirati Human Resources Development Council Logo - Always Right (using CSS order to force position) */}
      <Link 
        to="/" 
        className="flex items-center"
        style={{ order: 3 }}
      >
        <img 
          src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
          alt="Emirati Human Resources Development Council"
          className={`${logoSize[size]}`}
          style={{ height: logoSize[size].split(' ')[0].replace('h-', '') + 'rem' }}
        />
      </Link>
    </div>
  );
};

export default GovLogos;
