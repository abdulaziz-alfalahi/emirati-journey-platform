
import { supabase } from "@/integrations/supabase/client";
import { AdvisorySession, ApiKeys } from "@/types/careerAdvisory";

export const getSessions = async (userId: string): Promise<AdvisorySession[]> => {
  try {
    const { data, error } = await supabase
      .from('advisory_sessions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data as AdvisorySession[];
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const getSessionById = async (id: string): Promise<AdvisorySession | null> => {
  try {
    const { data, error } = await supabase
      .from('advisory_sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as AdvisorySession;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

export const getAdvisorSessions = async (advisorId: string): Promise<AdvisorySession[]> => {
  try {
    const { data, error } = await supabase
      .from('advisory_sessions')
      .select('*')
      .eq('advisor_id', advisorId);

    if (error) throw error;
    return data as AdvisorySession[];
  } catch (error) {
    console.error("Error fetching advisor sessions:", error);
    throw error;
  }
};

export const createSession = async (
  session: Omit<AdvisorySession, "id" | "created_at" | "updated_at">
): Promise<AdvisorySession> => {
  try {
    const { data, error } = await supabase
      .from('advisory_sessions')
      .insert(session)
      .select()
      .single();

    if (error) throw error;
    return data as AdvisorySession;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const updateSession = async (
  id: string,
  session: Partial<Omit<AdvisorySession, "id" | "created_at" | "updated_at">>
): Promise<AdvisorySession> => {
  try {
    const { data, error } = await supabase
      .from('advisory_sessions')
      .update(session)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as AdvisorySession;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

export const deleteSession = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('advisory_sessions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
};

export const createVideoCallLink = async (sessionId: string): Promise<string> => {
  try {
    // Get HireVue API key
    const { data: apiKeysData, error: apiKeysError } = await supabase
      .from('api_keys')
      .select('hirevue_api_key')
      .single();
    
    if (apiKeysError || !apiKeysData?.hirevue_api_key) {
      console.error("Error fetching HireVue API key:", apiKeysError);
      throw new Error("HireVue API key not configured");
    }

    // This is a placeholder for actual HireVue API integration
    // In a real implementation, you would make an API call to HireVue to create a meeting
    const hirevueApiKey = apiKeysData.hirevue_api_key;
    const videoCallUrl = `https://hirevue.example.com/meeting/${sessionId}?key=${hirevueApiKey.substring(0, 5)}...`;
    
    // Update the session with the video call link
    await updateSession(sessionId, { video_call_url: videoCallUrl });
    
    return videoCallUrl;
  } catch (error) {
    console.error("Error creating video call link:", error);
    throw error;
  }
};
