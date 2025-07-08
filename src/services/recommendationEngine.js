
import { supabase } from '@/integrations/supabase/client';
import { trackTestEvent, getUserTestAssignment, getRecommendationConfig } from './abTestingService';

export interface Recommendation {
  id: string;
  title: string;
  type: 'job' | 'training' | 'scholarship' | 'internship';
  provider?: string;
  score: number;
  description?: string;
  url?: string;
  location?: string;
  deadline?: string;
}

export interface RecommendationFilters {
  includeJobs?: boolean;
  includeTraining?: boolean;
  includeScholarships?: boolean;
  includeInternships?: boolean;
  minScore?: number;
  maxResults?: number;
}

export class RecommendationEngine {
  private calculateSkillsMatch(userProfile: any, item: any): number {
    // Implementation of skills matching algorithm
    return 0.75;
  }

  private calculateEducationMatch(userProfile: any, item: any): number {
    // Implementation of education matching algorithm
    return 0.6;
  }

  private calculateExperienceMatch(userProfile: any, item: any): number {
    // Implementation of experience matching algorithm
    return 0.8;
  }

  private calculateLocationMatch(userProfile: any, item: any): number {
    // Implementation of location matching algorithm
    return 0.9;
  }

  private calculateFreshnessScore(item: any): number {
    // Implementation of freshness scoring algorithm
    return 0.95;
  }

  async generateRecommendations(userId: string, userRoles: any, filters: RecommendationFilters = {}): Promise<Recommendation[]> {
    try {
      // Get A/B test configuration for recommendations
      const variant = getUserTestAssignment(userId, 'recommendation_algorithm_test');
      const config = getRecommendationConfig('recommendation_algorithm_test', variant);
      
      // Use mock user profile for now
      const userProfile = { skills: [], education: [], experience: [] };
      
      // Calculate individual scores
      const skillsScore = this.calculateSkillsMatch(userProfile, {}) * config.skillsWeight;
      const educationScore = this.calculateEducationMatch(userProfile, {}) * config.educationWeight;
      const experienceScore = this.calculateExperienceMatch(userProfile, {}) * config.experienceWeight;
      const locationScore = this.calculateLocationMatch(userProfile, {}) * config.locationWeight;
      const freshnessScore = this.calculateFreshnessScore({}) * config.freshnessWeight;

      // Track the recommendation generation event
      trackTestEvent(userId, 'recommendation_algorithm_test', 'recommendation_generated', {
        variant,
        algorithm: config.algorithm,
        skillsScore,
        educationScore,
        experienceScore
      });

      // Generate mock recommendations for now since we don't have the recommendations table
      const mockRecommendations: Recommendation[] = [];

      // Add job recommendations if enabled
      if (filters.includeJobs !== false) {
        try {
          const { data: jobs } = await supabase
            .from('job_descriptions')
            .select('id, title, company, location, employment_type')
            .eq('is_active', true)
            .limit(Math.min(filters.maxResults || 5, 5));

          if (jobs) {
            jobs.forEach(job => {
              const personalScore = (skillsScore + educationScore + experienceScore + locationScore) / 4;
              const popularityScore = 0.5; // Default popularity
              
              const finalScore = 
                (personalScore * config.weightPersonalization) + 
                (popularityScore * config.weightPopularity);

              mockRecommendations.push({
                id: job.id,
                title: job.title,
                type: 'job',
                provider: job.company,
                score: Math.round(finalScore * 100),
                location: job.location,
                description: `${job.employment_type} position at ${job.company}`
              });
            });
          }
        } catch (error) {
          console.error('Error fetching job recommendations:', error);
        }
      }

      // Add training recommendations if enabled
      if (filters.includeTraining !== false) {
        try {
          const { data: courses } = await supabase
            .from('courses')
            .select('id, title, description, instructor_id, category')
            .eq('status', 'published')
            .limit(Math.min(filters.maxResults || 3, 3));

          if (courses) {
            courses.forEach(course => {
              const personalScore = (skillsScore + educationScore + experienceScore) / 3;
              const popularityScore = 0.6;
              
              const finalScore = 
                (personalScore * config.weightPersonalization) + 
                (popularityScore * config.weightPopularity);

              mockRecommendations.push({
                id: course.id,
                title: course.title,
                type: 'training',
                provider: 'Training Center',
                score: Math.round(finalScore * 100),
                description: course.description || `${course.category} course`
              });
            });
          }
        } catch (error) {
          console.error('Error fetching training recommendations:', error);
        }
      }

      // Add scholarship recommendations if enabled
      if (filters.includeScholarships !== false) {
        try {
          const { data: scholarships } = await supabase
            .from('scholarships')
            .select('id, title, description, provider, amount, currency')
            .eq('is_active', true)
            .limit(Math.min(filters.maxResults || 2, 2));

          if (scholarships) {
            scholarships.forEach(scholarship => {
              const personalScore = (educationScore + experienceScore) / 2;
              const popularityScore = 0.7;
              
              const finalScore = 
                (personalScore * config.weightPersonalization) + 
                (popularityScore * config.weightPopularity);

              mockRecommendations.push({
                id: scholarship.id,
                title: scholarship.title,
                type: 'scholarship',
                provider: scholarship.provider,
                score: Math.round(finalScore * 100),
                description: scholarship.description || `${scholarship.amount} ${scholarship.currency} scholarship`
              });
            });
          }
        } catch (error) {
          console.error('Error fetching scholarship recommendations:', error);
        }
      }

      // Filter by minimum score if specified
      const filteredRecommendations = filters.minScore 
        ? mockRecommendations.filter(rec => rec.score >= filters.minScore!)
        : mockRecommendations;

      // Sort by score and limit results
      const sortedRecommendations = filteredRecommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, filters.maxResults || 10);

      return sortedRecommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  async trackRecommendationInteraction(userId: string, recommendationId: string, interactionType: string): Promise<void> {
    try {
      // For now, just log the interaction since we don't have the recommendation_interactions table
      console.log('Recommendation interaction:', {
        userId,
        recommendationId,
        interactionType,
        timestamp: new Date().toISOString()
      });

      // Track this as an analytics event instead
      trackTestEvent(userId, 'recommendation_algorithm_test', 'recommendation_interaction', {
        recommendationId,
        interactionType
      });
    } catch (error) {
      console.error('Error tracking recommendation interaction:', error);
    }
  }
}

export const recommendationEngine = new RecommendationEngine();
