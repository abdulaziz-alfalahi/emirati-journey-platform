
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

export const DubaiGovHeader: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();

  return (
    <div className="bg-ehrdc-neutral-dark text-white py-2 px-4 text-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Government branding */}
        <div className="flex items-center space-x-4">
          <span className="text-xs">{t('header.governmentOfDubai')}</span>
          <div className="h-4 w-px bg-white/20"></div>
          <a 
            href="tel:+97180060000" 
            className="flex items-center space-x-1 hover:text-ehrdc-light-teal transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span className="text-xs">800 60000</span>
          </a>
        </div>

        {/* Center - Additional info */}
        <div className="hidden md:flex items-center space-x-6 text-xs">
          <span>{t('header.emiratiHRDevelopment')}</span>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          <AccessibilityToolbar />
          <ThemeToggle />
          
          {/* Contact and Dashboard links */}
          <div className="hidden md:flex items-center space-x-3 text-xs">
            <Link 
              to="/contact" 
              className="hover:text-ehrdc-light-teal transition-colors"
            >
              {t('nav.contact')}
            </Link>
            
            {user && (
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-1 hover:text-ehrdc-light-teal transition-colors"
              >
                <span>{t('nav.dashboard')}</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DubaiGovHeader;
