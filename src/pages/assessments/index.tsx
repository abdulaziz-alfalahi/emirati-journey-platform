
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

// Create a client
const queryClient = new QueryClient();

const AssessmentsPage = () => {
  const { user, roles, hasRole } = useAuth();
  
  const isAssessmentOrTrainingCenter = roles.includes('assessment_center') || roles.includes('training_center');
  
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Assessments</h1>
          <p className="text-muted-foreground mb-6">Explore assessments and evaluation opportunities</p>
          
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
            <AssessmentsList />
          </div>
        </div>
      </QueryClientProvider>
    </Layout>
  );
};

export default AssessmentsPage;
