
import React, { useState, useEffect } from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { 
  Wallet, Award, Shield, Users, TrendingUp, 
  Database, Lock, Star, AlertTriangle 
} from 'lucide-react';
import DigitalWallet from '@/components/blockchain/DigitalWallet';
import CredentialIssuer from '@/components/blockchain/CredentialIssuer';
import CredentialVerification from '@/components/blockchain/CredentialVerification';
import DisputeResolutionCenter from '@/components/blockchain/DisputeResolutionCenter';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BlockchainCredentialsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const canIssueCredentials = roles.includes('training_center') || 
                             roles.includes('educational_institution') || 
                             roles.includes('administrator');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCredentialIssued = () => {
    setRefreshTrigger(prev => prev + 1);
    toast({
      title: "Credential Issued",
      description: "The blockchain credential has been successfully issued."
    });
  };

  // Stats for the page
  const stats = [
    {
      value: "1,250+",
      label: "Issued Credentials",
      icon: Award
    },
    {
      value: "980+",
      label: "Verified Credentials", 
      icon: Shield
    },
    {
      value: "45+",
      label: "Active Issuers",
      icon: Users
    },
    {
      value: "100%",
      label: "Security Level",
      icon: Lock
    }
  ];

  // Define tabs based on authentication and roles
  const getTabs = () => {
    if (!user) {
      return [
        {
          id: 'signin',
          label: 'Sign In Required',
          icon: <Wallet className="h-4 w-4" />,
          content: (
            <AuthenticationRequired 
              message="Please log in to access your digital credentials wallet and manage blockchain credentials" 
              icon={<Wallet className="h-12 w-12 text-muted-foreground mb-4" />}
            />
          )
        }
      ];
    }

    const baseTabs = [
      {
        id: 'wallet',
        label: 'My Wallet',
        icon: <Wallet className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ehrdc-teal">Digital Credentials Wallet</h2>
                <p className="text-muted-foreground">
                  View and manage your blockchain-secured digital credentials
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-ehrdc-teal" />
                <span className="text-sm font-medium">Blockchain Secured</span>
              </div>
            </div>
            
            {/* Privacy Notice */}
            <Card className="bg-ehrdc-light-teal/10 border-ehrdc-teal/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-ehrdc-teal mt-0.5" />
                  <div className="text-sm">
                    <h4 className="font-medium mb-1 text-ehrdc-teal">Privacy & Data Protection</h4>
                    <p className="text-muted-foreground">
                      All credentials are tamper-proof and cryptographically secured on the blockchain.
                      You have full control over sharing and verification permissions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <DigitalWallet key={refreshTrigger} />
          </div>
        )
      },
      {
        id: 'verify',
        label: 'Verify Credential',
        icon: <Shield className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal">Credential Verification</h2>
              <p className="text-muted-foreground">
                Verify the authenticity of blockchain credentials instantly
              </p>
            </div>
            <CredentialVerification />
          </div>
        )
      },
      {
        id: 'privacy',
        label: 'Privacy Controls',
        icon: <Lock className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal">Privacy & Sharing Controls</h2>
              <p className="text-muted-foreground">
                Manage credential sharing permissions and privacy settings
              </p>
            </div>
            <Card>
              <CardContent className="text-center py-12">
                <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Credential</h3>
                <p className="text-muted-foreground">
                  Choose a credential from your wallet to manage its privacy settings and sharing permissions.
                </p>
              </CardContent>
            </Card>
          </div>
        )
      },
      {
        id: 'disputes',
        label: 'Dispute Resolution',
        icon: <AlertTriangle className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal">Dispute Resolution Center</h2>
              <p className="text-muted-foreground">
                File and manage credential disputes through our secure resolution process
              </p>
            </div>
            <DisputeResolutionCenter />
          </div>
        )
      }
    ];

    // Add issuer tab for authorized users
    if (canIssueCredentials) {
      baseTabs.push({
        id: 'issue',
        label: 'Issue Credential',
        icon: <Award className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal">Issue New Credential</h2>
              <p className="text-muted-foreground">
                Create and issue new blockchain credentials to recipients
              </p>
            </div>
            <CredentialIssuer onCredentialIssued={handleCredentialIssued} />
          </div>
        )
      });
    }

    // Add API integration tab
    baseTabs.push({
      id: 'api',
      label: 'API Integration',
      icon: <Database className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-ehrdc-teal">API Integration</h2>
            <p className="text-muted-foreground">
              Connect your institution's systems to issue and verify credentials programmatically
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-ehrdc-teal" />
                Institutional API Access
              </CardTitle>
              <CardDescription>
                Integrate blockchain credentials into your existing systems
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">API Documentation</h3>
              <p className="text-muted-foreground mb-4">
                Access comprehensive API documentation and integration guides for seamless
                implementation of blockchain credentials in your institution.
              </p>
              <button 
                onClick={() => toast({ 
                  title: "API Information", 
                  description: "Contact your administrator for API access and documentation." 
                })}
                className="px-4 py-2 bg-ehrdc-teal text-white rounded-lg hover:bg-ehrdc-dark-teal transition-colors"
              >
                View Documentation
              </button>
            </CardContent>
          </Card>
        </div>
      )
    });

    return baseTabs;
  };

  if (loading) {
    return (
      <LifelongEngagementLayout
        title="Blockchain Credentials"
        description="Secure, tamper-proof digital credentials powered by blockchain technology. Build trust through verifiable achievements and qualifications."
        icon={<Shield className="h-12 w-12" />}
        stats={[]}
        tabs={[
          {
            id: 'loading',
            label: 'Loading...',
            icon: <Shield className="h-4 w-4" />,
            content: (
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            )
          }
        ]}
        defaultTab="loading"
      />
    );
  }

  return (
    <LifelongEngagementLayout
      title="Blockchain Credentials"
      description="Secure, tamper-proof digital credentials powered by blockchain technology. Build trust through verifiable achievements and qualifications."
      icon={<Shield className="h-12 w-12" />}
      stats={stats}
      tabs={getTabs()}
      defaultTab={user ? "wallet" : "signin"}
    />
  );
};

export default BlockchainCredentialsPage;
