
import { SummerCamp, CampEnrollment, CampFilters } from '@/types/summerCamps';
import { toast } from '@/hooks/use-toast';

// Mock data for summer camps
const mockCamps: SummerCamp[] = [
  {
    id: '1',
    title: 'Adventure Sports Camp',
    organizer: 'UAE Sports Academy',
    description: 'An exciting adventure sports camp featuring rock climbing, kayaking, and team building activities.',
    category: 'Sports',
    age_group: '11-13 years',
    start_date: '2024-07-01',
    end_date: '2024-07-15',
    duration: '2 weeks',
    location: 'Dubai',
    capacity: 30,
    enrolled: 18,
    price: 1500,
    image_url: '/camp-1.jpg',
    tags: ['adventure', 'sports', 'outdoor'],
    rating: 4.8,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: null,
    max_participants: 30,
    registration_deadline: '2024-06-15'
  },
  {
    id: '2',
    title: 'Creative Arts Workshop',
    organizer: 'Dubai Arts Center',
    description: 'Explore your creativity through painting, sculpture, and digital art.',
    category: 'Arts & Crafts',
    age_group: '8-10 years',
    start_date: '2024-07-08',
    end_date: '2024-07-22',
    duration: '2 weeks',
    location: 'Dubai',
    capacity: 25,
    enrolled: 12,
    price: 1200,
    image_url: '/camp-2.jpg',
    tags: ['arts', 'creativity', 'workshop'],
    rating: 4.6,
    created_at: '2024-01-20T14:30:00Z',
    updated_at: null,
    max_participants: 25,
    registration_deadline: '2024-06-22'
  }
];

export const campQueryService = {
  getCampsPaginated: async ({ page, pageSize, filters }: {
    page: number;
    pageSize: number;
    filters: CampFilters;
  }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCamps = [...mockCamps];
    
    // Apply filters
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      filteredCamps = filteredCamps.filter(camp => 
        camp.title.toLowerCase().includes(searchLower) ||
        camp.description.toLowerCase().includes(searchLower) ||
        camp.organizer.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.category && filters.category.length > 0) {
      filteredCamps = filteredCamps.filter(camp => 
        filters.category?.includes(camp.category)
      );
    }
    
    if (filters.ageGroup && filters.ageGroup.length > 0) {
      filteredCamps = filteredCamps.filter(camp => 
        filters.ageGroup?.includes(camp.age_group)
      );
    }
    
    if (filters.location && filters.location.length > 0) {
      filteredCamps = filteredCamps.filter(camp => 
        filters.location?.some(loc => 
          camp.location.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCamps = filteredCamps.slice(startIndex, endIndex);
    
    return {
      camps: paginatedCamps,
      totalCount: filteredCamps.length
    };
  },

  getCampsByInstitutionPaginated: async (userId: string, { page, pageSize }: {
    page: number;
    pageSize: number;
  }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter camps by created_by (simulated)
    const institutionCamps = mockCamps.filter(camp => camp.created_by === userId);
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCamps = institutionCamps.slice(startIndex, endIndex);
    
    return {
      camps: paginatedCamps,
      totalCount: institutionCamps.length
    };
  }
};

export const getUserEnrollments = async (userId: string): Promise<CampEnrollment[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock enrollments
  return [
    {
      id: 'enroll-1',
      camp_id: '1',
      user_id: userId,
      status: 'confirmed',
      payment_status: 'paid',
      enrolled_at: '2024-01-25T10:00:00Z',
      updated_at: null,
      camp: mockCamps[0]
    }
  ];
};

export const enrollInCamp = async (campId: string, userId: string): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Enrollment Successful",
      description: "You have been enrolled in the summer camp!",
    });
    
    return true;
  } catch (error) {
    toast({
      title: "Enrollment Failed",
      description: "There was an error enrolling in the camp. Please try again.",
      variant: "destructive",
    });
    
    return false;
  }
};

export const cancelEnrollment = async (enrollmentId: string, campId: string): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Enrollment Cancelled",
      description: "Your enrollment has been cancelled successfully.",
    });
    
    return true;
  } catch (error) {
    toast({
      title: "Cancellation Failed",
      description: "There was an error cancelling your enrollment. Please try again.",
      variant: "destructive",
    });
    
    return false;
  }
};
