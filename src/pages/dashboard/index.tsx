
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
  DefaultDashboard,
  GovRepDashboard,
  EntrepreneurDashboard,
  RetireeDashboard,
  MentorDashboard,
  TrainingCenterDashboard
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

  // Add more detailed logging
  console.log("Dashboard Page - Current roles:", roles);

  // Force re-render if roles change
  useEffect(() => {
    console.log("Roles changed, re-rendering dashboard:", roles);
  }, [roles]);

  // Role-specific dashboard content based on user role
  const getRoleDashboard = () => {
    // For testing, if email contains "student", use StudentDashboard regardless of roles
    if (user?.email?.includes('student')) {
      console.log("Email-based rendering: StudentDashboard");
      return <StudentDashboard activeTab={activeTab} />;
    }

    if (roles.includes('administrator') || roles.includes('super_user')) {
      console.log("Rendering AdminDashboard");
      return <AdminDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('school_student')) {
      console.log("Rendering StudentDashboard");
      return <StudentDashboard activeTab={activeTab} />;
    }

    if (roles.includes('educational_institution')) {
      console.log("Rendering EducationalInstitutionDashboard");
      return <EducationalInstitutionDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('parent')) {
      console.log("Rendering ParentDashboard");
      return <ParentDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('private_sector_recruiter')) {
      console.log("Rendering RecruiterDashboard");
      return <RecruiterDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('government_representative')) {
      console.log("Rendering GovRepDashboard");
      return <GovRepDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('entrepreneur')) {
      console.log("Rendering EntrepreneurDashboard");
      return <EntrepreneurDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('retiree') || roles.includes('retiree_advocate')) {
      console.log("Rendering RetireeDashboard");
      return <RetireeDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('mentor') || roles.includes('career_advisor')) {
      console.log("Rendering MentorDashboard");
      return <MentorDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('training_center') || roles.includes('assessment_center')) {
      console.log("Rendering TrainingCenterDashboard");
      return <TrainingCenterDashboard activeTab={activeTab} />;
    }
    
    // Default dashboard for other roles
    console.log("Rendering DefaultDashboard with first role:", roles[0] || "no-role");
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
