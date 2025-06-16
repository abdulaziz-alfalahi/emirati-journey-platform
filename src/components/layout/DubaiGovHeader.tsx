
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail, User } from 'lucide-react';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';

const DubaiGovHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm">
          {/* Left side - Government branding */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Government of Dubai</span>
          </div>

          {/* Right side - Contact info and utilities */}
          <div className="flex items-center space-x-4">
            <AccessibilityToolbar />
            
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <a 
              href="mailto:contact@dubai.gov.ae" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </a>

            <a 
              href="tel:+97180099999" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>800 99999</span>
            </a>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo section */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
                  alt="Government of Dubai"
                  className="h-12"
                />
                <div className="w-px h-12 bg-gray-300"></div>
                <img
                  src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
                  alt="Emirati Human Resources Development Council"
                  className="h-12"
                />
              </Link>
            </div>

            {/* Navigation or other header content can go here */}
            <div className="flex items-center space-x-4">
              {/* Additional header elements can be added here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DubaiGovHeader;
