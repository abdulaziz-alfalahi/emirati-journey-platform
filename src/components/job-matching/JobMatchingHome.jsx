
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, FileText, Users, Briefcase, Building } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import JobExplorer from './JobExplorer';

export function JobMatchingHome() {
  const navigate = useNavigate();
  const { user, roles } = useAuth();
  
  // Check if user has recruiter role or email
  const isRecruiter = roles.includes('private_sector_recruiter') || 
                      (user?.email && user.email.includes('recruit'));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Career Exploration</h1>
      
      <Tabs defaultValue="explore" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
          <TabsTrigger value="explore">Explore Careers</TabsTrigger>
          <TabsTrigger value="tools">Career Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="explore" className="space-y-6">
          <JobExplorer />
        </TabsContent>
        
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CV Parsing</CardTitle>
                <CardDescription>
                  Upload and enhance your CV for better job matching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our enhanced CV parser extracts key information from CVs including:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mb-4">
                  <li>Personal information and contact details</li>
                  <li>Work experience and job history</li>
                  <li>Education and qualifications</li>
                  <li>Skills and competencies</li>
                  <li>Languages and certifications</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/cv-builder')}>
                  Go to Portfolio Builder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Job Description Management</CardTitle>
                <CardDescription>
                  Create and manage job descriptions for matching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our job description parser extracts structured information including:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mb-4">
                  <li>Job title, company, and location</li>
                  <li>Employment type and work mode</li>
                  <li>Responsibilities and requirements</li>
                  <li>Required skills, experience, and education</li>
                  <li>Benefits and compensation details</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/job-descriptions')}>
                  Manage Job Descriptions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Matching Dashboard</CardTitle>
              <CardDescription>
                Find the right opportunities by matching candidates and jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-md bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Candidate to Jobs</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find the most compatible job opportunities based on a candidate's skills, experience, education, and other factors.
                  </p>
                  <Button onClick={() => navigate('/matching?tab=candidates')} className="w-full">
                    Match Candidates to Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4 border rounded-md bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Job to Candidates</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find the most compatible candidates based on job requirements and candidate profiles.
                  </p>
                  <Button onClick={() => navigate('/matching?tab=jobs')} className="w-full">
                    Match Jobs to Candidates
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {isRecruiter && (
                <div className="mt-6 p-4 border rounded-md bg-primary/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Recruiter Dashboard</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access the comprehensive recruiter dashboard to manage job listings and find candidates that match your specific job requirements.
                  </p>
                  <Button onClick={() => navigate('/recruiter')} variant="outline" className="w-full">
                    Go to Recruiter Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
