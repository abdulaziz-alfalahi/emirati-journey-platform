
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { CoachingRecommendations } from '@/components/assessments/CoachingRecommendations';
import { useAuth } from '@/context/AuthContext';
import { AssessmentUpload } from '@/components/assessments/AssessmentUpload';
import { Button } from '@/components/ui/button';
import { 
  ClipboardCheck, Search, Award, Target, Brain, 
  FileText, TrendingUp, BookOpen
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
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Upload New Assessments</h3>
          <p className="text-muted-foreground mb-4">
            Add new assessment materials to your organization's catalog.
          </p>
        </div>
        <AssessmentUpload />
      </CardContent>
    </Card>
  );

  // Get context-specific content
  const getContextContent = () => {
    if (context === 'academic') {
      return {
        title: 'Academic Assessments',
        description: 'Evaluate your academic performance, identify learning opportunities, and track your educational development journey with comprehensive assessments.'
      };
    } else if (context === 'career') {
      return {
        title: 'Skills Assessment',
        description: 'Evaluate your professional skills, identify growth opportunities, and advance your career development journey with personalized assessments.'
      };
    } else {
      return {
        title: 'Academic Assessments',
        description: 'Discover and complete assessments to evaluate your academic skills, identify learning opportunities, and track your educational development journey.'
      };
    }
  };

  const contextContent = getContextContent();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex items-center justify-center min-h-screen">
          <AuthenticationRequired 
            message="Please log in to access assessments and track your development journey" 
            icon={<ClipboardCheck className="h-12 w-12 text-muted-foreground mb-4" />}
          />
        </div>
      </div>
    );
  }

  const stats = [
    {
      value: "500+",
      label: "Available Tests"
    },
    {
      value: "92%",
      label: "Completion Rate"
    },
    {
      value: "15+",
      label: "Skill Categories"
    },
    {
      value: "24/7",
      label: "Access"
    }
  ];

  const tabs = [
    {
      id: "available",
      label: "Available",
      icon: <Search className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Available Assessments</h2>
              <p className="text-muted-foreground">
                Discover and complete assessments to evaluate your skills and track your progress
              </p>
            </div>
            {isAssessmentOrTrainingCenter && (
              <Button className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
            )}
          </div>
          {isAssessmentOrTrainingCenter && <AssessmentCenterControls />}
          <AssessmentsList />
        </div>
      )
    },
    {
      id: "results",
      label: "My Results",
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">My Assessment Results</h2>
            <p className="text-muted-foreground">
              View your assessment history and track your progress over time
            </p>
          </div>
          <div className="space-y-8">
            <UserAssessments />
            <CoachingRecommendations />
          </div>
        </div>
      )
    },
    {
      id: "skills",
      label: "Skills Analysis",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Skills Gap Analysis</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Comprehensive skills assessment and gap analysis to identify your strengths and areas for improvement.
          </p>
          <Button variant="outline" className="border-ehrdc-teal text-ehrdc-teal hover:bg-ehrdc-teal hover:text-white">
            Coming Soon
          </Button>
        </div>
      )
    },
    {
      id: "cognitive",
      label: "Cognitive",
      icon: <Brain className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Cognitive Assessments</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Cognitive abilities and aptitude tests to evaluate your mental capabilities and problem-solving skills.
          </p>
          <Button variant="outline" className="border-ehrdc-teal text-ehrdc-teal hover:bg-ehrdc-teal hover:text-white">
            Coming Soon
          </Button>
        </div>
      )
    },
    {
      id: "personality",
      label: "Personality",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Personality Profiles</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Personality assessments and work style insights to understand your professional preferences and behaviors.
          </p>
          <Button variant="outline" className="border-ehrdc-teal text-ehrdc-teal hover:bg-ehrdc-teal hover:text-white">
            Coming Soon
          </Button>
        </div>
      )
    },
    {
      id: "progress",
      label: "Progress",
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <TrendingUp className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Track your assessment progress and improvements over time with detailed analytics and insights.
          </p>
          <Button className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
            View Progress
          </Button>
        </div>
      )
    }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <CareerPageLayout
        title={contextContent.title}
        description={contextContent.description}
        heroIcon={<ClipboardCheck className="h-12 w-12" />}
        primaryActionLabel="Start Assessment"
        primaryActionIcon={<ClipboardCheck className="h-5 w-5" />}
        secondaryActionLabel="View My Results"
        secondaryActionIcon={<Award className="h-5 w-5" />}
        stats={stats}
        quote="Continuous assessment and skill development are the foundation of a successful career in the modern economy"
        attribution="UAE Vision 2071"
        quoteIcon={<BookOpen className="h-12 w-12" />}
        tabs={tabs}
        defaultTab="available"
      />
    </QueryClientProvider>
  );
};

export default AssessmentsPage;
