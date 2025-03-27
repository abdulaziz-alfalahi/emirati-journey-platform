
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Eye, Save, Download, FileOutput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { ResumeTemplate, ResumeData } from './types';
import ResumePreview from './ResumePreview';
import ResumePersonalSection from './sections/ResumePersonalSection';
import ResumeEducationSection from './sections/ResumeEducationSection';
import ResumeExperienceSection from './sections/ResumeExperienceSection';
import ResumeSkillsSection from './sections/ResumeSkillsSection';
import ResumeSummarySection from './sections/ResumeSummarySection';
import ResumeSidebar from './ResumeSidebar';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useResume } from "@/context/ResumeContext";
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Json } from "@/integrations/supabase/types";

interface ResumeBuilderProps {
  template: ResumeTemplate;
  onBack: () => void;
  initialData?: ResumeData | null;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ 
  template, 
  onBack, 
  initialData 
}) => {
  // Log to help debug component rendering
  console.log('ResumeBuilder rendered, initialData:', initialData ? 'present' : 'not present');
  
  const { toast: uiToast } = useToast();
  const { user } = useAuth();
  const { resumeData, setResumeData, updateResumeSection } = useResume();
  
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [resumeTheme, setResumeTheme] = useState<"classic" | "modern" | "minimalist">("classic");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Log to help debug resumeData
  console.log('ResumeBuilder: Current resumeData:', resumeData);

  // Use initialData only for first load if needed
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      console.log('Using provided initial data for resume:', initialData);
      setResumeData(initialData);
    }
  }, [initialData, setResumeData]);

  // Handler functions
  const handlePersonalInfoChange = (personal: ResumeData['personal']) => {
    console.log('Updating personal info:', personal);
    updateResumeSection('personal', personal);
  };

  const handleSummaryChange = (summary: string) => {
    updateResumeSection('summary', summary);
  };

  const handleExperienceChange = (experience: ResumeData['experience']) => {
    updateResumeSection('experience', experience);
  };

  const handleEducationChange = (education: ResumeData['education']) => {
    updateResumeSection('education', education);
  };

  const handleSkillsChange = (skills: ResumeData['skills']) => {
    updateResumeSection('skills', skills);
  };

  const handleLanguagesChange = (languages: ResumeData['languages']) => {
    updateResumeSection('languages', languages);
  };

  const saveResume = async () => {
    // No need to save to localStorage here as the context handles it
    
    if (!user) {
      toast.warning("Authentication required", {
        description: "Please log in to save your resume to the cloud",
        duration: 5000,
      });
      return;
    }

    setIsSaving(true);
    try {
      let resumeId = currentResumeId;

      if (!resumeId) {
        const resumeTitle = resumeData.personal.fullName ? 
          `${resumeData.personal.fullName}'s Resume` : 'My Resume';
          
        const { data: newResumeData, error: resumeError } = await supabase
          .from('resumes')
          .insert({
            user_id: user.id,
            title: resumeTitle,
            template_id: template.id,
            theme: resumeTheme
          })
          .select('id')
          .single();

        if (resumeError) {
          throw resumeError;
        }

        resumeId = newResumeData.id;
        setCurrentResumeId(resumeId);
      } else {
        const resumeTitle = resumeData.personal.fullName ? 
          `${resumeData.personal.fullName}'s Resume` : 'My Resume';
          
        const { error: updateError } = await supabase
          .from('resumes')
          .update({
            title: resumeTitle,
            template_id: template.id,
            theme: resumeTheme,
            updated_at: new Date().toISOString()
          })
          .eq('id', resumeId);

        if (updateError) {
          throw updateError;
        }
      }

      const { data: existingData, error: checkError } = await supabase
        .from('resume_data')
        .select('id')
        .eq('resume_id', resumeId)
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      // Ensure metadata is included in the saved data
      const resumeDataWithMetadata = {
        ...resumeData,
        metadata: {
          ...(resumeData.metadata || {}),
          lastSaved: new Date().toISOString()
        }
      };

      const resumeDataAsJson = resumeDataWithMetadata as unknown as Json;

      if (existingData) {
        const { error: dataUpdateError } = await supabase
          .from('resume_data')
          .update({
            data: resumeDataAsJson,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData.id);

        if (dataUpdateError) {
          throw dataUpdateError;
        }
      } else {
        const { error: dataInsertError } = await supabase
          .from('resume_data')
          .insert({
            resume_id: resumeId,
            data: resumeDataAsJson
          });

        if (dataInsertError) {
          throw dataInsertError;
        }
      }

      uiToast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully!"
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      uiToast({
        title: "Error Saving Resume",
        description: "There was a problem saving your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadResume = () => {
    const filename = `${resumeData.personal.fullName.replace(/\s+/g, '_') || 'resume'}_resume.json`;
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    uiToast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as JSON",
    });
  };

  const exportToPdf = async () => {
    setIsExporting(true);
    try {
      setIsPreviewOpen(true);
      
      setTimeout(async () => {
        const resumeElement = document.querySelector('.resume-preview-wrapper');
        if (!resumeElement) {
          throw new Error('Resume preview not found');
        }

        try {
          const canvas = await html2canvas(resumeElement as HTMLElement, {
            scale: 2,
            useCORS: true,
            logging: false
          });
          
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 0;
          
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          
          const filename = `${resumeData.personal.fullName.replace(/\s+/g, '_') || 'resume'}_resume.pdf`;
          pdf.save(filename);
          
          uiToast({
            title: "PDF Export Complete",
            description: `${filename} has been downloaded`,
          });
        } catch (error) {
          console.error('PDF generation error:', error);
          throw error;
        }
      }, 1000);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      uiToast({
        title: "PDF Export Failed",
        description: "There was a problem exporting your resume to PDF.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return <ResumePersonalSection data={resumeData.personal} onChange={handlePersonalInfoChange} />;
      case "summary":
        return <ResumeSummarySection value={resumeData.summary || ""} onChange={handleSummaryChange} />;
      case "experience":
        return <ResumeExperienceSection experiences={resumeData.experience} onChange={handleExperienceChange} />;
      case "education":
        return <ResumeEducationSection education={resumeData.education} onChange={handleEducationChange} />;
      case "skills":
        return (
          <ResumeSkillsSection 
            skills={resumeData.skills} 
            languages={resumeData.languages}
            onSkillsChange={handleSkillsChange}
            onLanguagesChange={handleLanguagesChange}
          />
        );
      default:
        return <div>Select a section to edit</div>;
    }
  };

  // Add a test button for debugging
  const setTestData = () => {
    const testData = {
      ...resumeData,
      personal: {
        ...resumeData.personal,
        fullName: "Test User",
        jobTitle: "Software Developer",
        email: "test@example.com",
        phone: "123-456-7890",
        location: "Dubai, UAE"
      }
    };
    console.log('Setting test data:', testData);
    setResumeData(testData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed header with proper padding and spacing */}
      <div className="flex items-center justify-between p-4 border-b bg-white z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft size={16} className="mr-2" />
          Back to Templates
        </Button>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsPreviewOpen(true)}
          >
            <Eye size={16} className="mr-1" />
            Preview
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadResume}
          >
            <Download size={16} className="mr-1" />
            Download JSON
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToPdf}
            disabled={isExporting}
          >
            <FileOutput size={16} className="mr-1" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={saveResume}
            disabled={isSaving}
          >
            <Save size={16} className="mr-1" />
            {isSaving ? 'Saving...' : 'Save Resume'}
          </Button>
          {/* Test button for debugging */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={setTestData}
          >
            Test Data
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <ResumeSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
          resumeData={resumeData}
          onImportComplete={setResumeData} // Use context's setResumeData directly
        />
        
        <div className="flex-1 p-6 overflow-auto">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeSection} onValueChange={setActiveSection}>
                <TabsList className="mb-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills & Languages</TabsTrigger>
                </TabsList>
                <TabsContent value={activeSection} className="mt-0">
                  {renderActiveSection()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4 overflow-auto max-h-[80vh]">
            <div ref={previewRef}>
              <ResumePreview 
                data={resumeData} 
                template={template} 
                theme={resumeTheme}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeBuilder;
