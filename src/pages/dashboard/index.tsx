
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Layout from '@/components/layout/Layout';
import { User } from 'lucide-react';
import {
  AdminDashboard,
  StudentDashboard,
  EducationalInstitutionDashboard,
  ParentDashboard,
  RecruiterDashboard,
  DefaultDashboard
} from '@/components/dashboard/role-dashboards';

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

  // Role-specific dashboard content based on user role
  const getRoleDashboard = () => {
    if (roles.includes('administrator') || roles.includes('super_user')) {
      return <AdminDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('school_student')) {
      return <StudentDashboard activeTab={activeTab} />;
    }

    if (roles.includes('educational_institution')) {
      return <EducationalInstitutionDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('parent')) {
      return <ParentDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('private_sector_recruiter')) {
      return <RecruiterDashboard activeTab={activeTab} />;
    }
    
    // Default dashboard for other roles
    return <DefaultDashboard userRole={roles[0]} activeTab={activeTab} />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {user?.user_metadata?.full_name || 'User'}</p>
        
        {roles.length === 0 ? (
          <Alert className="mb-8">
            <User className="h-4 w-4" />
            <AlertTitle>No role assigned</AlertTitle>
            <AlertDescription>
              Your account doesn't have any roles assigned. Please contact an administrator.
            </AlertDescription>
          </Alert>
        ) : (
          getRoleDashboard()
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
