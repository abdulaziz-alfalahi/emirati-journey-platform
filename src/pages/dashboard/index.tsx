
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

  // Role-specific dashboard content based on user role
  const getRoleDashboard = () => {
    // For testing, if email contains specific keywords, use appropriate dashboard regardless of roles
    if (user?.email) {
      if (user.email.includes('student')) {
        console.log("Email-based rendering: StudentDashboard");
        return <StudentDashboard activeTab={activeTab} />;
      }
      
      if (user.email.includes('admin')) {
        console.log("Email-based rendering: AdminDashboard");
        return <AdminDashboard activeTab={activeTab} />;
      }
      
      if (user.email.includes('school') || user.email.includes('edu')) {
        console.log("Email-based rendering: EducationalInstitutionDashboard");
        return <EducationalInstitutionDashboard activeTab={activeTab} />;
      }
      
      if (user.email.includes('parent')) {
        console.log("Email-based rendering: ParentDashboard");
        return <ParentDashboard activeTab={activeTab} />;
      }
      
      if (user.email.includes('recruit')) {
        console.log("Email-based rendering: RecruiterDashboard");
        return <RecruiterDashboard activeTab={activeTab} />;
      }
      
      if (user.email.includes('training-center')) {
        console.log("Email-based rendering: TrainingCenterDashboard");
        return <TrainingCenterDashboard activeTab={activeTab} />;
      }
    }

    // Check based on actual roles
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
      console.log("Rendering TrainingCenterDashboard based on role");
      return <TrainingCenterDashboard activeTab={activeTab} />;
    }
    
    // Default dashboard if no role matches
    console.log("Rendering DefaultDashboard with first role:", roles[0] || "no-role");
    if (roles.length > 0) {
      return <DefaultDashboard userRole={roles[0]} activeTab={activeTab} />;
    } else {
      // If no roles but we have a user, default to student for testing
      return <StudentDashboard activeTab={activeTab} />;
    }
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
          <>
            <Alert className="mb-4">
              <User className="h-4 w-4" />
              <AlertTitle>No role assigned</AlertTitle>
              <AlertDescription>
                Your account doesn't have any roles assigned. For testing purposes, we'll show you the student dashboard.
              </AlertDescription>
            </Alert>
            <StudentDashboard activeTab={activeTab} />
          </>
        ) : (
          getRoleDashboard()
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
