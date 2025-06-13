
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { TrendingUp, Banknote, Calculator, Users, Shield, BookOpen, UserCheck, PieChart } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';
import { FinancialPlanningContent } from '@/components/financial-planning/FinancialPlanningContent';

const FinancialPlanningPage: React.FC = () => {
  const stats = [
    { value: "25+", label: "Financial Tools", icon: Calculator },
    { value: "100+", label: "Investment Guides", icon: TrendingUp },
    { value: "50+", label: "Planning Resources", icon: Banknote },
    { value: "5000+", label: "Active Users", icon: Users }
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
    <LifelongEngagementLayout
      title="Financial Planning & Wellness"
      description="Build a secure financial future with comprehensive planning tools, expert guidance, and educational resources designed for UAE residents and professionals."
      icon={<DirhamSign className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="budgeting"
    />
  );
};

export default FinancialPlanningPage;
