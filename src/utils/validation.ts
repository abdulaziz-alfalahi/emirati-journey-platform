
export const sanitizeText = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, 1000); // Limit length and trim whitespace
};

export const USER_ROLES = [
  'school_student',
  'national_service_participant', 
  'university_student',
  'intern',
  'full_time_employee',
  'part_time_employee',
  'gig_worker',
  'jobseeker',
  'lifelong_learner',
  'entrepreneur',
  'retiree',
  'educational_institution',
  'parent',
  'private_sector_recruiter',
  'government_representative',
  'retiree_advocate',
  'training_center',
  'assessment_center',
  'mentor',
  'career_advisor',
  'platform_operator',
  'administrator',
  'super_user'
] as const;
