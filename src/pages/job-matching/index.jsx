
import React from 'react';
import Layout from '@/components/layout/Layout';

export default function JobMatchingPage() {
  // Redirect to the main job-matching page
  window.location.href = '/job-matching';
  
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
          <p>You are being redirected to the job matching page.</p>
        </div>
      </div>
    </Layout>
  );
}
