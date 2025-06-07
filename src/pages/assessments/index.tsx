
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent, EmptyTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { CoachingRecommendations } from '@/components/assessments/CoachingRecommendations';
import { useAuth } from '@/context/AuthContext';
import { AssessmentUpload } from '@/components/assessments/AssessmentUpload';
import { Button } from '@/components/ui/button';
import { 
  ClipboardCheck, Target, Brain, 
  Award, FileText, TrendingUp, Search,
  Users, CheckCircle
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
      <ProfessionalGrowthLayout
        title={contextContent.title}
        description={contextContent.description}
        icon={<ClipboardCheck className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <AuthenticationRequired 
          message="Please log in to access assessments and track your development journey" 
          icon={<ClipboardCheck className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      </ProfessionalGrowthLayout>
    );
  }

  const statsItems: StatItem[] = [
    {
      value: "500+",
      label: "Available Tests",
      icon: ClipboardCheck
    },
    {
      value: "92%",
      label: "Completion Rate",
      icon: Target
    },
    {
      value: "15+",
      label: "Skill Categories",
      icon: Users
    },
    {
      value: "24/7",
      label: "Access",
      icon: CheckCircle
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "available",
      label: "Available Assessments",
      icon: <Search className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Available Assessments"
          icon={<Search className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Discover and complete assessments to evaluate your skills and track your progress"
          action={
            isAssessmentOrTrainingCenter ? (
              <Button className="bg-[rgb(var(--pg-secondary))] hover:bg-[rgb(var(--pg-secondary))/90]">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
            ) : undefined
          }
        >
          <div className="space-y-6">
            {isAssessmentOrTrainingCenter && <AssessmentCenterControls />}
            <AssessmentsList />
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "my-assessments",
      label: "My Results",
      icon: <Award className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="My Assessment Results"
          icon={<Award className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="View your assessment history and track your progress over time"
        >
          <div className="space-y-8">
            <UserAssessments />
            <CoachingRecommendations />
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "skills",
      label: "Skills Analysis",
      icon: <Target className="h-4 w-4" />,
      content: (
        <EmptyTabContent
          icon={Target}
          title="Skills Gap Analysis"
          description="Comprehensive skills assessment and gap analysis to identify your strengths and areas for improvement."
          actionLabel="Coming Soon"
          onAction={() => {}}
        />
      )
    },
    {
      id: "cognitive",
      label: "Cognitive Tests",
      icon: <Brain className="h-4 w-4" />,
      content: (
        <EmptyTabContent
          icon={Brain}
          title="Cognitive Assessments"
          description="Cognitive abilities and aptitude tests to evaluate your mental capabilities and problem-solving skills."
          actionLabel="Coming Soon"
          onAction={() => {}}
        />
      )
    },
    {
      id: "personality",
      label: "Personality",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <EmptyTabContent
          icon={FileText}
          title="Personality Profiles"
          description="Personality assessments and work style insights to understand your professional preferences and behaviors."
          actionLabel="Coming Soon"
          onAction={() => {}}
        />
      )
    },
    {
      id: "progress",
      label: "Progress",
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <EmptyTabContent
          icon={TrendingUp}
          title="Progress Tracking"
          description="Track your assessment progress and improvements over time with detailed analytics and insights."
          actionLabel="View Progress"
          onAction={() => {}}
        />
      )
    }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ProfessionalGrowthLayout
        title={contextContent.title}
        description={contextContent.description}
        icon={<ClipboardCheck className="h-8 w-8 text-white" />}
        stats={statsItems}
        tabs={tabs}
        defaultTab="available"
      />
    </QueryClientProvider>
  );
};

export default AssessmentsPage;
