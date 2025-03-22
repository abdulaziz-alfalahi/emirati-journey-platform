
/**
 * Resume parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Parse resume from uploaded file
export const parseResumeFromFile = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target?.result as string;
        
        // Check if we have content to parse
        if (!fileContent) {
          reject(new Error('Could not read file content'));
          return;
        }
        
        console.log('Parsing file content:', fileContent.substring(0, 200) + '...');
        
        // Extract data from file content
        const parsedData = extractDataFromContent(fileContent, file.type);
        resolve(parsedData);
      } catch (error) {
        console.error('Error parsing resume:', error);
        reject(new Error('Failed to parse resume file. Please try a different file.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file. Please try again.'));
    };
    
    reader.readAsText(file);
  });
};

// Extract data from file content based on file type
const extractDataFromContent = (content: string, fileType: string): Partial<ResumeData> => {
  const parsedData: Partial<ResumeData> = {
    personal: { fullName: '', jobTitle: '', email: '', phone: '', location: '' },
    experience: [],
    education: [],
    skills: [],
    languages: []
  };
  
  // Convert content to lowercase for easier pattern matching
  const lowerContent = content.toLowerCase();
  
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

const extractPersonalInfo = (content: string): ResumeData['personal'] => {
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

const extractExperience = (content: string): ResumeData['experience'] => {
  const experiences: ResumeData['experience'] = [];
  
  // Look for sections that might contain work experience
  const experienceSectionRegex = /(?:work experience|professional experience|employment history|work history)(?:[\s\S]*?)(?:education|skills|certification|languages|references|projects|$)/i;
  const experienceSection = content.match(experienceSectionRegex);
  
  if (experienceSection && experienceSection[0]) {
    const expContent = experienceSection[0];
    
    // Try to identify individual roles/positions
    const companyRegex = /(?:^|\n)([A-Za-z0-9\s&.,]+)(?:\s*[-|–]\s*|\s*\|\s*|\s*at\s*|\n)([A-Za-z0-9\s&.,]+)(?:\n|\s+)(?:((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4})\s*(?:[-–]\s*)((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}|Present))?/gmi;
    
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

const extractEducation = (content: string): ResumeData['education'] => {
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

const extractSkills = (content: string): ResumeData['skills'] => {
  const skills: ResumeData['skills'] = [];
  
  // Look for sections that might contain skills
  const skillsSectionRegex = /(?:skills|technical skills|core competencies|expertise)(?:[\s\S]*?)(?:work experience|education|certification|languages|references|projects|$)/i;
  const skillsSection = content.match(skillsSectionRegex);
  
  if (skillsSection && skillsSection[0]) {
    const skillsContent = skillsSection[0];
    
    // Extract skills - look for comma-separated lists, bullet points, etc.
    const skillsRegex = /[•\-*]\s*([A-Za-z0-9#\+\s]+)|\b([A-Za-z0-9#\+]{2,}(?:\s[A-Za-z0-9#\+]+)*)\b(?=,|\n|\.)/g;
    
    let match;
    const foundSkills = new Set<string>();
    
    while ((match = skillsRegex.exec(skillsContent)) !== null) {
      const skill = (match[1] || match[2]).trim();
      
      // Filter out common non-skill words
      const nonSkillWords = ['and', 'or', 'with', 'years', 'including', 'etc', 'such', 'as', 'various', 'other'];
      if (skill.length > 1 && !nonSkillWords.includes(skill.toLowerCase())) {
        foundSkills.add(skill);
      }
    }
    
    foundSkills.forEach(skill => {
      skills.push({
        id: uuidv4(),
        name: skill,
        level: determineSkillLevel(skill, content),
      });
    });
  }
  
  return skills;
};

const extractLanguages = (content: string): ResumeData['languages'] => {
  const languages: ResumeData['languages'] = [];
  
  // Look for sections that might contain languages
  const languagesSectionRegex = /(?:languages|language proficiency|language skills)(?:[\s\S]*?)(?:work experience|education|skills|certification|references|projects|$)/i;
  const languagesSection = content.match(languagesSectionRegex);
  
  if (languagesSection && languagesSection[0]) {
    const langContent = languagesSection[0];
    
    // Common languages
    const commonLanguages = [
      'English', 'Arabic', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 
      'Russian', 'Hindi', 'Urdu', 'Tagalog', 'Bengali', 'Portuguese', 'Italian'
    ];
    
    // Check for each common language
    commonLanguages.forEach(language => {
      if (new RegExp(`\\b${language}\\b`, 'i').test(langContent)) {
        let proficiency: 'basic' | 'conversational' | 'fluent' | 'native' = 'conversational';
        
        // Try to determine proficiency
        if (new RegExp(`\\b${language}\\b[^.]*?native`, 'i').test(langContent)) {
          proficiency = 'native';
        } else if (new RegExp(`\\b${language}\\b[^.]*?fluent`, 'i').test(langContent)) {
          proficiency = 'fluent';
        } else if (new RegExp(`\\b${language}\\b[^.]*?basic`, 'i').test(langContent)) {
          proficiency = 'basic';
        }
        
        languages.push({
          id: uuidv4(),
          name: language,
          proficiency,
        });
      }
    });
    
    // If no languages found, try a different approach
    if (languages.length === 0) {
      const languageRegex = /[•\-*]\s*([A-Za-z]+)|\b([A-Za-z]+)\b(?=:|\s*-|\s*–)/g;
      
      let match;
      while ((match = languageRegex.exec(langContent)) !== null) {
        const language = (match[1] || match[2]).trim();
        
        // Skip common non-language words
        const nonLanguageWords = ['skills', 'proficiency', 'include', 'languages', 'section'];
        if (!nonLanguageWords.includes(language.toLowerCase()) && language.length > 2) {
          languages.push({
            id: uuidv4(),
            name: language,
            proficiency: 'conversational', // Default
          });
        }
      }
    }
  }
  
  return languages;
};

// Helper function to convert date strings to YYYY-MM format
const convertDateToYYYYMM = (dateStr: string): string => {
  try {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      // Try to parse manually
      const months: Record<string, number> = {
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
      };
      
      const parts = dateStr.toLowerCase().match(/([a-z]+)[^\d]*(\d{4})/);
      if (parts && parts[1] && parts[2]) {
        const month = months[parts[1].substring(0, 3)];
        const year = parseInt(parts[2]);
        if (month !== undefined && !isNaN(year)) {
          return `${year}-${(month + 1).toString().padStart(2, '0')}`;
        }
      }
      
      // If we can't parse, return the year if present
      const yearMatch = dateStr.match(/\d{4}/);
      if (yearMatch) {
        return `${yearMatch[0]}-01`;
      }
      
      return '';
    }
    
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  } catch (error) {
    console.error('Error converting date:', error);
    return '';
  }
};

// Helper function to determine skill level
const determineSkillLevel = (skill: string, content: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  const skillContext = content.match(new RegExp(`.{0,100}${skill}.{0,100}`, 'i'));
  
  if (!skillContext) return 'intermediate';
  
  const contextText = skillContext[0].toLowerCase();
  
  if (contextText.includes('expert') || contextText.includes('mastery') || contextText.includes('advanced')) {
    return 'expert';
  } else if (contextText.includes('proficient') || contextText.includes('strong')) {
    return 'advanced';
  } else if (contextText.includes('beginner') || contextText.includes('basic')) {
    return 'beginner';
  } else {
    return 'intermediate';
  }
};

// Simulated LinkedIn data extraction
// In a production environment, this would use LinkedIn's API
export const extractFromLinkedIn = async (linkedInUrl: string): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    try {
      // Simulate API call with delay
      setTimeout(() => {
        // Extract LinkedIn username from URL for personalization
        let username = 'user';
        try {
          const urlParts = linkedInUrl.split('/');
          const inIndex = urlParts.indexOf('in');
          if (inIndex >= 0 && inIndex + 1 < urlParts.length) {
            username = urlParts[inIndex + 1].split('?')[0];
          }
        } catch (error) {
          console.error('Error extracting LinkedIn username:', error);
        }
        
        // Mock LinkedIn data with personalized username
        const linkedInData: Partial<ResumeData> = {
          personal: {
            fullName: `${username.charAt(0).toUpperCase() + username.slice(1).replace(/[^a-zA-Z]/g, ' ')}`,
            jobTitle: 'Professional from LinkedIn',
            email: `${username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '.')}@example.com`,
            phone: '+971 5x xxx xxxx',
            location: 'Dubai, UAE',
            linkedin: linkedInUrl,
          },
          experience: [
            {
              id: uuidv4(),
              company: 'Recent Company',
              position: 'Current Position',
              location: 'Dubai, UAE',
              startDate: '2022-01',
              current: true,
              description: 'Details extracted from LinkedIn profile for current position.'
            },
            {
              id: uuidv4(),
              company: 'Previous Company',
              position: 'Previous Role',
              location: 'Abu Dhabi, UAE',
              startDate: '2019-06',
              endDate: '2021-12',
              current: false,
              description: 'Details extracted from LinkedIn profile for previous position.'
            }
          ],
          education: [
            {
              id: uuidv4(),
              institution: 'University Name',
              degree: 'Degree Type',
              field: 'Field of Study',
              location: 'Education Location',
              startDate: '2015-09',
              endDate: '2019-05',
              current: false,
            }
          ],
          skills: [
            { id: uuidv4(), name: 'Skill From LinkedIn 1', level: 'advanced' },
            { id: uuidv4(), name: 'Skill From LinkedIn 2', level: 'expert' },
            { id: uuidv4(), name: 'Skill From LinkedIn 3', level: 'intermediate' },
          ],
          languages: [
            { id: uuidv4(), name: 'English', proficiency: 'fluent' },
            { id: uuidv4(), name: 'Arabic', proficiency: 'conversational' },
          ]
        };
        
        console.log('LinkedIn data extracted for profile:', username);
        resolve(linkedInData);
      }, 2000);
    } catch (error) {
      reject(new Error('Failed to extract data from LinkedIn. Please check the URL and try again.'));
    }
  });
};

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

