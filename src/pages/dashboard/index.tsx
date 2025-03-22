
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { User, BarChart4, Calendar, BookOpen, Briefcase, Users } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardActions from '@/components/dashboard/DashboardActions';

const DashboardPage = () => {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // If no user, redirect to login
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Role-specific dashboard content based on user role
  const getRoleDashboard = () => {
    if (roles.includes('administrator') || roles.includes('super_user')) {
      return <AdminDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('school_student')) {
      return <StudentDashboard activeTab={activeTab} />;
    }

    if (roles.includes('educational_institution')) {
      return <EducationalInstitutionDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('parent')) {
      return <ParentDashboard activeTab={activeTab} />;
    }
    
    if (roles.includes('private_sector_recruiter')) {
      return <RecruiterDashboard activeTab={activeTab} />;
    }
    
    // Default dashboard for other roles
    return <DefaultDashboard userRole={roles[0]} activeTab={activeTab} />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {user?.user_metadata?.full_name || 'User'}</p>
        
        {roles.length === 0 ? (
          <Alert className="mb-8">
            <User className="h-4 w-4" />
            <AlertTitle>No role assigned</AlertTitle>
            <AlertDescription>
              Your account doesn't have any roles assigned. Please contact an administrator.
            </AlertDescription>
          </Alert>
        ) : (
          getRoleDashboard()
        )}
      </div>
    </Layout>
  );
};

