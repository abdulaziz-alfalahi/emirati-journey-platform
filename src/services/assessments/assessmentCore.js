
import { supabase } from '@/integrations/supabase/client';
import { Assessment } from '@/types/assessments';
import { mockAssessments } from './mockAssessments';

// Flag to determine whether to use mock data or real data
const USE_MOCK_DATA = true;

export const fetchAssessments = async () => {
  if (USE_MOCK_DATA) {
    return mockAssessments;
  }

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
  if (USE_MOCK_DATA) {
    const assessment = mockAssessments.find(a => a.id === id);
    if (!assessment) {
      throw new Error(`Assessment with ID ${id} not found`);
    }
    return assessment;
  }

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
  if (USE_MOCK_DATA) {
    const newAssessment: Assessment = {
      ...assessmentData,
      id: `ASSMT${String(mockAssessments.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: null
    };
    // In a real implementation, we would add this to the mock data
    // mockAssessments.push(newAssessment);
    return newAssessment;
  }

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
  if (USE_MOCK_DATA) {
    const index = mockAssessments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Assessment with ID ${id} not found`);
    }
    
    const updatedAssessment: Assessment = {
      ...mockAssessments[index],
      ...assessmentData,
      updated_at: new Date().toISOString()
    };
    
    // In a real implementation, we would update the mock data
    // mockAssessments[index] = updatedAssessment;
    
    return updatedAssessment;
  }

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
  if (USE_MOCK_DATA) {
    const index = mockAssessments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Assessment with ID ${id} not found`);
    }
    
    // In a real implementation, we would remove from mock data
    // mockAssessments.splice(index, 1);
    
    return true;
  }

  const { error } = await supabase
    .from('assessments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting assessment:', error);
    throw error;
  }

  return true;
};
