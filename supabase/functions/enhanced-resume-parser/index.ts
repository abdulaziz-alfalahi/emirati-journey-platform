
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Basic resume data interface (simplified from the frontend type)
interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    [key: string]: any;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements?: string[];
    [key: string]: any;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description?: string;
    [key: string]: any;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level?: string;
    [key: string]: any;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string;
    [key: string]: any;
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expires?: string;
    credential?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define metadata type
interface DocumentMetadata {
  fileType: string;
  processedAt: string;
  textLength: number;
  processingMethod: string;
}

// Helper function to clean text
const cleanText = (text: string): string => {
  if (!text) return "";
  
  // Replace multiple newlines with a single newline
  text = text.replace(/\n\s*\n/g, '\n\n');
  
  // Replace multiple spaces with a single space
  text = text.replace(/ +/g, ' ');
  
  // Remove non-printable characters
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

// Process document based on content and type
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
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-pdf';
  } 
  else if (fileType.includes('word') || fileType.includes('doc')) {
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-doc';
  } 
  else if (fileType.includes('text/plain')) {
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-txt';
  }
  else if (fileType.includes('html')) {
    text = stripHtml(fileContent);
    metadata.processingMethod = 'html-extraction';
  }
  else {
    text = cleanText(fileContent);
    metadata.processingMethod = 'generic-extraction';
  }
  
  return { text, metadata };
};

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

// Identify sections in the resume text
const identifySections = (text: string): Record<string, string> => {
  // Create the sections object with initial "HEADER" section
  const sections: Record<string, string> = {
    'HEADER': ''
  };
  
  // Regular expression patterns for various section header formats
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

// Extract personal information from sections
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

// Generate a random UUID (simplified version for Deno)
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Main handler for the edge function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { fileContent, fileType = 'text/plain' } = await req.json();
    
    if (!fileContent) {
      return new Response(
        JSON.stringify({ error: 'No file content provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Processing resume text (length: ${fileContent.length} chars)`);
    
    // Process document and extract text
    const { text, metadata } = processDocument(fileContent, fileType);
    
    // Identify sections
    const sections = identifySections(text);
    
    // Extract personal info from sections
    const personalInfo = extractPersonalInfo(sections);
    
    // Create a basic resume data structure
    const resumeData: Partial<ResumeData> = {
      personal: personalInfo,
      summary: sections.SUMMARY || sections.PROFILE || '',
      experience: [],
      education: [],
      skills: [],
      languages: []
    };
    
    // Add metadata
    const resultWithMetadata = {
      ...resumeData,
      metadata: {
        ...metadata,
        sectionCount: Object.keys(sections).length,
        sectionNames: Object.keys(sections),
        parser: 'EnhancedResumeParser-EdgeFunction'
      }
    };
    
    // Return the parsed data
    return new Response(
      JSON.stringify(resultWithMetadata),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in enhanced-resume-parser function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred',
        stack: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
