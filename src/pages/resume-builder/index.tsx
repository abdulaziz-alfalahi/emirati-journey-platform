
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate, ResumeData } from '@/components/resume/types';
import { toast } from 'sonner';

const defaultTemplate: ResumeTemplate = {
  id: 'professional',
  name: 'Professional',
  description: 'A clean, professional layout ideal for corporate positions',
  sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications']
};

const getSavedResume = (): ResumeData | null => {
  try {
    const savedResume = localStorage.getItem("savedResume");
    return savedResume ? JSON.parse(savedResume) : null;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

const ResumeBuilderPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isResumeLoading, setIsResumeLoading] = useState(false);

  useEffect(() => {
    const checkForLinkedInAuth = async () => {
      const query = new URLSearchParams(location.search);
      const linkedInAuth = query.get('linkedin_auth');
      
      if (linkedInAuth === 'true') {
        setIsProcessingLinkedIn(true);
        
        try {
          const savedResume = getSavedResume();
          if (savedResume) {
            setResumeData(savedResume);
            toast.success("Resume Data Loaded", {
              description: "Your saved resume data has been loaded successfully.",
              duration: 3000,
            });
          }
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

  useEffect(() => {
    if (!resumeData && !isProcessingLinkedIn) {
      setIsResumeLoading(true);
      const savedResume = getSavedResume();
      if (savedResume) {
        setResumeData(savedResume);
      }
      setIsResumeLoading(false);
    }
  }, [resumeData, isProcessingLinkedIn]);

  if (isLoading || isProcessingLinkedIn || isResumeLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
          {isProcessingLinkedIn && (
            <p className="ml-3 text-gray-600" aria-live="polite">
              Processing LinkedIn data...
            </p>
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
