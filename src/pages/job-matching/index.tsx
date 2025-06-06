
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { JobMatchingHome } from '@/components/job-matching/JobMatchingHome';
import { MatchingDashboard } from '@/components/job-matching/MatchingDashboard';
import { JobFiltersPanel } from '@/components/job-matching/JobFiltersPanel';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { InterviewScheduler } from '@/components/job-matching/InterviewScheduler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, Target, Bookmark, Calendar, TrendingUp, 
  MessageSquare, Zap, Heart, Compass, Star
} from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('matching');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm15 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Search className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
              Smart Job Matching
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Find your perfect career match with AI-powered job recommendations tailored to your skills and aspirations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold">
                <Search className="h-5 w-5 mr-2" />
                Start Matching
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                <Target className="h-5 w-5 mr-2" />
                Set Preferences
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">50,000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">95%</div>
              <div className="text-gray-600">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">2,500+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-12 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
          <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
            "The right opportunity finds you when you're prepared to seize it - let AI guide you to your perfect match."
          </blockquote>
          <p className="mt-4 text-ehrdc-teal font-semibold">- UAE Career Excellence Initiative</p>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white border">
            <TabsTrigger value="matching" className="flex items-center gap-2 text-ehrdc-teal">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Matching</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2 text-ehrdc-teal">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2 text-ehrdc-teal">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 text-ehrdc-teal">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="interviews" className="flex items-center gap-2 text-ehrdc-teal">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-ehrdc-teal">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matching">
            <JobMatchingHome />
          </TabsContent>
          
          <TabsContent value="saved">
            <SavedJobsManager />
          </TabsContent>
          
          <TabsContent value="applications">
            <ApplicationTracker />
          </TabsContent>
          
          <TabsContent value="insights">
            <CareerInsights />
          </TabsContent>
          
          <TabsContent value="interviews">
            <InterviewScheduler />
          </TabsContent>
          
          <TabsContent value="dashboard">
            <MatchingDashboard />
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
