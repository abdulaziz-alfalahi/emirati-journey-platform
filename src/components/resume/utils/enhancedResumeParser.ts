
/**
 * Enhanced Resume Parser - JavaScript Implementation
 * 
 * This module provides a JavaScript implementation of the Enhanced Resume Parser,
 * adapting the functionality for web browser environments without requiring a Python backend.
 */

import { ResumeData } from '../types';
import { extractDataFromContent } from './resumeContentParser';
import { mergeResumeData } from './resumeDataUtils';

// Define the metadata type to include processingMethod
interface DocumentMetadata {
  fileType: string;
  processedAt: string;
  textLength: number;
  processingMethod: string;
}

// Advanced document processor functionality
const processDocument = (fileContent: string, fileType: string): { text: string, metadata: DocumentMetadata } => {
  console.log(`Processing document of type: ${fileType} with content length: ${fileContent.length}`);
  
  let text = fileContent;
  let metadata: DocumentMetadata = {
    fileType,
    processedAt: new Date().toISOString(),
    textLength: fileContent.length,
    processingMethod: 'generic-extraction'
  };
  
  // Process based on file type
  if (fileType.includes('pdf')) {
    // For PDF content that comes as text (already extracted client-side)
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-pdf';
  } 
  else if (fileType.includes('word') || fileType.includes('doc')) {
    // For Word document content
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-doc';
  } 
  else if (fileType.includes('text/plain')) {
    // For plain text
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-txt';
  }
  else if (fileType.includes('html')) {
    // For HTML content, strip HTML tags
    text = stripHtml(fileContent);
    metadata.processingMethod = 'html-extraction';
  }
  else {
    // Default case - just clean the text
    text = cleanText(fileContent);
    metadata.processingMethod = 'generic-extraction';
  }
  
  return { text, metadata };
};

// Helper function to clean text similar to the Python implementation
const cleanText = (text: string): string => {
  if (!text) return "";
  
  // Replace multiple newlines with a single newline
  text = text.replace(/\n\s*\n/g, '\n\n');
  
  // Replace multiple spaces with a single space
  text = text.replace(/ +/g, ' ');
  
  // Remove non-printable characters (adjust as needed for JS)
  text = text.replace(/[^\x20-\x7E\n]/g, '');
  
  return text.trim();
};

// Helper function to strip HTML tags
const stripHtml = (html: string): string => {
  if (!html) return "";
  
  // First, replace <br>, <p>, <div> endings with newlines to preserve formatting
  const withLineBreaks = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n');
  
  // Remove all other HTML tags
  const withoutTags = withLineBreaks.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const decoded = withoutTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Clean the resulting text
  return cleanText(decoded);
};

