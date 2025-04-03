
import { Internship, InternshipApplication, InternshipWithApplications } from '@/types/internships';
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetch internships with optional filtering
 */
export const getInternships = async (filters?: {
  industry?: string[];
  isPaid?: boolean;
  location?: string[];
  search?: string;
}): Promise<Internship[]> => {
  let query = supabase
    .from('internships')
    .select('*')
    .eq('is_active', true);
  
  if (filters) {
    // Filter by industry
    if (filters.industry && filters.industry.length > 0) {
      query = query.in('industry', filters.industry);
    }
    
    // Filter by paid status
    if (filters.isPaid !== undefined) {
      query = query.eq('is_paid', filters.isPaid);
    }
    
    // Filter by location
    if (filters.location && filters.location.length > 0) {
      // Since location is a text field, we need to use a different approach
      const locationFilters = filters.location.map(loc => `location.ilike.%${loc}%`);
      query = query.or(locationFilters.join(','));
    }
    
    // Filter by search query
    if (filters.search) {
      const searchTerm = `%${filters.search.toLowerCase()}%`;
      query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm},company.ilike.${searchTerm}`);
    }
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching internships:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Fetch internships created by a specific user
 */
export const getInternshipsByCompany = async (userId: string): Promise<Internship[]> => {
  const { data, error } = await supabase
    .from('internships')
    .select('*')
    .eq('created_by', userId);
  
  if (error) {
    console.error('Error fetching user internships:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Get a specific internship by ID
 */
export const getInternshipById = async (id: string): Promise<Internship | null> => {
  const { data, error } = await supabase
    .from('internships')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching internship:', error);
    throw error;
  }
  
  return data;
};

/**
 * Get all applications for a specific user
 */
export const getApplicationsByUser = async (userId: string): Promise<InternshipApplication[]> => {
  // First get the applications with internship details
  const { data: applications, error: appError } = await supabase
    .from('internship_applications')
    .select(`
      *,
      internship:internship_id (*)
    `)
    .eq('student_id', userId);
  
  if (appError) {
    console.error('Error fetching user applications:', appError);
    throw appError;
  }
  
  return applications || [];
};

/**
 * Get all applications for a specific internship
 */
export const getApplicationsByInternship = async (internshipId: string): Promise<InternshipApplication[]> => {
  const { data, error } = await supabase
    .from('internship_applications')
    .select('*')
    .eq('internship_id', internshipId);
  
  if (error) {
    console.error('Error fetching internship applications:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Count applications by status for a specific internship
 */
export const countApplicationsByStatus = async (internshipId: string): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  withdrawn: number;
  total: number;
}> => {
  const { data, error } = await supabase
    .from('internship_applications')
    .select('status')
    .eq('internship_id', internshipId);
  
  if (error) {
    console.error('Error counting applications:', error);
    throw error;
  }
  
  const applications = data || [];
  
  return {
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    withdrawn: applications.filter(a => a.status === 'withdrawn').length,
    total: applications.length
  };
};

/**
 * Create a new internship
 */
export const createInternship = async (internship: Omit<Internship, 'id' | 'created_at'>): Promise<Internship> => {
  const { data, error } = await supabase
    .from('internships')
    .insert([internship])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating internship:', error);
    throw error;
  }
  
  return data;
};

/**
 * Apply for an internship
 */
export const applyForInternship = async (internshipId: string, userId: string, notes?: string): Promise<InternshipApplication> => {
  const { data, error } = await supabase
    .from('internship_applications')
    .insert([
      {
        internship_id: internshipId,
        student_id: userId,
        status: 'pending',
        notes
      }
    ])
    .select()
    .single();
  
  if (error) {
    console.error('Error applying for internship:', error);
    throw error;
  }
  
  return data;
};

/**
 * Update an application status
 */
export const updateApplicationStatus = async (
  applicationId: string, 
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn'
): Promise<InternshipApplication | null> => {
  const { data, error } = await supabase
    .from('internship_applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', applicationId)
    .select()
    .maybeSingle();
  
  if (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
  
  return data;
};

/**
 * Get internships with application counts
 */
export const getInternshipsWithApplicationCounts = async (userId: string): Promise<InternshipWithApplications[]> => {
  // First get all the internships
  const internships = await getInternshipsByCompany(userId);
  
  // Then get counts for each internship
  const internshipsWithCounts = await Promise.all(
    internships.map(async (internship) => {
      const counts = await countApplicationsByStatus(internship.id);
      return {
        ...internship,
        applications: counts
      };
    })
  );
  
  return internshipsWithCounts;
};

/**
 * Update an internship's active status
 */
export const updateInternshipStatus = async (internshipId: string, isActive: boolean): Promise<Internship | null> => {
  const { data, error } = await supabase
    .from('internships')
    .update({ is_active: isActive })
    .eq('id', internshipId)
    .select()
    .maybeSingle();
  
  if (error) {
    console.error('Error updating internship status:', error);
    throw error;
  }
  
  return data;
};
