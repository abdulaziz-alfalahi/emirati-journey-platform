
import { supabase } from "@/integrations/supabase/client";
import { CredentialVerificationRequest, VerifiedCredential } from "@/types/credentialVerification";

export class DatabaseOperations {
  async createVerificationRequest(
    userId: string,
    databaseSource: string,
    verificationType: 'education' | 'employment' | 'certification',
    requestData: Record<string, any>
  ): Promise<CredentialVerificationRequest> {
    const { data, error } = await supabase
      .from('credential_verification_requests')
      .insert({
        user_id: userId,
        database_source: databaseSource,
        verification_type: verificationType,
        request_data: requestData,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      ...data,
      verification_type: data.verification_type as 'education' | 'employment' | 'certification',
      status: data.status as 'pending' | 'verified' | 'failed' | 'expired',
      request_data: (data.request_data as Record<string, any>) || {},
      response_data: (data.response_data as Record<string, any>) || undefined
    };
  }

  async updateVerificationRequestStatus(
    requestId: string,
    status: 'pending' | 'verified' | 'failed' | 'expired',
    responseData?: any
  ): Promise<void> {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (responseData) {
      updateData.response_data = responseData;
    }

    if (status === 'verified') {
      updateData.verified_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('credential_verification_requests')
      .update(updateData)
      .eq('id', requestId);

    if (error) throw error;
  }

  async createVerifiedCredential(
    userId: string,
    credentialType: 'education' | 'employment' | 'certification',
    institutionName: string,
    credentialTitle: string,
    issueDate: string,
    verificationSource: string,
    metadata?: Record<string, any>
  ): Promise<VerifiedCredential> {
    const { data, error } = await supabase
      .from('verified_credentials')
      .insert({
        user_id: userId,
        credential_type: credentialType,
        institution_name: institutionName,
        credential_title: credentialTitle,
        issue_date: issueDate,
        verification_source: verificationSource,
        metadata
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      ...data,
      credential_type: data.credential_type as 'education' | 'employment' | 'certification',
      verification_status: data.verification_status as 'active' | 'expired' | 'revoked',
      metadata: (data.metadata as Record<string, any>) || {}
    };
  }
}
