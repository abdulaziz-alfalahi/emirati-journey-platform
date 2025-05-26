import { supabase } from "@/integrations/supabase/client";
import {
  CredentialVerificationRequest,
  VerifiedCredential,
  EducationVerificationData,
  EmploymentVerificationData,
  CertificationVerificationData,
  VerificationResponse,
  ExternalDatabaseConfig
} from "@/types/credentialVerification";

class CredentialVerificationService {
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  async verifyEducationCredentials(
    userId: string,
    data: EducationVerificationData
  ): Promise<VerificationResponse> {
    try {
      console.log("Initiating education credential verification for user:", userId);
      
      // Create verification request
      const request = await this.createVerificationRequest(
        userId,
        'uae_education_ministry',
        'education',
        data
      );

      // Get database configuration
      const config = await this.getDatabaseConfig('uae_education_ministry');
      if (!config) {
        throw new Error('Education database configuration not found');
      }

      // Perform external verification
      const verificationResult = await this.performExternalVerification(
        config,
        'education',
        data
      );

      // Update request status and create verified credential if successful
      if (verificationResult.success) {
        await this.updateVerificationRequestStatus(request.id, 'verified', verificationResult.data);
        
        const credential = await this.createVerifiedCredential(
          userId,
          'education',
          data.institution_name,
          `${data.degree_type} in ${data.field_of_study}`,
          data.graduation_year.toString(),
          'uae_education_ministry',
          verificationResult.data
        );

        return {
          success: true,
          data: credential,
          verification_id: request.id
        };
      } else {
        await this.updateVerificationRequestStatus(request.id, 'failed', verificationResult.error);
        return {
          success: false,
          error: verificationResult.error || 'Verification failed',
          verification_id: request.id
        };
      }
    } catch (error) {
      console.error("Education verification error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        verification_id: ''
      };
    }
  }

  async verifyEmploymentCredentials(
    userId: string,
    data: EmploymentVerificationData
  ): Promise<VerificationResponse> {
    try {
      console.log("Initiating employment credential verification for user:", userId);
      
      const request = await this.createVerificationRequest(
        userId,
        'uae_employment_authority',
        'employment',
        data
      );

      const config = await this.getDatabaseConfig('uae_employment_authority');
      if (!config) {
        throw new Error('Employment database configuration not found');
      }

      const verificationResult = await this.performExternalVerification(
        config,
        'employment',
        data
      );

      if (verificationResult.success) {
        await this.updateVerificationRequestStatus(request.id, 'verified', verificationResult.data);
        
        const credential = await this.createVerifiedCredential(
          userId,
          'employment',
          data.employer_name,
          data.job_title,
          data.start_date,
          'uae_employment_authority',
          verificationResult.data
        );

        return {
          success: true,
          data: credential,
          verification_id: request.id
        };
      } else {
        await this.updateVerificationRequestStatus(request.id, 'failed', verificationResult.error);
        return {
          success: false,
          error: verificationResult.error || 'Verification failed',
          verification_id: request.id
        };
      }
    } catch (error) {
      console.error("Employment verification error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        verification_id: ''
      };
    }
  }

  async verifyCertificationCredentials(
    userId: string,
    data: CertificationVerificationData
  ): Promise<VerificationResponse> {
    try {
      console.log("Initiating certification credential verification for user:", userId);
      
      const request = await this.createVerificationRequest(
        userId,
        'emirates_id_authority',
        'certification',
        data
      );

      const config = await this.getDatabaseConfig('emirates_id_authority');
      if (!config) {
        throw new Error('Certification database configuration not found');
      }

      const verificationResult = await this.performExternalVerification(
        config,
        'certification',
        data
      );

      if (verificationResult.success) {
        await this.updateVerificationRequestStatus(request.id, 'verified', verificationResult.data);
        
        const credential = await this.createVerifiedCredential(
          userId,
          'certification',
          data.issuing_organization,
          data.certification_name,
          data.issue_date,
          'emirates_id_authority',
          verificationResult.data
        );

        return {
          success: true,
          data: credential,
          verification_id: request.id
        };
      } else {
        await this.updateVerificationRequestStatus(request.id, 'failed', verificationResult.error);
        return {
          success: false,
          error: verificationResult.error || 'Verification failed',
          verification_id: request.id
        };
      }
    } catch (error) {
      console.error("Certification verification error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        verification_id: ''
      };
    }
  }

