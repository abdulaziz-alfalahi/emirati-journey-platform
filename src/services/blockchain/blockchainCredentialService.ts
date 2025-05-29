
import { supabase } from "@/integrations/supabase/client";
import { BlockchainCredential, CredentialIssueRequest, VerificationResult } from "@/types/blockchainCredentials";
import { auditLogger } from "./auditLogger";

class BlockchainCredentialService {
  private generateCredentialHash(credential: any): string {
    // In a real implementation, this would use actual blockchain hashing
    const credentialString = JSON.stringify(credential);
    return btoa(credentialString + Date.now()).replace(/[^a-zA-Z0-9]/g, '');
  }

  private generateMerkleProof(credentialHash: string): string[] {
    // Simplified Merkle proof generation
    return [
      `proof_${credentialHash.substring(0, 10)}`,
      `root_${credentialHash.substring(10, 20)}`,
      `branch_${credentialHash.substring(20, 30)}`
    ];
  }

  async issueCredential(request: CredentialIssueRequest): Promise<BlockchainCredential> {
    try {
      // Log the start of credential issuance
      await auditLogger.logOperation({
        user_id: request.issuerId,
        operation_type: 'issue',
        operation_details: {
          action: `Initiating credential issuance for ${request.title}`,
          target: request.recipientId,
          metadata: {
            credential_type: request.credentialType,
            title: request.title,
            skills: request.skills
          },
          result: 'pending'
        }
      });

      const credentialData = {
        id: crypto.randomUUID(),
        recipient_id: request.recipientId,
        issuer_id: request.issuerId,
        credential_type: request.credentialType,
        title: request.title,
        description: request.description,
        issued_date: new Date().toISOString(),
        metadata: request.metadata || {},
        skills: request.skills || []
      };

      const credentialHash = this.generateCredentialHash(credentialData);
      const merkleProof = this.generateMerkleProof(credentialHash);
      const blockNumber = Math.floor(Math.random() * 1000000) + 1;
      const transactionHash = `tx_${credentialHash}`;

      const blockchainCredential: BlockchainCredential = {
        ...credentialData,
        credential_hash: credentialHash,
        merkle_proof: merkleProof,
        block_number: blockNumber,
        transaction_hash: transactionHash,
        verification_status: 'verified',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('blockchain_credentials')
        .insert(blockchainCredential)
        .select()
        .single();

      if (error) throw error;

      // Log successful credential issuance
      await auditLogger.logOperation({
        user_id: request.issuerId,
        credential_id: data.id,
        operation_type: 'issue',
        operation_details: {
          action: `Successfully issued credential: ${request.title}`,
          target: request.recipientId,
          metadata: {
            credential_id: data.id,
            credential_hash: credentialHash,
            block_number: blockNumber
          },
          result: 'success'
        },
        transaction_hash: transactionHash,
        block_number: blockNumber
      });

      return data;
    } catch (error) {
      // Log failed credential issuance
      await auditLogger.logOperation({
        user_id: request.issuerId,
        operation_type: 'issue',
        operation_details: {
          action: `Failed to issue credential: ${request.title}`,
          target: request.recipientId,
          metadata: {
            credential_type: request.credentialType,
            error: error instanceof Error ? error.message : 'Unknown error'
          },
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      console.error('Error issuing blockchain credential:', error);
      throw error;
    }
  }

  async getUserCredentials(userId: string): Promise<BlockchainCredential[]> {
    try {
      // Log credential retrieval
      await auditLogger.logOperation({
        user_id: userId,
        operation_type: 'view',
        operation_details: {
          action: 'Retrieved user credentials from digital wallet',
          result: 'success'
        }
      });

      const { data, error } = await supabase
        .from('blockchain_credentials')
        .select('*')
        .eq('recipient_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      await auditLogger.logOperation({
        user_id: userId,
        operation_type: 'view',
        operation_details: {
          action: 'Failed to retrieve user credentials',
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      console.error('Error fetching user credentials:', error);
      return [];
    }
  }

  async verifyCredential(credentialId: string, verifierUserId?: string): Promise<VerificationResult> {
    try {
      // Log verification attempt
      if (verifierUserId) {
        await auditLogger.logOperation({
          user_id: verifierUserId,
          credential_id: credentialId,
          operation_type: 'verify',
          operation_details: {
            action: `Initiating verification for credential ${credentialId}`,
            result: 'pending'
          }
        });
      }

      const { data: credential, error } = await supabase
        .from('blockchain_credentials')
        .select('*')
        .eq('id', credentialId)
        .single();

      if (error || !credential) {
        const result = {
          isValid: false,
          status: 'not_found' as const,
          message: 'Credential not found'
        };

        if (verifierUserId) {
          await auditLogger.logOperation({
            user_id: verifierUserId,
            credential_id: credentialId,
            operation_type: 'verify',
            operation_details: {
              action: `Verification failed - credential not found`,
              result: 'failure',
              error_message: 'Credential not found in blockchain'
            }
          });
        }

        return result;
      }

      // Verify hash integrity
      const expectedHash = this.generateCredentialHash({
        id: credential.id,
        recipient_id: credential.recipient_id,
        issuer_id: credential.issuer_id,
        credential_type: credential.credential_type,
        title: credential.title,
        description: credential.description,
        issued_date: credential.issued_date,
        metadata: credential.metadata,
        skills: credential.skills
      });

      const isValid = expectedHash === credential.credential_hash;
      const result: VerificationResult = {
        isValid,
        status: isValid ? 'verified' : 'invalid',
        message: isValid ? 'Credential is valid and verified' : 'Credential hash verification failed',
        credential: isValid ? credential : undefined,
        verificationDetails: {
          blockNumber: credential.block_number,
          transactionHash: credential.transaction_hash,
          merkleProof: credential.merkle_proof,
          verifiedAt: new Date().toISOString()
        }
      };

      // Log verification result
      if (verifierUserId) {
        await auditLogger.logOperation({
          user_id: verifierUserId,
          credential_id: credentialId,
          operation_type: 'verify',
          operation_details: {
            action: `Verification ${isValid ? 'successful' : 'failed'} for credential ${credential.title}`,
            metadata: {
              credential_title: credential.title,
              verification_status: credential.verification_status,
              block_number: credential.block_number,
              hash_valid: isValid
            },
            result: isValid ? 'success' : 'failure'
          },
          transaction_hash: credential.transaction_hash,
          block_number: credential.block_number
        });
      }

      return result;
    } catch (error) {
      if (verifierUserId) {
        await auditLogger.logOperation({
          user_id: verifierUserId,
          credential_id: credentialId,
          operation_type: 'verify',
          operation_details: {
            action: 'Verification failed due to system error',
            result: 'failure',
            error_message: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }

      console.error('Error verifying credential:', error);
      return {
        isValid: false,
        status: 'error',
        message: 'Verification failed due to system error'
      };
    }
  }

  async revokeCredential(credentialId: string, reason: string, revokerUserId: string): Promise<boolean> {
    try {
      // Log revocation attempt
      await auditLogger.logOperation({
        user_id: revokerUserId,
        credential_id: credentialId,
        operation_type: 'revoke',
        operation_details: {
          action: `Initiating credential revocation`,
          metadata: {
            revocation_reason: reason
          },
          result: 'pending'
        }
      });

      const { error } = await supabase
        .from('blockchain_credentials')
        .update({
          verification_status: 'revoked',
          revocation_reason: reason,
          revoked_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', credentialId);

      const success = !error;

      // Log revocation result
      await auditLogger.logOperation({
        user_id: revokerUserId,
        credential_id: credentialId,
        operation_type: 'revoke',
        operation_details: {
          action: success ? 'Credential successfully revoked' : 'Failed to revoke credential',
          metadata: {
            revocation_reason: reason,
            revoked_at: new Date().toISOString()
          },
          result: success ? 'success' : 'failure',
          error_message: error?.message
        }
      });

      return success;
    } catch (error) {
      await auditLogger.logOperation({
        user_id: revokerUserId,
        credential_id: credentialId,
        operation_type: 'revoke',
        operation_details: {
          action: 'Revocation failed due to system error',
          metadata: {
            revocation_reason: reason
          },
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      console.error('Error revoking credential:', error);
      return false;
    }
  }
}

export const blockchainCredentialService = new BlockchainCredentialService();
