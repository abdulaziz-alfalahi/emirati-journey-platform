import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Wallet, 
  Award, 
  Shield, 
  Calendar,
  Building2,
  Download,
  Share,
  History,
  ExternalLink,
  CheckSquare,
  Square,
  Settings,
  Eye
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { blockchainCredentialService } from '@/services/blockchain/blockchainCredentialService';
import { auditLogger } from '@/services/blockchain/auditLogger';
import { BlockchainCredential } from '@/types/blockchainCredentials';
import TransactionHistory from './TransactionHistory';
import BatchOperationsDialog from './BatchOperationsDialog';
import CredentialTemplate from './CredentialTemplate';
import CredentialPreviewDialog from './CredentialPreviewDialog';
import { toast } from 'sonner';

const DigitalWallet: React.FC = () => {
  const { user, roles } = useAuth();
  const [credentials, setCredentials] = useState<BlockchainCredential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [previewCredential, setPreviewCredential] = useState<BlockchainCredential | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    if (user) {
      loadCredentials();
    }
  }, [user]);

  const loadCredentials = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userCredentials = await blockchainCredentialService.getUserCredentials(user.id);
      setCredentials(userCredentials);
    } catch (error) {
      console.error('Failed to load credentials:', error);
      toast.error('Failed to load credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCredential = (credentialId: string, isSelected: boolean) => {
    setSelectedCredentials(prev => 
      isSelected 
        ? [...prev, credentialId]
        : prev.filter(id => id !== credentialId)
    );
  };

  const handleSelectAll = () => {
    if (selectedCredentials.length === credentials.length) {
      setSelectedCredentials([]);
    } else {
      setSelectedCredentials(credentials.map(c => c.id));
    }
  };

  const getSelectedCredentials = () => {
    return credentials.filter(c => selectedCredentials.includes(c.id));
  };

  const canRevokeCredentials = roles.includes('training_center') || 
                              roles.includes('educational_institution') || 
                              roles.includes('administrator');

  const handlePreviewCredential = (credential: BlockchainCredential) => {
    setPreviewCredential(credential);
    setShowPreviewDialog(true);
  };

  const handleDownloadCredential = async (credential: BlockchainCredential) => {
    try {
      // Log download action
      await auditLogger.logOperation({
        user_id: user!.id,
        credential_id: credential.id,
        operation_type: 'download',
        operation_details: {
          action: `Downloaded credential: ${credential.title}`,
          metadata: {
            credential_type: credential.credential_type,
            format: 'JSON'
          },
          result: 'success'
        }
      });

      // Create downloadable credential data
      const credentialData = {
        ...credential,
        downloaded_at: new Date().toISOString(),
        download_format: 'JSON'
      };

      const blob = new Blob([JSON.stringify(credentialData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `credential-${credential.title.replace(/[^a-zA-Z0-9]/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Credential downloaded successfully');
    } catch (error) {
      await auditLogger.logOperation({
        user_id: user!.id,
        credential_id: credential.id,
        operation_type: 'download',
        operation_details: {
          action: `Failed to download credential: ${credential.title}`,
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      console.error('Download failed:', error);
      toast.error('Failed to download credential');
    }
  };

  const handleShareCredential = async (credential: BlockchainCredential) => {
    try {
      const shareUrl = `${window.location.origin}/blockchain-credentials/verify?id=${credential.id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: `Blockchain Credential: ${credential.title}`,
          text: `Verify my ${credential.credential_type} credential on the blockchain`,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Verification link copied to clipboard');
      }

      // Log share action
      await auditLogger.logOperation({
        user_id: user!.id,
        credential_id: credential.id,
        operation_type: 'share',
        operation_details: {
          action: `Shared credential: ${credential.title}`,
          metadata: {
            share_method: navigator.share ? 'native_share' : 'clipboard',
            verification_url: shareUrl
          },
          result: 'success'
        }
      });
    } catch (error) {
      await auditLogger.logOperation({
        user_id: user!.id,
        credential_id: credential.id,
        operation_type: 'share',
        operation_details: {
          action: `Failed to share credential: ${credential.title}`,
          result: 'failure',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      console.error('Share failed:', error);
      toast.error('Failed to share credential');
    }
  };

  const getCredentialTypeIcon = (type: string) => {
    switch (type) {
      case 'certification':
        return <Award className="h-5 w-5" />;
      case 'degree':
        return <Building2 className="h-5 w-5" />;
      case 'skill_badge':
        return <Shield className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'revoked':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Wallet className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p className="text-muted-foreground">Please log in to access your digital wallet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Digital Wallet
          </CardTitle>
          <CardDescription>
            Your secure blockchain credentials wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="credentials" className="space-y-6">
            <TabsList>
              <TabsTrigger value="credentials">My Credentials</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="credentials">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading your credentials...</p>
                </div>
              ) : credentials.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Wallet className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No credentials in your wallet yet</p>
                  <p className="text-sm">Credentials you receive will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Batch Operations Header */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                        className="flex items-center"
                      >
                        {selectedCredentials.length === credentials.length ? (
                          <CheckSquare className="h-4 w-4 mr-2" />
                        ) : (
                          <Square className="h-4 w-4 mr-2" />
                        )}
                        {selectedCredentials.length === credentials.length ? 'Deselect All' : 'Select All'}
                      </Button>
                      
                      {selectedCredentials.length > 0 && (
                        <Badge variant="secondary">
                          {selectedCredentials.length} selected
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                      >
                        {viewMode === 'grid' ? 'List View' : 'Grid View'}
                      </Button>
                      
                      {selectedCredentials.length > 0 && (
                        <Button
                          onClick={() => setShowBatchDialog(true)}
                          className="flex items-center"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Batch Operations
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Credentials Display */}
                  {viewMode === 'grid' ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {credentials.map((credential) => (
                        <div key={credential.id} className="relative">
                          <div className="absolute top-2 left-2 z-10">
                            <Checkbox
                              checked={selectedCredentials.includes(credential.id)}
                              onCheckedChange={(checked) => 
                                handleSelectCredential(credential.id, checked as boolean)
                              }
                              className="bg-white/90 border-gray-300"
                            />
                          </div>
                          
                          <CredentialTemplate credential={credential} variant="card" />
                          
                          <div className="flex justify-center space-x-2 mt-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handlePreviewCredential(credential)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDownloadCredential(credential)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleShareCredential(credential)}
                            >
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // List view (keeping original implementation for compact display)
                    <div className="grid gap-4">
                      {credentials.map((credential) => (
                        <Card key={credential.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  checked={selectedCredentials.includes(credential.id)}
                                  onCheckedChange={(checked) => 
                                    handleSelectCredential(credential.id, checked as boolean)
                                  }
                                />
                                <div className="p-2 bg-primary/10 rounded-full text-primary">
                                  {getCredentialTypeIcon(credential.credential_type)}
                                </div>
                                <div>
                                  <h3 className="font-semibold">{credential.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {credential.credential_type.replace('_', ' ').toUpperCase()}
                                  </p>
                                </div>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-white ${getStatusColor(credential.verification_status)}`}
                              >
                                {credential.verification_status}
                              </Badge>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pt-0">
                            {credential.description && (
                              <p className="text-sm text-muted-foreground mb-4">
                                {credential.description}
                              </p>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                Issued: {formatDate(credential.issued_date)}
                              </div>
                              
                              {credential.expiry_date && (
                                <div className="flex items-center text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Expires: {formatDate(credential.expiry_date)}
                                </div>
                              )}
                              
                              <div className="flex items-center text-muted-foreground">
                                <Shield className="h-3 w-3 mr-1" />
                                Block: #{credential.block_number}
                              </div>
                              
                              <div className="flex items-center text-muted-foreground">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Tx: {credential.transaction_hash.substring(0, 12)}...
                              </div>
                            </div>

                            {credential.skills && credential.skills.length > 0 && (
                              <div className="mb-4">
                                <p className="text-sm font-medium mb-2">Skills Certified:</p>
                                <div className="flex flex-wrap gap-1">
                                  {credential.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handlePreviewCredential(credential)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDownloadCredential(credential)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleShareCredential(credential)}
                              >
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              <TransactionHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Batch Operations Dialog */}
      <BatchOperationsDialog
        isOpen={showBatchDialog}
        onClose={() => setShowBatchDialog(false)}
        selectedCredentials={getSelectedCredentials()}
        userId={user.id}
        canRevoke={canRevokeCredentials}
      />

      {/* Credential Preview Dialog */}
      <CredentialPreviewDialog
        isOpen={showPreviewDialog}
        onClose={() => setShowPreviewDialog(false)}
        credential={previewCredential}
        onDownload={handleDownloadCredential}
        onShare={handleShareCredential}
      />
    </div>
  );
};

export default DigitalWallet;
