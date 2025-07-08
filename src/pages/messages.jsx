
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { EnhancedMessagingCenter } from '@/components/messaging/EnhancedMessagingCenter';

const MessagesPage = () => {
  const { user, isLoading } = useAuth();
  
  // Check if the user is authenticated
  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Communications Hub</h1>
          <p className="text-gray-600">
            Connect with educational institutions, employers, and professional organizations across all phases
          </p>
        </div>
        <EnhancedMessagingCenter />
      </div>
    </Layout>
  );
};

export default MessagesPage;
