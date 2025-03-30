import { ResumeData, Experience, Skill } from '../../types';
import { sanitizeResumeData } from '../helpers/validation';
import { v4 as uuidv4 } from 'uuid';

export const parseLinkedInData = (data: any): Partial<ResumeData> => {
  try {
    const parsedData: Partial<ResumeData> = {
      personal: {
        fullName: data.profile?.name || 'Not found',
        jobTitle: data.profile?.headline || 'Not found',
        email: data.profile?.email || 'Not found',
        phone: data.profile?.phone || 'Not found',
        location: data.profile?.location || 'Not found',
        linkedin: data.profile?.profileUrl || '',
        website: data.profile?.website || ''
      },
      summary: data.profile?.summary || '',
      experience: [],
      education: [],
      skills: [],
      languages: [],
      certifications: []
    };
    
    // Parse work experience
    if (Array.isArray(data.experience)) {
      parsedData.experience = data.experience.map((exp: any) => {
        const experience: Experience = {
          id: uuidv4(),
          company: exp.companyName || '',
          position: exp.title || '',
          location: exp.location || '',
          startDate: exp.dateRange?.start || '',
          endDate: exp.current ? null : (exp.dateRange?.end || ''),
          current: !!exp.current,
          description: exp.description || ''
        };
        return experience;
      });
    }
    
    // Parse education
    if (Array.isArray(data.education)) {
      parsedData.education = data.education.map((edu: any) => ({
        id: uuidv4(),
        institution: edu.schoolName || '',
        degree: edu.degree || '',
        field: edu.fieldOfStudy || '',
        location: edu.location || '',
        startDate: edu.dateRange?.start || '',
        endDate: edu.dateRange?.end || null,
        current: false,
        description: edu.description || ''
      }));
    }
    
    // Parse skills
    if (Array.isArray(data.skills)) {
      parsedData.skills = data.skills.map((skill: any) => {
        const skillObj: Skill = {
          id: uuidv4(),
          name: skill.name || skill,
          level: skill.level || 'intermediate'
        };
        return skillObj;
      });
    }
    
    // Parse languages
    if (Array.isArray(data.languages)) {
      parsedData.languages = data.languages.map((lang: any) => ({
        id: uuidv4(),
        name: lang.name || lang,
        proficiency: lang.proficiency || 'conversational'
      }));
    }
    
    // Parse certifications
    if (Array.isArray(data.certifications)) {
      parsedData.certifications = data.certifications.map((cert: any) => ({
        id: uuidv4(),
        name: cert.name || '',
        issuer: cert.authority || cert.issuer || '',
        date: cert.date || cert.issueDate || '',
        expiryDate: cert.expiryDate || '',
        url: cert.url || ''
      }));
    }
    
    return sanitizeResumeData(parsedData);
  } catch (error) {
    console.error('Error parsing LinkedIn data:', error);
    throw new Error(`Failed to parse LinkedIn data: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            website: `https://${username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`
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
