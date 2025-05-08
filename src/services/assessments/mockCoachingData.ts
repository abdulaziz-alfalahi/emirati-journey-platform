
import { CoachingRecommendation } from "@/types/assessments";

export const mockCoachingRecommendations: CoachingRecommendation[] = [
  {
    id: "COACH001",
    session_id: "SESSION002",
    user_id: "user123", // This will be replaced with actual user ID
    reason: "Additional support needed in data interpretation and statistical analysis",
    created_at: "2025-06-05T15:00:00Z",
    status: "pending",
    coach_id: "coach456",
    scheduled_date: null,
    updated_at: null,
    assessment_sessions: {
      id: "SESSION002",
      user_id: "user123",
      status: "completed",
      score: 72,
      feedback: "Good numerical reasoning skills, but could improve on data interpretation.",
      results: {
        data_interpretation: 65,
        mathematical_reasoning: 80,
        statistical_analysis: 70
      },
      assessments: {
        title: "Numerical Reasoning Assessment",
        assessment_type: "capabilities"
      }
    }
  },
  {
    id: "COACH002",
    session_id: "SESSION001",
    user_id: "user123",
    reason: "Optional advanced JavaScript mentoring recommended to improve code optimization",
    created_at: "2025-06-02T09:30:00Z",
    status: "accepted",
    coach_id: "coach789",
    scheduled_date: "2025-06-15T14:00:00Z",
    updated_at: "2025-06-03T11:20:00Z",
    assessment_sessions: {
      id: "SESSION001",
      user_id: "user123",
      status: "completed",
      score: 85,
      feedback: null,
      results: null,
      assessments: {
        title: "JavaScript Coding Challenge",
        assessment_type: "skills"
      }
    }
  }
];

// Helper function to get coaching recommendations for a specific user
export const getMockUserCoachingRecommendations = (userId: string): CoachingRecommendation[] => {
  return mockCoachingRecommendations.map(recommendation => ({
    ...recommendation,
    user_id: userId,
    assessment_sessions: recommendation.assessment_sessions 
      ? { ...recommendation.assessment_sessions, user_id: userId }
      : undefined
  }));
};
