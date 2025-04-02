
import { Scholarship, Application, ScholarshipWithApplications } from '@/types/scholarships';

// Mock scholarships data
const mockScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Engineering Excellence Scholarship',
    description: 'For students pursuing engineering degrees with outstanding academic records',
    provider: 'Abu Dhabi National Oil Company',
    provider_type: 'private_sector',
    amount: 50000,
    currency: 'AED',
    application_deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2023-09-01T12:00:00Z',
    created_by: 'user-1',
    website_url: 'https://example.com/scholarship'
  },
  {
    id: '2',
    title: 'AI and Future Technologies Scholarship',
    description: 'Supporting students in artificial intelligence and emerging tech fields',
    provider: 'Ministry of Artificial Intelligence',
    provider_type: 'government',
    amount: 75000,
    currency: 'AED',
    application_deadline: '2024-11-15T23:59:59Z',
    is_active: true,
    created_at: '2023-08-15T10:30:00Z',
    created_by: 'user-2',
    website_url: 'https://example.com/ai-scholarship'
  },
  {
    id: '3',
    title: 'Academic Merit Scholarship',
    description: 'For students with exceptional academic performance',
    provider: 'United Arab Emirates University',
    provider_type: 'university',
    amount: 30000,
    currency: 'AED',
    application_deadline: '2025-01-15T23:59:59Z',
    is_active: true,
    created_at: '2023-10-01T09:15:00Z',
    created_by: 'user-3',
    website_url: 'https://example.com/uaeu-scholarship'
  }
];

// Mock applications data
const mockApplications: Application[] = [
  {
    id: 'app-1',
    scholarship_id: '1',
    student_id: 'student-1',
    status: 'pending',
    submitted_at: '2024-02-15T14:30:00Z'
  },
  {
    id: 'app-2',
    scholarship_id: '2',
    student_id: 'student-1',
    status: 'approved',
    submitted_at: '2024-01-10T09:45:00Z'
  },
  {
    id: 'app-3',
    scholarship_id: '3',
    student_id: 'student-2',
    status: 'rejected',
    submitted_at: '2024-02-01T16:20:00Z'
  }
];

// Helper functions to simulate database queries
export const getScholarships = async (filters?: {
  providerType?: string[];
  amount?: [number | null, number | null];
  search?: string;
}): Promise<Scholarship[]> => {
  let filtered = [...mockScholarships];
  
  if (filters) {
    // Filter by provider type
    if (filters.providerType && filters.providerType.length > 0) {
      filtered = filtered.filter(s => filters.providerType!.includes(s.provider_type));
    }
    
    // Filter by amount range
    if (filters.amount && (filters.amount[0] !== null || filters.amount[1] !== null)) {
      filtered = filtered.filter(s => {
        const min = filters.amount![0] ?? 0;
        const max = filters.amount![1] ?? Infinity;
        return (s.amount !== undefined && s.amount >= min && s.amount <= max);
      });
    }
    
    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        s => s.title.toLowerCase().includes(searchLower) || 
             (s.description && s.description.toLowerCase().includes(searchLower)) ||
             s.provider.toLowerCase().includes(searchLower)
      );
    }
  }
  
  return filtered;
};

export const getScholarshipsByUser = async (userId: string): Promise<Scholarship[]> => {
  return mockScholarships.filter(s => s.created_by === userId);
};

export const getScholarshipById = async (id: string): Promise<Scholarship | null> => {
  return mockScholarships.find(s => s.id === id) || null;
};

export const getApplicationsByUser = async (userId: string): Promise<Application[]> => {
  const applications = mockApplications.filter(a => a.student_id === userId);
  
  // Add scholarship details to each application
  return applications.map(app => {
    const scholarship = mockScholarships.find(s => s.id === app.scholarship_id);
    return {
      ...app,
      scholarship
    };
  });
};

export const getApplicationsByScholarship = async (scholarshipId: string): Promise<Application[]> => {
  return mockApplications.filter(a => a.scholarship_id === scholarshipId);
};

export const countApplicationsByStatus = async (scholarshipId: string): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}> => {
  const applications = mockApplications.filter(a => a.scholarship_id === scholarshipId);
  
  return {
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    total: applications.length
  };
};

export const createScholarship = async (scholarship: Omit<Scholarship, 'id' | 'created_at'>): Promise<Scholarship> => {
  const newScholarship: Scholarship = {
    ...scholarship,
    id: `scholarship-${Date.now()}`,
    created_at: new Date().toISOString(),
    is_active: scholarship.is_active !== undefined ? scholarship.is_active : true
  };
  
  // In a real app, this would add to the database
  mockScholarships.push(newScholarship);
  return newScholarship;
};

export const applyForScholarship = async (scholarshipId: string, userId: string): Promise<Application> => {
  const newApplication: Application = {
    id: `app-${Date.now()}`,
    scholarship_id: scholarshipId,
    student_id: userId,
    status: 'pending',
    submitted_at: new Date().toISOString()
  };
  
  // In a real app, this would add to the database
  mockApplications.push(newApplication);
  return newApplication;
};

export const updateApplicationStatus = async (applicationId: string, status: 'pending' | 'approved' | 'rejected'): Promise<Application | null> => {
  const applicationIndex = mockApplications.findIndex(a => a.id === applicationId);
  
  if (applicationIndex === -1) {
    return null;
  }
  
  mockApplications[applicationIndex] = {
    ...mockApplications[applicationIndex],
    status
  };
  
  return mockApplications[applicationIndex];
};

export const getScholarshipsWithApplicationCounts = async (userId: string): Promise<ScholarshipWithApplications[]> => {
  const userScholarships = await getScholarshipsByUser(userId);
  
  return Promise.all(
    userScholarships.map(async (scholarship) => {
      const counts = await countApplicationsByStatus(scholarship.id);
      return {
        ...scholarship,
        applications: counts
      };
    })
  );
};
