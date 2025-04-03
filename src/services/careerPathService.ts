
import { supabase } from '@/integrations/supabase/client';
import { CareerPath, CareerPathStage, UserCareerPath, CareerPathWithStages, UserCareerPathWithDetails } from '@/types/careerPath';

/**
 * Get all career paths
 */
export const getAllCareerPaths = async (): Promise<CareerPath[]> => {
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .order('title');
    
    if (error) {
      console.error('Error getting career paths:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getAllCareerPaths:', error);
    return [];
  }
};

/**
 * Get a specific career path by ID
 */
export const getCareerPathById = async (id: string): Promise<CareerPath | null> => {
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error getting career path ${id}:`, error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getCareerPathById:', error);
    return null;
  }
};

/**
 * Get a career path with all its stages
 */
export const getCareerPathWithStages = async (id: string): Promise<CareerPathWithStages | null> => {
  try {
    // First get the career path
    const { data: pathData, error: pathError } = await supabase
      .from('career_paths')
      .select('*')
      .eq('id', id)
      .single();
    
    if (pathError || !pathData) {
      console.error(`Error getting career path ${id}:`, pathError);
      return null;
    }
    
    // Then get the stages
    const { data: stagesData, error: stagesError } = await supabase
      .from('career_path_stages')
      .select('*')
      .eq('career_path_id', id)
      .order('order_index');
    
    if (stagesError) {
      console.error(`Error getting stages for career path ${id}:`, stagesError);
      return {
        ...pathData,
        stages: []
      };
    }
    
    // Make sure all required fields exist in the stage data
    const stages: CareerPathStage[] = stagesData.map(stage => ({
      ...stage,
      created_at: stage.created_at || new Date().toISOString(),
      updated_at: stage.updated_at || null
    }));
    
    return {
      ...pathData,
      stages
    };
  } catch (error) {
    console.error('Error in getCareerPathWithStages:', error);
    return null;
  }
};

/**
 * Create a new career path
 */
export const createCareerPath = async (path: Omit<CareerPath, 'id' | 'created_at' | 'updated_at'>): Promise<CareerPath | null> => {
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .insert(path)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating career path:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createCareerPath:', error);
    return null;
  }
};

/**
 * Get user's selected career paths
 */
export const getUserCareerPaths = async (userId: string): Promise<UserCareerPath[]> => {
  try {
    const { data, error } = await supabase
      .from('user_career_paths')
      .select(`
        *,
        career_path:career_paths(*),
        current_stage:career_path_stages(*)
      `)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error getting user career paths:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getUserCareerPaths:', error);
    return [];
  }
};

/**
 * Get detailed user career path with all stages
 */
export const getUserCareerPathDetails = async (userId: string, pathId: string): Promise<UserCareerPathWithDetails | null> => {
  try {
    // Get the user career path entry
    const { data: userPathData, error: userPathError } = await supabase
      .from('user_career_paths')
      .select(`
        *,
        career_path:career_paths(*),
        current_stage:career_path_stages(*)
      `)
      .eq('user_id', userId)
      .eq('career_path_id', pathId)
      .single();
    
    if (userPathError || !userPathData) {
      console.error(`Error getting user career path ${pathId}:`, userPathError);
      return null;
    }
    
    // Get all stages for this career path
    const { data: stagesData, error: stagesError } = await supabase
      .from('career_path_stages')
      .select('*')
      .eq('career_path_id', pathId)
      .order('order_index');
    
    if (stagesError) {
      console.error(`Error getting stages for career path ${pathId}:`, stagesError);
      return {
        ...userPathData,
        stages: []
      };
    }
    
    // Ensure all required fields are present
    const stages: CareerPathStage[] = stagesData.map(stage => ({
      ...stage,
      created_at: stage.created_at || new Date().toISOString(),
      updated_at: stage.updated_at || null
    }));
    
    return {
      ...userPathData,
      stages
    };
  } catch (error) {
    console.error('Error in getUserCareerPathDetails:', error);
    return null;
  }
};

/**
 * Select a career path for a user
 */
export const selectCareerPath = async (userId: string, careerPathId: string): Promise<boolean> => {
  try {
    // Check if user already has this career path
    const { data: existingPath, error: checkError } = await supabase
      .from('user_career_paths')
      .select('id')
      .eq('user_id', userId)
      .eq('career_path_id', careerPathId)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking existing career path:', checkError);
      return false;
    }
    
    if (existingPath) {
      // User already has this career path
      return true;
    }
    
    // Get the first stage of the career path
    const { data: firstStage, error: stageError } = await supabase
      .from('career_path_stages')
      .select('id')
      .eq('career_path_id', careerPathId)
      .order('order_index')
      .limit(1)
      .maybeSingle();
    
    if (stageError) {
      console.error('Error getting first stage:', stageError);
      return false;
    }
    
    // Create the user career path
    const { error: insertError } = await supabase
      .from('user_career_paths')
      .insert({
        user_id: userId,
        career_path_id: careerPathId,
        current_stage_id: firstStage?.id || null
      });
    
    if (insertError) {
      console.error('Error adding career path for user:', insertError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in selectCareerPath:', error);
    return false;
  }
};

/**
 * Update user's current career stage
 */
export const updateUserCareerStage = async (userId: string, userCareerPathId: string, stageId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_career_paths')
      .update({ current_stage_id: stageId, updated_at: new Date().toISOString() })
      .eq('id', userCareerPathId)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating career stage:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateUserCareerStage:', error);
    return false;
  }
};

/**
 * Delete a user's career path
 */
export const deleteUserCareerPath = async (userId: string, userCareerPathId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_career_paths')
      .delete()
      .eq('id', userCareerPathId)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error deleting career path:', error);
      return false;
    }
    
    return true;
  }
  catch (error) {
    console.error('Error in deleteUserCareerPath:', error);
    return false;
  }
};
