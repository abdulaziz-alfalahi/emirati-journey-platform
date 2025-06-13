
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdvisoryDashboard from '@/components/career-advisory/AdvisoryDashboard';
import AdvisorPortfolio from '@/components/career-advisory/AdvisorPortfolio';
import AdvisorScheduling from '@/components/career-advisory/AdvisorScheduling';
import InterviewPrep from '@/components/career-advisory/InterviewPrep';
import ResourceLibrary from '@/components/career-advisory/ResourceLibrary';
import { Users, UserCheck, Calendar, MessageCircle, BookOpen } from 'lucide-react';
import { AdvisorySession } from '@/types/careerAdvisory';

const CareerAdvisoryPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock session data for InterviewPrep component that matches AdvisorySession type
  const mockSession: AdvisorySession = {
    id: '1',
    user_id: 'user1',
    advisor_id: 'advisor1',
    status: 'scheduled' as const,
    scheduled_date: new Date().toISOString(),
    completed_date: null,
    topic: 'Software Engineer Interview Preparation',
    details: 'Mock interview session for software engineering position',
    notes: null,
    rating: null,
    feedback: null,
    video_call_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_interview: true,
    interview_type: 'mock',
    interview_questions: null
  };

  const handleSessionUpdate = (updatedSession: AdvisorySession) => {
    console.log('Session updated:', updatedSession);
  };

  const content = (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section - Group 1 Design Pattern */}
      <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Career Advisory</h1>
          <p className="text-xl opacity-90 mb-6">
            Get personalized career guidance from certified advisors who understand the UAE market and your professional aspirations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <UserCheck className="h-8 w-8 mb-2" />
              <h3 className="font-semibold mb-1">200+ Advisors</h3>
              <p className="text-sm opacity-90">Certified professionals</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <Users className="h-8 w-8 mb-2" />
              <h3 className="font-semibold mb-1">92% Success Rate</h3>
              <p className="text-sm opacity-90">Career advancement</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <Calendar className="h-8 w-8 mb-2" />
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm opacity-90">Available when you need</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <Users className="h-10 w-10 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">Advisory Sessions</h3>
                <p className="text-sm text-muted-foreground">One-on-one guidance</p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg flex items-center">
              <UserCheck className="h-10 w-10 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold">Expert Advisors</h3>
                <p className="text-sm text-muted-foreground">Industry professionals</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg flex items-center">
              <MessageCircle className="h-10 w-10 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold">Interview Prep</h3>
                <p className="text-sm text-muted-foreground">Mock sessions & coaching</p>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg flex items-center">
              <BookOpen className="h-10 w-10 text-amber-600 mr-4" />
              <div>
                <h3 className="font-semibold">Resource Library</h3>
                <p className="text-sm text-muted-foreground">Career development tools</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
            <h3 className="font-medium text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full ehrdc-button-primary">
                <Users className="h-4 w-4 mr-2" />
                Find Advisor
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Mock Interview
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="advisors">Find Advisors</TabsTrigger>
              <TabsTrigger value="scheduling">Schedule</TabsTrigger>
              <TabsTrigger value="interview">Interview Prep</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Advisory Dashboard</h2>
              </div>
              <AdvisoryDashboard />
            </TabsContent>
            
            <TabsContent value="advisors" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Find Your Advisor</h2>
              <AdvisorPortfolio />
            </TabsContent>
            
            <TabsContent value="scheduling" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Schedule Advisory Session</h2>
              <AdvisorScheduling />
            </TabsContent>
            
            <TabsContent value="interview" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Interview Preparation</h2>
              <InterviewPrep session={mockSession} onSessionUpdate={handleSessionUpdate} />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Career Development Resources</h2>
              <ResourceLibrary />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default CareerAdvisoryPage;
