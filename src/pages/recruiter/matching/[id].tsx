
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, Filter, MessageSquare, ThumbsDown, ThumbsUp, Video } from 'lucide-react';

// Import the Json type from Supabase types
import { Json } from '@/integrations/supabase/types';

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

const JobMatchingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matchThreshold, setMatchThreshold] = useState(50);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  // Fetch job description
  const { data: jobDescription, isLoading: isLoadingJob } = useQuery({
    queryKey: ['jobDescription', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Find matching candidates on load
  useEffect(() => {
    if (jobDescription) {
      handleFindMatches();
    }
  }, [jobDescription]);

  // Fetch matching candidates for job
  const handleFindMatches = async () => {
    if (!id) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No job ID provided.',
      });
      return;
    }

    setIsMatching(true);
    
    try {
      // Call match-resume-job edge function to find matching candidates
      const response = await supabase.functions.invoke('match-resume-job', {
        body: {
          jobData: jobDescription,
          jobId: id,
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

  // Function to safely render job description fields that might be in different formats
  const renderJobDescriptionText = (text: any): string => {
    if (typeof text === 'string') return text;
    if (Array.isArray(text)) return text.map(item => String(item)).join(', ');
    if (text && typeof text === 'object') return JSON.stringify(text);
    return 'No description available.';
  };

  // Function to safely render requirement items
  const renderRequirements = () => {
    if (!jobDescription?.requirements) return null;
    
    let requirements: string[] = [];
    
    // Handle different formats of requirements data
    if (Array.isArray(jobDescription.requirements)) {
      // Convert all items to strings to handle Json array that might contain numbers
      requirements = (jobDescription.requirements as Json[]).map(item => String(item));
    } else if (typeof jobDescription.requirements === 'string') {
      requirements = [jobDescription.requirements];
    } else if (jobDescription.requirements && typeof jobDescription.requirements === 'object') {
      // Try to extract an array if possible
      const reqObj = jobDescription.requirements as Record<string, Json>;
      if (reqObj.skills && Array.isArray(reqObj.skills)) {
        requirements = (reqObj.skills as Json[]).map((skill: Json) => 
          typeof skill === 'string' ? skill : 
          typeof skill === 'object' && skill !== null && 'name' in skill ? String(skill.name) : 
          String(skill)
        );
      } else {
        // If it's an object but not in the expected format, convert to string
        requirements = [JSON.stringify(jobDescription.requirements)];
      }
    }
    
    if (requirements.length === 0) return null;
    
    return (
      <div>
        <h3 className="font-medium mb-2">Requirements</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/recruiter')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-3xl font-bold">Matching Candidates</h1>
        </div>
        
        {isLoadingJob ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{jobDescription?.title || 'Job Description'}</CardTitle>
                <CardDescription>
                  {jobDescription?.company ? `at ${jobDescription.company}` : ''} 
                  {jobDescription?.location ? ` • ${jobDescription.location}` : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Job Description</h3>
                    <p className="text-sm">{renderJobDescriptionText(jobDescription?.description)}</p>
                  </div>
                  
                  {renderRequirements()}
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Minimum Match Score: {matchThreshold}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={matchThreshold}
                        onChange={(e) => setMatchThreshold(parseInt(e.target.value))}
                        className="w-full max-w-xs"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleFindMatches} 
                      disabled={isMatching}
                    >
                      {isMatching ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Finding...
                        </>
                      ) : (
                        <>Refresh Matches</>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
                {candidates.length > 0 ? (
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
                ) : (
                  <div className="py-20 text-center">
                    <div className="text-muted-foreground">
                      {isMatching ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
                          <p>Finding matching candidates...</p>
                        </div>
                      ) : (
                        <p>No matching candidates found. Try adjusting the match threshold.</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default JobMatchingPage;
