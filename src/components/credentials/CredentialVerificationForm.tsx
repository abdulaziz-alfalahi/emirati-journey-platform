
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, GraduationCap, Briefcase, Award, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { credentialVerificationService } from '@/services/credentialVerification/credentialVerificationService';
import {
  EducationVerificationData,
  EmploymentVerificationData,
  CertificationVerificationData
} from '@/types/credentialVerification';

interface CredentialVerificationFormProps {
  userId: string;
  onVerificationComplete: () => void;
}

const CredentialVerificationForm: React.FC<CredentialVerificationFormProps> = ({
  userId,
  onVerificationComplete
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('education');

  // Education form state
  const [educationData, setEducationData] = useState<EducationVerificationData>({
    emirates_id: '',
    institution_name: '',
    degree_type: '',
    field_of_study: '',
    graduation_year: new Date().getFullYear(),
    gpa: undefined
  });

  // Employment form state
  const [employmentData, setEmploymentData] = useState<EmploymentVerificationData>({
    emirates_id: '',
    employer_name: '',
    job_title: '',
    start_date: '',
    end_date: '',
    salary_range: '',
    employment_type: 'full_time'
  });

  // Certification form state
  const [certificationData, setCertificationData] = useState<CertificationVerificationData>({
    emirates_id: '',
    certification_name: '',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    certification_number: ''
  });

  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!educationData.emirates_id || !educationData.institution_name || !educationData.degree_type) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await credentialVerificationService.verifyEducationCredentials(userId, educationData);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Education credentials verified successfully',
        });
        onVerificationComplete();
        // Reset form
        setEducationData({
          emirates_id: '',
          institution_name: '',
          degree_type: '',
          field_of_study: '',
          graduation_year: new Date().getFullYear(),
          gpa: undefined
        });
      } else {
        toast({
          title: 'Verification Failed',
          description: result.error || 'Could not verify education credentials',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during verification',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmploymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employmentData.emirates_id || !employmentData.employer_name || !employmentData.job_title) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await credentialVerificationService.verifyEmploymentCredentials(userId, employmentData);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Employment credentials verified successfully',
        });
        onVerificationComplete();
        // Reset form
        setEmploymentData({
          emirates_id: '',
          employer_name: '',
          job_title: '',
          start_date: '',
          end_date: '',
          salary_range: '',
          employment_type: 'full_time'
        });
      } else {
        toast({
          title: 'Verification Failed',
          description: result.error || 'Could not verify employment credentials',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during verification',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificationData.emirates_id || !certificationData.certification_name || !certificationData.certification_number) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await credentialVerificationService.verifyCertificationCredentials(userId, certificationData);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Certification credentials verified successfully',
        });
        onVerificationComplete();
        // Reset form
        setCertificationData({
          emirates_id: '',
          certification_name: '',
          issuing_organization: '',
          issue_date: '',
          expiry_date: '',
          certification_number: ''
        });
      } else {
        toast({
          title: 'Verification Failed',
          description: result.error || 'Could not verify certification credentials',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during verification',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Verify Your Credentials
        </CardTitle>
        <CardDescription>
          Securely verify your education, employment, and certification credentials with UAE national databases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="education" className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="employment" className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Employment
            </TabsTrigger>
            <TabsTrigger value="certification" className="flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Certifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education" className="space-y-4">
            <form onSubmit={handleEducationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="education-emirates-id">Emirates ID *</Label>
                  <Input
                    id="education-emirates-id"
                    value={educationData.emirates_id}
                    onChange={(e) => setEducationData(prev => ({ ...prev, emirates_id: e.target.value }))}
                    placeholder="784-XXXX-XXXXXXX-X"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="institution-name">Institution Name *</Label>
                  <Input
                    id="institution-name"
                    value={educationData.institution_name}
                    onChange={(e) => setEducationData(prev => ({ ...prev, institution_name: e.target.value }))}
                    placeholder="e.g., American University of Sharjah"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="degree-type">Degree Type *</Label>
                  <Select
                    value={educationData.degree_type}
                    onValueChange={(value) => setEducationData(prev => ({ ...prev, degree_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high_school">High School Diploma</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="field-of-study">Field of Study</Label>
                  <Input
                    id="field-of-study"
                    value={educationData.field_of_study}
                    onChange={(e) => setEducationData(prev => ({ ...prev, field_of_study: e.target.value }))}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div>
                  <Label htmlFor="graduation-year">Graduation Year</Label>
                  <Input
                    id="graduation-year"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear()}
                    value={educationData.graduation_year}
                    onChange={(e) => setEducationData(prev => ({ ...prev, graduation_year: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="gpa">GPA (Optional)</Label>
                  <Input
                    id="gpa"
                    type="number"
                    min="0"
                    max="4"
                    step="0.01"
                    value={educationData.gpa || ''}
                    onChange={(e) => setEducationData(prev => ({ ...prev, gpa: e.target.value ? parseFloat(e.target.value) : undefined }))}
                    placeholder="e.g., 3.75"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify Education Credentials
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="employment" className="space-y-4">
            <form onSubmit={handleEmploymentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employment-emirates-id">Emirates ID *</Label>
                  <Input
                    id="employment-emirates-id"
                    value={employmentData.emirates_id}
                    onChange={(e) => setEmploymentData(prev => ({ ...prev, emirates_id: e.target.value }))}
                    placeholder="784-XXXX-XXXXXXX-X"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employer-name">Employer Name *</Label>
                  <Input
                    id="employer-name"
                    value={employmentData.employer_name}
                    onChange={(e) => setEmploymentData(prev => ({ ...prev, employer_name: e.target.value }))}
                    placeholder="e.g., Emirates Group"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="job-title">Job Title *</Label>
                  <Input
                    id="job-title"
                    value={employmentData.job_title}
                    onChange={(e) => setEmploymentData(prev => ({ ...prev, job_title: e.target.value }))}
                    placeholder="e.g., Software Developer"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employment-type">Employment Type</Label>
                  <Select
                    value={employmentData.employment_type}
                    onValueChange={(value: any) => setEmploymentData(prev => ({ ...prev, employment_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start-date">Start Date *</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={employmentData.start_date}
                    onChange={(e) => setEmploymentData(prev => ({ ...prev, start_date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date (Optional)</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={employmentData.end_date}
                    onChange={(e) => setEmploymentData(prev => ({ ...prev, end_date: e.target.value }))}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify Employment Credentials
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="certification" className="space-y-4">
            <form onSubmit={handleCertificationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="certification-emirates-id">Emirates ID *</Label>
                  <Input
                    id="certification-emirates-id"
                    value={certificationData.emirates_id}
                    onChange={(e) => setCertificationData(prev => ({ ...prev, emirates_id: e.target.value }))}
                    placeholder="784-XXXX-XXXXXXX-X"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="certification-name">Certification Name *</Label>
                  <Input
                    id="certification-name"
                    value={certificationData.certification_name}
                    onChange={(e) => setCertificationData(prev => ({ ...prev, certification_name: e.target.value }))}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="issuing-organization">Issuing Organization *</Label>
                  <Input
                    id="issuing-organization"
                    value={certificationData.issuing_organization}
                    onChange={(e) => setCertificationData(prev => ({ ...prev, issuing_organization: e.target.value }))}
                    placeholder="e.g., Amazon Web Services"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="certification-number">Certification Number *</Label>
                  <Input
                    id="certification-number"
                    value={certificationData.certification_number}
                    onChange={(e) => setCertificationData(prev => ({ ...prev, certification_number: e.target.value }))}
                    placeholder="e.g., AWS-ASA-12345"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="issue-date">Issue Date *</Label>
                  <Input
                    id="issue-date"
                    type="date"
                    value={certificationData.issue_date}
                    onChange={(e) => setCertificationData(prev => ({ ...prev, issue_date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                  <Input
                    id="expiry-date"
                    type="date"
                    value={certificationData.expiry_date}
                    onChange={(e) => setCertificationData(prev => ({ ...prev, expiry_date: e.target.value }))}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify Certification
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CredentialVerificationForm;
