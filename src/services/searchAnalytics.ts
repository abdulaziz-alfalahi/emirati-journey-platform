
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
