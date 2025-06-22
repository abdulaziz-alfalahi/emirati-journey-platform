import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, Users, Briefcase, Flag } from 'lucide-react';
import SkillGapAnalysis from '@/components/analytics/SkillGapAnalysis';
import MarketTrendsChart from '@/components/analytics/MarketTrendsChart';
import PortfolioInsights from '@/components/analytics/PortfolioInsights';
import WorkforceAnalytics from '@/components/analytics/WorkforceAnalytics';
import UAEWorkforceAnalytics from '@/components/analytics/UAEWorkforceAnalytics';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AnalyticsPage = () => {
  const { roles } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Determine which analytics sections to show based on user role
  const isRecruiter = roles.includes('private_sector_recruiter');
  const isEducator = roles.includes('educational_institution');
  const isGovernment = roles.includes('government_representative');
  const isAdmin = roles.includes('administrator');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground mb-8">
          AI-powered insights to help you make data-driven decisions
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              <Activity className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="uae-workforce">
              <Flag className="h-4 w-4 mr-2" /> UAE Workforce
            </TabsTrigger>
            <TabsTrigger value="workforce">
              <TrendingUp className="h-4 w-4 mr-2" /> Market Trends
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Users className="h-4 w-4 mr-2" /> Skills Analysis
            </TabsTrigger>
            {(isRecruiter || isAdmin) && (
              <TabsTrigger value="talent">
                <Briefcase className="h-4 w-4 mr-2" /> Talent Pool
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>AI-generated insights based on your role</CardDescription>
                </CardHeader>
                <CardContent>
                  <PortfolioInsights />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions Recommended</CardTitle>
                  <CardDescription>Priority tasks based on current trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActionRecommendations userRole={roles[0] || 'default'} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PerformanceMetricsChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uae-workforce" className="space-y-8">
            <UAEWorkforceAnalytics />
          </TabsContent>

          <TabsContent value="workforce" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Workforce Market Needs</CardTitle>
                <CardDescription>Current and projected market demand</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <WorkforceAnalytics />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Industry Growth Projections</CardTitle>
                  <CardDescription>5-year projections by sector</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <MarketTrendsChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emerging Roles</CardTitle>
                  <CardDescription>New positions with growing demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmergingRolesList />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Analysis</CardTitle>
                <CardDescription>
                  {isEducator 
                    ? 'Comparing student skills with market demand' 
                    : isRecruiter 
                      ? 'Comparing candidate skills with job requirements'
                      : 'Workforce skills vs. market demand'}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <SkillGapAnalysis />
              </CardContent>
            </Card>
          </TabsContent>

          {(isRecruiter || isAdmin) && (
            <TabsContent value="talent" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Talent Pool Analysis</CardTitle>
                  <CardDescription>Candidate distribution by key metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <TalentPoolChart />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recruitment Funnel</CardTitle>
                    <CardDescription>Applicant journey analytics</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <RecruitmentFunnelChart />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Candidate Qualification</CardTitle>
                    <CardDescription>Skills match analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <CandidateQualificationChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

// Placeholder components to be implemented separately
const ActionRecommendations = ({ userRole }: { userRole: string }) => {
  return (
    <div className="space-y-4">
      {userRole === 'private_sector_recruiter' ? (
        <>
          <div className="flex items-start space-x-3 p-3 bg-muted rounded-md">
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Expand Technical Hiring</h4>
              <p className="text-xs text-muted-foreground">Market shows 27% increase in demand for software developers</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-muted rounded-md">
            <div className="bg-amber-100 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Focus on Data Science Skills</h4>
              <p className="text-xs text-muted-foreground">Current talent pool lacks data analysis experience</p>
            </div>
          </div>
        </>
      ) : userRole === 'educational_institution' ? (
        <>
          <div className="flex items-start space-x-3 p-3 bg-muted rounded-md">
            <div className="bg-green-100 p-2 rounded-full">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Enhance AI Curriculum</h4>
              <p className="text-xs text-muted-foreground">53% skill gap identified in machine learning competencies</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-muted rounded-md">
            <div className="bg-purple-100 p-2 rounded-full">
              <Briefcase className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Introduce Cloud Computing Course</h4>
              <p className="text-xs text-muted-foreground">Market demand increased by 45% in the last 6 months</p>
            </div>
          </div>
        </>
      ) : (
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertTitle>Recommendations available</AlertTitle>
          <AlertDescription>
            Complete your profile to receive personalized recommendations
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

const PerformanceMetricsChart = () => {
  // This would be implemented with actual data in the real component
  return <div className="flex items-center justify-center h-full text-muted-foreground">Performance metrics visualization</div>;
};

const EmergingRolesList = () => {
  // This would be implemented with actual data in the real component
  return (
    <div className="space-y-4">
      <div className="p-3 border rounded-md">
        <h4 className="font-medium">AI Ethics Officer</h4>
        <p className="text-sm text-muted-foreground">+125% YoY growth</p>
      </div>
      <div className="p-3 border rounded-md">
        <h4 className="font-medium">Digital Transformation Specialist</h4>
        <p className="text-sm text-muted-foreground">+82% YoY growth</p>
      </div>
      <div className="p-3 border rounded-md">
        <h4 className="font-medium">Remote Work Coordinator</h4>
        <p className="text-sm text-muted-foreground">+64% YoY growth</p>
      </div>
    </div>
  );
};

const TalentPoolChart = () => {
  // This would be implemented with actual data in the real component
  return <div className="flex items-center justify-center h-full text-muted-foreground">Talent pool visualization</div>;
};

const RecruitmentFunnelChart = () => {
  // This would be implemented with actual data in the real component
  return <div className="flex items-center justify-center h-full text-muted-foreground">Recruitment funnel visualization</div>;
};

const CandidateQualificationChart = () => {
  // This would be implemented with actual data in the real component
  return <div className="flex items-center justify-center h-full text-muted-foreground">Candidate qualification visualization</div>;
};

export default AnalyticsPage;
