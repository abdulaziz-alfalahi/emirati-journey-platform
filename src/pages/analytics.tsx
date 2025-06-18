
import React, { useState } from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
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

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const { activeRole } = useRole();

  const isAdmin = activeRole === 'administrator' || activeRole === 'super_user';

  // Analytics-focused statistics
  const stats = [
    {
      value: "2.5M+",
      label: "Data Points Collected",
      icon: Database
    },
    {
      value: "150+",
      label: "Insights Generated",
      icon: TrendingUp
    },
    {
      value: "99.8%",
      label: "Privacy Compliance Rate",
      icon: Shield
    },
    {
      value: "87%",
      label: "User Engagement Score",
      icon: Activity
    }
  ];

  // Define tabs based on user role
  const getTabs = () => {
    const baseTabs = [
      {
        id: 'journey',
        label: 'My Journey',
        icon: <TrendingUp className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            {/* Header with badges */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <BarChart3 className="h-8 w-8" />
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Track your progress and gain insights from your lifelong engagement journey
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

            <UserJourneyVisualization />
          </div>
        )
      },
      {
        id: 'recommendations',
        label: 'Recommendations',
        icon: <TestTube className="h-4 w-4" />,
        content: <RecommendationAnalytics />
      },
      {
        id: 'consent',
        label: 'Privacy Settings',
        icon: <Shield className="h-4 w-4" />,
        content: <AnalyticsConsentManager />
      }
    ];

    if (isAdmin) {
      baseTabs.push(
        {
          id: 'platform',
          label: 'Platform Analytics',
          icon: <BarChart3 className="h-4 w-4" />,
          content: <AdminAnalyticsDashboard />
        },
        {
          id: 'abtesting',
          label: 'A/B Testing',
          icon: <TestTube className="h-4 w-4" />,
          content: (
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
          )
        }
      );
    }

    return baseTabs;
  };

  if (!user) {
    return (
      <LifelongEngagementLayout
        title="Analytics & Insights Access Required"
        description="Please sign in to view your analytics and journey insights."
        icon={<BarChart3 className="h-12 w-12" />}
        stats={[]}
        tabs={[
          {
            id: 'signin',
            label: 'Sign In Required',
            icon: <BarChart3 className="h-4 w-4" />,
            content: (
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
            )
          }
        ]}
      />
    );
  }

  return (
    <LifelongEngagementLayout
      title="Analytics & Insights"
      description="Comprehensive analytics across your citizen lifecycle journey with privacy-first data insights and personalized recommendations."
      icon={<BarChart3 className="h-12 w-12" />}
      stats={stats}
      tabs={getTabs()}
      defaultTab="journey"
    />
  );
};

export default AnalyticsPage;
