
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart4, GraduationCap, BookOpen, Award, School } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Link } from 'react-router-dom';

interface StudentDashboardProps {
  activeTab: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading delay for the CareerPathway component
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tabs defaultValue={activeTab} className="space-y-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="career">Career</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        <DashboardOverview 
          metrics={[
            { title: "Courses", value: "4", change: "", description: "Currently enrolled" },
            { title: "Assessments", value: "2", change: "+1", description: "Due this week" },
            { title: "Scholarship Opportunities", value: "12", change: "+3", description: "New this month" }
          ]}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">Scholarship Opportunities</CardTitle>
                <CardDescription>Latest scholarship offerings</CardDescription>
              </div>
              <Link to="/scholarships">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-3 flex items-start">
                <Award className="h-10 w-10 text-primary mr-3 p-2 bg-primary/10 rounded-lg" />
                <div>
                  <h4 className="text-sm font-semibold">STEM Excellence Scholarship</h4>
                  <p className="text-xs text-muted-foreground">Full tuition for top science students</p>
                  <div className="mt-1 flex items-center">
                    <GraduationCap className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Deadline: Apr 15, 2025</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-3 flex items-start">
                <Award className="h-10 w-10 text-amber-500 mr-3 p-2 bg-amber-500/10 rounded-lg" />
                <div>
                  <h4 className="text-sm font-semibold">Future Leaders Program</h4>
                  <p className="text-xs text-muted-foreground">25,000 AED grant + mentorship</p>
                  <div className="mt-1 flex items-center">
                    <School className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Deadline: May 30, 2025</span>
                  </div>
                </div>
              </div>
              <Link to="/scholarships" className="block">
                <Button variant="link" size="sm" className="flex mx-auto mt-2">
                  View all scholarships
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Summer Knowledge Camps</CardTitle>
              <CardDescription>Recommended for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-3 flex items-start">
                <BookOpen className="h-10 w-10 text-blue-500 mr-3 p-2 bg-blue-500/10 rounded-lg" />
                <div>
                  <h4 className="text-sm font-semibold">Tech Innovators Camp</h4>
                  <p className="text-xs text-muted-foreground">Coding, robotics, and AI for beginners</p>
                  <div className="mt-1 text-xs text-muted-foreground flex gap-2">
                    <span>July 10-28</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">Registering now</span>
                  </div>
                </div>
              </div>
              <Link to="/summer-camps" className="block">
                <Button variant="link" size="sm" className="flex mx-auto mt-2">
                  Browse all summer camps
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Tools</CardTitle>
            <CardDescription>Access your student resources</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardActions 
              actions={[
                { title: "Course Catalog", description: "Browse available courses", icon: BookOpen },
                { title: "Career Assessment", description: "Discover your path", icon: BarChart4 },
                { title: "Scholarships", description: "Find financial aid", icon: Award, link: "/scholarships" },
                { title: "Summer Camps", description: "Knowledge programs", icon: School, link: "/summer-camps" }
              ]}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="courses" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Your enrolled courses and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              <h3 className="font-medium mb-2">Course content is coming soon</h3>
              <p>This feature is currently in development.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="career" className="space-y-6">
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <React.Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            }>
              <CareerPathwayLoader />
            </React.Suspense>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Lazy loaded component
const CareerPathwayLoader = () => {
  const CareerPathway = React.lazy(() => import('@/components/student/CareerPathway'));
  return <CareerPathway />;
};

export default StudentDashboard;
