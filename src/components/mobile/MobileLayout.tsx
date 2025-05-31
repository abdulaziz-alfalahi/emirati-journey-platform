
import React from 'react';
import MobileBottomNav from './MobileBottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header with Government Logos */}
      <div className="bg-white border-b border-dubai-gray-200 shadow-sm">
        <div className="dubai-container py-3">
          <div className="flex justify-between items-center">
            {/* Dubai Government Logo - Left */}
            <a href="https://tec.gov.ae/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img 
                src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
                alt="Government of Dubai"
                className="h-10 md:h-12"
              />
            </a>

            {/* EHRDC Logo - Right */}
            <a href="/" className="flex items-center">
              <img 
                src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
                alt="Emirati Human Resources Development Council"
                className="h-10 md:h-12"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MobileLayout;
