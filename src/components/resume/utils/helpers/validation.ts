
/**
 * Validation helper functions for resume data
 */
import { ResumeData } from '../../types';

// Helper to check if the extracted data is empty/meaningless
export const isEmptyResumeData = (data: Partial<ResumeData>): boolean => {
  // Check if personal info is empty
  const isPersonalEmpty = !data.personal || 
    (!data.personal.fullName && !data.personal.email && !data.personal.phone);
  
  // Check if experience, education, skills are all empty
  const hasNoExperience = !data.experience || data.experience.length === 0;
  const hasNoEducation = !data.education || data.education.length === 0;
  const hasNoSkills = !data.skills || data.skills.length === 0;
  
  // Consider the data empty if personal is empty AND at least two other sections are empty
  return isPersonalEmpty && (
    (hasNoExperience && hasNoEducation) || 
    (hasNoExperience && hasNoSkills) || 
    (hasNoEducation && hasNoSkills)
  );
};
