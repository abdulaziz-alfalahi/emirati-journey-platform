
import { EmploymentVerificationData, VerificationResponse } from "@/types/credentialVerification";
import { RateLimiter } from "../utils/rateLimiter";
import { DatabaseOperations } from "../utils/databaseOperations";
import { ExternalVerifier } from "../utils/externalVerifier";
import { integrationLogger } from "../utils/integrationLogger";

export class EmploymentVerifier {
  private rateLimiter = new RateLimiter();
  private dbOps = new DatabaseOperations();
  private externalVerifier = new ExternalVerifier();
  private readonly serviceName = 'EmploymentVerifier';

  async verify(userId: string, data: EmploymentVerificationData): Promise<VerificationResponse> {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();

    try {
      integrationLogger.logInfo(
        this.serviceName,
        'verify',
        'Starting employment credential verification',
        {
          userId,
          requestId,
          additionalData: {
            employer: data.employer_name,
            position: data.job_title,
            startDate: data.start_date
          }
        }
      );

      // Check rate limiting
      try {
        await this.rateLimiter.checkRateLimit('uae_employment_authority');
        integrationLogger.logDebug(
          this.serviceName,
          'rate_limit_check',
          'Rate limit check passed',
          { userId, requestId }
        );
      } catch (rateLimitError) {
        integrationLogger.logError(
          this.serviceName,
          'rate_limit_check',
          'Rate limit exceeded for employment verification',
          rateLimitError,
          { userId, requestId }
        );
        throw rateLimitError;
      }

      // Create verification request
      let request;
      try {
        request = await this.dbOps.createVerificationRequest(
          userId,
          'uae_employment_authority',
          'employment',
          data
        );
        integrationLogger.logDebug(
          this.serviceName,
          'create_request',
          'Verification request created successfully',
          {
            userId,
            requestId,
            additionalData: { verificationRequestId: request.id }
          }
        );
      } catch (dbError) {
        integrationLogger.logError(
          this.serviceName,
          'create_request',
          'Failed to create verification request in database',
          dbError,
          { userId, requestId }
        );
        throw dbError;
      }

      // Get database configuration
      let config;
      try {
        config = await this.externalVerifier.getDatabaseConfig('uae_employment_authority');
        if (!config) {
          throw new Error('Employment database configuration not found');
        }
        integrationLogger.logDebug(
          this.serviceName,
          'get_config',
          'Database configuration retrieved successfully',
          { userId, requestId }
        );
      } catch (configError) {
        integrationLogger.logError(
          this.serviceName,
          'get_config',
          'Failed to retrieve database configuration',
          configError,
          { userId, requestId }
        );
        throw new Error('Employment database configuration not found');
      }

      // Perform external verification
      let verificationResult;
      try {
        verificationResult = await this.externalVerifier.performExternalVerification(
          config,
          'employment',
          data
        );
        integrationLogger.logInfo(
          this.serviceName,
          'external_verification',
          `External verification ${verificationResult.success ? 'succeeded' : 'failed'}`,
          {
            userId,
            requestId,
            duration: Date.now() - startTime,
            additionalData: {
              success: verificationResult.success,
              databaseSource: config.database_name
            }
          }
        );
      } catch (verificationError) {
        integrationLogger.logError(
          this.serviceName,
          'external_verification',
          'External verification service call failed',
          verificationError,
          { userId, requestId, duration: Date.now() - startTime }
        );
        throw verificationError;
      }

      // Update request status and create verified credential if successful
      if (verificationResult.success) {
        try {
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

          integrationLogger.logInfo(
            this.serviceName,
            'verification_complete',
            'Employment verification completed successfully',
            {
              userId,
              requestId,
              duration: Date.now() - startTime,
              additionalData: {
                credentialId: credential.id,
                employer: data.employer_name,
                position: data.job_title
              }
            }
          );

          return {
            success: true,
            data: credential,
            verification_id: request.id
          };
        } catch (dbUpdateError) {
          integrationLogger.logError(
            this.serviceName,
            'update_verification',
            'Failed to update verification status or create credential',
            dbUpdateError,
            { userId, requestId, duration: Date.now() - startTime }
          );
          throw dbUpdateError;
        }
      } else {
        try {
          await this.dbOps.updateVerificationRequestStatus(request.id, 'failed', verificationResult.error);
          
          integrationLogger.logWarning(
            this.serviceName,
            'verification_failed',
            'Employment verification failed - external source could not verify credentials',
            {
              userId,
              requestId,
              duration: Date.now() - startTime,
              additionalData: {
                reason: verificationResult.error,
                employer: data.employer_name
              }
            }
          );

          return {
            success: false,
            error: verificationResult.error || 'Verification failed',
            verification_id: request.id
          };
        } catch (dbUpdateError) {
          integrationLogger.logError(
            this.serviceName,
            'update_verification_failed',
            'Failed to update verification request status for failed verification',
            dbUpdateError,
            { userId, requestId, duration: Date.now() - startTime }
          );
          throw dbUpdateError;
        }
      }
    } catch (error) {
      integrationLogger.logError(
        this.serviceName,
        'verify',
        'Employment verification process failed with unexpected error',
        error,
        {
          userId,
          requestId,
          duration: Date.now() - startTime,
          additionalData: {
            employer: data.employer_name,
            position: data.job_title
          }
        }
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        verification_id: ''
      };
    }
  }
}
