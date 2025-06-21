
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Shield, TestTube, TrendingUp, Settings, Activity, Eye, Database } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';
import { UserJourneyVisualization } from '@/components/analytics/UserJourneyVisualization';
import { AnalyticsConsentManager } from '@/components/analytics/AnalyticsConsentManager';
import { AdminAnalyticsDashboard } from '@/components/analytics/AdminAnalyticsDashboard';
import RecommendationAnalytics from '@/components/dashboard/RecommendationAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const { activeRole } = useRole();
  const [activeTab, setActiveTab] = useState('journey');

  const isAdmin = activeRole === 'administrator' || activeRole === 'super_user';

  // Analytics-focused statistics
  const stats = [
    {
      value: "2.5M+",
      label: "Data Points Collected",
      icon: Database,
      trend: "+12% this month"
    },
    {
      value: "150+",
      label: "Insights Generated", 
      icon: TrendingUp,
      trend: "+8% this month"
    },
    {
      value: "99.8%",
      label: "Privacy Compliance Rate",
      icon: Shield,
      trend: "Maintained"
    },
    {
      value: "87%",
      label: "User Engagement Score",
      icon: Activity,
      trend: "+5% this month"
    }
  ];

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-16">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Analytics Access Required</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Please sign in to view your analytics and journey insights.
            </p>
            <Button onClick={() => window.location.href = '/auth'} size="lg">
              Sign In to Continue
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Analytics & Insights</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Comprehensive analytics across your citizen lifecycle journey with privacy-first data insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Privacy Protected
            </Badge>
            {isAdmin && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Admin View
              </Badge>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Privacy Notice */}
        <Card className="bg-muted/50 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">Privacy & Data Protection</h4>
                <p className="text-sm text-muted-foreground">
                  All analytics data is anonymized and encrypted. We use this information to improve
                  your experience and platform functionality. You maintain full control over your
                  data sharing preferences through the Privacy Settings tab.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Explore detailed insights and manage your data preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
                <TabsTrigger value="journey" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">My Journey</span>
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  <span className="hidden sm:inline">Recommendations</span>
                </TabsTrigger>
                <TabsTrigger value="consent" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy Settings</span>
                </TabsTrigger>
                {isAdmin && (
                  <>
                    <TabsTrigger value="platform" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Platform Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger value="abtesting" className="flex items-center gap-2">
                      <TestTube className="h-4 w-4" />
                      <span className="hidden sm:inline">A/B Testing</span>
                    </TabsTrigger>
                  </>
                )}
              </TabsList>

              <TabsContent value="journey" className="space-y-6">
                <UserJourneyVisualization />
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <RecommendationAnalytics />
              </TabsContent>

              <TabsContent value="consent" className="space-y-6">
                <AnalyticsConsentManager />
              </TabsContent>

              {isAdmin && (
                <>
                  <TabsContent value="platform" className="space-y-6">
                    <AdminAnalyticsDashboard />
                  </TabsContent>

                  <TabsContent value="abtesting" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TestTube className="h-5 w-5" />
                          A/B Testing Dashboard
                        </CardTitle>
                        <CardDescription>
                          Manage and monitor A/B tests for continuous platform improvement
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <TestTube className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-semibold mb-2">A/B Testing Interface</h3>
                          <p className="text-muted-foreground mb-6">
                            Advanced A/B testing interface coming soon. This will include experiment
                            creation, variant management, and statistical analysis tools.
                          </p>
                          <Button variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure Tests
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
