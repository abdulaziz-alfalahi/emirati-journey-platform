
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { TrendingUp, Banknote, Calculator, Users, Shield, BookOpen, UserCheck, PieChart, Target } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';
import { FinancialPlanningContent } from '@/components/financial-planning/FinancialPlanningContent';

const FinancialPlanningPage: React.FC = () => {
  const stats = [
    { value: "25+", label: "Financial Tools" },
    { value: "100+", label: "Investment Guides" },
    { value: "50+", label: "Planning Resources" },
    { value: "5000+", label: "Active Users" }
  ];

  const tabs = [
    {
      id: 'budgeting',
      label: 'Budgeting & Tracking',
      icon: <PieChart className="h-4 w-4" />,
      content: <FinancialPlanningContent category="budgeting" />
    },
    {
      id: 'investments',
      label: 'Investment Planning',
      icon: <TrendingUp className="h-4 w-4" />,
      content: <FinancialPlanningContent category="investments" />
    },
    {
      id: 'retirement',
      label: 'Retirement & Savings',
      icon: <DirhamSign className="h-4 w-4" />,
      content: <FinancialPlanningContent category="retirement" />
    },
    {
      id: 'insurance',
      label: 'Insurance & Risk',
      icon: <Shield className="h-4 w-4" />,
      content: <FinancialPlanningContent category="insurance" />
    },
    {
      id: 'education',
      label: 'Financial Education',
      icon: <BookOpen className="h-4 w-4" />,
      content: <FinancialPlanningContent category="education" />
    },
    {
      id: 'advisory',
      label: 'Professional Services',
      icon: <UserCheck className="h-4 w-4" />,
      content: <FinancialPlanningContent category="advisory" />
    }
  ];

  return (
    <CareerPageLayout
      title="Financial Planning & Wellness"
      description="Build a secure financial future with comprehensive planning tools, expert guidance, and educational resources designed for UAE residents and professionals"
      heroIcon={<DirhamSign className="h-12 w-12" />}
      primaryActionLabel="Start Planning"
      primaryActionIcon={<Target className="h-4 w-4" />}
      secondaryActionLabel="View Resources"
      stats={stats}
      quote="Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest. You can't win until you do this"
      attribution="Dave Ramsey"
      quoteIcon={<TrendingUp className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="budgeting"
    />
  );
};

export default FinancialPlanningPage;
