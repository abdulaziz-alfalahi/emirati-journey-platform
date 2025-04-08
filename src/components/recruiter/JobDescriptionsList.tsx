
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, FileText, ListCheck, Plus, Upload, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { JobDescriptionParser } from '@/components/resume/utils/jobDescriptionParser';

const JobDescriptionsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');
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
  const handleCreateJob = async () => {
    if (!newJobTitle || !newJobDescription) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a title and description for the job.',
      });
      return;
    }
    
    try {
      const parser = new JobDescriptionParser();
      const parsedJD = parser.parseJobDescription(newJobDescription);
      
      const { error } = await supabase
        .from('job_descriptions')
        .insert({
          title: newJobTitle,
          company: parsedJD.company,
          location: parsedJD.location,
          employment_type: parsedJD.employmentType,
          work_mode: parsedJD.workMode,
          description: newJobDescription,
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
      
      setNewJobTitle('');
      setNewJobDescription('');
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Job Descriptions</h2>
          <p className="text-muted-foreground">Manage and post job openings</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new job description.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={newJobDescription}
                    onChange={(e) => setNewJobDescription(e.target.value)}
                    placeholder="Full job description with responsibilities, requirements, benefits..."
                    rows={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateJob}>Create Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Upload Job Descriptions
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Job Descriptions</DialogTitle>
                <DialogDescription>
                  Upload job description files (.txt, .docx, .pdf)
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="job-files">Job Description Files</Label>
                <Input
                  id="job-files"
                  type="file"
                  multiple
                  accept=".txt,.docx,.pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobDescriptions?.length ? (
                  jobDescriptions.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company || 'Not specified'}</TableCell>
                      <TableCell>{job.location || 'Not specified'}</TableCell>
                      <TableCell>{new Date(job.posted_date || job.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleFindMatches(job.id)}
                          >
                            <Users className="h-4 w-4 mr-1" /> Find Matches
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => navigate(`/job-descriptions/${job.id}`)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No job descriptions found. Create or upload job descriptions to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobDescriptionsList;
