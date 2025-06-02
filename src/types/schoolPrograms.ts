
export type SchoolProgram = {
  id: string;
  title: string;
  institution: string;
  description: string;
  subject_area: string;
  grade_level: string;
  program_type: string;
  age_range: string;
  duration: string;
  schedule: string;
  location: string;
  capacity: number;
  enrolled: number;
  price: number;
  currency: string;
  image_url: string;
  learning_outcomes: string[];
  requirements: string[];
  tags: string[];
  status: 'active' | 'upcoming' | 'full' | 'closed';
  registration_deadline: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string | null;
  created_by?: string;
  contact_email?: string;
  contact_phone?: string;
};

export type ProgramEnrollment = {
  id: string;
  program_id: string;
  user_id: string;
  status: 'enrolled' | 'completed' | 'withdrawn' | 'pending';
  enrollment_date: string;
  completion_date?: string;
  progress_percentage: number;
  // Joined data
  program?: SchoolProgram;
};

export type ProgramFilters = {
  gradeLevel?: string[];
  subjectArea?: string[];
  programType?: string[];
  institution?: string[];
  location?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  searchQuery?: string;
};

export type EducationalInstitution = {
  id: string;
  name: string;
  type: 'public' | 'private' | 'international' | 'specialized';
  description: string;
  location: string;
  website_url?: string;
  contact_email: string;
  contact_phone?: string;
  logo_url?: string;
  programs_count: number;
  established_year?: number;
  accreditation: string[];
  specializations: string[];
  grade_levels_served: string[];
  created_at: string;
  updated_at: string | null;
};
