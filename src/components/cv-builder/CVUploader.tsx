
import React, { useState, useRef } from 'react';
import { useCV } from '@/context/CVContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Upload, FileUp, FileText, Check, AlertTriangle } from 'lucide-react';

interface CVUploaderProps {
  className?: string;
}

const CVUploader: React.FC<CVUploaderProps> = ({ className }) => {
  const { setCVData, isLoading } = useCV();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Please upload a file smaller than 10MB.'
      });
      return;
    }

    // Check file type
    const fileType = file.type;
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/msword', // doc
      'image/jpeg',
      'image/png',
      'image/tiff'
    ];

    if (!validTypes.includes(fileType)) {
      toast.error('Invalid file type', {
        description: 'Please upload a PDF, Word document, or image file.'
      });
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setUploadStatus('uploading');

    try {
      // Simulate parsing progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Simulate parsing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, just create mock data
      // In a real implementation, this would call a CV parsing service
      const mockParsedData = {
        personal: {
          fullName: 'John Doe',
          jobTitle: 'Software Engineer',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          linkedin: 'https://linkedin.com/in/johndoe',
          website: 'https://johndoe.com'
        },
        summary: 'Experienced software engineer with 5+ years of experience in web development, specializing in React, Node.js, and TypeScript. Strong problem-solving skills and a track record of delivering high-quality, maintainable code.',
        experience: [
          {
            id: '1',
            company: 'Tech Company',
            position: 'Senior Software Engineer',
            location: 'San Francisco, CA',
            startDate: '2020-01-01',
            endDate: null,
            current: true,
            description: 'Lead development of web applications using React, TypeScript, and Node.js. Mentored junior developers and implemented CI/CD pipelines.'
          },
          {
            id: '2',
            company: 'Startup Inc',
            position: 'Software Developer',
            location: 'San Francisco, CA',
            startDate: '2018-03-01',
            endDate: '2019-12-31',
            current: false,
            description: 'Developed and maintained front-end applications using React and Redux. Collaborated with UX designers to implement responsive designs.'
          }
        ],
        education: [
          {
            id: '1',
            institution: 'University of California',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            location: 'Berkeley, CA',
            startDate: '2014-09-01',
            endDate: '2018-05-31',
            current: false,
            description: 'GPA: 3.8/4.0. Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development.'
          }
        ],
        skills: [
          { id: '1', name: 'JavaScript', level: 'expert' },
          { id: '2', name: 'React', level: 'expert' },
          { id: '3', name: 'TypeScript', level: 'advanced' },
          { id: '4', name: 'Node.js', level: 'advanced' },
          { id: '5', name: 'HTML/CSS', level: 'advanced' }
        ],
        languages: [
          { id: '1', name: 'English', proficiency: 'native' },
          { id: '2', name: 'Spanish', proficiency: 'professional' }
        ],
        metadata: {
          fileName: file.name,
          fileType: file.type,
          parsingMethod: 'mock-parser',
          lastUpdated: new Date().toISOString()
        }
      };

      // Complete progress
      setProgress(100);
      
      // Update the CV data with parsed information
      setCVData(mockParsedData);
      
      // Update status after a short delay
      setTimeout(() => {
        setUploading(false);
        setUploadStatus('success');
        toast.success('CV Uploaded Successfully', {
          description: 'Your CV has been parsed and the information has been extracted.'
        });
      }, 500);
      
      clearInterval(progressInterval);
    } catch (error) {
      console.error('Error parsing CV:', error);
      setUploading(false);
      setUploadStatus('error');
      toast.error('Error Parsing CV', {
        description: 'There was an error parsing your CV. Please try again with a different file.'
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
              disabled={uploading || isLoading}
            />
            
            {!uploading && !fileName && (
              <>
                <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Upload your CV</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your CV to auto-fill the form. We support PDF, Word, and image files.
                </p>
                <Button onClick={handleClick} disabled={isLoading}>
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
                      Parsing CV... {progress}%
                    </p>
                  </div>
                )}
                
                {!uploading && (
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleClick}
                      disabled={isLoading}
                    >
                      Upload Another
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {uploadStatus === 'success' ? 'CV parsed successfully' : 'Failed to parse CV'}
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
