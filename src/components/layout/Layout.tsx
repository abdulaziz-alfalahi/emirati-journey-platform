
import React from 'react';
import DubaiGovHeader from './DubaiGovHeader';
import DubaiGovStickyBar from './DubaiGovStickyBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DubaiGovHeader />
      
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      
      <DubaiGovStickyBar />
    </div>
  );
};

export default Layout;
