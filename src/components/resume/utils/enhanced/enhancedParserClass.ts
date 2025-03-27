
/**
 * Enhanced Resume Parser class implementation
 * Core class that orchestrates the resume parsing process
 */
import { ResumeData } from '../../types';
import { extractDataFromContent } from '../resumeContentParser';
import { mergeResumeData } from '../resumeDataUtils';
import { processDocument } from './documentProcessor';
import { identifySections } from './sectionIdentifier';
import { extractPersonalInfo } from './entityExtractor';
import { validateResumeData, structureResumeData } from './dataValidator';

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
      let result: Partial<ResumeData> & { metadata?: any } = {
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
      
      // Step 6: Validate and structure the data
      const validation = validateResumeData(result);
      console.log('Validation results:', validation);
      
      // Step 7: Structure the data to ensure it matches the expected schema
      result = structureResumeData(result);
      
      // Add validation results to metadata
      result.metadata.validation = validation;
      
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
