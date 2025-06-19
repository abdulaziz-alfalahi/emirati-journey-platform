
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

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
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Set consistent fixed heights based on size prop
  const logoSize = {
    small: 'h-6 md:h-8',
    medium: 'h-8 md:h-10',
    large: 'h-10 md:h-14',
  };

  // Positioning styles with fallback for older browsers
  const dubaiGovStyle = {
    ...(CSS.supports('inset-inline-start', '0%') 
      ? { insetInlineStart: '0%' }
      : { [isRTL ? 'right' : 'left']: '0%' }
    ),
    transform: 'translateY(-50%)',
    position: 'absolute' as const
  };

  const ehrdcStyle = {
    ...(CSS.supports('inset-inline-end', '0%')
      ? { insetInlineEnd: '0%' }
      : { [isRTL ? 'left' : 'right']: '0%' }
    ),
    transform: 'translateY(-50%)',
    position: 'absolute' as const
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
    <div className={`relative w-full ${className}`}>
      {/* Dubai Government Logo - Always at logical start (left in LTR, right in RTL) */}
      <div 
        className="absolute top-1/2 -translate-y-1/2"
        style={dubaiGovStyle}
      >
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

      {/* Emirati Human Resources Development Council Logo - Always at logical end (right in LTR, left in RTL) */}
      <div 
        className="absolute top-1/2 -translate-y-1/2"
        style={ehrdcStyle}
      >
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
