
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogIn } from 'lucide-react';

const DubaiGovHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Government Logos */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://tec.gov.ae/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
                alt="Government of Dubai"
                className="h-10"
              />
            </a>
            
            <div className="w-px h-10 bg-gray-200"></div>
            
            <Link 
              to="/home" 
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
                alt="Emirati Human Resources Development Council"
                className="h-10"
              />
            </Link>
          </div>

          {/* Right: Authentication */}
          <div className="flex items-center space-x-3">
            {!user ? (
              <>
                <Link to="/auth?tab=sign-in">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?tab=sign-up">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Join Now
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DubaiGovHeader;
