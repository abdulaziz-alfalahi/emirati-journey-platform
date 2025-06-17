
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/types/auth';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export const useFetchUserRoles = () => {
  const { toast } = useToast();

  const fetchUserRoles = async (userId: string, user?: User): Promise<UserRole[]> => {
    try {
      console.log('Fetching roles for user:', userId);
      
      const { data: rolesData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user roles:', error);
        throw error;
      }

      const roles = rolesData?.map(r => r.role) || [];
      console.log('Fetched user roles:', roles);
      
      return roles;
    } catch (error) {
      console.error('Error in fetchUserRoles:', error);
      toast({
        title: "Error loading roles",
        description: "Failed to load user roles. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  };

  return { fetchUserRoles };
};
