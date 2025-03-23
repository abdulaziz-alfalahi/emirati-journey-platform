
import React, { useRef, useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Book, 
  FileText,
  FileUp,
  Linkedin,
  AlignLeft,
  Image
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { ResumeTemplate, ResumeData } from './types';
import { parseResumeFromFile, parseResumeFromImage, importFromLinkedIn } from './utils/resumeParser';
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast: uiToast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    toast.loading("Processing Resume", {
      description: "Analyzing your resume file...",
    });

    try {
      // Determine if this is an image file
      const isImage = file.type.startsWith('image/');
      
      // Process the file using the appropriate parser
      const extractedData = isImage
        ? await parseResumeFromImage(file)
        : await parseResumeFromFile(file);
      
      if (extractedData) {
        // Update the resume data with the extracted information
        setResumeData(current => {
          // Merge with current data to preserve any existing data
          return {
            ...current,
            ...extractedData,
            // Ensure we handle nested objects properly
            personal: {
              ...current.personal,
              ...extractedData.personal
            }
          };
        });
        
        toast.success("Resume Processed", {
          description: "Data from your resume has been extracted successfully!"
        });
      }
    } catch (error) {
      console.error("Error processing resume:", error);
      toast.error("Processing Failed", {
        description: error instanceof Error ? error.message : "Failed to process your resume file",
      });
    } finally {
      setIsProcessing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    toast.loading("Processing Resume Image", {
      description: "Extracting text from your resume image...",
    });

    try {
      const extractedData = await parseResumeFromImage(file);
      
      if (extractedData) {
        setResumeData(current => {
          return {
            ...current,
            ...extractedData,
            personal: {
              ...current.personal,
              ...extractedData.personal
            }
          };
        });
        
        toast.success("Image Processed", {
          description: "Data from your resume image has been extracted successfully!"
        });
      }
    } catch (error) {
      console.error("Error processing resume image:", error);
      toast.error("Image Processing Failed", {
        description: error instanceof Error ? error.message : "Failed to extract data from your resume image",
      });
    } finally {
      setIsProcessing(false);
      // Reset file input
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const handleLinkedInImport = async () => {
    // If user is not logged in
    if (!user) {
      toast.warning("Authentication Required", {
        description: "Please log in to import data from LinkedIn",
        duration: 5000,
      });
      return;
    }

    setIsProcessing(true);
    toast.loading("LinkedIn Integration", {
      description: "Connecting to LinkedIn...",
    });

    try {
      // Initiate OAuth flow with LinkedIn
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: window.location.origin + '/resume-builder?linkedin_auth=true',
        },
      });

      if (error) {
        throw error;
      }

      // The actual data handling will be done on redirect back to the app
      // See the effect in the ResumeBuilderPage component
    } catch (error) {
      console.error("LinkedIn authentication error:", error);
      toast.error("LinkedIn Connection Failed", {
        description: error instanceof Error ? error.message : "Failed to connect to LinkedIn",
      });
      setIsProcessing(false);
    }
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
              disabled={isProcessing}
            >
              <FileUp size={16} className="mr-2" /> Upload Resume
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx,.json,.txt"
              onChange={handleFileUpload}
            />
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => imageInputRef.current?.click()}
              disabled={isProcessing}
            >
              <Image size={16} className="mr-2" /> Scan Resume Image
            </Button>
            <input 
              type="file" 
              ref={imageInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleLinkedInImport}
              disabled={isProcessing}
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
