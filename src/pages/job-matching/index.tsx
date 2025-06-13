
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { JobMatchingDashboard } from '@/components/job-matching/JobMatchingDashboard';
import JobRecommendations from '@/components/job-matching/JobRecommendations';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import JobSearchFilters from '@/components/job-matching/JobSearchFilters';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { MatchingPreferences } from '@/components/job-matching/MatchingPreferences';
import { Search, Briefcase, Target, Heart, Settings, BarChart, Filter, Eye } from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  const handlePrimaryAction = () => {
    console.log('Start job matching');
  };

  const handleSecondaryAction = () => {
    console.log('Browse all jobs');
  };

  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Target className="h-4 w-4" />,
      content: <JobMatchingDashboard />
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: <Briefcase className="h-4 w-4" />,
      content: <JobRecommendations />
    },
    {
      id: 'search',
      label: 'Search',
      icon: <Search className="h-4 w-4" />,
      content: <JobSearchFilters />
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
      icon: <Eye className="h-4 w-4" />,
      content: <ApplicationTracker />
    },
    {
      id: 'insights',
      label: 'Insights',
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
    <CareerPageLayout
      // Hero props
      title="Intelligent Job Matching"
      description="Discover your perfect career opportunity with AI-powered job matching. Connect with employers based on your skills, experience, and career aspirations in the UAE job market."
      heroIcon={<Target className="h-12 w-12" />}
      primaryActionLabel="Find My Match"
      primaryActionIcon={<Search className="h-5 w-5" />}
      primaryActionOnClick={handlePrimaryAction}
      secondaryActionLabel="Browse Jobs"
      secondaryActionIcon={<Briefcase className="h-5 w-5" />}
      secondaryActionOnClick={handleSecondaryAction}
      
      // Stats props
      stats={[
        { value: "10,000+", label: "Active Job Listings" },
        { value: "95%", label: "Match Accuracy" },
        { value: "500+", label: "UAE Companies" },
        { value: "24/7", label: "Real-time Updates" }
      ]}
      
      // Quote props
      quote="Your next career opportunity is just one smart match away—let our AI find the perfect fit for your skills and ambitions."
      attribution="EHRDC Career Intelligence Team"
      quoteIcon={<Target className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="dashboard"
    />
  );
};

export default JobMatchingPage;
