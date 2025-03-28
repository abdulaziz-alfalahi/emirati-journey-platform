
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function useJobDescription() {
  const [jobDescription, setJobDescription] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [apiStatus, setApiStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [manualFields, setManualFields] = useState({
    title: '',
    company: '',
    location: ''
  });
  
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

  // Update manual fields when parsed data changes
  useEffect(() => {
    if (parsedData) {
      setManualFields({
        title: parsedData.title || '',
        company: parsedData.company || '',
        location: parsedData.location || ''
      });
    }
  }, [parsedData]);

  // Validate the parsed data structure
  const validateParsedData = (data) => {
    console.log('Validating parsed data:', data);
    
    if (!data) {
      console.error('Data is null or undefined');
      return false;
    }
    
    // Check if requirements object has the expected structure
    if (!data.requirements || typeof data.requirements !== 'object') {
      console.warn('Requirements field is missing or not an object');
      return true; // Allow save without requirements
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
        toast({
          title: 'Success',
          description: 'Job description parsed successfully. Please review and save.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Partial Success',
          description: 'Job description was parsed but the data structure is incomplete.',
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
  const handleSaveToDatabase = async () => {
    // Check if required fields are populated
    if (!manualFields.title || !manualFields.company) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please ensure Title and Company fields are filled in',
        variant: 'destructive',
      });
      return;
    }
    
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
      
      // Merge parsed data with manual fields
      const mergedData = {
        ...(parsedData || {}),
        title: manualFields.title,
        company: manualFields.company,
        location: manualFields.location
      };
      
      // Create the record object with all required fields
      const recordToInsert = {
        title: mergedData.title,
        company: mergedData.company,
        location: mergedData.location || '',
        employment_type: mergedData.employment_type || '',
        work_mode: mergedData.work_mode || '',
        description: mergedData.description || '',
        responsibilities: mergedData.responsibilities || [],
        requirements: mergedData.requirements || {},
        benefits: mergedData.benefits || [],
        salary: mergedData.salary || {},
        application_deadline: mergedData.application_deadline || null,
        posted_date: mergedData.posted_date || null,
        keywords: mergedData.keywords || [],
        is_active: true,
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
        
        // Navigate to the list view
        navigate('/job-descriptions/list');
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

  // Navigate to job descriptions list page
  const viewSavedJobDescriptions = () => {
    navigate('/job-descriptions/list');
  };

  return {
    jobDescription,
    setJobDescription,
    parsedData,
    isLoading,
    isSaving,
    apiStatus,
    errorMessage,
    manualFields,
    setManualFields,
    handleSubmit,
    handleSaveToDatabase,
    testDatabaseInsert,
    viewSavedJobDescriptions
  };
}
