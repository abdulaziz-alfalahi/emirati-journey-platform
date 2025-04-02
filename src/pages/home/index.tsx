
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { ServiceCards } from '@/components/home/ServiceCards';
import { PersonaSelector } from '@/components/home/PersonaSelector';
import { JourneyStages } from '@/components/home/JourneyStages';
import TrainingOpportunities from '@/components/home/TrainingOpportunities';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <div className="container mx-auto py-12 px-4 space-y-16">
        <ServiceCards />
        <JourneyStages />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrainingOpportunities limit={3} />
          </div>
          <div className="lg:col-span-1">
            <PersonaSelector />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
