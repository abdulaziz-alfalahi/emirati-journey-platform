/**
 * Career path service implementation
 */
import { supabase } from '@/integrations/supabase/client';

// Interface for career path data
export interface CareerPath {
  id: string;
  title: string;
  industry: string;
  description?: string;
  created_at: string;
  updated_at?: string;
}

// Interface for career path stage data
export interface CareerPathStage {
  id: string;
  title: string;
  description?: string;
  career_path_id: string;
  order_index: number;
  stage_type: 'education' | 'career';
  skills?: string[];
  requirements?: string[];
  icon?: string;
  duration?: string;
}

/**
 * Fetch all career paths
 * @returns Promise resolving to array of career paths
 */
export const getCareerPaths = async (): Promise<CareerPath[]> => {
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
};

/**
 * Get a career path by its ID
 * @param id Career path ID
 * @returns Promise resolving to career path or null if not found
 */
export const getCareerPathById = async (id: string): Promise<CareerPath | null> => {
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching career path with ID ${id}:`, error);
    return null;
  }
};

/**
 * Get all stages for a career path
 * @param careerPathId Career path ID
 * @returns Promise resolving to array of career path stages
 */
export const getCareerPathStages = async (careerPathId: string): Promise<CareerPathStage[]> => {
  try {
    const { data, error } = await supabase
      .from('career_path_stages')
      .select('*')
      .eq('career_path_id', careerPathId)
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching stages for career path ${careerPathId}:`, error);
    return [];
  }
};

/**
 * Create a new career path
 * @param careerPath Career path data
 * @returns Promise resolving to created career path ID
 */
export const createCareerPath = async (careerPath: Omit<CareerPath, 'id' | 'created_at' | 'updated_at'>): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .insert(careerPath)
      .select('id')
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error('Error creating career path:', error);
    return null;
  }
};

/**
 * Update an existing career path
 * @param id Career path ID
 * @param careerPath Updated career path data
 * @returns Promise resolving to boolean indicating success
 */
export const updateCareerPath = async (id: string, careerPath: Partial<CareerPath>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('career_paths')
      .update(careerPath)
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error updating career path ${id}:`, error);
    return false;
  }
};

/**
 * Delete a career path
 * @param id Career path ID
 * @returns Promise resolving to boolean indicating success
 */
export const deleteCareerPath = async (id: string): Promise<boolean> => {
  try {
    // First delete all stages associated with this career path
    const { error: stagesError } = await supabase
      .from('career_path_stages')
      .delete()
      .eq('career_path_id', id);
    
    if (stagesError) throw stagesError;
    
    // Then delete the career path itself
    const { error } = await supabase
      .from('career_paths')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting career path ${id}:`, error);
    return false;
  }
};

/**
 * Create a new career path stage
 * @param stage Career path stage data
 * @returns Promise resolving to created stage ID
 */
export const createCareerPathStage = async (stage: Omit<CareerPathStage, 'id'>): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('career_path_stages')
      .insert(stage)
      .select('id')
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error('Error creating career path stage:', error);
    return null;
  }
};

/**
 * Update an existing career path stage
 * @param id Stage ID
 * @param stage Updated stage data
 * @returns Promise resolving to boolean indicating success
 */
export const updateCareerPathStage = async (id: string, stage: Partial<CareerPathStage>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('career_path_stages')
      .update(stage)
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error updating career path stage ${id}:`, error);
    return false;
  }
};

/**
 * Delete a career path stage
 * @param id Stage ID
 * @returns Promise resolving to boolean indicating success
 */
export const deleteCareerPathStage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('career_path_stages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting career path stage ${id}:`, error);
    return false;
  }
};

/**
 * Reorder career path stages
 * @param stages Array of stage IDs in the new order
 * @returns Promise resolving to boolean indicating success
 */
export const reorderCareerPathStages = async (stages: {id: string, order_index: number}[]): Promise<boolean> => {
  try {
    // Use upsert to update multiple records at once
    const { error } = await supabase
      .from('career_path_stages')
      .upsert(stages, { onConflict: 'id' });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error reordering career path stages:', error);
    return false;
  }
};
