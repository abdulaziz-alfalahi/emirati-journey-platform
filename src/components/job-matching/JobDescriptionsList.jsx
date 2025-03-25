// src/components/job-matching/JobDescriptionsList.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, FileText, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function JobDescriptionsList() {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobDescriptions();
  }, []);

  const fetchJobDescriptions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setJobDescriptions(data || []);
    } catch (error) {
      console.error('Error fetching job descriptions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load job descriptions: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job description?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('job_descriptions')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setJobDescriptions(jobDescriptions.filter(job => job.id !== id));
      toast({
        title: 'Success',
        description: 'Job description deleted successfully',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error deleting job description:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete job description: ' + error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleJobStatus = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('job_descriptions')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setJobDescriptions(jobDescriptions.map(job => 
        job.id === id ? { ...job, is_active: !job.is_active } : job
      ));

      toast({
        title: 'Success',
        description: `Job description ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
        variant: 'success',
      });
    } catch (error) {
      console.error('Error updating job status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update job status: ' + error.message,
        variant: 'destructive',
      });
    }
  };

  const viewJobDetails = (job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const addNewJobDescription = () => {
    navigate('/job-descriptions');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Saved Job Descriptions</CardTitle>
              <CardDescription>
                View and manage your parsed job descriptions
              </CardDescription>
            </div>
            <Button onClick={addNewJobDescription}>
              Add New Job Description
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : jobDescriptions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No job descriptions found</h3>
              <p className="text-gray-500 mt-2">
                You haven't parsed any job descriptions yet.
              </p>
              <Button onClick={addNewJobDescription} className="mt-4">
                Parse a Job Description
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Company</th>
                    <th className="py-3 px-4 text-left">Location</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Created</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobDescriptions.map((job) => (
                    <tr key={job.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{job.title}</td>
                      <td className="py-3 px-4">{job.company}</td>
                      <td className="py-3 px-4">{job.location || '-'}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={job.is_active ? "success" : "secondary"}
                          className={job.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {job.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(job.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => viewJobDetails(job)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleJobStatus(job.id, job.is_active)}
                          >
                            {job.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(job.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedJob?.title}</DialogTitle>
                <DialogDescription>
                  {selectedJob?.company} • {selectedJob?.location}
                </DialogDescription>
              </DialogHeader>
              
              {selectedJob && (
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-1">{selectedJob.description}</p>
                  </div>
                  
                  {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Responsibilities</h3>
                      <ul className="mt-1 list-disc pl-5">
                        {selectedJob.responsibilities.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedJob.requirements && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Requirements</h3>
                      
                      {selectedJob.requirements.skills && selectedJob.requirements.skills.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-gray-500">Skills</h4>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {selectedJob.requirements.skills.map((skill, i) => (
                              <Badge key={i} variant={skill.required ? "default" : "outline"}>
                                {skill.name} {skill.level ? `(${skill.level})` : ''}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedJob.requirements.experience && selectedJob.requirements.experience.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-gray-500">Experience</h4>
                          <ul className="mt-1 list-disc pl-5">
                            {selectedJob.requirements.experience.map((exp, i) => (
                              <li key={i}>
                                {exp.years} years in {exp.field}
                                {exp.required ? ' (Required)' : ''}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {selectedJob.requirements.education && selectedJob.requirements.education.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-gray-500">Education</h4>
                          <ul className="mt-1 list-disc pl-5">
                            {selectedJob.requirements.education.map((edu, i) => (
                              <li key={i}>
                                {edu.level} in {edu.field}
                                {edu.required ? ' (Required)' : ''}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Benefits</h3>
                      <ul className="mt-1 list-disc pl-5">
                        {selectedJob.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedJob.salary && (Object.keys(selectedJob.salary).length > 0) && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                      <p className="mt-1">
                        {selectedJob.salary.min && selectedJob.salary.max ? 
                          `${selectedJob.salary.min} - ${selectedJob.salary.max}` : 
                          selectedJob.salary.min || selectedJob.salary.max || 'Not specified'}
                        {selectedJob.salary.currency ? ` ${selectedJob.salary.currency}` : ''}
                        {selectedJob.salary.period ? ` (${selectedJob.salary.period})` : ''}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Application Deadline</h3>
                      <p className="mt-1">{selectedJob.application_deadline || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Posted Date</h3>
                      <p className="mt-1">{selectedJob.posted_date || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  {selectedJob.keywords && selectedJob.keywords.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Keywords</h3>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedJob.keywords.map((keyword, i) => (
                          <Badge key={i} variant="outline">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

