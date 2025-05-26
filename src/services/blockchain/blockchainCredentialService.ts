
import { supabase } from "@/integrations/supabase/client";
import { BlockchainCredential, CredentialIssueRequest, VerificationResult } from "@/types/blockchainCredentials";

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

      const blockchainCredential: BlockchainCredential = {
        ...credentialData,
        credential_hash: credentialHash,
        merkle_proof: merkleProof,
        block_number: Math.floor(Math.random() * 1000000) + 1,
        transaction_hash: `tx_${credentialHash}`,
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
      return data;
    } catch (error) {
      console.error('Error issuing blockchain credential:', error);
      throw error;
    }
  }

  async getUserCredentials(userId: string): Promise<BlockchainCredential[]> {
    try {
      const { data, error } = await supabase
        .from('blockchain_credentials')
        .select('*')
        .eq('recipient_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user credentials:', error);
      return [];
    }
  }

  async verifyCredential(credentialId: string): Promise<VerificationResult> {
    try {
      const { data: credential, error } = await supabase
        .from('blockchain_credentials')
        .select('*')
        .eq('id', credentialId)
        .single();

      if (error || !credential) {
        return {
          isValid: false,
          status: 'not_found',
          message: 'Credential not found'
        };
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

      return {
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
    } catch (error) {
      console.error('Error verifying credential:', error);
      return {
        isValid: false,
        status: 'error',
        message: 'Verification failed due to system error'
      };
    }
  }

  async revokeCredential(credentialId: string, reason: string): Promise<boolean> {
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

      return !error;
    } catch (error) {
      console.error('Error revoking credential:', error);
      return false;
    }
  }
}

export const blockchainCredentialService = new BlockchainCredentialService();
