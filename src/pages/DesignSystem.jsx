
import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { DesignSystemShowcase } from '@/components/design-system/DesignSystemShowcase';
import { useMobileDetection } from '@/hooks/use-mobile-detection';

const DesignSystem: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = <DesignSystemShowcase />;

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default DesignSystem;
