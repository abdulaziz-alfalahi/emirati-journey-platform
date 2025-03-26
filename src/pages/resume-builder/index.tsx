import React, { useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useResume } from '@/context/ResumeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate } from '@/components/resume/types';
import { toast } from 'sonner';

const defaultTemplate: ResumeTemplate = {
  id: 'professional',
  name: 'Professional',
  description: 'A clean, professional layout ideal for corporate positions',
  sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications']
};

const ResumeBuilderPage = () => {
  const { user, isLoading } = useAuth();
  const { resumeData, setResumeData, isResumeEmpty } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false);

  useEffect(() => {
    const checkForLinkedInAuth = async () => {
      const query = new URLSearchParams(location.search);
      const linkedInAuth = query.get('linkedin_auth');
      
      if (linkedInAuth === 'true') {
        setIsProcessingLinkedIn(true);
        
        try {
          // The context already loads from localStorage, so we don't need to do it again
          if (!isResumeEmpty) {
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
  }, [location, isLoading, navigate, isResumeEmpty]);

  // No need for the second useEffect that loads from localStorage
  // as the ResumeContext now handles that automatically

  if (isLoading || isProcessingLinkedIn) {
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
