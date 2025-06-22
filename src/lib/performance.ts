
interface PerformanceConfig {
  enableLogging?: boolean;
  enableAnalytics?: boolean;
}

export const initializePerformanceMonitoring = (config: PerformanceConfig = {}) => {
  const { enableLogging = false, enableAnalytics = false } = config;

  if (enableLogging) {
    console.log('Performance monitoring initialized');
  }

  // Basic performance monitoring
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          const ttfb = perfData.responseStart - perfData.fetchStart;
          if (enableLogging) {
            console.log(`TTFB: ${ttfb} (${ttfb < 600 ? 'good' : ttfb < 1000 ? 'needs improvement' : 'poor'})`);
          }
        }
      }, 0);
    });
  }
};
