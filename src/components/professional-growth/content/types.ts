
// Professional Development Types
export interface ProfessionalDevelopmentCard {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  provider: string;
  rating: number;
  enrollmentCount: number;
  price: number;
  currency: string;
  imageUrl?: string;
  tags: string[];
  objectives: string[];
  prerequisites: string[];
  outcomes: string[];
  createdAt: string;
  updatedAt: string;
}

// Skills Assessment Types
export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'rating' | 'text';
  options?: string[];
  category: string;
  weight: number;
}

export interface SkillAssessmentComponent {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  duration: number;
  passingScore: number;
}

export interface ProgressMetrics {
  completionRate: number;
  skillGaps: string[];
  strengths: string[];
  recommendations: string[];
  overallScore: number;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'course' | 'book' | 'tool';
  url: string;
  description: string;
  tags: string[];
  rating: number;
  estimatedTime?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
}

// Mentorship Types
export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  experience: number;
  rating: number;
  availability: boolean;
  bio: string;
  profileImage?: string;
  languages: string[];
  timezone: string;
}

export interface MatchingCriteria {
  skills: string[];
  industry: string[];
  experience: string;
  goals: string[];
  availability: string[];
  location?: string;
}

export interface ConnectionStatus {
  status: 'pending' | 'accepted' | 'declined' | 'active' | 'completed';
  requestDate: string;
  responseDate?: string;
  reason?: string;
}

export interface CommunicationTool {
  type: 'video' | 'chat' | 'email' | 'phone';
  platform: string;
  available: boolean;
}

export interface MentorshipProgress {
  sessionsCompleted: number;
  totalSessions: number;
  goalsAchieved: number;
  totalGoals: number;
  satisfaction: number;
  feedback: string[];
}

export interface FeedbackInterface {
  rating: number;
  comments: string;
  areas: string[];
  recommendations: string[];
  date: string;
}

export interface MentorshipInterface {
  mentors: MentorProfile[];
  matching: MatchingCriteria;
  connections: ConnectionStatus[];
  communications: CommunicationTool[];
  progress: MentorshipProgress;
  feedback: FeedbackInterface[];
}

// Innovation Project Types
export interface InnovationProject {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: 'idea' | 'development' | 'prototype' | 'testing' | 'launch';
  team: string[];
  skills: string[];
  resources: string[];
  timeline: string;
  budget?: number;
  impact: string;
  status: 'open' | 'in-progress' | 'completed';
}

// Networking Event Types
export interface NetworkingEvent {
  id: string;
  title: string;
  description: string;
  type: 'conference' | 'workshop' | 'meetup' | 'webinar' | 'social';
  date: string;
  location: string;
  virtual: boolean;
  capacity: number;
  registered: number;
  industry: string[];
  speakers: string[];
  agenda: string[];
  registrationUrl: string;
  cost: number;
  currency: string;
}

// Success Story Types
export interface SuccessStory {
  id: string;
  title: string;
  author: string;
  role: string;
  company: string;
  story: string;
  achievements: string[];
  challenges: string[];
  lessons: string[];
  advice: string[];
  category: string;
  date: string;
  featured: boolean;
  imageUrl?: string;
  videoUrl?: string;
}

// Leadership Module Types
export interface LeadershipModule {
  id: string;
  title: string;
  description: string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'executive';
  duration: string;
  format: 'online' | 'in-person' | 'hybrid';
  topics: string[];
  competencies: string[];
  assessments: string[];
  certification: boolean;
  prerequisites: string[];
  outcomes: string[];
  instructor: string;
  price: number;
  currency: string;
}
