
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { BarChart4, BookOpen, Calendar, GraduationCap, Users, CheckCircle, Clock, Clipboard, Bell, FileText, Upload, List, FolderOpen, FileUp, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface TrainingCenterDashboardProps {
  activeTab: string;
}

interface Program {
  id: number;
  title: string;
  trainees: number;
  startDate: string;
  status: string;
  description?: string;
  documents?: ProgramDocument[];
}

interface ProgramDocument {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

const TrainingCenterDashboard: React.FC<TrainingCenterDashboardProps> = ({ activeTab }) => {
  const [upcomingPrograms, setUpcomingPrograms] = useState<Program[]>([
    { 
      id: 1, 
      title: 'Digital Skills Bootcamp', 
      trainees: 76, 
      startDate: '2025-04-20', 
      status: 'active',
      description: 'Comprehensive digital skills training program covering web development, digital marketing, and data analysis.',
      documents: [
        { id: 1, name: 'Curriculum.pdf', type: 'PDF', uploadDate: '2025-03-15', size: '2.4 MB' },
        { id: 2, name: 'Schedule.docx', type: 'DOCX', uploadDate: '2025-03-16', size: '1.1 MB' }
      ]
    },
    { 
      id: 2, 
      title: 'Leadership & Management', 
      trainees: 42, 
      startDate: 'Ongoing', 
      status: 'active',
      description: 'Advanced leadership training for emerging managers and team leaders.',
      documents: [
        { id: 3, name: 'LeadershipHandbook.pdf', type: 'PDF', uploadDate: '2025-02-10', size: '3.8 MB' }
      ]
    },
    { 
      id: 3, 
      title: 'Financial Literacy', 
      trainees: 0, 
      startDate: '2025-05-10', 
      status: 'planned',
      description: 'Foundation course in personal and business financial management.'
    },
    { 
      id: 4, 
      title: 'Project Management Certification', 
      trainees: 28, 
      startDate: '2025-04-15', 
      status: 'active',
      description: 'Professional certification program for project management methodologies.',
      documents: [
        { id: 4, name: 'PMPGuide.pdf', type: 'PDF', uploadDate: '2025-03-01', size: '5.2 MB' },
        { id: 5, name: 'CaseStudies.pptx', type: 'PPTX', uploadDate: '2025-03-05', size: '4.7 MB' }
      ]
    },
  ]);

  const [upcomingAssessments, setUpcomingAssessments] = useState([
    { id: 1, title: 'Technical Certification Exam', candidates: 35, date: '2025-04-18', type: 'certification' },
    { id: 2, title: 'Soft Skills Assessment', candidates: 48, date: '2025-04-22', type: 'skills' },
    { id: 3, title: 'Leadership Potential Evaluation', candidates: 19, date: '2025-05-05', type: 'behaviors' }
  ]);

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newProgramDialogOpen, setNewProgramDialogOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    title: '',
    description: '',
    startDate: '',
    status: 'planned'
  });

  const handleFileUpload = (programId: number) => {
    // In a real application, this would handle actual file uploads
    toast.success('Document uploaded successfully');
    setIsUploadDialogOpen(false);
  };

  const handleCreateProgram = () => {
    if (!newProgram.title || !newProgram.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProgramItem: Program = {
      id: upcomingPrograms.length + 1,
      title: newProgram.title,
      description: newProgram.description,
      trainees: 0,
      startDate: newProgram.startDate,
      status: newProgram.status as 'active' | 'planned',
      documents: []
    };

    setUpcomingPrograms([...upcomingPrograms, newProgramItem]);
    setNewProgram({
      title: '',
      description: '',
      startDate: '',
      status: 'planned'
    });
    setNewProgramDialogOpen(false);
    toast.success('New training program created');
  };

  return (
    <Tabs defaultValue={activeTab} className="space-y-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview"><GraduationCap className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
        <TabsTrigger value="programs"><BookOpen className="h-4 w-4 mr-2" /> Programs</TabsTrigger>
        <TabsTrigger value="assessments"><CheckCircle className="h-4 w-4 mr-2" /> Assessments</TabsTrigger>
        <TabsTrigger value="trainees"><Users className="h-4 w-4 mr-2" /> Trainees</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        <DashboardOverview 
          metrics={[
            { title: "Active Programs", value: "18", change: "+3", description: "Training courses offered" },
            { title: "Enrolled Trainees", value: "245", change: "+12%", description: "Current enrollment" },
            { title: "Completion Rate", value: "87%", change: "+2%", description: "Average success rate" }
          ]}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Programs</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <CardDescription>Next 30 days program schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPrograms.slice(0, 3).map(program => (
                  <div key={program.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{program.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-3.5 w-3.5 mr-1" /> 
                        <span>{program.trainees} trainees</span>
                        <span className="mx-2">•</span>
                        <span>Starts: {program.startDate}</span>
                      </div>
                    </div>
                    <Badge variant={program.status === 'active' ? 'default' : 'outline'}>
                      {program.status === 'active' ? 'Active' : 'Planned'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">Manage Programs</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Assessments</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <CardDescription>Assessment schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssessments.map(assessment => (
                  <div key={assessment.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{assessment.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-3.5 w-3.5 mr-1" /> 
                        <span>{assessment.candidates} candidates</span>
                        <span className="mx-2">•</span>
                        <span>{assessment.date}</span>
                      </div>
                    </div>
                    <Badge 
                      className={
                        assessment.type === 'certification' 
                          ? 'bg-blue-500/10 text-blue-500' 
                          : assessment.type === 'skills' 
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-purple-500/10 text-purple-500'
                      }
                    >
                      {assessment.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">Manage Assessments</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key indicators of program effectiveness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Trainee Satisfaction</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Course Completion Rate</span>
                <span className="text-sm text-muted-foreground">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Job Placement Rate</span>
                <span className="text-sm text-muted-foreground">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Certification Success Rate</span>
                <span className="text-sm text-muted-foreground">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="programs" className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Training Programs</CardTitle>
                <CardDescription>Manage your training offerings</CardDescription>
              </div>
              <Dialog open={newProgramDialogOpen} onOpenChange={setNewProgramDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" /> Create New Program
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Training Program</DialogTitle>
                    <DialogDescription>
                      Add details for your new training program.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title*
                      </Label>
                      <Input
                        id="title"
                        value={newProgram.title}
                        onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                        className="col-span-3"
                        placeholder="Program title"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newProgram.description}
                        onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                        className="col-span-3"
                        placeholder="Program description"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="startDate" className="text-right">
                        Start Date*
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newProgram.startDate}
                        onChange={(e) => setNewProgram({...newProgram, startDate: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <select
                        id="status"
                        value={newProgram.status}
                        onChange={(e) => setNewProgram({...newProgram, status: e.target.value})}
                        className="col-span-3 p-2 border rounded"
                      >
                        <option value="planned">Planned</option>
                        <option value="active">Active</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewProgramDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateProgram}>Create Program</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trainees</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingPrograms.map(program => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">{program.title}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={program.status === 'active' ? 'default' : 'secondary'}
                        className={program.status === 'active' ? 'bg-green-500/10 text-green-700' : ''}
                      >
                        {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{program.trainees}</TableCell>
                    <TableCell>{program.startDate}</TableCell>
                    <TableCell>
                      {program.documents?.length || 0} files
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedProgram(program)}
                        >
                          <FolderOpen className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Dialog open={isUploadDialogOpen && selectedProgram?.id === program.id} onOpenChange={(open) => {
                          setIsUploadDialogOpen(open);
                          if (open) setSelectedProgram(program);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FileUp className="h-4 w-4 mr-1" /> Upload
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Upload Program Document</DialogTitle>
                              <DialogDescription>
                                Add documents related to "{program.title}" program.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="document">Select Document</Label>
                                <Input id="document" type="file" />
                              </div>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="docType">Document Type</Label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                  <option value="curriculum">Curriculum</option>
                                  <option value="schedule">Schedule</option>
                                  <option value="materials">Learning Materials</option>
                                  <option value="assessment">Assessment</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                              <Button onClick={() => handleFileUpload(program.id)}>Upload</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Program Details Dialog */}
        <Dialog open={!!selectedProgram && !isUploadDialogOpen} onOpenChange={(open) => !open && setSelectedProgram(null)}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProgram?.title}</DialogTitle>
              <DialogDescription>
                {selectedProgram?.description || 'No description available.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge 
                    variant={selectedProgram?.status === 'active' ? 'default' : 'secondary'}
                    className={selectedProgram?.status === 'active' ? 'bg-green-500/10 text-green-700 ml-2' : 'ml-2'}
                  >
                    {selectedProgram?.status.charAt(0).toUpperCase() + selectedProgram?.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Start Date:</span> 
                  <span className="ml-2">{selectedProgram?.startDate}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Trainees:</span> 
                  <span className="ml-2">{selectedProgram?.trainees}</span>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Program Documents</h4>
                {selectedProgram?.documents && selectedProgram.documents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedProgram.documents.map(doc => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium flex items-center">
                            <File className="h-4 w-4 mr-2" /> {doc.name}
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" /> View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No documents uploaded yet</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => {
                      setSelectedProgram(null);
                      setIsUploadDialogOpen(true);
                    }}>
                      <Upload className="h-4 w-4 mr-1" /> Upload Document
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Card>
          <CardHeader>
            <CardTitle>Program Analytics</CardTitle>
            <CardDescription>Performance metrics by program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Most Popular Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Web Development</div>
                    <p className="text-xs text-muted-foreground mt-1">128 trainees enrolled</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Highest Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Data Analysis</div>
                    <p className="text-xs text-muted-foreground mt-1">96% completion rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Best Job Placement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Cloud Computing</div>
                    <p className="text-xs text-muted-foreground mt-1">88% placement rate</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="assessments" className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Assessment Center</CardTitle>
                <CardDescription>Manage testing and certifications</CardDescription>
              </div>
              <Button>
                <CheckCircle className="mr-2 h-4 w-4" /> Create Assessment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg divide-y">
              {upcomingAssessments.map(assessment => (
                <div key={assessment.id} className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{assessment.title}</h3>
                    <Badge 
                      className={
                        assessment.type === 'certification' 
                          ? 'bg-blue-500/10 text-blue-700' 
                          : assessment.type === 'skills' 
                          ? 'bg-green-500/10 text-green-700'
                          : 'bg-purple-500/10 text-purple-700'
                      }
                    >
                      {assessment.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {assessment.candidates} candidates • Scheduled: {assessment.date}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Manage Results</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Assessment Tools</CardTitle>
            <CardDescription>Tools for managing assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardActions 
              actions={[
                { title: "Test Builder", description: "Create custom assessments", icon: Clipboard },
                { title: "Result Analysis", description: "Review performance data", icon: BarChart4 },
                { title: "Certification Management", description: "Track & issue certificates", icon: FileText },
                { title: "Schedule Assessments", description: "Set dates and venues", icon: Calendar }
              ]}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="trainees" className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Trainee Management</CardTitle>
                <CardDescription>Oversee trainee enrollment and progress</CardDescription>
              </div>
              <Button>
                <Users className="mr-2 h-4 w-4" /> Add New Trainee
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Trainee Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Trainees</p>
                      <p className="text-2xl font-bold">245</p>
                    </div>
                    <Users className="h-8 w-8 text-emirati-teal opacity-80" />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">New Registrations</p>
                      <p className="text-2xl font-bold">36</p>
                    </div>
                    <Bell className="h-8 w-8 text-emirati-teal opacity-80" />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Graduates</p>
                      <p className="text-2xl font-bold">182</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-emirati-teal opacity-80" />
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Current Cohorts</h3>
              <div className="border rounded-lg divide-y">
                <div className="p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Web Development Bootcamp</h4>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">28 trainees • 6 weeks remaining</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Digital Marketing Intensive</h4>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">42 trainees • 3 weeks remaining</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Cloud Computing Certification</h4>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Starting Soon</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">35 trainees • Starts in 5 days</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Preparation</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Trainees</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Trainee Support Tools</CardTitle>
            <CardDescription>Tools for supporting trainees</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardActions 
              actions={[
                { title: "Progress Tracking", description: "Monitor trainee progress", icon: BarChart4 },
                { title: "Communication", description: "Send updates & notices", icon: Bell },
                { title: "Resource Center", description: "Manage learning materials", icon: BookOpen },
                { title: "Attendance Tracking", description: "Record & monitor attendance", icon: Clock }
              ]}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TrainingCenterDashboard;
