
import { supabase } from '@/integrations/supabase/client';
import { ApiKeyResponse } from './types';

/**
 * Fetch Affinda API key from Supabase
 * @returns Promise resolving to the API key
 */
export const getAffindaApiKey = async (): Promise<string | null> => {
  try {
    // Query for the affinda_api_key field
    const { data, error } = await supabase
      .from('api_keys')
      .select('affinda_api_key')
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching Affinda API key:', error);
      return null;
    }
    
    // Handle the case where data might be null
    const apiKeyResponse = data as ApiKeyResponse | null;
    
    // Return the API key if found
    return apiKeyResponse?.affinda_api_key || null;
  } catch (error) {
    console.error('Exception fetching Affinda API key:', error);
    return null;
  }
};
