
import React from 'react';
import { User } from '@supabase/supabase-js';
import { UserRole } from '@/types/auth';
import { useRole } from '@/context/RoleContext';
import NoRoleAlert from './NoRoleAlert';
import RoleSelector from './RoleSelector';
import RoleOnboardingTooltip from './RoleOnboardingTooltip';
import { StudentDashboard } from './role-dashboards';
import { getDashboardComponentByUserProfile } from '@/utils/dashboard-utils';

interface DashboardContainerProps {
  user: User | null;
  roles: UserRole[];
  activeTab: string;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ user, roles, activeTab }) => {
  const { activeRole, setActiveRole, availableRoles } = useRole();

  const shouldShowNoRoleAlert = 
    roles.length === 0 && 
    !user?.email?.includes('training-center') && 
    !user?.email?.includes('training_center') && 
    !user?.email?.includes('assessment-center') && 
    !user?.email?.includes('assessment_center') &&
    !user?.email?.includes('career-advisor') &&
    !user?.email?.includes('career_advisor');

  // Use activeRole from context instead of all roles
  const currentRole = activeRole || (roles.length > 0 ? roles[0] : null);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || 'User'}</p>
        </div>
        
        {availableRoles.length > 0 && currentRole && (
          <RoleOnboardingTooltip role={currentRole}>
            <RoleSelector
              availableRoles={availableRoles}
              currentRole={currentRole}
              onRoleChange={setActiveRole}
            />
          </RoleOnboardingTooltip>
        )}
      </div>
      
      {shouldShowNoRoleAlert ? (
        <>
          <NoRoleAlert />
          <StudentDashboard activeTab={activeTab} />
        </>
      ) : currentRole ? (
        getDashboardComponentByUserProfile(user, [currentRole], activeTab)
      ) : (
        <StudentDashboard activeTab={activeTab} />
      )}
    </div>
  );
};

export default DashboardContainer;
