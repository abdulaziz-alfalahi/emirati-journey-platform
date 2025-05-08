
import { supabase } from '@/integrations/supabase/client';
import { CoachingRecommendation } from '@/types/assessments';
import { mockCoachingRecommendations, getMockUserCoachingRecommendations } from './mockCoachingData';

// Flag to determine whether to use mock data
const USE_MOCK_DATA = true;

export const fetchCoachingRecommendations = async (sessionId?: string) => {
  if (USE_MOCK_DATA) {
    if (sessionId) {
      return mockCoachingRecommendations.filter(rec => rec.session_id === sessionId);
    }
    return mockCoachingRecommendations;
  }

  let query = supabase
    .from('coaching_recommendations')
    .select(`
      *,
      assessment_sessions (
        id,
        user_id,
        status,
        score,
        feedback,
        results,
        assessments (
          title,
          assessment_type
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (sessionId) {
    query = query.eq('session_id', sessionId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching coaching recommendations:', error);
    throw error;
  }

  return data as CoachingRecommendation[];
};

export const fetchUserCoachingRecommendations = async (userId: string) => {
  if (USE_MOCK_DATA) {
    return getMockUserCoachingRecommendations(userId);
  }

  const { data, error } = await supabase
    .from('coaching_recommendations')
    .select(`
      *,
      assessment_sessions (
        id,
        user_id,
        status,
        score,
        feedback,
        results,
        assessments (
          title,
          assessment_type
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user coaching recommendations:', error);
    throw error;
  }

  return data as CoachingRecommendation[];
};

export const createCoachingRecommendation = async (recommendationData: Omit<CoachingRecommendation, 'id' | 'created_at' | 'updated_at'>) => {
  if (USE_MOCK_DATA) {
    const newRecommendation: CoachingRecommendation = {
      ...recommendationData,
      id: `COACH${String(mockCoachingRecommendations.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: null
    };
    
    // In a real implementation, we would add to mock data
    // mockCoachingRecommendations.push(newRecommendation);
    
    return newRecommendation;
  }

  const { data, error } = await supabase
    .from('coaching_recommendations')
    .insert([recommendationData])
    .select()
    .single();

  if (error) {
    console.error('Error creating coaching recommendation:', error);
    throw error;
  }

  return data as CoachingRecommendation;
};

export const updateCoachingRecommendation = async (id: string, updateData: Partial<CoachingRecommendation>) => {
  if (USE_MOCK_DATA) {
    const index = mockCoachingRecommendations.findIndex(rec => rec.id === id);
    if (index === -1) {
      throw new Error(`Coaching recommendation with ID ${id} not found`);
    }
    
    const updatedRecommendation = {
      ...mockCoachingRecommendations[index],
      ...updateData,
      updated_at: new Date().toISOString()
    };
    
    // In a real implementation, we would update the mock data
    // mockCoachingRecommendations[index] = updatedRecommendation;
    
    return updatedRecommendation;
  }

  const { data, error } = await supabase
    .from('coaching_recommendations')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating coaching recommendation:', error);
    throw error;
  }

  return data as CoachingRecommendation;
};
