import React, { useState, useEffect } from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent, EmptyTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { Button } from '@/components/ui/button';
import { 
  Wallet, Award, Shield, Users, TrendingUp, 
  Database, Lock, Star 
} from 'lucide-react';
import DigitalWallet from '@/components/blockchain/DigitalWallet';
import CredentialIssuer from '@/components/blockchain/CredentialIssuer';
import CredentialVerification from '@/components/blockchain/CredentialVerification';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';
import DisputeResolutionCenter from '@/components/blockchain/DisputeResolutionCenter';

const BlockchainCredentialsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [stats, setStats] = useState({
    issuedCredentials: 1250,
    verifiedCredentials: 980,
    activeIssuers: 45,
    securityLevel: 100
  });

  const canIssueCredentials = roles.includes('training_center') || 
                             roles.includes('educational_institution') || 
                             roles.includes('administrator');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // These would be real API calls in a production app
      setStats({
        issuedCredentials: 1250,
        verifiedCredentials: 980,
        activeIssuers: 45,
        securityLevel: 100
      });
    } catch (error) {
      // Handle error silently for demo
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialIssued = () => {
    setRefreshTrigger(prev => prev + 1);
    toast({
      title: "Credential Issued",
      description: "The blockchain credential has been successfully issued."
    });
  };

  if (!user) {
    return (
      <ProfessionalGrowthLayout
        title="Blockchain Credentials"
        description="Secure, tamper-proof digital credentials powered by blockchain technology"
        icon={<Shield className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <AuthenticationRequired 
          message="Please log in to access your digital credentials wallet and manage blockchain credentials" 
          icon={<Wallet className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      </ProfessionalGrowthLayout>
    );
  }

  if (loading) {
    return (
      <ProfessionalGrowthLayout
        title="Blockchain Credentials"
        description="Secure, tamper-proof digital credentials powered by blockchain technology"
        icon={<Shield className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </ProfessionalGrowthLayout>
    );
  }

  const statsItems: StatItem[] = [
    {
      value: stats.issuedCredentials.toString(),
      label: "Issued Credentials",
      icon: Award
    },
    {
      value: stats.verifiedCredentials.toString(),
      label: "Verified Credentials",
      icon: Shield
    },
    {
      value: stats.activeIssuers.toString(),
      label: "Active Issuers",
      icon: Users
    },
    {
      value: `${stats.securityLevel}%`,
      label: "Security Level",
      icon: Lock
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "wallet",
      label: "My Wallet",
      icon: <Wallet className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Digital Credentials Wallet"
          icon={<Wallet className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="View and manage your blockchain-secured digital credentials"
        >
          <DigitalWallet key={refreshTrigger} />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "verify",
      label: "Verify Credential",
      icon: <Shield className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Credential Verification"
          icon={<Shield className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Verify the authenticity of blockchain credentials"
        >
          <CredentialVerification />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "privacy",
      label: "Privacy Controls",
      icon: <Lock className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Privacy & Sharing Controls"
          icon={<Lock className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Manage credential sharing permissions and privacy settings"
        >
          <div className="text-center py-8">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-muted-foreground mb-4">Select a credential from your wallet to manage its privacy settings</p>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "disputes",
      label: "Dispute Resolution",
      icon: <AlertTriangle className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Dispute Resolution Center"
          icon={<AlertTriangle className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="File and manage credential disputes"
        >
          <DisputeResolutionCenter />
        </ProfessionalGrowthTabContent>
      )
    },
    ...(canIssueCredentials ? [{
      id: "issue",
      label: "Issue Credential",
      icon: <Award className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Issue New Credential"
          icon={<Award className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Create and issue new blockchain credentials"
        >
          <CredentialIssuer onCredentialIssued={handleCredentialIssued} />
        </ProfessionalGrowthTabContent>
      )
    }] : []),
    {
      id: "api",
      label: "API Integration",
      icon: <Database className="h-4 w-4" />,
      content: (
        <EmptyTabContent
          icon={Database}
          title="Institutional API Integration"
          description="Connect your institution's systems to issue and verify credentials programmatically."
          actionLabel="View API Documentation"
          onAction={() => toast({ 
            title: "API Information", 
            description: "Contact your administrator for API access and documentation." 
          })}
        />
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Blockchain Credentials"
      description="Secure, tamper-proof digital credentials powered by blockchain technology"
      icon={<Shield className="h-8 w-8 text-white" />}
      stats={statsItems}
      tabs={tabs}
      defaultTab="wallet"
    />
  );
};

export default BlockchainCredentialsPage;
