
import React from 'react';
import MobileLayout from '@/components/mobile/MobileLayout';
import MobileOfflineDashboard from '@/components/mobile/MobileOfflineDashboard';

const MobileOfflinePage: React.FC = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <h1 className="text-xl font-bold text-gray-900">
            Offline Mode
          </h1>
          <p className="text-sm text-gray-600">
            Access your saved data without internet
          </p>
        </div>
        <MobileOfflineDashboard />
      </div>
    </MobileLayout>
  );
};

export default MobileOfflinePage;
