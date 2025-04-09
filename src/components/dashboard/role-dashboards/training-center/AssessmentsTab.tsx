
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clipboard, 
  BarChart4, 
  FileText, 
  Calendar, 
  Upload, 
  Download, 
  Users, 
  Activity,
  Search,
  Filter,
  PlusCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAssessments } from '@/services/assessments';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { AssessmentType } from '@/types/assessments';

const AssessmentsTab: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('active');

  // Fetch assessments from the API
  const { data: assessmentsData, isLoading } = useQuery({
    queryKey: ['assessments'],
    queryFn: fetchAssessments,
  });

  // Calculate statistics for assessment dashboard
  const totalAssessments = assessmentsData?.length || 0;
  const activeAssessments = assessmentsData?.filter(a => a.is_active)?.length || 0;
  const completedAssessments = assessmentsData?.filter(a => !a.is_active)?.length || 0;

  const getAssessmentTypeColor = (type: AssessmentType) => {
    switch (type) {
      case 'skills':
        return 'bg-blue-500/10 text-blue-700';
      case 'behaviors':
        return 'bg-green-500/10 text-green-700';
      case 'capabilities':
        return 'bg-purple-500/10 text-purple-700';
      default:
        return 'bg-gray-500/10 text-gray-700';
    }
  };

  const filteredAssessments = assessmentsData?.filter(assessment => {
    // Filter by search query
    if (searchQuery && !assessment.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by active/inactive status
    if (selectedTab === 'active' && !assessment.is_active) {
      return false;
    }
    
    if (selectedTab === 'inactive' && assessment.is_active) {
      return false;
    }
    
    return true;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Dashboard Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
                <h3 className="text-3xl font-bold">{totalAssessments}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Clipboard className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Assessments</p>
                <h3 className="text-3xl font-bold">{activeAssessments}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Candidates Assessed</p>
                <h3 className="text-3xl font-bold">432</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Center Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Assessment Management</CardTitle>
              <CardDescription>Create and manage your assessment programs</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Assessment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Assessment</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <p>Assessment creation form would go here</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Participation</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell className="font-medium">{assessment.title}</TableCell>
                      <TableCell>
                        <Badge className={getAssessmentTypeColor(assessment.assessment_type)}>
                          {assessment.assessment_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {assessment.duration_minutes ? `${assessment.duration_minutes} min` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={assessment.is_active ? "default" : "outline"}>
                          {assessment.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={75} className="h-2 w-24" />
                          <span className="text-xs text-muted-foreground">75%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Results</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAssessments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <p className="text-muted-foreground">No assessments found</p>
                        <Button variant="outline" className="mt-2">
                          <PlusCircle className="mr-2 h-4 w-4" /> Create Assessment
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Documentation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Documentation</CardTitle>
          <CardDescription>Manage assessment materials and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upload Documents</CardTitle>
                <CardDescription>Share assessment materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">Browse Files</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Documents</CardTitle>
                <CardDescription>Access recent files</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">Assessment Guidelines.pdf</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm">Scoring Matrix.xlsx</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-sm">Question Bank.docx</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="link" className="ml-auto">View All Documents</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      {/* Progress Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Progress</CardTitle>
          <CardDescription>Monitor assessment progress and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Scheduled</p>
                  <Badge variant="outline">24</Badge>
                </div>
                <Progress value={24} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">In Progress</p>
                  <Badge variant="outline">36</Badge>
                </div>
                <Progress value={36} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Completed</p>
                  <Badge variant="outline">128</Badge>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ahmed Hassan</TableCell>
                    <TableCell>Technical Skills Assessment</TableCell>
                    <TableCell>Apr 5, 2025</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-amber-600 bg-amber-50">
                        Scheduled
                      </Badge>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fatima Ali</TableCell>
                    <TableCell>Leadership Assessment</TableCell>
                    <TableCell>Apr 3, 2025</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-700">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell>87%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Omar Khan</TableCell>
                    <TableCell>Problem-Solving Assessment</TableCell>
                    <TableCell>Apr 4, 2025</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500/10 text-blue-700">
                        In Progress
                      </Badge>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" onClick={() => navigate('/assessments')} className="ml-auto">
            View All Candidates
          </Button>
        </CardFooter>
      </Card>
      
      {/* Quick Access Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Tools</CardTitle>
          <CardDescription>Quick access to assessment tools and functions</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { 
                title: "Test Builder", 
                description: "Create custom assessments", 
                icon: Clipboard,
                link: "/assessments"
              },
              { 
                title: "Result Analysis", 
                description: "Review performance data", 
                icon: BarChart4,
                link: "/assessments"
              },
              { 
                title: "Certification Management", 
                description: "Track & issue certificates", 
                icon: FileText 
              },
              { 
                title: "Schedule Assessments", 
                description: "Set dates and venues", 
                icon: Calendar 
              },
              { 
                title: "Candidate Profiles", 
                description: "View candidate information", 
                icon: Users,
                link: "/assessments"
              },
              { 
                title: "Performance Insights", 
                description: "Analytics and trends", 
                icon: Activity,
                link: "/analytics"
              },
              { 
                title: "Document Library", 
                description: "Access shared resources", 
                icon: FileText 
              },
              { 
                title: "Reporting Tools", 
                description: "Generate assessment reports", 
                icon: BarChart4 
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentsTab;
