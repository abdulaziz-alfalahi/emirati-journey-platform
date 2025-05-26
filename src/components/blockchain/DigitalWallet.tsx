
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { blockchainCredentialService } from '@/services/blockchain/blockchainCredentialService';
import { BlockchainCredential } from '@/types/blockchainCredentials';
import CredentialCard from './CredentialCard';
import CredentialVerification from './CredentialVerification';
import { Wallet, Shield, Award, Download, Share2 } from 'lucide-react';

const DigitalWallet: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<BlockchainCredential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCredential, setSelectedCredential] = useState<BlockchainCredential | null>(null);
  const [activeTab, setActiveTab] = useState('wallet');

  useEffect(() => {
    if (user?.id) {
      fetchCredentials();
    }
  }, [user?.id]);

  const fetchCredentials = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const userCredentials = await blockchainCredentialService.getUserCredentials(user.id);
      setCredentials(userCredentials);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load your digital credentials',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifiedCount = credentials.filter(c => c.verification_status === 'verified').length;
  const walletAddress = user?.id ? `0x${user.id.replace(/-/g, '').substring(0, 40)}` : '';

  const exportCredentials = () => {
    const credentialData = {
      wallet_address: walletAddress,
      credentials: credentials,
      exported_at: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(credentialData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emirati-digital-credentials.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareCredentials = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Digital Credentials',
        text: `I have ${verifiedCount} verified digital credentials on the Emirati Journey Platform`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link Copied',
        description: 'Portfolio link copied to clipboard'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Wallet className="mr-3 h-8 w-8" />
            Digital Credentials Wallet
          </h1>
          <p className="text-muted-foreground mt-2">
            Secure, blockchain-verified digital credentials
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCredentials}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={shareCredentials}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Wallet Overview */}
      <Card className="bg-gradient-to-r from-emirati-teal to-emirati-navy text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Wallet Address</h3>
              <p className="font-mono text-sm opacity-90">{walletAddress}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{credentials.length}</div>
              <div className="text-sm opacity-90">Total Credentials</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <Shield className="h-6 w-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{verifiedCount}</div>
              <div className="text-xs">Verified</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <Award className="h-6 w-6 mx-auto mb-2" />
              <div className="text-xl font-bold">
                {credentials.filter(c => c.credential_type === 'certification').length}
              </div>
              <div className="text-xs">Certifications</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wallet">My Credentials</TabsTrigger>
          <TabsTrigger value="verify">Verify Credential</TabsTrigger>
          <TabsTrigger value="details">Credential Details</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="space-y-4">
          {credentials.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Credentials Yet</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Your digital credentials will appear here once they're issued by verified institutions or training centers.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {credentials.map((credential) => (
                <CredentialCard
                  key={credential.id}
                  credential={credential}
                  onClick={() => {
                    setSelectedCredential(credential);
                    setActiveTab('details');
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="verify">
          <CredentialVerification />
        </TabsContent>

        <TabsContent value="details">
          {selectedCredential ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedCredential.title}
                  <Badge 
                    variant={selectedCredential.verification_status === 'verified' ? 'default' : 'secondary'}
                  >
                    {selectedCredential.verification_status}
                  </Badge>
                </CardTitle>
                <CardDescription>{selectedCredential.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Credential Hash</label>
                    <p className="font-mono text-xs break-all bg-muted p-2 rounded">
                      {selectedCredential.credential_hash}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Transaction Hash</label>
                    <p className="font-mono text-xs break-all bg-muted p-2 rounded">
                      {selectedCredential.transaction_hash}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Block Number</label>
                    <p className="font-mono text-sm">{selectedCredential.block_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Issued Date</label>
                    <p className="text-sm">
                      {new Date(selectedCredential.issued_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {selectedCredential.skills && selectedCredential.skills.length > 0 && (
                  <div>
                    <label className="text-sm font-medium">Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCredential.skills.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium">Merkle Proof</label>
                  <div className="space-y-1 mt-2">
                    {selectedCredential.merkle_proof.map((proof, index) => (
                      <p key={index} className="font-mono text-xs bg-muted p-2 rounded">
                        {proof}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Select a credential to view details</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DigitalWallet;
