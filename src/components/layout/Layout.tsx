
import React from 'react';
import DubaiGovHeader from './DubaiGovHeader';
import Navbar from './Navbar';
import { MessageSquare, Zap, ThumbsUp, Phone, Mail, MapPin } from 'lucide-react';
import DubaiGovFooterIcons from './DubaiGovFooterIcons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Dubai Government Standard Header */}
      <DubaiGovHeader />
      
      {/* Enhanced Navigation Bar */}
      <nav id="navigation" className="bg-white border-b border-ehrdc-neutral-light">
        <Navbar />
      </nav>
      
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
      
      {/* Enhanced Footer with EHRDC Branding */}
      <footer className="py-12 px-6 bg-ehrdc-teal text-white" role="contentinfo">
        <div className="dubai-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* EHRDC Information */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-ehrdc-teal font-bold text-lg">EG</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Emirati Gateway</h3>
                  <p className="text-ehrdc-light-teal text-sm">EHRDC Digital Platform</p>
                </div>
              </div>
              <p className="text-ehrdc-light-teal mb-4 leading-relaxed">
                Supporting UAE citizens throughout their journey from education to retirement, 
                fostering career development, skills enhancement, and professional growth.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-ehrdc-light-teal hover:text-white transition-colors">About EHRDC</a></li>
                <li><a href="/career-journey" className="text-ehrdc-light-teal hover:text-white transition-colors">Career Journey</a></li>
                <li><a href="/training" className="text-ehrdc-light-teal hover:text-white transition-colors">Training Programs</a></li>
                <li><a href="/scholarships" className="text-ehrdc-light-teal hover:text-white transition-colors">Scholarships</a></li>
                <li><a href="/success-stories" className="text-ehrdc-light-teal hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Support & Legal</h4>
              <ul className="space-y-2">
                <li><a href="/help" className="text-ehrdc-light-teal hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/privacy" className="text-ehrdc-light-teal hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-ehrdc-light-teal hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/accessibility" className="text-ehrdc-light-teal hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          {/* Dubai Government Standard Footer */}
          <div className="border-t border-ehrdc-light-teal pt-8">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* DubaiAI */}
                <a href="#" className="flex items-center space-x-2 text-ehrdc-light-teal hover:text-white transition-colors">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">DubaiAI</span>
                </a>
                
                {/* Suggestions & Complaints */}
                <a href="#" className="flex items-center space-x-2 text-ehrdc-light-teal hover:text-white transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">Suggestions & Complaints</span>
                </a>
                
                {/* Happiness Meter */}
                <a href="#" className="flex items-center space-x-2 text-ehrdc-light-teal hover:text-white transition-colors">
                  <ThumbsUp className="h-5 w-5" />
                  <span className="font-medium">Happiness Meter</span>
                </a>
              </div>
              
              <div className="text-center text-ehrdc-light-teal text-sm">
                © {new Date().getFullYear()} Emirati Human Resources Development Council. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Dubai Government footer icons */}
      <DubaiGovFooterIcons />
    </div>
  );
};

export default Layout;
