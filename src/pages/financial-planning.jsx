import React from 'react';
import { useTranslation } from 'react-i18next';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { TrendingUp, Banknote, Calculator, Users, Shield, BookOpen, UserCheck, PieChart, Target } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';
import { FinancialPlanningContent } from '@/components/financial-planning/FinancialPlanningContent';

const FinancialPlanningPage: React.FC = () => {
  const { t } = useTranslation('financial-planning');

  const stats = [
    { value: "25+", label: t('stats.tools') },
    { value: "100+", label: t('stats.guides') },
    { value: "50+", label: t('stats.resources') },
    { value: "5000+", label: t('stats.users') }
  ];

  const tabs = [
    {
      id: 'budgeting',
      label: t('tabs.budgeting.label'),
      icon: <PieChart className="h-4 w-4" />,
      content: <FinancialPlanningContent category="budgeting" />
    },
    {
      id: 'investments',
      label: t('tabs.investments.label'),
      icon: <TrendingUp className="h-4 w-4" />,
      content: <FinancialPlanningContent category="investments" />
    },
    {
      id: 'retirement',
      label: t('tabs.retirement.label'),
      icon: <DirhamSign className="h-4 w-4" />,
      content: <FinancialPlanningContent category="retirement" />
    },
    {
      id: 'insurance',
      label: t('tabs.insurance.label'),
      icon: <Shield className="h-4 w-4" />,
      content: <FinancialPlanningContent category="insurance" />
    },
    {
      id: 'education',
      label: t('tabs.education.label'),
      icon: <BookOpen className="h-4 w-4" />,
      content: <FinancialPlanningContent category="education" />
    },
    {
      id: 'advisory',
      label: t('tabs.advisory.label'),
      icon: <UserCheck className="h-4 w-4" />,
      content: <FinancialPlanningContent category="advisory" />
    }
  ];

  return (
    <CareerPageLayout
      title={t('title')}
      description={t('description')}
      heroIcon={<DirhamSign className="h-12 w-12" />}
      primaryActionLabel={t('primaryAction')}
      primaryActionIcon={<Target className="h-4 w-4" />}
      secondaryActionLabel={t('secondaryAction')}
      stats={stats}
      quote={t('quote')}
      attribution={t('attribution')}
      quoteIcon={<TrendingUp className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="budgeting"
    />
  );
};

export default FinancialPlanningPage;

