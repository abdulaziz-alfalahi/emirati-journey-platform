
import { supabase } from "@/integrations/supabase/client";
import { ExternalDatabaseConfig } from "@/types/credentialVerification";
import { VerificationResult } from "../types";

export class ExternalVerifier {
  async getDatabaseConfig(databaseName: string): Promise<ExternalDatabaseConfig | null> {
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
    
    return {
      ...data,
      authentication_type: data.authentication_type as 'oauth' | 'api_key' | 'certificate'
    };
  }

  async performExternalVerification(
    config: ExternalDatabaseConfig,
    verificationType: string,
    data: any
  ): Promise<VerificationResult> {
    try {
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
}
