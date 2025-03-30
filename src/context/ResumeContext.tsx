
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ResumeData } from '@/components/resume/types';

// Default empty resume data structure
const defaultResumeData: ResumeData = {
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
  interests: [],
  metadata: {
    parsingMethod: "manual",
    parsedAt: new Date().toISOString()
  }
};

// Context type definition
interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updateResumeSection: <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => void;
  resetResume: () => void;
  isResumeEmpty: boolean;
}

// Create the context with default values
export const ResumeContext = createContext<ResumeContextType>({
  resumeData: defaultResumeData,
  setResumeData: () => {}, // No-op function as default
  updateResumeSection: () => {}, // No-op function as default
  resetResume: () => {}, // No-op function as default
  isResumeEmpty: true
});

// Create a hook to use the resume context
export const useResume = () => useContext(ResumeContext);

// Provider component
export const ResumeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Initialize state with default or from localStorage if available
  const [resumeData, setResumeDataState] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const savedResume = localStorage.getItem("savedResume");
      if (savedResume) {
        try {
          const parsedData = JSON.parse(savedResume);
          console.log('Loaded resume data from localStorage');
          return parsedData;
        } catch (error) {
          console.error("Error parsing saved resume:", error);
        }
      }
    }
    return defaultResumeData;
  });

  // Calculate if resume is essentially empty
  const isResumeEmpty = !resumeData.personal.fullName && 
                        !resumeData.summary && 
                        resumeData.experience.length === 0 && 
                        resumeData.education.length === 0 && 
                        resumeData.skills.length === 0;

  // Safe wrapper for setResumeData to handle potential errors
  const setResumeData = (data: ResumeData) => {
    try {
      console.log('Context: setResumeData called with data:', data);
      setResumeDataState(data);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("savedResume", JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error in setResumeData:', error);
      // You could add toast notification here if needed
    }
  };

  // Helper to update just one section of the resume
  const updateResumeSection = <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => {
    console.log(`Updating resume section "${section}" with:`, data);
    setResumeData({
      ...resumeData,
      [section]: data,
      metadata: {
        ...(resumeData.metadata || {}),
        lastUpdated: new Date().toISOString(),
        updatedSection: section
      }
    });
  };

  // Reset resume to default empty state
  const resetResume = () => {
    setResumeData({
      ...defaultResumeData,
      metadata: {
        parsingMethod: "manual",
        parsedAt: new Date().toISOString(),
        reset: true
      }
    });
  };

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("savedResume", JSON.stringify(resumeData));
    }
  }, [resumeData]);

  return (
    <ResumeContext.Provider 
      value={{ 
        resumeData, 
        setResumeData, 
        updateResumeSection, 
        resetResume, 
        isResumeEmpty 
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;
