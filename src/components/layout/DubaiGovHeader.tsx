
import React from 'react';

const DubaiGovHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-2 px-4 lg:px-6">
      <div className="dubai-container flex items-center justify-between">
        {/* Left: Government of Dubai logo */}
        <div className="flex items-center">
          <a 
            href="https://tec.gov.ae/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img 
              src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
              alt="Government of Dubai"
              className="h-8"
            />
          </a>
        </div>

        {/* Right side content removed - language toggle now in navigation menus */}
        <div className="flex items-center">
          {/* Empty space - language toggle moved to navigation menus */}
        </div>
      </div>
    </div>
  );
};

export default DubaiGovHeader;
