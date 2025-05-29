
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar,
  Hash,
  Building2,
  Award
} from 'lucide-react';
import { blockchainCredentialService } from '@/services/blockchain/blockchainCredentialService';
import { auditLogger } from '@/services/blockchain/auditLogger';
import { VerificationResult } from '@/types/blockchainCredentials';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const CredentialVerification: React.FC = () => {
  const { user } = useAuth();
  const [credentialId, setCredentialId] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async () => {
    if (!credentialId.trim()) {
      toast.error('Please enter a credential ID');
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const result = await blockchainCredentialService.verifyCredential(
        credentialId.trim(),
        user?.id
      );
      
      setVerificationResult(result);
      
      if (result.isValid) {
        toast.success('Credential verified successfully');
      } else {
        toast.error('Credential verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed due to system error');
      
      if (user) {
        await auditLogger.logOperation({
          user_id: user.id,
          credential_id: credentialId.trim(),
          operation_type: 'verify',
          operation_details: {
            action: 'Verification failed due to system error',
            result: 'failure',
            error_message: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const getVerificationIcon = (result: VerificationResult) => {
    if (result.isValid) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    } else if (result.status === 'not_found') {
      return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
    } else {
      return <XCircle className="h-6 w-6 text-red-600" />;
    }
  };

  const getVerificationColor = (result: VerificationResult) => {
    if (result.isValid) return 'border-green-200 bg-green-50';
    if (result.status === 'not_found') return 'border-yellow-200 bg-yellow-50';
    return 'border-red-200 bg-red-50';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Verify Blockchain Credential
          </CardTitle>
          <CardDescription>
            Enter a credential ID to verify its authenticity on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter credential ID (e.g., 123e4567-e89b-12d3-a456-426614174000)"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
            />
            <Button 
              onClick={handleVerification} 
              disabled={isVerifying || !credentialId.trim()}
            >
              {isVerifying ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Verify
            </Button>
          </div>

          {isVerifying && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Verifying credential on the blockchain...
              </AlertDescription>
            </Alert>
          )}

          {verificationResult && (
            <Card className={`border-2 ${getVerificationColor(verificationResult)}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  {getVerificationIcon(verificationResult)}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {verificationResult.isValid ? 'Credential Verified' : 'Verification Failed'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {verificationResult.message}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              {verificationResult.credential && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Credential Title</h4>
                        <p className="font-semibold">{verificationResult.credential.title}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Type</h4>
                        <Badge variant="outline">
                          <Award className="h-3 w-3 mr-1" />
                          {verificationResult.credential.credential_type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Issued Date</h4>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {formatDate(verificationResult.credential.issued_date)}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Status</h4>
                        <Badge 
                          variant="outline" 
                          className={
                            verificationResult.credential.verification_status === 'verified' 
                              ? 'text-green-600 border-green-600' 
                              : 'text-red-600 border-red-600'
                          }
                        >
                          {verificationResult.credential.verification_status}
                        </Badge>
                      </div>
                    </div>

                    {verificationResult.credential.description && (
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Description</h4>
                        <p className="text-sm">{verificationResult.credential.description}</p>
                      </div>
                    )}

                    {verificationResult.credential.skills && verificationResult.credential.skills.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Skills Certified</h4>
                        <div className="flex flex-wrap gap-1">
                          {verificationResult.credential.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {verificationResult.verificationDetails && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Blockchain Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Hash className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Block:</span>
                            <code className="bg-muted px-1 rounded text-xs">
                              #{verificationResult.verificationDetails.blockNumber}
                            </code>
                          </div>
                          
                          <div className="flex items-center">
                            <Hash className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Transaction:</span>
                            <code className="bg-muted px-1 rounded text-xs">
                              {verificationResult.verificationDetails.transactionHash.substring(0, 16)}...
                            </code>
                          </div>
                          
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Verified At:</span>
                            <span className="text-xs">
                              {formatDate(verificationResult.verificationDetails.verifiedAt)}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <Shield className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Merkle Proof:</span>
                            <span className="text-xs">
                              {verificationResult.verificationDetails.merkleProof.length} nodes
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Credential verification is performed using blockchain technology to ensure authenticity and prevent tampering.
              All verification attempts are logged for audit purposes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialVerification;
