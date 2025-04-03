
import { AffindaAPI, AffindaCredential } from '@affinda/affinda';
import { ResumeData } from '@/components/resume/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Initialize the Affinda client with proper credential handling
 */
const createAffindaClient = (apiKey?: string) => {
  // Try to get the API key from environment variables first
  const key = apiKey || import.meta.env.VITE_AFFINDA_API_KEY;
  
  if (!key) {
    console.warn('No Affinda API key provided');
    return null;
  }
  
  const credential = new AffindaCredential(key);
  return new AffindaAPI(credential);
};

/**
 * Fetch Affinda API key from Supabase
 * @returns Promise resolving to the API key
 */
export const getAffindaApiKey = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('affinda_api_key, AFFINDA_API_KEY')
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching Affinda API key:', error);
      return null;
    }
    
    // Check for the key in different possible formats
    const apiKey = data?.affinda_api_key || data?.AFFINDA_API_KEY;
    return apiKey || null;
  } catch (error) {
    console.error('Exception fetching Affinda API key:', error);
    return null;
  }
};

/**
 * Parse resume using Affinda API
 * @param file Resume file to parse
 * @returns Promise resolving to parsed ResumeData
 */
export const parseResumeWithAffinda = async (
  file: File, 
  apiKey?: string
): Promise<Partial<ResumeData>> => {
  try {
    // Try to get API key from parameter or fetch it
    let key = apiKey;
    if (!key) {
      key = await getAffindaApiKey();
      if (!key) {
        throw new Error('No Affinda API key available. Please configure your API key in settings.');
      }
    }
    
    // Create Affinda client with API key
    const client = createAffindaClient(key);
    if (!client) {
      throw new Error('Failed to initialize Affinda client');
    }
    
    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    
    console.log(`Parsing resume with Affinda: ${file.name} (${file.type}, ${file.size} bytes)`);
    
    // Call Affinda API
    const response = await client.createDocument({
      file: Buffer.from(fileBuffer),
      fileName: file.name,
      collection: 'resumes',
      wait: 'true' // Using string instead of boolean for Affinda API
    });
    
    if (!response.data) {
      throw new Error('No data in Affinda response');
    }
    
    console.log('Affinda response received:', response.data);
    
    // Map Affinda response to ResumeData structure
    const data = response.data;
    const resumeData: Partial<ResumeData> = {
      personal: {
        fullName: data.name?.text || '',
        jobTitle: data.profession?.text || '',
        email: data.emails?.[0] || '',
        phone: data.phoneNumbers?.[0]?.text || '',
        location: data.location?.text || '',
        linkedin: data.linkedin || '',
        website: data.websites?.[0] || ''
      },
      summary: data.summary?.text || '',
      experience: (data.workExperience || []).map((exp: any) => ({
        id: crypto.randomUUID(),
        company: exp.organization?.text || '',
        position: exp.jobTitle?.text || '',
        location: exp.location?.text || '',
        startDate: exp.dates?.startDate || '',
        endDate: exp.dates?.endDate || null,
        current: exp.dates?.isCurrent || false,
        description: exp.jobDescription?.text || ''
      })),
      education: (data.education || []).map((edu: any) => ({
        id: crypto.randomUUID(),
        institution: edu.organization?.text || '',
        degree: edu.accreditation?.education || '',
        field: edu.accreditation?.inputStr || '',
        location: edu.location?.text || '',
        startDate: edu.dates?.startDate || '',
        endDate: edu.dates?.endDate || null,
        current: edu.dates?.isCurrent || false
      })),
      skills: (data.skills || []).map((skill: any) => ({
        id: crypto.randomUUID(),
        name: skill.name || '',
        level: ''
      })),
      languages: (data.languages || []).map((lang: any) => ({
        id: crypto.randomUUID(),
        name: lang.name || lang || '',
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
};

/**
 * Save parsed resume data to Supabase
 * @param userId User ID
 * @param resumeData Resume data to save
 * @returns Promise resolving to resume ID
 */
export const saveResumeToSupabase = async (
  userId: string,
  resumeData: Partial<ResumeData>,
): Promise<string> => {
  try {
    // First, create or get an existing resume for the user
    const resumeTitle = resumeData.personal?.fullName ? 
      `${resumeData.personal.fullName}'s Resume` : 'My Resume';
    
    const { data: resumeRecord, error: resumeError } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        title: resumeTitle,
        template_id: 'professional',
        theme: 'classic'
      })
      .select('id')
      .single();

    if (resumeError) {
      throw resumeError;
    }

    const resumeId = resumeRecord.id;

    // Save resume data
    const { error: dataError } = await supabase
      .from('resume_data')
      .insert({
        resume_id: resumeId,
        data: resumeData as any
      });

    if (dataError) {
      throw dataError;
    }

    return resumeId;
  } catch (error) {
    console.error('Error saving resume to Supabase:', error);
    throw new Error(`Failed to save resume: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Get all resumes for a user
 * @param userId User ID
 * @returns Promise resolving to array of resumes
 */
export const getUserResumes = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select(`
        id, 
        title, 
        template_id, 
        theme, 
        created_at, 
        updated_at
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user resumes:', error);
    throw new Error(`Failed to fetch resumes: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Get resume data by ID
 * @param resumeId Resume ID
 * @returns Promise resolving to resume data
 */
export const getResumeData = async (resumeId: string): Promise<Partial<ResumeData> | null> => {
  try {
    const { data, error } = await supabase
      .from('resume_data')
      .select('data')
      .eq('resume_id', resumeId)
      .single();

    if (error) {
      throw error;
    }

    return data?.data || null;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw new Error(`Failed to fetch resume data: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Unified function to parse a resume file and save it to Supabase
 */
export const parseAndSaveResume = async (
  file: File,
  userId: string,
  onSuccess?: (data: Partial<ResumeData>, resumeId: string) => void,
  onError?: (error: Error) => void
): Promise<void> => {
  const toastId = toast.loading("Processing Resume", { 
    description: "Analyzing your resume with Affinda API..."
  });
  
  try {
    // Parse resume with Affinda
    const parsedData = await parseResumeWithAffinda(file);
    
    // Save to Supabase
    const resumeId = await saveResumeToSupabase(userId, parsedData);
    
    toast.success("Resume Processed", {
      id: toastId,
      description: "Your resume has been successfully processed and saved."
    });
    
    // Call success callback if provided
    if (onSuccess) {
      onSuccess(parsedData, resumeId);
    }
  } catch (error) {
    console.error('Error in parseAndSaveResume:', error);
    
    toast.error("Resume Processing Failed", {
      id: toastId,
      description: error instanceof Error ? error.message : "An unknown error occurred"
    });
    
    // Call error callback if provided
    if (onError && error instanceof Error) {
      onError(error);
    }
  }
};

/**
 * Update existing resume data
 */
export const updateResumeData = async (
  resumeId: string, 
  data: Partial<ResumeData>
): Promise<void> => {
  try {
    // Find existing resume data record
    const { data: existingData, error: checkError } = await supabase
      .from('resume_data')
      .select('id')
      .eq('resume_id', resumeId)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingData) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('resume_data')
        .update({
          data: data as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Create new record
      const { error: insertError } = await supabase
        .from('resume_data')
        .insert({
          resume_id: resumeId,
          data: data as any
        });

      if (insertError) {
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error updating resume data:', error);
    throw new Error(`Failed to update resume: ${error instanceof Error ? error.message : String(error)}`);
  }
};
