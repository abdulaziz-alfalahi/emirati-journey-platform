
import { supabase } from '@/integrations/supabase/client';
import { Assessment, AssessmentSession } from '@/types/assessments';

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

export const fetchAssessmentSessions = async (assessmentId?: string) => {
  let query = supabase
    .from('assessment_sessions')
    .select('*, assessments(title, assessment_type)')
    .order('created_at', { ascending: false });
    
  if (assessmentId) {
    query = query.eq('assessment_id', assessmentId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching assessment sessions:', error);
    throw error;
  }

  return data as AssessmentSession[];
};

export const fetchUserAssessmentSessions = async (userId: string) => {
  const { data, error } = await supabase
    .from('assessment_sessions')
    .select('*, assessments(title, assessment_type)')
    .eq('user_id', userId)
    .order('scheduled_date', { ascending: true });

  if (error) {
    console.error('Error fetching user assessment sessions:', error);
    throw error;
  }

  return data as AssessmentSession[];
};

export const scheduleAssessment = async (assessmentId: string, userId: string, scheduledDate: Date) => {
  const { data, error } = await supabase
    .from('assessment_sessions')
    .insert([{
      assessment_id: assessmentId,
      user_id: userId,
      status: 'scheduled',
      scheduled_date: scheduledDate.toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error scheduling assessment:', error);
    throw error;
  }

  return data as AssessmentSession;
};

export const updateAssessmentSession = async (sessionId: string, sessionData: Partial<AssessmentSession>) => {
  const { data, error } = await supabase
    .from('assessment_sessions')
    .update(sessionData)
    .eq('id', sessionId)
    .select()
    .single();

  if (error) {
    console.error('Error updating assessment session:', error);
    throw error;
  }

  return data as AssessmentSession;
};
