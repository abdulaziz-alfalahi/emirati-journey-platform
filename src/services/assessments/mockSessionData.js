
import { AssessmentSession } from "@/types/assessments";
import { mockAssessments } from "./mockAssessments";

export const mockAssessmentSessions: AssessmentSession[] = [
  {
    id: "SESSION001",
    assessment_id: "ASSMT001",
    user_id: "user123", // This will be replaced with the actual user ID
    status: "completed",
    score: 85,
    feedback: "Strong problem-solving skills demonstrated. Good knowledge of JavaScript frameworks.",
    results: {
      algorithm_score: 90,
      code_quality: 80,
      problem_solving: 85,
      time_efficiency: 75
    },
    scheduled_date: "2025-06-01T10:00:00Z",
    completed_date: "2025-06-01T11:05:00Z",
    created_at: "2025-05-25T14:30:00Z",
    updated_at: "2025-06-01T11:10:00Z",
    coaching_recommended: false,
    coaching_notes: null,
    assessments: {
      title: "JavaScript Coding Challenge",
      assessment_type: "skills"
    }
  },
  {
    id: "SESSION002",
    assessment_id: "ASSMT002",
    user_id: "user123",
    status: "completed",
    score: 72,
    feedback: "Good numerical reasoning skills, but could improve on data interpretation.",
    results: {
      data_interpretation: 65,
      mathematical_reasoning: 80,
      statistical_analysis: 70
    },
    scheduled_date: "2025-06-05T14:00:00Z",
    completed_date: "2025-06-05T14:25:00Z",
    created_at: "2025-05-28T09:45:00Z",
    updated_at: "2025-06-05T14:30:00Z",
    coaching_recommended: true,
    coaching_notes: "Consider coaching on data visualization interpretation techniques",
    assessments: {
      title: "Numerical Reasoning Assessment",
      assessment_type: "capabilities"
    }
  },
  {
    id: "SESSION003",
    assessment_id: "ASSMT003",
    user_id: "user123",
    status: "scheduled",
    score: null,
    feedback: null,
    results: null,
    scheduled_date: "2025-07-10T11:00:00Z",
    completed_date: null,
    created_at: "2025-06-15T16:20:00Z",
    updated_at: null,
    coaching_recommended: false,
    coaching_notes: null,
    assessments: {
      title: "Leadership Potential Evaluation",
      assessment_type: "behaviors"
    }
  },
  {
    id: "SESSION004",
    assessment_id: "ASSMT006",
    user_id: "user123",
    status: "completed",
    score: 95,
    feedback: "Excellent work style compatibility with the role. Strong communication skills.",
    results: {
      openness: 90,
      conscientiousness: 95,
      extraversion: 85,
      agreeableness: 92,
      neuroticism: 30
    },
    scheduled_date: "2025-06-12T09:30:00Z",
    completed_date: "2025-06-12T10:00:00Z",
    created_at: "2025-06-05T11:15:00Z",
    updated_at: "2025-06-12T10:05:00Z",
    coaching_recommended: false,
    coaching_notes: null,
    assessments: {
      title: "Personality Profile Assessment",
      assessment_type: "behaviors"
    }
  },
  {
    id: "SESSION005",
    assessment_id: "ASSMT009",
    user_id: "user123",
    status: "in_progress",
    score: null,
    feedback: null,
    results: null,
    scheduled_date: "2025-06-25T13:00:00Z",
    completed_date: null,
    created_at: "2025-06-20T14:00:00Z",
    updated_at: "2025-06-25T13:05:00Z",
    coaching_recommended: false,
    coaching_notes: null,
    assessments: {
      title: "Data Science Challenge",
      assessment_type: "skills"
    }
  }
];

// Helper function to get assessment sessions for a specific user
export const getMockUserAssessmentSessions = (userId: string): AssessmentSession[] => {
  return mockAssessmentSessions.map(session => ({
    ...session,
    user_id: userId
  }));
};
