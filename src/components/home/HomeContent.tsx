
import React from 'react';
import ServiceCards from '@/components/home/ServiceCards';

const HomeContent: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <ServiceCards />
      {/* JourneyStages component has been removed */}
    </div>
  );
};

export default HomeContent;
