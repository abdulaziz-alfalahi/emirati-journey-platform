import React, { useState, useRef } from 'react';
import { 
  useCV, 
  CVData as CVContextCVData, 
  Experience as CVContextExperience, 
  Education as CVContextEducation, 
  Skill as CVContextSkill,
  Language as CVContextLanguage,
  Personal as CVContextPersonal // Corrected from PersonalDetails
} from '@/context/CVContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Upload, FileUp, FileText, Check, AlertTriangle } from 'lucide-react';
import { parseAndSaveResume } from '@/services/resume/parseService';

// Define interfaces that match the actual structure of the JSON from your Flask API
interface ParsedContactInfo {
  name?: string;
  jobTitle?: string; // Assuming your parser might extract this
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string; // Or website
}

interface ParsedWorkExperience {
  job_title?: string;
  company?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  current?: boolean;
  responsibilities?: string[] | string;
}

interface ParsedEducation {
  institution?: string;
  degree?: string;
  major?: string; // This will be mapped to 'field' or 'fieldOfStudy'
  graduation_date?: string;
  start_date?: string; // Assuming parser might provide this
  current?: boolean;
  description?: string;
}

interface ParsedSkill {
  name?: string;
  level?: string; // e.g., 'beginner', 'intermediate', 'advanced'
  description?: string; // Optional description for skill
}

interface ParsedLanguage {
  name?: string;
  proficiency?: string; // e.g., 'native', 'fluent', 'intermediate'
}

// This is the top-level structure of the JSON from your Flask API
interface ActualParsedResumeData {
  contact_info?: ParsedContactInfo;
  summary?: string;
  work_experience?: ParsedWorkExperience[];
  education?: ParsedEducation[];
  skills?: (string | ParsedSkill)[]; // Skills can be strings or objects
  languages?: (string | ParsedLanguage)[]; // Languages can be strings or objects
  metadata?: Record<string, any>;
  // Add any other top-level fields your parser might return
}

interface CVUploaderProps {
  className?: string;
}

// Helper function to map the parsed JSON (ActualParsedResumeData) to CVContextCVData
const mapResumeDataToCVContextData = (parsedData: Partial<ActualParsedResumeData>): CVContextCVData => {
  console.log("[CVUploader.tsx] mapResumeDataToCVContextData: Input parsedData:", parsedData);

  const personal: CVContextPersonal = {
    fullName: parsedData.contact_info?.name || '',
    jobTitle: parsedData.contact_info?.jobTitle || parsedData.work_experience?.[0]?.job_title || '',
    email: parsedData.contact_info?.email || '',
    phone: parsedData.contact_info?.phone || '',
    location: parsedData.contact_info?.location || '',
    linkedin: parsedData.contact_info?.linkedin || '',
    website: parsedData.contact_info?.portfolio || '', // Map portfolio to website
  };

  const summary: string = parsedData.summary || '';

  const experience: CVContextExperience[] = (parsedData.work_experience || []).map((exp, index) => ({
    id: `exp-${index}-${Date.now()}`,
    company: exp.company || '',
    position: exp.job_title || '', // Map job_title to position
    location: exp.location || '',
    startDate: exp.start_date || '',
    endDate: exp.end_date || '',
    current: exp.current ?? false,
    description: Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : (exp.responsibilities || ''),
  }));

  const education: CVContextEducation[] = (parsedData.education || []).map((edu, index) => ({
    id: `edu-${index}-${Date.now()}`,
    institution: edu.institution || '',
    degree: edu.degree || '',
    field: edu.major || '', // Map major to field, as CVContext expects 'field'
    location: '', // CVContext.Education has optional location, parser might not provide it
    startDate: edu.start_date || '',
    endDate: edu.graduation_date || '',
    current: edu.current ?? false,
    description: edu.description || '',
  }));

  const skills: CVContextSkill[] = (parsedData.skills || []).map((skill, index) => {
    if (typeof skill === 'string') {
      return {
        id: `skill-${index}-${Date.now()}`,
        name: skill,
        level: 'intermediate', // Default level for string-based skills
      };
    } else {
      return {
        id: `skill-${index}-${Date.now()}`,
        name: skill.name || '',
        level: skill.level || 'intermediate',
      };
    }
  });

  const languages: CVContextLanguage[] = (parsedData.languages || []).map((lang, index) => {
    if (typeof lang === 'string') {
      return {
        id: `lang-${index}-${Date.now()}`,
        name: lang,
        proficiency: 'intermediate', // Default proficiency
      };
    } else {
      return {
        id: `lang-${index}-${Date.now()}`,
        name: lang.name || '',
        proficiency: lang.proficiency || 'intermediate',
      };
    }
  });
  
  const mappedData: CVContextCVData = {
    personal,
    summary,
    experience,
    education,
    skills,
    languages,
    metadata: parsedData.metadata || { lastUpdated: new Date().toISOString() }, // Ensure metadata exists
  };
  console.log("[CVUploader.tsx] mapResumeDataToCVContextData: Output mappedData:", mappedData);
  return mappedData;
};

