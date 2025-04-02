
import { supabase } from '@/integrations/supabase/client';
import { AdvisorySession } from '@/types/careerAdvisory';

export const fetchAdvisorySessions = async (advisorId?: string, userId?: string) => {
  let query = supabase
    .from('advisory_sessions')
    .select(`
      *,
      career_advisors(
        id,
        specialization,
        user_profiles(full_name, avatar_url)
      ),
      candidate_profiles:profiles!advisory_sessions_user_id_fkey(
        full_name,
        avatar_url
      )
    `)
    .order('scheduled_date', { ascending: true });

  if (advisorId) {
    query = query.eq('advisor_id', advisorId);
  }

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching advisory sessions:', error);
    throw error;
  }

  return data as AdvisorySession[];
};

export const scheduleAdvisorySession = async (
  userId: string,
  advisorId: string, 
  scheduledDate: Date,
  topic: string,
  details: string
) => {
  const { data, error } = await supabase
    .from('advisory_sessions')
    .insert([{
      user_id: userId,
      advisor_id: advisorId,
      status: 'scheduled',
      scheduled_date: scheduledDate.toISOString(),
      topic,
      details
    }])
    .select()
    .single();

  if (error) {
    console.error('Error scheduling advisory session:', error);
    throw error;
  }

  return data as AdvisorySession;
};

export const updateAdvisorySession = async (sessionId: string, sessionData: Partial<AdvisorySession>) => {
  const { data, error } = await supabase
    .from('advisory_sessions')
    .update(sessionData)
    .eq('id', sessionId)
    .select()
    .single();

  if (error) {
    console.error('Error updating advisory session:', error);
    throw error;
  }

  return data as AdvisorySession;
};

export const initiateVideoCall = async (sessionId: string) => {
  try {
    // Get the HireVue API key
    const { data: apiKeysData } = await supabase
      .from('api_keys')
      .select('hirevue_api_key')
      .limit(1);

    const hirevueApiKey = apiKeysData?.[0]?.hirevue_api_key;
    
    if (!hirevueApiKey) {
      throw new Error('HireVue API key not found. Please add it in API keys settings.');
    }

    // Get session details
    const { data: sessionData } = await supabase
      .from('advisory_sessions')
      .select(`
        *,
        career_advisors(
          user_profiles(full_name, email)
        ),
        candidate_profiles:profiles!advisory_sessions_user_id_fkey(
          full_name, 
          email
        )
      `)
      .eq('id', sessionId)
      .single();

    if (!sessionData) {
      throw new Error('Session not found');
    }

    // In a real implementation, you would create a HireVue meeting
    // For this example, we'll simulate creating a meeting and return a URL
    
    // Update the session with the video call URL
    const mockMeetingUrl = `https://meet.hirevue.com/${sessionId}`;
    
    const { data, error } = await supabase
      .from('advisory_sessions')
      .update({
        video_call_url: mockMeetingUrl,
        status: 'in_progress'
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as AdvisorySession;
  } catch (error) {
    console.error('Error initiating video call:', error);
    throw error;
  }
};
