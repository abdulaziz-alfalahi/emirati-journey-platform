
export type AssessmentType = 'skills' | 'behaviors' | 'capabilities';

export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  center_id: string;
  assessment_type: AssessmentType;
  duration_minutes: number | null;
  price_amount: number | null;
  price_currency: string | null;
  skills_tested: string[] | null;
  requirements: string | null;
  eligibility_criteria: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export type AssessmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface AssessmentSession {
  id: string;
  assessment_id: string;
  user_id: string;
  status: AssessmentStatus;
  score: number | null;
  feedback: string | null;
  results: Record<string, any> | null;
  scheduled_date: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string | null;
  assessments?: {
    title: string;
    assessment_type: AssessmentType;
  };
  coaching_recommended: boolean;
  coaching_notes: string | null;
}

export type AssessmentFormValues = {
  title: string;
  description: string;
  assessment_type: AssessmentType;
  duration_minutes: number | null;
  price_amount: number | null;
  price_currency: string;
  skills_tested: string;
  requirements: string;
  eligibility_criteria: string;
  is_active: boolean;
};

export interface CoachingRecommendation {
  id: string;
  session_id: string;
  user_id: string;
  reason: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'declined';
  coach_id: string | null;
  scheduled_date: string | null;
}
