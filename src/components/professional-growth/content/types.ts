
// Skill Assessment Types
export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scale' | 'text';
  options?: string[];
  weight: number;
}

export interface ProgressMetrics {
  currentLevel: number;
  targetLevel: number;
  completionPercentage: number;
  timeSpent: number;
  accuracy: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'course' | 'article' | 'video' | 'book';
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  completed: boolean;
}

export interface SkillAssessmentComponent {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  assessmentQuestions: AssessmentQuestion[];
  progressTracking: ProgressMetrics;
  recommendedResources: Resource[];
  nextSteps: ActionItem[];
}

// Mentorship Types
export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  expertise: string[];
  experience: number;
  rating: number;
  availability: 'high' | 'medium' | 'low';
}

export interface MatchingCriteria {
  skills: string[];
  industry: string[];
  experience: string;
  goals: string[];
}

export interface ConnectionStatus {
  status: 'pending' | 'connected' | 'completed';
  requestDate: string;
  acceptedDate?: string;
  completedDate?: string;
}

export interface CommunicationTool {
  type: 'video' | 'chat' | 'email' | 'phone';
  available: boolean;
  scheduled?: string;
}

export interface MentorshipProgress {
  sessionsCompleted: number;
  totalSessions: number;
  goals: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  milestones: {
    id: string;
    title: string;
    date: string;
    completed: boolean;
  }[];
}

export interface FeedbackInterface {
  mentorFeedback: {
    rating: number;
    comments: string;
    date: string;
  }[];
  menteeFeedback: {
    rating: number;
    comments: string;
    date: string;
  }[];
}

export interface MentorshipInterface {
  mentorProfiles: MentorProfile[];
  matchingCriteria: MatchingCriteria;
  connectionStatus: ConnectionStatus;
  communicationTools: CommunicationTool[];
  progressTracking: MentorshipProgress;
  feedbackSystem: FeedbackInterface;
}

// Innovation Project Types
export interface InnovationProject {
  id: string;
  title: string;
  description: string;
  category: 'technology' | 'sustainability' | 'healthcare' | 'education' | 'finance';
  status: 'ideation' | 'development' | 'testing' | 'implementation' | 'completed';
  progress: number;
  collaborators: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  skills: string[];
  likes: number;
  comments: number;
  shares: number;
  createdBy: {
    name: string;
    title: string;
    avatar?: string;
  };
  timeline: {
    phase: string;
    status: 'completed' | 'current' | 'upcoming';
    date: string;
  }[];
}

// Networking Event Types
export interface NetworkingEvent {
  id: string;
  title: string;
  description: string;
  type: 'conference' | 'workshop' | 'meetup' | 'seminar' | 'networking';
  date: string;
  location: string;
  capacity: number;
  registered: number;
  speakers: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  }[];
  topics: string[];
  price: number;
  currency: string;
  organizer: {
    name: string;
    company: string;
    avatar?: string;
  };
}

// Success Story Types
export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  category: 'career_change' | 'promotion' | 'entrepreneurship' | 'skill_development' | 'leadership';
  author: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
  timeline: {
    duration: string;
    keyMilestones: string[];
  };
  achievements: {
    metric: string;
    value: string;
    description: string;
  }[];
  skills: string[];
  resources: {
    title: string;
    type: 'course' | 'certification' | 'mentorship' | 'book' | 'program';
    helpful: boolean;
  }[];
  media: {
    type: 'video' | 'podcast' | 'article';
    thumbnail?: string;
    duration?: string;
    readTime?: string;
  };
  engagement: {
    likes: number;
    shares: number;
    inspirations: number;
  };
  tags: string[];
}

// Leadership Module Types
export interface LeadershipModule {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: {
    id: string;
    title: string;
    completed: boolean;
    lessons: {
      id: string;
      title: string;
      type: 'video' | 'reading' | 'exercise' | 'assessment';
      duration: string;
      completed: boolean;
    }[];
  }[];
  skills: string[];
  assessments: {
    id: string;
    title: string;
    type: 'quiz' | 'project' | 'peer-review';
    score?: number;
    completed: boolean;
  }[];
  progress: number;
  certificate?: {
    earned: boolean;
    dateEarned?: string;
    certificateUrl?: string;
  };
}
