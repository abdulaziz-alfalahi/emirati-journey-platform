
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/auth';

export const useAuthOperations = (setIsLoading: (loading: boolean) => void) => {
  const { toast } = useToast();

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

  const signUp = async (email: string, password: string, fullName: string, roles: UserRole[]) => {
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

      // 2. Assign all selected roles using the edge function
      const roleAssignmentPromises = roles.map(role => 
        supabase.functions.invoke('assign-user-role', {
          body: { 
            userId: userData.user.id,
            role: role
          }
        })
      );

      const roleResults = await Promise.allSettled(roleAssignmentPromises);
      
      // Check if any role assignments failed
      const failedRoles = roleResults
        .map((result, index) => ({ result, role: roles[index] }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ role }) => role);

      if (failedRoles.length > 0) {
        console.warn('Some role assignments failed:', failedRoles);
        toast({
          title: "Partial success",
          description: `Account created but some roles couldn't be assigned: ${failedRoles.join(', ')}`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account created",
          description: `You've successfully registered with ${roles.length} role(s). You can now log in.`
        });
      }
      
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

  return {
    signIn,
    signUp,
    signOut
  };
};
