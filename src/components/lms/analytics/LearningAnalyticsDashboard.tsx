
import React, { useState, useEffect } from 'react';
import { AnalyticsHeader } from './AnalyticsHeader';
import { AnalyticsMetrics } from './AnalyticsMetrics';
import { AnalyticsTabs } from './AnalyticsTabs';

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

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      <AnalyticsMetrics
        data={analyticsData}
        loading={loading}
      />

      <AnalyticsTabs data={analyticsData} />
    </div>
  );
};
