import { supabase } from "@/integrations/supabase/client";
import { ResumeData } from "@/components/resume/types";
import { UserRole } from "@/types/auth";

export interface UserProfile {
  skills: string[];
  education: string[];
  experience: string[];
  careerGoals: string[];
  interests: string[];
  location?: string;
  educationLevel?: string;
  yearsExperience?: number;
}

export interface Recommendation {
  id: string;
  type: 'job' | 'training' | 'scholarship' | 'internship';
  title: string;
  description: string;
  score: number;
  reasons: string[];
  url?: string;
  deadline?: string;
  location?: string;
  provider?: string;
  matchedSkills: string[];
}

export interface RecommendationFilters {
  includeJobs: boolean;
  includeTraining: boolean;
  includeScholarships: boolean;
  includeInternships: boolean;
  minScore: number;
  maxResults: number;
}

class RecommendationEngine {
  private weightings = {
    skillsMatch: 0.4,
    educationMatch: 0.25,
    experienceMatch: 0.2,
    locationMatch: 0.1,
    freshness: 0.05
  };

  async generateRecommendations(
    userId: string,
    userRoles: UserRole[],
    filters: RecommendationFilters
  ): Promise<Recommendation[]> {
    try {
      console.log("Generating recommendations for user:", userId);
      
      // Get user profile data
      const userProfile = await this.getUserProfile(userId);
      if (!userProfile) {
        console.log("No user profile found, returning empty recommendations");
        return [];
      }

      const recommendations: Recommendation[] = [];

      // Generate job recommendations
      if (filters.includeJobs) {
        const jobRecs = await this.getJobRecommendations(userProfile, userRoles);
        recommendations.push(...jobRecs);
      }

      // Generate training recommendations
      if (filters.includeTraining) {
        const trainingRecs = await this.getTrainingRecommendations(userProfile, userRoles);
        recommendations.push(...trainingRecs);
      }

      // Generate scholarship recommendations
      if (filters.includeScholarships) {
        const scholarshipRecs = await this.getScholarshipRecommendations(userProfile, userRoles);
        recommendations.push(...scholarshipRecs);
      }

      // Generate internship recommendations
      if (filters.includeInternships) {
        const internshipRecs = await this.getInternshipRecommendations(userProfile, userRoles);
        recommendations.push(...internshipRecs);
      }

      // Sort by score and apply filters
      return recommendations
        .filter(rec => rec.score >= filters.minScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, filters.maxResults);

    } catch (error) {
      console.error("Error generating recommendations:", error);
      return [];
    }
  }

  private async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // First try to get resume data from the resumes table
      const { data: resumeData } = await supabase
        .from('resumes')
        .select(`
          *,
          resume_data (data)
        `)
        .eq('user_id', userId)
        .single();

      let resumeContent: ResumeData | null = null;

      if (resumeData?.resume_data?.[0]?.data) {
        resumeContent = resumeData.resume_data[0].data as ResumeData;
      }

      // If no resume data found, create a basic profile from user info
      if (!resumeContent) {
        console.log("No resume data found, creating basic profile");
        return {
          skills: [],
          education: [],
          experience: [],
          careerGoals: [],
          interests: [],
        };
      }

      // Extract user profile information from resume data
      const profile: UserProfile = {
        skills: resumeContent.skills?.map(skill => typeof skill === 'string' ? skill : skill.name) || [],
        education: resumeContent.education?.map(edu => edu.degree || edu.institution) || [],
        experience: resumeContent.experience?.map(exp => exp.position || exp.company) || [],
        careerGoals: resumeContent.summary ? [resumeContent.summary] : [],
        interests: resumeContent.interests || [],
        location: resumeContent.personal?.location,
        educationLevel: this.determineEducationLevel(resumeContent.education || []),
        yearsExperience: this.calculateYearsExperience(resumeContent.experience || [])
      };

