
import { supabase } from '@/integrations/supabase/client';
import { crossPhaseAnalyticsService } from './crossPhaseAnalyticsService';

export interface UserBehaviorPattern {
  userId: string;
  phase: string;
  interactionType: string;
  frequency: number;
  duration: number;
  preferences: Record<string, any>;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  engagementLevel: number;
  progressVelocity: number;
}

export interface PersonalizationProfile {
  userId: string;
  preferences: {
    contentTypes: string[];
    interfaceLayout: 'compact' | 'spacious' | 'focused';
    notificationFrequency: 'high' | 'medium' | 'low';
    learningPace: 'fast' | 'moderate' | 'slow';
    communicationStyle: 'formal' | 'casual' | 'technical';
  };
  behaviorPatterns: UserBehaviorPattern[];
  predictionScores: Record<string, number>;
  lastUpdated: string;
}

export interface PersonalizedRecommendation {
  id: string;
  type: 'content' | 'action' | 'opportunity' | 'feature';
  title: string;
  description: string;
  relevanceScore: number;
  priority: 'high' | 'medium' | 'low';
  timing: 'immediate' | 'soon' | 'later';
  phase: string;
  metadata: Record<string, any>;
}

export interface InterfaceAdaptation {
  layout: 'compact' | 'spacious' | 'focused';
  prioritizedFeatures: string[];
  hiddenFeatures: string[];
  colorScheme: 'default' | 'high-contrast' | 'warm' | 'cool';
  fontSizeModifier: number;
  animationLevel: 'full' | 'reduced' | 'none';
}

class AIPersonalizationEngine {
  private mlModels: Map<string, any> = new Map();
  private userProfiles: Map<string, PersonalizationProfile> = new Map();

  async initializeUserProfile(userId: string): Promise<PersonalizationProfile> {
    try {
      // Get existing profile or create new one
      const { data: existingProfile } = await supabase
        .from('personalization_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingProfile) {
        const profile: PersonalizationProfile = {
          userId,
          preferences: existingProfile.preferences || this.getDefaultPreferences(),
          behaviorPatterns: existingProfile.behavior_patterns || [],
          predictionScores: existingProfile.prediction_scores || {},
          lastUpdated: existingProfile.updated_at
        };
        this.userProfiles.set(userId, profile);
        return profile;
      }

      // Create new profile with defaults
      const newProfile: PersonalizationProfile = {
        userId,
        preferences: this.getDefaultPreferences(),
        behaviorPatterns: [],
        predictionScores: {},
        lastUpdated: new Date().toISOString()
      };

      await this.saveUserProfile(newProfile);
      this.userProfiles.set(userId, newProfile);
      return newProfile;
    } catch (error) {
      console.error('Error initializing user profile:', error);
      return this.getDefaultProfile(userId);
    }
  }

  private getDefaultPreferences() {
    return {
      contentTypes: ['articles', 'videos', 'interactive'],
      interfaceLayout: 'spacious' as const,
      notificationFrequency: 'medium' as const,
      learningPace: 'moderate' as const,
      communicationStyle: 'casual' as const
    };
  }

  private getDefaultProfile(userId: string): PersonalizationProfile {
    return {
      userId,
      preferences: this.getDefaultPreferences(),
      behaviorPatterns: [],
      predictionScores: {},
      lastUpdated: new Date().toISOString()
    };
  }

  async analyzeUserBehavior(userId: string, interactionData: any): Promise<UserBehaviorPattern> {
    try {
      const analytics = await crossPhaseAnalyticsService.getUserJourneyAnalytics(userId, {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        end: new Date()
      });

      // Analyze interaction patterns
      const interactionCounts = this.countInteractionTypes(analytics);
      const avgDuration = this.calculateAverageDuration(analytics);
      const engagementLevel = this.calculateEngagementLevel(analytics);
      const learningStyle = this.inferLearningStyle(analytics);

      const pattern: UserBehaviorPattern = {
        userId,
        phase: interactionData.phase || 'education',
        interactionType: interactionData.type || 'general',
        frequency: interactionCounts[interactionData.type] || 0,
        duration: avgDuration,
        preferences: this.extractPreferences(analytics),
        learningStyle,
        engagementLevel,
        progressVelocity: this.calculateProgressVelocity(analytics)
      };

      await this.updateBehaviorPattern(userId, pattern);
      return pattern;
    } catch (error) {
      console.error('Error analyzing user behavior:', error);
      return this.getDefaultBehaviorPattern(userId);
    }
  }

