
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobDescriptions, useJobUploader, useJobCreator } from './job-descriptions/JobDescriptionUtils';

// Import the new components
import JobDescriptionHeader from './components/JobDescriptionHeader';
import CreateJobDialog from './components/CreateJobDialog';
import UploadJobDialog from './components/UploadJobDialog';
import JobsTable from './components/JobsTable';

const JobDescriptionsList = () => {
  const navigate = useNavigate();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch job descriptions
  const { data: jobDescriptions, isLoading, refetch } = useJobDescriptions();
  const { uploadJobDescriptions } = useJobUploader(refetch);
  const { createJob } = useJobCreator(refetch);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    const result = await uploadJobDescriptions(files);
    if (result.success) {
      setIsUploadOpen(false);
    }
    setIsUploading(false);
  };

  // Handle manual job creation
  const handleCreateJob = async (title: string, description: string) => {
    const result = await createJob(title, description);
    if (result.success) {
      setIsCreateOpen(false);
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
