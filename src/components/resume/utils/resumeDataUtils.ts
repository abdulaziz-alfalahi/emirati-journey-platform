
import { ResumeData } from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Deep merges two resume data objects with intelligent conflict resolution
 * @param currentData Existing resume data
 * @param newData New data to merge
 * @returns Merged resume data
 */
export const mergeResumeData = (currentData: ResumeData, newData: Partial<ResumeData>): ResumeData => {
  // Start with a clone of current data
  const result: ResumeData = JSON.parse(JSON.stringify(currentData));
  
  // Personal info: merge with preference for non-empty new values
  if (newData.personal) {
    result.personal = {
      ...result.personal,
      ...Object.fromEntries(
        Object.entries(newData.personal).filter(([_, value]) => 
          value !== undefined && value !== null && value !== ""
        )
      )
    };
  }
  
  // Summary: use new if provided and non-empty
  if (newData.summary && newData.summary.trim()) {
    result.summary = newData.summary;
  }
  
  // Arrays: For experience, education, skills, and languages
  // Strategy: Replace arrays completely if new ones are provided and non-empty
  // Add IDs where missing
  
  // Experience
  if (newData.experience && newData.experience.length > 0) {
    result.experience = newData.experience.map(exp => ({
      ...exp,
      id: exp.id || uuidv4()
    }));
  }
  
  // Education
  if (newData.education && newData.education.length > 0) {
    result.education = newData.education.map(edu => ({
      ...edu,
      id: edu.id || uuidv4()
    }));
  }
  
  // Skills
  if (newData.skills && newData.skills.length > 0) {
    result.skills = newData.skills.map(skill => ({
      ...skill,
      id: skill.id || uuidv4()
    }));
  }
  
  // Languages
  if (newData.languages && newData.languages.length > 0) {
    result.languages = newData.languages.map(lang => ({
      ...lang,
      id: lang.id || uuidv4()
    }));
  }
  
  // Certifications
  if (newData.certifications && newData.certifications.length > 0) {
    result.certifications = newData.certifications.map(cert => ({
      ...cert,
      id: cert.id || uuidv4()
    }));
  }
  
  // Projects
  if (newData.projects && newData.projects.length > 0) {
    result.projects = newData.projects.map(project => ({
      ...project,
      id: project.id || uuidv4()
    }));
  }
  
  // Achievements
  if (newData.achievements && newData.achievements.length > 0) {
    result.achievements = newData.achievements.map(achievement => ({
      ...achievement,
      id: achievement.id || uuidv4()
    }));
  }
  
  // Merge metadata
  result.metadata = {
    ...(result.metadata || {}),
    ...(newData.metadata || {}),
    lastUpdated: new Date().toISOString(),
    mergeSource: newData.metadata?.parsingMethod || 'manual'
  };
  
  return result;
};

/**
 * Creates a new empty resume data structure
 * @returns Empty ResumeData object with initialized arrays
 */
export const createEmptyResumeData = (): ResumeData => {
  return {
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    achievements: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
};

/**
 * Validates resume data and adds missing required fields
 * @param data Partial ResumeData to validate
 * @returns Complete ResumeData with all required fields
 */
export const validateAndCompleteMissingFields = (data: Partial<ResumeData>): ResumeData => {
  const validData = { ...data } as ResumeData;
  
  // Ensure personal info exists and has all required fields
  validData.personal = {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    ...(validData.personal || {})
  };
  
  // Ensure arrays exist
  validData.experience = validData.experience || [];
  validData.education = validData.education || [];
  validData.skills = validData.skills || [];
  validData.languages = validData.languages || [];
  
  // Ensure all array items have IDs
  validData.experience = validData.experience.map(exp => ({
    ...exp,
    id: exp.id || uuidv4()
  }));
  
  validData.education = validData.education.map(edu => ({
    ...edu,
    id: edu.id || uuidv4()
  }));
  
  validData.skills = validData.skills.map(skill => ({
    ...skill,
    id: skill.id || uuidv4()
  }));
  
  validData.languages = validData.languages.map(lang => ({
    ...lang,
    id: lang.id || uuidv4()
  }));
  
  // Ensure other arrays exist if provided
  if (validData.certifications) {
    validData.certifications = validData.certifications.map(cert => ({
      ...cert,
      id: cert.id || uuidv4()
    }));
  }
  
  if (validData.projects) {
    validData.projects = validData.projects.map(project => ({
      ...project,
      id: project.id || uuidv4()
    }));
  }
  
  if (validData.achievements) {
    validData.achievements = validData.achievements.map(achievement => ({
      ...achievement,
      id: achievement.id || uuidv4()
    }));
  }
  
  // Ensure metadata exists
  validData.metadata = {
    lastUpdated: new Date().toISOString(),
    ...(validData.metadata || {})
  };
  
  return validData;
};
