
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface AnalyticsEvent {
  phase: string;
  event_type: string;
  event_data: Record<string, any>;
  session_id: string;
}

export interface PhaseTransition {
  from_phase?: string;
  to_phase: string;
  transition_reason?: string;
  readiness_score?: number;
  completion_percentage?: number;
  transition_data?: Record<string, any>;
}

export interface FeatureUsage {
  feature_name: string;
  phase: string;
  action_type: string;
  duration_seconds?: number;
  success_rate?: number;
  error_data?: Record<string, any>;
  usage_context?: Record<string, any>;
}

export interface UserMilestone {
  phase: string;
  milestone_type: string;
  milestone_name: string;
  milestone_data?: Record<string, any>;
  points_earned?: number;
}

export interface ConsentSettings {
  essential_analytics: boolean;
  performance_analytics: boolean;
  personalization_analytics: boolean;
  marketing_analytics: boolean;
}

class CrossPhaseAnalyticsService {
  private sessionId: string;
  private isTrackingEnabled: boolean = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeTracking() {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const consent = await this.getAnalyticsConsent(user.user.id);
        this.isTrackingEnabled = consent?.essential_analytics || false;
      }
    } catch (error) {
      console.warn('Failed to initialize analytics tracking:', error);
    }
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    if (!this.isTrackingEnabled) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      await supabase.from('user_journey_analytics').insert({
        user_id: user.user.id,
        phase: event.phase,
        event_type: event.event_type,
        event_data: event.event_data,
        session_id: this.sessionId,
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.warn('Failed to track analytics event:', error);
    }
  }

  async trackPhaseTransition(transition: PhaseTransition): Promise<void> {
    if (!this.isTrackingEnabled) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      await supabase.from('phase_transitions').insert({
        user_id: user.user.id,
        from_phase: transition.from_phase,
        to_phase: transition.to_phase,
        transition_reason: transition.transition_reason,
        readiness_score: transition.readiness_score,
        completion_percentage: transition.completion_percentage,
        transition_data: transition.transition_data || {}
      });
    } catch (error) {
      console.warn('Failed to track phase transition:', error);
    }
  }

  async trackFeatureUsage(usage: FeatureUsage): Promise<void> {
    if (!this.isTrackingEnabled) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      
      await supabase.from('feature_usage_analytics').insert({
        user_id: user.user?.id,
        feature_name: usage.feature_name,
        phase: usage.phase,
        action_type: usage.action_type,
        duration_seconds: usage.duration_seconds,
        success_rate: usage.success_rate,
        error_data: usage.error_data,
        usage_context: usage.usage_context || {}
      });
    } catch (error) {
      console.warn('Failed to track feature usage:', error);
    }
  }

  async trackMilestone(milestone: UserMilestone): Promise<void> {
    if (!this.isTrackingEnabled) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      await supabase.from('user_journey_milestones').insert({
        user_id: user.user.id,
        phase: milestone.phase,
        milestone_type: milestone.milestone_type,
        milestone_name: milestone.milestone_name,
        milestone_data: milestone.milestone_data || {},
        points_earned: milestone.points_earned || 0
      });
    } catch (error) {
      console.warn('Failed to track milestone:', error);
    }
  }

  async updateAnalyticsConsent(consent: ConsentSettings): Promise<void> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      await supabase.from('analytics_consent').upsert({
        user_id: user.user.id,
        essential_analytics: consent.essential_analytics,
        performance_analytics: consent.performance_analytics,
        personalization_analytics: consent.personalization_analytics,
        marketing_analytics: consent.marketing_analytics,
        consent_updated_at: new Date().toISOString(),
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent
      });

      this.isTrackingEnabled = consent.essential_analytics;
    } catch (error) {
      console.warn('Failed to update analytics consent:', error);
    }
  }

  async getAnalyticsConsent(userId: string): Promise<ConsentSettings | null> {
    try {
      const { data, error } = await supabase
        .from('analytics_consent')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error || !data) return null;

      return {
        essential_analytics: data.essential_analytics,
        performance_analytics: data.performance_analytics,
        personalization_analytics: data.personalization_analytics,
        marketing_analytics: data.marketing_analytics
      };
    } catch (error) {
      console.warn('Failed to get analytics consent:', error);
      return null;
    }
  }

  async getUserJourneyAnalytics(userId: string, timeRange?: { start: Date; end: Date }) {
    try {
      let query = supabase
        .from('user_journey_analytics')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (timeRange) {
        query = query
          .gte('created_at', timeRange.start.toISOString())
          .lte('created_at', timeRange.end.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;

      return data;
    } catch (error) {
      console.warn('Failed to get user journey analytics:', error);
      return [];
    }
  }

  async getPhaseTransitions(userId: string) {
    try {
      const { data, error } = await supabase
        .from('phase_transitions')
        .select('*')
        .eq('user_id', userId)
        .order('transition_date', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Failed to get phase transitions:', error);
      return [];
    }
  }

  async getUserMilestones(userId: string, phase?: string) {
    try {
      let query = supabase
        .from('user_journey_milestones')
        .select('*')
        .eq('user_id', userId)
        .order('achieved_at', { ascending: false });

      if (phase) {
        query = query.eq('phase', phase);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data;
    } catch (error) {
      console.warn('Failed to get user milestones:', error);
      return [];
    }
  }

  private async getClientIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return null;
    }
  }

  // A/B Testing Methods
  async getUserABAssignment(experimentId: string): Promise<'A' | 'B' | null> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return null;

      const { data, error } = await supabase
        .from('ab_testing_assignments')
        .select('variant')
        .eq('experiment_id', experimentId)
        .eq('user_id', user.user.id)
        .single();

      if (error || !data) {
        // Assign user to a variant if not already assigned
        const variant = Math.random() < 0.5 ? 'A' : 'B';
        await this.assignUserToVariant(experimentId, variant);
        return variant;
      }

      return data.variant as 'A' | 'B';
    } catch (error) {
      console.warn('Failed to get A/B assignment:', error);
      return 'A'; // Default to variant A
    }
  }

  private async assignUserToVariant(experimentId: string, variant: 'A' | 'B'): Promise<void> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      await supabase.from('ab_testing_assignments').insert({
        experiment_id: experimentId,
        user_id: user.user.id,
        variant
      });
    } catch (error) {
      console.warn('Failed to assign user to A/B variant:', error);
    }
  }
}

export const crossPhaseAnalyticsService = new CrossPhaseAnalyticsService();
