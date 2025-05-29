
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  ThumbsUp, 
  Eye, 
  MousePointer, 
  Star,
  Users,
  Activity
} from 'lucide-react';
import { getActiveTests, getTestResults, getUserTestAssignment } from '@/services/abTestingService';
import { getUserFeedbackStats } from '@/services/recommendationFeedbackService';
import { useAuth } from '@/context/AuthContext';

const RecommendationAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [activeTests, setActiveTests] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [userStats, setUserStats] = useState<any>(null);
  const [userAssignment, setUserAssignment] = useState<any>(null);

  useEffect(() => {
    loadAnalyticsData();
  }, [user]);

  const loadAnalyticsData = async () => {
    if (!user) return;

    try {
      // Load active tests
      const tests = getActiveTests();
      setActiveTests(tests);

      // Load test results for each active test
      const results: Record<string, any> = {};
      for (const test of tests) {
        results[test.id] = getTestResults(test.id);
      }
      setTestResults(results);

      // Load user feedback stats
      const stats = await getUserFeedbackStats(user.id);
      setUserStats(stats);

      // Get user's current test assignment
      if (tests.length > 0) {
        const assignment = getUserTestAssignment(user.id, tests[0].id);
        setUserAssignment(assignment);
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
    }
  };

  const formatChartData = (results: Record<string, any>) => {
    return Object.entries(results).map(([variantId, stats]) => ({
      variant: variantId,
      clickRate: stats.clickThroughRate || 0,
      conversionRate: stats.conversionRate || 0,
      feedbackRate: stats.feedbackRate || 0,
      assignments: stats.assignments || 0
    }));
  };

  // Custom tooltip formatter that handles type safety
  const formatTooltipValue = (value: any, name: string) => {
    const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    return [`${numValue.toFixed(1)}%`, name === 'clickRate' ? 'Click Rate' : name];
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommendation Analytics</CardTitle>
          <CardDescription>Login to view analytics</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Recommendation Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Performance metrics and A/B testing results for recommendation algorithms
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="abtests">A/B Tests</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Algorithm</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userAssignment ? userAssignment.variantId : 'Control'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current recommendation variant
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback Given</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats?.totalFeedback || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Total recommendations rated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Helpful Rate</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats?.totalFeedback > 0 ? 
                    Math.round((userStats.helpfulCount / userStats.totalFeedback) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommendations marked helpful
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applied</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats?.appliedCount || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Opportunities applied to
                </p>
              </CardContent>
            </Card>
          </div>

          {userStats && (
            <Card>
              <CardHeader>
                <CardTitle>Your Recommendation Experience</CardTitle>
                <CardDescription>Personal statistics and feedback summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Rating</span>
                      <span>{userStats.averageRating.toFixed(1)}/5.0</span>
                    </div>
                    <Progress value={(userStats.averageRating / 5) * 100} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Helpful: </span>
                      <Badge variant="secondary">{userStats.helpfulCount}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Applied: </span>
                      <Badge variant="secondary">{userStats.appliedCount}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="abtests" className="space-y-4">
          {activeTests.map((test) => {
            const results = testResults[test.id];
            if (!results) return null;

            const chartData = formatChartData(results);

            return (
              <Card key={test.id}>
                <CardHeader>
                  <CardTitle>{test.name}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Click-Through Rates</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="variant" />
                          <YAxis />
                          <Tooltip formatter={formatTooltipValue} />
                          <Bar dataKey="clickRate" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-4">User Distribution</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="assignments"
                            label={({ variant, assignments }) => `${variant}: ${assignments}`}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Variant Performance</h4>
                    <div className="space-y-2">
                      {Object.entries(results).map(([variantId, stats]: [string, any]) => (
                        <div key={variantId} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <span className="font-medium capitalize">{variantId}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({stats.assignments} users)
                            </span>
                          </div>
                          <div className="flex space-x-4 text-sm">
                            <span>CTR: {stats.clickThroughRate.toFixed(1)}%</span>
                            <span>Conv: {stats.conversionRate.toFixed(1)}%</span>
                            <span>Feedback: {stats.feedbackRate.toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {activeTests.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active A/B Tests</h3>
                <p className="text-muted-foreground">
                  A/B tests will appear here when they're running
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Analysis</CardTitle>
              <CardDescription>
                How user feedback is improving our recommendation algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Continuous Improvement</h3>
                  <p className="text-muted-foreground">
                    Your feedback directly influences our recommendation algorithms. 
                    We use machine learning to adapt and improve based on user preferences.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="text-center">
                      <Eye className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                      <CardTitle className="text-lg">Tracking</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground">
                      We monitor how you interact with recommendations to understand preferences
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <TrendingUp className="mx-auto h-8 w-8 text-green-500 mb-2" />
                      <CardTitle className="text-lg">Learning</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground">
                      Feedback helps our AI learn what makes recommendations more relevant
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <Star className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                      <CardTitle className="text-lg">Optimizing</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground">
                      Algorithms are continuously refined to provide better matches
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How We Use Your Feedback:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Adjust recommendation scoring weights based on what you find helpful</li>
                    <li>• Identify patterns in successful matches to improve future suggestions</li>
                    <li>• A/B test different algorithms to optimize effectiveness</li>
                    <li>• Learn your preferences to personalize future recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Want to see more insights?</h3>
              <p className="text-sm text-muted-foreground">
                Continue providing feedback to unlock detailed analytics
              </p>
            </div>
            <Button onClick={loadAnalyticsData} variant="outline">
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationAnalytics;
