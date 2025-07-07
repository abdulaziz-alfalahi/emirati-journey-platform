
import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { AnimationsShowcase } from '@/components/ui/AnimationsShowcase';
import { useMobileDetection } from '@/hooks/use-mobile-detection';

const AnimationsDemo: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = <AnimationsShowcase />;

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default AnimationsDemo;
