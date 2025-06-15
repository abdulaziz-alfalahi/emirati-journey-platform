
import { supabase } from '@/integrations/supabase/client';

export interface ABTestExperiment {
  id: string;
  experiment_name: string;
  feature_name: string;
  hypothesis: string;
  variant_a_config: Record<string, any>;
  variant_b_config: Record<string, any>;
  success_metric: string;
  start_date: string;
  end_date?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  created_by: string;
}

export interface ABTestResults {
  experiment_id: string;
  variant_a_metrics: {
    participants: number;
    conversions: number;
    conversion_rate: number;
    confidence_interval: [number, number];
  };
  variant_b_metrics: {
    participants: number;
    conversions: number;
    conversion_rate: number;
    confidence_interval: [number, number];
  };
  statistical_significance: boolean;
  confidence_level: number;
  winner?: 'A' | 'B' | 'no_difference';
}

class ABTestingService {
  async createExperiment(experiment: Omit<ABTestExperiment, 'id' | 'created_by'>): Promise<ABTestExperiment | null> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('ab_testing_experiments')
        .insert({
          ...experiment,
          created_by: user.user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to create A/B test experiment:', error);
      return null;
    }
  }

  async getActiveExperiments(): Promise<ABTestExperiment[]> {
    try {
      const { data, error } = await supabase
        .from('ab_testing_experiments')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get active experiments:', error);
      return [];
    }
  }

  async getAllExperiments(): Promise<ABTestExperiment[]> {
    try {
      const { data, error } = await supabase
        .from('ab_testing_experiments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get all experiments:', error);
      return [];
    }
  }

  async getUserAssignment(experimentId: string): Promise<'A' | 'B' | null> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return 'A'; // Default for unauthenticated users

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
      console.error('Failed to get user assignment:', error);
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
      console.error('Failed to assign user to variant:', error);
    }
  }

  async getExperimentResults(experimentId: string): Promise<ABTestResults | null> {
    try {
      // Get all assignments for this experiment
      const { data: assignments, error } = await supabase
        .from('ab_testing_assignments')
        .select('variant, user_id')
        .eq('experiment_id', experimentId);

      if (error || !assignments) throw error;

      // For now, we'll simulate conversion data
      // In a real implementation, you'd track actual conversion events
      const variantA = assignments.filter(a => a.variant === 'A');
      const variantB = assignments.filter(a => a.variant === 'B');

      // Simulate conversion rates (replace with actual conversion tracking)
      const aConversions = Math.floor(variantA.length * (0.15 + Math.random() * 0.1));
      const bConversions = Math.floor(variantB.length * (0.18 + Math.random() * 0.1));

      const aConversionRate = variantA.length > 0 ? aConversions / variantA.length : 0;
      const bConversionRate = variantB.length > 0 ? bConversions / variantB.length : 0;

      // Simple statistical significance calculation (chi-square test approximation)
      const totalA = variantA.length;
      const totalB = variantB.length;
      const pooledRate = (aConversions + bConversions) / (totalA + totalB);
      
      const seA = Math.sqrt(pooledRate * (1 - pooledRate) / totalA);
      const seB = Math.sqrt(pooledRate * (1 - pooledRate) / totalB);
      const seDiff = Math.sqrt(seA * seA + seB * seB);
      
      const zScore = Math.abs(aConversionRate - bConversionRate) / seDiff;
      const isSignificant = zScore > 1.96; // 95% confidence level

      // Determine winner
      let winner: 'A' | 'B' | 'no_difference' = 'no_difference';
      if (isSignificant) {
        winner = aConversionRate > bConversionRate ? 'A' : 'B';
      }

      return {
        experiment_id: experimentId,
        variant_a_metrics: {
          participants: totalA,
          conversions: aConversions,
          conversion_rate: aConversionRate,
          confidence_interval: [
            Math.max(0, aConversionRate - 1.96 * seA),
            Math.min(1, aConversionRate + 1.96 * seA)
          ]
        },
        variant_b_metrics: {
          participants: totalB,
          conversions: bConversions,
          conversion_rate: bConversionRate,
          confidence_interval: [
            Math.max(0, bConversionRate - 1.96 * seB),
            Math.min(1, bConversionRate + 1.96 * seB)
          ]
        },
        statistical_significance: isSignificant,
        confidence_level: 0.95,
        winner
      };
    } catch (error) {
      console.error('Failed to get experiment results:', error);
      return null;
    }
  }

  async updateExperimentStatus(experimentId: string, status: ABTestExperiment['status']): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ab_testing_experiments')
        .update({ status })
        .eq('id', experimentId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to update experiment status:', error);
      return false;
    }
  }
}

export const abTestingService = new ABTestingService();

// Helper functions for components
export const getActiveTests = (): ABTestExperiment[] => {
  // This would typically come from a cache or state management
  return [];
};

export const getTestResults = (testId: string): ABTestResults | null => {
  // This would typically come from a cache or state management
  return null;
};

export const getUserTestAssignment = (userId: string, testId: string): 'A' | 'B' => {
  // Simple hash-based assignment for demo purposes
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 2 === 0 ? 'A' : 'B';
};
