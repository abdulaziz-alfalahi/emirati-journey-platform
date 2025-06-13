
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Clock, Briefcase, Shield, Users, Award, DollarSign, Heart, Calendar } from 'lucide-react';
import PostCareerOptionsTab from '@/components/retiree/PostCareerOptionsTab';
import RetirementBenefitsTab from '@/components/retiree/RetirementBenefitsTab';
import { RetireeFinancialPlanningTab } from '@/components/retiree/RetireeFinancialPlanningTab';
import { RetireeCommunityTab } from '@/components/retiree/RetireeCommunityTab';

const RetireeServicesPage: React.FC = () => {
  const stats = [
    { value: "50+", label: "Post-Career Opportunities", icon: Briefcase },
    { value: "15+", label: "Benefit Programs", icon: Shield },
    { value: "1000+", label: "Active Community Members", icon: Users },
    { value: "25+", label: "Financial Planning Tools", icon: DollarSign }
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
    },
    {
      id: 'financial-planning',
      label: 'Financial Planning',
      icon: <DollarSign className="h-4 w-4" />,
      content: <RetireeFinancialPlanningTab />
    },
    {
      id: 'community',
      label: 'Community & Lifestyle',
      icon: <Users className="h-4 w-4" />,
      content: <RetireeCommunityTab />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Emirati Retiree Journey: A New Chapter of Purpose and Prosperity"
      description="Supporting UAE citizens during their retirement journey with specialized services, opportunities, and comprehensive benefits to ensure a fulfilling post-career life."
      icon={<Clock className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="post-career"
    />
  );
};

export default RetireeServicesPage;
