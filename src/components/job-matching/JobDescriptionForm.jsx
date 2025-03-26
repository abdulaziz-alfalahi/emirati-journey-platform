
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertTriangle, CheckCircle, AlertCircle, ExternalLink, Save, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

export function JobDescriptionForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [apiStatus, setApiStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data.user);
    };
    
    fetchUser();
  }, []);

  // Test database connection function
  const testDatabaseInsert = async () => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData.user?.id;
      
      const testRecord = {
        title: 'Test Job',
        company: 'Test Company', // Required field
        description: 'Test Description',
        requirements: { skills: [] },
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: userId
      };
      
      console.log('Attempting test insert with:', testRecord);
      
      const { data, error } = await supabase
        .from('job_descriptions')
        .insert(testRecord)
        .select();
      
      console.log('Test insert result:', { data, error });
      
      if (error) {
        console.error('Test insert error:', error);
        toast({
          title: 'Database Test Failed',
          description: 'Error: ' + error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Database Test Successful',
          description: 'Successfully inserted test record',
          variant: 'success',
        });
      }
    } catch (e) {
      console.error('Test insert exception:', e);
      toast({
        title: 'Database Test Exception',
        description: e.message,
        variant: 'destructive',
      });
    }
  };

  // Validate the parsed data structure
  const validateParsedData = (data) => {
    console.log('Validating parsed data:', data);
    
    if (!data) {
      console.error('Data is null or undefined');
      return false;
    }
    
    // Check for required fields
    const requiredFields = ['title', 'company', 'description'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
      return false;
    }
    
    // Check if requirements object has the expected structure
    if (!data.requirements || typeof data.requirements !== 'object') {
      console.warn('Requirements field is missing or not an object');
      return false;
    }
    
    console.log('Data validation passed');
    return true;
  };

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
      
      console.log('Raw response from parser:', response);
      
      // The data might be nested differently than you expect
      // It could be response.data or response.data.data depending on your parser implementation
      const data = response.data?.data || response.data;
      
      console.log('Extracted data for validation:', data);
      
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
      
      // Validate the parsed data before saving
      const isValid = validateParsedData(data);
      
      if (isValid) {
        await saveToDatabase(data);
      } else {
        toast({
          title: 'Partial Success',
          description: 'Job description was parsed but the data structure is incomplete. Database save was skipped.',
          variant: 'warning',
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

  // Separate function to save to database
  const saveToDatabase = async (data) => {
    setIsSaving(true);
    
    try {
      // Check authentication status
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        console.error('User not authenticated');
        toast({
          title: 'Authentication Error',
          description: 'You must be logged in to save job descriptions.',
          variant: 'destructive',
        });
        return;
      }
      
      const userId = authData.user.id;
      console.log('Authenticated user ID:', userId);
      
      // Get current timestamp
      const now = new Date().toISOString();
      
      // Create the record object with all required fields
      const recordToInsert = {
        title: data.title || 'Untitled Position',
        company: data.company || 'Unknown Company', // Required field in your schema
        location: data.location || '',
        employment_type: data.employment_type || '',
        work_mode: data.work_mode || '',
        description: data.description || '',
        responsibilities: data.responsibilities || [],
        requirements: data.requirements || {},
        benefits: data.benefits || [],
        salary: data.salary || {},
        application_deadline: data.application_deadline || null,
        posted_date: data.posted_date || null,
        keywords: data.keywords || [],
        // Add these missing fields:
        is_active: true,  // Set to true by default for new job descriptions
        created_at: now,
        updated_at: now,
        user_id: userId
      };
      
      console.log('Record to insert:', recordToInsert);
      
      // Save to database with all required fields
      const { data: insertedData, error: saveError } = await supabase
        .from('job_descriptions')
        .insert(recordToInsert)
        .select();
      
      console.log('Insert response:', { data: insertedData, error: saveError });
      
      if (saveError) {
        console.error('Database save error:', saveError);
        // More detailed error information
        if (saveError.code) {
          console.error('Error code:', saveError.code);
        }
        if (saveError.details) {
          console.error('Error details:', saveError.details);
        }
        if (saveError.hint) {
          console.error('Error hint:', saveError.hint);
        }
        
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
      console.error('Error saving to database:', error);
      toast({
        title: 'Error',
        description: 'Failed to save job description to database: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Navigate to job descriptions list page
  const viewSavedJobDescriptions = () => {
    navigate('/job-descriptions/list');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Job Description Parser</CardTitle>
              <CardDescription>
                Parse job descriptions to extract structured information for matching with candidates
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={testDatabaseInsert}
                className="flex items-center gap-2"
              >
                Test DB Connection
              </Button>
              <Button 
                variant="outline" 
                onClick={viewSavedJobDescriptions}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                View Saved Job Descriptions
              </Button>
            </div>
          </div>
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
                    ) }
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </form>
          
          {parsedData && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Parsed Job Description</h3>
                {validateParsedData(parsedData) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => saveToDatabase(parsedData)}
                    disabled={isSaving}
                    className="flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save to Database
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              {!validateParsedData(parsedData) && (
                <Alert className="mb-4 bg-amber-50 text-amber-800 border-amber-200">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle>Incomplete Data</AlertTitle>
                  <AlertDescription>
                    The parsed data is missing required fields. Database save is disabled.
                  </AlertDescription>
                </Alert>
              )}
              
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
