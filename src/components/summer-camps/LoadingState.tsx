
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(index => (
        <div key={index} className="bg-white border rounded-lg shadow-sm animate-pulse">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 h-48 bg-gray-200"></div>
            <div className="p-4 md:p-6 md:w-3/4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
