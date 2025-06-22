
import { supabase } from '@/integrations/supabase/client';
import { UserRole, UserRoleInfo } from '@/types/auth';
import { User } from '@supabase/supabase-js';

export const useFetchUserRoles = () => {
  const fetchUserRoles = async (userId: string, user: User): Promise<UserRole[]> => {
    try {
      // First try to fetch from user_roles table
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        
        // Fallback: determine role from email if no roles found
        if (user.email) {
          if (user.email.includes('student')) {
            return ['school_student'];
          } else if (user.email.includes('admin')) {
            return ['administrator'];
          } else if (user.email.includes('mentor')) {
            return ['mentor'];
          } else if (user.email.includes('recruiter')) {
            return ['private_sector_recruiter'];
          }
        }
        
        // Default role for new users
        return ['jobseeker'];
      }

      const roles = rolesData?.map((roleInfo: UserRoleInfo) => roleInfo.role) || [];
      
      // If no roles found, assign default role
      if (roles.length === 0) {
        return ['jobseeker'];
      }
      
      return roles;
    } catch (error) {
      console.error('Error in fetchUserRoles:', error);
      return ['jobseeker']; // Default fallback role
    }
  };

  return { fetchUserRoles };
};
