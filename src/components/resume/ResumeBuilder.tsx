
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
  const { toast: uiToast } = useToast();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [resumeTheme, setResumeTheme] = useState<"classic" | "modern" | "minimalist">("classic");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Initialize resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
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
  });

  // Load saved resume from local storage or from initialData on first render
  useEffect(() => {
    if (initialData) {
      console.log('Using provided initial data for resume');
      setResumeData(initialData);
      return;
    }
    
    const savedResume = localStorage.getItem("savedResume");
    if (savedResume) {
      try {
        setResumeData(JSON.parse(savedResume));
      } catch (error) {
        console.error("Error parsing saved resume:", error);
      }
    }
  }, [initialData]);

  // Handler functions
  const handlePersonalInfoChange = (personal: ResumeData['personal']) => {
    setResumeData(prev => ({ ...prev, personal }));
  };

  const handleSummaryChange = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const handleExperienceChange = (experience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const handleEducationChange = (education: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const handleSkillsChange = (skills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const handleLanguagesChange = (languages: ResumeData['languages']) => {
    setResumeData(prev => ({ ...prev, languages }));
  };

  const saveResume = async () => {
    localStorage.setItem("savedResume", JSON.stringify(resumeData));

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

      const resumeDataAsJson = resumeData as unknown as Json;

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

  return (
    <div className="container mx-auto py-8 px-4 mt-16 sm:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">Resume Builder</h1>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-2 w-full md:w-auto justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={saveResume}
            disabled={isSaving}
          >
            <Save size={16} className="mr-1" /> {isSaving ? 'Saving...' : 'Save'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={downloadResume}
          >
            <Download size={16} className="mr-1" /> Export JSON
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={exportToPdf}
            disabled={isExporting}
          >
            <FileOutput size={16} className="mr-1" /> {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
          
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye size={16} className="mr-1" /> Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Resume Preview</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue={resumeTheme} className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="classic" onClick={() => setResumeTheme("classic")}>Classic</TabsTrigger>
                    <TabsTrigger value="modern" onClick={() => setResumeTheme("modern")}>Modern</TabsTrigger>
                    <TabsTrigger value="minimalist" onClick={() => setResumeTheme("minimalist")}>Minimalist</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="classic" className="mt-0">
                  <div className="resume-preview-wrapper" ref={previewRef}>
                    <ResumePreview template={template} data={resumeData} theme={resumeTheme} />
                  </div>
                </TabsContent>
                <TabsContent value="modern" className="mt-0">
                  <div className="resume-preview-wrapper" ref={previewRef}>
                    <ResumePreview template={template} data={resumeData} theme={resumeTheme} />
                  </div>
                </TabsContent>
                <TabsContent value="minimalist" className="mt-0">
                  <div className="resume-preview-wrapper" ref={previewRef}>
                    <ResumePreview template={template} data={resumeData} theme={resumeTheme} />
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ResumeSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          template={template}
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
        
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            {renderActiveSection()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
