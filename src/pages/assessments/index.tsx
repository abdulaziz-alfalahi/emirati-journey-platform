
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentsList } from '@/components/assessments/AssessmentsList';
import { UserAssessments } from '@/components/assessments/UserAssessments';
import { CoachingRecommendations } from '@/components/assessments/CoachingRecommendations';
import { useAuth } from '@/context/AuthContext';
import { AssessmentUpload } from '@/components/assessments/AssessmentUpload';
import { Button } from '@/components/ui/button';
import { 
  ClipboardCheck, BarChart, Target, Brain, 
  Award, FileText, BookOpen, TrendingUp, Search,
  Users, CheckCircle, Filter
} from 'lucide-react';

// Create a client
const queryClient = new QueryClient();

const AssessmentsPage = () => {
  const { user, roles, hasRole } = useAuth();
  const [searchParams] = useSearchParams();
  const context = searchParams.get('context');
  const [activeTab, setActiveTab] = useState("available");
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

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">{contextContent.title}</h1>
              <p className="text-xl opacity-90 mb-6">
                {contextContent.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <ClipboardCheck className="h-8 w-8 mb-2" />
                  <h3 className="font-semibold mb-1">500+ Assessments</h3>
                  <p className="text-sm opacity-90">Available across all categories</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <Target className="h-8 w-8 mb-2" />
                  <h3 className="font-semibold mb-1">15+ Skill Categories</h3>
                  <p className="text-sm opacity-90">From technical to soft skills</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <Award className="h-8 w-8 mb-2" />
                  <h3 className="font-semibold mb-1">Certified Results</h3>
                  <p className="text-sm opacity-90">Industry-recognized assessments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                  <ClipboardCheck className="h-10 w-10 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">500+ Tests</h3>
                    <p className="text-sm text-muted-foreground">Available assessments</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex items-center">
                  <Target className="h-10 w-10 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">92% Completion</h3>
                    <p className="text-sm text-muted-foreground">Success rate</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                  <Users className="h-10 w-10 text-purple-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Expert Evaluators</h3>
                    <p className="text-sm text-muted-foreground">Professional reviewers</p>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                  <CheckCircle className="h-10 w-10 text-amber-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">24/7 Access</h3>
                    <p className="text-sm text-muted-foreground">Anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter Assessments
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>All Categories</option>
                      <option>Skills</option>
                      <option>Behaviors</option>
                      <option>Capabilities</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Level</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>All Levels</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Any Duration</option>
                      <option>Under 30 minutes</option>
                      <option>30-60 minutes</option>
                      <option>Over 60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="available">Available Assessments</TabsTrigger>
                  <TabsTrigger value="my-assessments">My Results</TabsTrigger>
                  <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
                  <TabsTrigger value="cognitive">Cognitive Tests</TabsTrigger>
                  <TabsTrigger value="personality">Personality</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>
                
                <TabsContent value="available" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Available Assessments</h2>
                    {isAssessmentOrTrainingCenter && (
                      <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                        <ClipboardCheck className="h-4 w-4 mr-2" />
                        Create Assessment
                      </Button>
                    )}
                  </div>
                  <AvailableContent />
                </TabsContent>
                
                <TabsContent value="my-assessments" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">My Assessment Results</h2>
                  <UserContent />
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-4">
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Skills Gap Analysis</h3>
                    <p className="text-gray-600">Comprehensive skills assessment and gap analysis coming soon.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="cognitive" className="space-y-4">
                  <div className="text-center py-12">
                    <Brain className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Cognitive Assessments</h3>
                    <p className="text-gray-600">Cognitive abilities and aptitude tests coming soon.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="personality" className="space-y-4">
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Personality Profiles</h3>
                    <p className="text-gray-600">Personality assessments and work style insights coming soon.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="progress" className="space-y-4">
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Progress Tracking</h3>
                    <p className="text-gray-600">Track your assessment progress and improvements over time.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </Layout>
    </QueryClientProvider>
  );
};

export default AssessmentsPage;