  private countInteractionTypes(analytics: any[]): Record<string, number> {
    const counts: Record<string, number> = {};
    analytics.forEach(event => {
      const type = event.event_type || 'unknown';
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }

  private calculateAverageDuration(analytics: any[]): number {
    const durations = analytics
      .filter(event => event.event_data?.duration)
      .map(event => event.event_data.duration);
    
    if (durations.length === 0) return 0;
    return durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
  }

  private calculateEngagementLevel(analytics: any[]): number {
    const engagementFactors = [
      analytics.filter(e => e.event_type === 'page_view').length / 10,
      analytics.filter(e => e.event_type === 'user_action').length / 5,
      analytics.filter(e => e.event_type === 'feature_usage').length / 3
    ];

    const totalEngagement = engagementFactors.reduce((sum, factor) => sum + factor, 0);
    return Math.min(totalEngagement / engagementFactors.length, 1);
  }

  private inferLearningStyle(analytics: any[]): 'visual' | 'auditory' | 'kinesthetic' | 'reading' {
    const visualInteractions = analytics.filter(e => 
      e.event_data?.contentType === 'video' || 
      e.event_data?.contentType === 'infographic'
    ).length;

    const readingInteractions = analytics.filter(e => 
      e.event_data?.contentType === 'article' || 
      e.event_data?.contentType === 'document'
    ).length;

    const interactiveInteractions = analytics.filter(e => 
      e.event_type === 'user_action' || 
      e.event_data?.contentType === 'interactive'
    ).length;

    const scores = {
      visual: visualInteractions,
      reading: readingInteractions,
      kinesthetic: interactiveInteractions,
      auditory: 0 // Would need audio interaction tracking
    };

    return Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0] as any;
  }

  private extractPreferences(analytics: any[]): Record<string, any> {
    const preferences: Record<string, any> = {};
    
    // Analyze content type preferences
    const contentTypes = analytics
      .filter(e => e.event_data?.contentType)
      .map(e => e.event_data.contentType);
    
    preferences.preferredContentTypes = [...new Set(contentTypes)];
    
    // Analyze timing preferences
    const hours = analytics.map(e => new Date(e.created_at).getHours());
    preferences.activeHours = this.findMostCommonHours(hours);
    
    return preferences;
  }

  private findMostCommonHours(hours: number[]): number[] {
    const hourCounts: Record<number, number> = {};
    hours.forEach(hour => {
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    return Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour));
  }

  private calculateProgressVelocity(analytics: any[]): number {
    const milestones = analytics.filter(e => e.event_type === 'milestone_achieved');
    const timeSpan = 30; // days
    return milestones.length / timeSpan;
  }

  private getDefaultBehaviorPattern(userId: string): UserBehaviorPattern {
    return {
      userId,
      phase: 'education',
      interactionType: 'general',
      frequency: 0,
      duration: 0,
      preferences: {},
      learningStyle: 'visual',
      engagementLevel: 0.5,
      progressVelocity: 0
    };
  }

  async generatePersonalizedRecommendations(userId: string, phase: string): Promise<PersonalizedRecommendation[]> {
    try {
      const profile = await this.getUserProfile(userId);
      const recommendations: PersonalizedRecommendation[] = [];

      // Content recommendations based on preferences
      const contentRecs = await this.generateContentRecommendations(profile, phase);
      recommendations.push(...contentRecs);

      // Action recommendations based on behavior patterns
      const actionRecs = await this.generateActionRecommendations(profile, phase);
      recommendations.push(...actionRecs);

      // Opportunity recommendations using predictive analytics
      const opportunityRecs = await this.generateOpportunityRecommendations(profile, phase);
      recommendations.push(...opportunityRecs);

      // Feature recommendations for interface optimization
      const featureRecs = await this.generateFeatureRecommendations(profile, phase);
      recommendations.push(...featureRecs);

      // Sort by relevance score and timing
      return recommendations
        .sort((a, b) => {
          if (a.timing !== b.timing) {
            const timingOrder = { immediate: 3, soon: 2, later: 1 };
            return timingOrder[b.timing] - timingOrder[a.timing];
          }
          return b.relevanceScore - a.relevanceScore;
        })
        .slice(0, 10); // Limit to top 10 recommendations

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  private async generateContentRecommendations(profile: PersonalizationProfile, phase: string): Promise<PersonalizedRecommendation[]> {
    const recommendations: PersonalizedRecommendation[] = [];
    const preferredTypes = profile.preferences.contentTypes;

    // Mock content recommendations - in real implementation, this would use ML models
    if (preferredTypes.includes('videos')) {
      recommendations.push({
        id: 'content-video-1',
        type: 'content',
        title: 'Career Development Video Series',
        description: 'Personalized video content based on your learning preferences',
        relevanceScore: 0.9,
        priority: 'high',
        timing: 'immediate',
        phase,
        metadata: { contentType: 'video', duration: '15 minutes' }
      });
    }

    if (preferredTypes.includes('interactive')) {
      recommendations.push({
        id: 'content-interactive-1',
        type: 'content',
        title: 'Interactive Skill Assessment',
        description: 'Hands-on assessment tailored to your learning style',
        relevanceScore: 0.85,
        priority: 'high',
        timing: 'soon',
        phase,
        metadata: { contentType: 'interactive', estimatedTime: '30 minutes' }
      });
    }

    return recommendations;
  }

  private async generateActionRecommendations(profile: PersonalizationProfile, phase: string): Promise<PersonalizedRecommendation[]> {
    const recommendations: PersonalizedRecommendation[] = [];
    const engagementLevel = profile.behaviorPatterns[0]?.engagementLevel || 0.5;

    if (engagementLevel > 0.7) {
      recommendations.push({
        id: 'action-advanced-1',
        type: 'action',
        title: 'Complete Advanced Certification',
        description: 'Based on your high engagement, you\'re ready for advanced challenges',
        relevanceScore: 0.8,
        priority: 'medium',
        timing: 'soon',
        phase,
        metadata: { difficulty: 'advanced', timeCommitment: 'high' }
      });
    }

    return recommendations;
  }

  private async generateOpportunityRecommendations(profile: PersonalizationProfile, phase: string): Promise<PersonalizedRecommendation[]> {
    const recommendations: PersonalizedRecommendation[] = [];
    
    // Use predictive analytics to suggest opportunities
    const predictedInterests = await this.predictFutureInterests(profile);
    
    predictedInterests.forEach((interest, index) => {
      recommendations.push({
        id: `opportunity-${index}`,
        type: 'opportunity',
        title: `${interest} Opportunity`,
        description: `Predicted opportunity based on your learning patterns`,
        relevanceScore: 0.75,
        priority: 'medium',
        timing: 'later',
        phase,
        metadata: { predictedInterest: interest }
      });
    });

    return recommendations;
  }

  private async generateFeatureRecommendations(profile: PersonalizationProfile, phase: string): Promise<PersonalizedRecommendation[]> {
    const recommendations: PersonalizedRecommendation[] = [];
    const learningStyle = profile.behaviorPatterns[0]?.learningStyle || 'visual';

    if (learningStyle === 'visual') {
      recommendations.push({
        id: 'feature-visual-1',
        type: 'feature',
        title: 'Enable Visual Dashboard',
        description: 'Optimize your interface for visual learning',
        relevanceScore: 0.9,
        priority: 'high',
        timing: 'immediate',
        phase,
        metadata: { featureType: 'interface', adaptation: 'visual' }
      });
    }

    return recommendations;
  }

  private async predictFutureInterests(profile: PersonalizationProfile): Promise<string[]> {
    // Simple prediction based on behavior patterns
    const patterns = profile.behaviorPatterns;
    const interests: string[] = [];

    patterns.forEach(pattern => {
      if (pattern.engagementLevel > 0.6) {
        interests.push(`Advanced ${pattern.interactionType}`);
      }
    });

    return interests.slice(0, 3);
  }

  async adaptInterface(userId: string, currentPhase: string): Promise<InterfaceAdaptation> {
    try {
      const profile = await this.getUserProfile(userId);
      const behaviorPattern = profile.behaviorPatterns.find(p => p.phase === currentPhase);

      const adaptation: InterfaceAdaptation = {
        layout: profile.preferences.interfaceLayout,
        prioritizedFeatures: this.getPrioritizedFeatures(profile, currentPhase),
        hiddenFeatures: this.getHiddenFeatures(profile, currentPhase),
        colorScheme: this.getOptimalColorScheme(profile),
        fontSizeModifier: this.getFontSizeModifier(profile),
        animationLevel: this.getAnimationLevel(profile)
      };

      await this.saveInterfaceAdaptation(userId, adaptation);
      return adaptation;
    } catch (error) {
      console.error('Error adapting interface:', error);
      return this.getDefaultInterfaceAdaptation();
    }
  }

  private getPrioritizedFeatures(profile: PersonalizationProfile, phase: string): string[] {
    const features: string[] = [];
    const learningStyle = profile.behaviorPatterns[0]?.learningStyle;

    switch (learningStyle) {
      case 'visual':
        features.push('dashboard', 'charts', 'progress-visualization');
        break;
      case 'reading':
        features.push('documents', 'articles', 'text-resources');
        break;
      case 'kinesthetic':
        features.push('interactive-tools', 'simulations', 'hands-on-activities');
        break;
      default:
        features.push('dashboard', 'recommendations', 'progress-tracking');
    }

    return features;
  }

  private getHiddenFeatures(profile: PersonalizationProfile, phase: string): string[] {
    const engagementLevel = profile.behaviorPatterns[0]?.engagementLevel || 0.5;
    
    if (engagementLevel < 0.3) {
      return ['advanced-analytics', 'complex-workflows', 'expert-tools'];
    }
    
    return [];
  }

  private getOptimalColorScheme(profile: PersonalizationProfile): 'default' | 'high-contrast' | 'warm' | 'cool' {
    // Analyze user preferences and accessibility needs
    const preferences = profile.preferences;
    
    if (preferences.communicationStyle === 'formal') {
      return 'cool';
    } else if (preferences.communicationStyle === 'casual') {
      return 'warm';
    }
    
    return 'default';
  }

  private getFontSizeModifier(profile: PersonalizationProfile): number {
    const learningPace = profile.preferences.learningPace;
    
    switch (learningPace) {
      case 'slow': return 1.2;
      case 'fast': return 0.9;
      default: return 1.0;
    }
  }

  private getAnimationLevel(profile: PersonalizationProfile): 'full' | 'reduced' | 'none' {
    const engagementLevel = profile.behaviorPatterns[0]?.engagementLevel || 0.5;
    
    if (engagementLevel > 0.7) return 'full';
    if (engagementLevel > 0.3) return 'reduced';
    return 'none';
  }

  private getDefaultInterfaceAdaptation(): InterfaceAdaptation {
    return {
      layout: 'spacious',
      prioritizedFeatures: ['dashboard', 'recommendations'],
      hiddenFeatures: [],
      colorScheme: 'default',
      fontSizeModifier: 1.0,
      animationLevel: 'reduced'
    };
  }

  private async getUserProfile(userId: string): Promise<PersonalizationProfile> {
    if (this.userProfiles.has(userId)) {
      return this.userProfiles.get(userId)!;
    }
    return await this.initializeUserProfile(userId);
  }

  private async updateBehaviorPattern(userId: string, pattern: UserBehaviorPattern): Promise<void> {
    const profile = await this.getUserProfile(userId);
    
    // Update or add behavior pattern
    const existingIndex = profile.behaviorPatterns.findIndex(
      p => p.phase === pattern.phase && p.interactionType === pattern.interactionType
    );
    
    if (existingIndex >= 0) {
      profile.behaviorPatterns[existingIndex] = pattern;
    } else {
      profile.behaviorPatterns.push(pattern);
    }
    
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
    this.userProfiles.set(userId, profile);
  }

  private async saveUserProfile(profile: PersonalizationProfile): Promise<void> {
    try {
      await supabase.from('personalization_profiles').upsert({
        user_id: profile.userId,
        preferences: profile.preferences,
        behavior_patterns: profile.behaviorPatterns,
        prediction_scores: profile.predictionScores,
        updated_at: profile.lastUpdated
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  private async saveInterfaceAdaptation(userId: string, adaptation: InterfaceAdaptation): Promise<void> {
    try {
      await supabase.from('interface_adaptations').upsert({
        user_id: userId,
        layout: adaptation.layout,
        prioritized_features: adaptation.prioritizedFeatures,
        hidden_features: adaptation.hiddenFeatures,
        color_scheme: adaptation.colorScheme,
        font_size_modifier: adaptation.fontSizeModifier,
        animation_level: adaptation.animationLevel,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving interface adaptation:', error);
    }
  }

  async trainPersonalizationModel(userId: string): Promise<void> {
    try {
      // Get user's historical data
      const analytics = await crossPhaseAnalyticsService.getUserJourneyAnalytics(userId);
      
      // Simple ML training simulation
      const features = this.extractFeatures(analytics);
      const model = this.createSimpleModel(features);
      
      this.mlModels.set(userId, model);
      
      console.log(`Personalization model trained for user ${userId}`);
    } catch (error) {
      console.error('Error training personalization model:', error);
    }
  }

  private extractFeatures(analytics: any[]): number[] {
    // Extract numerical features for ML model
    return [
      analytics.length, // Total interactions
      analytics.filter(e => e.event_type === 'page_view').length,
      analytics.filter(e => e.event_type === 'user_action').length,
      analytics.filter(e => e.event_type === 'feature_usage').length,
      // Add more features as needed
    ];
  }

  private createSimpleModel(features: number[]): any {
    // Simple linear model for demonstration
    return {
      weights: features.map(() => Math.random()),
      bias: Math.random(),
      predict: function(input: number[]) {
        return input.reduce((sum, val, i) => sum + val * this.weights[i], this.bias);
      }
    };
  }
}

export const aiPersonalizationEngine = new AIPersonalizationEngine();
