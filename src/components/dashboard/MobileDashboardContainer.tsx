
import React from 'react';
import { User } from '@supabase/supabase-js';
import { UserRole } from '@/types/auth';
import MobileDashboard from '@/components/mobile/MobileDashboard';
import MobileNotifications from '@/components/mobile/MobileNotifications';
import { useMobileDetection } from '@/hooks/use-mobile-detection';

interface MobileDashboardContainerProps {
  user: User | null;
  roles: UserRole[];
}

const MobileDashboardContainer: React.FC<MobileDashboardContainerProps> = ({ 
  user, 
  roles 
}) => {
  const { isMobile, isCapacitor } = useMobileDetection();

  if (!isMobile && !isCapacitor) {
    return null;
  }

  return (
    <div className="space-y-6">
      <MobileDashboard user={user} roles={roles} />
      <MobileNotifications />
    </div>
  );
};

export default MobileDashboardContainer;
