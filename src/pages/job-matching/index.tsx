
import React, { useState } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { JobMatchingHome } from '@/components/job-matching/JobMatchingHome';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { Search, Briefcase, Bookmark, TrendingUp, Target, Upload } from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'matching',
      label: 'Job Search',
      icon: <Target className="h-4 w-4" />,
      content: <JobMatchingHome />
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: <Briefcase className="h-4 w-4" />,
      content: <ApplicationTracker />
    },
    {
      id: 'saved',
      label: 'Saved Jobs',
      icon: <Bookmark className="h-4 w-4" />,
      content: <SavedJobsManager />
    },
    {
      id: 'insights',
      label: 'Career Insights',
      icon: <TrendingUp className="h-4 w-4" />,
      content: <CareerInsights />
    }
  ];

  return (
    <CareerPageLayout
      // Hero props
      title="Intelligent Job Matching"
      description="Discover your perfect career opportunity with AI-powered job matching that understands your skills, preferences, and career goals"
      heroIcon={<Target className="h-12 w-12" />}
      primaryActionLabel="Find My Perfect Job"
      primaryActionIcon={<Search className="h-5 w-5" />}
      secondaryActionLabel="Upload CV for Matching"
      secondaryActionIcon={<Upload className="h-5 w-5" />}
      
      // Stats props
      stats={[
        { value: "10K+", label: "Active Job Listings" },
        { value: "98%", label: "Match Accuracy" },
        { value: "500+", label: "Partner Companies" },
        { value: "AI-Powered", label: "Smart Matching" }
      ]}
      
      // Quote props
      quote="The right opportunity is not just about finding a job, it's about finding your place where skills meet purpose and growth becomes inevitable."
      attribution="UAE National Career Development Initiative"
      quoteIcon={<Target className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="matching"
      
      // Gradient colors to match the theme
      gradientColors="from-indigo-50 via-white to-blue-50"
    />
  );
};

export default JobMatchingPage;
