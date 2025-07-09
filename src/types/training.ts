
export interface TrainingProvider {
  id: string;
  name: string;
  description?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  address?: string | null;
  is_verified: boolean | null;
  partnership_level: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface TrainingProgram {
  id: string;
  title: string;
  description?: string | null;
  category: 'technical_skills' | 'trade_skills' | 'service_skills' | 'entrepreneurship_business';
  subcategory?: string | null;
  provider_id: string | null;
  provider?: TrainingProvider | null;
  duration_weeks?: number | null;
  schedule_details?: string | null;
  prerequisites?: string[] | null;
  learning_outcomes?: string[] | null;
  certification_offered: boolean | null;
  certification_name?: string | null;
  job_placement_assistance: boolean | null;
  training_mode: 'in_person' | 'online' | 'hybrid' | null;
  location?: string | null;
  max_participants?: number | null;
  current_participants: number | null;
  price_amount?: number | null;
  price_currency: string | null;
  start_date?: string | null;
  end_date?: string | null;
  application_deadline?: string | null;
  status: 'draft' | 'active' | 'full' | 'completed' | 'cancelled' | null;
  featured: boolean | null;
  image_url?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface TrainingApplication {
  id: string;
  user_id: string;
  program_id: string | null;
  application_data: Record<string, any> | null;
  status: string | null;
  submitted_at: string | null;
  reviewed_at?: string | null;
  reviewer_notes?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface TrainingEnrollment {
  id: string;
  user_id: string;
  program_id: string | null;
  application_id?: string | null;
  enrollment_date: string | null;
  completion_date?: string | null;
  progress_percentage: number | null;
  status: string | null;
  certificate_issued: boolean | null;
  certificate_url?: string | null;
  final_grade?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface TrainingFilters {
  category?: string;
  training_mode?: string;
  certification_offered?: boolean;
  job_placement_assistance?: boolean;
  price_range?: [number, number];
  duration_weeks?: [number, number];
  search?: string;
}
