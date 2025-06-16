
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Shield, Users, Award, Flag } from 'lucide-react';
import { NationalServiceContent } from '@/components/national-service/NationalServiceContent';

const NationalServicePage: React.FC = () => {
  const stats = [
    { value: "40+", label: "Service Opportunities", icon: Shield },
    { value: "1500+", label: "Active Volunteers", icon: Users },
    { value: "100+", label: "Completed Projects", icon: Award },
    { value: "25+", label: "National Initiatives", icon: Flag }
  ];

  const tabs = [
    {
      id: 'opportunities',
      label: 'Service Opportunities',
      icon: <Shield className="h-4 w-4" />,
      content: <NationalServiceContent activeTab="opportunities" />
    },
    {
      id: 'my-service',
      label: 'My Service Record',
      icon: <Users className="h-4 w-4" />,
      content: <NationalServiceContent activeTab="my-service" />
    },
    {
      id: 'recognition',
      label: 'Recognition Gallery',
      icon: <Award className="h-4 w-4" />,
      content: <NationalServiceContent activeTab="recognition" />
    },
    {
      id: 'initiatives',
      label: 'National Initiatives',
      icon: <Flag className="h-4 w-4" />,
      content: <NationalServiceContent activeTab="initiatives" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="National Service: Serving Country, Building Character, Creating Legacy"
      description="Contribute to national development through meaningful service opportunities that strengthen our nation while developing valuable skills and building lasting connections with fellow citizens."
      icon={<Shield className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="opportunities"
    />
  );
};

export default NationalServicePage;
