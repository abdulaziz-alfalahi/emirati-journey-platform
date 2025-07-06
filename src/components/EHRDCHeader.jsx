import React, { useState } from 'react';
import { useEHRDC, useTranslation } from './EHRDCProvider';
import { EHRDCButton } from './EHRDCButton';
import ehrdcLogo from '../../assets/ehrdc-logo.png';

export const EHRDCHeader = ({ onMenuToggle }) => {
  const { preferences, user, toggleLanguage, toggleTheme } = useEHRDC();
  const { t } = useTranslation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'dashboard', icon: 'dashboard', href: '#dashboard' },
    { key: 'jobs', icon: 'work', href: '#jobs' },
    { key: 'profile', icon: 'person', href: '#profile' },
    { key: 'applications', icon: 'assignment', href: '#applications' },
    { key: 'ai-assistant', icon: 'smart_toy', href: '#ai-assistant' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--ehrdc-primary)]"
              aria-label={t('a11y.menu')}
            >
              <span className="material-icons">menu</span>
            </button>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img 
                src={ehrdcLogo} 
                alt="EHRDC Logo" 
                className="h-10 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {t('header.title')}
                </h1>
                <p className="text-xs text-gray-600">
                  {t('header.subtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[var(--ehrdc-primary)] hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="material-icons text-sm">{item.icon}</span>
                <span>{t(`nav.${item.key}`)}</span>
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Language Toggle */}
            <EHRDCButton
              variant="ghost"
              size="sm"
              icon="language"
              onClick={toggleLanguage}
              aria-label={t('a11y.toggle-language')}
              className="hidden sm:flex"
            >
              {preferences.language === 'en' ? 'العربية' : 'English'}
            </EHRDCButton>

            {/* Theme Toggle */}
            <EHRDCButton
              variant="ghost"
              size="icon"
              icon={preferences.theme === 'light' ? 'dark_mode' : 'light_mode'}
              onClick={toggleTheme}
              aria-label={t('a11y.toggle-theme')}
              className="hidden sm:flex"
            />

            {/* Notifications */}
            <div className="relative">
              <EHRDCButton
                variant="ghost"
                size="icon"
                icon="notifications"
                aria-label="Notifications"
              />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--ehrdc-primary)]"
              >
                <div className="h-8 w-8 bg-[var(--ehrdc-primary)] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <span className="material-icons text-sm">expand_more</span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name || 'User Name'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.role === 'job-seeker' ? 'Job Seeker' : 
                       user.role === 'employer' ? 'Employer' :
                       user.role === 'counselor' ? 'Career Counselor' : 'Government Official'}
                    </p>
                  </div>
                  
                  <a
                    href="#profile"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="material-icons text-sm">person</span>
                    <span>{t('nav.profile')}</span>
                  </a>
                  
                  <a
                    href="#settings"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="material-icons text-sm">settings</span>
                    <span>{t('nav.settings')}</span>
                  </a>

                  {/* Mobile Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="sm:hidden flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="material-icons text-sm">language</span>
                    <span>{preferences.language === 'en' ? 'العربية' : 'English'}</span>
                  </button>
                  
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      className="flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <span className="material-icons text-sm">logout</span>
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <nav className="px-4 py-2 space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[var(--ehrdc-primary)] hover:bg-white transition-colors duration-200"
            >
              <span className="material-icons text-sm">{item.icon}</span>
              <span>{t(`nav.${item.key}`)}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

// Skip to Content Link for Accessibility
export const SkipToContent = () => {
  const { t } = useTranslation();
  
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--ehrdc-primary)] text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white"
    >
      {t('a11y.skip-to-content')}
    </a>
  );
};

