
export interface ProgressMetrics {
  currentLevel: number;
  targetLevel: number;
  completionPercentage: number;
  skillsAcquired: number;
  timeInvested: number; // hours
  lastActivity: string;
}

export interface CertificationProgress {
  completed: number;
  inProgress: number;
  planned: number;
  totalCreditsEarned: number;
  industryRecognitions: number;
}

export interface LeadershipMetrics {
  leadershipSkillsLevel: number;
  teamProjectsLed: number;
  mentorshipRelationships: number;
  leadershipCertifications: number;
  communityContributions: number;
}

export interface InnovationMetrics {
  projectsParticipated: number;
  projectsLed: number;
  ideasContributed: number;
  collaborations: number;
  innovationScore: number;
}

export interface NetworkingMetrics {
  professionalConnections: number;
  eventsAttended: number;
  speakingEngagements: number;
  industryMentors: number;
  networkingScore: number;
}

export interface MentorshipMetrics {
  mentorsConnected: number;
  menteesGuided: number;
  sessionsCompleted: number;
  goalsAchieved: number;
  satisfactionRating: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'skill' | 'certification' | 'leadership' | 'innovation' | 'networking' | 'mentorship';
  icon: string;
  dateEarned: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export interface ProfessionalGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  milestones: GoalMilestone[];
}

export interface GoalMilestone {
  id: string;
  title: string;
  completed: boolean;
  completedDate?: string;
}

export interface PersonalizedRecommendation {
  id: string;
  type: 'skill' | 'certification' | 'networking' | 'mentorship' | 'project';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  benefits: string[];
  actionUrl: string;
}

export interface AnalyticsInsight {
  id: string;
  type: 'progress' | 'opportunity' | 'achievement' | 'trend';
  title: string;
  description: string;
  icon: string;
  value?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface ProfessionalGrowthAnalytics {
  overallProgress: {
    skillsDevelopment: ProgressMetrics;
    certifications: CertificationProgress;
    leadership: LeadershipMetrics;
    innovation: InnovationMetrics;
    networking: NetworkingMetrics;
    mentorship: MentorshipMetrics;
  };
  achievements: Achievement[];
  goals: ProfessionalGoal[];
  recommendations: PersonalizedRecommendation[];
  insights: AnalyticsInsight[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
  progress: number;
  icon: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  lastImproved: string;
  certifications: string[];
}

export interface ProgressChart {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'radar' | 'pie';
  data: ChartDataPoint[];
  timeRange: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
  category?: string;
}

export interface CompetencyMap {
  id: string;
  title: string;
  competencies: CompetencyArea[];
  overallScore: number;
}

export interface CompetencyArea {
  name: string;
  currentLevel: number;
  targetLevel: number;
  skills: string[];
}

export interface SkillGapAnalysis {
  criticalGaps: SkillGap[];
  emergingSkills: string[];
  industryTrends: IndustryTrend[];
  recommendations: string[];
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  importance: 'high' | 'medium' | 'low';
  timeToClose: string;
}

export interface IndustryTrend {
  skill: string;
  demandGrowth: number;
  timeframe: string;
}

export interface SkillDevelopmentPlan {
  shortTerm: DevelopmentAction[]; // Next 3 months
  mediumTerm: DevelopmentAction[]; // 3-12 months
  longTerm: DevelopmentAction[]; // 1+ years
}

export interface DevelopmentAction {
  id: string;
  title: string;
  type: 'course' | 'certification' | 'project' | 'mentorship' | 'practice';
  estimatedTime: string;
  priority: number;
  resources: string[];
}

export interface IndustryBenchmark {
  skill: string;
  userLevel: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
}

export interface SkillProgressVisualization {
  skillCategories: SkillCategory[];
  progressCharts: ProgressChart[];
  competencyMaps: CompetencyMap[];
  gapAnalysis: SkillGapAnalysis;
  developmentPlan: SkillDevelopmentPlan;
  benchmarking: IndustryBenchmark[];
}

export interface ProfessionalBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earnedDate: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface ProfessionalCertification {
  id: string;
  name: string;
  issuer: string;
  dateEarned: string;
  expiryDate?: string;
  credentialId: string;
  skills: string[];
  verificationUrl?: string;
}

export interface DevelopmentMilestone {
  id: string;
  title: string;
  description: string;
  achievedDate: string;
  category: string;
  impact: string;
}

export interface PeerRecognition {
  id: string;
  recognizedBy: string;
  recognizedFor: string;
  category: string;
  date: string;
  feedback: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'certification' | 'achievement' | 'testimonial';
  date: string;
  skills: string[];
  attachments: string[];
}

export interface ProfessionalTestimonial {
  id: string;
  author: string;
  relationship: string;
  content: string;
  date: string;
  skills: string[];
}

export interface AchievementSystem {
  badges: ProfessionalBadge[];
  certifications: ProfessionalCertification[];
  milestones: DevelopmentMilestone[];
  recognitions: PeerRecognition[];
  portfolioItems: PortfolioItem[];
  testimonials: ProfessionalTestimonial[];
}
