
import React from 'react';
import Layout from '@/components/layout/Layout';
import CareerJourneyMap from '@/components/career/CareerJourneyMap';

const CareerJourneyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <CareerJourneyMap />
      </div>
    </Layout>
  );
};

export default CareerJourneyPage;
