
import { supabase } from "@/integrations/supabase/client";
import { BlockchainCredential } from "@/types/blockchainCredentials";
import { auditLogger } from "./auditLogger";

export interface BatchOperationResult {
  successful: string[];
  failed: { id: string; error: string }[];
  totalProcessed: number;
}

export interface BatchDownloadResult extends BatchOperationResult {
  downloadUrl?: string;
}

class BatchCredentialService {
  async batchDownload(credentialIds: string[], userId: string): Promise<BatchDownloadResult> {
    const result: BatchDownloadResult = {
      successful: [],
      failed: [],
      totalProcessed: credentialIds.length
    };

    try {
      // Fetch all credentials
      const { data: credentials, error } = await supabase
        .from('blockchain_credentials')
        .select('*')
        .in('id', credentialIds)
        .eq('recipient_id', userId);

      if (error) throw error;

      const validCredentials: BlockchainCredential[] = [];
      
      for (const id of credentialIds) {
        const credential = credentials?.find(c => c.id === id);
        if (credential) {
          validCredentials.push(credential);
          result.successful.push(id);
        } else {
          result.failed.push({ id, error: 'Credential not found' });
        }
      }

      if (validCredentials.length > 0) {
        // Create batch download package
        const batchData = {
          credentials: validCredentials,
          downloaded_at: new Date().toISOString(),
          batch_id: crypto.randomUUID(),
          download_format: 'JSON'
        };

        const blob = new Blob([JSON.stringify(batchData, null, 2)], {
          type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        result.downloadUrl = url;

        // Log batch download
        await auditLogger.logOperation({
          user_id: userId,
          operation_type: 'download',
          operation_details: {
            action: `Batch downloaded ${validCredentials.length} credentials`,
            metadata: {
              credential_count: validCredentials.length,
              successful_downloads: result.successful.length,
              failed_downloads: result.failed.length,
              batch_id: batchData.batch_id
            },
            result: 'success'
          }
        });
      }

      return result;
    } catch (error) {
      await auditLogger.logOperation({
        user_id: userId,
        operation_type: 'download',
        operation_details: {
          action: 'Batch download failed',
          metadata: {
            credential_count: credentialIds.length
          },
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      throw error;
    }
  }

  async batchShare(credentialIds: string[], userId: string): Promise<BatchOperationResult> {
    const result: BatchOperationResult = {
      successful: [],
      failed: [],
      totalProcessed: credentialIds.length
    };

    try {
      const shareLinks: string[] = [];

      for (const credentialId of credentialIds) {
        try {
          const shareUrl = `${window.location.origin}/blockchain-credentials/verify?id=${credentialId}`;
          shareLinks.push(`${credentialId}: ${shareUrl}`);
          result.successful.push(credentialId);
        } catch (error) {
          result.failed.push({ 
            id: credentialId, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
        }
      }

      if (shareLinks.length > 0) {
        const shareText = `Verify my blockchain credentials:\n\n${shareLinks.join('\n')}`;
        
        if (navigator.share) {
          await navigator.share({
            title: `${shareLinks.length} Blockchain Credentials`,
            text: shareText
          });
        } else {
          await navigator.clipboard.writeText(shareText);
        }

        // Log batch share
        await auditLogger.logOperation({
          user_id: userId,
          operation_type: 'share',
          operation_details: {
            action: `Batch shared ${result.successful.length} credentials`,
            metadata: {
              credential_count: result.successful.length,
              share_method: navigator.share ? 'native_share' : 'clipboard'
            },
            result: 'success'
          }
        });
      }

      return result;
    } catch (error) {
      await auditLogger.logOperation({
        user_id: userId,
        operation_type: 'share',
        operation_details: {
          action: 'Batch share failed',
          metadata: {
            credential_count: credentialIds.length
          },
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      throw error;
    }
  }

  async batchRevoke(credentialIds: string[], reason: string, revokerUserId: string): Promise<BatchOperationResult> {
    const result: BatchOperationResult = {
      successful: [],
      failed: [],
      totalProcessed: credentialIds.length
    };

    try {
      for (const credentialId of credentialIds) {
        try {
          const { error } = await supabase
            .from('blockchain_credentials')
            .update({
              verification_status: 'revoked',
              revocation_reason: reason,
              revoked_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', credentialId);

          if (error) {
            result.failed.push({ id: credentialId, error: error.message });
          } else {
            result.successful.push(credentialId);
          }
        } catch (error) {
          result.failed.push({ 
            id: credentialId, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
        }
      }

      // Log batch revocation
      await auditLogger.logOperation({
        user_id: revokerUserId,
        operation_type: 'revoke',
        operation_details: {
          action: `Batch revoked ${result.successful.length} credentials`,
          metadata: {
            revocation_reason: reason,
            credential_count: credentialIds.length,
            successful_revocations: result.successful.length,
            failed_revocations: result.failed.length
          },
          result: result.successful.length > 0 ? 'success' : 'failure'
        }
      });

      return result;
    } catch (error) {
      await auditLogger.logOperation({
        user_id: revokerUserId,
        operation_type: 'revoke',
        operation_details: {
          action: 'Batch revocation failed',
          metadata: {
            revocation_reason: reason,
            credential_count: credentialIds.length
          },
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      throw error;
    }
  }
}

export const batchCredentialService = new BatchCredentialService();
