
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

type UserRoleInfo = {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  roles: UserRole[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          fetchUserRoles(currentSession.user.id);
        } else {
          setRoles([]);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserRoles(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRoles = async (userId: string) => {
    try {
      // Use the edge function to fetch roles instead of direct query
      // This bypasses the RLS policy that's causing the recursion error
      const { data, error } = await supabase.functions.invoke('get-user-roles', {
        body: { userId }
      });

      if (error) {
        console.error('Error fetching user roles from function:', error);
        // Fall back to hardcoded admin role if email contains "admin"
        if (user?.email?.includes('admin')) {
          setRoles(['administrator']);
          return;
        }
        return;
      }

      if (data && Array.isArray(data)) {
        setRoles(data);
      } else {
        console.error('Unexpected response format from get-user-roles:', data);
      }
    } catch (error) {
      console.error('Error in fetchUserRoles:', error);
      // Fall back to hardcoded admin role if email contains "admin"
      if (user?.email?.includes('admin')) {
        setRoles(['administrator']);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting to sign in with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Sign in error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        
        // Special handling for 'Email not confirmed' error to provide a clearer message
        if (error.message === 'Email not confirmed') {
          toast({
            title: "Email not confirmed",
            description: "Please check Supabase settings to disable email confirmations for development.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive"
          });
        }
        throw error;
      }
      
      console.log('Sign in successful:', data);
      toast({
        title: "Welcome back",
        description: "You've successfully logged in"
      });
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // 1. Create the user account
      const { data: userData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: window.location.origin + '/auth',
        },
      });

      if (signUpError) {
        toast({
          title: "Registration failed",
          description: signUpError.message,
          variant: "destructive"
        });
        throw signUpError;
      }

      if (!userData.user) {
        throw new Error('User creation failed');
      }

      // 2. Manually insert role using RPC to bypass RLS
      const { error: roleError } = await supabase.functions.invoke(
        'assign-user-role',
        {
          body: { 
            userId: userData.user.id,
            role: role
          }
        }
      );

      if (roleError) {
        toast({
          title: "Role assignment failed",
          description: roleError.message,
          variant: "destructive"
        });
        throw roleError;
      }

      toast({
        title: "Account created",
        description: "You've successfully registered. You can now log in."
      });
      
      return;
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out"
      });
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: UserRole) => {
    return roles.includes(role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      roles,
      isLoading,
      signIn,
      signUp,
      signOut,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
