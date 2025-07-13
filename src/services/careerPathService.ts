
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
  }
};
