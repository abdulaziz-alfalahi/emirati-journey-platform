
export interface Mentor {
  id: string;
  user_id: string;
  expertise: string[];
  years_experience?: number;
  bio?: string;
  availability?: {
    days: string[];
    hours: string[];
    timezone: string;
  };
  is_active: boolean;
  is_verified: boolean;
  rating?: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface MentorshipRelationship {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: 'requested' | 'active' | 'completed' | 'cancelled' | 'accepted';
  goals?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface MentorshipSession {
  id: string;
  relationship_id: string;
  scheduled_date: string;
  duration_minutes: number;
  topic?: string;
  notes?: string;
  video_call_url?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  rating?: number;
  feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface MentorProfile {
  expertise: string[];
  years_experience: number;
  bio: string;
  availability: {
    days: string[];
    hours: string[];
    timezone: string;
  };
  is_active: boolean;
}

export interface MenteePreferences {
  desired_expertise: string[];
  career_goals: string[];
  preferred_communication: string[];
  availability: {
    days: string[];
    hours: string[];
    timezone: string;
  };
  experience_level: 'beginner' | 'intermediate' | 'advanced';
}

export interface MatchSuggestion {
  mentor: Mentor;
  compatibility_score: number;
  match_reasons: string[];
  expertise_match: number;
  availability_match: number;
  experience_compatibility: number;
}
