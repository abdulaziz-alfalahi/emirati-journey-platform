
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardLoading from '@/components/dashboard/DashboardLoading';
import DashboardContainer from '@/components/dashboard/DashboardContainer';

const DashboardPage = () => {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [forceUpdate, setForceUpdate] = useState(0);
  
  useEffect(() => {
    if (user || roles.length > 0) {
      setForceUpdate(prev => prev + 1);
    }
  }, [user, roles]);
  
  useEffect(() => {
    // If no user, redirect to login
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Add more detailed logging
  console.log("Dashboard Page - Current user:", user);
  console.log("Dashboard Page - Current roles:", roles);
  console.log("Dashboard Page - Force update counter:", forceUpdate);

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <Layout>
      <DashboardContainer user={user} roles={roles} activeTab={activeTab} />
    </Layout>
  );
};

export default DashboardPage;
