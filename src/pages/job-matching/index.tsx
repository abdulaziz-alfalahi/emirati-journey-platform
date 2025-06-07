
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { JobMatchingHome } from '@/components/job-matching/JobMatchingHome';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { JobFiltersPanel } from '@/components/job-matching/JobFiltersPanel';
import { SkillsGapAnalysis } from '@/components/job-matching/SkillsGapAnalysis';
import { MatchingPreferences } from '@/components/job-matching/MatchingPreferences';
import { 
  Search, Briefcase, Star, Settings, 
  BarChart2, TrendingUp, Heart 
} from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'search',
      label: 'Search',
      icon: <Search className="h-4 w-4" />,
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <JobFiltersPanel />
          </div>
          <div className="lg:col-span-3">
            <JobMatchingHome />
          </div>
        </div>
      )
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: <Briefcase className="h-4 w-4" />,
      content: <ApplicationTracker />
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: <Star className="h-4 w-4" />,
      content: <SavedJobsManager />
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <Settings className="h-4 w-4" />,
      content: <MatchingPreferences />
    },
    {
      id: 'skills-gap',
      label: 'Skills Gap',
      icon: <BarChart2 className="h-4 w-4" />,
      content: <SkillsGapAnalysis />
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: <TrendingUp className="h-4 w-4" />,
      content: <CareerInsights />
    }
  ];

  return (
    <CareerPageLayout
      // Hero props
      title="Job Matching"
      description="Find your perfect career match with our AI-powered job matching system that aligns your skills, experience, and preferences with available opportunities."
      heroIcon={<Search className="h-12 w-12" />}
      primaryActionLabel="Find Jobs"
      primaryActionIcon={<Search className="h-5 w-5" />}
      secondaryActionLabel="Update Profile"
      secondaryActionIcon={<Settings className="h-5 w-5" />}
      
      // Stats props
      stats={[
        { value: "5,000+", label: "Available Jobs" },
        { value: "85%", label: "Placement Rate" },
        { value: "250+", label: "Partner Employers" },
        { value: "24/7", label: "Matching Updates" }
      ]}
      
      // Quote props
      quote="The right job isn't just about skills—it's about finding where your talents, passions, and purpose align with opportunity."
      attribution="UAE Career Excellence Initiative"
      quoteIcon={<Heart className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="search"
    />
  );
};

export default JobMatchingPage;
