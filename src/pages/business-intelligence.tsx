
import React from 'react';
import Layout from '@/components/layout/Layout';
import { BusinessIntelligenceDashboard } from '@/components/analytics/BusinessIntelligenceDashboard';

const BusinessIntelligencePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <BusinessIntelligenceDashboard />
      </div>
    </Layout>
  );
};

export default BusinessIntelligencePage;
