
import { useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePhase } from '../context/PhaseContext';
import { crossPhaseAnalyticsService } from '../services/crossPhaseAnalyticsService';

export const useAnalytics = () => {
  const { user } = useAuth();
  const { currentPhase } = usePhase();

  const trackEvent = useCallback((eventType, eventData = {}) => {
    if (!currentPhase) return;
    
    const event = {
      phase: currentPhase,
      event_type: eventType,
      event_data: eventData,
      session_id: sessionStorage.getItem('sessionId') || 'unknown'
    };
    
    crossPhaseAnalyticsService.trackEvent(event);
  }, [currentPhase]);

  const trackPhaseTransition = useCallback((transition) => {
    crossPhaseAnalyticsService.trackPhaseTransition(transition);
  }, []);

  const trackFeatureUsage = useCallback((usage) => {
    crossPhaseAnalyticsService.trackFeatureUsage(usage);
  }, []);

  const trackMilestone = useCallback((milestone) => {
    crossPhaseAnalyticsService.trackMilestone(milestone);
  }, []);

  const trackPageView = useCallback((pageName, additionalData = {}) => {
    trackEvent('page_view', {
      page_name: pageName,
      ...additionalData
    });
  }, [trackEvent]);

  const trackUserAction = useCallback((action, context = {}) => {
    trackEvent('user_action', {
      action,
      ...context
    });
  }, [trackEvent]);

  const trackError = useCallback((error, context = {}) => {
    trackEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      ...context
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPhaseTransition,
    trackFeatureUsage,
    trackMilestone,
    trackPageView,
    trackUserAction,
    trackError
  };
};

export const useFeatureTracking = (featureName) => {
  const { currentPhase } = usePhase();
  const startTime = useCallback(() => Date.now(), []);

  const trackFeatureUsage = useCallback((
    actionType, 
    duration, 
    success = true,
    context = {}
  ) => {
    if (!currentPhase) return;

    const usage = {
      feature_name: featureName,
      phase: currentPhase,
      action_type: actionType,
      duration_seconds: duration ? Math.round(duration / 1000) : undefined,
      success_rate: success ? 1 : 0,
      usage_context: context
    };

    crossPhaseAnalyticsService.trackFeatureUsage(usage);
  }, [featureName, currentPhase]);

  const trackFeatureStart = useCallback((context = {}) => {
    const start = startTime();
    trackFeatureUsage('start', undefined, true, { ...context, start_time: start });
    return start;
  }, [trackFeatureUsage, startTime]);

  const trackFeatureEnd = useCallback((startTime, success = true, context = {}) => {
    const duration = Date.now() - startTime;
    trackFeatureUsage('end', duration, success, context);
  }, [trackFeatureUsage]);

  return {
    trackFeatureUsage,
    trackFeatureStart,
    trackFeatureEnd
  };
};
