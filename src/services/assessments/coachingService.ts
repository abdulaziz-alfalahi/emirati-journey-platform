
import { supabase } from '@/integrations/supabase/client';
import { CoachingRecommendation } from '@/types/assessments';

export const recommendCoaching = async (sessionId: string, userId: string, reason: string) => {
  // First, create the coaching recommendation
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .insert([{
      session_id: sessionId,
      user_id: userId,
      reason: reason,
      status: 'pending'
    }] as any)
    .select()
    .single();

  if (error) {
    console.error('Error recommending coaching:', error);
    throw error;
  }

  // Then update the assessment session to mark that coaching was recommended
  await supabase
    .from('assessment_sessions')
    .update({ 
      coaching_recommended: true,
      coaching_notes: reason
    } as any)
    .eq('id', sessionId);

  return data as unknown as CoachingRecommendation;
};

export const fetchCoachingRecommendations = async (userId: string) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .select(`
      *,
      assessment_sessions(
        id, 
        status, 
        score,
        assessments(title, assessment_type)
      )
    `) as any;

  if (error) {
    console.error('Error fetching coaching recommendations:', error);
    throw error;
  }

  return data as unknown as CoachingRecommendation[];
};

export const acceptCoachingRecommendation = async (
  recommendationId: string, 
  coachId: string, 
  scheduledDate: Date
) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .update({
      status: 'accepted',
      coach_id: coachId,
      scheduled_date: scheduledDate.toISOString()
    } as any)
    .eq('id', recommendationId)
    .select()
    .single();

  if (error) {
    console.error('Error accepting coaching recommendation:', error);
    throw error;
  }

  return data as unknown as CoachingRecommendation;
};

export const fetchCoachAssignments = async (coachId: string) => {
  const { data, error } = await supabase
    .from('coaching_recommendations')
    .select(`
      *,
      assessment_sessions(
        id,
        user_id,
        status,
        score,
        feedback,
        results,
        assessments(title, assessment_type)
      )
    `)
    .eq('coach_id', coachId)
    .eq('status', 'accepted')
    .order('scheduled_date', { ascending: true }) as any;

  if (error) {
    console.error('Error fetching coach assignments:', error);
    throw error;
  }

  return data as unknown as CoachingRecommendation[];
};
