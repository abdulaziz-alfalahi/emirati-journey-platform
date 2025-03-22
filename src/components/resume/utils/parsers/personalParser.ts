
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Extract personal information from resume content
export const extractPersonalInfo = (content: string): ResumeData['personal'] => {
  const personal = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
  };
  
  // Extract email using regex
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const emailMatch = content.match(emailRegex);
  if (emailMatch) {
    personal.email = emailMatch[0];
  }
  
  // Extract phone number
  const phoneRegex = /\b(?:\+\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/;
  const phoneMatch = content.match(phoneRegex);
  if (phoneMatch) {
    personal.phone = phoneMatch[0];
  }
  
  // Try to extract name (assuming it's at the beginning of the resume)
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 0) {
    // Assume the first non-empty line is the name
    personal.fullName = lines[0].trim();
    
    // If second line looks like a job title, extract it
    if (lines.length > 1 && !emailRegex.test(lines[1]) && !phoneRegex.test(lines[1])) {
      personal.jobTitle = lines[1].trim();
    }
  }
  
  // Try to extract location
  const locationPatterns = [
    /(?:located in|location|address|residing at)\s+([^,\n]+(?:,\s*[^,\n]+)?)/i,
    /([A-Za-z\s]+,\s*[A-Za-z\s]+,\s*(?:UAE|United Arab Emirates))/i,
    /([A-Za-z\s]+,\s*(?:UAE|United Arab Emirates))/i,
  ];
  
  for (const pattern of locationPatterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      personal.location = match[1].trim();
      break;
    }
  }
  
  return personal;
};
