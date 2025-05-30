
import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};
