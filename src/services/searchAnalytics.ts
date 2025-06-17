
export interface PerformanceReport {
  totalSearches: number;
  averageResponseTime: number;
  successRate: number;
  popularQueries: string[];
  cacheHitRate: number;
  totalFilterChanges: number;
  apiCallsReduced: number;
}

export const searchAnalytics = {
  generateReport: (): PerformanceReport => ({
    totalSearches: 1234,
    averageResponseTime: 150,
    successRate: 0.95,
    popularQueries: ['javascript', 'react', 'python'],
    cacheHitRate: 0.85,
    totalFilterChanges: 567,
    apiCallsReduced: 890
  }),
  
  getPerformanceReport: (): PerformanceReport => ({
    totalSearches: 1234,
    averageResponseTime: 150,
    successRate: 0.95,
    popularQueries: ['javascript', 'react', 'python'],
    cacheHitRate: 0.85,
    totalFilterChanges: 567,
    apiCallsReduced: 890
  }),
  
  getPopularSearchTerms: (): string[] => ['javascript', 'react', 'python'],
  
  getComponentStats: () => ({
    totalComponents: 45,
    activeComponents: 38,
    averageSearchTime: 120
  })
};

export const useSearchAnalytics = (componentName: string) => {
  const trackSearch = (query: string, resultsCount: number, responseTime: number, hasResults: boolean) => {
    console.log(`Search tracked in ${componentName}:`, {
      query,
      resultsCount,
      responseTime,
      hasResults
    });
  };

  const trackFilter = (filtersApplied: number, resultsCount: number, responseTime: number) => {
    console.log(`Filter tracked in ${componentName}:`, {
      filtersApplied,
      resultsCount,
      responseTime
    });
  };

  return {
    trackSearch,
    trackFilter
  };
};

// Add static methods to useSearchAnalytics for compatibility
useSearchAnalytics.getPerformanceReport = searchAnalytics.getPerformanceReport;
useSearchAnalytics.getPopularSearchTerms = searchAnalytics.getPopularSearchTerms;
useSearchAnalytics.getComponentStats = searchAnalytics.getComponentStats;
