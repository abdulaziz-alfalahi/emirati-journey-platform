
import React, { useRef } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Book, 
  FileText,
  FileUp,
  Linkedin,
  AlignLeft
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ResumeTemplate, ResumeData } from './types';

interface ResumeSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  template: ResumeTemplate;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeSidebar: React.FC<ResumeSidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  template,
  resumeData,
  setResumeData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    toast({
      title: "Processing Resume",
      description: "Analyzing your resume file...",
    });

    // Simulate file processing
    setTimeout(() => {
      // Simulate extracted data
      const mockExtractedData: ResumeData = {
        personal: {
          fullName: "Jane Smith",
          jobTitle: "Software Engineer",
          email: "jane.smith@example.com",
          phone: "+971 555 123 456",
          location: "Dubai, UAE",
        },
        summary: "Experienced software engineer with a passion for building innovative solutions.",
        experience: [
          { 
            id: "exp1",
            company: "Tech Solutions LLC", 
            position: "Senior Developer", 
            location: "Dubai, UAE",
            startDate: "2019-08", 
            endDate: "2023-03", 
            current: false,
            description: "Led development team in creating enterprise software solutions. Implemented CI/CD pipelines and improved code quality."
          }
        ],
        education: [
          { 
            id: "edu1",
            institution: "University of Technology", 
            degree: "Bachelor of Science", 
            field: "Computer Science",
            location: "Dubai, UAE",
            startDate: "2015-09", 
            endDate: "2019-06", 
            current: false,
          }
        ],
        skills: [
          { id: "skill1", name: "JavaScript", level: "advanced" },
          { id: "skill2", name: "React", level: "advanced" },
          { id: "skill3", name: "Node.js", level: "intermediate" },
          { id: "skill4", name: "TypeScript", level: "advanced" }
        ],
        languages: [
          { id: "lang1", name: "English", proficiency: "fluent" },
          { id: "lang2", name: "Arabic", proficiency: "conversational" }
        ]
      };

      setResumeData(mockExtractedData);
      
      toast({
        title: "Resume Processed",
        description: "Data from your resume has been extracted successfully!"
      });
    }, 2000);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const extractFromLinkedIn = () => {
    toast({
      title: "LinkedIn Integration",
      description: "Connecting to LinkedIn and extracting profile data...",
    });

    // Simulate LinkedIn data extraction
    setTimeout(() => {
      // Simulate extracted data
      const mockLinkedInData: ResumeData = {
        personal: {
          fullName: "Alex Johnson",
          jobTitle: "Project Manager",
          email: "alex.johnson@example.com",
          phone: "+971 555 987 654",
          location: "Abu Dhabi, UAE",
        },
        summary: "Dedicated project manager with a track record of delivering complex projects on time and within budget.",
        experience: [
          { 
            id: "exp1",
            company: "Global Projects Co.", 
            position: "Senior Project Manager", 
            location: "Abu Dhabi, UAE",
            startDate: "2014-08", 
            endDate: "2023-01", 
            current: false,
            description: "Managed large-scale construction projects with budgets exceeding $50M. Coordinated cross-functional teams and ensured regulatory compliance."
          }
        ],
        education: [
          { 
            id: "edu1",
            institution: "Business School International", 
            degree: "Master of Business Administration", 
            field: "Project Management",
            location: "Abu Dhabi, UAE",
            startDate: "2012-09", 
            endDate: "2014-06", 
            current: false,
          }
        ],
        skills: [
          { id: "skill1", name: "Project Management", level: "expert" },
          { id: "skill2", name: "Budget Planning", level: "expert" },
          { id: "skill3", name: "Team Leadership", level: "advanced" },
          { id: "skill4", name: "Risk Management", level: "advanced" }
        ],
        languages: [
          { id: "lang1", name: "English", proficiency: "fluent" },
          { id: "lang2", name: "Arabic", proficiency: "fluent" }
        ]
      };

      setResumeData(mockLinkedInData);
      
      toast({
        title: "LinkedIn Import Complete",
        description: "Data from your LinkedIn profile has been imported successfully!"
      });
    }, 2500);
  };

  return (
    <Card className="md:col-span-1">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary mb-4">Sections</h2>
          
          <div className="flex flex-col space-y-1">
            <Button 
              variant={activeSection === "personal" ? "default" : "ghost"}
              className={activeSection === "personal" ? "bg-primary text-white justify-start" : "justify-start"}
              onClick={() => setActiveSection("personal")}
            >
              <User size={16} className="mr-2" /> Personal Info
            </Button>
            
            <Button 
              variant={activeSection === "summary" ? "default" : "ghost"}
              className={activeSection === "summary" ? "bg-primary text-white justify-start" : "justify-start"}
              onClick={() => setActiveSection("summary")}
            >
              <AlignLeft size={16} className="mr-2" /> Summary
            </Button>
            
            <Button 
              variant={activeSection === "education" ? "default" : "ghost"}
              className={activeSection === "education" ? "bg-primary text-white justify-start" : "justify-start"}
              onClick={() => setActiveSection("education")}
            >
              <GraduationCap size={16} className="mr-2" /> Education
            </Button>
            
            <Button 
              variant={activeSection === "experience" ? "default" : "ghost"}
              className={activeSection === "experience" ? "bg-primary text-white justify-start" : "justify-start"}
              onClick={() => setActiveSection("experience")}
            >
              <Briefcase size={16} className="mr-2" /> Experience
            </Button>
            
            <Button 
              variant={activeSection === "skills" ? "default" : "ghost"}
              className={activeSection === "skills" ? "bg-primary text-white justify-start" : "justify-start"}
              onClick={() => setActiveSection("skills")}
            >
              <Award size={16} className="mr-2" /> Skills & Languages
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Import Data</h2>
          
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp size={16} className="mr-2" /> Upload Resume
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx,.json"
              onChange={handleFileUpload}
            />
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={extractFromLinkedIn}
            >
              <Linkedin size={16} className="mr-2" /> Import from LinkedIn
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeSidebar;
