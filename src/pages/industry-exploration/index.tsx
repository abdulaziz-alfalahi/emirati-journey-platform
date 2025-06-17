
import React from 'react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { EmiratizationOpportunities } from '@/components/industry-exploration/EmiratizationOpportunities';
import { PersonalizedRecommendations } from '@/components/industry-exploration/PersonalizedRecommendations';
import { Search, TrendingUp, Users, Building2 } from 'lucide-react';

const IndustryExplorationPage: React.FC = () => {
  const stats = [
    { value: '15+', label: 'Key Industries', icon: Building2 },
    { value: '85%', label: 'Job Growth Rate', icon: TrendingUp },
    { value: '12K', label: 'Active Professionals', icon: Users },
    { value: '200+', label: 'Companies', icon: Search },
  ];

  const tabs = [
    {
      id: 'opportunities',
      label: 'Emiratization',
      icon: <Building2 className="h-4 w-4" />,
      content: <EmiratizationOpportunities />
    },
    {
      id: 'recommendations',
      label: 'Recommendations', 
      icon: <TrendingUp className="h-4 w-4" />,
      content: <PersonalizedRecommendations />
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Industry Exploration"
      description="Discover career opportunities across UAE's thriving industries and find your perfect career match through personalized recommendations and Emiratization initiatives."
      icon={<Search className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="opportunities"
      showProgress={false}
      showQuickAccess={true}
    />
  );
};

export default IndustryExplorationPage;
