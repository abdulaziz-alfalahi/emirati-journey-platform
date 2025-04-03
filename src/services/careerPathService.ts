
/**
 * Career path service implementation
 */
import { supabase } from '@/integrations/supabase/client';
import { CareerPath, CareerPathStage, CareerPathWithStages, UserCareerPath } from '@/types/careerPath';

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
    
    // Transform data to match the expected type
    const careerPaths = data.map(path => ({
      id: path.id,
      title: path.title,
      industry: path.industry,
      description: path.description || null,
      created_at: path.created_at,
      updated_at: path.updated_at || null
    }));
    
    return careerPaths || [];
  } catch (error) {
    console.error('Error fetching career paths:', error);
    return [];
  }
};

/**
 * Get a career path by its ID with stages
 * @param id Career path ID
 * @returns Promise resolving to career path with stages or null if not found
 */
export const getCareerPathById = async (id: string): Promise<CareerPathWithStages | null> => {
  try {
    // Fetch the career path
    const { data: pathData, error: pathError } = await supabase
      .from('career_paths')
      .select('*')
      .eq('id', id)
      .single();
    
    if (pathError) throw pathError;
    
    if (!pathData) return null;
    
    // Fetch the stages for this career path
    const { data: stagesData, error: stagesError } = await supabase
      .from('career_path_stages')
      .select('*')
      .eq('career_path_id', id)
      .order('order_index');
    
    if (stagesError) throw stagesError;
    
    // Transform the stages data to match the expected type
    const stages = stagesData.map(stage => ({
      id: stage.id,
      title: stage.title,
      description: stage.description || null,
      career_path_id: stage.career_path_id,
      order_index: stage.order_index,
      stage_type: stage.stage_type === 'education' ? 'education' : 'career', // Ensure correct type
      skills: stage.skills || null,
      requirements: stage.requirements || null,
      icon: stage.icon || null,
      duration: stage.duration || null
    } as CareerPathStage));
    
    // Return combined object with correct type
    return {
      id: pathData.id,
      title: pathData.title,
      description: pathData.description || null,
      industry: pathData.industry,
      created_at: pathData.created_at,
      updated_at: pathData.updated_at || null,
      stages: stages
    };
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
    
    // Ensure the correct type for stage_type
    const stages = data.map(stage => ({
      id: stage.id,
      title: stage.title,
      description: stage.description || null,
      career_path_id: stage.career_path_id,
      order_index: stage.order_index,
      stage_type: stage.stage_type === 'education' ? 'education' : 'career' as 'education' | 'career',
      skills: stage.skills || null,
      requirements: stage.requirements || null,
      icon: stage.icon || null,
      duration: stage.duration || null
    }));
    
    return stages;
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
 * @param stages Array of stage IDs with new order indices
 * @returns Promise resolving to boolean indicating success
 */
export const reorderCareerPathStages = async (stages: {id: string, order_index: number, career_path_id: string, title: string, stage_type: 'education' | 'career'}[]): Promise<boolean> => {
  try {
    // Ensure all required fields are included
    const updateData = stages.map(stage => ({
      id: stage.id,
      order_index: stage.order_index,
      career_path_id: stage.career_path_id,
      title: stage.title,
      stage_type: stage.stage_type
    }));
    
    // Use upsert to update multiple records at once
    const { error } = await supabase
      .from('career_path_stages')
      .upsert(updateData, { onConflict: 'id' });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error reordering career path stages:', error);
    return false;
  }
};

/**
 * Get all career paths for a user
 * @param userId User ID
 * @returns Promise resolving to array of user career paths
 */
export const getUserCareerPaths = async (userId: string): Promise<UserCareerPath[]> => {
  try {
    const { data, error } = await supabase
      .from('user_career_paths')
      .select(`
        *,
        career_path:career_path_id(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return data as UserCareerPath[] || [];
  } catch (error) {
    console.error(`Error fetching career paths for user ${userId}:`, error);
    return [];
  }
};

/**
 * Select a career path for a user
 * @param userId User ID
 * @param careerPathId Career path ID
 * @returns Promise resolving to boolean indicating success
 */
export const selectCareerPath = async (userId: string, careerPathId: string): Promise<boolean> => {
  try {
    // Check if the user already has this career path
    const { data: existingData, error: checkError } = await supabase
      .from('user_career_paths')
      .select('id')
      .eq('user_id', userId)
      .eq('career_path_id', careerPathId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    // If already exists, don't duplicate
    if (existingData) return true;
    
    // Get the first stage of the career path
    const { data: stageData, error: stageError } = await supabase
      .from('career_path_stages')
      .select('id')
      .eq('career_path_id', careerPathId)
      .order('order_index', { ascending: true })
      .limit(1)
      .single();
    
    if (stageError && stageError.code !== 'PGRST116') throw stageError;
    
    const firstStageId = stageData?.id;
    
    // Insert the new user_career_path
    const { error } = await supabase
      .from('user_career_paths')
      .insert({
        user_id: userId,
        career_path_id: careerPathId,
        current_stage_id: firstStageId,
        started_at: new Date().toISOString()
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error selecting career path ${careerPathId} for user ${userId}:`, error);
    return false;
  }
};

/**
 * Update a user's current career path stage
 * @param userPathId User career path ID
 * @param stageId New stage ID
 * @returns Promise resolving to boolean indicating success
 */
export const updateUserCareerStage = async (userPathId: string, stageId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_career_paths')
      .update({
        current_stage_id: stageId,
        updated_at: new Date().toISOString()
      })
      .eq('id', userPathId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error updating stage for user career path ${userPathId}:`, error);
    return false;
  }
};
