
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Shield, Award, Users, Zap, Eye, Database, FileCheck, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CredentialCard from '@/components/blockchain/CredentialCard';
import CredentialIssuer from '@/components/blockchain/CredentialIssuer';
import { BlockchainCredential } from '@/types/blockchainCredentials';

const BlockchainCredentialsPage: React.FC = () => {
  const { user } = useAuth();
  const { activeRole } = useRole();
  const [selectedCredential, setSelectedCredential] = useState<BlockchainCredential | null>(null);

  const isAdmin = activeRole === 'administrator' || activeRole === 'super_user';

  const stats = [
    {
      value: "2,500+",
      label: "Verified Credentials",
      icon: Shield
    },
    {
      value: "99.9%",
      label: "Security Uptime",
      icon: Lock
    },
    {
      value: "150+",
      label: "Partner Institutions",
      icon: Users
    },
    {
      value: "5sec",
      label: "Average Verification Time",
      icon: Zap
    }
  ];

  // Mock data for demonstration - updated to match BlockchainCredential interface
  const mockCredentials: BlockchainCredential[] = [
    {
      id: '1',
      recipient_id: user?.id || 'user-1',
      issuer_id: 'issuer-1',
      credential_type: 'certification',
      title: 'Digital Marketing Certificate',
      description: 'Advanced digital marketing certification covering SEO, social media, and analytics',
      issued_date: '2024-01-15T00:00:00Z',
      expiry_date: '2026-01-15T00:00:00Z',
      credential_hash: '0x1234...abcd',
      merkle_proof: ['0xabc123', '0xdef456'],
      block_number: 12345,
      transaction_hash: '0x5678...efgh',
      verification_status: 'verified',
      metadata: {
        issuer_name: 'Dubai Digital Authority',
        level: 'Intermediate'
      },
      skills: ['Digital Marketing', 'SEO', 'Social Media'],
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      recipient_id: user?.id || 'user-1',
      issuer_id: 'issuer-2',
      credential_type: 'degree',
      title: 'Bachelor of Computer Science',
      description: 'Bachelor\'s degree in Computer Science with focus on software engineering',
      issued_date: '2023-06-20T00:00:00Z',
      credential_hash: '0x5678...efgh',
      merkle_proof: ['0xghi789', '0xjkl012'],
      block_number: 11234,
      transaction_hash: '0x9abc...defg',
      verification_status: 'verified',
      metadata: {
        issuer_name: 'American University of Dubai',
        degree: 'Bachelor',
        major: 'Computer Science',
        gpa: '3.8'
      },
      created_at: '2023-06-20T00:00:00Z',
      updated_at: '2023-06-20T00:00:00Z'
    }
  ];

  const tabs = [
    {
      id: 'my-credentials',
      label: 'My Credentials',
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCredentials.map((credential) => (
              <CredentialCard
                key={credential.id}
                credential={credential}
                onClick={() => setSelectedCredential(credential)}
              />
            ))}
          </div>
          {mockCredentials.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Credentials Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start building your verified credential portfolio
                </p>
                <Button>
                  Request Credential Verification
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )
    },
    {
      id: 'verify',
      label: 'Verify Credentials',
      icon: <FileCheck className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Credential Verification
              </CardTitle>
              <CardDescription>
                Verify the authenticity of blockchain credentials using hash verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Verification Interface</h3>
                <p className="text-muted-foreground mb-6">
                  Enter a credential hash or scan a QR code to verify authenticity
                </p>
                <Button>
                  Start Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'wallet',
      label: 'Digital Wallet',
      icon: <Database className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Blockchain Wallet
              </CardTitle>
              <CardDescription>
                Manage your digital credential wallet and blockchain interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Secure Wallet</h3>
                <p className="text-muted-foreground mb-6">
                  Your credentials are securely stored on the blockchain
                </p>
                <Button>
                  View Wallet Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  // Add admin tabs if user is admin
  if (isAdmin) {
    tabs.push({
      id: 'issue',
      label: 'Issue Credentials',
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <CredentialIssuer />
        </div>
      )
    });
  }

  if (!user) {
    return (
      <ProfessionalGrowthLayout
        title="Blockchain Credentials"
        description="Secure, verifiable digital credentials powered by blockchain technology for trusted professional recognition"
        icon={<Shield className="h-12 w-12 text-white" />}
        stats={stats}
        tabs={[
          {
            id: 'signin',
            label: 'Sign In Required',
            icon: <Eye className="h-4 w-4" />,
            content: (
              <div className="text-center py-16">
                <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">Access Your Blockchain Credentials</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Please sign in to view and manage your verified digital credentials.
                </p>
                <Button onClick={() => window.location.href = '/auth'} size="lg">
                  Sign In to Continue
                </Button>
              </div>
            )
          }
        ]}
        defaultTab="signin"
      />
    );
  }

  return (
    <ProfessionalGrowthLayout
      title="Blockchain Credentials"
      description="Secure, verifiable digital credentials powered by blockchain technology for trusted professional recognition"
      icon={<Shield className="h-12 w-12 text-white" />}
      stats={stats}
      tabs={tabs}
      defaultTab="my-credentials"
    />
  );
};

export default BlockchainCredentialsPage;
