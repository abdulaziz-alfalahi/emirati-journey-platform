
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Book, 
  Calendar,
  Save,
  Download,
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  FileUp,
  Linkedin,
  FileOutput
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeTemplate } from './types';

// Define TypeScript interfaces for our resume data
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  objective: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Language {
  id: number;
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "native";
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface ResumeBuilderData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}

interface ResumeBuilderProps {
  template: ResumeTemplate;
  onBack: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ template, onBack }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [resumeData, setResumeData] = useState<ResumeBuilderData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      objective: "",
    },
    education: [
      { id: 1, institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }
    ],
    experience: [
      { id: 1, company: "", position: "", location: "", startDate: "", endDate: "", description: "" }
    ],
    skills: [
      { id: 1, name: "" }
    ],
    languages: [
      { id: 1, name: "", proficiency: "beginner" }
    ],
    certifications: [
      { id: 1, name: "", issuer: "", date: "" }
    ]
  });

  const [activeSection, setActiveSection] = useState("personalInfo");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [resumeTheme, setResumeTheme] = useState<"classic" | "modern" | "minimalist">("classic");

  const handleChange = (section: keyof ResumeBuilderData, field: string, value: string, index: number | null = null) => {
    if (index !== null) {
      // Handle array sections (education, experience, skills, languages, certifications)
      if (section !== "personalInfo") {
        setResumeData({
          ...resumeData,
          [section]: resumeData[section as keyof Omit<ResumeBuilderData, "personalInfo">].map((item: any, i: number) => 
            i === index ? { ...item, [field]: value } : item
          )
        });
      }
    } else {
      // Handle personalInfo section (which is an object, not an array)
      if (section === "personalInfo") {
        setResumeData({
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            [field]: value
          }
        });
      }
    }
  };

  const addItem = (section: keyof Omit<ResumeBuilderData, "personalInfo">) => {
    const newId = resumeData[section].length > 0 
      ? Math.max(...resumeData[section].map(item => item.id)) + 1 
      : 1;
    
    let newItem: { id: number } & Record<string, any> = { id: newId };
    
    switch(section) {
      case "education":
        newItem = { ...newItem, institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" } as Education;
        break;
      case "experience":
        newItem = { ...newItem, company: "", position: "", location: "", startDate: "", endDate: "", description: "" } as Experience;
        break;
      case "skills":
        newItem = { ...newItem, name: "" } as Skill;
        break;
      case "languages":
        newItem = { ...newItem, name: "", proficiency: "beginner" } as Language;
        break;
      case "certifications":
        newItem = { ...newItem, name: "", issuer: "", date: "" } as Certification;
        break;
      default:
        break;
    }

    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newItem]
    });
  };

  const removeItem = (section: keyof Omit<ResumeBuilderData, "personalInfo">, id: number) => {
    if (resumeData[section].length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one entry in this section",
        variant: "destructive"
      });
      return;
    }
    
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].filter(item => item.id !== id)
    });
  };

  const saveResume = () => {
    // Here you would typically save to a database
    // For now, we'll just show a success toast
    localStorage.setItem("savedResume", JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!"
    });
  };

  const downloadResume = () => {
    const filename = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.json`;
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
    // In a real app, you would use a library like jsPDF or html2pdf
    // For now, we'll just show a toast indicating the feature
    toast({
      title: "PDF Export",
      description: "Your resume has been exported as PDF (demo functionality)",
    });
    
    // Simulate downloading PDF
    setTimeout(() => {
      const filename = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`;
      
      toast({
        title: "PDF Ready",
        description: `${filename} has been prepared for download`,
      });
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you would process the file and extract data
    // For now, we'll simulate a file upload with a loading toast
    toast({
      title: "Processing Resume",
      description: "Analyzing your resume file...",
    });

    // Simulate file processing
    setTimeout(() => {
      // Simulate extracted data
      const mockExtractedData: ResumeBuilderData = {
        personalInfo: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+971 555 123 456",
          location: "Dubai, UAE",
          objective: "Experienced software engineer with a passion for building innovative solutions.",
        },
        education: [
          { 
            id: 1, 
            institution: "University of Technology", 
            degree: "Bachelor of Science", 
            field: "Computer Science",
            startDate: "2015-09-01", 
            endDate: "2019-06-30", 
            gpa: "3.8"
          }
        ],
        experience: [
          { 
            id: 1, 
            company: "Tech Solutions LLC", 
            position: "Senior Developer", 
            location: "Dubai, UAE",
            startDate: "2019-08-01", 
            endDate: "2023-03-31", 
            description: "Led development team in creating enterprise software solutions. Implemented CI/CD pipelines and improved code quality."
          }
        ],
        skills: [
          { id: 1, name: "JavaScript" },
          { id: 2, name: "React" },
          { id: 3, name: "Node.js" },
          { id: 4, name: "TypeScript" }
        ],
        languages: [
          { id: 1, name: "English", proficiency: "native" },
          { id: 2, name: "Arabic", proficiency: "intermediate" }
        ],
        certifications: [
          { id: 1, name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2021-05-15" }
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
    // In a real app, you would use LinkedIn API or a scraping service
    // For now, we'll just show a toast indicating the feature
    toast({
      title: "LinkedIn Integration",
      description: "Connecting to LinkedIn and extracting profile data...",
    });

    // Simulate LinkedIn data extraction
    setTimeout(() => {
      // Simulate extracted data
      const mockLinkedInData: ResumeBuilderData = {
        personalInfo: {
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          phone: "+971 555 987 654",
          location: "Abu Dhabi, UAE",
          objective: "Dedicated project manager with a track record of delivering complex projects on time and within budget.",
        },
        education: [
          { 
            id: 1, 
            institution: "Business School International", 
            degree: "Master of Business Administration", 
            field: "Project Management",
            startDate: "2012-09-01", 
            endDate: "2014-06-30", 
            gpa: "3.9"
          }
        ],
        experience: [
          { 
            id: 1, 
            company: "Global Projects Co.", 
            position: "Senior Project Manager", 
            location: "Abu Dhabi, UAE",
            startDate: "2014-08-01", 
            endDate: "2023-01-31", 
            description: "Managed large-scale construction projects with budgets exceeding $50M. Coordinated cross-functional teams and ensured regulatory compliance."
          }
        ],
        skills: [
          { id: 1, name: "Project Management" },
          { id: 2, name: "Budget Planning" },
          { id: 3, name: "Team Leadership" },
          { id: 4, name: "Risk Management" }
        ],
        languages: [
          { id: 1, name: "English", proficiency: "native" },
          { id: 2, name: "Arabic", proficiency: "advanced" }
        ],
        certifications: [
          { id: 1, name: "PMP Certification", issuer: "Project Management Institute", date: "2016-03-10" }
        ]
      };

      setResumeData(mockLinkedInData);
      
      toast({
        title: "LinkedIn Import Complete",
        description: "Data from your LinkedIn profile has been imported successfully!"
      });
    }, 2500);
  };

  // Function to handle resume theme changes
  const handleThemeChange = (theme: "classic" | "modern" | "minimalist") => {
    setResumeTheme(theme);
  };

  const renderSection = () => {
    switch(activeSection) {
      case "personalInfo":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={resumeData.personalInfo.name} 
                  onChange={(e) => handleChange("personalInfo", "name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={resumeData.personalInfo.email} 
                  onChange={(e) => handleChange("personalInfo", "email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={resumeData.personalInfo.phone} 
                  onChange={(e) => handleChange("personalInfo", "phone", e.target.value)}
                  placeholder="+971 XXXXXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={resumeData.personalInfo.location} 
                  onChange={(e) => handleChange("personalInfo", "location", e.target.value)}
                  placeholder="City, Emirate"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="objective">Professional Objective</Label>
              <textarea 
                id="objective"
                className="w-full p-2 border rounded-md min-h-[100px] bg-background"
                value={resumeData.personalInfo.objective} 
                onChange={(e) => handleChange("personalInfo", "objective", e.target.value)}
                placeholder="Briefly describe your career objectives..."
              />
            </div>
          </div>
        );
      
      case "education":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Education</h3>
              <Button 
                onClick={() => addItem("education")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Education
              </Button>
            </div>
            
            {resumeData.education.map((edu, index) => (
              <Card key={edu.id} className="border-accent">
                <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    {edu.institution ? edu.institution : `Education #${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("education", edu.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution Name</Label>
                      <Input 
                        value={edu.institution} 
                        onChange={(e) => handleChange("education", "institution", e.target.value, index)}
                        placeholder="University/School Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input 
                        value={edu.degree} 
                        onChange={(e) => handleChange("education", "degree", e.target.value, index)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input 
                        value={edu.field} 
                        onChange={(e) => handleChange("education", "field", e.target.value, index)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>GPA (Optional)</Label>
                      <Input 
                        value={edu.gpa} 
                        onChange={(e) => handleChange("education", "gpa", e.target.value, index)}
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        type="date"
                        value={edu.startDate} 
                        onChange={(e) => handleChange("education", "startDate", e.target.value, index)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date (or Expected)</Label>
                      <Input 
                        type="date"
                        value={edu.endDate} 
                        onChange={(e) => handleChange("education", "endDate", e.target.value, index)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case "experience":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Work Experience</h3>
              <Button 
                onClick={() => addItem("experience")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Experience
              </Button>
            </div>
            
            {resumeData.experience.map((exp, index) => (
              <Card key={exp.id} className="border-accent">
                <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    {exp.position ? `${exp.position}${exp.company ? ` at ${exp.company}` : ''}` : `Experience #${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("experience", exp.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company/Organization</Label>
                      <Input 
                        value={exp.company} 
                        onChange={(e) => handleChange("experience", "company", e.target.value, index)}
                        placeholder="Company Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Position/Title</Label>
                      <Input 
                        value={exp.position} 
                        onChange={(e) => handleChange("experience", "position", e.target.value, index)}
                        placeholder="Job Title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input 
                        value={exp.location} 
                        onChange={(e) => handleChange("experience", "location", e.target.value, index)}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        type="date"
                        value={exp.startDate} 
                        onChange={(e) => handleChange("experience", "startDate", e.target.value, index)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input 
                        type="date"
                        value={exp.endDate} 
                        onChange={(e) => handleChange("experience", "endDate", e.target.value, index)}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Label>Job Description & Achievements</Label>
                    <textarea 
                      className="w-full p-2 border rounded-md min-h-[100px] bg-background"
                      value={exp.description} 
                      onChange={(e) => handleChange("experience", "description", e.target.value, index)}
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case "skills":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Skills</h3>
              <Button 
                onClick={() => addItem("skills")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Skill
              </Button>
            </div>
            
            <Card className="border-accent">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Input 
                        value={skill.name} 
                        onChange={(e) => handleChange("skills", "name", e.target.value, index)}
                        placeholder="Skill name"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem("skills", skill.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "languages":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Languages</h3>
              <Button 
                onClick={() => addItem("languages")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Language
              </Button>
            </div>
            
            {resumeData.languages.map((lang, index) => (
              <Card key={lang.id} className="border-accent">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Language</Label>
                      <Input 
                        value={lang.name} 
                        onChange={(e) => handleChange("languages", "name", e.target.value, index)}
                        placeholder="e.g., Arabic, English"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <Label>Proficiency Level</Label>
                      <RadioGroup 
                        value={lang.proficiency}
                        onValueChange={(value) => handleChange("languages", "proficiency", value, index)}
                        className="flex space-x-2"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="beginner" id={`beginner-${lang.id}`} />
                          <Label htmlFor={`beginner-${lang.id}`}>Beginner</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="intermediate" id={`intermediate-${lang.id}`} />
                          <Label htmlFor={`intermediate-${lang.id}`}>Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="advanced" id={`advanced-${lang.id}`} />
                          <Label htmlFor={`advanced-${lang.id}`}>Advanced</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="native" id={`native-${lang.id}`} />
                          <Label htmlFor={`native-${lang.id}`}>Native</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("languages", lang.id)}
                      className="h-8 w-8 text-destructive self-start sm:self-center mt-2 sm:mt-6"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case "certifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Certifications & Awards</h3>
              <Button 
                onClick={() => addItem("certifications")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Certification
              </Button>
            </div>
            
            {resumeData.certifications.map((cert, index) => (
              <Card key={cert.id} className="border-accent">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Certification/Award Name</Label>
                      <Input 
                        value={cert.name} 
                        onChange={(e) => handleChange("certifications", "name", e.target.value, index)}
                        placeholder="Certification title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Issuing Organization</Label>
                      <Input 
                        value={cert.issuer} 
                        onChange={(e) => handleChange("certifications", "issuer", e.target.value, index)}
                        placeholder="Organization name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date Received</Label>
                      <Input 
                        type="date"
                        value={cert.date} 
                        onChange={(e) => handleChange("certifications", "date", e.target.value, index)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("certifications", cert.id)}
                      className="text-destructive"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Resume Preview Component
  const ResumePreview = () => {
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    return (
      <div className={`p-8 max-w-4xl mx-auto bg-white shadow-lg ${
        resumeTheme === "modern" ? "font-sans" : 
        resumeTheme === "minimalist" ? "font-light" : "font-serif"
      }`}>
        <div className={`text-center mb-8 ${
          resumeTheme === "modern" ? "border-b-4 border-primary pb-4" : 
          resumeTheme === "minimalist" ? "border-b border-gray-200 pb-2" : "border-double border-b-4 border-accent pb-4"
        }`}>
          <h1 className={`text-3xl font-bold ${
            resumeTheme === "modern" ? "text-primary" : 
            resumeTheme === "minimalist" ? "text-gray-800" : "text-accent"
          }`}>{resumeData.personalInfo.name || "Your Name"}</h1>
          
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
            {resumeData.personalInfo.email && (
              <span>{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>{resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.location && (
              <span>{resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>

        {resumeData.personalInfo.objective && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-2 ${
              resumeTheme === "modern" ? "text-primary border-b-2 border-primary inline-block" : 
              resumeTheme === "minimalist" ? "text-gray-700" : "text-accent"
            }`}>Professional Summary</h2>
            <p className="text-gray-700">{resumeData.personalInfo.objective}</p>
          </div>
        )}

        {resumeData.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${
              resumeTheme === "modern" ? "text-primary border-b-2 border-primary inline-block" : 
              resumeTheme === "minimalist" ? "text-gray-700" : "text-accent"
            }`}>Professional Experience</h2>
            
            {resumeData.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={exp.id} className={`mb-4 ${index !== resumeData.experience.length - 1 ? "pb-4 border-b border-gray-100" : ""}`}>
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position || "Position"}</h3>
                      <p className="text-gray-600">{exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}</p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </p>
                    )}
                  </div>
                  {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {resumeData.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${
              resumeTheme === "modern" ? "text-primary border-b-2 border-primary inline-block" : 
              resumeTheme === "minimalist" ? "text-gray-700" : "text-accent"
            }`}>Education</h2>
            
            {resumeData.education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id} className={`mb-4 ${index !== resumeData.education.length - 1 ? "pb-4 border-b border-gray-100" : ""}`}>
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree || "Degree"}{edu.field ? ` in ${edu.field}` : ""}</h3>
                      <p className="text-gray-600">{edu.institution || "Institution"}</p>
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </p>
                    )}
                  </div>
                  {edu.gpa && <p className="mt-1 text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {resumeData.skills.some(skill => skill.name) && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${
              resumeTheme === "modern" ? "text-primary border-b-2 border-primary inline-block" : 
              resumeTheme === "minimalist" ? "text-gray-700" : "text-accent"
            }`}>Skills</h2>
            
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.filter(skill => skill.name).map(skill => (
                <span 
                  key={skill.id} 
                  className={`px-3 py-1 rounded-full text-sm ${
                    resumeTheme === "modern" ? "bg-primary text-white" : 
                    resumeTheme === "minimalist" ? "bg-gray-100 text-gray-800" : "bg-accent/20 text-accent"
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {resumeData.languages.some(lang => lang.name) && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${
              resumeTheme === "modern" ? "text-primary border-b-2 border-primary inline-block" : 
              resumeTheme === "minimalist" ? "text-gray-700" : "text-accent"
            }`}>Languages</h2>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {resumeData.languages.filter(lang => lang.name).map(lang => (
                <li key={lang.id} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-gray-500 capitalize">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resumeData.certifications.some(cert => cert.name) && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${
              resumeTheme === "modern" ? "text-primary border-b-2 border-primary inline-block" : 
              resumeTheme === "minimalist" ? "text-gray-700" : "text-accent"
            }`}>Certifications & Awards</h2>
            
            {resumeData.certifications.filter(cert => cert.name).map((cert, index) => (
              <div key={cert.id} className={`mb-2 ${index !== resumeData.certifications.length - 1 ? "pb-2 border-b border-gray-100" : ""}`}>
                <div className="flex flex-wrap justify-between">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    {cert.issuer && <p className="text-sm text-gray-600">{cert.issuer}</p>}
                  </div>
                  {cert.date && <p className="text-sm text-gray-500">{formatDate(cert.date)}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
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
        
        <div className="flex space-x-2">
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
              >
                <Eye size={16} className="mr-1" /> Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Resume Preview</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="classic" className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="classic" onClick={() => handleThemeChange("classic")}>Classic</TabsTrigger>
                    <TabsTrigger value="modern" onClick={() => handleThemeChange("modern")}>Modern</TabsTrigger>
                    <TabsTrigger value="minimalist" onClick={() => handleThemeChange("minimalist")}>Minimalist</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="classic" className="mt-0">
                  <ResumePreview />
                </TabsContent>
                <TabsContent value="modern" className="mt-0">
                  <ResumePreview />
                </TabsContent>
                <TabsContent value="minimalist" className="mt-0">
                  <ResumePreview />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-primary mb-4">Sections</h2>
              
              <div className="flex flex-col space-y-1">
                <Button 
                  variant={activeSection === "personalInfo" ? "default" : "ghost"}
                  className={activeSection === "personalInfo" ? "bg-primary text-white justify-start" : "justify-start"}
                  onClick={() => setActiveSection("personalInfo")}
                >
                  <User size={16} className="mr-2" /> Personal Info
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
                  <Award size={16} className="mr-2" /> Skills
                </Button>
                
                <Button 
                  variant={activeSection === "languages" ? "default" : "ghost"}
                  className={activeSection === "languages" ? "bg-primary text-white justify-start" : "justify-start"}
                  onClick={() => setActiveSection("languages")}
                >
                  <Book size={16} className="mr-2" /> Languages
                </Button>
                
                <Button 
                  variant={activeSection === "certifications" ? "default" : "ghost"}
                  className={activeSection === "certifications" ? "bg-primary text-white justify-start" : "justify-start"}
                  onClick={() => setActiveSection("certifications")}
                >
                  <FileText size={16} className="mr-2" /> Certifications
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
        
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            {renderSection()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
