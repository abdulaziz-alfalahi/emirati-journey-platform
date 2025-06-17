
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSearchAnalytics, PerformanceReport } from '@/services/searchAnalytics';

interface SearchTerm {
  term: string;
  count: number;
}

interface ComponentStat {
  component: string;
  searches: number;
  filters: number;
}

export const SearchPerformanceDashboard: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceReport | null>(null);
  const [popularTerms, setPopularTerms] = useState<SearchTerm[]>([]);
  const [componentStats, setComponentStats] = useState<ComponentStat[]>([]);
  const { trackSearch, trackFilter } = useSearchAnalytics('SearchPerformanceDashboard');

  useEffect(() => {
    const loadData = () => {
      try {
        const report = useSearchAnalytics.getPerformanceReport();
        setPerformanceData(report);

        const terms = useSearchAnalytics.getPopularSearchTerms();
        const formattedTerms = terms.map((term, index) => ({
          term,
          count: 100 - (index * 15) // Mock decreasing counts
        }));
        setPopularTerms(formattedTerms);

        const stats = useSearchAnalytics.getComponentStats();
        const formattedStats = [{
          component: 'Search Dashboard',
          searches: stats.totalComponents,
          filters: stats.activeComponents
        }];
        setComponentStats(formattedStats);
      } catch (error) {
        console.error('Error loading search analytics:', error);
      }
    };

    loadData();
  }, []);

  if (!performanceData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Search Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading performance data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Total Searches</span>
            <Badge variant="secondary">{performanceData.totalSearches}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Success Rate</span>
            <Badge variant="secondary">{Math.round(performanceData.successRate * 100)}%</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Cache Hit Rate</span>
            <Progress value={performanceData.cacheHitRate * 100} className="w-20" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Search Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {popularTerms.slice(0, 5).map((term, index) => (
              <div key={term.term} className="flex justify-between items-center">
                <span className="text-sm">{term.term}</span>
                <Badge variant="outline">{term.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Component Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {componentStats.map((stat) => (
              <div key={stat.component} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{stat.component}</span>
                  <span>{stat.searches} searches</span>
                </div>
                <Progress value={(stat.searches / 100) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
