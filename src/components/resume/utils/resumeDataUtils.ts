
import { ResumeData } from '../types';

// Utility function to merge parsed data with existing resume data
export const mergeResumeData = (existing: ResumeData, parsed: Partial<ResumeData>): ResumeData => {
  const result = { ...existing };
  
  // Merge personal information
  if (parsed.personal) {
    result.personal = {
      ...result.personal,
      ...parsed.personal
    };
  }
  
  // Merge experiences (add new ones)
  if (parsed.experience && parsed.experience.length > 0) {
    result.experience = [
      ...parsed.experience,
      ...result.experience
    ];
  }
  
  // Merge education (add new ones)
  if (parsed.education && parsed.education.length > 0) {
    result.education = [
      ...parsed.education,
      ...result.education
    ];
  }
  
  // Merge skills (avoid duplicates by name)
  if (parsed.skills && parsed.skills.length > 0) {
    const existingSkillNames = new Set(result.skills.map(skill => skill.name.toLowerCase()));
    const newSkills = parsed.skills.filter(skill => !existingSkillNames.has(skill.name.toLowerCase()));
    result.skills = [...result.skills, ...newSkills];
  }
  
  // Merge languages (avoid duplicates by name)
  if (parsed.languages && parsed.languages.length > 0) {
    const existingLanguageNames = new Set(result.languages.map(lang => lang.name.toLowerCase()));
    const newLanguages = parsed.languages.filter(lang => !existingLanguageNames.has(lang.name.toLowerCase()));
    result.languages = [...result.languages, ...newLanguages];
  }
  
  return result;
};
