import { AffindaAPI, AffindaCredential } from '@affinda/affinda';
import { ResumeData, Experience, Education, Skill } from '../components/resume/types';

// Initialize the client
const credential = new AffindaCredential(process.env.NEXT_PUBLIC_AFFINDA_API_KEY || 'YOUR_API_KEY');
const client = new AffindaAPI(credential);

/**
 * Parse resume using Affinda API
 * @param file Resume file to parse
 * @returns Promise resolving to parsed ResumeData
 */
export async function parseResumeWithAffinda(file: File): Promise<Partial<ResumeData>> {
  try {
    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    
    // Call Affinda API
    const response = await client.createResume({
      file: Buffer.from(fileBuffer),
      fileName: file.name,
      wait: true // Wait for processing to complete
    });
    
    console.log('Affinda response:', response.data);
    
    // Map Affinda response to your ResumeData structure
    const resumeData: Partial<ResumeData> = {
      personal: {
        fullName: response.data.name?.raw || '',
        jobTitle: response.data.profession || '',
        email: response.data.emails?.[0] || '',
        phone: response.data.phoneNumbers?.[0] || '',
        location: response.data.location?.raw || '',
        linkedin: response.data.linkedin || '',
        website: response.data.websites?.[0] || ''
      },
      summary: response.data.summary || '',
      experience: (response.data.workExperience || []).map(exp => ({
        id: Math.random().toString(36).substring(2, 9),
        company: exp.organization || '',
        position: exp.jobTitle || '',
        location: exp.location?.raw || '',
        startDate: exp.dates?.startDate || '',
        endDate: exp.dates?.endDate || null,
        current: exp.dates?.isCurrent || false,
        description: exp.jobDescription || ''
      })),
      education: (response.data.education || []).map(edu => ({
        id: Math.random().toString(36).substring(2, 9),
        institution: edu.organization || '',
        degree: edu.accreditation?.education || '',
        field: edu.accreditation?.inputStr || '',
        location: edu.location?.raw || '',
        startDate: edu.dates?.startDate || '',
        endDate: edu.dates?.endDate || null,
        current: edu.dates?.isCurrent || false
      })),
      skills: (response.data.skills || []).map(skill => ({
        name: skill.name,
        level: ''
      })),
      languages: (response.data.languages || []).map(lang => ({
        id: Math.random().toString(36).substring(2, 9),
        name: lang,
        proficiency: 'Conversational'
      })),
      metadata: {
        parsingMethod: 'affinda-api',
        parsedAt: new Date().toISOString(),
        fileType: file.type,
        fileSize: file.size,
        fileName: file.name,
        processingTime: 0, // Will be updated later
        processingId: `affinda_${Date.now()}`
      }
    };
    
    return resumeData;
  } catch (error) {
    console.error('Error parsing resume with Affinda:', error);
    throw new Error(`Resume parsing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
