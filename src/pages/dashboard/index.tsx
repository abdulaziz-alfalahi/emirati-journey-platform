
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { User } from 'lucide-react';

const DashboardPage = () => {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If no user, redirect to login
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Role-specific dashboard content based on user role
  const getRoleDashboard = () => {
    if (roles.includes('administrator') || roles.includes('super_user')) {
      return <AdminDashboard />;
    }
    
    if (roles.includes('school_student')) {
      return <StudentDashboard />;
    }

    if (roles.includes('educational_institution')) {
      return <EducationalInstitutionDashboard />;
    }
    
    if (roles.includes('parent')) {
      return <ParentDashboard />;
    }
    
    if (roles.includes('private_sector_recruiter')) {
      return <RecruiterDashboard />;
    }
    
    // Default dashboard for other roles
    return <DefaultDashboard userRole={roles[0]} />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-7xl">
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
  );
};

// Role-specific dashboard components
const AdminDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Total Users</CardTitle>
          <CardDescription>System-wide user metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">247</div>
          <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Active Journeys</CardTitle>
          <CardDescription>Current active user journeys</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">182</div>
          <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Service Utilization</CardTitle>
          <CardDescription>Most used platform services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">68%</div>
          <p className="text-xs text-muted-foreground mt-2">Career Advisory Services</p>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Administration Tools</CardTitle>
        <CardDescription>Manage system and users</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">User Management</span>
          <span className="text-xs text-muted-foreground mt-1">Manage accounts</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Role Administration</span>
          <span className="text-xs text-muted-foreground mt-1">Assign user roles</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Content Manager</span>
          <span className="text-xs text-muted-foreground mt-1">Manage platform content</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Analytics & Reports</span>
          <span className="text-xs text-muted-foreground mt-1">View platform metrics</span>
        </Button>
      </CardContent>
    </Card>
  </div>
);

const StudentDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Academic Progress</CardTitle>
          <CardDescription>Your current academic status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">Grade 11</div>
          <p className="text-xs text-muted-foreground mt-2">Academic Year 2023-2024</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Summer Programs</CardTitle>
          <CardDescription>Available knowledge camps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">12</div>
          <p className="text-xs text-muted-foreground mt-2">Available programs near you</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Upcoming Assessments</CardTitle>
          <CardDescription>Scheduled tests and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">3</div>
          <p className="text-xs text-muted-foreground mt-2">Due this week</p>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Educational Resources</CardTitle>
        <CardDescription>Tools and resources for your academic journey</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Learning Materials</span>
          <span className="text-xs text-muted-foreground mt-1">Study resources</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Career Guidance</span>
          <span className="text-xs text-muted-foreground mt-1">Explore career paths</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Scholarship Finder</span>
          <span className="text-xs text-muted-foreground mt-1">Find opportunities</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Mentorship Connect</span>
          <span className="text-xs text-muted-foreground mt-1">Find a mentor</span>
        </Button>
      </CardContent>
    </Card>
  </div>
);

const EducationalInstitutionDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Students</CardTitle>
          <CardDescription>Total registered students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">1,247</div>
          <p className="text-xs text-muted-foreground mt-2">+5% growth this semester</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Programs</CardTitle>
          <CardDescription>Active educational programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">24</div>
          <p className="text-xs text-muted-foreground mt-2">Including 5 new this year</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Scholarships</CardTitle>
          <CardDescription>Available scholarship opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">12</div>
          <p className="text-xs text-muted-foreground mt-2">8 active applications</p>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Institution Tools</CardTitle>
        <CardDescription>Manage your educational institution</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Student Records</span>
          <span className="text-xs text-muted-foreground mt-1">Upload and manage</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Programs</span>
          <span className="text-xs text-muted-foreground mt-1">Manage educational offerings</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Scholarships</span>
          <span className="text-xs text-muted-foreground mt-1">Create opportunities</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Summer Knowledge Camps</span>
          <span className="text-xs text-muted-foreground mt-1">Organize programs</span>
        </Button>
      </CardContent>
    </Card>
  </div>
);

const ParentDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Children</CardTitle>
          <CardDescription>Registered children</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">2</div>
          <p className="text-xs text-muted-foreground mt-2">Ages 14 and 16</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Upcoming Events</CardTitle>
          <CardDescription>School and activity events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">4</div>
          <p className="text-xs text-muted-foreground mt-2">Next: Parent-Teacher Meeting</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Recommended Programs</CardTitle>
          <CardDescription>Based on your children's interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">7</div>
          <p className="text-xs text-muted-foreground mt-2">New recommendations</p>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Parent Resources</CardTitle>
        <CardDescription>Tools to support your children's journey</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Academic Reports</span>
          <span className="text-xs text-muted-foreground mt-1">View children's progress</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Summer Programs</span>
          <span className="text-xs text-muted-foreground mt-1">Browse and register</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Scholarship Opportunities</span>
          <span className="text-xs text-muted-foreground mt-1">Financial aid options</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Career Guidance</span>
          <span className="text-xs text-muted-foreground mt-1">Help plan their future</span>
        </Button>
      </CardContent>
    </Card>
  </div>
);

const RecruiterDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Open Positions</CardTitle>
          <CardDescription>Currently advertised jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">15</div>
          <p className="text-xs text-muted-foreground mt-2">5 new this month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Applications</CardTitle>
          <CardDescription>Received job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">47</div>
          <p className="text-xs text-muted-foreground mt-2">23 new, 24 in review</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Internship Programs</CardTitle>
          <CardDescription>Available internship positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">8</div>
          <p className="text-xs text-muted-foreground mt-2">Starting next quarter</p>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Tools</CardTitle>
        <CardDescription>Manage your recruitment activities</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Post Job</span>
          <span className="text-xs text-muted-foreground mt-1">Create new listings</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Internship Manager</span>
          <span className="text-xs text-muted-foreground mt-1">Organize programs</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Candidate Search</span>
          <span className="text-xs text-muted-foreground mt-1">Find talented candidates</span>
        </Button>
        
        <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
          <span className="text-lg font-semibold">Emiratization Tracker</span>
          <span className="text-xs text-muted-foreground mt-1">Monitor compliance</span>
        </Button>
      </CardContent>
    </Card>
  </div>
);

const DefaultDashboard = ({ userRole }: { userRole: string }) => {
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
    <div className="space-y-8">
      <Alert className="mb-8">
        <User className="h-4 w-4" />
        <AlertTitle className="font-semibold">Welcome to your {roleLabels[userRole] || userRole} Dashboard!</AlertTitle>
        <AlertDescription>
          This is your personalized dashboard. More features specific to your role will be available soon.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Journey Status</CardTitle>
            <CardDescription>Your current position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{roleLabels[userRole] || userRole}</div>
            <p className="text-xs text-muted-foreground mt-2">Active since {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Recommended Services</CardTitle>
            <CardDescription>Based on your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-2">New recommendations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Network</CardTitle>
            <CardDescription>Your professional connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-2">Start building your network</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Tools</CardTitle>
          <CardDescription>Services and resources for you</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
            <span className="text-lg font-semibold">Career Planning</span>
            <span className="text-xs text-muted-foreground mt-1">Explore opportunities</span>
          </Button>
          
          <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
            <span className="text-lg font-semibold">Skill Development</span>
            <span className="text-xs text-muted-foreground mt-1">Enhance your skills</span>
          </Button>
          
          <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
            <span className="text-lg font-semibold">Mentorship</span>
            <span className="text-xs text-muted-foreground mt-1">Connect with mentors</span>
          </Button>
          
          <Button className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
            <span className="text-lg font-semibold">Networking</span>
            <span className="text-xs text-muted-foreground mt-1">Build relationships</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
