
import React from 'react';
import Layout from '@/components/layout/Layout';
import AdvisoryDashboard from './AdvisoryDashboard';

const AdvisoryPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Career Advisory</h1>
        <AdvisoryDashboard />
      </div>
    </Layout>
  );
};

export default AdvisoryPage;
