
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { blockchainCredentialService } from '@/services/blockchain/blockchainCredentialService';
import { VerificationResult } from '@/types/blockchainCredentials';
import { Shield, Search, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

const CredentialVerification: React.FC = () => {
  const { toast } = useToast();
  const [credentialId, setCredentialId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleVerification = async () => {
    if (!credentialId.trim()) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a credential ID to verify',
        variant: 'destructive'
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await blockchainCredentialService.verifyCredential(credentialId.trim());
      setVerificationResult(result);
      
      if (result.isValid) {
        toast({
          title: 'Verification Successful',
          description: 'The credential is valid and verified on the blockchain'
        });
      } else {
        toast({
          title: 'Verification Failed',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Verification Error',
        description: 'An error occurred during verification',
        variant: 'destructive'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'invalid':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'revoked':
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      case 'not_found':
        return <XCircle className="h-6 w-6 text-gray-500" />;
      default:
        return <Clock className="h-6 w-6 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500';
      case 'invalid':
        return 'bg-red-500';
      case 'revoked':
        return 'bg-orange-500';
      case 'not_found':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Verify Digital Credential
          </CardTitle>
          <CardDescription>
            Enter a credential ID to verify its authenticity on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter credential ID (e.g., 123e4567-e89b-12d3-a456-426614174000)"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleVerification} 
              disabled={isVerifying}
              className="px-6"
            >
              {isVerifying ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {!isVerifying && <span className="ml-2">Verify</span>}
            </Button>
          </div>
        </CardContent>
      </Card>

      {verificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                {getStatusIcon(verificationResult.status)}
                <span className="ml-2">Verification Result</span>
              </span>
              <Badge 
                variant="outline" 
                className={`text-white ${getStatusColor(verificationResult.status)}`}
              >
                {verificationResult.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-medium mb-2">Verification Message</p>
              <p className="text-sm">{verificationResult.message}</p>
            </div>

            {verificationResult.credential && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Credential Title</label>
                    <p className="text-sm mt-1">{verificationResult.credential.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <p className="text-sm mt-1 capitalize">
                      {verificationResult.credential.credential_type.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Issued Date</label>
                    <p className="text-sm mt-1">
                      {new Date(verificationResult.credential.issued_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <p className="text-sm mt-1 capitalize">{verificationResult.credential.verification_status}</p>
                  </div>
                </div>

                {verificationResult.verificationDetails && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Blockchain Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="font-medium">Block Number</label>
                        <p className="font-mono">{verificationResult.verificationDetails.blockNumber}</p>
                      </div>
                      <div>
                        <label className="font-medium">Transaction Hash</label>
                        <p className="font-mono break-all">{verificationResult.verificationDetails.transactionHash}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="font-medium">Merkle Proof</label>
                        <div className="space-y-1 mt-1">
                          {verificationResult.verificationDetails.merkleProof.map((proof, index) => (
                            <p key={index} className="font-mono text-xs bg-muted p-2 rounded">
                              {proof}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How Verification Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-medium">Hash Verification</p>
                <p className="text-muted-foreground">The credential's digital fingerprint is verified against the blockchain record</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-medium">Merkle Proof Check</p>
                <p className="text-muted-foreground">Mathematical proof confirms the credential's inclusion in the blockchain</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-medium">Status Validation</p>
                <p className="text-muted-foreground">Confirms the credential hasn't been revoked or tampered with</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialVerification;
