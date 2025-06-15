
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Shield, TestTube, TrendingUp, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';
import { UserJourneyVisualization } from '@/components/analytics/UserJourneyVisualization';
import { AnalyticsConsentManager } from '@/components/analytics/AnalyticsConsentManager';
import { AdminAnalyticsDashboard } from '@/components/analytics/AdminAnalyticsDashboard';
import RecommendationAnalytics from '@/components/dashboard/RecommendationAnalytics';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const { activeRole } = useRole();
  const [activeTab, setActiveTab] = useState('journey');

  const isAdmin = activeRole === 'administrator' || activeRole === 'super_user';

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics Access Required</h3>
              <p className="text-muted-foreground mb-4">
                Please sign in to view your analytics and journey insights.
              </p>
              <Button onClick={() => window.location.href = '/auth'}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="h-8 w-8" />
              Analytics & Insights
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analytics across your citizen lifecycle journey
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="journey" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              My Journey
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="consent" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy Settings
            </TabsTrigger>
            {isAdmin && (
              <>
                <TabsTrigger value="platform" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Platform Analytics
                </TabsTrigger>
                <TabsTrigger value="abtesting" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  A/B Testing
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="journey">
            <UserJourneyVisualization />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationAnalytics />
          </TabsContent>

          <TabsContent value="consent">
            <AnalyticsConsentManager />
          </TabsContent>

          {isAdmin && (
            <>
              <TabsContent value="platform">
                <AdminAnalyticsDashboard />
              </TabsContent>

              <TabsContent value="abtesting">
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
                    <div className="text-center py-8 text-muted-foreground">
                      <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">A/B Testing Interface</h3>
                      <p className="mb-4">
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

        {/* Privacy Notice */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium mb-1">Privacy & Data Protection</h4>
                <p className="text-muted-foreground">
                  All analytics data is anonymized and encrypted. We use this information to improve
                  your experience and platform functionality. You maintain full control over your
                  data sharing preferences through the Privacy Settings tab.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
