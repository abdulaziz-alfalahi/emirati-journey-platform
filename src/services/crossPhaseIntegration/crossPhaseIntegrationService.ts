// Cross-Phase Data Integration Service

import { supabase } from '@/integrations/supabase/client';
import type {
  CitizenJourneyProfile,
  CitizenPhase,
  CitizenLifecycleStage,
  CrossPhaseRecommendation,
  CitizenJourneyProgress,
  DataIntegrationRequest,
  CrossPhaseAnalytics,
  PhaseTransition,
  CrossPhaseAchievement,
  SkillsPortfolio,
  DataType,
  SharingPermission,
  ExternalSystemIntegration,
  DataExportRequest
} from '@/types/crossPhaseIntegration';

export class CrossPhaseIntegrationService {
  // ===== USER PROFILE MANAGEMENT =====
  
  /**
   * Get or create unified citizen journey profile
   */
  async getCitizenJourneyProfile(userId: string): Promise<CitizenJourneyProfile | null> {
    try {
      const { data: existingProfile, error: fetchError } = await supabase
        .from('citizen_journey_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingProfile && !fetchError) {
        return existingProfile as CitizenJourneyProfile;
      }

      return await this.createCitizenJourneyProfile(userId);
    } catch (error) {
      console.error('Error getting citizen journey profile:', error);
      return null;
    }
  }

