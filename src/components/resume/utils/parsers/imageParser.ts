
/**
 * Resume image parser utility for extracting data from uploaded image files
 */
import { ResumeData } from '../../types';
import { supabase } from '@/integrations/supabase/client';

// Parse resume from image file
export const parseResumeFromImage = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;
        
        if (!imageData) {
          reject(new Error('Could not read image data'));
          return;
        }
        
        console.log('Image read complete. Processing with Edge Function...');
        
        try {
          // Call the extract-resume-from-image Edge Function
          const response = await supabase.functions.invoke('extract-resume-from-image', {
            body: { 
              imageData,
              fileName: file.name,
              fileType: file.type 
            },
          });
          
          if (response.error) {
            console.error('Resume image extraction error:', response.error);
            throw new Error(`Image extraction failed: ${response.error.message}`);
          }
          
          const data = response.data;
          
          if (!data) {
            throw new Error('No data returned from image extraction service');
          }
          
          console.log('Image extraction successful');
          
          // Add metadata about the parsing
          data.metadata = {
            ...(data.metadata || {}),
            parsingMethod: 'image-edge-function',
            parsedAt: new Date().toISOString(),
            fileType: file.type,
            fileSize: file.size
          };
          
          resolve(data);
        } catch (error) {
          console.error('Error processing resume image with Edge Function:', error);
          
          // Fallback to basic structure if Edge Function fails
          const basicData: Partial<ResumeData> = {
            personal: {
              fullName: "",
              jobTitle: "",
              email: "",
              phone: "",
              location: "",
              linkedin: "",
              website: ""
            },
            summary: "Resume extracted from image",
            experience: [],
            education: [],
            skills: [],
            languages: [],
            metadata: {
              parsingMethod: 'image-fallback',
              parsedAt: new Date().toISOString(),
              fileType: file.type,
              fileSize: file.size,
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          };
          
          console.warn('Falling back to basic structure due to Edge Function failure');
          resolve(basicData);
        }
      } catch (error) {
        console.error('Error processing resume image:', error);
        reject(new Error('Failed to process resume image. Please try again.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading image file. Please try again.'));
    };
    
    // Read image file as Data URL
    reader.readAsDataURL(file);
  });
};
