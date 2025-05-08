
import { supabase } from "@/integrations/supabase/client";
import { 
  Scholarship, 
  Application,
  ScholarshipWithApplications
} from "@/types/scholarships";
import { mockScholarships } from "@/data/mockScholarships";

// Flag to determine whether to use mock data or real data
const USE_MOCK_DATA = true;

interface ScholarshipFilters {
  providerType?: string[];
  amount?: [number | null, number | null];
  search?: string;
}

/**
 * Fetch scholarships with optional filtering
 */
export const getScholarships = async (filters?: ScholarshipFilters): Promise<Scholarship[]> => {
  if (USE_MOCK_DATA) {
    let filtered = [...mockScholarships];
    
    if (filters) {
      // Filter by provider type if specified
      if (filters.providerType && filters.providerType.length > 0) {
        filtered = filtered.filter(s => filters.providerType?.includes(s.provider_type));
      }
      
      // Filter by amount range if specified
      if (filters.amount && (filters.amount[0] !== null || filters.amount[1] !== null)) {
        const min = filters.amount[0] ?? 0;
        const max = filters.amount[1] ?? Infinity;
        filtered = filtered.filter(s => {
          if (s.amount === undefined) return false;
          return s.amount >= min && s.amount <= max;
        });
      }
      
      // Filter by search query if specified
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(search) || 
          s.description?.toLowerCase().includes(search) ||
          s.provider.toLowerCase().includes(search)
        );
      }
    }
    
    return filtered;
  } else {
    let query = supabase.from('scholarships').select('*').eq('is_active', true);
    
    if (filters) {
      // Apply filters to query
      if (filters.providerType && filters.providerType.length > 0) {
        query = query.in('provider_type', filters.providerType);
      }
      
      if (filters.amount && filters.amount[0] !== null) {
        query = query.gte('amount', filters.amount[0]);
      }
      
      if (filters.amount && filters.amount[1] !== null) {
        query = query.lte('amount', filters.amount[1]);
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,provider.ilike.%${filters.search}%`);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching scholarships:', error);
      throw new Error('Failed to fetch scholarships');
    }
    
    return data as Scholarship[];
  }
};

/**
 * Apply for a scholarship
 */
export const applyForScholarship = async (scholarshipId: string, userId: string): Promise<Application> => {
  if (USE_MOCK_DATA) {
    // For mock data, just return a fake application object
    const mockApplication: Application = {
      id: `APP-${Math.floor(Math.random() * 10000)}`,
      scholarship_id: scholarshipId,
      student_id: userId,
      status: 'pending',
      submitted_at: new Date().toISOString(),
    };
    return mockApplication;
  } else {
    const { data, error } = await supabase
      .from('scholarship_applications')
      .insert({
        scholarship_id: scholarshipId,
        student_id: userId,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error applying for scholarship:', error);
      throw new Error('Failed to apply for scholarship');
    }
    
    return data as Application;
  }
};

/**
 * Get applications submitted by a student
 */
export const getUserApplications = async (userId: string): Promise<Application[]> => {
  if (USE_MOCK_DATA) {
    // Generate mock applications for the first 2-3 scholarships
    const mockApplications: Application[] = mockScholarships.slice(0, 3).map((scholarship, index) => ({
      id: `APP-${Math.floor(Math.random() * 10000)}`,
      scholarship_id: scholarship.id,
      student_id: userId,
      status: ['pending', 'approved', 'rejected'][index % 3] as 'pending' | 'approved' | 'rejected',
      submitted_at: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)).toISOString(), // Last X weeks
      scholarship: scholarship
    }));
    return mockApplications;
  } else {
    const { data, error } = await supabase
      .from('scholarship_applications')
      .select(`
        *,
        scholarship:scholarships(*)
      `)
      .eq('student_id', userId);
    
    if (error) {
      console.error('Error fetching user applications:', error);
      throw new Error('Failed to fetch user applications');
    }
    
    return data as Application[];
  }
};

/**
 * Get scholarships created by a provider with application counts
 */
export const getScholarshipsWithApplicationCounts = async (providerId: string): Promise<ScholarshipWithApplications[]> => {
  if (USE_MOCK_DATA) {
    // Return mock scholarships with fake application counts
    return mockScholarships
      .filter((_, index) => index % 2 === 0) // Take half of the scholarships as "created by this provider"
      .map(scholarship => ({
        ...scholarship,
        applications: {
          pending: Math.floor(Math.random() * 20),
          approved: Math.floor(Math.random() * 10),
          rejected: Math.floor(Math.random() * 5),
          total: Math.floor(Math.random() * 35)
        }
      }));
  } else {
    const { data: scholarships, error: scholarshipsError } = await supabase
      .from('scholarships')
      .select('*')
      .eq('created_by', providerId);
      
    if (scholarshipsError) {
      console.error('Error fetching scholarships:', scholarshipsError);
      throw new Error('Failed to fetch provider scholarships');
    }
    
    // For each scholarship, get application counts
    const scholarshipsWithCounts: ScholarshipWithApplications[] = await Promise.all(
      scholarships.map(async (scholarship: Scholarship) => {
        const { data: counts, error: countsError } = await supabase
          .from('scholarship_applications')
          .select('status')
          .eq('scholarship_id', scholarship.id);
          
        if (countsError) {
          console.error('Error fetching application counts:', countsError);
          return {
            ...scholarship,
            applications: { pending: 0, approved: 0, rejected: 0, total: 0 }
          };
        }
        
        const applications = {
          pending: counts.filter((app: any) => app.status === 'pending').length,
          approved: counts.filter((app: any) => app.status === 'approved').length,
          rejected: counts.filter((app: any) => app.status === 'rejected').length,
          total: counts.length
        };
        
        return { ...scholarship, applications };
      })
    );
    
    return scholarshipsWithCounts;
  }
};

/**
 * Get applications for a specific scholarship
 */
export const getApplicationsByScholarship = async (scholarshipId: string): Promise<Application[]> => {
  if (USE_MOCK_DATA) {
    // Generate mock applications
    const statusOptions = ['pending', 'approved', 'rejected'];
    const mockApplications: Application[] = Array.from({ length: 15 }, (_, index) => ({
      id: `APP-${Math.floor(Math.random() * 10000)}`,
      scholarship_id: scholarshipId,
      student_id: `user-${index}`,
      status: statusOptions[index % 3] as 'pending' | 'approved' | 'rejected',
      submitted_at: new Date(Date.now() - (index * 2 * 24 * 60 * 60 * 1000)).toISOString(), // Last X days
    }));
    return mockApplications;
  } else {
    const { data, error } = await supabase
      .from('scholarship_applications')
      .select('*')
      .eq('scholarship_id', scholarshipId);
    
    if (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Failed to fetch scholarship applications');
    }
    
    return data as Application[];
  }
};

/**
 * Update application status
 */
export const updateApplicationStatus = async (
  applicationId: string, 
  status: 'approved' | 'rejected'
): Promise<boolean> => {
  if (USE_MOCK_DATA) {
    // Just return success for mock data
    return true;
  } else {
    const { error } = await supabase
      .from('scholarship_applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', applicationId);
    
    if (error) {
      console.error('Error updating application status:', error);
      throw new Error('Failed to update application status');
    }
    
    return true;
  }
};

/**
 * Create a new scholarship
 */
export const createScholarship = async (scholarshipData: Partial<Scholarship>): Promise<Scholarship> => {
  if (USE_MOCK_DATA) {
    const newScholarship: Scholarship = {
      id: `SCH${Math.floor(Math.random() * 900) + 100}`,
      title: scholarshipData.title || '',
      provider: scholarshipData.provider || '',
      provider_type: scholarshipData.provider_type || 'university',
      is_active: true,
      created_at: new Date().toISOString(),
      created_by: scholarshipData.created_by || 'mock-user',
      ...scholarshipData
    };
    
    // Add it to our mock data for this session
    mockScholarships.push(newScholarship);
    
    return newScholarship;
  } else {
    const { data, error } = await supabase
      .from('scholarships')
      .insert(scholarshipData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating scholarship:', error);
      throw new Error('Failed to create scholarship');
    }
    
    return data as Scholarship;
  }
};
