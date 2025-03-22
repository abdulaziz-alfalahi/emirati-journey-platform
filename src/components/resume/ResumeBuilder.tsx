
import React, { useState } from "react";
import { ArrowLeft, Eye, Save, Download, FileOutput } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ResumeTemplate, ResumeData } from './types';
import ResumePreview from './ResumePreview';
import ResumePersonalSection from './sections/ResumePersonalSection';
import ResumeEducationSection from './sections/ResumeEducationSection';
import ResumeExperienceSection from './sections/ResumeExperienceSection';
import ResumeSkillsSection from './sections/ResumeSkillsSection';
import ResumeSummarySection from './sections/ResumeSummarySection';
import ResumeSidebar from './ResumeSidebar';

interface ResumeBuilderProps {
  template: ResumeTemplate;
  onBack: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ template, onBack }) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [resumeTheme, setResumeTheme] = useState<"classic" | "modern" | "minimalist">("classic");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
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

  const saveResume = () => {
    localStorage.setItem("savedResume", JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!"
    });
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
    
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as JSON",
    });
  };

  const exportToPdf = () => {
    toast({
      title: "PDF Export",
      description: "Your resume has been exported as PDF (demo functionality)",
    });
    
    // Simulate downloading PDF
    setTimeout(() => {
      const filename = `${resumeData.personal.fullName.replace(/\s+/g, '_') || 'resume'}_resume.pdf`;
      
      toast({
        title: "PDF Ready",
        description: `${filename} has been prepared for download`,
      });
    }, 1500);
  };

  // Render active section content
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
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
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
        
        <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={saveResume}
          >
            <Save size={16} className="mr-1" /> Save
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
          >
            <FileOutput size={16} className="mr-1" /> Export PDF
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
                  <ResumePreview template={template} data={resumeData} theme={resumeTheme} />
                </TabsContent>
                <TabsContent value="modern" className="mt-0">
                  <ResumePreview template={template} data={resumeData} theme={resumeTheme} />
                </TabsContent>
                <TabsContent value="minimalist" className="mt-0">
                  <ResumePreview template={template} data={resumeData} theme={resumeTheme} />
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
