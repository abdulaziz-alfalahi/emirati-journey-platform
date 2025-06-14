// Placeholder for Sentry - install @sentry/react package for production use

/**
 * Initialize Sentry error tracking and performance monitoring
 */
export function initializeSentry(): void {
  console.log('Sentry placeholder - install @sentry/react for production use');
  return; // Placeholder implementation
}

/**
 * Placeholder functions for Sentry integration
 */
export const SentryErrorBoundary = (component: any) => component;

export function captureError(error: Error, context?: Record<string, any>): void {
  console.error('Error captured:', error, context);
}

export function capturePerformanceMeasurement(name: string, value: number, unit = 'ms'): void {
  console.log(`Performance: ${name}: ${value}${unit}`);
}

export function setUserContext(user: { id: string; email?: string; role?: string }): void {
  console.log('User context set:', user);
}