
import { supabase } from '@/integrations/supabase/client';
import { 
  CareerPath, 
  CareerPathStage, 
  UserCareerPath, 
  CareerPathWithStages,
  UserCareerPathWithDetails 
} from '@/types/careerPath';

/**
 * Fetch all career paths
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
    throw error;
  }
};

/**
 * Fetch a specific career path by ID
 */
export const getCareerPathById = async (id: string): Promise<CareerPathWithStages | null> => {
  try {
    // Get the career path
    const { data: careerPath, error: pathError } = await supabase
      .from('career_paths')
      .select('*')
      .eq('id', id)
      .single();
    
    if (pathError) throw pathError;
    
    // Get the stages for this career path
    const { data: stagesData, error: stagesError } = await supabase
      .from('career_path_stages')
      .select('*')
      .eq('career_path_id', id)
      .order('order_index');
    
    if (stagesError) throw stagesError;
    
    // Transform the stage types to match the expected union type
    const stages = stagesData ? stagesData.map(stage => ({
      ...stage,
      stage_type: stage.stage_type === 'education' ? 'education' : 'career'
    } as CareerPathStage)) : [];
    
    return {
      ...careerPath,
      stages
    };
  } catch (error) {
    console.error('Error fetching career path:', error);
    throw error;
  }
};

/**
 * Fetch all stages for a career path
 */
export const getCareerPathStages = async (careerPathId: string): Promise<CareerPathStage[]> => {
  try {
    const { data, error } = await supabase
      .from('career_path_stages')
      .select('*')
      .eq('career_path_id', careerPathId)
      .order('order_index');
    
    if (error) throw error;
    
    // Transform the stage types to match the expected union type
    return data ? data.map(stage => ({
      ...stage,
      stage_type: stage.stage_type === 'education' ? 'education' : 'career'
    } as CareerPathStage)) : [];
  } catch (error) {
    console.error('Error fetching career path stages:', error);
    throw error;
  }
};

/**
 * Get a user's selected career path
 */
export const getUserCareerPath = async (userId: string, careerPathId: string): Promise<UserCareerPathWithDetails | null> => {
  try {
    // Get the user career path entry
    const { data: userCareerPath, error: userPathError } = await supabase
      .from('user_career_paths')
      .select('*')
      .eq('user_id', userId)
      .eq('career_path_id', careerPathId)
      .single();
    
    if (userPathError) {
      if (userPathError.code === 'PGRST116') {
        // No record found, return null
        return null;
      }
      throw userPathError;
    }
    
    // Get the career path
    const careerPathWithStages = await getCareerPathById(careerPathId);
    
    if (!careerPathWithStages) return null;
    
    // Get the current stage if it exists
    let currentStage = null;
    if (userCareerPath.current_stage_id) {
      currentStage = careerPathWithStages.stages.find(stage => stage.id === userCareerPath.current_stage_id) || null;
    }
    
    return {
      ...userCareerPath,
      career_path: {
        id: careerPathWithStages.id,
        title: careerPathWithStages.title,
        description: careerPathWithStages.description,
        industry: careerPathWithStages.industry,
        created_at: careerPathWithStages.created_at,
        updated_at: careerPathWithStages.updated_at
      },
      current_stage: currentStage,
      stages: careerPathWithStages.stages
    };
  } catch (error) {
    console.error('Error fetching user career path:', error);
    throw error;
  }
};

/**
 * Get all career paths selected by a user
 */
export const getUserCareerPaths = async (userId: string): Promise<UserCareerPath[]> => {
  try {
    const { data, error } = await supabase
      .from('user_career_paths')
      .select(`
        *,
        career_path:career_path_id (*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user career paths:', error);
    throw error;
  }
};

/**
 * Select a career path for a user
 */
export const selectCareerPath = async (userId: string, careerPathId: string): Promise<UserCareerPath> => {
  try {
    // Get the first stage of the career path
    const { data: firstStage, error: stageError } = await supabase
      .from('career_path_stages')
      .select('*')
      .eq('career_path_id', careerPathId)
      .order('order_index')
      .limit(1)
      .single();
    
    if (stageError) throw stageError;
    
    // Create the user career path entry
    const { data, error } = await supabase
      .from('user_career_paths')
      .insert([
        {
          user_id: userId,
          career_path_id: careerPathId,
          current_stage_id: firstStage.id
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error selecting career path:', error);
    throw error;
  }
};

/**
 * Update a user's progress on a career path
 */
export const updateUserCareerStage = async (userCareerPathId: string, stageId: string): Promise<UserCareerPath> => {
  try {
    const { data, error } = await supabase
      .from('user_career_paths')
      .update({ current_stage_id: stageId })
      .eq('id', userCareerPathId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user career stage:', error);
    throw error;
  }
};

/**
 * Recommend career paths based on user skills (mock implementation)
 * In a real app, this would analyze user skills from their profile or resume
 */
export const recommendCareerPaths = async (userId: string): Promise<CareerPath[]> => {
  try {
    // For now, just return all career paths
    // In a real implementation, this would filter based on user skills and interests
    return await getCareerPaths();
  } catch (error) {
    console.error('Error recommending career paths:', error);
    throw error;
  }
};

/**
 * Create a new career path (admin function)
 */
export const createCareerPath = async (careerPath: Omit<CareerPath, 'id' | 'created_at' | 'updated_at'>): Promise<CareerPath> => {
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .insert([careerPath])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating career path:', error);
    throw error;
  }
};

/**
 * Create a new career path stage (admin function)
 */
export const createCareerPathStage = async (stage: Omit<CareerPathStage, 'id' | 'created_at' | 'updated_at'>): Promise<CareerPathStage> => {
  try {
    // First ensure the stage_type is one of the valid values
    const validatedStage = {
      ...stage,
      stage_type: stage.stage_type === 'education' ? 'education' : 'career'
    };
    
    const { data, error } = await supabase
      .from('career_path_stages')
      .insert([validatedStage])
      .select()
      .single();
    
    if (error) throw error;
    
    // Transform the result to match the expected type
    return {
      ...data,
      stage_type: data.stage_type === 'education' ? 'education' : 'career'
    } as CareerPathStage;
  } catch (error) {
    console.error('Error creating career path stage:', error);
    throw error;
  }
};
