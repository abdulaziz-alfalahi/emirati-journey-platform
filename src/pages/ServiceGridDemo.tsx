
import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { ServiceGridShowcase } from '@/components/services/ServiceGridShowcase';
import { useMobileDetection } from '@/hooks/use-mobile-detection';

const ServiceGridDemo: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = (
    <div className="min-h-screen">
      <div className="bg-ehrdc-teal text-white py-16">
        <div className="dubai-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dubai Government Service Grid
          </h1>
          <p className="text-xl text-ehrdc-light-teal max-w-3xl mx-auto">
            Discover the comprehensive range of government services designed to support 
            UAE nationals throughout their professional journey.
          </p>
        </div>
      </div>
      
      <ServiceGridShowcase />
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default ServiceGridDemo;
