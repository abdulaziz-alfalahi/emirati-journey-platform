
export interface MockSessionData {
  id: string;
  user_id: string;
  assessment_id: string;
  score: number;
  results: Record<string, any>;
  status: string;
  completed_date?: string;
  coaching_recommended?: boolean;
  coaching_notes?: string;
  scheduled_date?: string;
  assessments?: any; // For backward compatibility
}

export const mockSessionData: MockSessionData[] = [
  {
    id: '1',
    user_id: 'user1',
    assessment_id: 'assessment1',
    score: 85,
    results: {
      technical_skills: 80,
      communication: 90,
      problem_solving: 85
    },
    status: 'completed',
    completed_date: '2024-01-15T10:00:00Z',
    coaching_recommended: false,
    coaching_notes: null,
    scheduled_date: '2024-01-15T09:00:00Z',
    assessments: {
      title: 'Technical Skills Assessment',
      assessment_type: 'skills'
    }
  }
];

// Export aliases for backward compatibility
export const mockAssessmentSessions = mockSessionData;

export const getMockUserAssessmentSessions = (userId: string) => {
  return mockSessionData.filter(session => session.user_id === userId);
};
