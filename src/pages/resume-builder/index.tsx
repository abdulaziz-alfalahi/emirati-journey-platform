
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate, ResumeData } from '@/components/resume/types';
import { importFromLinkedIn, mergeResumeData } from '@/components/resume/utils/resumeParser';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
          // Get the session to access the access token
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          if (!session) {
            throw new Error('No active session found after LinkedIn authentication');
          }
          
          // Get saved resume data from local storage
          let existingData: ResumeData = {
            personal: {
              fullName: "",
              jobTitle: "",
              email: "",
              phone: "",
              location: "",
              linkedin: "",
              website: ""
            },
            summary: "",
            experience: [],
            education: [],
            skills: [],
            languages: [],
            certifications: [],
            projects: [],
            achievements: []
          };
          
          const savedResume = localStorage.getItem("savedResume");
          if (savedResume) {
            try {
              existingData = JSON.parse(savedResume);
            } catch (parseError) {
              console.error("Error parsing saved resume:", parseError);
            }
          }
          
          // Get LinkedIn provider token
          const provider = session.user.app_metadata.provider;
          if (provider === 'linkedin_oidc') {
            const accessToken = session.provider_token;
            
            if (!accessToken) {
              throw new Error('No LinkedIn access token found');
            }
            
            // Get user email for LinkedIn URL construction
            const email = session.user.email;
            const linkedInUrl = `https://linkedin.com/in/${email?.split('@')[0] || 'user'}`;
            
            toast.loading("Importing LinkedIn Data", {
              description: "Retrieving your professional information...",
              duration: 3000,
            });
            
            // Import data from LinkedIn using the access token
            const linkedInData = await importFromLinkedIn(linkedInUrl, accessToken);
            
            // Merge with existing data
            const mergedData = mergeResumeData(existingData, linkedInData);
            
            // Save merged data to local storage
            localStorage.setItem("savedResume", JSON.stringify(mergedData));
            
            setResumeData(mergedData);
            
            toast.success("LinkedIn Import Complete", {
              description: "Your LinkedIn profile data has been imported successfully.",
              duration: 3000,
            });
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
