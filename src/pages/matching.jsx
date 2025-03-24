import React from 'react';
import { MatchingDashboard } from '@/components/job-matching/MatchingDashboard';
import { Layout } from '@/components/layout';
import { useRouter } from 'next/router';

export default function MatchingPage() {
  const router = useRouter();
  const { tab } = router.query;
  
  return (
    <Layout>
      <MatchingDashboard initialTab={tab} />
    </Layout>
  );
}

