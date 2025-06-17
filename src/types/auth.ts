
import { Session, User } from '@supabase/supabase-js';

export type UserRole = 
  | 'school_student'
  | 'national_service_participant'
  | 'university_student'
  | 'intern'
  | 'full_time_employee'
  | 'part_time_employee'
  | 'gig_worker'
  | 'jobseeker'
  | 'lifelong_learner'
  | 'entrepreneur'
  | 'retiree'
  | 'educational_institution'
  | 'parent'
  | 'private_sector_recruiter'
  | 'government_representative'
  | 'retiree_advocate'
  | 'training_center'
  | 'assessment_center'
  | 'mentor'
  | 'career_advisor'
  | 'platform_operator'
  | 'administrator'
  | 'super_user';

export type UserRoleInfo = {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
};

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  roles: UserRole[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, roles: UserRole[]) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}
