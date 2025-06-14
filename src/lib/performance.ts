import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Interface for Core Web Vitals metrics
 */
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * Performance monitoring configuration
 */
interface PerformanceConfig {
  enableLogging: boolean;
  enableAnalytics: boolean;
  endpoint?: string;
}

const defaultConfig: PerformanceConfig = {
  enableLogging: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
};

/**
 * Initialize Core Web Vitals monitoring
 * @param config - Performance monitoring configuration
 */
export function initializePerformanceMonitoring(
  config: Partial<PerformanceConfig> = {}
): void {
  const finalConfig = { ...defaultConfig, ...config };

  const handleMetric = (metric: WebVitalsMetric) => {
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
function sendToAnalytics(metric: WebVitalsMetric): void {
  // Replace with your analytics service
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', metric.name, {
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
} as const;

/**
 * Check if metric exceeds performance budget
 * @param metricName - Name of the metric
 * @param value - Metric value
 * @returns Whether the metric exceeds the budget
 */
export function exceedsPerformanceBudget(
  metricName: keyof typeof performanceBudgets,
  value: number
): boolean {
  return value > performanceBudgets[metricName];
}

/**
 * Performance observer for monitoring long tasks
 */
export function observeLongTasks(): void {
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
export function monitorMemoryUsage(): {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  usagePercentage: number;
} | null {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
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