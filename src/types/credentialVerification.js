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
  verification_id?: string;
}

export interface VerifiedCredential {
  id?: string;
  user_id?: string;
  type?: 'education' | 'employment' | 'certification';
  credential_type?: string;
  verification_status?: string;
  status?: 'verified' | 'pending' | 'rejected';
  data?: any;
  metadata?: any;
  verified_at?: string;
  created_at?: string;
  updated_at?: string;
  verification_id?: string;
  verification_date?: string;
  verification_source?: string;
  [key: string]: any; // Allow additional properties
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
  url?: string;
  apiKey?: string;
  headers?: Record<string, string>;
  database_name?: string;
  timeout_seconds?: number;
  api_endpoint?: string;
  authentication_type?: string;
  is_active?: boolean;
  rate_limit_per_minute?: number;
  id?: string;
  created_at?: string;
  updated_at?: string;
}