
// Search analytics service placeholder
export const useSearchAnalytics = (context: string) => {
  return {
    trackSearch: (query: string, results: number, time: number, success: boolean) => {
      console.log('Search tracked:', { context, query, results, time, success });
    },
    trackFilter: (filters: number, results: number, time: number) => {
      console.log('Filter tracked:', { context, filters, results, time });
    }
  };
};
