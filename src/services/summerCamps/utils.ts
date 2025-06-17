
import { toast } from '@/hooks/use-toast';
import { CampEnrollment } from '@/types/summerCamps';

export const handleServiceError = (error: any, defaultMessage: string) => {
  console.error('Service error:', error);
  toast({
    title: "Error",
    description: defaultMessage,
    variant: "destructive",
  });
};

export const transformEnrollment = (data: any): CampEnrollment => ({
  id: data.id,
  camp_id: data.camp_id,
  user_id: data.user_id,
  status: data.status,
  payment_status: data.payment_status,
  enrolled_at: data.enrolled_at,
  updated_at: data.updated_at,
  camp: data.camp
});
