
import React from 'react';
import Layout from '@/components/layout/Layout';
import { ThoughtLeadershipContent } from '@/components/thought-leadership/ThoughtLeadershipContent';

const ThoughtLeadershipPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ehrdc-neutral-dark mb-4">
            Thought Leadership
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore insights, research, and perspectives from industry leaders and experts in the UAE.
          </p>
        </div>
        <ThoughtLeadershipContent />
      </div>
    </Layout>
  );
};

export default ThoughtLeadershipPage;
