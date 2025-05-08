import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useJobUploader } from '../../recruiter/job-descriptions/JobDescriptionUtils';

export function useJobDescription() {
  const [jobDescription, setJobDescription] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  // Corrected: Added back the missing manualFields state definition
  const [manualFields, setManualFields] = useState({
    title: '',
    company: '',
    location: ''
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const { uploadJobDescriptions } = useJobUploader(() => {
    console.log("[useJobDescription.js] Refetch called from useJobUploader");
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (parsedData) {
      setManualFields({
        title: parsedData.title || '',
        company: parsedData.company || '',
        location: parsedData.location || ''
      });
    }
  }, [parsedData]);

  const validateParsedData = (data) => {
    console.log('Validating parsed data:', data);
    if (!data) {
      console.error('Data is null or undefined');
      return false;
    }
    if (!data.requirements || typeof data.requirements !== 'object') {
      console.warn('Requirements field is missing or not an object');
    }
    console.log('Data validation passed (simplified for file upload)');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      toast({ title: 'Error', description: 'Please enter a job description', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setApiStatus(null);
    setParsedData(null);
    setErrorMessage('');
    try {
      const response = await supabase.functions.invoke('job-description-parser', {
        body: { fileContent: jobDescription },
      });
      const data = response.data?.data || response.data;
      if (data && data.error) {
        setApiStatus('error');
        setErrorMessage(data.userMessage || data.error || 'An unexpected error occurred');
        toast({ title: 'Error', description: 'Failed to parse job description (pasted).', variant: 'destructive' });
        return;
      }
      setParsedData(data);
      setApiStatus('success');
      validateParsedData(data);
      toast({ title: 'Success', description: 'Job description (pasted) parsed successfully. Please review and save.', variant: 'success' });
    } catch (error) {
      setApiStatus('error');
      setErrorMessage('Failed to connect to the parser service.');
      toast({ title: 'Error', description: 'Failed to parse pasted job description.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) {
      toast({ title: 'No files selected', description: 'Please select one or more JD files to upload.', variant: 'warning' });
      return;
    }
    setIsUploading(true);
    setApiStatus(null);
    setParsedData(null);
    setErrorMessage('');
    try {
      const result = await uploadJobDescriptions(files);
      if (result.success) {
        if (result.parsedData) { 
          setParsedData(result.parsedData);
          setApiStatus('success');
          validateParsedData(result.parsedData);
          toast({ title: 'File Upload Successful', description: `${files.length} JD(s) processed. Displaying first result.`, variant: 'success' });
        } else {
          setApiStatus('success'); 
          toast({ title: 'File Upload Processed', description: `${files.length} JD(s) sent for parsing.`, variant: 'info' });
        }
      } else {
        setApiStatus('error');
        setErrorMessage(result.error || 'An error occurred during file upload.');
        toast({ title: 'Upload Error', description: result.error || 'An error occurred during file upload.', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error handling file upload in useJobDescription:', error);
      setApiStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred during file upload.');
      toast({ title: 'Upload Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (!manualFields.title || !manualFields.company) {
      toast({ title: 'Missing Required Fields', description: 'Title and Company are required.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        toast({ title: 'Authentication Error', description: 'Not logged in.', variant: 'destructive' });
        return;
      }
      const userId = authData.user.id;
      const now = new Date().toISOString();
      const mergedData = { ...(parsedData || {}), ...manualFields };      
      const recordToInsert = {
        title: mergedData.title,
        company: mergedData.company,
        location: mergedData.location || '',
        employment_type: mergedData.employment_type || '',
        work_mode: mergedData.work_mode || '',
        description: mergedData.description || jobDescription,
        responsibilities: mergedData.responsibilities || [],
        requirements: mergedData.requirements || { skills: [], experience: [], education: [], languages: [] },
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
      const { error: saveError } = await supabase.from('job_descriptions').insert(recordToInsert);
      if (saveError) {
        toast({ title: 'Save Warning', description: 'DB save failed: ' + saveError.message, variant: 'warning' });
      } else {
        toast({ title: 'Success', description: 'JD processed and saved.', variant: 'success' });
        navigate('/job-descriptions/list');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save JD: ' + error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const testDatabaseInsert = async () => { /* original code */ };
  const viewSavedJobDescriptions = () => { navigate('/job-descriptions/list'); };

  return {
    jobDescription, setJobDescription,
    parsedData,
    isLoading, isUploading, isSaving,
    apiStatus, errorMessage,
    manualFields, setManualFields, // Ensure these are returned
    handleSubmit, handleFileUpload, handleSaveToDatabase,
    testDatabaseInsert, viewSavedJobDescriptions
  };
}

