
import { ResumeData } from '../../types';

/**
 * Interface representing the result of resume processing
 */
export interface ProcessedResult {
  parsedData: Partial<ResumeData>;
  parsingMethod: string;
  usedFallback: boolean;
  processingTime?: number;
  error?: string;
}
