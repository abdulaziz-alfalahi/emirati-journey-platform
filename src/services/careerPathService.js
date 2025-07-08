
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
export const getCareerPathById = async (id: string): Promise<CareerPathWithStages | null> => {
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
    
    // Transform stage data to ensure it matches the expected type
    const stages: CareerPathStage[] = (stagesData || []).map(stage => ({
      ...stage,
      created_at: stage.created_at || new Date().toISOString(),
      updated_at: stage.updated_at || null,
      stage_type: stage.stage_type === 'education' ? 'education' : 'career' as 'education' | 'career',
      skills: stage.skills || null,
      requirements: stage.requirements || null,
      description: stage.description || null,
      duration: stage.duration || null,
      icon: stage.icon || null
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

    // Transform the data to ensure it matches the expected type
    const userPaths: UserCareerPath[] = (data || []).map(path => ({
      ...path,
      career_path: path.career_path,
      current_stage: path.current_stage ? {
        ...path.current_stage,
        stage_type: path.current_stage.stage_type === 'education' ? 'education' : 'career' as 'education' | 'career',
        skills: path.current_stage.skills || null,
        requirements: path.current_stage.requirements || null,
        description: path.current_stage.description || null,
        duration: path.current_stage.duration || null,
        icon: path.current_stage.icon || null,
        created_at: path.current_stage.created_at || new Date().toISOString(),
        updated_at: path.current_stage.updated_at || null
      } : undefined
    }));
    
    return userPaths;
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

    // Transform current stage to match expected type
    const currentStage = userPathData.current_stage ? {
      ...userPathData.current_stage,
      stage_type: userPathData.current_stage.stage_type === 'education' ? 'education' : 'career' as 'education' | 'career',
      skills: userPathData.current_stage.skills || null,
      requirements: userPathData.current_stage.requirements || null,
      description: userPathData.current_stage.description || null,
      duration: userPathData.current_stage.duration || null,
      icon: userPathData.current_stage.icon || null,
      created_at: userPathData.current_stage.created_at || new Date().toISOString(),
      updated_at: userPathData.current_stage.updated_at || null
    } : null;
    
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
        current_stage: currentStage,
        stages: []
      } as UserCareerPathWithDetails;
    }
    
    // Transform stages to match expected type
    const stages: CareerPathStage[] = (stagesData || []).map(stage => ({
      ...stage,
      stage_type: stage.stage_type === 'education' ? 'education' : 'career' as 'education' | 'career',
      skills: stage.skills || null,
      requirements: stage.requirements || null,
      description: stage.description || null,
      duration: stage.duration || null,
      icon: stage.icon || null,
      created_at: stage.created_at || new Date().toISOString(),
      updated_at: stage.updated_at || null
    }));
    
    // Return the user career path with details
    return {
      ...userPathData,
      current_stage: currentStage,
      stages
    } as UserCareerPathWithDetails;
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