  async getUserVerifiedCredentials(userId: string): Promise<VerifiedCredential[]> {
    try {
      const { data, error } = await supabase
        .from('verified_credentials')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type assertion to ensure the data matches our expected types
      return (data || []).map(item => ({
        ...item,
        credential_type: item.credential_type as 'education' | 'employment' | 'certification',
        verification_status: item.verification_status as 'active' | 'expired' | 'revoked',
        metadata: (item.metadata as Record<string, any>) || {}
      }));
    } catch (error) {
      console.error("Error fetching user credentials:", error);
      return [];
    }
  }

  async getUserVerificationRequests(userId: string): Promise<CredentialVerificationRequest[]> {
    try {
      const { data, error } = await supabase
        .from('credential_verification_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type assertion to ensure the data matches our expected types
      return (data || []).map(item => ({
        ...item,
        verification_type: item.verification_type as 'education' | 'employment' | 'certification',
        status: item.status as 'pending' | 'verified' | 'failed' | 'expired',
        request_data: (item.request_data as Record<string, any>) || {},
        response_data: (item.response_data as Record<string, any>) || undefined
      }));
    } catch (error) {
      console.error("Error fetching verification requests:", error);
      return [];
    }
  }

  private async createVerificationRequest(
    userId: string,
    databaseSource: string,
    verificationType: 'education' | 'employment' | 'certification',
    requestData: Record<string, any>
  ): Promise<CredentialVerificationRequest> {
    // Check rate limiting
    await this.checkRateLimit(databaseSource);

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
    
    // Type assertion for the response
    return {
      ...data,
      verification_type: data.verification_type as 'education' | 'employment' | 'certification',
      status: data.status as 'pending' | 'verified' | 'failed' | 'expired',
      request_data: (data.request_data as Record<string, any>) || {},
      response_data: (data.response_data as Record<string, any>) || undefined
    };
  }

  private async updateVerificationRequestStatus(
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

  private async createVerifiedCredential(
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
    
    // Type assertion for the response
    return {
      ...data,
      credential_type: data.credential_type as 'education' | 'employment' | 'certification',
      verification_status: data.verification_status as 'active' | 'expired' | 'revoked',
      metadata: (data.metadata as Record<string, any>) || {}
    };
  }

  private async getDatabaseConfig(databaseName: string): Promise<ExternalDatabaseConfig | null> {
    const { data, error } = await supabase
      .from('external_database_configs')
      .select('*')
      .eq('database_name', databaseName)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error(`Error fetching config for ${databaseName}:`, error);
      return null;
    }
    
    // Type assertion for the response
    return {
      ...data,
      authentication_type: data.authentication_type as 'oauth' | 'api_key' | 'certificate'
    };
  }

  private async performExternalVerification(
    config: ExternalDatabaseConfig,
    verificationType: string,
    data: any
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Since we don't have real UAE government APIs yet, we'll simulate the verification
      // In production, this would make actual HTTP requests to government databases
      
      console.log(`Simulating ${verificationType} verification with ${config.database_name}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Simulate verification logic based on data
      const isValid = this.simulateVerification(verificationType, data);
      
      if (isValid) {
        return {
          success: true,
          data: {
            verified: true,
            verification_date: new Date().toISOString(),
            source: config.database_name,
            details: data
          }
        };
      } else {
        return {
          success: false,
          error: 'Credentials could not be verified with external database'
        };
      }
    } catch (error) {
      console.error("External verification error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'External verification failed'
      };
    }
  }

  private simulateVerification(verificationType: string, data: any): boolean {
    // Simulate verification logic - in production this would be real API calls
    // For now, we'll use simple validation rules
    
    switch (verificationType) {
      case 'education':
        return data.emirates_id && data.institution_name && data.degree_type && data.graduation_year;
      case 'employment':
        return data.emirates_id && data.employer_name && data.job_title && data.start_date;
      case 'certification':
        return data.emirates_id && data.certification_name && data.issuing_organization && data.certification_number;
      default:
        return false;
    }
  }

  private async checkRateLimit(databaseSource: string): Promise<void> {
    const config = await this.getDatabaseConfig(databaseSource);
    if (!config) throw new Error('Database configuration not found');

    const now = Date.now();
    const key = `${databaseSource}`;
    const limit = config.rate_limit_per_minute;
    
    const current = this.rateLimitMap.get(key);
    
    if (!current || now > current.resetTime) {
      // Reset rate limit window
      this.rateLimitMap.set(key, { count: 1, resetTime: now + 60000 });
      return;
    }
    
    if (current.count >= limit) {
      throw new Error(`Rate limit exceeded for ${databaseSource}. Please try again later.`);
    }
    
    current.count++;
  }
}

export const credentialVerificationService = new CredentialVerificationService();
