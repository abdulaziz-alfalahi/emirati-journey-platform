
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, Briefcase, Calendar, User, Users, Video, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RecruiterDashboardProps {
  activeTab: string;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="jobs"><Briefcase className="h-4 w-4 mr-2" /> Jobs</TabsTrigger>
      <TabsTrigger value="candidates"><Users className="h-4 w-4 mr-2" /> Candidates</TabsTrigger>
      <TabsTrigger value="interviews"><Video className="h-4 w-4 mr-2" /> Interviews</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Open Positions", value: "15", change: "", description: "Currently advertised jobs" },
          { title: "Applications", value: "47", change: "", description: "Received job applications" },
          { title: "Internship Programs", value: "8", change: "", description: "Available internship positions" },
          { title: "Scheduled Interviews", value: "12", change: "", description: "Upcoming candidate interviews" }
        ]}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common recruiter tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              {
                title: "Schedule Interview", 
                description: "Set up candidate meetings", 
                icon: Calendar,
                link: "/career-advisory/interviews/schedule"
              },
              {
                title: "Video Interviews", 
                description: "Conduct remote sessions", 
                icon: Video,
                link: "/career-advisory/interviews"
              },
              {
                title: "Job Matching", 
                description: "Find suitable candidates", 
                icon: Users,
                link: "/matching"
              },
              {
                title: "Post Job", 
                description: "Create new listings", 
                icon: Briefcase,
                link: "/job-descriptions"
              }
            ]}
          />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description Management</CardTitle>
            <CardDescription>
              Create and manage job descriptions for matching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our job description parser extracts structured information including:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground mb-4">
              <li>Job title, company, and location</li>
              <li>Employment type and work mode</li>
              <li>Responsibilities and requirements</li>
              <li>Required skills, experience, and education</li>
              <li>Benefits and compensation details</li>
            </ul>
            <Button onClick={() => window.location.href = '/job-descriptions'} className="w-full mt-2">
              Manage Job Descriptions
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Candidate Matching</CardTitle>
            <CardDescription>
              Find the right talent for your positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our matching system connects your job requirements with candidate profiles:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground mb-4">
              <li>Skill-based matching algorithms</li>
              <li>Education and experience scoring</li>
              <li>Cultural fit assessment</li>
              <li>Location and availability filters</li>
            </ul>
            <Button onClick={() => window.location.href = '/matching?tab=jobs'} className="w-full mt-2">
              Match Jobs to Candidates
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
    
    <TabsContent value="jobs" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Job Management</CardTitle>
          <CardDescription>Create and manage job listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link to="/job-descriptions">
            <Button className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" /> Post New Job
            </Button>
          </Link>
          <div className="border rounded-lg divide-y">
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Senior Software Engineer</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">15 applications • Posted 5 days ago</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Marketing Manager</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">23 applications • Posted 2 days ago</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Finance Intern</h3>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Draft</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Not published</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="candidates" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Tools</CardTitle>
          <CardDescription>Manage your recruitment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Post Job", description: "Create new listings", icon: Briefcase, link: "/job-descriptions" },
              { title: "Job Matching", description: "Find suitable candidates", icon: Users, link: "/matching" },
              { title: "Candidate Search", description: "Find talented candidates", icon: Users },
              { title: "Emiratization Tracker", description: "Monitor compliance", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="interviews" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>Your scheduled candidate interviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg divide-y">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Technical Interview - Frontend Developer</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Today, 2:00 PM
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> 45 minutes
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Ahmed Hassan
                    </div>
                  </div>
                </div>
                <Link to="/career-advisory/interviews">
                  <Button size="sm" variant="outline">Join</Button>
                </Link>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Behavioral Interview - Project Manager</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Tomorrow, 10:30 AM
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> 60 minutes
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Sara Al Mahmoud
                    </div>
                  </div>
                </div>
                <Link to="/career-advisory/interviews">
                  <Button size="sm" variant="outline">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-2">
            <Link to="/career-advisory/interviews/schedule">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Interview
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Interview Tools</CardTitle>
          <CardDescription>Access your interview resources</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { 
                title: "Schedule Interview", 
                description: "Set up new interviews", 
                icon: Calendar, 
                link: "/career-advisory/interviews/schedule" 
              },
              { 
                title: "Video Interviews", 
                description: "Conduct online interviews", 
                icon: Video, 
                link: "/career-advisory/interviews" 
              },
              { 
                title: "Interview Templates", 
                description: "Standardized questions", 
                icon: Briefcase 
              },
              { 
                title: "Assessment Reports", 
                description: "View candidate results", 
                icon: BarChart4 
              }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default RecruiterDashboard;
