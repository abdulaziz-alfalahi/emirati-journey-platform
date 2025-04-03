
import { ResumeData } from '@/components/resume/types';
import { supabase } from '@/integrations/supabase/client';

/**
 * Save parsed resume data to Supabase
 * @param userId User ID
 * @param resumeData Resume data to save
 * @returns Promise resolving to resume ID
 */
export const saveResumeToSupabase = async (
  userId: string,
  resumeData: Partial<ResumeData>,
): Promise<string> => {
  try {
    // First, create or get an existing resume for the user
    const resumeTitle = resumeData.personal?.fullName ? 
      `${resumeData.personal.fullName}'s Resume` : 'My Resume';
    
    const { data: resumeRecord, error: resumeError } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        title: resumeTitle,
        template_id: 'professional',
        theme: 'classic'
      })
      .select('id')
      .single();

    if (resumeError) {
      throw resumeError;
    }

    const resumeId = resumeRecord.id;

    // Save resume data
    const { error: dataError } = await supabase
      .from('resume_data')
      .insert({
        resume_id: resumeId,
        data: resumeData as any
      });

    if (dataError) {
      throw dataError;
    }

    return resumeId;
  } catch (error) {
    console.error('Error saving resume to Supabase:', error);
    throw new Error(`Failed to save resume: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Get resume data by ID
 * @param resumeId Resume ID
 * @returns Promise resolving to resume data
 */
export const getResumeData = async (resumeId: string): Promise<Partial<ResumeData> | null> => {
  try {
    const { data, error } = await supabase
      .from('resume_data')
      .select('data')
      .eq('resume_id', resumeId)
      .single();

    if (error) {
      throw error;
    }

    return data?.data as Partial<ResumeData> | null;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw new Error(`Failed to fetch resume data: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Get all resumes for a user
 */
export const getUserResumes = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select(`
        id, 
        title, 
        template_id, 
        theme, 
        created_at, 
        updated_at
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user resumes:', error);
    throw new Error(`Failed to fetch resumes: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Update existing resume data
 */
export const updateResumeData = async (
  resumeId: string, 
  data: Partial<ResumeData>
): Promise<void> => {
  try {
    // Find existing resume data record
    const { data: existingData, error: checkError } = await supabase
      .from('resume_data')
      .select('id')
      .eq('resume_id', resumeId)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingData) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('resume_data')
        .update({
          data: data as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Create new record
      const { error: insertError } = await supabase
        .from('resume_data')
        .insert({
          resume_id: resumeId,
          data: data as any
        });

      if (insertError) {
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error updating resume data:', error);
    throw new Error(`Failed to update resume: ${error instanceof Error ? error.message : String(error)}`);
  }
};
