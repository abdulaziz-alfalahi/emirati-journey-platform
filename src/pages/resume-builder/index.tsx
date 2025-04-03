
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useResume } from '@/context/ResumeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate, ResumeData } from '@/components/resume/types';
import { toast } from 'sonner';
import { getResumeData } from '@/services/resumeParserService';

const defaultTemplate: ResumeTemplate = {
  id: 'professional',
  name: 'Professional',
  description: 'A clean, professional layout ideal for corporate positions',
  sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications']
};

// Default empty ResumeData for use when data is partial
const emptyResumeData: ResumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  metadata: {
    parsingMethod: 'manual',
    parsedAt: new Date().toISOString(),
  }
};

const ResumeBuilderPage = () => {
  const { user, isLoading } = useAuth();
  const { resumeData, setResumeData, isResumeEmpty } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  // Debug log to verify data
  console.log('ResumeBuilderPage: Current resumeData:', resumeData ? 'present' : 'not present');

  // Check for resume ID in URL params
  useEffect(() => {
    const checkForResumeId = async () => {
      const params = new URLSearchParams(location.search);
      const resumeId = params.get('resume_id');
      
      if (resumeId && user) {
        setIsLoadingResume(true);
        try {
          const data = await getResumeData(resumeId);
          if (data) {
            // Ensure we provide complete ResumeData by merging with empty data
            setResumeData({
              ...emptyResumeData,
              ...data,
              // If personal is partial, merge with empty personal
              personal: {
                ...emptyResumeData.personal,
                ...(data.personal || {})
              }
            });
            toast.success("Resume Loaded", {
              description: "Your resume data has been loaded successfully."
            });
          }
        } catch (error) {
          console.error("Error loading resume data:", error);
          toast.error("Failed to Load Resume", {
            description: "There was a problem loading your resume data."
          });
        } finally {
          setIsLoadingResume(false);
          // Remove resume_id from URL without causing navigation
          navigate('/resume-builder', { replace: true });
        }
      }
    };
    
    if (!isLoading && user) {
      checkForResumeId();
    }
  }, [user, location.search, isLoading, navigate, setResumeData]);

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

  if (isLoading || isProcessingLinkedIn || isLoadingResume) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
          {isProcessingLinkedIn && (
            <p className="ml-3 text-gray-600" aria-live="polite">
              Processing LinkedIn data...
            </p>
          )}
          {isLoadingResume && (
            <p className="ml-3 text-gray-600" aria-live="polite">
              Loading resume data...
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
