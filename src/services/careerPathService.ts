
import { supabase } from '@/integrations/supabase/client';

export interface CareerPath {
  id: string;
  title: string;
  industry: string;
  description?: string;
  created_at: string;
  updated_at?: string;
}

export interface CareerPathStage {
  id: string;
  career_path_id: string;
  title: string;
  description?: string;
  stage_type: string;
  order_index: number;
  duration?: string;
  skills?: string[];
  requirements?: string[];
  icon?: string;
  created_at: string;
  updated_at?: string;
}

export const careerPathService = {
  async getCareerPaths(): Promise<CareerPath[]> {
    try {
      const { data, error } = await supabase
        .from('career_paths')
        .select('*')
        .order('title');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching career paths:', error);
      return [];
    }
  },

  async getCareerPathById(id: string): Promise<CareerPath | null> {
    try {
      const { data, error } = await supabase
        .from('career_paths')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching career path:', error);
      return null;
    }
  },

  async getCareerPathStages(careerPathId: string): Promise<CareerPathStage[]> {
    try {
      const { data, error } = await supabase
        .from('career_path_stages')
        .select('*')
        .eq('career_path_id', careerPathId)
        .order('order_index');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching career path stages:', error);
      return [];
    }
  },

  // Additional methods for compatibility
  async getUserCareerPaths(userId: string): Promise<CareerPath[]> {
    // Mock implementation - return all paths for now
    return this.getCareerPaths();
  },

  async getUserCareerPathDetails(userId: string, pathId: string) {
    const path = await this.getCareerPathById(pathId);
    const stages = await this.getCareerPathStages(pathId);
    return { path, stages };
  },

  async deleteUserCareerPath(userId: string, pathId: string) {
    // Mock implementation
    return { success: true };
  },

  async selectCareerPath(userId: string, pathId: string) {
    // Mock implementation
    return { success: true, pathId };
  },

  async updateUserCareerStage(userId: string, pathId: string, stageId: string) {
    // Mock implementation
    return { success: true, stageId };
  }
};

// Export individual functions for backward compatibility
export const getUserCareerPaths = (userId: string) => careerPathService.getUserCareerPaths(userId);
export const getUserCareerPathDetails = (userId: string, pathId: string) => careerPathService.getUserCareerPathDetails(userId, pathId);
export const deleteUserCareerPath = (userId: string, pathId: string) => careerPathService.deleteUserCareerPath(userId, pathId);
export const selectCareerPath = (userId: string, pathId: string) => careerPathService.selectCareerPath(userId, pathId);
export const getCareerPathById = (id: string) => careerPathService.getCareerPathById(id);
export const updateUserCareerStage = (userId: string, pathId: string, stageId: string) => careerPathService.updateUserCareerStage(userId, pathId, stageId);
export const getCareerPaths = () => careerPathService.getCareerPaths();
