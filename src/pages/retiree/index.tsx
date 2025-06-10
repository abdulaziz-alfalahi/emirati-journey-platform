
import React from 'react';
import { Clock, Briefcase, Shield, Users } from 'lucide-react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import PostCareerOptionsTab from '@/components/retiree/PostCareerOptionsTab';
import RetirementBenefitsTab from '@/components/retiree/RetirementBenefitsTab';

const RetireeServicesPage: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Post-Career Opportunities', icon: Briefcase },
    { value: '25+', label: 'Benefit Programs', icon: Shield },
    { value: '1000+', label: 'Active Retirees', icon: Users },
    { value: '15+', label: 'Years Average Experience', icon: Clock }
  ];

  const tabs = [
    {
      id: 'post-career',
      label: 'Post-Career Options',
      icon: <Briefcase className="h-4 w-4" />,
      content: <PostCareerOptionsTab />
    },
    {
      id: 'benefits',
      label: 'Retirement Benefits',
      icon: <Shield className="h-4 w-4" />,
      content: <RetirementBenefitsTab />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Emirati Retiree Journey: A New Chapter of Purpose and Prosperity"
      description="Discover meaningful post-career opportunities and maximize your retirement benefits. Continue making a valuable contribution to society while securing your financial future."
      icon={<Clock className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="post-career"
    />
  );
};

export default RetireeServicesPage;