      return profile;
    } catch (error) {
      console.error("Error getting user profile:", error);
      // Return a basic profile instead of null to prevent blocking recommendations
      return {
        skills: [],
        education: [],
        experience: [],
        careerGoals: [],
        interests: [],
      };
    }
  }

  private async getJobRecommendations(profile: UserProfile, roles: UserRole[]): Promise<Recommendation[]> {
    try {
      const { data: jobs } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('is_active', true)
        .limit(20);

      if (!jobs) return [];

      return jobs.map(job => {
        const score = this.calculateJobScore(job, profile);
        const matchedSkills = this.findMatchedSkills(job, profile.skills);
        const reasons = this.generateJobReasons(job, profile, matchedSkills);

        return {
          id: job.id,
          type: 'job' as const,
          title: job.title,
          description: job.description || '',
          score,
          reasons,
          location: job.location,
          provider: job.company,
          matchedSkills
        };
      }).filter(rec => rec.score > 30);
    } catch (error) {
      console.error("Error getting job recommendations:", error);
      return [];
    }
  }

  private async getTrainingRecommendations(profile: UserProfile, roles: UserRole[]): Promise<Recommendation[]> {
    // Mock training recommendations for now
    const mockTrainings = [
      {
        id: 'train-1',
        title: 'Advanced JavaScript Development',
        description: 'Master modern JavaScript frameworks and libraries',
        skills: ['JavaScript', 'React', 'Node.js'],
        provider: 'Tech Academy'
      },
      {
        id: 'train-2',
        title: 'Data Science Fundamentals',
        description: 'Learn Python, statistics, and machine learning basics',
        skills: ['Python', 'Data Analysis', 'Machine Learning'],
        provider: 'Data Institute'
      },
      {
        id: 'train-3',
        title: 'Digital Marketing Certification',
        description: 'Comprehensive digital marketing and social media training',
        skills: ['Marketing', 'Social Media', 'Analytics'],
        provider: 'Marketing Hub'
      }
    ];

    return mockTrainings.map(training => {
      const score = this.calculateTrainingScore(training, profile);
      const matchedSkills = this.findMatchedSkills({ skills_required: training.skills }, profile.skills);
      const reasons = this.generateTrainingReasons(training, profile, matchedSkills);

      return {
        id: training.id,
        type: 'training' as const,
        title: training.title,
        description: training.description,
        score,
        reasons,
        provider: training.provider,
        matchedSkills
      };
    }).filter(rec => rec.score > 25);
  }

  private async getScholarshipRecommendations(profile: UserProfile, roles: UserRole[]): Promise<Recommendation[]> {
    try {
      const { data: scholarships } = await supabase
        .from('scholarships')
        .select('*')
        .eq('is_active', true)
        .limit(15);

      if (!scholarships) return [];

      return scholarships.map(scholarship => {
        const score = this.calculateScholarshipScore(scholarship, profile, roles);
        const reasons = this.generateScholarshipReasons(scholarship, profile, roles);

        return {
          id: scholarship.id,
          type: 'scholarship' as const,
          title: scholarship.title,
          description: scholarship.description || '',
          score,
          reasons,
          provider: scholarship.provider,
          deadline: scholarship.application_deadline,
          matchedSkills: []
        };
      }).filter(rec => rec.score > 20);
    } catch (error) {
      console.error("Error getting scholarship recommendations:", error);
      return [];
    }
  }

  private async getInternshipRecommendations(profile: UserProfile, roles: UserRole[]): Promise<Recommendation[]> {
    try {
      const { data: internships } = await supabase
        .from('internships')
        .select('*')
        .eq('is_active', true)
        .limit(15);

      if (!internships) return [];

      return internships.map(internship => {
        const score = this.calculateInternshipScore(internship, profile, roles);
        const matchedSkills = this.findMatchedSkills({ skills_required: internship.skills_required }, profile.skills);
        const reasons = this.generateInternshipReasons(internship, profile, matchedSkills);

        return {
          id: internship.id,
          type: 'internship' as const,
          title: internship.title,
          description: internship.description,
          score,
          reasons,
          location: internship.location,
          provider: internship.company,
          deadline: internship.application_deadline,
          matchedSkills
        };
      }).filter(rec => rec.score > 25);
    } catch (error) {
      console.error("Error getting internship recommendations:", error);
      return [];
    }
  }

  private calculateJobScore(job: any, profile: UserProfile): number {
    let score = 0;

    // Skills matching
    const skillsMatch = this.calculateSkillsMatch(job.requirements?.skills || [], profile.skills);
    score += skillsMatch * this.weightings.skillsMatch * 100;

    // Location matching
    if (job.location && profile.location) {
      const locationMatch = job.location.toLowerCase().includes(profile.location.toLowerCase()) ? 1 : 0;
      score += locationMatch * this.weightings.locationMatch * 100;
    }

    // Experience matching
    const experienceMatch = this.calculateExperienceMatch(job, profile);
    score += experienceMatch * this.weightings.experienceMatch * 100;

    return Math.min(score, 100);
  }

  private calculateTrainingScore(training: any, profile: UserProfile): number {
    let score = 30; // Base score for training

    // Skills gap analysis - recommend training for skills not in user's profile
    const skillsGap = training.skills.filter((skill: string) => 
      !profile.skills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    score += (skillsGap.length / training.skills.length) * 40;

    // Boost score for career-relevant training
    const careerRelevant = training.skills.some((skill: string) =>
      profile.experience.some(exp => 
        exp.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    if (careerRelevant) score += 20;

    return Math.min(score, 100);
  }

  private calculateScholarshipScore(scholarship: any, profile: UserProfile, roles: UserRole[]): number {
    let score = 20; // Base score

    // Student role boost
    if (roles.includes('school_student') || roles.includes('university_student')) {
      score += 40;
    }

    // Education level matching
    if (scholarship.eligibility_criteria?.education_level) {
      const levelMatch = this.matchEducationLevel(scholarship.eligibility_criteria.education_level, profile.educationLevel);
      score += levelMatch * 30;
    }

    return Math.min(score, 100);
  }

  private calculateInternshipScore(internship: any, profile: UserProfile, roles: UserRole[]): number {
    let score = 0;

    // Student role boost
    if (roles.includes('school_student') || roles.includes('university_student')) {
      score += 50;
    }

    // Skills matching
    const skillsMatch = this.calculateSkillsMatch(internship.skills_required || [], profile.skills);
    score += skillsMatch * 30;

    // Education level matching
    if (internship.education_level && profile.educationLevel) {
      const levelMatch = this.matchEducationLevel(internship.education_level, profile.educationLevel);
      score += levelMatch * 20;
    }

    return Math.min(score, 100);
  }

  private calculateSkillsMatch(requiredSkills: string[], userSkills: string[]): number {
    if (!requiredSkills.length) return 0;
    
    const matches = requiredSkills.filter(required =>
      userSkills.some(userSkill =>
        userSkill.toLowerCase().includes(required.toLowerCase()) ||
        required.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    return matches.length / requiredSkills.length;
  }

  private findMatchedSkills(item: any, userSkills: string[]): string[] {
    const requiredSkills = item.skills_required || item.requirements?.skills || [];
    return requiredSkills.filter((skill: string) =>
      userSkills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
  }

  private calculateExperienceMatch(job: any, profile: UserProfile): number {
    // Simple experience matching based on years
    const requiredYears = this.extractYearsFromRequirements(job.requirements?.experience || []);
    if (requiredYears === 0) return 0.5; // Neutral for entry level
    
    if (profile.yearsExperience === undefined) return 0.3;
    
    const ratio = profile.yearsExperience / requiredYears;
    return Math.min(ratio, 1);
  }

  private extractYearsFromRequirements(requirements: string[]): number {
    for (const req of requirements) {
      const match = req.match(/(\d+)\+?\s*years?/i);
      if (match) return parseInt(match[1]);
    }
    return 0;
  }

  private determineEducationLevel(education: any[]): string {
    if (education.some(edu => edu.degree?.toLowerCase().includes('phd') || edu.degree?.toLowerCase().includes('doctorate'))) {
      return 'doctorate';
    }
    if (education.some(edu => edu.degree?.toLowerCase().includes('master'))) {
      return 'masters';
    }
    if (education.some(edu => edu.degree?.toLowerCase().includes('bachelor'))) {
      return 'bachelors';
    }
    return 'high_school';
  }

  private calculateYearsExperience(experience: any[]): number {
    let totalYears = 0;
    const currentYear = new Date().getFullYear();
    
    for (const exp of experience) {
      const startYear = exp.startDate ? new Date(exp.startDate).getFullYear() : currentYear;
      const endYear = exp.endDate ? new Date(exp.endDate).getFullYear() : currentYear;
      totalYears += Math.max(0, endYear - startYear);
    }
    
    return totalYears;
  }

  private matchEducationLevel(required: string, userLevel?: string): number {
    if (!userLevel) return 0;
    
    const levels = ['high_school', 'bachelors', 'masters', 'doctorate'];
    const requiredIndex = levels.indexOf(required.toLowerCase());
    const userIndex = levels.indexOf(userLevel.toLowerCase());
    
    if (requiredIndex === -1 || userIndex === -1) return 0.5;
    
    return userIndex >= requiredIndex ? 1 : 0.5;
  }

  private generateJobReasons(job: any, profile: UserProfile, matchedSkills: string[]): string[] {
    const reasons: string[] = [];
    
    if (matchedSkills.length > 0) {
      reasons.push(`Matches ${matchedSkills.length} of your skills: ${matchedSkills.slice(0, 3).join(', ')}`);
    }
    
    if (job.location && profile.location && job.location.toLowerCase().includes(profile.location.toLowerCase())) {
      reasons.push('Located in your area');
    }
    
    if (job.employment_type === 'Full-time' && profile.yearsExperience && profile.yearsExperience > 2) {
      reasons.push('Suitable for your experience level');
    }
    
    return reasons;
  }

  private generateTrainingReasons(training: any, profile: UserProfile, matchedSkills: string[]): string[] {
    const reasons: string[] = [];
    
    const skillsGap = training.skills.filter((skill: string) => 
      !profile.skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (skillsGap.length > 0) {
      reasons.push(`Learn new skills: ${skillsGap.slice(0, 2).join(', ')}`);
    }
    
    if (matchedSkills.length > 0) {
      reasons.push('Build on your existing skills');
    }
    
    reasons.push('Enhance your career prospects');
    
    return reasons;
  }

  private generateScholarshipReasons(scholarship: any, profile: UserProfile, roles: UserRole[]): string[] {
    const reasons: string[] = [];
    
    if (roles.includes('school_student') || roles.includes('university_student')) {
      reasons.push('Perfect for your student status');
    }
    
    if (scholarship.eligibility_criteria?.education_level) {
      reasons.push('Matches your education level');
    }
    
    if (scholarship.amount) {
      reasons.push(`Financial support of ${scholarship.currency || 'AED'} ${scholarship.amount}`);
    }
    
    return reasons;
  }

  private generateInternshipReasons(internship: any, profile: UserProfile, matchedSkills: string[]): string[] {
    const reasons: string[] = [];
    
    if (matchedSkills.length > 0) {
      reasons.push(`Matches your skills in ${matchedSkills.slice(0, 2).join(', ')}`);
    }
    
    if (internship.is_paid) {
      reasons.push('Paid internship opportunity');
    }
    
    reasons.push('Gain practical experience');
    
    if (internship.location && profile.location && internship.location.toLowerCase().includes(profile.location.toLowerCase())) {
      reasons.push('Convenient location');
    }
    
    return reasons;
  }
}

export const recommendationEngine = new RecommendationEngine();
