
import { ResumeData, PersonalInfo } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Extract personal information from resume content
export const extractPersonalInfo = (content: string): PersonalInfo => {
  const personal = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '' // Add default empty LinkedIn property
  };
  
  // Extract email using regex
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const emailMatch = content.match(emailRegex);
  if (emailMatch) {
    personal.email = emailMatch[0];
  }
  
  // Extract phone number (improved regex)
  const phoneRegex = /\b(?:\+?\d{1,4}[-. ]?)?(?:\(?\d{3}\)?[-. ]?|\d{3}[-. ]?)\d{3}[-. ]?\d{4}\b/;
  const phoneMatch = content.match(phoneRegex);
  if (phoneMatch) {
    personal.phone = phoneMatch[0];
  }
  
  // Try to extract name (assuming it's at the beginning of the resume)
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 0) {
    // Check if first line is too long to be a name
    const firstLine = lines[0].trim();
    if (firstLine.length < 50 && !emailRegex.test(firstLine) && !phoneRegex.test(firstLine)) {
      personal.fullName = firstLine;
      
      // If second line looks like a job title, extract it
      if (lines.length > 1) {
        const secondLine = lines[1].trim();
        if (secondLine.length < 100 && !emailRegex.test(secondLine) && !phoneRegex.test(secondLine)) {
          personal.jobTitle = secondLine;
        }
      }
    }
  }
  
  // Try to extract job title if not found yet
  if (!personal.jobTitle) {
    // Look for common job title patterns
    const jobTitleRegex = /\b(Senior|Junior|Lead|Principal|Chief|Head of|Director|Manager|Developer|Engineer|Designer|Architect|Analyst|Consultant|Specialist|Officer|Coordinator|Administrator)\b[\s\w]+(?=\n|$)/i;
    const jobMatch = content.match(jobTitleRegex);
    if (jobMatch) {
      personal.jobTitle = jobMatch[0].trim();
    }
  }
  
  // Try to extract location
  const locationPatterns = [
    /(?:located in|location|address|residing at|based in)\s+([^,\n]+(?:,\s*[^,\n]+)?)/i,
    /([A-Za-z\s]+,\s*[A-Za-z\s]+(?:,\s*[A-Za-z\s]+)?)/i,
    /\b([A-Za-z\s]+,\s*(?:UAE|United Arab Emirates|USA|United States|UK|Canada|Australia))\b/i,
    /\b(Dubai|Abu Dhabi|Sharjah|Ajman|Umm Al Quwain|Fujairah|Ras Al Khaimah)(?:,\s*(?:UAE|United Arab Emirates))?\b/i,
  ];
  
  for (const pattern of locationPatterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      personal.location = match[1].trim();
      break;
    }
  }
  
  // Try to extract LinkedIn profile
  const linkedinRegex = /(?:linkedin\.com\/in\/|linkedin profile:?\s*)([\w-]+)/i;
  const linkedinMatch = content.match(linkedinRegex);
  if (linkedinMatch && linkedinMatch[1]) {
    personal.linkedin = `https://linkedin.com/in/${linkedinMatch[1]}`;
  }
  
  return personal;
};
