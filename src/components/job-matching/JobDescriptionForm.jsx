
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export function JobDescriptionForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null); // 'success', 'error', null
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jobDescription.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a job description',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setApiStatus(null);
    setParsedData(null);
    
    try {
      // Call the job description parser function
      const response = await supabase.functions.invoke('job-description-parser', {
        body: { fileContent: jobDescription }
      });
      
      if (response.error) {
        console.error('Supabase function error:', response.error);
        throw new Error(response.error.message || 'Error calling job description parser');
      }
      
      const data = response.data;
      
      // Check if the response contains an error
      if (data && data.error) {
        console.error('Parser function returned error:', data);
        
        if (data.status === 'configuration_error') {
          throw new Error('OpenAI API key is not configured. Please add it to your Supabase Edge Function secrets.');
        } else if (data.status === 'authentication_error') {
          throw new Error('Invalid OpenAI API key. Please check your API key and try again.');
        } else if (data.status === 'quota_error') {
          throw new Error('Your OpenAI API key has insufficient quota. Please check your usage limits.');
        } else {
          throw new Error(data.error);
        }
      }
      
      setParsedData(data);
      setApiStatus('success');
      
      // Save to database
      const { error: saveError } = await supabase.from('job_descriptions').insert({
        title: data.title || 'Untitled Position',
        company: data.company || 'Unknown Company',
        location: data.location,
        employment_type: data.employment_type,
        work_mode: data.work_mode,
        description: data.description,
        responsibilities: data.responsibilities || [],
        requirements: data.requirements || {},
        benefits: data.benefits || [],
        salary: data.salary || {},
        application_deadline: data.application_deadline,
        posted_date: data.posted_date,
        keywords: data.keywords || []
      });
      
      if (saveError) {
        toast({
          title: 'Job description parsed successfully',
          description: 'But there was an error saving to database: ' + saveError.message,
          variant: 'warning',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Job description parsed and saved successfully',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Error parsing job description:', error);
      setApiStatus('error');
      toast({
        title: 'Error',
        description: 'Failed to parse job description: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Job Description Parser</CardTitle>
          <CardDescription>
            Parse job descriptions to extract structured information for matching with candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Enter Job Description
              </label>
              <Textarea
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  'Parse Job Description'
                )}
              </Button>
              
              {apiStatus === 'success' && (
                <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-md">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>OpenAI API is working properly!</span>
                </div>
              )}
              
              {apiStatus === 'error' && (
                <div className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-md">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>Error connecting to OpenAI API. Check console for details.</span>
                </div>
              )}
            </div>
          </form>
          
          {parsedData && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Parsed Job Description</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(parsedData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
