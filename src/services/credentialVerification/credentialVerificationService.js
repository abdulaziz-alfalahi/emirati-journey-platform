import { supabase } from '@/integrations/supabase/client';
import {
  EducationVerificationData,
  EmploymentVerificationData,
  CertificationVerificationData,
  VerificationResponse
} from '@/types/credentialVerification';

class CredentialVerificationService {
  async verifyEducationCredentials(
    userId: string,
    data: EducationVerificationData
  ): Promise<VerificationResponse> {
    try {
      const { data: result, error } = await supabase.functions.invoke('verify-credentials', {
        body: {
          type: 'education',
          userId,
          data
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async verifyEmploymentCredentials(
    userId: string,
    data: EmploymentVerificationData
  ): Promise<VerificationResponse> {
    try {
      const { data: result, error } = await supabase.functions.invoke('verify-credentials', {
        body: {
          type: 'employment',
          userId,
          data
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async verifyCertificationCredentials(
    userId: string,
    data: CertificationVerificationData
  ): Promise<VerificationResponse> {
    try {
      const { data: result, error } = await supabase.functions.invoke('verify-credentials', {
        body: {
          type: 'certification',
          userId,
          data
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getUserVerifiedCredentials(userId: string) {
    const { data, error } = await supabase
      .from('verified_credentials')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  }

  async getUserVerificationRequests(userId: string) {
    const { data, error } = await supabase
      .from('credential_verification_requests')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  }
}

export const credentialVerificationService = new CredentialVerificationService();