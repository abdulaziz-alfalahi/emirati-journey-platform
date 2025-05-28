
import React from 'react';
import Layout from '@/components/layout/Layout';
import GroupsGrid from '@/components/communities/GroupsGrid';

const CommunitiesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <GroupsGrid />
      </div>
    </Layout>
  );
};

export default CommunitiesPage;
