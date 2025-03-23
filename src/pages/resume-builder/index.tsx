
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate, ResumeData } from '@/components/resume/types';
import { mergeResumeData } from '@/components/resume/utils/resumeDataUtils';
import { toast } from 'sonner';

const ResumeBuilderPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  
  // Default template (Professional)
  const defaultTemplate: ResumeTemplate = {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, professional layout ideal for corporate positions',
    sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications']
  };

  // Check for LinkedIn OAuth redirect
  useEffect(() => {
    const checkForLinkedInAuth = async () => {
      const query = new URLSearchParams(location.search);
      const linkedInAuth = query.get('linkedin_auth');
      
      if (linkedInAuth === 'true') {
        setIsProcessingLinkedIn(true);
        
        try {
          // For now, we'll just load the saved resume data from localStorage
          // This is a simplified version as we're fixing the loading issue
          const savedResume = localStorage.getItem("savedResume");
          
          if (savedResume) {
            try {
              const parsedData = JSON.parse(savedResume);
              setResumeData(parsedData);
              
              toast.success("Resume Data Loaded", {
                description: "Your saved resume data has been loaded successfully.",
                duration: 3000,
              });
            } catch (parseError) {
              console.error("Error parsing saved resume:", parseError);
              toast.error("Error Loading Resume", {
                description: "Failed to load your saved resume data.",
                duration: 5000,
              });
            }
          }
          
          // Remove the query parameter from URL
          navigate('/resume-builder', { replace: true });
        } catch (error) {
          console.error('Error processing LinkedIn authentication:', error);
          toast.error("LinkedIn Import Failed", {
            description: error instanceof Error ? error.message : "Failed to import LinkedIn data",
            duration: 5000,
          });
        } finally {
          setIsProcessingLinkedIn(false);
        }
      }
    };
    
    if (!isLoading) {
      checkForLinkedInAuth();
    }
  }, [location, isLoading, navigate]);
  
  // Load saved resume on component mount if not already loaded from LinkedIn auth
  useEffect(() => {
    if (!resumeData && !isProcessingLinkedIn) {
      const savedResume = localStorage.getItem("savedResume");
      if (savedResume) {
        try {
          setResumeData(JSON.parse(savedResume));
        } catch (error) {
          console.error("Error parsing saved resume:", error);
        }
      }
    }
  }, [resumeData, isProcessingLinkedIn]);

  // If loading, show loading spinner
  if (isLoading || isProcessingLinkedIn) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
          {isProcessingLinkedIn && (
            <p className="ml-3 text-gray-600">Processing LinkedIn data...</p>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ResumeBuilder 
        template={defaultTemplate} 
        onBack={() => navigate(-1)} 
        initialData={resumeData}
      />
    </Layout>
  );
};

export default ResumeBuilderPage;
