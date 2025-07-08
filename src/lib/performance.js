import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Performance monitoring configuration defaults
 */
const defaultConfig = {
  enableLogging: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
};

/**
 * Initialize Core Web Vitals monitoring
 * @param config - Performance monitoring configuration
 */
export function initializePerformanceMonitoring(config = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  const handleMetric = (metric) => {
    if (finalConfig.enableLogging) {
      console.log(`${metric.name}: ${metric.value} (${metric.rating})`);
    }

    if (finalConfig.enableAnalytics) {
      // Send to analytics service
      sendToAnalytics(metric);
    }
  };

  // Collect Core Web Vitals
  onCLS(handleMetric);
  onINP(handleMetric);
  onFCP(handleMetric);
  onLCP(handleMetric);
  onTTFB(handleMetric);
}

/**
 * Send metrics to analytics service
 * @param metric - Web vitals metric to send
 */
function sendToAnalytics(metric) {
  // Replace with your analytics service
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', metric.name, {
      custom_parameter_value: metric.value,
      custom_parameter_rating: metric.rating,
      custom_parameter_delta: metric.delta,
    });
  }
}

/**
 * Performance budget checker
 */
export const performanceBudgets = {
  LCP: 2500, // Largest Contentful Paint should be under 2.5s
  FID: 100, // First Input Delay should be under 100ms
  CLS: 0.1, // Cumulative Layout Shift should be under 0.1
  FCP: 1800, // First Contentful Paint should be under 1.8s
  TTFB: 800, // Time to First Byte should be under 800ms
};

/**
 * Check if metric exceeds performance budget
 * @param metricName - Name of the metric
 * @param value - Metric value
 * @returns Whether the metric exceeds the budget
 */
export function exceedsPerformanceBudget(metricName, value) {
  return value > performanceBudgets[metricName];
}

/**
 * Performance observer for monitoring long tasks
 */
export function observeLongTasks() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.duration > 50) {
          console.warn(
            `Long task detected: ${entry.duration}ms`,
            entry
          );
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
      console.warn('Long task monitoring not supported');
    }
  }
}

/**
 * Memory usage monitoring
 */
export function monitorMemoryUsage() {
  if ('memory' in performance) {
    const memory = performance.memory;
    const usage = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    };

    if (usage.usagePercentage > 90) {
      console.warn('High memory usage detected:', usage);
    }

    return usage;
  }
  return null;
}