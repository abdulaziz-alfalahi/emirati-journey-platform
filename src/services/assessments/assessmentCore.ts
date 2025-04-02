
import { supabase } from '@/integrations/supabase/client';
import { Assessment } from '@/types/assessments';

export const fetchAssessments = async () => {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }

  return data as Assessment[];
};

export const fetchAssessmentById = async (id: string) => {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching assessment:', error);
    throw error;
  }

  return data as Assessment;
};

export const createAssessment = async (assessmentData: Omit<Assessment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('assessments')
    .insert([assessmentData])
    .select()
    .single();

  if (error) {
    console.error('Error creating assessment:', error);
    throw error;
  }

  return data as Assessment;
};

export const updateAssessment = async (id: string, assessmentData: Partial<Assessment>) => {
  const { data, error } = await supabase
    .from('assessments')
    .update(assessmentData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating assessment:', error);
    throw error;
  }

  return data as Assessment;
};

export const deleteAssessment = async (id: string) => {
  const { error } = await supabase
    .from('assessments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting assessment:', error);
    throw error;
  }
};
