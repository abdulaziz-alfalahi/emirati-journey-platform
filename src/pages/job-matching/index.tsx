import React from 'react';
import { CareerEntryLayout } from '@/components/layouts/CareerEntryLayout';
import { JobMatchingDashboard } from '@/components/job-matching/JobMatchingDashboard';
import JobRecommendations from '@/components/job-matching/JobRecommendations';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import JobSearchFilters from '@/components/job-matching/JobSearchFilters';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { MatchingPreferences } from '@/components/job-matching/MatchingPreferences';
import { Search, Briefcase, Target, Heart, Settings, BarChart, TrendingUp, Users } from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  const stats = [
    { value: "500+", label: "Active Jobs", icon: Briefcase },
    { value: "95%", label: "Match Accuracy", icon: Target },
    { value: "1,200+", label: "Successful Placements", icon: TrendingUp },
    { value: "300+", label: "Partner Companies", icon: Users }
  ];

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Target className="h-4 w-4" />,
      content: <JobMatchingDashboard />
    },
    {
      id: 'recommendations',
      label: 'Job Matches',
      icon: <Search className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <JobSearchFilters />
          <JobRecommendations />
        </div>
      )
    },
    {
      id: 'saved',
      label: 'Saved Jobs',
      icon: <Heart className="h-4 w-4" />,
      content: <SavedJobsManager />
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: <Briefcase className="h-4 w-4" />,
      content: <ApplicationTracker />
    },
    {
      id: 'insights',
      label: 'Career Insights',
      icon: <BarChart className="h-4 w-4" />,
      content: <CareerInsights />
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <Settings className="h-4 w-4" />,
      content: <MatchingPreferences />
    }
  ];

  return (
    <CareerEntryLayout
      title="Smart Job Matching"
      description="Discover your perfect career match with our AI-powered job matching system. Find opportunities that align with your skills, experience, and career aspirations in the UAE job market."
      icon={<Search className="h-8 w-8 text-white" />}
      stats={stats}
      tabs={tabs}
      defaultTab="dashboard"
      primaryActionText="Find My Matches"
      primaryActionHref="#recommendations"
      secondaryActionText="Browse All Jobs"
      secondaryActionHref="#recommendations"
    />
  );
};

export default JobMatchingPage;