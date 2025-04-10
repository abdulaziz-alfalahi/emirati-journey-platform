
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/types/auth';

export const useFetchUserRoles = () => {
  const fetchUserRoles = async (userId: string, user: User | null): Promise<UserRole[]> => {
    try {
      console.log("Fetching roles for user:", userId);
      
      // For testing, check email for role assignment first
      if (user?.email) {
        if (user.email.includes('admin')) {
          console.log("Setting admin role based on email");
          return ['administrator'];
        }
        
        if (user.email.includes('student')) {
          console.log("Setting school_student role based on email");
          return ['school_student'];
        }
        
        // Check for both formats of training center email
        if (user.email.includes('training-center') || user.email.includes('training_center')) {
          console.log("Setting training_center role based on email");
          return ['training_center'];
        }

        // Add check for assessment center emails
        if (user.email.includes('assessment-center') || user.email.includes('assessment_center')) {
          console.log("Setting assessment_center role based on email");
          return ['assessment_center'];
        }
        
        // Add check for career advisor emails
        if (user.email.includes('career-advisor') || user.email.includes('career_advisor')) {
          console.log("Setting career_advisor role based on email");
          return ['career_advisor', 'mentor'];
        }
      }
      
      // Only try the edge function if we haven't assigned roles based on email
      try {
        // Use the edge function to fetch roles instead of direct query
        const { data, error } = await supabase.functions.invoke('get-user-roles', {
          body: { userId }
        });
  
        if (error) {
          throw error;
        }
  
        if (data && Array.isArray(data)) {
          console.log("Received roles from function:", data);
          if (data.length > 0) {
            return data;
          }
        } else {
          console.error('Unexpected response format from get-user-roles:', data);
        }
      } catch (functionError) {
        console.error('Error fetching user roles from function:', functionError);
      }
      
      // Fallback role assignment if edge function fails or returns no roles
      if (user?.email) {
        if (user.email.includes('admin')) {
          console.log("Setting admin role based on email after error");
          return ['administrator'];
        } else if (user.email.includes('student')) {
          console.log("Setting school_student role based on email after error");
          return ['school_student'];
        } else if (user.email.includes('training-center') || user.email.includes('training_center')) {
          console.log("Setting training_center role based on email after error");
          return ['training_center'];
        } else if (user.email.includes('assessment-center') || user.email.includes('assessment_center')) {
          console.log("Setting assessment_center role based on email after error");
          return ['assessment_center'];
        } else if (user.email.includes('career-advisor') || user.email.includes('career_advisor')) {
          console.log("Setting career_advisor role based on email after error");
          return ['career_advisor', 'mentor'];
        } else {
          // Default role if nothing else matches
          console.log("Setting default user role");
          return ['school_student']; // For testing, default to school_student
        }
      }
      
      // Default to school_student role if all else fails
      return ['school_student'];
    } catch (error) {
      console.error('Error in fetchUserRoles:', error);
      // Default to school_student role if all else fails
      return ['school_student'];
    }
  };

  return { fetchUserRoles };
};
