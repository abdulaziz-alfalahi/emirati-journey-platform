
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Vote, Users, Building, MessageSquare } from 'lucide-react';
import { CivicEngagementContent } from '@/components/civic-engagement/CivicEngagementContent';

const CivicEngagementPage: React.FC = () => {
  const stats = [
    { value: "75+", label: "Civic Initiatives", icon: Vote },
    { value: "3000+", label: "Active Citizens", icon: Users },
    { value: "50+", label: "Government Partners", icon: Building },
    { value: "500+", label: "Policy Discussions", icon: MessageSquare }
  ];

  const tabs = [
    {
      id: 'initiatives',
      label: 'Civic Initiatives',
      icon: <Vote className="h-4 w-4" />,
      content: <CivicEngagementContent activeTab="initiatives" />
    },
    {
      id: 'participation',
      label: 'My Participation',
      icon: <Users className="h-4 w-4" />,
      content: <CivicEngagementContent activeTab="participation" />
    },
    {
      id: 'policy',
      label: 'Policy Discussions',
      icon: <MessageSquare className="h-4 w-4" />,
      content: <CivicEngagementContent activeTab="policy" />
    },
    {
      id: 'government',
      label: 'Government Connect',
      icon: <Building className="h-4 w-4" />,
      content: <CivicEngagementContent activeTab="government" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Civic Engagement: Your Voice, Your Community, Your Impact"
      description="Participate actively in civic life, engage with government initiatives, and contribute to policy discussions that shape the future of your community and nation."
      icon={<Vote className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="initiatives"
    />
  );
};

export default CivicEngagementPage;
