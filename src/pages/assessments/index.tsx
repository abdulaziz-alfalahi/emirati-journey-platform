
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { CoachingRecommendations } from '@/components/assessments/CoachingRecommendations';
import { useAuth } from '@/context/AuthContext';
import { AssessmentUpload } from '@/components/assessments/AssessmentUpload';
import { Button } from '@/components/ui/button';
import { 
  ClipboardCheck, Search, Award, Target, Brain, 
  FileText, TrendingUp, BookOpen, Users, BarChart3
} from 'lucide-react';

// Create a client
const queryClient = new QueryClient();

const AssessmentsPage = () => {
  console.log('AssessmentsPage component rendering');
  
  const { user, roles, hasRole } = useAuth();
  const [searchParams] = useSearchParams();
  const context = searchParams.get('context');
  const isAssessmentOrTrainingCenter = roles.includes('assessment_center') || roles.includes('training_center');

  console.log('User:', user);
  console.log('Context from URL:', context);
  console.log('Roles:', roles);

  // Assessment Center Controls Component
  const AssessmentCenterControls = () => (
    <ProfessionalGrowthTabContent
      title="Assessment Center Controls"
      description="Manage assessments for your organization"
      icon={<Users className="h-5 w-5 text-[rgb(var(--pg-primary))]" />}
    >
      <div className="space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Upload New Assessments</h3>
          <p className="text-muted-foreground mb-4">
            Add new assessment materials to your organization's catalog.
          </p>
        </div>
        <AssessmentUpload />
      </div>
    </ProfessionalGrowthTabContent>
  );

  // Get context-specific content
  const getContextContent = () => {
    if (context === 'academic') {
      return {
        title: 'Academic Assessment Excellence',
        description: 'Comprehensive academic evaluation platform designed to measure learning outcomes, identify growth opportunities, and accelerate educational development through evidence-based assessment methodologies.'
      };
    } else if (context === 'career') {
      return {
        title: 'Professional Skills Assessment',
        description: 'Advanced skills evaluation platform that measures professional competencies, identifies development opportunities, and provides personalized career advancement pathways through comprehensive assessment analytics.'
      };
    } else {
      return {
        title: 'Comprehensive Assessment Platform',
        description: 'Unified assessment ecosystem that evaluates skills, measures capabilities, and tracks development progress across academic and professional domains through innovative evaluation methodologies.'
      };
    }
  };

  const contextContent = getContextContent();

  if (!user) {
    console.log('No user found, showing authentication required');
    return (
      <div className="min-h-screen bg-[rgb(var(--pg-background))]">
        <div className="flex items-center justify-center min-h-screen">
          <AuthenticationRequired 
            message="Please log in to access assessments and track your development journey" 
            icon={<ClipboardCheck className="h-12 w-12 text-muted-foreground mb-4" />}
          />
        </div>
      </div>
    );
  }

  console.log('User authenticated, rendering main content');

  const stats = [
    {
      value: "500+",
      label: "Available Assessments",
      icon: ClipboardCheck
    },
    {
      value: "92%",
      label: "Completion Rate",
      icon: TrendingUp
    },
    {
      value: "15+",
      label: "Skill Categories",
      icon: Target
    },
    {
      value: "24/7",
      label: "Platform Access",
      icon: BookOpen
    }
  ];

  const tabs = [
    {
      id: "available",
      label: "Available",
      icon: <Search className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Available Assessments"
          description="Discover and complete assessments to evaluate your skills and track your progress"
          icon={<Search className="h-5 w-5 text-[rgb(var(--pg-primary))]" />}
          action={
            isAssessmentOrTrainingCenter && (
              <Button className="bg-[rgb(var(--pg-primary))] hover:bg-[rgb(var(--pg-primary))/90]">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
            )
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
      id: "in-progress",
      label: "In Progress",
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Assessments In Progress"
          description="Continue with your ongoing assessment sessions and track completion status"
          icon={<TrendingUp className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
        >
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-[rgb(var(--pg-secondary))] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No Assessments In Progress</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Start an assessment from the Available tab to see your progress here.
            </p>
            <Button variant="outline" className="border-[rgb(var(--pg-secondary))] text-[rgb(var(--pg-secondary))] hover:bg-[rgb(var(--pg-secondary))] hover:text-white">
              Browse Available Assessments
            </Button>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "completed",
      label: "Completed",
      icon: <Award className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Completed Assessments"
          description="Review your completed assessments and achievements"
          icon={<Award className="h-5 w-5 text-[rgb(var(--pg-accent))]" />}
        >
          <div className="space-y-8">
            <UserAssessments />
            <CoachingRecommendations />
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "results",
      label: "Results",
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Assessment Results & Analytics"
          description="Comprehensive analysis of your assessment performance and skill development trends"
          icon={<BarChart3 className="h-5 w-5 text-[rgb(var(--pg-primary))]" />}
        >
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-[rgb(var(--pg-primary))] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Detailed assessment analytics and performance insights to track your skill development journey.
            </p>
            <Button className="bg-[rgb(var(--pg-primary))] hover:bg-[rgb(var(--pg-primary))/90]">
              View Detailed Analytics
            </Button>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "skills",
      label: "Skills Analysis",
      icon: <Target className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Skills Gap Analysis"
          description="Comprehensive skills assessment and gap analysis to identify your strengths and areas for improvement"
          icon={<Target className="h-5 w-5 text-[rgb(var(--pg-accent))]" />}
        >
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-[rgb(var(--pg-accent))] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Skills Gap Analysis</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Advanced skills mapping and gap analysis to create personalized development pathways.
            </p>
            <Button variant="outline" className="border-[rgb(var(--pg-accent))] text-[rgb(var(--pg-accent))] hover:bg-[rgb(var(--pg-accent))] hover:text-white">
              Coming Soon
            </Button>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "cognitive",
      label: "Cognitive",
      icon: <Brain className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Cognitive Assessment Suite"
          description="Advanced cognitive abilities and aptitude evaluations for comprehensive mental capability assessment"
          icon={<Brain className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
        >
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-[rgb(var(--pg-secondary))] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Cognitive Assessments</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Scientifically-designed cognitive assessments to evaluate problem-solving, reasoning, and analytical capabilities.
            </p>
            <Button variant="outline" className="border-[rgb(var(--pg-secondary))] text-[rgb(var(--pg-secondary))] hover:bg-[rgb(var(--pg-secondary))] hover:text-white">
              Coming Soon
            </Button>
          </div>
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  console.log('About to render ProfessionalGrowthLayout');

  return (
    <QueryClientProvider client={queryClient}>
      <ProfessionalGrowthLayout
        title={contextContent.title}
        description={contextContent.description}
        icon={<ClipboardCheck className="h-8 w-8" />}
        stats={stats}
        tabs={tabs}
        defaultTab="available"
        showProgress={true}
        progressStep={1}
        totalSteps={4}
        stepLabel="Assessment Discovery"
        ctaTitle="Ready to Advance Your Skills?"
        ctaDescription="Join thousands of professionals who have accelerated their careers through comprehensive skills assessment and personalized development pathways."
        ctaActionLabel="Start Your Assessment Journey"
        ctaActionHref="/assessments?tab=available"
      />
    </QueryClientProvider>
  );
};

export default AssessmentsPage;
