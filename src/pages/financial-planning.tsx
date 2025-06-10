
import React from 'react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { DollarSign, TrendingUp, PiggyBank, Calculator, Users } from 'lucide-react';
import { FinancialPlanningContent } from '@/components/financial-planning/FinancialPlanningContent';

const FinancialPlanningPage: React.FC = () => {
  const stats = [
    { value: "15+", label: "Financial Tools", icon: Calculator },
    { value: "50+", label: "Investment Guides", icon: TrendingUp },
    { value: "25+", label: "Budgeting Resources", icon: PiggyBank },
    { value: "1000+", label: "Active Users", icon: Users }
  ];

  const tabs = [
    {
      id: 'budgeting',
      label: 'Budgeting & Savings',
      icon: <PiggyBank className="h-4 w-4" />,
      content: <FinancialPlanningContent category="budgeting" />
    },
    {
      id: 'investments',
      label: 'Investments',
      icon: <TrendingUp className="h-4 w-4" />,
      content: <FinancialPlanningContent category="investments" />
    },
    {
      id: 'retirement',
      label: 'Retirement Planning',
      icon: <DollarSign className="h-4 w-4" />,
      content: <FinancialPlanningContent category="retirement" />
    },
    {
      id: 'tools',
      label: 'Resources & Tools',
      icon: <Calculator className="h-4 w-4" />,
      content: <FinancialPlanningContent category="tools" />
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Financial Planning"
      description="Take control of your financial future with comprehensive planning tools, investment guidance, and retirement strategies tailored for UAE residents."
      icon={<DollarSign className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="budgeting"
    />
  );
};

export default FinancialPlanningPage;