const CVUploader: React.FC<CVUploaderProps> = ({ className }) => {
  const { setCVData, isLoading: isCVContextLoading } = useCV();
  const DEMO_USER_ID = "demo-user-123"; 

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!DEMO_USER_ID) {
      toast.error('User ID not available', {
        description: 'A user ID is required to upload and parse a CV (using demo ID).',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Please upload a file smaller than 10MB.',
      });
      return;
    }

    const fileType = file.type;
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'image/jpeg',
      'image/png',
      'image/tiff',
    ];

    if (!validTypes.includes(fileType)) {
      toast.error('Invalid file type', {
        description: 'Please upload a PDF, Word document, or image file.',
      });
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setUploadStatus('uploading');
    setProgress(0);

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 50) {
        setProgress(currentProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 100);

    try {
      console.log('[CVUploader.tsx] Calling parseAndSaveResume for file:', file.name, 'User ID:', DEMO_USER_ID);
      
      await parseAndSaveResume(
        file,
        DEMO_USER_ID, 
        (parsedDataFromService, resumeId) => {
          clearInterval(progressInterval);
          console.log('[CVUploader.tsx] parseAndSaveResume onSuccess. Raw Parsed Data:', parsedDataFromService, 'Resume ID:', resumeId);
          if (parsedDataFromService) {
            // Cast to the new ActualParsedResumeData interface
            const cvContextCompatibleData = mapResumeDataToCVContextData(parsedDataFromService as Partial<ActualParsedResumeData>); 
            console.log('[CVUploader.tsx] Mapped data for CVContext:', cvContextCompatibleData);
            setCVData(cvContextCompatibleData);
            setProgress(100);
            setUploading(false);
            setUploadStatus('success');
            toast.success('CV Parsed Successfully!', { description: 'The form fields have been updated.' });
          } else {
            console.error('[CVUploader.tsx] parseAndSaveResume onSuccess but parsedDataFromService is null or undefined.');
            setUploading(false);
            setUploadStatus('error');
            setProgress(0);
            toast.error('Parsing Error', { description: 'Received empty data from parsing service.' });
          }
        },
        (error) => {
          clearInterval(progressInterval);
          console.error('[CVUploader.tsx] parseAndSaveResume onError:', error);
          setUploading(false);
          setUploadStatus('error');
          setProgress(0);
          toast.error('Parsing Failed', { description: error.message });
        }
      );

    } catch (error) {
      clearInterval(progressInterval);
      console.error('[CVUploader.tsx] Error in handleFileChange calling parseAndSaveResume:', error);
      setUploading(false);
      setUploadStatus('error');
      setProgress(0);
      toast.error('Upload Failed', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred during the upload process.',
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <FileUp className="h-5 w-5" />;
    }
  };

  return (
    <div className={className}>
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center justify-center flex-col text-center p-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
              className="hidden"
              disabled={uploading || isCVContextLoading}
            />
            
            {!uploading && !fileName && (
              <>
                <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Upload your CV</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your CV to auto-fill the form. We support PDF, Word, and image files.
                </p>
                <Button onClick={handleClick} disabled={isCVContextLoading}>
                  <FileUp className="mr-2 h-4 w-4" />
                  Select File
                </Button>
              </>
            )}
            
            {(uploading || fileName) && (
              <div className="w-full">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium truncate flex-1">{fileName}</span>
                  {getStatusIcon()}
                </div>
                
                {uploading && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploadStatus === 'uploading' ? `Parsing CV... ${progress}%` : (uploadStatus === 'success' ? 'Parsed successfully!' : 'Parsing failed.')}
                    </p>
                  </div>
                )}
                
                {!uploading && uploadStatus !== 'idle' && (
                  <div className="flex justify-between items-center mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => { 
                        setFileName(null); 
                        setUploadStatus('idle'); 
                        setProgress(0); 
                        if(fileInputRef.current) fileInputRef.current.value = '';
                        handleClick();
                      }}
                      disabled={isCVContextLoading}
                    >
                      Upload Another
                    </Button>
                    <span className={`text-sm ${uploadStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {uploadStatus === 'success' ? 'CV parsed successfully!' : 'Failed to parse CV.'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVUploader;

