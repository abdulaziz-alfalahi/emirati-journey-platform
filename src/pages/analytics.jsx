
import React, { useState } from 'react';
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
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';

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

  const tabs = [
    {
      id: 'journey',
      label: 'My Journey',
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <UserJourneyVisualization />
        </div>
      )
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: <TestTube className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <RecommendationAnalytics />
        </div>
      )
    },
    {
      id: 'consent',
      label: 'Privacy Settings',
      icon: <Shield className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
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
          <AnalyticsConsentManager />
        </div>
      )
    }
  ];

  // Add admin tabs if user is admin
  if (isAdmin) {
    tabs.push(
      {
        id: 'platform',
        label: 'Platform Analytics',
        icon: <BarChart3 className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            <AdminAnalyticsDashboard />
          </div>
        )
      },
      {
        id: 'abtesting',
        label: 'A/B Testing',
        icon: <TestTube className="h-4 w-4" />,
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  A/B Testing Interface
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
          </div>
        )
      }
    );
  }

  if (!user) {
    return (
      <ProfessionalGrowthLayout
        title="Analytics & Insights"
        description="Comprehensive analytics across your citizen lifecycle journey with privacy-first data insights"
        icon={<BarChart3 className="h-12 w-12 text-white" />}
        stats={stats}
        tabs={[
          {
            id: 'signin',
            label: 'Sign In Required',
            icon: <Eye className="h-4 w-4" />,
            content: (
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
            )
          }
        ]}
        defaultTab="signin"
      />
    );
  }

  return (
    <ProfessionalGrowthLayout
      title="Analytics & Insights"
      description="Comprehensive analytics across your citizen lifecycle journey with privacy-first data insights"
      icon={<BarChart3 className="h-12 w-12 text-white" />}
      stats={stats}
      tabs={tabs}
      defaultTab="journey"
    />
  );
};

export default AnalyticsPage;
