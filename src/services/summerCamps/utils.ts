
import { toast } from '@/hooks/use-toast';

// Status type guard
export function isValidEnrollmentStatus(status: string): status is "confirmed" | "cancelled" | "waiting_list" {
  return ["confirmed", "cancelled", "waiting_list"].includes(status);
}

// Helper to transform enrollment data
export function transformEnrollment(enrollment: any): any {
  return {
    ...enrollment,
    status: isValidEnrollmentStatus(enrollment.status) ? enrollment.status : "confirmed" // Default to confirmed if invalid
  };
}

// Error handling utility
export function handleServiceError(error: any, errorMessage: string): void {
  console.error(errorMessage, error);
  toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  });
}
