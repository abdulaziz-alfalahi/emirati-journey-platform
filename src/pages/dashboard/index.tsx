
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
  
  useEffect(() => {
    // If no user, redirect to login
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  console.log("Dashboard Page - Current user:", user);
  console.log("Dashboard Page - Current roles:", roles);

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
