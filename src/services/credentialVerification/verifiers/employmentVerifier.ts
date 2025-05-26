
import { EmploymentVerificationData, VerificationResponse } from "@/types/credentialVerification";
import { RateLimiter } from "../utils/rateLimiter";
import { DatabaseOperations } from "../utils/databaseOperations";
import { ExternalVerifier } from "../utils/externalVerifier";

export class EmploymentVerifier {
  private rateLimiter = new RateLimiter();
  private dbOps = new DatabaseOperations();
  private externalVerifier = new ExternalVerifier();

  async verify(userId: string, data: EmploymentVerificationData): Promise<VerificationResponse> {
    try {
      console.log("Initiating employment credential verification for user:", userId);
      
      // Check rate limiting
      await this.rateLimiter.checkRateLimit('uae_employment_authority');

      const request = await this.dbOps.createVerificationRequest(
        userId,
        'uae_employment_authority',
        'employment',
        data
      );

      const config = await this.externalVerifier.getDatabaseConfig('uae_employment_authority');
      if (!config) {
        throw new Error('Employment database configuration not found');
      }

      const verificationResult = await this.externalVerifier.performExternalVerification(
        config,
        'employment',
        data
      );

      if (verificationResult.success) {
        await this.dbOps.updateVerificationRequestStatus(request.id, 'verified', verificationResult.data);
        
        const credential = await this.dbOps.createVerifiedCredential(
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
        await this.dbOps.updateVerificationRequestStatus(request.id, 'failed', verificationResult.error);
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
}
