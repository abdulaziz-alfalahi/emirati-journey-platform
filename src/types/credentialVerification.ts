// Credential Verification Types

export interface EducationVerificationData {
  emirates_id: string;
  institution_name: string;
  degree_type: string;
  field_of_study: string;
  graduation_year: number;
  gpa?: number;
}

export interface EmploymentVerificationData {
  emirates_id: string;
  employer_name: string;
  job_title: string;
  start_date: string;
  end_date?: string;
  salary_range?: string;
  employment_type: 'full_time' | 'part_time' | 'contract' | 'freelance';
}

export interface CertificationVerificationData {
  emirates_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  certification_number: string;
}

export interface VerificationResponse {
  success: boolean;
  error?: string;
  data?: any;
}

export interface VerifiedCredential {
  id: string;
  user_id: string;
  type: 'education' | 'employment' | 'certification';
  status: 'verified' | 'pending' | 'rejected';
  data: any;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialVerificationRequest {
  id: string;
  user_id: string;
  type: 'education' | 'employment' | 'certification';
  status: 'pending' | 'verified' | 'rejected';
  data: any;
  created_at: string;
  updated_at: string;
}

export interface ExternalDatabaseConfig {
  url: string;
  apiKey?: string;
  headers?: Record<string, string>;
}