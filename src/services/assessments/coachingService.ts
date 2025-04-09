import { supabase } from '@/integrations/supabase/client';
import { CoachingRecommendation } from '@/types/assessments';

export const fetchCoachingRecommendations = async (userId: string) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .select('*, assessment_sessions(id, user_id, status, score, feedback, results, assessments(title, assessment_type))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching coaching recommendations:', error);
    throw error;
  }

  return data as CoachingRecommendation[];
};

export const updateCoachingRecommendationStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating coaching recommendation status:', error);
    throw error;
  }

  return data;
};

export const scheduleCoachingSession = async (id: string, coachId: string, scheduledDate: Date) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .update({
      coach_id: coachId,
      scheduled_date: scheduledDate.toISOString(),
      status: 'accepted',
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error scheduling coaching session:', error);
    throw error;
  }

  return data;
};

export const createCoachingRecommendation = async (sessionId: string, userId: string, reason: string) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .insert([{
      session_id: sessionId,
      user_id: userId,
      reason,
      status: 'pending'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating coaching recommendation:', error);
    throw error;
  }

  return data as CoachingRecommendation;
};

export const fetchCoachAssignments = async (coachId: string) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .select('*, assessment_sessions(id, user_id, status, score, feedback, results, assessments(title, assessment_type))')
    .eq('coach_id', coachId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching coach assignments:', error);
    throw error;
  }

  return data;
};
