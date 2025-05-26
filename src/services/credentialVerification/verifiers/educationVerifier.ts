
import { EducationVerificationData, VerificationResponse } from "@/types/credentialVerification";
import { RateLimiter } from "../utils/rateLimiter";
import { DatabaseOperations } from "../utils/databaseOperations";
import { ExternalVerifier } from "../utils/externalVerifier";

export class EducationVerifier {
  private rateLimiter = new RateLimiter();
  private dbOps = new DatabaseOperations();
  private externalVerifier = new ExternalVerifier();

  async verify(userId: string, data: EducationVerificationData): Promise<VerificationResponse> {
    try {
      console.log("Initiating education credential verification for user:", userId);
      
      // Check rate limiting
      await this.rateLimiter.checkRateLimit('uae_education_ministry');

      // Create verification request
      const request = await this.dbOps.createVerificationRequest(
        userId,
        'uae_education_ministry',
        'education',
        data
      );

      // Get database configuration
      const config = await this.externalVerifier.getDatabaseConfig('uae_education_ministry');
      if (!config) {
        throw new Error('Education database configuration not found');
      }

      // Perform external verification
      const verificationResult = await this.externalVerifier.performExternalVerification(
        config,
        'education',
        data
      );

      // Update request status and create verified credential if successful
      if (verificationResult.success) {
        await this.dbOps.updateVerificationRequestStatus(request.id, 'verified', verificationResult.data);
        
        const credential = await this.dbOps.createVerifiedCredential(
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
        await this.dbOps.updateVerificationRequestStatus(request.id, 'failed', verificationResult.error);
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
}
