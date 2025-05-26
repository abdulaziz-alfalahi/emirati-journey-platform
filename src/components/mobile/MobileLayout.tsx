
import React from 'react';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import MobileBottomNav from './MobileBottomNav';
import Layout from '@/components/layout/Layout';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const { isMobile, isCapacitor } = useMobileDetection();

  if (!isMobile && !isCapacitor) {
    return <Layout>{children}</Layout>;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <main className="flex-1">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default MobileLayout;