// Advanced section identification
const identifySections = (text: string): Record<string, string> => {
  // Common section headers in resumes
  const sectionHeaders = [
    'SUMMARY', 'PROFESSIONAL SUMMARY', 'PROFILE', 'OBJECTIVE',
    'EXPERIENCE', 'WORK EXPERIENCE', 'EMPLOYMENT HISTORY', 'PROFESSIONAL EXPERIENCE',
    'EDUCATION', 'ACADEMIC BACKGROUND', 'EDUCATIONAL BACKGROUND', 'QUALIFICATIONS',
    'SKILLS', 'TECHNICAL SKILLS', 'CORE COMPETENCIES', 'EXPERTISE',
    'LANGUAGES', 'LANGUAGE PROFICIENCY',
    'CERTIFICATIONS', 'CERTIFICATES', 'ACCREDITATIONS', 'LICENSES',
    'PROJECTS', 'KEY PROJECTS', 'PROJECT EXPERIENCE', 'PORTFOLIO',
    'ACHIEVEMENTS', 'AWARDS', 'HONORS', 'RECOGNITIONS',
    'PUBLICATIONS', 'RESEARCH', 'PAPERS', 'PRESENTATIONS',
    'VOLUNTEERING', 'VOLUNTEER EXPERIENCE', 'COMMUNITY SERVICE',
    'REFERENCES', 'PROFESSIONAL REFERENCES'
  ];
  
  // Create the sections object with initial "HEADER" section
  const sections: Record<string, string> = {
    'HEADER': ''
  };
  
  // Regular expression patterns for various section header formats
  // This regex catches headers that are:
  // 1. All caps
  // 2. Possibly preceded by numbers (like "1. EXPERIENCE")
  // 3. Possibly followed by a colon
  // 4. Possibly underlined with ===== or -----
  const headerRegexPatterns = [
    // Basic all-caps pattern
    new RegExp(`^(${sectionHeaders.join('|')})\\s*:?\\s*$`, 'i'),
    
    // With numbers prefix (1. EXPERIENCE)
    new RegExp(`^\\d+\\.?\\s+(${sectionHeaders.join('|')})\\s*:?\\s*$`, 'i'),
    
    // Underlined with === or ---
    new RegExp(`^(${sectionHeaders.join('|')})\\s*:?\\s*$\\n[=\\-]+`, 'im')
  ];
  
  // Process line by line to identify sections
  let currentSection = 'HEADER';
  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Check if this line matches any section header pattern
    let isHeader = false;
    
    // First, use our predefined regex patterns
    for (const pattern of headerRegexPatterns) {
      if (pattern.test(line)) {
        // Extract the header name
        const match = line.match(new RegExp(`(${sectionHeaders.join('|')})`, 'i'));
        
        if (match && match[0]) {
          currentSection = match[0].toUpperCase();
          if (!sections[currentSection]) sections[currentSection] = '';
          isHeader = true;
          break;
        }
      }
    }
    
    // If no match with regex patterns, check for exact matches
    if (!isHeader) {
      const upperLine = line.toUpperCase();
      
      // Check for exact matches with section headers
      const exactMatch = sectionHeaders.find(header => 
        upperLine === header || 
        upperLine === header + ':' || 
        upperLine === header + ' :'
      );
      
      if (exactMatch) {
        currentSection = exactMatch;
        if (!sections[currentSection]) sections[currentSection] = '';
        isHeader = true;
      }
    }
    
    // If not a header, add line to current section
    if (!isHeader) {
      sections[currentSection] += line + '\n';
    }
  }
  
  // Clean up each section (trim whitespace)
  Object.keys(sections).forEach(key => {
    sections[key] = sections[key].trim();
  });
  
  console.log('Identified sections:', Object.keys(sections));
  return sections;
};

// Entity extraction for personal information
const extractPersonalInfo = (sections: Record<string, string>): ResumeData['personal'] => {
  const personal: ResumeData['personal'] = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  };

  // Email pattern
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  
  // Phone pattern (handles various formats)
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  
  // LinkedIn pattern
  const linkedinRegex = /(?:linkedin\.com\/in\/|linkedin\.com\/profile\/view\?id=|linkedin\.com\/pub\/)[\w-]+/gi;
  
  // Website pattern
  const websiteRegex = /(?:https?:\/\/)?(?:www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(?:\/[\w-./?%&=]*)?/gi;

  // Combine relevant sections for extraction
  let text = '';
  for (const section of ['HEADER', 'SUMMARY', 'PROFILE', 'CONTACT']) {
    if (sections[section]) {
      text += sections[section] + '\n';
    }
  }

  // Extract email
  const emailMatches = text.match(emailRegex);
  if (emailMatches) {
    personal.email = emailMatches[0];
  }
  
  // Extract phone
  const phoneMatches = text.match(phoneRegex);
  if (phoneMatches) {
    personal.phone = phoneMatches[0];
  }
  
  // Extract LinkedIn
  const linkedinMatches = text.match(linkedinRegex);
  if (linkedinMatches) {
    const linkedin = linkedinMatches[0];
    personal.linkedin = linkedin.startsWith('http') ? linkedin : `https://${linkedin}`;
  }
  
  // Extract website (that's not LinkedIn)
  const websiteMatches = text.match(websiteRegex);
  if (websiteMatches) {
    for (const site of websiteMatches) {
      if (!site.includes('linkedin')) {
        personal.website = site.startsWith('http') ? site : `https://${site}`;
        break;
      }
    }
  }

  // Try to extract name and job title from the beginning
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    // First non-empty line is likely the name
    const firstLine = lines[0].trim();
    if (firstLine.length < 50 && !emailRegex.test(firstLine) && !phoneRegex.test(firstLine)) {
      personal.fullName = firstLine;
      
      // Second non-empty line might be job title
      if (lines.length > 1) {
        const secondLine = lines[1].trim();
        if (secondLine.length < 70 && !emailRegex.test(secondLine) && !phoneRegex.test(secondLine)) {
          personal.jobTitle = secondLine;
        }
      }
    }
  }

  // Try to extract location
  const locationPatterns = [
    /(?:located in|location|address|residing at|based in)\s+([^,\n]+(?:,\s*[^,\n]+)?)/i,
    /([A-Za-z\s]+,\s*[A-Za-z\s]+(?:,\s*[A-Za-z\s]+)?)/i,
    /\b([A-Za-z\s]+,\s*(?:USA|United States|UK|Canada|Australia|UAE|India|Germany|France|Italy|Spain|Japan|China))\b/i,
    /\b([A-Za-z\s]+,\s*[A-Z]{2})\b/i, // City, State abbreviation
  ];
  
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      personal.location = match[1].trim();
      break;
    }
  }

  return personal;
};

