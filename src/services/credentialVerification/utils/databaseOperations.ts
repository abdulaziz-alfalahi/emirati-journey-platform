
import { supabase } from "@/integrations/supabase/client";
import { retryMechanism } from "./retryMechanism";
import { integrationLogger } from "./integrationLogger";
import { VerifiedCredential } from "@/types/credentialVerification";

export class DatabaseOperations {
  async createVerificationRequest(
    userId: string,
    databaseSource: string,
    verificationType: string,
    requestData: any
  ) {
    const operation = async () => {
      const { data, error } = await supabase
        .from('credential_verification_requests')
        .insert({
          user_id: userId,
          database_source: databaseSource,
          verification_type: verificationType,
          request_data: requestData,
          status: 'pending',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create verification request: ${error.message}`);
      }

      return data;
    };

    const result = await retryMechanism.executeWithRetry(
      operation,
      `createVerificationRequest-${verificationType}`,
      {
        maxRetries: 2,
        baseDelayMs: 500,
        retryableErrors: ['NETWORK_ERROR', 'TIMEOUT', 'CONNECTION_REFUSED']
      }
    );

    if (result.success) {
      integrationLogger.logDebug(
        'DatabaseOperations',
        'createVerificationRequest',
        'Verification request created successfully',
        {
          additionalData: { 
            requestId: result.data?.id,
            attempts: result.attempts,
            duration: result.totalDuration
          }
        }
      );
      return result.data!;
    } else {
      integrationLogger.logError(
        'DatabaseOperations',
        'createVerificationRequest',
        'Failed to create verification request',
        result.error,
        {
          additionalData: { 
            attempts: result.attempts,
            duration: result.totalDuration
          }
        }
      );
      throw result.error!;
    }
  }

  async updateVerificationRequestStatus(
    requestId: string,
    status: 'verified' | 'failed',
    responseData?: any
  ) {
    const operation = async () => {
      const updateData: any = {
        status,
        response_data: responseData,
        updated_at: new Date().toISOString()
      };

      if (status === 'verified') {
        updateData.verified_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('credential_verification_requests')
        .update(updateData)
        .eq('id', requestId);

      if (error) {
        throw new Error(`Failed to update verification request: ${error.message}`);
      }

      return true;
    };

    const result = await retryMechanism.executeWithRetry(
      operation,
      `updateVerificationRequestStatus-${requestId}`,
      {
        maxRetries: 2,
        baseDelayMs: 500,
        retryableErrors: ['NETWORK_ERROR', 'TIMEOUT', 'CONNECTION_REFUSED']
      }
    );

    if (result.success) {
      integrationLogger.logDebug(
        'DatabaseOperations',
        'updateVerificationRequestStatus',
        `Verification request updated to ${status}`,
        {
          additionalData: { 
            requestId,
            attempts: result.attempts,
            duration: result.totalDuration
          }
        }
      );
      return result.data!;
    } else {
      integrationLogger.logError(
        'DatabaseOperations',
        'updateVerificationRequestStatus',
        'Failed to update verification request status',
        result.error,
        {
          additionalData: { 
            requestId,
            attempts: result.attempts,
            duration: result.totalDuration
          }
        }
      );
      throw result.error!;
    }
  }

  async createVerifiedCredential(
    userId: string,
    credentialType: string,
    institutionName: string,
    credentialTitle: string,
    issueDate: string,
    verificationSource: string,
    metadata: any
  ): Promise<VerifiedCredential> {
    const operation = async () => {
      const { data, error } = await supabase
        .from('verified_credentials')
        .insert({
          user_id: userId,
          credential_type: credentialType,
          institution_name: institutionName,
          credential_title: credentialTitle,
          issue_date: issueDate,
          verification_source: verificationSource,
          verification_status: 'active',
          metadata: metadata
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create verified credential: ${error.message}`);
      }

      return data;
    };

    const result = await retryMechanism.executeWithRetry(
      operation,
      `createVerifiedCredential-${credentialType}`,
      {
        maxRetries: 2,
        baseDelayMs: 500,
        retryableErrors: ['NETWORK_ERROR', 'TIMEOUT', 'CONNECTION_REFUSED']
      }
    );

    if (result.success) {
      integrationLogger.logDebug(
        'DatabaseOperations',
        'createVerifiedCredential',
        'Verified credential created successfully',
        {
          additionalData: { 
            credentialId: result.data?.id,
            credentialType,
            attempts: result.attempts,
            duration: result.totalDuration
          }
        }
      );
      
      // Cast the database result to match the VerifiedCredential interface
      const credential: VerifiedCredential = {
        ...result.data!,
        credential_type: result.data!.credential_type as 'education' | 'employment' | 'certification',
        verification_status: result.data!.verification_status as 'active' | 'expired' | 'revoked',
        metadata: (result.data!.metadata as Record<string, any>) || {}
      };
      
      return credential;
    } else {
      integrationLogger.logError(
        'DatabaseOperations',
        'createVerifiedCredential',
        'Failed to create verified credential',
        result.error,
        {
          additionalData: { 
            credentialType,
            attempts: result.attempts,
            duration: result.totalDuration
          }
        }
      );
      throw result.error!;
    }
  }
}
