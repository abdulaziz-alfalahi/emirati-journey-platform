
import { supabase } from '@/integrations/supabase/client';
import { AssessmentTemplate, AssessmentTemplateStatus } from '@/types/collaborativeAssessments';

export const createAssessmentTemplate = async (template: Omit<AssessmentTemplate, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('assessment_templates')
    .insert([template])
    .select()
    .single();

  if (error) {
    console.error('Error creating assessment template:', error);
    throw error;
  }

  return data;
};

export const fetchAssessmentTemplates = async (createdBy?: string, status?: AssessmentTemplateStatus) => {
  let query = supabase
    .from('assessment_templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (createdBy) {
    query = query.eq('created_by', createdBy);
  }

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching assessment templates:', error);
    throw error;
  }

  return data as AssessmentTemplate[];
};

export const updateAssessmentTemplate = async (id: string, updates: Partial<AssessmentTemplate>) => {
  const { data, error } = await supabase
    .from('assessment_templates')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating assessment template:', error);
    throw error;
  }

  return data;
};

export const deleteAssessmentTemplate = async (id: string) => {
  const { error } = await supabase
    .from('assessment_templates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting assessment template:', error);
    throw error;
  }

  return true;
};

export const duplicateAssessmentTemplate = async (templateId: string, newTitle: string) => {
  const { data: originalTemplate, error: fetchError } = await supabase
    .from('assessment_templates')
    .select('*')
    .eq('id', templateId)
    .single();

  if (fetchError) {
    console.error('Error fetching original template:', fetchError);
    throw fetchError;
  }

  const duplicatedTemplate = {
    ...originalTemplate,
    title: newTitle,
    status: 'draft' as AssessmentTemplateStatus,
    created_at: undefined,
    updated_at: undefined,
    id: undefined
  };

  return createAssessmentTemplate(duplicatedTemplate);
};
