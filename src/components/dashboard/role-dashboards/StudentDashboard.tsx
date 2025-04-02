
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, BookOpen, Calendar, User, Users } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecommendedJobs } from '@/components/job-matching/RecommendedJobs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

interface StudentDashboardProps {
  activeTab: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ activeTab = "overview" }) => {
  const [hasCareerPathway, setHasCareerPathway] = useState(false);
  const [CareerPathway, setCareerPathway] = useState<React.FC | null>(null);
  
  // Added console log for debugging
  console.log("StudentDashboard rendered with activeTab:", activeTab);
  
  // Force rerender of content when the component mounts
  useEffect(() => {
    console.log("StudentDashboard mounted/updated");
    
    // Check if CareerPathway component exists and import it dynamically
    const loadCareerPathway = async () => {
      try {
        const module = await import('@/components/student/CareerPathway');
        setCareerPathway(() => module.default);
        setHasCareerPathway(true);
        console.log("CareerPathway component loaded successfully");
      } catch (err) {
        console.error("Error loading CareerPathway component:", err);
        setHasCareerPathway(false);
      }
    };
    
    loadCareerPathway();
  }, []);
  
  return (
    <Tabs defaultValue={activeTab} className="space-y-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
        <TabsTrigger value="academics"><BookOpen className="h-4 w-4 mr-2" /> Academics</TabsTrigger>
        <TabsTrigger value="activities"><Calendar className="h-4 w-4 mr-2" /> Activities</TabsTrigger>
        <TabsTrigger value="career"><BarChart4 className="h-4 w-4 mr-2" /> Career</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        <DashboardOverview 
          metrics={[
            { title: "Academic Progress", value: "Grade 11", change: "", description: "Academic Year 2023-2024" },
            { title: "Summer Programs", value: "12", change: "", description: "Available programs near you" },
            { title: "Upcoming Assessments", value: "3", change: "", description: "Due this week" }
          ]}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Summer Knowledge Camps</CardTitle>
            <CardDescription>Explore educational summer camps available now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Tech Innovators</CardTitle>
                  <CardDescription>July 10-28, 2023</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm mb-2">Learn coding and robotics this summer</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <Users className="h-3 w-3 mr-1" /> 18/30
                    </span>
                    <span className="font-medium">1,500 AED</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Science Academy</CardTitle>
                  <CardDescription>July 3-21, 2023</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm mb-2">Explore physics and chemistry experiments</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <Users className="h-3 w-3 mr-1" /> 22/25
                    </span>
                    <span className="font-medium">1,200 AED</span>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center">
                <Link to="/summer-camps">
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center h-full flex flex-col justify-center items-center hover:bg-muted/50 transition-colors">
                    <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="font-medium">View All Camps</p>
                    <p className="text-sm text-muted-foreground">Explore 40+ summer programs</p>
                  </div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <RecommendedJobs limit={3} />
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
                { title: "Career Guidance", description: "Explore career paths", icon: BarChart4 },
                { title: "Scholarship Finder", description: "Find opportunities", icon: Users },
                { title: "Summer Camps", description: "Educational programs", icon: Calendar, link: "/summer-camps" }
              ]}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="career" className="space-y-8">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Career Development Status</CardTitle>
            <CardDescription>Your progress on the career development journey</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your selected career path: <strong>Computer Science</strong></p>
          </CardContent>
        </Card>
        
        {hasCareerPathway && CareerPathway ? (
          <CareerPathway />
        ) : (
          <Card>
            <CardContent className="py-4">
              <Alert>
                <AlertDescription>
                  Career pathway visualization is currently loading or unavailable. Please check the console for any errors.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default StudentDashboard;
