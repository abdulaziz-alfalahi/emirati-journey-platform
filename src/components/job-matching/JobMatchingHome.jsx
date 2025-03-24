
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, FileText, Users, Briefcase } from 'lucide-react';

export function JobMatchingHome() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Emirati Journey Platform - Job Matching</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Resume Parsing</CardTitle>
            <CardDescription>
              Upload and parse resumes to extract structured information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Our enhanced resume parser extracts key information from resumes including:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-500 mb-4">
              <li>Personal information and contact details</li>
              <li>Work experience and job history</li>
              <li>Education and qualifications</li>
              <li>Skills and competencies</li>
              <li>Languages and certifications</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/resume-builder')}>
              Go to Resume Builder
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
            <p className="text-sm text-gray-500 mb-4">
              Our job description parser extracts structured information including:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-500 mb-4">
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
            Match candidates with job opportunities and vice versa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="candidates">
            <TabsList className="mb-4">
              <TabsTrigger value="candidates">
                <Users className="mr-2 h-4 w-4" />
                Candidates to Jobs
              </TabsTrigger>
              <TabsTrigger value="jobs">
                <Briefcase className="mr-2 h-4 w-4" />
                Jobs to Candidates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="candidates">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Find the Best Job Matches for Candidates</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Select a candidate and find the most compatible job opportunities based on their skills, experience, education, and other factors.
                </p>
                <Button onClick={() => navigate('/matching?tab=candidates')}>
                  Match Candidates to Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="jobs">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Find the Best Candidates for Jobs</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Select a job opening and find the most compatible candidates based on the job requirements and candidate profiles.
                </p>
                <Button onClick={() => navigate('/matching?tab=jobs')}>
                  Match Jobs to Candidates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
