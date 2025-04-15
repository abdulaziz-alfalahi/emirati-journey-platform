
import React from 'react';
import TrainingOpportunities from '@/components/home/TrainingOpportunities';
import PersonaSelector from '@/components/home/PersonaSelector';

const HomeGridSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TrainingOpportunities limit={3} />
        </div>
        <div className="lg:col-span-1">
          <PersonaSelector />
        </div>
      </div>
    </div>
  );
};

export default HomeGridSection;
