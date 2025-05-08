
// This file is maintained for backward compatibility
// It re-exports all assessment-related services from their new locations
export * from './assessments';

// Also export the mock data for easy access
export { mockAssessments } from './assessments/mockAssessments';
export { mockAssessmentSessions } from './assessments/mockSessionData';
export { mockCoachingRecommendations } from './assessments/mockCoachingData';
