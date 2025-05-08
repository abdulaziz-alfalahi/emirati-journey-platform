
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SummerCamp, CampFilters } from '@/types/summerCamps';
import { 
  getCamps,
  getUserEnrollments, 
  enrollInCamp, 
  cancelEnrollment, 
  getCampsByInstitution 
} from '@/services/summerCamps';

export interface UseCampsReturn {
  camps: SummerCamp[];
  loading: boolean;
  enrolledCamps: Record<string, string>;
  handleEnroll: (campId: string) => Promise<void>;
  handleCancelEnrollment: (campId: string) => Promise<void>;
}

export const useCamps = (
  type: "available" | "registered" | "managed",
  filters: CampFilters
): UseCampsReturn => {
  const { user } = useAuth();
  const [camps, setCamps] = useState<SummerCamp[]>([]);
  const [enrolledCamps, setEnrolledCamps] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamps = async () => {
      setLoading(true);
      try {
        if (type === "available") {
          const fetchedCamps = await getCamps(filters);
          setCamps(fetchedCamps);
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
          
          setCamps(enrollments.map(e => e.camp).filter(Boolean) as SummerCamp[]);
        } else if (type === "managed" && user) {
          const managedCamps = await getCampsByInstitution(user.id);
          setCamps(managedCamps);
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

    fetchCamps();
  }, [type, user, JSON.stringify(filters)]);

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
      // Refresh the available camps list to show updated enrollment counts
      if (type === "available") {
        const updatedCamps = await getCamps(filters);
        setCamps(updatedCamps);
      }
    }
  };

  const handleCancelEnrollment = async (campId: string) => {
    if (!user || !enrolledCamps[campId]) return;
    
    const result = await cancelEnrollment(enrolledCamps[campId], campId);
    if (result) {
      // Refresh the registered camps list
      const enrollments = await getUserEnrollments(user.id);
      setCamps(enrollments.map(e => e.camp).filter(Boolean) as SummerCamp[]);
      setEnrolledCamps(
        enrollments.reduce((acc, enrollment) => {
          if (enrollment.camp) {
            acc[enrollment.camp.id] = enrollment.id;
          }
          return acc;
        }, {} as Record<string, string>)
      );
    }
  };

  return {
    camps,
    loading,
    enrolledCamps,
    handleEnroll,
    handleCancelEnrollment
  };
};
