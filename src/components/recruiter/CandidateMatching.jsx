
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Filter, MessageSquare, ThumbsDown, ThumbsUp, Video } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  matchScore: number;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  status?: 'shortlisted' | 'rejected' | 'pending' | 'hired';
}

const CandidateMatching = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [matchThreshold, setMatchThreshold] = useState(50);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  // Fetch job descriptions
  const { data: jobDescriptions, isLoading: isLoadingJobs } = useQuery({
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

  // Fetch matching candidates for selected job
  const handleFindMatches = async () => {
    if (!selectedJob) {
      toast({
        variant: 'destructive',
        title: 'No Job Selected',
        description: 'Please select a job to find matching candidates.',
      });
      return;
    }

    setIsMatching(true);
    
    try {
      // Get job description
      const { data: jobData, error: jobError } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('id', selectedJob)
        .single();
      
      if (jobError) throw jobError;
      
      // Call match-resume-job edge function to find matching candidates
      const response = await supabase.functions.invoke('match-resume-job', {
        body: {
          jobData,
          jobId: selectedJob,
          threshold: matchThreshold
        }
      });
      
      if (response.error) throw response.error;
      
      // Transform response to candidate list
      const candidateMatches = response.data || [];
      const transformedCandidates: Candidate[] = candidateMatches.map((match: any) => ({
        id: match.candidateId,
        name: match.candidateName || 'Anonymous Candidate',
        matchScore: match.overallScore,
        skills: match.matchDetails?.skills?.matched || [],
        experience: match.matchDetails?.experience || 'Not specified',
        education: match.matchDetails?.education || 'Not specified',
        location: match.matchDetails?.location || 'Not specified',
        status: 'pending'
      }));
      
      setCandidates(transformedCandidates);
      
      toast({
        title: 'Candidates Found',
        description: `Found ${transformedCandidates.length} matching candidates.`,
      });
    } catch (error) {
      console.error('Error finding matching candidates:', error);
      toast({
        variant: 'destructive',
        title: 'Matching Failed',
        description: 'There was an error finding matching candidates.',
      });
    } finally {
      setIsMatching(false);
    }
  };

  // Handle candidate actions
  const handleCandidateAction = async (candidateId: string, action: 'shortlist' | 'reject' | 'message' | 'interview') => {
    // Update local state
    setCandidates(prev => 
      prev.map(candidate => {
        if (candidate.id === candidateId) {
          if (action === 'shortlist') {
            return { ...candidate, status: 'shortlisted' };
          } else if (action === 'reject') {
            return { ...candidate, status: 'rejected' };
          }
        }
        return candidate;
      })
    );
    
    // Handle different actions
    switch (action) {
      case 'shortlist':
        toast({
          title: 'Candidate Shortlisted',
          description: 'The candidate has been added to your shortlist.',
        });
        break;
      case 'reject':
        toast({
          title: 'Candidate Rejected',
          description: 'The candidate has been marked as rejected.',
        });
        break;
      case 'message':
        toast({
          title: 'Message Feature',
          description: 'Messaging functionality will be implemented soon.',
        });
        break;
      case 'interview':
        toast({
          title: 'Interview Scheduling',
          description: 'Interview scheduling will be implemented soon.',
        });
        break;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Candidate Matching</h2>
        <p className="text-muted-foreground">Find the best candidates for your job openings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Match Settings</CardTitle>
          <CardDescription>Select a job and find matching candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Job Description</label>
              <Select 
                value={selectedJob || ''} 
                onValueChange={(value) => setSelectedJob(value)}
                disabled={isLoadingJobs}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a job..." />
                </SelectTrigger>
                <SelectContent>
                  {jobDescriptions?.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Match Score: {matchThreshold}%</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={matchThreshold}
                onChange={(e) => setMatchThreshold(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleFindMatches} 
                disabled={!selectedJob || isMatching}
                className="w-full"
              >
                {isMatching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Finding...
                  </>
                ) : (
                  <>Find Matching Candidates</>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {candidates.length > 0 && (
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <div>
              <CardTitle>Matching Candidates</CardTitle>
              <CardDescription>{candidates.length} candidates found</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {candidates.map((candidate) => (
                <div 
                  key={candidate.id} 
                  className={`border rounded-lg p-4 ${
                    candidate.status === 'shortlisted' 
                      ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
                      : candidate.status === 'rejected' 
                        ? 'border-red-200 bg-red-50 dark:bg-red-950/20'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{candidate.name}</h3>
                        {candidate.status === 'shortlisted' && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Shortlisted
                          </Badge>
                        )}
                        {candidate.status === 'rejected' && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            Rejected
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                        {candidate.skills.length > 5 && (
                          <Badge variant="outline">+{candidate.skills.length - 5} more</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <span className="text-muted-foreground">Experience:</span>
                        <span>{candidate.experience}</span>
                        <span className="text-muted-foreground">Education:</span>
                        <span>{candidate.education}</span>
                        <span className="text-muted-foreground">Location:</span>
                        <span>{candidate.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold">{candidate.matchScore}%</div>
                      <div className="w-16 h-2 mt-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getScoreColor(candidate.matchScore)}`} 
                          style={{ width: `${candidate.matchScore}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Match Score</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 justify-end">
                    {candidate.status !== 'rejected' && (
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleCandidateAction(candidate.id, 'reject')}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    )}
                    
                    {candidate.status !== 'shortlisted' && (
                      <Button 
                        size="sm" 
                        variant="default" 
                        onClick={() => handleCandidateAction(candidate.id, 'shortlist')}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" /> Shortlist
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleCandidateAction(candidate.id, 'message')}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" /> Message
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleCandidateAction(candidate.id, 'interview')}
                    >
                      <Video className="h-4 w-4 mr-1" /> Schedule Interview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidateMatching;
