
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SummerCamp, CampFilters } from '@/types/summerCamps';
import { toast } from '@/hooks/use-toast';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { usePagination } from '@/hooks/use-pagination';
import { 
  campQueryService,
  getUserEnrollments, 
  enrollInCamp, 
  cancelEnrollment 
} from '@/services/summerCamps';

export interface UseCampsReturn {
  camps: SummerCamp[];
  loading: boolean;
  totalCount: number;
  enrolledCamps: Record<string, string>;
  pagination: ReturnType<typeof usePagination>;
  handleEnroll: (campId: string) => Promise<void>;
  handleCancelEnrollment: (campId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useCamps = (
  type: "available" | "registered" | "managed",
  filters: CampFilters,
  searchQuery: string = ""
): UseCampsReturn => {
  const { user } = useAuth();
  const [camps, setCamps] = useState<SummerCamp[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [enrolledCamps, setEnrolledCamps] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  
  // Use pagination hook
  const pagination = usePagination({ pageSize: 12 });
  
  // Debounce search query and filters
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
  const debouncedFilters = useDebouncedValue(filters, 300);

  const fetchCamps = async () => {
    setLoading(true);
    try {
      if (type === "available") {
        const result = await campQueryService.getCampsPaginated({
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
          filters: {
            ...debouncedFilters,
            searchQuery: debouncedSearchQuery
          }
        });
        setCamps(result.camps);
        setTotalCount(result.totalCount);
      } else if (type === "registered" && user) {
        const enrollments = await getUserEnrollments(user.id);
        setEnrolledCamps(
          enrollments.reduce((acc, enrollment) => {
            if (enrollment.camp) {
              acc[enrollment.camp.id] = enrollment.id;
            }
            return acc;
          }, {} as Record<string, string>)
        );
        
        // Filter enrolled camps based on search and filters
        let filteredCamps = enrollments.map(e => e.camp).filter(Boolean) as SummerCamp[];
        
        if (debouncedSearchQuery) {
          const searchLower = debouncedSearchQuery.toLowerCase();
          filteredCamps = filteredCamps.filter(camp => 
            camp.title.toLowerCase().includes(searchLower) ||
            camp.description.toLowerCase().includes(searchLower) ||
            camp.organizer.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply filters
        if (debouncedFilters.category && debouncedFilters.category.length > 0) {
          filteredCamps = filteredCamps.filter(camp => 
            debouncedFilters.category?.includes(camp.category)
          );
        }
        
        if (debouncedFilters.ageGroup && debouncedFilters.ageGroup.length > 0) {
          filteredCamps = filteredCamps.filter(camp => 
            debouncedFilters.ageGroup?.includes(camp.age_group)
          );
        }
        
        if (debouncedFilters.location && debouncedFilters.location.length > 0) {
          filteredCamps = filteredCamps.filter(camp => 
            debouncedFilters.location?.some(loc => 
              camp.location.toLowerCase().includes(loc.toLowerCase())
            )
          );
        }
        
        setCamps(filteredCamps);
        setTotalCount(filteredCamps.length);
      } else if (type === "managed" && user) {
        const result = await campQueryService.getCampsByInstitutionPaginated(user.id, {
          page: pagination.currentPage,
          pageSize: pagination.pageSize
        });
        setCamps(result.camps);
        setTotalCount(result.totalCount);
      }
    } catch (error) {
      console.error("Error fetching camps:", error);
      toast({
        title: "Error",
        description: "Failed to load summer camps. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    pagination.setCurrentPage(1);
  }, [debouncedSearchQuery, debouncedFilters]);

  // Fetch camps when dependencies change
  useEffect(() => {
    if (!user && (type === "registered" || type === "managed")) return;
    fetchCamps();
  }, [type, user, pagination.currentPage, debouncedSearchQuery, debouncedFilters]);

  const handleEnroll = async (campId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to enroll in a camp.",
        variant: "destructive",
      });
      return;
    }

    const result = await enrollInCamp(campId, user.id);
    if (result) {
      // Refresh camps to show updated enrollment counts
      await fetchCamps();
    }
  };

  const handleCancelEnrollment = async (campId: string) => {
    if (!user || !enrolledCamps[campId]) return;
    
    const result = await cancelEnrollment(enrolledCamps[campId], campId);
    if (result) {
      // Refresh camps
      await fetchCamps();
    }
  };

  return {
    camps,
    loading,
    totalCount,
    enrolledCamps,
    pagination,
    handleEnroll,
    handleCancelEnrollment,
    refetch: fetchCamps
  };
};
