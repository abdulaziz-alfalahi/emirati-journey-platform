
export type AdvisorySessionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface CareerAdvisor {
  id: string;
  user_id: string;
  specialization: string;
  bio: string | null;
  availability: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  user_profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
}

export interface AdvisorySession {
  id: string;
  user_id: string;
  advisor_id: string;
  status: AdvisorySessionStatus;
  scheduled_date: string;
  completed_date: string | null;
  topic: string;
  details: string | null;
  notes: string | null;
  rating: number | null;
  feedback: string | null;
  video_call_url: string | null;
  created_at: string;
  updated_at: string | null;
  career_advisors?: CareerAdvisor;
  candidate_profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
}
