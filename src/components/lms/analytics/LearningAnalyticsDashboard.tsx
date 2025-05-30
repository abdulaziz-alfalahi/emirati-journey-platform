
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Clock, Award, BookOpen, Activity } from 'lucide-react';
import { EngagementChart } from './EngagementChart';
import { CompletionRatesChart } from './CompletionRatesChart';
import { LearningPatternsChart } from './LearningPatternsChart';
import { CoursePerformanceTable } from './CoursePerformanceTable';

interface AnalyticsData {
  totalLearners: number;
  activeCoursesCount: number;
  averageCompletionRate: number;
  totalStudyHours: number;
  engagementTrend: Array<{ date: string; engagement: number }>;
  completionRates: Array<{ course: string; rate: number }>;
  learningPatterns: Array<{ timeSlot: string; activity: number }>;
}

interface LearningAnalyticsDashboardProps {
  timeRange?: string;
  onTimeRangeChange?: (range: string) => void;
}

export const LearningAnalyticsDashboard: React.FC<LearningAnalyticsDashboardProps> = ({
  timeRange = '30d',
  onTimeRangeChange
}) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalLearners: 245,
    activeCoursesCount: 18,
    averageCompletionRate: 73,
    totalStudyHours: 1247,
    engagementTrend: [
      { date: '2024-01-01', engagement: 85 },
      { date: '2024-01-02', engagement: 92 },
      { date: '2024-01-03', engagement: 78 },
      { date: '2024-01-04', engagement: 88 },
      { date: '2024-01-05', engagement: 95 },
      { date: '2024-01-06', engagement: 82 },
      { date: '2024-01-07', engagement: 89 }
    ],
    completionRates: [
      { course: 'React Fundamentals', rate: 89 },
      { course: 'JavaScript Mastery', rate: 76 },
      { course: 'UI/UX Design', rate: 82 },
      { course: 'Data Analytics', rate: 65 },
      { course: 'Project Management', rate: 91 }
    ],
    learningPatterns: [
      { timeSlot: '6-8 AM', activity: 15 },
      { timeSlot: '8-10 AM', activity: 45 },
      { timeSlot: '10-12 PM', activity: 78 },
      { timeSlot: '12-2 PM', activity: 52 },
      { timeSlot: '2-4 PM', activity: 68 },
      { timeSlot: '4-6 PM', activity: 85 },
      { timeSlot: '6-8 PM', activity: 92 },
      { timeSlot: '8-10 PM', activity: 67 }
    ]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real implementation, this would fetch data based on timeRange
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const handleTimeRangeChange = (range: string) => {
    onTimeRangeChange?.(range);
    // Simulate data refresh
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-32">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Learning Analytics</h2>
          <p className="text-muted-foreground">
            Track engagement, completion rates, and learning patterns
          </p>
        </div>
        
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Learners</p>
                <p className="text-2xl font-bold">{analyticsData.totalLearners}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">{analyticsData.activeCoursesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">{analyticsData.averageCompletionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Study Hours</p>
                <p className="text-2xl font-bold">{analyticsData.totalStudyHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="completion">Completion Rates</TabsTrigger>
          <TabsTrigger value="patterns">Learning Patterns</TabsTrigger>
          <TabsTrigger value="performance">Course Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Engagement Trends
              </CardTitle>
              <CardDescription>
                Daily engagement levels across all courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementChart data={analyticsData.engagementTrend} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Course Completion Rates
              </CardTitle>
              <CardDescription>
                Completion rates by course over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompletionRatesChart data={analyticsData.completionRates} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Learning Activity Patterns
              </CardTitle>
              <CardDescription>
                When learners are most active throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LearningPatternsChart data={analyticsData.learningPatterns} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Course Performance Overview
              </CardTitle>
              <CardDescription>
                Detailed performance metrics for each course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CoursePerformanceTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
