
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, Send, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const ApplicationSystem: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [applicationStep, setApplicationStep] = useState(1);

  const applications = [
    {
      id: '1',
      program: 'Young Leaders Council',
      submittedDate: '2024-01-15',
      status: 'Under Review',
      estimatedResponse: '2024-02-20',
      progress: 60
    },
    {
      id: '2',
      program: 'Innovation Lab Summer Program',
      submittedDate: '2024-01-20',
      status: 'Accepted',
      estimatedResponse: '2024-02-01',
      progress: 100
    },
    {
      id: '3',
      program: 'Cultural Arts Workshop',
      submittedDate: '2024-02-01',
      status: 'Pending Documents',
      estimatedResponse: '2024-02-15',
      progress: 30
    }
  ];

  const availablePrograms = [
    {
      id: 'tech-innovation',
      name: 'Tech Innovation Challenge',
      deadline: '2024-03-15',
      category: 'Innovation',
      ageRange: '16-21',
      duration: '4 months'
    },
    {
      id: 'leadership-council',
      name: 'Youth Leadership Council',
      deadline: '2024-03-01',
      category: 'Leadership',
      ageRange: '15-20',
      duration: '6 months'
    },
    {
      id: 'arts-heritage',
      name: 'Cultural Arts & Heritage Program',
      deadline: '2024-03-20',
      category: 'Arts',
      ageRange: '13-18',
      duration: '3 months'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending Documents': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return CheckCircle;
      case 'Under Review': return Clock;
      case 'Pending Documents': return AlertCircle;
      case 'Rejected': return XCircle;
      default: return Clock;
    }
  };

  const applicationProgress = (applicationStep / 4) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-ehrdc-teal/10 to-ehrdc-light-teal/5">
        <CardContent className="p-6 text-center">
          <Send className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Application Center</h2>
          <p className="text-muted-foreground">Apply for programs and track your application status</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="my-applications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-applications">My Applications</TabsTrigger>
          <TabsTrigger value="apply-new">Apply for Program</TabsTrigger>
        </TabsList>

        <TabsContent value="my-applications" className="space-y-6">
          {/* Application Status Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-ehrdc-teal">3</div>
                <div className="text-sm text-muted-foreground">Total Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-muted-foreground">Accepted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.map((application) => {
                const StatusIcon = getStatusIcon(application.status);
                return (
                  <div key={application.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{application.program}</h3>
                      <Badge className={getStatusColor(application.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {application.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Application Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Submitted: {new Date(application.submittedDate).toLocaleDateString()}</span>
                      <span>Response by: {new Date(application.estimatedResponse).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">View Details</Button>
                      {application.status === 'Pending Documents' && (
                        <Button size="sm" className="ehrdc-button-primary">
                          Upload Documents
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply-new" className="space-y-6">
          {applicationStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Select Program</CardTitle>
                <div className="flex items-center gap-2">
                  <Progress value={applicationProgress} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground">{applicationStep}/4</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {availablePrograms.map((program) => (
                    <div
                      key={program.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedProgram === program.id ? 'border-ehrdc-teal bg-ehrdc-teal/5' : 'hover:border-ehrdc-teal/50'
                      }`}
                      onClick={() => setSelectedProgram(program.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{program.name}</h3>
                        <Badge variant="outline">{program.category}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Ages: {program.ageRange} • Duration: {program.duration}</div>
                        <div>Application deadline: {new Date(program.deadline).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setApplicationStep(2)}
                    disabled={!selectedProgram}
                    className="ehrdc-button-primary"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {applicationStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Personal Information</CardTitle>
                <div className="flex items-center gap-2">
                  <Progress value={applicationProgress} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground">{applicationStep}/4</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="emirate">Emirate</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your emirate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai</SelectItem>
                        <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="sharjah">Sharjah</SelectItem>
                        <SelectItem value="ajman">Ajman</SelectItem>
                        <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                        <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                        <SelectItem value="fujairah">Fujairah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setApplicationStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setApplicationStep(3)} className="ehrdc-button-primary">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {applicationStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Application Details</CardTitle>
                <div className="flex items-center gap-2">
                  <Progress value={applicationProgress} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground">{applicationStep}/4</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="motivation">Why do you want to join this program?</Label>
                  <Textarea 
                    id="motivation" 
                    placeholder="Explain your motivation and what you hope to achieve..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea 
                    id="experience" 
                    placeholder="Describe any relevant experience, skills, or achievements..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="interests">Areas of Interest</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {['Leadership', 'Technology', 'Arts', 'Sports', 'Community Service', 'Innovation'].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox id={interest} />
                        <Label htmlFor={interest} className="text-sm">{interest}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setApplicationStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setApplicationStep(4)} className="ehrdc-button-primary">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {applicationStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Upload Documents</CardTitle>
                <div className="flex items-center gap-2">
                  <Progress value={100} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground">4/4</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Upload Required Documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please upload your Emirates ID, academic transcripts, and any certificates
                    </p>
                    <Button variant="outline">
                      <FileUp className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Emirates_ID.pdf</span>
                      </div>
                      <Button size="sm" variant="ghost">Remove</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Academic_Transcript.pdf</span>
                      </div>
                      <Button size="sm" variant="ghost">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <span className="text-ehrdc-teal underline cursor-pointer">terms and conditions</span> and 
                    <span className="text-ehrdc-teal underline cursor-pointer"> privacy policy</span>
                  </Label>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setApplicationStep(3)}>
                    Back
                  </Button>
                  <Button className="ehrdc-button-primary">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
