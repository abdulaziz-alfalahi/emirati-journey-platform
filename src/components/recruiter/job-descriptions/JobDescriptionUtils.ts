
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { JobDescriptionParser } from '@/components/resume/utils/jobDescriptionParser';
import { useQuery } from '@tanstack/react-query';

// Fetch job descriptions
export const useJobDescriptions = () => {
  return useQuery({
    queryKey: ['jobDescriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });
};

// Handle file upload
export const useJobUploader = (refetch: () => void) => {
  const { toast } = useToast();
  
  const uploadJobDescriptions = async (files: FileList) => {
    if (!files || files.length === 0) return { success: false };
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const parser = new JobDescriptionParser();
        
        // Read file content
        const text = await file.text();
        
        // Parse job description
        const parsedJD = parser.parseJobDescription(text);
        
        // Save to database
        const { error } = await supabase
          .from('job_descriptions')
          .insert({
            title: parsedJD.title,
            company: parsedJD.company,
            location: parsedJD.location,
            employment_type: parsedJD.employmentType,
            work_mode: parsedJD.workMode,
            description: parsedJD.description,
            responsibilities: parsedJD.responsibilities,
            requirements: parsedJD.requirements,
            benefits: parsedJD.benefits,
            salary: parsedJD.salary,
            application_deadline: parsedJD.applicationDeadline,
            posted_date: parsedJD.postedDate || new Date().toISOString(),
            keywords: parsedJD.keywords,
            is_active: true
          });
        
        if (error) throw error;
      }
      
      toast({
        title: 'Job Descriptions Uploaded',
        description: `Successfully uploaded ${files.length} job description(s)`,
      });
      
      refetch();
      return { success: true };
    } catch (error) {
      console.error('Error uploading job descriptions:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error uploading the job descriptions.',
      });
      return { success: false };
    }
  };
  
  return { uploadJobDescriptions };
};

// Create job manually
export const useJobCreator = (refetch: () => void) => {
  const { toast } = useToast();
  
  const createJob = async (title: string, description: string) => {
    if (!title || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a title and description for the job.',
      });
      return { success: false };
    }
    
    try {
      const parser = new JobDescriptionParser();
      const parsedJD = parser.parseJobDescription(description);
      
      const { error } = await supabase
        .from('job_descriptions')
        .insert({
          title: title,
          company: parsedJD.company,
          location: parsedJD.location,
          employment_type: parsedJD.employmentType,
          work_mode: parsedJD.workMode,
          description: description,
          responsibilities: parsedJD.responsibilities,
          requirements: parsedJD.requirements,
          benefits: parsedJD.benefits,
          salary: parsedJD.salary,
          application_deadline: parsedJD.applicationDeadline,
          posted_date: new Date().toISOString(),
          keywords: parsedJD.keywords,
          is_active: true
        });
      
      if (error) throw error;
      
      toast({
        title: 'Job Created',
        description: 'The job description has been created successfully.',
      });
      
      refetch();
      return { success: true };
    } catch (error) {
      console.error('Error creating job description:', error);
      toast({
        variant: 'destructive',
        title: 'Creation Failed',
        description: 'There was an error creating the job description.',
      });
      return { success: false };
    }
  };
  
  return { createJob };
};
