
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { convertDateToYYYYMM } from '../dateUtils';

// Extract work experience from resume content
export const extractExperience = (content: string): ResumeData['experience'] => {
  const experiences: ResumeData['experience'] = [];
  
  // Look for sections that might contain work experience
  const experienceSectionRegex = /(?:work experience|professional experience|employment history|work history)(?:[\s\S]*?)(?:education|skills|certification|languages|references|projects|$)/i;
  const experienceSection = content.match(experienceSectionRegex);
  
  if (experienceSection && experienceSection[0]) {
    const expContent = experienceSection[0];
    
    // Try to identify individual roles/positions
    const companyRegex = /(?:^|\n)([A-Za-z0-9\s&.,]+)(?:\s*[-|–]\s*|\s*\|\s*|\n)([A-Za-z0-9\s&.,]+)(?:\n|\s+)(?:((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4})\s*(?:[-–]\s*)((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}|Present))?/gmi;
    
    let match;
    while ((match = companyRegex.exec(expContent)) !== null) {
      const position = match[1].trim();
      const company = match[2].trim();
      const startDate = match[3] ? convertDateToYYYYMM(match[3]) : '';
      const endDateRaw = match[4] ? match[4].trim() : '';
      const current = endDateRaw.toLowerCase() === 'present';
      const endDate = current ? undefined : convertDateToYYYYMM(endDateRaw);
      
      // Get the description - text between this match and the next match or section end
      const startIdx = match.index + match[0].length;
      const nextMatchIdx = companyRegex.lastIndex;
      const endIdx = nextMatchIdx > 0 ? nextMatchIdx : expContent.length;
      const description = expContent.substring(startIdx, endIdx).trim();
      
      experiences.push({
        id: uuidv4(),
        company,
        position,
        startDate,
        endDate,
        current,
        description,
      });
    }
  }
  
  return experiences;
};
