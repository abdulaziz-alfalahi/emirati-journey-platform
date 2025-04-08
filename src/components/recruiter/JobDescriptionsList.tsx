
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { JobDescriptionParser } from '@/components/resume/utils/jobDescriptionParser';

// Import the new components
import JobDescriptionHeader from './components/JobDescriptionHeader';
import CreateJobDialog from './components/CreateJobDialog';
import UploadJobDialog from './components/UploadJobDialog';
import JobsTable from './components/JobsTable';

const JobDescriptionsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch job descriptions
  const { data: jobDescriptions, isLoading, refetch } = useQuery({
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

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
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
      setIsUploadOpen(false);
    } catch (error) {
      console.error('Error uploading job descriptions:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error uploading the job descriptions.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle manual job creation
  const handleCreateJob = async (title: string, description: string) => {
    if (!title || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a title and description for the job.',
      });
      return;
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
      
      setIsCreateOpen(false);
      refetch();
    } catch (error) {
      console.error('Error creating job description:', error);
      toast({
        variant: 'destructive',
        title: 'Creation Failed',
        description: 'There was an error creating the job description.',
      });
    }
  };

  // Navigate to find matching candidates
  const handleFindMatches = (jobId: string) => {
    navigate(`/recruiter/matching/${jobId}`);
  };

  return (
    <div className="space-y-6">
      <JobDescriptionHeader
        onOpenCreateDialog={() => setIsCreateOpen(true)}
        onOpenUploadDialog={() => setIsUploadOpen(true)}
      />
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Active Job Listings</CardTitle>
            <CardDescription>
              {jobDescriptions?.length || 0} job descriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobsTable 
              jobs={jobDescriptions || []} 
              onFindMatches={handleFindMatches} 
            />
          </CardContent>
        </Card>
      )}
      
      <CreateJobDialog
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreateJob={handleCreateJob}
      />
      
      <UploadJobDialog
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onFileUpload={handleFileUpload}
        isUploading={isUploading}
      />
    </div>
  );
};

export default JobDescriptionsList;
