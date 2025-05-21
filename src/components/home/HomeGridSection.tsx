
import React from 'react';
import PersonaSelector from '@/components/home/PersonaSelector';

const HomeGridSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 gap-8">
        <div>
          <PersonaSelector />
        </div>
      </div>
    </div>
  );
};

export default HomeGridSection;
