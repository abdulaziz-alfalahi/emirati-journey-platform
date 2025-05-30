
import { supabase } from '@/integrations/supabase/client';
import { mentorshipService } from '../mentorshipService';
import type { MenteePreferences, MatchSuggestion } from '@/types/mentorship';

export class MatchReEvaluationService {
  // Track when profiles were last updated to trigger re-evaluation
  async scheduleReEvaluation(userId: string, triggerType: 'mentor_profile_update' | 'mentee_preferences_update'): Promise<void> {
    const { error } = await supabase
      .from('match_re_evaluation_queue' as any)
      .insert({
        user_id: userId,
        trigger_type: triggerType,
        status: 'pending',
        scheduled_for: new Date().toISOString()
      });

    if (error) {
      console.error('Error scheduling re-evaluation:', error);
      throw error;
    }
  }

  // Re-evaluate matches for a specific user
  async reEvaluateMatches(userId: string, preferences: MenteePreferences): Promise<MatchSuggestion[]> {
    try {
      console.log(`Re-evaluating matches for user: ${userId}`);
      
      // Get fresh match suggestions
      const newSuggestions = await mentorshipService.getMatchSuggestions(preferences);
      
      // Store the new matches with timestamp
      await this.storeUpdatedMatches(userId, newSuggestions);
      
      // Mark re-evaluation as completed
      await this.markReEvaluationComplete(userId);
      
      return newSuggestions;
    } catch (error: any) {
      console.error('Error during match re-evaluation:', error);
      await this.markReEvaluationFailed(userId, error.message);
      throw error;
    }
  }

  // Check if user needs re-evaluation based on profile changes
  async checkIfReEvaluationNeeded(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('match_re_evaluation_queue' as any)
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking re-evaluation queue:', error);
      return false;
    }

    return !!data;
  }

  // Get the last time matches were evaluated for a user
  async getLastEvaluationTime(userId: string): Promise<Date | null> {
    const { data, error } = await supabase
      .from('match_evaluations' as any)
      .select('evaluated_at')
      .eq('user_id', userId)
      .order('evaluated_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error getting last evaluation time:', error);
      return null;
    }

    return data ? new Date(data.evaluated_at) : null;
  }

  // Store updated matches in the database
  private async storeUpdatedMatches(userId: string, suggestions: MatchSuggestion[]): Promise<void> {
    const { error } = await supabase
      .from('match_evaluations' as any)
      .insert({
        user_id: userId,
        match_suggestions: suggestions,
        evaluated_at: new Date().toISOString(),
        suggestion_count: suggestions.length
      });

    if (error) {
      console.error('Error storing updated matches:', error);
      throw error;
    }
  }

  // Mark re-evaluation as completed
  private async markReEvaluationComplete(userId: string): Promise<void> {
    const { error } = await supabase
      .from('match_re_evaluation_queue' as any)
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('status', 'pending');

    if (error) {
      console.error('Error marking re-evaluation complete:', error);
    }
  }

  // Mark re-evaluation as failed
  private async markReEvaluationFailed(userId: string, errorMessage: string): Promise<void> {
    const { error } = await supabase
      .from('match_re_evaluation_queue' as any)
      .update({
        status: 'failed',
        error_message: errorMessage,
        completed_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('status', 'pending');

    if (error) {
      console.error('Error marking re-evaluation failed:', error);
    }
  }

  // Process pending re-evaluations (this could be called by a background job)
  async processPendingReEvaluations(): Promise<void> {
    const { data: pendingEvaluations, error } = await supabase
      .from('match_re_evaluation_queue' as any)
      .select(`
        *,
        profiles!inner(id, resume_data)
      `)
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .limit(10); // Process in batches

    if (error) {
      console.error('Error fetching pending re-evaluations:', error);
      return;
    }

    for (const evaluation of pendingEvaluations || []) {
      try {
        // Extract mentee preferences from user profile
        const resumeData = evaluation.profiles?.resume_data;
        if (!resumeData) continue;

        const preferences: MenteePreferences = {
          desired_expertise: resumeData.skills?.map((skill: any) => 
            typeof skill === 'string' ? skill : skill.name
          ) || [],
          career_goals: ['Skill Development'], // Default fallback
          preferred_communication: ['video_call'],
          availability: {
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            hours: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
            timezone: 'UTC+4 (UAE)'
          },
          experience_level: 'intermediate'
        };

        await this.reEvaluateMatches(evaluation.user_id, preferences);
      } catch (error) {
        console.error(`Failed to re-evaluate matches for user ${evaluation.user_id}:`, error);
      }
    }
  }
}

export const matchReEvaluationService = new MatchReEvaluationService();
