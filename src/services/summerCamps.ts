
import { SummerCamp, CampEnrollment, CampFilters } from '@/types/summerCamps';
import { toast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockCamps: SummerCamp[] = [
  {
    id: '1',
    title: 'Robotics Summer Camp',
    organizer: 'Dubai Tech Academy',
    description: 'Learn robotics and programming fundamentals',
    category: 'Technology',
    age_group: '10-16',
    start_date: '2024-07-01',
    end_date: '2024-07-15',
    duration: '2 weeks',
    location: 'Dubai Knowledge Park',
    capacity: 30,
    enrolled: 15,
    price: 1500,
    image_url: '/images/robotics-camp.jpg',
    tags: ['robotics', 'programming', 'STEM'],
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: null
  },
  {
    id: '2',
    title: 'Art & Design Workshop',
    organizer: 'Creative Arts Center',
    description: 'Explore creativity through various art mediums',
    category: 'Arts',
    age_group: '8-14',
    start_date: '2024-07-08',
    end_date: '2024-07-22',
    duration: '2 weeks',
    location: 'Dubai Marina',
    capacity: 25,
    enrolled: 20,
    price: 1200,
    image_url: '/images/art-camp.jpg',
    tags: ['art', 'creativity', 'design'],
    rating: 4.6,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: null
  }
];

export const campQueryService = {
  getCampsPaginated: async (params: {
    page: number;
    pageSize: number;
    filters: CampFilters;
  }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCamps = [...mockCamps];
    
    // Apply filters
    if (params.filters.category && params.filters.category.length > 0) {
      filteredCamps = filteredCamps.filter(camp => 
        params.filters.category?.includes(camp.category)
      );
    }
    
    if (params.filters.ageGroup && params.filters.ageGroup.length > 0) {
      filteredCamps = filteredCamps.filter(camp => 
        params.filters.ageGroup?.includes(camp.age_group)
      );
    }
    
    if (params.filters.searchQuery) {
      const searchLower = params.filters.searchQuery.toLowerCase();
      filteredCamps = filteredCamps.filter(camp => 
        camp.title.toLowerCase().includes(searchLower) ||
        camp.description.toLowerCase().includes(searchLower) ||
        camp.organizer.toLowerCase().includes(searchLower)
      );
    }
    
    const startIndex = (params.page - 1) * params.pageSize;
    const paginatedCamps = filteredCamps.slice(startIndex, startIndex + params.pageSize);
    
    return {
      camps: paginatedCamps,
      totalCount: filteredCamps.length
    };
  },

  getCampsByInstitutionPaginated: async (institutionId: string, params: {
    page: number;
    pageSize: number;
  }) => {
    // Mock implementation - filter by institution
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const institutionCamps = mockCamps.filter(camp => camp.created_by === institutionId);
    const startIndex = (params.page - 1) * params.pageSize;
    const paginatedCamps = institutionCamps.slice(startIndex, startIndex + params.pageSize);
    
    return {
      camps: paginatedCamps,
      totalCount: institutionCamps.length
    };
  }
};

export const getUserEnrollments = async (userId: string): Promise<CampEnrollment[]> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 'enrollment-1',
      camp_id: '1',
      user_id: userId,
      status: 'confirmed',
      payment_status: 'paid',
      enrolled_at: '2024-06-01T00:00:00Z',
      updated_at: null,
      camp: mockCamps[0]
    }
  ];
};

export const enrollInCamp = async (campId: string, userId: string): Promise<boolean> => {
  try {
    // Mock enrollment
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Success",
      description: "Successfully enrolled in the camp!",
    });
    
    return true;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to enroll in camp. Please try again.",
      variant: "destructive",
    });
    
    return false;
  }
};

export const cancelEnrollment = async (enrollmentId: string, campId: string): Promise<boolean> => {
  try {
    // Mock cancellation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Success",
      description: "Successfully cancelled enrollment.",
    });
    
    return true;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to cancel enrollment. Please try again.",
      variant: "destructive",
    });
    
    return false;
  }
};
