import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LucideIcon, GraduationCap, BookOpen, Users, TrendingUp, Calendar, Award, Bell, Target } from 'lucide-react';

export interface EducationStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface EducationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export interface AcademicProgress {
  courseId: string;
  courseName: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  nextDeadline?: Date;
  status: 'active' | 'completed' | 'pending';
}

export interface AcademicAnnouncement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: Date;
  urgent?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  dateEarned: Date;
  category: 'academic' | 'participation' | 'leadership';
}

export interface InstitutionalBranding {
  institutionName: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface EducationPathwayLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: EducationStat[];
  tabs: EducationTab[];
  defaultTab: string;
  heroImageUrl?: string;
  actionButtonText?: string;
  actionButtonHref?: string;
  academicProgress?: AcademicProgress[];
  announcements?: AcademicAnnouncement[];
  achievements?: Achievement[];
  institutionalBranding?: InstitutionalBranding;
  currentGPA?: number;
  academicYear?: string;
}

export const EducationPathwayLayout: React.FC<EducationPathwayLayoutProps> = ({
  title,
  description,
  icon,
  stats,
  tabs,
  defaultTab,
  heroImageUrl,
  actionButtonText = "Get Started",
  actionButtonHref = "#",
  academicProgress = [],
  announcements = [],
  achievements = [],
  institutionalBranding,
  currentGPA,
  academicYear
}) => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-ehrdc-teal/5 via-ehrdc-light-teal/10 to-ehrdc-neutral-light">
      {/* Hero Section with Academic Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-ehrdc-teal/10 to-green-700/10" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        
        <div className="relative dubai-container">
          {/* Institutional Branding */}
          {institutionalBranding && (
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                {institutionalBranding.logoUrl && (
                  <img 
                    src={institutionalBranding.logoUrl} 
                    alt={institutionalBranding.institutionName}
                    className="h-8 w-8 object-contain"
                  />
                )}
                <span className="font-semibold text-blue-900">{institutionalBranding.institutionName}</span>
                {academicYear && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {academicYear}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-2xl shadow-lg border-2 border-blue-100">
                {icon}
              </div>
            </div>
            
            <Badge className="mb-6 bg-blue-900/10 text-blue-900 hover:bg-blue-900/20 border border-blue-200">
              <GraduationCap className="h-4 w-4 mr-2" />
              Education Pathway
            </Badge>
            
            <h1 className="dubai-text-heading-1 text-blue-900 mb-6">
              {title}
            </h1>
            
            <p className="dubai-text-body-large text-blue-800/70 mb-8 max-w-3xl mx-auto">
              {description}
            </p>

            {/* Academic Status Bar */}
            {currentGPA && (
              <div className="flex justify-center mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-green-200">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">{currentGPA.toFixed(2)}</div>
                      <div className="text-sm text-green-600">Current GPA</div>
                    </div>
                    <div className="h-8 w-px bg-green-200"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700">{academicProgress.filter(p => p.status === 'active').length}</div>
                      <div className="text-sm text-blue-600">Active Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3"
                asChild
              >
                <a href={actionButtonHref}>
                  {actionButtonText}
                </a>
              </Button>
              <Button
                variant="outline" 
                size="lg"
                className="px-8 py-3 border-green-600/20 hover:bg-green-600/10 text-green-700"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="dubai-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <stat.icon className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-700/70">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Progress Section */}
      {academicProgress.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="dubai-container">
            <div className="text-center mb-12">
              <h2 className="dubai-text-heading-2 text-blue-900 mb-4">Course Progress</h2>
              <p className="text-blue-700/70 max-w-2xl mx-auto">Track your academic journey and stay on top of your coursework.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {academicProgress.slice(0, 4).map((course) => (
                <Card key={course.courseId} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-blue-900">{course.courseName}</CardTitle>
                      <Badge 
                        variant={course.status === 'completed' ? 'default' : course.status === 'active' ? 'secondary' : 'outline'}
                        className={
                          course.status === 'completed' ? 'bg-green-100 text-green-800' :
                          course.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-blue-700">Progress</span>
                          <span className="font-medium text-blue-900">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2 bg-blue-100" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="font-bold text-blue-900">{course.completedModules}</div>
                          <div className="text-blue-700">Completed</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="font-bold text-green-900">{course.totalModules - course.completedModules}</div>
                          <div className="text-green-700">Remaining</div>
                        </div>
                      </div>
                      
                      {course.nextDeadline && (
                        <div className="flex items-center gap-2 text-sm p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <Calendar className="h-4 w-4 text-amber-600" />
                          <span className="text-amber-800">
                            Next deadline: {course.nextDeadline.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {academicProgress.length > 4 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  View All Courses
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Announcements and Achievements Section */}
      {(announcements.length > 0 || achievements.length > 0) && (
        <section className="py-16 bg-white">
          <div className="dubai-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Announcements */}
              {announcements.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bell className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="dubai-text-heading-3 text-blue-900">Academic Announcements</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {announcements.slice(0, 3).map((announcement) => (
                      <Alert 
                        key={announcement.id} 
                        className={`border-l-4 ${
                          announcement.type === 'warning' ? 'border-l-amber-500 bg-amber-50' :
                          announcement.type === 'success' ? 'border-l-green-500 bg-green-50' :
                          'border-l-blue-500 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-blue-900">{announcement.title}</h4>
                              {announcement.urgent && (
                                <Badge variant="destructive" className="text-xs">Urgent</Badge>
                              )}
                            </div>
                            <AlertDescription className="text-blue-800/80">
                              {announcement.message}
                            </AlertDescription>
                          </div>
                          <span className="text-xs text-blue-600 ml-4">
                            {announcement.date.toLocaleDateString()}
                          </span>
                        </div>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="dubai-text-heading-3 text-green-900">Recent Achievements</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {achievements.slice(0, 3).map((achievement) => (
                      <Card key={achievement.id} className="border border-green-200 bg-green-50/50">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                              <achievement.icon className="h-5 w-5 text-green-700" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-green-900">{achievement.title}</h4>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    achievement.category === 'academic' ? 'border-blue-200 text-blue-700' :
                                    achievement.category === 'leadership' ? 'border-purple-200 text-purple-700' :
                                    'border-green-200 text-green-700'
                                  }`}
                                >
                                  {achievement.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-green-800/80 mb-2">{achievement.description}</p>
                              <span className="text-xs text-green-600">
                                Earned {achievement.dateEarned.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="dubai-container">
          <Tabs defaultValue={defaultTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-2xl grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur-sm shadow-sm border border-ehrdc-teal/10">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 data-[state=active]:bg-ehrdc-teal/10 data-[state=active]:text-ehrdc-teal"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-sm border border-ehrdc-teal/10">
                  {tab.content}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gradient-to-r from-ehrdc-teal/5 to-ehrdc-dark-teal/5">
        <div className="dubai-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-ehrdc-teal/10 rounded-lg">
                <Users className="h-8 w-8 text-ehrdc-teal" />
              </div>
            </div>
            
            <h2 className="dubai-text-heading-2 text-ehrdc-neutral-dark mb-4">
              Join Our Learning Community
            </h2>
            
            <p className="dubai-text-body text-ehrdc-neutral-dark/70 mb-8">
              Connect with fellow learners, share experiences, and access exclusive educational resources designed for UAE citizens.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center border-0 bg-white/80">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-ehrdc-teal mb-2">15K+</div>
                  <div className="text-sm text-ehrdc-neutral-dark/70">Active Learners</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 bg-white/80">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-ehrdc-dark-teal mb-2">500+</div>
                  <div className="text-sm text-ehrdc-neutral-dark/70">Expert Instructors</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 bg-white/80">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-ehrdc-light-teal mb-2">95%</div>
                  <div className="text-sm text-ehrdc-neutral-dark/70">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3 border-ehrdc-teal/20 hover:bg-ehrdc-teal/10"
            >
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default EducationPathwayLayout;