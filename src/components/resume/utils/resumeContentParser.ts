
import { ResumeData } from '../types';
import { extractPersonalInfo } from './parsers/personalParser';
import { extractExperience } from './parsers/experienceParser';
import { extractEducation } from './parsers/educationParser';
import { extractSkills } from './parsers/skillsParser';
import { extractLanguages } from './parsers/languagesParser';

// Extract data from file content based on file type
export const extractDataFromContent = (content: string, fileType: string): Partial<ResumeData> => {
  const parsedData: Partial<ResumeData> = {
    personal: { fullName: '', jobTitle: '', email: '', phone: '', location: '' },
    experience: [],
    education: [],
    skills: [],
    languages: []
  };
  
  // Extract personal information
  parsedData.personal = extractPersonalInfo(content);
  
  // Extract experience
  parsedData.experience = extractExperience(content);
  
  // Extract education
  parsedData.education = extractEducation(content);
  
  // Extract skills
  parsedData.skills = extractSkills(content);
  
  // Extract languages
  parsedData.languages = extractLanguages(content);
  
  return parsedData;
};