// Role-specific dashboard components
const AdminDashboard = ({ activeTab }: { activeTab: string }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="metrics"><BarChart4 className="h-4 w-4 mr-2" /> Metrics</TabsTrigger>
      <TabsTrigger value="management"><Users className="h-4 w-4 mr-2" /> Management</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Total Users", value: "247", change: "+12%", description: "System-wide user metrics" },
          { title: "Active Journeys", value: "182", change: "+5%", description: "Current active user journeys" },
          { title: "Service Utilization", value: "68%", change: "", description: "Career Advisory Services" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="metrics" className="space-y-8">
      <DashboardMetrics />
    </TabsContent>
    
    <TabsContent value="management" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Administration Tools</CardTitle>
          <CardDescription>Manage system and users</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "User Management", description: "Manage accounts", icon: Users },
              { title: "Role Administration", description: "Assign user roles", icon: User },
              { title: "Content Manager", description: "Manage platform content", icon: BookOpen },
              { title: "Analytics & Reports", description: "View platform metrics", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

const StudentDashboard = ({ activeTab }: { activeTab: string }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="academics"><BookOpen className="h-4 w-4 mr-2" /> Academics</TabsTrigger>
      <TabsTrigger value="activities"><Calendar className="h-4 w-4 mr-2" /> Activities</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Academic Progress", value: "Grade 11", change: "", description: "Academic Year 2023-2024" },
          { title: "Summer Programs", value: "12", change: "", description: "Available programs near you" },
          { title: "Upcoming Assessments", value: "3", change: "", description: "Due this week" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="academics" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Current Courses</CardTitle>
          <CardDescription>Your enrolled courses and grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-medium">Mathematics</h4>
                <p className="text-sm text-muted-foreground">Advanced Calculus</p>
              </div>
              <div className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                A (95%)
              </div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-medium">Science</h4>
                <p className="text-sm text-muted-foreground">Physics</p>
              </div>
              <div className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                B+ (87%)
              </div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-medium">Arabic Language</h4>
                <p className="text-sm text-muted-foreground">Advanced Literature</p>
              </div>
              <div className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                A- (92%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="activities" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Educational Resources</CardTitle>
          <CardDescription>Tools and resources for your academic journey</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Learning Materials", description: "Study resources", icon: BookOpen },
              { title: "Career Guidance", description: "Explore career paths", icon: Briefcase },
              { title: "Scholarship Finder", description: "Find opportunities", icon: BarChart4 },
              { title: "Mentorship Connect", description: "Find a mentor", icon: Users }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

const EducationalInstitutionDashboard = ({ activeTab }: { activeTab: string }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="students"><Users className="h-4 w-4 mr-2" /> Students</TabsTrigger>
      <TabsTrigger value="programs"><BookOpen className="h-4 w-4 mr-2" /> Programs</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Students", value: "1,247", change: "+5%", description: "Total registered students" },
          { title: "Programs", value: "24", change: "", description: "Active educational programs" },
          { title: "Scholarships", value: "12", change: "", description: "Available scholarship opportunities" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="students" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Upload and manage student records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" /> Upload Student Records
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" /> Schedule Academic Events
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <BarChart4 className="mr-2 h-4 w-4" /> View Performance Analytics
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="programs" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Institution Tools</CardTitle>
          <CardDescription>Manage your educational institution</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Student Records", description: "Upload and manage", icon: Users },
              { title: "Programs", description: "Manage educational offerings", icon: BookOpen },
              { title: "Scholarships", description: "Create opportunities", icon: BarChart4 },
              { title: "Summer Knowledge Camps", description: "Organize programs", icon: Calendar }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

const ParentDashboard = ({ activeTab }: { activeTab: string }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="children"><Users className="h-4 w-4 mr-2" /> Children</TabsTrigger>
      <TabsTrigger value="resources"><BookOpen className="h-4 w-4 mr-2" /> Resources</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Children", value: "2", change: "", description: "Registered children" },
          { title: "Upcoming Events", value: "4", change: "", description: "School and activity events" },
          { title: "Recommended Programs", value: "7", change: "", description: "Based on your children's interests" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="children" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Children's Progress</CardTitle>
          <CardDescription>Academic and activity reports for your children</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-medium">Ahmed (16)</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Grade 11</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Overall GPA:</span>
                <span className="ml-2 font-medium">3.8/4.0</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Attendance:</span>
                <span className="ml-2 font-medium">98%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              View Full Report
            </Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-medium">Fatima (14)</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Grade 9</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Overall GPA:</span>
                <span className="ml-2 font-medium">3.9/4.0</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Attendance:</span>
                <span className="ml-2 font-medium">99%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              View Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="resources" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Parent Resources</CardTitle>
          <CardDescription>Tools to support your children's journey</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Academic Reports", description: "View children's progress", icon: BookOpen },
              { title: "Summer Programs", description: "Browse and register", icon: Calendar },
              { title: "Scholarship Opportunities", description: "Financial aid options", icon: BarChart4 },
              { title: "Career Guidance", description: "Help plan their future", icon: Briefcase }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

const RecruiterDashboard = ({ activeTab }: { activeTab: string }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="jobs"><Briefcase className="h-4 w-4 mr-2" /> Jobs</TabsTrigger>
      <TabsTrigger value="candidates"><Users className="h-4 w-4 mr-2" /> Candidates</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Open Positions", value: "15", change: "", description: "Currently advertised jobs" },
          { title: "Applications", value: "47", change: "", description: "Received job applications" },
          { title: "Internship Programs", value: "8", change: "", description: "Available internship positions" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="jobs" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Job Management</CardTitle>
          <CardDescription>Create and manage job listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full justify-start">
            <Briefcase className="mr-2 h-4 w-4" /> Post New Job
          </Button>
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
              { title: "Post Job", description: "Create new listings", icon: Briefcase },
              { title: "Internship Manager", description: "Organize programs", icon: Calendar },
              { title: "Candidate Search", description: "Find talented candidates", icon: Users },
              { title: "Emiratization Tracker", description: "Monitor compliance", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

const DefaultDashboard = ({ userRole, activeTab }: { userRole: string, activeTab: string }) => {
  // Map of role keys to display names
  const roleLabels: {[key: string]: string} = {
    school_student: 'School Student',
    national_service_participant: 'National Service Participant', 
    university_student: 'University Student',
    intern: 'Internship Trainee',
    full_time_employee: 'Full-Time Employee',
    part_time_employee: 'Part-Time Employee',
    gig_worker: 'Gig Worker',
    jobseeker: 'Jobseeker',
    lifelong_learner: 'Lifelong Learner',
    entrepreneur: 'Entrepreneur',
    retiree: 'Retiree',
    educational_institution: 'Educational Institution',
    parent: 'Parent',
    private_sector_recruiter: 'Private Sector Recruiter',
    government_representative: 'Government Representative',
    retiree_advocate: 'Retiree Advocate',
    training_center: 'Training Center',
    assessment_center: 'Assessment Center',
    mentor: 'Mentor',
    career_advisor: 'Career Advisor',
    administrator: 'Administrator',
    super_user: 'Super User'
  };

  return (
    <Tabs defaultValue={activeTab} className="space-y-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
        <TabsTrigger value="journey"><BarChart4 className="h-4 w-4 mr-2" /> Journey</TabsTrigger>
        <TabsTrigger value="resources"><BookOpen className="h-4 w-4 mr-2" /> Resources</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        <Alert className="mb-8">
          <User className="h-4 w-4" />
          <AlertTitle className="font-semibold">Welcome to your {roleLabels[userRole] || userRole} Dashboard!</AlertTitle>
          <AlertDescription>
            This is your personalized dashboard. More features specific to your role will be available soon.
          </AlertDescription>
        </Alert>
        
        <DashboardOverview 
          metrics={[
            { title: "Journey Status", value: roleLabels[userRole] || userRole, change: "", description: "Your current position" },
            { title: "Recommended Services", value: "5", change: "", description: "Based on your role" },
            { title: "Network", value: "0", change: "", description: "Your professional connections" }
          ]}
        />
      </TabsContent>
      
      <TabsContent value="journey" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Career Journey</CardTitle>
            <CardDescription>Track your progress and plan your next steps</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-1 bg-gray-200"></div>
              
              <div className="relative pl-8 pb-8">
                <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-emirati-teal"></div>
                <h3 className="font-medium text-lg">Education</h3>
                <p className="text-sm text-muted-foreground">Completed primary and secondary education</p>
              </div>
              
              <div className="relative pl-8 pb-8">
                <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-emirati-teal"></div>
                <h3 className="font-medium text-lg">Current: {roleLabels[userRole] || userRole}</h3>
                <p className="text-sm text-muted-foreground">You are here in your journey</p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-gray-300"></div>
                <h3 className="font-medium text-lg text-muted-foreground">Next Steps</h3>
                <p className="text-sm text-muted-foreground">Set your goals and plan your career path</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="resources" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Tools</CardTitle>
            <CardDescription>Services and resources for you</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardActions 
              actions={[
                { title: "Career Planning", description: "Explore opportunities", icon: Briefcase },
                { title: "Skill Development", description: "Enhance your skills", icon: BookOpen },
                { title: "Mentorship", description: "Connect with mentors", icon: Users },
                { title: "Networking", description: "Build relationships", icon: Users }
              ]}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardPage;
