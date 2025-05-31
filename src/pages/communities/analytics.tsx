
import React from 'react';
import Layout from '@/components/layout/Layout';
import CommunityAnalyticsDashboard from '@/components/communities/analytics/CommunityAnalyticsDashboard';

const CommunityAnalyticsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <CommunityAnalyticsDashboard />
      </div>
    </Layout>
  );
};

export default CommunityAnalyticsPage;
