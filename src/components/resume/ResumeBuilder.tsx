import React, { useState, useEffect } from 'react';
import { ResumeTemplate, ResumeData } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download, Save, Eye, FileText } from 'lucide-react';
import ResumePersonalSection from './sections/ResumePersonalSection';
import ResumeExperienceSection from './sections/ResumeExperienceSection';
import ResumeEducationSection from './sections/ResumeEducationSection';
import ResumeSkillsSection from './sections/ResumeSkillsSection';
import ResumePreview from './ResumePreview';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

interface ResumeBuilderProps {
  template: ResumeTemplate;
  onBack: () => void;
}

// Initial empty resume data
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
  achievements: [],
};

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ template, onBack }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [activeTab, setActiveTab] = useState('edit');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Update a specific section of the resume data
  const updateSection = <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Save resume to Supabase
  const saveResume = async () => {
    try {
      setSaving(true);
      
      // Here you would save to Supabase
      // For now we'll just simulate a save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Resume saved successfully",
        description: "Your resume has been saved to your account.",
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Failed to save resume",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Download resume as PDF
  const downloadResume = () => {
    toast({
      title: "Preparing download",
      description: "Your resume is being prepared for download.",
    });
    
    // Here you would generate and download a PDF
    // For now we'll just show a toast
    setTimeout(() => {
      toast({
        title: "Download ready",
        description: "Your resume has been downloaded.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-2xl font-bold">{template.name} Resume</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={saveResume} 
            disabled={saving}
          >
            <Save size={18} className="mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
          
          <Button onClick={downloadResume}>
            <Download size={18} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <FileText size={16} />
            Edit Resume
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye size={16} />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-0">
          <div className="space-y-8">
            <ResumePersonalSection 
              data={resumeData.personal} 
              onChange={(data) => updateSection('personal', data)} 
            />
            
            <ResumeExperienceSection 
              experiences={resumeData.experience} 
              onChange={(data) => updateSection('experience', data)} 
            />
            
            <ResumeEducationSection 
              education={resumeData.education} 
              onChange={(data) => updateSection('education', data)} 
            />
            
            <ResumeSkillsSection 
              skills={resumeData.skills} 
              languages={resumeData.languages}
              onSkillsChange={(data) => updateSection('skills', data)}
              onLanguagesChange={(data) => updateSection('languages', data)}
            />
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <ResumePreview template={template} data={resumeData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
