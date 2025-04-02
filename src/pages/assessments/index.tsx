
import React from 'react';
import Layout from '@/components/layout/Layout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { useAuth } from '@/context/AuthContext';

// Create a client
const queryClient = new QueryClient();

const AssessmentsPage = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-4 py-8">
          {user && <div className="mb-8"><UserAssessments /></div>}
          <AssessmentsList />
        </div>
      </QueryClientProvider>
    </Layout>
  );
};

export default AssessmentsPage;
