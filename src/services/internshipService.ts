
import { Internship, InternshipApplication, InternshipWithApplications } from '@/types/internships';

// Mock internships data
const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    description: 'Join our tech team for a hands-on experience in software development. You will work on real projects using modern technologies.',
    company: 'TechInnovate LLC',
    location: 'Dubai',
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T00:00:00Z',
    application_deadline: '2024-05-15T23:59:59Z',
    is_paid: true,
    stipend_amount: 3000,
    currency: 'AED',
    requirements: ['Currently enrolled in Computer Science or related field', 'Basic programming knowledge', 'Good communication skills'],
    skills_required: ['JavaScript', 'HTML/CSS', 'React basics'],
    industry: 'Technology',
    department: 'Engineering',
    education_level: 'Undergraduate',
    contact_email: 'internships@techinnovate.ae',
    contact_phone: '+971501234567',
    website_url: 'https://techinnovate.ae/careers/internships',
    is_active: true,
    created_at: '2024-01-15T08:00:00Z',
    created_by: 'user-1'
  },
  {
    id: '2',
    title: 'Marketing Intern',
    description: 'Exciting opportunity to learn digital marketing strategies in a fast-paced environment.',
    company: 'Global Marketing Solutions',
    location: 'Abu Dhabi',
    start_date: '2024-07-01T00:00:00Z',
    end_date: '2024-09-30T00:00:00Z',
    application_deadline: '2024-06-01T23:59:59Z',
    is_paid: true,
    stipend_amount: 2500,
    currency: 'AED',
    requirements: ['Marketing, Business, or Communications student', 'Creative mindset', 'Team player'],
    skills_required: ['Social media familiarity', 'Basic graphic design', 'Content writing'],
    industry: 'Marketing',
    department: 'Digital Marketing',
    education_level: 'Undergraduate',
    contact_email: 'careers@gms.ae',
    website_url: 'https://gms.ae/internships',
    is_active: true,
    created_at: '2024-01-20T10:30:00Z',
    created_by: 'user-2'
  },
  {
    id: '3',
    title: 'Finance Intern',
    description: 'Learn about financial analysis and reporting in the banking sector.',
    company: 'Emirates Investment Bank',
    location: 'Dubai Financial District',
    start_date: '2024-06-15T00:00:00Z',
    end_date: '2024-09-15T00:00:00Z',
    application_deadline: '2024-05-01T23:59:59Z',
    is_paid: true,
    stipend_amount: 4000,
    currency: 'AED',
    requirements: ['Finance or Accounting major', 'Minimum 3.0 GPA', 'Analytical skills'],
    skills_required: ['Excel', 'Financial modeling basics', 'Attention to detail'],
    industry: 'Banking',
    department: 'Finance',
    education_level: 'Undergraduate/Graduate',
    contact_email: 'hr@eib.ae',
    contact_phone: '+97142008000',
    website_url: 'https://eib.ae/careers/internship-program',
    is_active: true,
    created_at: '2024-01-10T14:45:00Z',
    created_by: 'user-3'
  }
];

// Mock applications data
const mockApplications: InternshipApplication[] = [
  {
    id: 'app-1',
    internship_id: '1',
    student_id: 'student-1',
    status: 'pending',
    submitted_at: '2024-02-15T14:30:00Z',
    notes: 'Interested in frontend development'
  },
  {
    id: 'app-2',
    internship_id: '2',
    student_id: 'student-1',
    status: 'approved',
    submitted_at: '2024-01-10T09:45:00Z',
    updated_at: '2024-01-15T16:20:00Z'
  },
  {
    id: 'app-3',
    internship_id: '3',
    student_id: 'student-2',
    status: 'rejected',
    submitted_at: '2024-02-01T16:20:00Z',
    updated_at: '2024-02-05T11:15:00Z',
    notes: 'Insufficient qualifications'
  }
];

// Helper functions to simulate database queries
export const getInternships = async (filters?: {
  industry?: string[];
  isPaid?: boolean;
  location?: string[];
  search?: string;
}): Promise<Internship[]> => {
  let filtered = [...mockInternships];
  
  if (filters) {
    // Filter by industry
    if (filters.industry && filters.industry.length > 0) {
      filtered = filtered.filter(i => filters.industry!.includes(i.industry));
    }
    
    // Filter by paid status
    if (filters.isPaid !== undefined) {
      filtered = filtered.filter(i => i.is_paid === filters.isPaid);
    }
    
    // Filter by location
    if (filters.location && filters.location.length > 0) {
      filtered = filtered.filter(i => {
        return filters.location!.some(loc => i.location.toLowerCase().includes(loc.toLowerCase()));
      });
    }
    
    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        i => i.title.toLowerCase().includes(searchLower) || 
             i.description.toLowerCase().includes(searchLower) ||
             i.company.toLowerCase().includes(searchLower)
      );
    }
  }
  
  return filtered;
};

export const getInternshipById = async (id: string): Promise<Internship | null> => {
  return mockInternships.find(i => i.id === id) || null;
};

export const getInternshipsByCompany = async (userId: string): Promise<Internship[]> => {
  return mockInternships.filter(i => i.created_by === userId);
};

export const getApplicationsByUser = async (userId: string): Promise<InternshipApplication[]> => {
  const applications = mockApplications.filter(a => a.student_id === userId);
  
  // Add internship details to each application
  return applications.map(app => {
    const internship = mockInternships.find(i => i.id === app.internship_id);
    return {
      ...app,
      internship
    };
  });
};

export const getApplicationsByInternship = async (internshipId: string): Promise<InternshipApplication[]> => {
  return mockApplications.filter(a => a.internship_id === internshipId);
};

export const countApplicationsByStatus = async (internshipId: string): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  withdrawn: number;
  total: number;
}> => {
  const applications = mockApplications.filter(a => a.internship_id === internshipId);
  
  return {
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    withdrawn: applications.filter(a => a.status === 'withdrawn').length,
    total: applications.length
  };
};

export const createInternship = async (internship: Omit<Internship, 'id' | 'created_at'>): Promise<Internship> => {
  const newInternship: Internship = {
    ...internship,
    id: `internship-${Date.now()}`,
    created_at: new Date().toISOString(),
    is_active: internship.is_active !== undefined ? internship.is_active : true
  };
  
  // In a real app, this would add to the database
  mockInternships.push(newInternship);
  return newInternship;
};

export const applyForInternship = async (internshipId: string, userId: string, notes?: string): Promise<InternshipApplication> => {
  const newApplication: InternshipApplication = {
    id: `app-${Date.now()}`,
    internship_id: internshipId,
    student_id: userId,
    status: 'pending',
    submitted_at: new Date().toISOString(),
    notes
  };
  
  // In a real app, this would add to the database
  mockApplications.push(newApplication);
  return newApplication;
};

export const updateApplicationStatus = async (
  applicationId: string, 
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn'
): Promise<InternshipApplication | null> => {
  const applicationIndex = mockApplications.findIndex(a => a.id === applicationId);
  
  if (applicationIndex === -1) {
    return null;
  }
  
  mockApplications[applicationIndex] = {
    ...mockApplications[applicationIndex],
    status,
    updated_at: new Date().toISOString()
  };
  
  return mockApplications[applicationIndex];
};

export const getInternshipsWithApplicationCounts = async (userId: string): Promise<InternshipWithApplications[]> => {
  const userInternships = await getInternshipsByCompany(userId);
  
  return Promise.all(
    userInternships.map(async internship => {
      const counts = await countApplicationsByStatus(internship.id);
      return {
        ...internship,
        applications: counts
      };
    })
  );
};
