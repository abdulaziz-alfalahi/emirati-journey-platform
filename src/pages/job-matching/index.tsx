
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { JobMatchingHome } from '@/components/job-matching/JobMatchingHome';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Briefcase, Bookmark, TrendingUp, Target } from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('matching');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title="Intelligent Job Matching"
        description="Discover your perfect career opportunity with AI-powered job matching that understands your skills, preferences, and career goals"
        icon={<Target className="h-12 w-12" />}
        primaryActionLabel="Find My Perfect Job"
        primaryActionIcon={<Search className="h-5 w-5" />}
        secondaryActionLabel="Upload CV for Matching"
        secondaryActionIcon={<Briefcase className="h-5 w-5" />}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">10K+</div>
              <div className="text-gray-600">Active Job Listings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">98%</div>
              <div className="text-gray-600">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">500+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">AI-Powered</div>
              <div className="text-gray-600">Smart Matching</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white border">
            <TabsTrigger value="matching" className="flex items-center gap-2 text-ehrdc-teal">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Matching</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2 text-ehrdc-teal">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2 text-ehrdc-teal">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Saved Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 text-ehrdc-teal">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matching">
            <JobMatchingHome />
          </TabsContent>
          
          <TabsContent value="applications">
            <ApplicationTracker />
          </TabsContent>
          
          <TabsContent value="saved">
            <SavedJobsManager />
          </TabsContent>
          
          <TabsContent value="insights">
            <CareerInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default JobMatchingPage;
