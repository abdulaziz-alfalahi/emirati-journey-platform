
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobExplorer from './JobExplorer';

export function JobMatchingHome() {
  const navigate = useNavigate();
  
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
