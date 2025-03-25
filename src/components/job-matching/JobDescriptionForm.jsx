
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertTriangle, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function JobDescriptionForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');
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
    setErrorMessage('');
    
    try {
      // Call the job description parser function
      const response = await supabase.functions.invoke('job-description-parser', {
        body: { fileContent: jobDescription }
      });
      
      const data = response.data;
      
      // Check if the response contains an error
      if (data && data.error) {
        console.error('Parser function returned error:', data);
        setApiStatus('error');
        
        // Set a user-friendly error message based on the error status
        if (data.userMessage) {
          setErrorMessage(data.userMessage);
        } else if (data.status === 'configuration_error') {
          setErrorMessage('OpenAI API key is not configured. Please add it to your Supabase Edge Function secrets.');
        } else if (data.status === 'authentication_error') {
          setErrorMessage('Invalid OpenAI API key. Please check your API key and try again.');
        } else if (data.status === 'quota_error') {
          setErrorMessage('Your OpenAI API key has reached its usage limit. Please check your billing details on the OpenAI website or try using a different API key.');
        } else {
          setErrorMessage(data.error || 'An unexpected error occurred');
        }
        
        toast({
          title: 'Error',
          description: 'Failed to parse job description. See details below.',
          variant: 'destructive',
        });
        
        return;
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
      setErrorMessage('Failed to connect to the parser service. Please try again later.');
      
      toast({
        title: 'Error',
        description: 'Failed to parse job description. See details below.',
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
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-5 w-5" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    OpenAI API is working properly! Job description has been successfully parsed.
                  </AlertDescription>
                </Alert>
              )}
              
              {apiStatus === 'error' && (
                <Alert className="bg-red-50 text-red-800 border-red-200">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="flex flex-col gap-2">
                    {errorMessage || 'Error connecting to OpenAI API. Check console for details.'}
                    
                    {errorMessage && errorMessage.includes('quota') && (
                      <div className="mt-2">
                        <p className="font-medium">Possible solutions:</p>
                        <ul className="list-disc pl-5 mt-1">
                          <li>Check your OpenAI API key billing status</li>
                          <li>Upgrade your OpenAI plan if needed</li>
                          <li>Add payment method to your OpenAI account</li>
                          <li>Generate a new API key if your current one is compromised</li>
                        </ul>
                        <a 
                          href="https://platform.openai.com/account/billing/overview" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-700 hover:underline mt-2"
                        >
                          Visit OpenAI Billing Page <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
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
