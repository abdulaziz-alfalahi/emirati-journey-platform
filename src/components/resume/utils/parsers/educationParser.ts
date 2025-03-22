
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { convertDateToYYYYMM } from '../dateUtils';

// Extract education from resume content
export const extractEducation = (content: string): ResumeData['education'] => {
  const educations: ResumeData['education'] = [];
  
  // Look for sections that might contain education
  const educationSectionRegex = /(?:education|academic background|academic history|qualifications)(?:[\s\S]*?)(?:work experience|skills|certification|languages|references|projects|$)/i;
  const educationSection = content.match(educationSectionRegex);
  
  if (educationSection && educationSection[0]) {
    const eduContent = educationSection[0];
    
    // Try to identify individual education entries
    const educationRegex = /(?:^|\n)([A-Za-z\s&.,]+)(?:\s*[-|–]\s*|\s*\|\s*|\n)([A-Za-z0-9\s&.,]+)(?:\n|\s+)(?:((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4})\s*(?:[-–]\s*)((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}|Present))?/gmi;
    
    let match;
    while ((match = educationRegex.exec(eduContent)) !== null) {
      const institution = match[1].trim();
      const degreeField = match[2].trim();
      const startDate = match[3] ? convertDateToYYYYMM(match[3]) : '';
      const endDateRaw = match[4] ? match[4].trim() : '';
      const current = endDateRaw.toLowerCase() === 'present';
      const endDate = current ? undefined : convertDateToYYYYMM(endDateRaw);
      
      // Try to split degree and field
      let degree = degreeField;
      let field = '';
      
      if (degreeField.includes(',')) {
        const parts = degreeField.split(',');
        degree = parts[0].trim();
        field = parts.slice(1).join(',').trim();
      } else if (degreeField.includes('in')) {
        const parts = degreeField.split(/\s+in\s+/i);
        degree = parts[0].trim();
        field = parts.slice(1).join(' ').trim();
      }
      
      educations.push({
        id: uuidv4(),
        institution,
        degree,
        field,
        startDate,
        endDate,
        current,
      });
    }
  }
  
  return educations;
};
