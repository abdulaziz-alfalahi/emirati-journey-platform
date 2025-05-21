
import React from 'react';
import Navbar from './Navbar';
import GovLogos from '../logos/GovLogos';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-white border-b border-gov-lightGray">
        <div className="container mx-auto px-4 py-3">
          <GovLogos size="small" />
        </div>
      </div>
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="py-8 px-6 bg-gov-teal text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              {/* Removed GovLogos from here */}
              <p className="text-white/70 mt-1">Supporting UAE citizens from education to retirement</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h4 className="font-medium mb-2">Platform</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors">Services</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Legal</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Emirati Gateway. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
