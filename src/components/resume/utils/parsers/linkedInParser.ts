
import { ResumeData } from '../../types';
import { Personal } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export function parseLinkedInData(jsonData: any): Partial<ResumeData> {
  try {
    if (!jsonData) {
      throw new Error('Invalid LinkedIn data');
    }

    // Parse personal info
    const personal: Personal = {
      fullName: extractFullName(jsonData),
      jobTitle: extractJobTitle(jsonData),
      email: extractEmail(jsonData),
      phone: extractPhone(jsonData),
      location: extractLocation(jsonData),
      linkedin: extractLinkedInUrl(jsonData),
      website: extractWebsite(jsonData)
    };

    // Parse experience
    const experience = extractExperience(jsonData);

    // Parse education
    const education = extractEducation(jsonData);

    // Parse skills
    const skills = extractSkills(jsonData);

    // Parse summary
    const summary = extractSummary(jsonData);

    // Compile resume data
    const resumeData: Partial<ResumeData> = {
      personal,
      summary,
      experience,
      education,
      skills,
      languages: []
    };

    return resumeData;
  } catch (error) {
    console.error('LinkedIn parser error:', error);
    return {};
  }
}

// Helper function to extract experience data
function extractExperience(jsonData: any) {
  try {
    const experiences = jsonData.experience || jsonData.positions || [];
    
    return experiences.map((exp: any) => {
      const startDate = exp.startDate?.year 
        ? `${exp.startDate.month || 1}/${exp.startDate.year}` 
        : '';
        
      // Create a proper endDate or empty string if it's a current position
      const endDate = exp.endDate?.year 
        ? `${exp.endDate.month || 12}/${exp.endDate.year}` 
        : '';
        
      return {
        id: uuidv4(),
        company: exp.companyName || exp.company?.name || '',
        position: exp.title || '',
        location: exp.locationName || exp.location || '',
        startDate: startDate,
        endDate: endDate,
        current: !exp.endDate || !exp.endDate.year,
        description: exp.description || ''
      };
    });
  } catch (error) {
    console.error('Error extracting experience:', error);
    return [];
  }
}

// Helper functions to extract other LinkedIn data
function extractFullName(jsonData: any) {
  return jsonData.profile?.firstName && jsonData.profile?.lastName
    ? `${jsonData.profile.firstName} ${jsonData.profile.lastName}`.trim()
    : jsonData.fullName || '';
}

function extractJobTitle(jsonData: any) {
  return jsonData.profile?.headline || jsonData.headline || jsonData.jobTitle || '';
}

function extractEmail(jsonData: any) {
  return jsonData.profile?.email || jsonData.email || '';
}

function extractPhone(jsonData: any) {
  return jsonData.profile?.phone || jsonData.phoneNumber || '';
}

function extractLocation(jsonData: any) {
  return jsonData.profile?.location || jsonData.locationName || '';
}

function extractLinkedInUrl(jsonData: any) {
  return jsonData.profile?.profileUrl || jsonData.publicProfileUrl || '';
}

function extractWebsite(jsonData: any) {
  return jsonData.profile?.website || '';
}

function extractSummary(jsonData: any) {
  return jsonData.profile?.summary || jsonData.summary || '';
}

function extractEducation(jsonData: any) {
  try {
    const educations = jsonData.education || [];
    
    return educations.map((edu: any) => {
      const startDate = edu.startDate?.year 
        ? `${edu.startDate?.year}` 
        : '';
        
      const endDate = edu.endDate?.year 
        ? `${edu.endDate?.year}` 
        : '';
        
      return {
        id: uuidv4(),
        institution: edu.schoolName || '',
        degree: edu.degree || '',
        field: edu.fieldOfStudy || '',
        startDate: startDate,
        endDate: endDate,
        current: !edu.endDate || !edu.endDate.year,
        description: edu.activities || ''
      };
    });
  } catch (error) {
    console.error('Error extracting education:', error);
    return [];
  }
}

function extractSkills(jsonData: any) {
  try {
    const skills = jsonData.skills || [];
    
    return skills.map((skill: any) => ({
      id: uuidv4(),
      name: skill.name || skill,
      level: 3 // Default to intermediate level
    }));
  } catch (error) {
    console.error('Error extracting skills:', error);
    return [];
  }
}
