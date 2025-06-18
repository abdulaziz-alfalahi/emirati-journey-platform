
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const DubaiGovHeader: React.FC = () => {
  // Safe auth usage with error handling
  let user = null;
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.warn('Auth context not available in DubaiGovHeader');
  }

  return (
    <header className="bg-white border-b border-gray-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/8e8dde72-de3d-4664-b8d9-541c109edc51.png"
              alt="Government of Dubai"
              className="h-8"
            />
            <div className="text-sm text-gray-600">
              Government of Dubai
            </div>
          </div>
          
          {user && (
            <div className="text-sm text-gray-600">
              Welcome, {user.email}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DubaiGovHeader;
