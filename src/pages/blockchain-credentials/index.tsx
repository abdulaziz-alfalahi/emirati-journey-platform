
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DigitalWallet from '@/components/blockchain/DigitalWallet';
import CredentialIssuer from '@/components/blockchain/CredentialIssuer';
import CredentialVerification from '@/components/blockchain/CredentialVerification';
import { Wallet, Award, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlockchainCredentialsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const canIssueCredentials = roles.includes('training_center') || 
                             roles.includes('educational_institution') || 
                             roles.includes('administrator');

  const handleCredentialIssued = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to access your digital credentials wallet
          </p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Blockchain Credentials</h1>
            <p className="text-muted-foreground">
              Secure, tamper-proof digital credentials powered by blockchain technology
            </p>
          </div>
        </div>

        <Tabs defaultValue="wallet" className="space-y-6">
          <TabsList className={`grid w-full ${canIssueCredentials ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <TabsTrigger value="wallet" className="flex items-center">
              <Wallet className="h-4 w-4 mr-2" />
              My Wallet
            </TabsTrigger>
            <TabsTrigger value="verify" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Verify Credential
            </TabsTrigger>
            {canIssueCredentials && (
              <TabsTrigger value="issue" className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Issue Credential
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="wallet">
            <DigitalWallet key={refreshTrigger} />
          </TabsContent>

          <TabsContent value="verify">
            <CredentialVerification />
          </TabsContent>

          {canIssueCredentials && (
            <TabsContent value="issue">
              <CredentialIssuer onCredentialIssued={handleCredentialIssued} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default BlockchainCredentialsPage;
