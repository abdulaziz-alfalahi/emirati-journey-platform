
import { CertificationVerificationData, VerificationResponse } from "@/types/credentialVerification";
import { RateLimiter } from "../utils/rateLimiter";
import { DatabaseOperations } from "../utils/databaseOperations";
import { ExternalVerifier } from "../utils/externalVerifier";

export class CertificationVerifier {
  private rateLimiter = new RateLimiter();
  private dbOps = new DatabaseOperations();
  private externalVerifier = new ExternalVerifier();

  async verify(userId: string, data: CertificationVerificationData): Promise<VerificationResponse> {
    try {
      console.log("Initiating certification credential verification for user:", userId);
      
      // Check rate limiting
      await this.rateLimiter.checkRateLimit('emirates_id_authority');

      const request = await this.dbOps.createVerificationRequest(
        userId,
        'emirates_id_authority',
        'certification',
        data
      );

      const config = await this.externalVerifier.getDatabaseConfig('emirates_id_authority');
      if (!config) {
        throw new Error('Certification database configuration not found');
      }

      const verificationResult = await this.externalVerifier.performExternalVerification(
        config,
        'certification',
        data
      );

      if (verificationResult.success) {
        await this.dbOps.updateVerificationRequestStatus(request.id, 'verified', verificationResult.data);
        
        const credential = await this.dbOps.createVerifiedCredential(
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
        await this.dbOps.updateVerificationRequestStatus(request.id, 'failed', verificationResult.error);
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
}
