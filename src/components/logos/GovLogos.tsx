
import React from 'react';

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
  // Set size based on prop
  const logoSize = {
    small: 'h-8 md:h-10',
    medium: 'h-10 md:h-12',
    large: 'h-12 md:h-16',
  };

  return (
    <div className={`flex ${variant === 'horizontal' ? 'flex-row space-x-6 justify-between w-full' : 'flex-col space-y-4'} items-center ${className}`}>
      {/* Dubai Government Logo - Left */}
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
          alt="Government of Dubai"
          className={`${logoSize[size]} object-contain`}
        />
      </div>

      {/* Emirati HR Development Council Logo - Right */}
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/856b95de-60c1-4994-a684-4ad2ff7c37e1.png"
          alt="Emirati Human Resources Development Council"
          className={`${logoSize[size]} object-contain`}
        />
      </div>
    </div>
  );
};

export default GovLogos;
