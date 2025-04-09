
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export interface Personal {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface CVData {
  personal: Personal;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  metadata?: {
    lastUpdated?: string;
    parsingMethod?: string;
    fileName?: string;
    fileType?: string;
  };
}

const initialCVData: CVData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: []
};

interface CVContextProps {
  cvData: CVData;
  updatePersonal: (data: Personal) => void;
  updateSummary: (summary: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (experience: Experience) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (education: Education) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  addLanguage: (language: Omit<Language, 'id'>) => void;
  updateLanguage: (language: Language) => void;
  removeLanguage: (id: string) => void;
  setCVData: (data: CVData) => void;
  saveCV: () => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
}

const CVContext = createContext<CVContextProps | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load CV data from local storage for now
    // This will be replaced with Supabase integration later
    const savedData = localStorage.getItem('cv-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as CVData;
        setCVData(parsedData);
        console.log('Loaded CV data from storage:', parsedData);
      } catch (error) {
        console.error('Error loading CV data from storage:', error);
        toast.error('Error loading saved CV data');
      }
    }
  }, []);

  // Personal info update
  const updatePersonal = (data: Personal) => {
    console.log('Updating personal info:', data);
    setCVData(prev => ({
      ...prev,
      personal: {
        ...data
      }
    }));
  };

  // Summary update
  const updateSummary = (summary: string) => {
    console.log('Updating summary:', summary);
    setCVData(prev => ({
      ...prev,
      summary
    }));
  };

  // Experience management
  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience: Experience = {
      ...experience,
      id: uuidv4()
    };
    console.log('Adding experience:', newExperience);
    setCVData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (experience: Experience) => {
    console.log('Updating experience:', experience);
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === experience.id ? experience : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    console.log('Removing experience:', id);
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Education management
  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...education,
      id: uuidv4()
    };
    console.log('Adding education:', newEducation);
    setCVData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (education: Education) => {
    console.log('Updating education:', education);
    setCVData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === education.id ? education : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    console.log('Removing education:', id);
    setCVData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Skills management
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: uuidv4()
    };
    console.log('Adding skill:', newSkill);
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (skill: Skill) => {
    console.log('Updating skill:', skill);
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.map(s => 
        s.id === skill.id ? skill : s
      )
    }));
  };

  const removeSkill = (id: string) => {
    console.log('Removing skill:', id);
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Languages management
  const addLanguage = (language: Omit<Language, 'id'>) => {
    const newLanguage: Language = {
      ...language,
      id: uuidv4()
    };
    console.log('Adding language:', newLanguage);
    setCVData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
  };

  const updateLanguage = (language: Language) => {
    console.log('Updating language:', language);
    setCVData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === language.id ? language : lang
      )
    }));
  };

  const removeLanguage = (id: string) => {
    console.log('Removing language:', id);
    setCVData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

  // Save CV to storage
  const saveCV = async () => {
    try {
      setIsSaving(true);
      console.log('Saving CV data:', cvData);
      
      // For now, save to local storage
      // Will be replaced with Supabase integration
      localStorage.setItem('cv-data', JSON.stringify({
        ...cvData,
        metadata: {
          ...cvData.metadata,
          lastUpdated: new Date().toISOString()
        }
      }));
      
      toast.success('CV data saved successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving CV data:', error);
      toast.error('Error saving CV data');
      return Promise.reject(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CVContext.Provider value={{
      cvData,
      updatePersonal,
      updateSummary,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addSkill,
      updateSkill,
      removeSkill,
      addLanguage,
      updateLanguage,
      removeLanguage,
      setCVData,
      saveCV,
      isLoading,
      isSaving
    }}>
      {children}
    </CVContext.Provider>
  );
};

export const useCV = (): CVContextProps => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};
