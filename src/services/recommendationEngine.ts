
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  skills: string[];
  interests: string[];
  experience_level: string;
  career_goals: string[];
  location?: string;
}

interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  skills_required: string[];
  experience_level: string;
  match_score: number;
}

interface CourseRecommendation {
  id: string;
  title: string;
  provider: string;
  skills_taught: string[];
  difficulty_level: string;
  match_score: number;
}

interface ScholarshipRecommendation {
  id: string;
  title: string;
  eligibility_criteria: string[];
  amount: number;
  deadline: string;
  match_score: number;
}

export class RecommendationEngine {
  private async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  private calculateSkillMatch(userSkills: string[], requiredSkills: string[]): number {
    if (!userSkills || !requiredSkills) return 0;
    
    const intersection = userSkills.filter(skill => 
      requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    );
    
    return intersection.length / requiredSkills.length;
  }

  private calculateExperienceMatch(userLevel: string, requiredLevel: string): number {
    const levels = ['entry', 'junior', 'mid', 'senior', 'expert'];
    const userIndex = levels.indexOf(userLevel.toLowerCase());
    const requiredIndex = levels.indexOf(requiredLevel.toLowerCase());
    
    if (userIndex === -1 || requiredIndex === -1) return 0.5;
    
    const diff = Math.abs(userIndex - requiredIndex);
    return Math.max(0, 1 - (diff * 0.2));
  }

  async getJobRecommendations(userId: string, limit: number = 10): Promise<JobRecommendation[]> {
    const userProfile = await this.getUserProfile(userId);
    if (!userProfile) return [];

    try {
      const { data: jobs, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('status', 'active')
        .limit(50);

      if (error) throw error;

      const recommendations = jobs.map((job: any) => {
        const skillMatch = this.calculateSkillMatch(userProfile.skills, job.skills_required || []);
        const experienceMatch = this.calculateExperienceMatch(userProfile.experience_level, job.experience_level);
        const locationMatch = userProfile.location === job.location ? 1 : 0.8;
        
        const matchScore = (skillMatch * 0.5) + (experienceMatch * 0.3) + (locationMatch * 0.2);

        return {
          ...job,
          match_score: Math.round(matchScore * 100) / 100
        };
      });

      return recommendations
        .sort((a, b) => b.match_score - a.match_score)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching job recommendations:', error);
      return [];
    }
  }

  async getCourseRecommendations(userId: string, limit: number = 10): Promise<CourseRecommendation[]> {
    const userProfile = await this.getUserProfile(userId);
    if (!userProfile) return [];

    try {
      const { data: courses, error } = await supabase
        .from('training_programs')
        .select('*')
        .eq('status', 'active')
        .limit(50);

      if (error) throw error;

      const recommendations = courses.map((course: any) => {
        const skillGapMatch = this.calculateSkillGap(userProfile.skills, course.skills_taught || []);
        const difficultyMatch = this.calculateDifficultyMatch(userProfile.experience_level, course.difficulty_level);
        const interestMatch = this.calculateInterestMatch(userProfile.interests, course.category);
        
        const matchScore = (skillGapMatch * 0.4) + (difficultyMatch * 0.3) + (interestMatch * 0.3);

        return {
          ...course,
          match_score: Math.round(matchScore * 100) / 100
        };
      });

      return recommendations
        .sort((a, b) => b.match_score - a.match_score)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching course recommendations:', error);
      return [];
    }
  }

  async getScholarshipRecommendations(userId: string, limit: number = 5): Promise<ScholarshipRecommendation[]> {
    const userProfile = await this.getUserProfile(userId);
    if (!userProfile) return [];

    try {
      const { data: scholarships, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('status', 'active')
        .limit(50);

      if (error) throw error;

      const recommendations = scholarships.map((scholarship: any) => {
        const eligibilityMatch = this.calculateEligibilityMatch(userProfile, scholarship.eligibility_criteria || []);
        const fieldMatch = this.calculateFieldMatch(userProfile.interests, scholarship.field_of_study);
        
        const matchScore = (eligibilityMatch * 0.6) + (fieldMatch * 0.4);

        return {
          ...scholarship,
          match_score: Math.round(matchScore * 100) / 100
        };
      });

      return recommendations
        .sort((a, b) => b.match_score - a.match_score)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching scholarship recommendations:', error);
      return [];
    }
  }

  private calculateSkillGap(userSkills: string[], courseSkills: string[]): number {
    const missingSkills = courseSkills.filter(skill => 
      !userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    
    return missingSkills.length / courseSkills.length;
  }

  private calculateDifficultyMatch(userLevel: string, courseLevel: string): number {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const userIndex = levels.indexOf(userLevel.toLowerCase());
    const courseIndex = levels.indexOf(courseLevel.toLowerCase());
    
    if (userIndex === -1 || courseIndex === -1) return 0.5;
    
    const diff = Math.abs(userIndex - courseIndex);
    return Math.max(0, 1 - (diff * 0.25));
  }

  private calculateInterestMatch(userInterests: string[], courseCategory: string): number {
    if (!userInterests || !courseCategory) return 0.5;
    
    return userInterests.some(interest => 
      interest.toLowerCase().includes(courseCategory.toLowerCase()) ||
      courseCategory.toLowerCase().includes(interest.toLowerCase())
    ) ? 1 : 0.3;
  }

  private calculateEligibilityMatch(userProfile: UserProfile, eligibilityCriteria: string[]): number {
    // Simplified eligibility matching - in real implementation, this would be more sophisticated
    return 0.8; // Placeholder
  }

  private calculateFieldMatch(userInterests: string[], fieldOfStudy: string): number {
    if (!userInterests || !fieldOfStudy) return 0.5;
    
    return userInterests.some(interest => 
      interest.toLowerCase().includes(fieldOfStudy.toLowerCase()) ||
      fieldOfStudy.toLowerCase().includes(interest.toLowerCase())
    ) ? 1 : 0.3;
  }
}

export const recommendationEngine = new RecommendationEngine();
