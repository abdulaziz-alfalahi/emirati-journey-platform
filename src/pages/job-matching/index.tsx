
import React from 'react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { JobDescriptionForm } from '@/components/job-matching/JobDescriptionForm';
import { JobDescriptionsList } from '@/components/job-matching/JobDescriptionsList';
import { Search, Users, Target, TrendingUp } from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  const stats = [
    { value: '500+', label: 'Active Jobs', icon: Search },
    { value: '1,200', label: 'Registered Candidates', icon: Users },
    { value: '95%', label: 'Match Accuracy', icon: Target },
    { value: '80%', label: 'Placement Rate', icon: TrendingUp },
  ];

  const tabs = [
    {
      id: 'create',
      label: 'Create Job Description',
      icon: <Search className="h-4 w-4" />,
      content: <JobDescriptionForm />
    },
    {
      id: 'manage',
      label: 'Manage Job Descriptions',
      icon: <Users className="h-4 w-4" />,
      content: <JobDescriptionsList />
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Job Matching"
      description="Streamline your recruitment process with AI-powered job description parsing and candidate matching"
      icon={<Search className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="create"
      showProgress={false}
      showQuickAccess={true}
    />
  );
};

export default JobMatchingPage;
