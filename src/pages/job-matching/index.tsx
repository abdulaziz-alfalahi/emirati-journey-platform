
import React, { useState } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { JobMatchingHome } from '@/components/job-matching/JobMatchingHome';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { JobFiltersPanel } from '@/components/job-matching/JobFiltersPanel';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, Briefcase, Star, Clock, Settings, 
  BarChart2, TrendingUp, Compass, Heart 
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
      content: (
        <Card>
          <CardContent className="p-8 text-center">
            <Settings className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Matching Preferences</h3>
            <p className="text-gray-600">Customize your job matching criteria and preferences.</p>
          </CardContent>
        </Card>
      )
    },
    {
      id: 'skills-gap',
      label: 'Skills Gap',
      icon: <BarChart2 className="h-4 w-4" />,
      content: (
        <Card>
          <CardContent className="p-8 text-center">
            <BarChart2 className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Skills Gap Analysis</h3>
            <p className="text-gray-600">Identify skill gaps and get recommendations for career advancement.</p>
          </CardContent>
        </Card>
      )
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
      heroIcon={<Compass className="h-12 w-12" />}
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
