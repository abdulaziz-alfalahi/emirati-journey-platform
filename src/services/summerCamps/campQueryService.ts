
import { supabase } from '@/integrations/supabase/client';
import { SummerCamp, CampFilters } from '@/types/summerCamps';
import { toast } from '@/hooks/use-toast';
import { handleServiceError } from './utils';

// Service for querying camps
export const campQueryService = {
  /**
   * Fetch all summer camps with optional filtering
   */
  async getCamps(filters?: CampFilters): Promise<SummerCamp[]> {
    try {
      let query = supabase
        .from('summer_camps')
        .select('*');
      
      if (filters) {
        // Filter by category
        if (filters.category && filters.category.length > 0) {
          query = query.in('category', filters.category);
        }
        
        // Filter by age group
        if (filters.ageGroup && filters.ageGroup.length > 0) {
          query = query.in('age_group', filters.ageGroup);
        }
        
        // Filter by location
        if (filters.location && filters.location.length > 0) {
          query = query.in('location', filters.location);
        }
        
        // Filter by search query
        if (filters.searchQuery) {
          const searchTerm = `%${filters.searchQuery.toLowerCase()}%`;
          query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm},organizer.ilike.${searchTerm}`);
        }
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      handleServiceError(error, 'Failed to fetch summer camps. Please try again later.');
      return [];
    }
  },

  /**
   * Fetch a single camp by ID
   */
  async getCampById(id: string): Promise<SummerCamp | null> {
    try {
      const { data, error } = await supabase
        .from('summer_camps')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch camp details. Please try again later.');
      return null;
    }
  },

  /**
   * Fetch camps created by a specific institution
   */
  async getCampsByInstitution(userId: string): Promise<SummerCamp[]> {
    try {
      const { data, error } = await supabase
        .from('summer_camps')
        .select('*')
        .eq('created_by', userId);
      
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      handleServiceError(error, 'Failed to fetch your summer camps. Please try again later.');
      return [];
    }
  }
};
