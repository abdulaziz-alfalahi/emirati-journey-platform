
import React from 'react';
import Navbar from './Navbar';
import GovLogos from '../logos/GovLogos';
import { MessageSquare, Zap, ThumbsUp } from 'lucide-react';
import DubaiGovFooterIcons from './DubaiGovFooterIcons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header with Government Logos */}
      <div className="bg-white border-b border-dubai-gray-200 shadow-sm">
        <div className="dubai-container py-4">
          <div className="flex justify-between items-center">
            {/* Dubai Government Logo - Left */}
            <a href="https://tec.gov.ae/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img 
                src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
                alt="Government of Dubai"
                className="h-12 md:h-16"
              />
            </a>

            {/* EHRDC Logo - Right */}
            <a href="/" className="flex items-center">
              <img 
                src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
                alt="Emirati Human Resources Development Council"
                className="h-12 md:h-16"
              />
            </a>
          </div>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <Navbar />
      
      <main className="flex-1">{children}</main>
      <footer className="py-8 px-6 bg-dubai-blue text-white">
        <div className="dubai-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-white/70 mt-1 dubai-text-body">Supporting UAE citizens from education to retirement</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h4 className="font-medium mb-2 dubai-text-body">Platform</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors dubai-text-body-small">About</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors dubai-text-body-small">Services</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors dubai-text-body-small">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 dubai-text-body">Legal</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors dubai-text-body-small">Privacy</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors dubai-text-body-small">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Dubai Government Standard Footer Icons */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* DubaiAI Icon */}
                <a href="#" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
                  <Zap className="h-6 w-6" />
                  <span className="font-medium dubai-text-body-small">DubaiAI</span>
                </a>
                
                {/* 04 Suggestions/Complaints */}
                <a href="#" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
                  <MessageSquare className="h-6 w-6" />
                  <span className="font-medium dubai-text-body-small">Suggestions & Complaints</span>
                </a>
                
                {/* Happiness Meter */}
                <a href="#" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
                  <ThumbsUp className="h-6 w-6" />
                  <span className="font-medium dubai-text-body-small">Happiness Meter</span>
                </a>
              </div>
              
              <div className="text-center text-white/50 dubai-text-body-small">
                © {new Date().getFullYear()} Emirati Gateway. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Add the floating Dubai Government footer icons */}
      <DubaiGovFooterIcons />
    </div>
  );
};

export default Layout;
