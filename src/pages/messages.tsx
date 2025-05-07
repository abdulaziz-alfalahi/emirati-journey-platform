
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import MessagingCenter from '@/components/messaging/MessagingCenter';

const MessagesPage = () => {
  const { user, isLoading } = useAuth();
  
  // Check if the user is authenticated
  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <MessagingCenter />
      </div>
    </Layout>
  );
};

export default MessagesPage;
