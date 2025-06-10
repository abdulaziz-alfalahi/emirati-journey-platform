
import React from 'react';
import { Clock, Briefcase, Shield, Users, Award, Quote } from 'lucide-react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import PostCareerOptionsTab from '@/components/retiree/PostCareerOptionsTab';
import RetirementBenefitsTab from '@/components/retiree/RetirementBenefitsTab';

const RetireeServicesPage: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Post-Career Opportunities' },
    { value: '25+', label: 'Benefit Programs' },
    { value: '1000+', label: 'Active Retirees' },
    { value: '15+', label: 'Years Average Experience' }
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
    <CareerPageLayout
      title="Emirati Retiree Journey: A New Chapter of Purpose and Prosperity"
      description="Discover meaningful post-career opportunities and maximize your retirement benefits. Continue making a valuable contribution to society while securing your financial future."
      heroIcon={<Clock className="h-8 w-8" />}
      primaryActionLabel="Explore Opportunities"
      primaryActionIcon={<Briefcase className="h-4 w-4" />}
      primaryActionOnClick={() => console.log('Explore opportunities clicked')}
      secondaryActionLabel="View Benefits"
      secondaryActionIcon={<Shield className="h-4 w-4" />}
      secondaryActionOnClick={() => console.log('View benefits clicked')}
      stats={stats}
      quote="Retirement is not the end of the road. It is the beginning of the open highway."
      attribution="Unknown"
      quoteIcon={<Quote className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="post-career"
    />
  );
};

export default RetireeServicesPage;
