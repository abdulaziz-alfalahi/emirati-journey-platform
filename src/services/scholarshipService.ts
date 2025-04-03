import { Scholarship, Application, ScholarshipWithApplications } from '@/types/scholarships';
import { supabase } from '@/integrations/supabase/client';

// Status type guard
function isValidStatus(status: string): status is "pending" | "approved" | "rejected" {
  return ["pending", "approved", "rejected"].includes(status);
}

// Helper to transform scholarship data
function transformScholarship(data: any): Scholarship {
  return {
    ...data,
    // Convert JSON to Record<string, any> if needed
    eligibility_criteria: typeof data.eligibility_criteria === 'string'
      ? JSON.parse(data.eligibility_criteria)
      : (data.eligibility_criteria || {})
  };
}

// Helper to transform application data
function transformApplication(app: any): Application {
  return {
    ...app,
    status: isValidStatus(app.status) ? app.status : "pending" // Default to pending if invalid
  };
}

/**
 * Fetch scholarships with optional filtering
 */
export const getScholarships = async (filters?: {
  providerType?: string[];
  amount?: [number | null, number | null];
  search?: string;
}): Promise<Scholarship[]> => {
  let query = supabase
    .from('scholarships')
    .select('*')
    .eq('is_active', true);
  
  if (filters) {
    // Filter by provider type
    if (filters.providerType && filters.providerType.length > 0) {
      query = query.in('provider_type', filters.providerType);
    }
    
    // Filter by amount range
    if (filters.amount && (filters.amount[0] !== null || filters.amount[1] !== null)) {
      const min = filters.amount[0] ?? 0;
      if (filters.amount[0] !== null) {
        query = query.gte('amount', min);
      }
      
      if (filters.amount[1] !== null) {
        query = query.lte('amount', filters.amount[1]);
      }
    }
    
    // Filter by search query
    if (filters.search) {
      const searchTerm = `%${filters.search.toLowerCase()}%`;
      query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm},provider.ilike.${searchTerm}`);
    }
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching scholarships:', error);
    throw error;
  }
  
  return data ? data.map(transformScholarship) : [];
};

/**
 * Fetch scholarships created by a specific user
 */
export const getScholarshipsByUser = async (userId: string): Promise<Scholarship[]> => {
  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('created_by', userId);
  
  if (error) {
    console.error('Error fetching user scholarships:', error);
    throw error;
  }
  
  return data ? data.map(transformScholarship) : [];
};

/**
 * Get a specific scholarship by ID
 */
export const getScholarshipById = async (id: string): Promise<Scholarship | null> => {
  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching scholarship:', error);
    throw error;
  }
  
  return data ? transformScholarship(data) : null;
};

/**
 * Get all applications for a specific user
 */
export const getApplicationsByUser = async (userId: string): Promise<Application[]> => {
  // First get the applications
  const { data: applications, error: appError } = await supabase
    .from('scholarship_applications')
    .select(`
      *,
      scholarship:scholarship_id (*)
    `)
    .eq('student_id', userId);
  
  if (appError) {
    console.error('Error fetching user applications:', appError);
    throw appError;
  }
  
  return applications ? applications.map(transformApplication) : [];
};

/**
 * Get all applications for a specific scholarship
 */
export const getApplicationsByScholarship = async (scholarshipId: string): Promise<Application[]> => {
  const { data, error } = await supabase
    .from('scholarship_applications')
    .select('*')
    .eq('scholarship_id', scholarshipId);
  
  if (error) {
    console.error('Error fetching scholarship applications:', error);
    throw error;
  }
  
  return data ? data.map(transformApplication) : [];
};

/**
 * Count applications by status for a specific scholarship
 */
export const countApplicationsByStatus = async (scholarshipId: string): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}> => {
  const { data, error } = await supabase
    .from('scholarship_applications')
    .select('status')
    .eq('scholarship_id', scholarshipId);
  
  if (error) {
    console.error('Error counting applications:', error);
    throw error;
  }
  
  const applications = data || [];
  
  return {
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    total: applications.length
  };
};

/**
 * Create a new scholarship
 */
export const createScholarship = async (scholarship: Omit<Scholarship, 'id' | 'created_at'>): Promise<Scholarship> => {
  const { data, error } = await supabase
    .from('scholarships')
    .insert([scholarship])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating scholarship:', error);
    throw error;
  }
  
  return transformScholarship(data);
};

/**
 * Apply for a scholarship
 */
export const applyForScholarship = async (scholarshipId: string, userId: string): Promise<Application> => {
  const { data, error } = await supabase
    .from('scholarship_applications')
    .insert([
      {
        scholarship_id: scholarshipId,
        student_id: userId,
        status: 'pending'
      }
    ])
    .select()
    .single();
  
  if (error) {
    console.error('Error applying for scholarship:', error);
    throw error;
  }
  
  return transformApplication(data);
};

/**
 * Update an application status
 */
export const updateApplicationStatus = async (applicationId: string, status: 'pending' | 'approved' | 'rejected'): Promise<Application | null> => {
  const { data, error } = await supabase
    .from('scholarship_applications')
    .update({ status })
    .eq('id', applicationId)
    .select()
    .maybeSingle();
  
  if (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
  
  return data ? transformApplication(data) : null;
};

/**
 * Get scholarships with application counts
 */
export const getScholarshipsWithApplicationCounts = async (userId: string): Promise<ScholarshipWithApplications[]> => {
  // First get all the scholarships
  const scholarships = await getScholarshipsByUser(userId);
  
  // Then get counts for each scholarship
  const scholarshipsWithCounts = await Promise.all(
    scholarships.map(async (scholarship) => {
      const counts = await countApplicationsByStatus(scholarship.id);
      return {
        ...scholarship,
        applications: counts
      };
    })
  );
  
  return scholarshipsWithCounts;
};
