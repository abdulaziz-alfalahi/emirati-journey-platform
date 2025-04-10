
import React from 'react';
import { User } from '@supabase/supabase-js';
import { UserRole } from '@/types/auth';
import NoRoleAlert from './NoRoleAlert';
import { StudentDashboard } from './role-dashboards';
import { getDashboardComponentByUserProfile } from '@/utils/dashboard-utils';

interface DashboardContainerProps {
  user: User | null;
  roles: UserRole[];
  activeTab: string;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ user, roles, activeTab }) => {
  const shouldShowNoRoleAlert = 
    roles.length === 0 && 
    !user?.email?.includes('training-center') && 
    !user?.email?.includes('training_center') && 
    !user?.email?.includes('assessment-center') && 
    !user?.email?.includes('assessment_center') &&
    !user?.email?.includes('career-advisor') &&
    !user?.email?.includes('career_advisor');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome back, {user?.user_metadata?.full_name || 'User'}</p>
      
      {shouldShowNoRoleAlert ? (
        <>
          <NoRoleAlert />
          <StudentDashboard activeTab={activeTab} />
        </>
      ) : (
        getDashboardComponentByUserProfile(user, roles, activeTab)
      )}
    </div>
  );
};

export default DashboardContainer;
