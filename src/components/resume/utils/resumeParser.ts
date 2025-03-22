
/**
 * Resume parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Simulated resume parsing from file
// In a production environment, this would use a proper parsing library or API
export const parseResumeFromFile = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        // Simulate successful parsing with a delay to mimic API call
        setTimeout(() => {
          // This is a simple mock parser - in a real application, 
          // you would use a proper resume parsing API or library
          const parsedData: Partial<ResumeData> = {
            personal: {
              fullName: 'John Doe',
              jobTitle: 'Software Engineer',
              email: 'john.doe@example.com',
              phone: '+971 50 123 4567',
              location: 'Dubai, UAE',
            },
            experience: [
              {
                id: uuidv4(),
                company: 'Tech Solutions LLC',
                position: 'Senior Developer',
                location: 'Dubai, UAE',
                startDate: '2020-01',
                endDate: '2023-06',
                current: false,
                description: 'Led development team on critical projects for enterprise clients.'
              }
            ],
            education: [
              {
                id: uuidv4(),
                institution: 'Dubai University',
                degree: 'Bachelor of Science',
                field: 'Computer Science',
                location: 'Dubai, UAE',
                startDate: '2016-09',
                endDate: '2020-05',
                current: false,
              }
            ],
            skills: [
              { id: uuidv4(), name: 'JavaScript', level: 'expert' },
              { id: uuidv4(), name: 'React', level: 'advanced' },
              { id: uuidv4(), name: 'TypeScript', level: 'intermediate' },
            ],
            languages: [
              { id: uuidv4(), name: 'English', proficiency: 'fluent' },
              { id: uuidv4(), name: 'Arabic', proficiency: 'basic' },
            ]
          };
          
          resolve(parsedData);
        }, 1500);
      } catch (error) {
        reject(new Error('Failed to parse resume file. Please try a different file.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file. Please try again.'));
    };
    
    reader.readAsText(file);
  });
};

// Simulated LinkedIn data extraction
// In a production environment, this would use LinkedIn's API
export const extractFromLinkedIn = async (linkedInUrl: string): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    try {
      // Simulate API call with delay
      setTimeout(() => {
        // Mock LinkedIn data - in a real app, this would use LinkedIn's API
        const linkedInData: Partial<ResumeData> = {
          personal: {
            fullName: 'Sarah Ahmed',
            jobTitle: 'Product Manager',
            email: 'sarah.ahmed@example.com',
            phone: '+971 55 987 6543',
            location: 'Abu Dhabi, UAE',
            linkedin: linkedInUrl,
          },
          experience: [
            {
              id: uuidv4(),
              company: 'Global Products Inc.',
              position: 'Senior Product Manager',
              location: 'Abu Dhabi, UAE',
              startDate: '2021-03',
              current: true,
              description: 'Leading product development for enterprise SaaS solutions.'
            },
            {
              id: uuidv4(),
              company: 'Tech Innovations',
              position: 'Product Manager',
              location: 'Dubai, UAE',
              startDate: '2018-06',
              endDate: '2021-02',
              current: false,
              description: 'Managed agile product development lifecycle for mobile applications.'
            }
          ],
          education: [
            {
              id: uuidv4(),
              institution: 'Abu Dhabi University',
              degree: 'Master of Business Administration',
              field: 'Technology Management',
              location: 'Abu Dhabi, UAE',
              startDate: '2016-09',
              endDate: '2018-05',
              current: false,
            }
          ],
          skills: [
            { id: uuidv4(), name: 'Product Management', level: 'expert' },
            { id: uuidv4(), name: 'Agile/Scrum', level: 'advanced' },
            { id: uuidv4(), name: 'Market Research', level: 'advanced' },
            { id: uuidv4(), name: 'Data Analysis', level: 'intermediate' },
          ],
          languages: [
            { id: uuidv4(), name: 'English', proficiency: 'fluent' },
            { id: uuidv4(), name: 'Arabic', proficiency: 'native' },
          ]
        };
        
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
