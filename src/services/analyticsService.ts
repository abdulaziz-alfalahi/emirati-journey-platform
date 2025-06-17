
import { UserRole } from '@/types/auth';

export const analyticsService = {
  trackRoleSwitch: (previousRole: UserRole | null, newRole: UserRole) => {
    console.log('Role switch tracked:', { previousRole, newRole });
    // Analytics implementation would go here
  }
};
