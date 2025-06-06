
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { CoachingRecommendations } from '@/components/assessments/CoachingRecommendations';
import { useAuth } from '@/context/AuthContext';
import { AssessmentUpload } from '@/components/assessments/AssessmentUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ClipboardCheck, BarChart, Target, Brain, 
  Award, FileText, BookOpen, TrendingUp, Search 
} from 'lucide-react';

// Create a client
const queryClient = new QueryClient();

const AssessmentsPage = () => {
  const { user, roles, hasRole } = useAuth();
  const [searchParams] = useSearchParams();
  const context = searchParams.get('context');
  const isAssessmentOrTrainingCenter = roles.includes('assessment_center') || roles.includes('training_center');

  // Assessment Center Controls Component
  const AssessmentCenterControls = () => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Assessment Center Controls</CardTitle>
        <CardDescription>
          Manage assessments for your organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload">
          <TabsList className="mb-4">
            <TabsTrigger value="upload">Upload Assessments</TabsTrigger>
            <TabsTrigger value="manage">Manage Assessments</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Upload New Assessments</h3>
              <p className="text-muted-foreground mb-4">
                Add new assessment materials to your organization's catalog.
              </p>
            </div>
            <AssessmentUpload />
          </TabsContent>
          <TabsContent value="manage">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Manage Existing Assessments</h3>
              <p className="text-muted-foreground mb-4">
                Your published assessments appear in the list below.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  // User Content Component
  const UserContent = () => (
    <div className="space-y-8">
      {user ? (
        <>
          <UserAssessments />
          <CoachingRecommendations />
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ClipboardCheck className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sign in to view assessments</h3>
            <p className="text-muted-foreground">
              Please sign in to access your assessment history
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Available Assessments Content
  const AvailableContent = () => (
    <div className="space-y-8">
      {isAssessmentOrTrainingCenter && <AssessmentCenterControls />}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Assessments</h2>
        <AssessmentsList />
      </div>
    </div>
  );

  // Get context-specific content
  const getContextContent = () => {
    if (context === 'academic') {
      return {
        title: 'Academic Assessments',
        description: 'Evaluate your academic performance, identify learning opportunities, and track your educational development journey with comprehensive assessments.',
        gradientColors: 'from-blue-50 via-white to-indigo-50'
      };
    } else if (context === 'career') {
      return {
        title: 'Skills Assessment',
        description: 'Evaluate your professional skills, identify growth opportunities, and advance your career development journey with personalized assessments.',
        gradientColors: 'from-green-50 via-white to-emerald-50'
      };
    } else {
      return {
        title: 'Skills Assessment',
        description: 'Discover and complete assessments to evaluate your skills, identify growth opportunities, and track your professional development journey.',
        gradientColors: 'from-blue-50 via-white to-indigo-50'
      };
    }
  };

  const contextContent = getContextContent();

  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'available',
      label: 'Available',
      icon: <ClipboardCheck className="h-4 w-4" />,
      content: <AvailableContent />
    },
    {
      id: 'my-assessments',
      label: 'My Results',
      icon: <BarChart className="h-4 w-4" />,
      content: <UserContent />
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Skills Gap Analysis</h3>
          <p className="text-gray-600">Comprehensive skills assessment and gap analysis coming soon.</p>
        </div>
      )
    },
    {
      id: 'cognitive',
      label: 'Cognitive',
      icon: <Brain className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Cognitive Assessments</h3>
          <p className="text-gray-600">Cognitive abilities and aptitude tests coming soon.</p>
        </div>
      )
    },
    {
      id: 'personality',
      label: 'Personality',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Personality Profiles</h3>
          <p className="text-gray-600">Personality assessments and work style insights coming soon.</p>
        </div>
      )
    },
    {
      id: 'technical',
      label: 'Technical',
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Technical Skills</h3>
          <p className="text-gray-600">Technical skills and knowledge assessments coming soon.</p>
        </div>
      )
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <TrendingUp className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-600">Track your assessment progress and improvements over time.</p>
        </div>
      )
    }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <CareerPageLayout
        // Hero props
        title={contextContent.title}
        description={contextContent.description}
        heroIcon={<ClipboardCheck className="h-12 w-12" />}
        primaryActionLabel="Find Assessments"
        primaryActionIcon={<Search className="h-5 w-5" />}
        secondaryActionLabel="View Results"
        secondaryActionIcon={<BarChart className="h-5 w-5" />}
        
        // Stats props
        stats={[
          { value: "500+", label: "Available Assessments" },
          { value: "92%", label: "Completion Rate" },
          { value: "15+", label: "Skill Categories" },
          { value: "24/7", label: "Access Anytime" }
        ]}
        
        // Quote props
        quote="Self-assessment is the first step to growth. Know your strengths, understand your gaps, and chart your path to excellence."
        attribution="UAE Skills Development Framework"
        quoteIcon={<Award className="h-12 w-12" />}
        
        // Tabs props
        tabs={tabs}
        defaultTab="available"
        
        // Gradient override
        gradientColors={contextContent.gradientColors}
      />
    </QueryClientProvider>
  );
};

export default AssessmentsPage;
