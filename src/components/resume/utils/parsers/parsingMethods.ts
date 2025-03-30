
import { ResumeData } from '../../types';
import { enhancedResumeParser } from '../enhancedResumeParser';
import { legacyResumeParser } from '../legacyResumeParser';

/**
 * Parse with enhanced parser
 */
export const parseWithEnhancedParser = (
  content: string, 
  file: File,
  startTime: number
): Partial<ResumeData> => {
  try {
    // Use enhanced parser
    return enhancedResumeParser(content);
  } catch (error) {
    console.error('Enhanced parser error:', error);
    throw error;
  }
};

/**
 * Parse with legacy parser
 */
export const parseWithLegacyParser = (
  content: string,
  file: File,
  startTime: number,
  previousError?: Error
): Partial<ResumeData> => {
  try {
    // Use legacy parser
    return legacyResumeParser(content);
  } catch (error) {
    console.error('Legacy parser error:', error);
    throw error;
  }
};

/**
 * Parse with edge function
 */
export const parseWithEnhancedEdgeFunction = async (
  content: string,
  file: File,
  startTime: number,
  previousError?: Error
): Promise<Partial<ResumeData>> => {
  // Mock implementation - in a real app, this would call a server function
  console.log('Using edge function parser (mock)');
  return {
    personal: {
      fullName: 'Edge Parsed Name',
      jobTitle: 'Edge Parsed Title',
      email: 'edge@example.com',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: 'This resume was parsed using the edge function (mock).',
    experience: [],
    education: [],
    skills: [],
    languages: []
  };
};

/**
 * Parse with AI extraction
 */
export const parseWithAIExtraction = async (
  content: string,
  file: File,
  startTime: number,
  previousError?: Error
): Promise<Partial<ResumeData>> => {
  // Mock implementation - in a real app, this would call an AI service
  console.log('Using AI extraction parser (mock)');
  return {
    personal: {
      fullName: 'AI Parsed Name',
      jobTitle: 'AI Parsed Title',
      email: 'ai@example.com',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: 'This resume was parsed using AI extraction (mock).',
    experience: [],
    education: [],
    skills: [],
    languages: []
  };
};
