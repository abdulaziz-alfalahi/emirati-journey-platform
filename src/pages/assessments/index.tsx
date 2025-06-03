
import React from 'react';
import Layout from '@/components/layout/Layout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { CoachingRecommendations } from '@/components/assessments/CoachingRecommendations';
import { useAuth } from '@/context/AuthContext';
import { AssessmentUpload } from '@/components/assessments/AssessmentUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { EducationHero } from '@/components/common/EducationHero';
import { StatCards } from '@/components/common/StatCards';
import { FileText, Award, Users, TrendingUp, CheckCircle, Clock, Target, BarChart } from 'lucide-react';

const queryClient = new QueryClient();

const AssessmentsPage = () => {
  const { user, roles, hasRole } = useAuth();
  
  const isAssessmentOrTrainingCenter = roles.includes('assessment_center') || roles.includes('training_center');

  const heroStats = [
    {
      icon: FileText,
      title: '200+ Assessments',
      description: 'Available across all sectors',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: Users,
      title: '50+ Centers',
      description: 'Certified assessment centers',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: Award,
      title: '95% Accuracy',
      description: 'Skills assessment precision',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: TrendingUp,
      title: '10,000+ Completed',
      description: 'Assessments this year',
      bgColor: '',
      iconColor: ''
    }
  ];

  const statCards = [
    {
      icon: CheckCircle,
      title: 'Skills Assessment',
      description: 'Evaluate core competencies',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Target,
      title: 'Career Guidance',
      description: 'Personalized career paths',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: BarChart,
      title: 'Performance Analysis',
      description: 'Detailed progress tracking',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Official skill certificates',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    }
  ];
  
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <EducationHero
            title="Skills Assessments & Evaluations"
            description="Comprehensive assessment platform designed to evaluate skills, guide career development, and provide personalized learning recommendations for Emirati professionals."
            stats={heroStats}
          />

          <StatCards cards={statCards} />
          
          {isAssessmentOrTrainingCenter && (
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
                    <AssessmentUpload />
                  </TabsContent>
                  <TabsContent value="manage">
                    <p className="text-muted-foreground">
                      Your published assessments appear in the list below.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          
          <Separator className="my-8" />
          
          {user && (
            <div className="space-y-8">
              <UserAssessments />
              <CoachingRecommendations />
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Available Assessments</h2>
            <AssessmentsList />
          </div>
        </div>
      </QueryClientProvider>
    </Layout>
  );
};

export default AssessmentsPage;
