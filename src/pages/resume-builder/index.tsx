
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

// Improved function to safely log objects - preventing circular references
const safeConsoleLog = (label: string, data: any) => {
  try {
    // Only process objects, pass through primitives directly
    if (data === null || data === undefined || typeof data !== 'object') {
      return;
    }
    
    // Create a simplified copy with only primitive values
    const seen = new WeakSet();
    const getSimplifiedCopy = (obj: any): any => {
      // Handle primitive values directly
      if (obj === null || obj === undefined || typeof obj !== 'object') {
        return obj;
      }
      
      // Prevent circular references
      if (seen.has(obj)) {
        return '[Circular Reference]';
      }
      seen.add(obj);
      
      try {
        // Handle arrays
        if (Array.isArray(obj)) {
          return obj.map(item => getSimplifiedCopy(item));
        }
        
        // Handle regular objects
        const result: Record<string, any> = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Skip functions and DOM nodes
            if (typeof obj[key] === 'function' || 
                (obj[key] && obj[key].nodeType)) {
              result[key] = `[${typeof obj[key]}]`;
            } else {
              result[key] = getSimplifiedCopy(obj[key]);
            }
          }
        }
        return result;
      } catch (err) {
        return `[Unserializable: ${err.message}]`;
      }
    };
    
    // Create a safe copy and log it
    const simplifiedData = getSimplifiedCopy(data);
    console.log(`${label}:`, simplifiedData);
  } catch (error) {
    console.log(`Error logging data for ${label}:`, error.message);
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

  // Replace console overrides with a safer implementation
  useEffect(() => {
    const originalConsoleInfo = console.info;
    const originalConsoleLog = console.log;
    let isOverrideActive = false;
    
    console.info = function(...args) {
      if (isOverrideActive) {
        // Prevent recursion - use original directly
        originalConsoleInfo.apply(console, args);
        return;
      }
      
      try {
        isOverrideActive = true;
        
        // Handle objects more safely
        if (args.length > 1 && typeof args[1] === 'object' && args[1] !== null) {
          // Log simple messages directly
          originalConsoleInfo.call(console, args[0]);
          // Log complex objects separately with safe function
          safeConsoleLog(args[0], args[1]);
        } else {
          // For simple arguments, use the original method
          originalConsoleInfo.apply(console, args);
        }
      } catch (error) {
        // In case of any error, log it but don't recurse
        originalConsoleInfo.call(console, "Error in console.info override:", error);
      } finally {
        isOverrideActive = false;
      }
    };

    console.log = function(...args) {
      if (isOverrideActive) {
        // Prevent recursion - use original directly
        originalConsoleLog.apply(console, args);
        return;
      }
      
      try {
        isOverrideActive = true;
        
        // Handle objects more safely
        if (args.length > 1 && typeof args[1] === 'object' && args[1] !== null) {
          // Log simple messages directly
          originalConsoleLog.call(console, args[0]);
          // Log complex objects separately with safe function
          safeConsoleLog(args[0], args[1]);
        } else {
          // For simple arguments, use the original method
          originalConsoleLog.apply(console, args);
        }
      } catch (error) {
        // In case of any error, log it but don't recurse
        originalConsoleLog.call(console, "Error in console.log override:", error);
      } finally {
        isOverrideActive = false;
      }
    };

    // Restore the original console methods when component unmounts
    return () => {
      console.info = originalConsoleInfo;
      console.log = originalConsoleLog;
    };
  }, []);

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