// Add enhanced extractors for other sections
// Main parser class
export class EnhancedResumeParser {
  /**
   * Parse resume content and extract structured information
   * 
   * @param fileContent Content of the resume file
   * @param fileType MIME type of the file
   * @returns Parsed resume data
   */
  parseResumeContent(fileContent: string, fileType: string): Partial<ResumeData> {
    try {
      console.log('Starting enhanced resume parsing...');
      
      // Step 1: Process document and extract text
      const { text, metadata } = processDocument(fileContent, fileType);
      console.log('Document processed, metadata:', metadata);
      
      // Step 2: Identify and segment resume sections
      const sections = identifySections(text);
      console.log('Sections identified:', Object.keys(sections));
      
      // Step 3: Extract entities using our enhanced extractors
      const personalInfo = extractPersonalInfo(sections);
      console.log('Personal info extracted:', Object.keys(personalInfo));
      
      // Step 4: Extract other entities from the content parser
      const extractedData = extractDataFromContent(text, fileType);
      console.log('Entities extracted using content parser');
      
      // Step 5: Combine enhanced extraction with default extraction
      // Prioritize our enhanced extractor for personal info
      const result: Partial<ResumeData> & { metadata?: any } = {
        ...extractedData,
        personal: {
          ...extractedData.personal,
          ...personalInfo
        },
        metadata: {
          ...metadata,
          sectionCount: Object.keys(sections).length,
          sectionNames: Object.keys(sections),
          parser: 'EnhancedResumeParser'
        }
      };
      
      return result;
    } catch (error) {
      console.error('Error in enhanced resume parsing:', error);
      // Return basic structure with error info
      return {
        personal: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: ""
        },
        summary: "",
        experience: [],
        education: [],
        skills: [],
        languages: []
      };
    }
  }
  
  /**
   * Parse multiple resume contents in batch
   * 
   * @param files Array of file objects with content and type
   * @returns Array of parsed resume data
   */
  parseResumeBatch(files: Array<{content: string, type: string}>): Array<Partial<ResumeData>> {
    return files.map(file => this.parseResumeContent(file.content, file.type));
  }
  
  /**
   * Merge new resume data with existing data
   * 
   * @param currentData Current resume data
   * @param newData New parsed resume data to merge
   * @returns Merged resume data
   */
  mergeResumeData(currentData: ResumeData, newData: Partial<ResumeData>): ResumeData {
    return mergeResumeData(currentData, newData);
  }
}

// Export singleton instance for easy import
export const enhancedResumeParser = new EnhancedResumeParser();
