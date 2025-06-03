
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { CoachingRecommendations } from '@/components/assessments/CoachingRecommendations';
import { useAuth } from '@/context/AuthContext';
import { AssessmentUpload } from '@/components/assessments/AssessmentUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, BarChart, Compass, Brain, Users, PlusCircle } from 'lucide-react';

// Create a client
const queryClient = new QueryClient();

const AssessmentsPage = () => {
  const { user, roles, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('available');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  const isAssessmentOrTrainingCenter = roles.includes('assessment_center') || roles.includes('training_center');
  
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">Assessments</h1>
              <p className="text-xl opacity-90 mb-6">
                Discover and complete assessments to evaluate your skills, identify growth opportunities, and track your professional development journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="h-8 w-8 mb-2">
                    <ClipboardCheck className="h-full w-full" />
                  </div>
                  <h3 className="font-semibold mb-1">Skill Evaluations</h3>
                  <p className="text-sm opacity-90">Measure your competencies</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="h-8 w-8 mb-2">
                    <BarChart className="h-full w-full" />
                  </div>
                  <h3 className="font-semibold mb-1">Performance Tracking</h3>
                  <p className="text-sm opacity-90">Monitor your progress</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="h-8 w-8 mb-2">
                    <Compass className="h-full w-full" />
                  </div>
                  <h3 className="font-semibold mb-1">Career Guidance</h3>
                  <p className="text-sm opacity-90">Personalized recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                  <div className="h-10 w-10 text-blue-600 mr-4">
                    <ClipboardCheck className="h-full w-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Skill Assessments</h3>
                    <p className="text-sm text-muted-foreground">Technical evaluations</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex items-center">
                  <div className="h-10 w-10 text-green-600 mr-4">
                    <Brain className="h-full w-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Aptitude Tests</h3>
                    <p className="text-sm text-muted-foreground">Cognitive abilities</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                  <div className="h-10 w-10 text-purple-600 mr-4">
                    <Users className="h-full w-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Personality Profiles</h3>
                    <p className="text-sm text-muted-foreground">Work style insights</p>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                  <div className="h-10 w-10 text-amber-600 mr-4">
                    <Compass className="h-full w-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Career Guidance</h3>
                    <p className="text-sm text-muted-foreground">Path recommendations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Assessment Center Controls */}
          {isAssessmentOrTrainingCenter && (
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Assessment Center Controls</CardTitle>
                <CardDescription>
                  Manage assessments for your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upload">
                      <span>Upload Assessments</span>
                    </TabsTrigger>
                    <TabsTrigger value="manage">
                      <span>Manage Assessments</span>
                    </TabsTrigger>
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
                    <div className="flex justify-end mb-4">
                      <Button className="ehrdc-button-primary">
                        <span className="flex items-center">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          <span>Create Assessment</span>
                        </span>
                      </Button>
                    </div>
                    {/* Assessment management list would go here */}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* Filter Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <h3 className="font-medium text-lg mb-4">Filter Assessments</h3>
                {/* AssessmentsFilter component would go here */}
                <div className="text-sm text-muted-foreground">
                  Filter options coming soon
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="md:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="available">
                    <span>Available</span>
                  </TabsTrigger>
                  <TabsTrigger value="my-assessments">
                    <span>My Assessments</span>
                  </TabsTrigger>
                  <TabsTrigger value="recommendations">
                    <span>Recommendations</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="available" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Available Assessments</h2>
                  </div>
                  <AssessmentsList />
                </TabsContent>
                
                <TabsContent value="my-assessments" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">My Assessments</h2>
                  {user ? (
                    <UserAssessments />
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
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Coaching Recommendations</h2>
                  {user ? (
                    <CoachingRecommendations />
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Compass className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Sign in for recommendations</h3>
                        <p className="text-muted-foreground">
                          Please sign in to receive personalized coaching recommendations
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </Layout>
  );
};

export default AssessmentsPage;
