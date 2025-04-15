
import React from 'react';
import ServiceCards from '@/components/home/ServiceCards';
import JourneyStages from '@/components/home/JourneyStages';

const HomeContent: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <ServiceCards />
      <JourneyStages />
    </div>
  );
};

export default HomeContent;
