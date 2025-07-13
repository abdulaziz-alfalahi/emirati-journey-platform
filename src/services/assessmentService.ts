
import { supabase } from '@/integrations/supabase/client';
import { Assessment } from '@/types/assessments';
import { assessmentCore } from './assessments/assessmentCore';
import { mockSessionData } from './assessments/mockSessionData';
import { mockCoachingData } from './assessments/mockCoachingData';
import { coachingService } from './assessments/coachingService';

export class AssessmentService {
  async getAssessments(): Promise<Assessment[]> {
    return assessmentCore.getAssessments();
  }

  async getAssessmentById(id: string): Promise<Assessment | null> {
    return assessmentCore.getAssessmentById(id);
  }

  async createAssessmentSession(assessmentId: string, userId: string) {
    return assessmentCore.createAssessmentSession(assessmentId, userId);
  }

  async getSessionData(userId: string) {
    return mockSessionData.filter(data => data.user_id === userId);
  }

  async getCoachingData(userId: string) {
    return coachingService.getCoachingData(userId);
  }
}

export const assessmentService = new AssessmentService();
