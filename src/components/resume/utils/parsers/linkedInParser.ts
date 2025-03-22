
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';

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