  /**
   * Create a new citizen journey profile by aggregating existing data
   */
  private async createCitizenJourneyProfile(userId: string): Promise<CitizenJourneyProfile | null> {
    try {
      const profileData = {
        user_id: userId,
        current_phase: 'education' as CitizenPhase,
        current_stage: 'student' as CitizenLifecycleStage,
        journey_start_date: new Date().toISOString(),
        phase_transition_history: [],
        achievements: [],
        skills_portfolio: this.getDefaultSkillsPortfolio(),
        interests_and_goals: this.getDefaultInterestsAndGoals(),
        preferences: this.getDefaultPreferences(),
        privacy_settings: this.getDefaultPrivacySettings(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('citizen_journey_profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) throw error;
      return data as CitizenJourneyProfile;
    } catch (error) {
      console.error('Error creating citizen journey profile:', error);
      return null;
    }
  }

  /**
   * Update citizen journey profile
   */
  async updateCitizenJourneyProfile(
    userId: string, 
    updates: Partial<CitizenJourneyProfile>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('citizen_journey_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      return !error;
    } catch (error) {
      console.error('Error updating citizen journey profile:', error);
      return false;
    }
  }

  // ===== PHASE TRANSITION MANAGEMENT =====

  /**
   * Record a phase transition
   */
  async recordPhaseTransition(
    userId: string,
    fromPhase: CitizenPhase,
    toPhase: CitizenPhase,
    fromStage: CitizenLifecycleStage,
    toStage: CitizenLifecycleStage,
    reason: string
  ): Promise<boolean> {
    try {
      // Calculate transition score based on achievements and readiness
      const transitionScore = await this.calculateTransitionScore(userId, fromPhase, toPhase);
      
      // Get achievements and skills from previous phase
      const achievementsCarriedForward = await this.getPhaseAchievements(userId, fromPhase);
      const skillsGained = await this.getPhaseSkills(userId, fromPhase);

      const transition: Omit<PhaseTransition, 'id'> = {
        from_phase: fromPhase,
        to_phase: toPhase,
        from_stage: fromStage,
        to_stage: toStage,
        transition_date: new Date().toISOString(),
        transition_reason: reason,
        achievements_carried_forward: achievementsCarriedForward,
        skills_gained: skillsGained,
        transition_score: transitionScore,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('phase_transitions')
        .insert(transition);

      if (error) throw error;

      // Update current phase in profile
      await this.updateCitizenJourneyProfile(userId, {
        current_phase: toPhase,
        current_stage: toStage
      });

      return true;
    } catch (error) {
      console.error('Error recording phase transition:', error);
      return false;
    }
  }

  // ===== RECOMMENDATION ENGINE =====

  /**
   * Generate cross-phase recommendations for a user
   */
  async generateRecommendations(userId: string): Promise<CrossPhaseRecommendation[]> {
    try {
      const profile = await this.getCitizenJourneyProfile(userId);
      if (!profile) return [];

      const recommendations: CrossPhaseRecommendation[] = [];

      // Generate recommendations based on current phase and stage
      const opportunityRecs = await this.generateOpportunityRecommendations(profile);
      const skillRecs = await this.generateSkillDevelopmentRecommendations(profile);
      const mentorRecs = await this.generateMentorshipRecommendations(profile);
      const transitionRecs = await this.generateTransitionRecommendations(profile);
      const communityRecs = await this.generateCommunityRecommendations(profile);

      recommendations.push(
        ...opportunityRecs,
        ...skillRecs,
        ...mentorRecs,
        ...transitionRecs,
        ...communityRecs
      );

      // Save recommendations to database
      await this.saveRecommendations(recommendations);

      // Return top recommendations sorted by confidence score
      return recommendations
        .sort((a, b) => b.confidence_score - a.confidence_score)
        .slice(0, 20);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  /**
   * Generate opportunity recommendations based on current phase
   */
  private async generateOpportunityRecommendations(
    profile: CitizenJourneyProfile
  ): Promise<CrossPhaseRecommendation[]> {
    const recommendations: CrossPhaseRecommendation[] = [];

    switch (profile.current_phase) {
      case 'education':
        // Recommend scholarships, summer camps, university programs
        recommendations.push(...await this.getEducationOpportunities(profile));
        break;
      
      case 'career':
        // Recommend jobs, internships, career advisory
        recommendations.push(...await this.getCareerOpportunities(profile));
        break;
      
      case 'professional':
        // Recommend certifications, leadership programs, training
        recommendations.push(...await this.getProfessionalOpportunities(profile));
        break;
      
      case 'lifelong':
        // Recommend mentorship, volunteer opportunities, community engagement
        recommendations.push(...await this.getLifelongOpportunities(profile));
        break;
    }

    return recommendations;
  }

  /**
   * Generate skill development recommendations
   */
  private async generateSkillDevelopmentRecommendations(
    profile: CitizenJourneyProfile
  ): Promise<CrossPhaseRecommendation[]> {
    const recommendations: CrossPhaseRecommendation[] = [];
    const skillGaps = profile.skills_portfolio.skill_gaps || [];

    for (const gap of skillGaps.slice(0, 5)) {
      recommendations.push({
        id: `skill_dev_${gap.skill_name}_${Date.now()}`,
        user_id: profile.user_id,
        recommendation_type: 'skill_development',
        phase: profile.current_phase,
        title: `Develop ${gap.skill_name} Skills`,
        description: `Bridge the gap in ${gap.skill_name} to reach your target proficiency level`,
        confidence_score: Math.min(90, gap.importance === 'critical' ? 90 : 70),
        reasoning: [
          `${gap.skill_name} identified as ${gap.importance} for your career goals`,
          `Current level: ${gap.current_level}/10, Target: ${gap.target_level}/10`,
          `Estimated learning time: ${gap.estimated_learning_time} hours`
        ],
        action_items: gap.learning_resources.map(resource => ({
          action_type: 'learn',
          action_title: `Complete ${resource}`,
          action_description: `Learn ${gap.skill_name} through ${resource}`,
          estimated_time: gap.estimated_learning_time / gap.learning_resources.length,
          difficulty_level: gap.target_level > 7 ? 'challenging' : 'medium',
          prerequisites: [],
          expected_outcome: `Improve ${gap.skill_name} proficiency`
        })),
        estimated_impact: gap.importance === 'critical' ? 'high' : 'medium',
        time_sensitivity: gap.importance === 'critical' ? 'soon' : 'flexible',
        resource_requirements: gap.learning_resources,
        success_criteria: [`Achieve ${gap.target_level}/10 proficiency in ${gap.skill_name}`],
        related_goals: [],
        viewed: false,
        acted_upon: false,
        created_at: new Date().toISOString()
      });
    }

    return recommendations;
  }

  // ===== PROGRESS TRACKING =====

  /**
   * Calculate comprehensive journey progress for a user
   */
  async calculateJourneyProgress(userId: string): Promise<CitizenJourneyProgress | null> {
    try {
      const profile = await this.getCitizenJourneyProfile(userId);
      if (!profile) return null;

      const [
        phaseProgress,
        skillDevelopmentScore,
        goalAchievementRate,
        networkGrowthScore,
        communityImpactScore,
        careerAdvancementScore,
        lifelongLearningScore,
        milestoneAchievements
      ] = await Promise.all([
        this.calculatePhaseProgress(userId),
        this.calculateSkillDevelopmentScore(userId),
        this.calculateGoalAchievementRate(userId),
        this.calculateNetworkGrowthScore(userId),
        this.calculateCommunityImpactScore(userId),
        this.calculateCareerAdvancementScore(userId),
        this.calculateLifelongLearningScore(userId),
        this.getMilestoneAchievements(userId)
      ]);

      // Calculate overall progress score
      const overallProgressScore = Math.round(
        (skillDevelopmentScore * 0.25) +
        (goalAchievementRate * 0.20) +
        (networkGrowthScore * 0.15) +
        (communityImpactScore * 0.15) +
        (careerAdvancementScore * 0.15) +
        (lifelongLearningScore * 0.10)
      );

      const progress: CitizenJourneyProgress = {
        user_id: userId,
        overall_progress_score: overallProgressScore,
        phase_progress: phaseProgress,
        skill_development_score: skillDevelopmentScore,
        goal_achievement_rate: goalAchievementRate,
        network_growth_score: networkGrowthScore,
        community_impact_score: communityImpactScore,
        career_advancement_score: careerAdvancementScore,
        lifelong_learning_score: lifelongLearningScore,
        milestone_achievements: milestoneAchievements,
        improvement_areas: await this.getImprovementAreas(userId),
        strengths: await this.getStrengths(userId),
        next_recommended_actions: await this.getNextRecommendedActions(userId),
        calculated_at: new Date().toISOString()
      };

      // Save progress to database
      await this.saveJourneyProgress(progress);

      return progress;
    } catch (error) {
      console.error('Error calculating journey progress:', error);
      return null;
    }
  }

  // ===== SECURE DATA SHARING =====

  /**
   * Request data sharing from another user
   */
  async requestDataSharing(
    requestingUserId: string,
    targetUserId: string,
    dataTypes: DataType[],
    reason: string,
    organization?: string,
    role?: string,
    retentionPeriod: number = 90
  ): Promise<string | null> {
    try {
      const request: Omit<DataIntegrationRequest, 'id'> = {
        requesting_user_id: requestingUserId,
        target_user_id: targetUserId,
        requested_data_types: dataTypes,
        request_reason: reason,
        requester_organization: organization,
        requester_role: role,
        data_usage_purpose: reason,
        retention_period: retentionPeriod,
        sharing_permissions: dataTypes.map(dataType => ({
          data_type: dataType,
          access_level: 'read',
          anonymized: false,
          specific_fields: [],
          excluded_fields: []
        })),
        status: 'pending',
        expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(), // 30 days
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('data_integration_requests')
        .insert(request)
        .select()
        .single();

      if (error) throw error;

      // Send notification to target user
      await this.sendDataSharingNotification(targetUserId, requestingUserId, reason);

      return data.id;
    } catch (error) {
      console.error('Error requesting data sharing:', error);
      return null;
    }
  }

  /**
   * Approve or reject a data sharing request
   */
  async respondToDataSharingRequest(
    requestId: string,
    userId: string,
    approved: boolean,
    customPermissions?: SharingPermission[]
  ): Promise<boolean> {
    try {
      const updateData: any = {
        status: approved ? 'approved' : 'rejected',
        approved_at: approved ? new Date().toISOString() : undefined
      };

      if (approved && customPermissions) {
        updateData.sharing_permissions = customPermissions;
      }

      const { error } = await supabase
        .from('data_integration_requests')
        .update(updateData)
        .eq('id', requestId)
        .eq('target_user_id', userId);

      if (error) throw error;

      // Send notification to requesting user
      await this.sendDataSharingResponseNotification(requestId, approved);

      return true;
    } catch (error) {
      console.error('Error responding to data sharing request:', error);
      return false;
    }
  }

  // ===== ANALYTICS AND INSIGHTS =====

  /**
   * Generate comprehensive cross-phase analytics
   */
  async generateCrossPhaseAnalytics(
    userId: string,
    period: 'weekly' | 'monthly' | 'quarterly' | 'yearly' = 'monthly'
  ): Promise<CrossPhaseAnalytics | null> {
    try {
      const [
        engagementMetrics,
        learningMetrics,
        careerProgressionMetrics,
        networkMetrics,
        contributionMetrics,
        satisfactionMetrics,
        predictiveInsights,
        benchmarkComparison
      ] = await Promise.all([
        this.calculateEngagementMetrics(userId, period),
        this.calculateLearningMetrics(userId, period),
        this.calculateCareerProgressionMetrics(userId, period),
        this.calculateNetworkMetrics(userId, period),
        this.calculateContributionMetrics(userId, period),
        this.calculateSatisfactionMetrics(userId, period),
        this.generatePredictiveInsights(userId),
        this.calculateBenchmarkComparison(userId, period)
      ]);

      const analytics: CrossPhaseAnalytics = {
        user_id: userId,
        analytics_period: period,
        engagement_metrics: engagementMetrics,
        learning_metrics: learningMetrics,
        career_progression_metrics: careerProgressionMetrics,
        network_metrics: networkMetrics,
        contribution_metrics: contributionMetrics,
        satisfaction_metrics: satisfactionMetrics,
        predictive_insights: predictiveInsights,
        benchmark_comparison: benchmarkComparison,
        generated_at: new Date().toISOString()
      };

      // Save analytics to database
      await this.saveCrossPhaseAnalytics(analytics);

      return analytics;
    } catch (error) {
      console.error('Error generating cross-phase analytics:', error);
      return null;
    }
  }

  // ===== DATA EXPORT/IMPORT =====

  /**
   * Request data export for a user
   */
  async requestDataExport(
    userId: string,
    format: 'json' | 'xml' | 'csv' | 'pdf',
    dataTypes: DataType[],
    dateRange: { from: string; to: string },
    anonymize: boolean = false
  ): Promise<string | null> {
    try {
      const exportRequest: Omit<DataExportRequest, 'id'> = {
        user_id: userId,
        export_format: format,
        data_types: dataTypes,
        date_range: dateRange,
        anonymize_data: anonymize,
        include_metadata: true,
        delivery_method: 'download',
        status: 'pending',
        expires_at: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString(), // 7 days
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('data_export_requests')
        .insert(exportRequest)
        .select()
        .single();

      if (error) throw error;

      // Process export in background
      this.processDataExport(data.id);

      return data.id;
    } catch (error) {
      console.error('Error requesting data export:', error);
      return null;
    }
  }

  // ===== HELPER METHODS =====

  private async getUserRoles(userId: string): Promise<any[]> {
    const { data } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);
    return data || [];
  }

  private async getUserCareerPaths(userId: string): Promise<any[]> {
    const { data } = await supabase
      .from('user_career_paths')
      .select('*')
      .eq('user_id', userId);
    return data || [];
  }

  private async getUserAssessments(userId: string): Promise<any[]> {
    const { data } = await supabase
      .from('assessment_sessions')
      .select('*')
      .eq('user_id', userId);
    return data || [];
  }

  private async getUserMentorships(userId: string): Promise<any[]> {
    const { data } = await supabase
      .from('mentorship_relationships')
      .select('*')
      .or(`mentee_id.eq.${userId},mentor_id.eq.${userId}`);
    return data || [];
  }

  private async getUserAchievements(userId: string): Promise<CrossPhaseAchievement[]> {
    // This would aggregate achievements from various tables
    return [];
  }

  private async getUserSkills(userId: string): Promise<any[]> {
    const { data } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId);
    return data || [];
  }

  private determineCurrentPhaseAndStage(
    userRoles: any[],
    careerPaths: any[],
    assessments: any[],
    mentorships: any[]
  ): { currentPhase: CitizenPhase; currentStage: CitizenLifecycleStage } {
    // Logic to determine phase and stage based on existing data
    // This is a simplified version - real implementation would be more sophisticated
    
    if (userRoles.some(role => role.role === 'student')) {
      return { currentPhase: 'education', currentStage: 'student' };
    }
    
    if (careerPaths.length > 0 && assessments.length === 0) {
      return { currentPhase: 'career', currentStage: 'job_seeker' };
    }
    
    if (mentorships.some(m => m.mentor_id)) {
      return { currentPhase: 'professional', currentStage: 'mid_career' };
    }
    
    return { currentPhase: 'career', currentStage: 'early_career' };
  }

  private buildSkillsPortfolio(skills: any[], assessments: any[], achievements: any[]): SkillsPortfolio {
    // Build skills portfolio from aggregated data
    return {
      technical_skills: [],
      soft_skills: [],
      leadership_skills: [],
      entrepreneurial_skills: [],
      community_engagement_skills: [],
      certifications: [],
      skill_gaps: [],
      skill_development_plan: [],
      updated_at: new Date().toISOString()
    };
  }

  private async getInterestsAndGoals(userId: string): Promise<any> {
    // Get user interests and goals from various sources
    return {
      career_interests: [],
      industry_preferences: [],
      short_term_goals: [],
      long_term_goals: [],
      life_priorities: [],
      values: [],
      preferred_work_environment: [],
      geographic_preferences: []
    };
  }

  private getDefaultPreferences(): any {
    return {
      communication_preferences: {
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
        newsletter_subscription: true,
        mentor_matching_notifications: true,
        opportunity_alerts: true
      },
      mentorship_preferences: {
        open_to_mentoring: false,
        seeking_mentor: true,
        expertise_areas: [],
        preferred_mentor_experience: 'intermediate',
        availability: {
          days: ['Monday', 'Wednesday', 'Friday'],
          hours: ['18:00', '19:00', '20:00'],
          timezone: 'Asia/Dubai'
        }
      },
      opportunity_preferences: {
        job_alerts: true,
        training_recommendations: true,
        certification_suggestions: true,
        networking_events: true,
        volunteer_opportunities: true,
        preferred_industries: [],
        preferred_locations: ['Dubai', 'Abu Dhabi'],
        remote_work_preference: false
      },
      privacy_level: 'government_only'
    };
  }

  private getDefaultPrivacySettings(): any {
    return {
      profile_visibility: 'government_only',
      skills_visibility: 'government_only',
      achievements_visibility: 'government_only',
      contact_information_sharing: false,
      anonymous_analytics: true,
      data_sharing_consent: {
        educational_institutions: true,
        employers: false,
        training_providers: true,
        government_agencies: true,
        mentors: true,
        community_organizations: false
      },
      data_retention_preference: 'standard',
      export_data_rights: true,
      delete_data_rights: true
    };
  }

  // Additional helper methods would be implemented here...
  // This includes all the calculation methods, notification methods, etc.
  
  private async calculateTransitionScore(userId: string, fromPhase: CitizenPhase, toPhase: CitizenPhase): Promise<number> {
    // Implement transition score calculation logic
    return 85; // Placeholder
  }

  private async getPhaseAchievements(userId: string, phase: CitizenPhase): Promise<string[]> {
    // Get achievements for a specific phase
    return [];
  }

  private async getPhaseSkills(userId: string, phase: CitizenPhase): Promise<string[]> {
    // Get skills developed in a specific phase
    return [];
  }

  // ... other helper methods would be implemented similarly
}

export const crossPhaseIntegrationService = new CrossPhaseIntegrationService();
