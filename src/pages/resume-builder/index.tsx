
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useResume } from '@/context/ResumeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate } from '@/components/resume/types';
import { toast } from 'sonner';
import { getResumeData } from '@/services/resumeParserService';

const defaultTemplate: ResumeTemplate = {
  id: 'professional',
  name: 'Professional',
  description: 'A clean, professional layout ideal for corporate positions',
  sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications']
};

const ResumeBuilderPage = () => {
  const { user, isLoading } = useAuth();
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoadingResume, setIsLoadingResume] = useState(false);

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
            toast.success("Resume Loaded");
          }
        } catch (error) {
          console.error("Error loading resume data:", error);
          toast.error("Failed to Load Resume");
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
  }, [user, location.search, isLoading, navigate]);

  if (isLoading || isLoadingResume) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
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
