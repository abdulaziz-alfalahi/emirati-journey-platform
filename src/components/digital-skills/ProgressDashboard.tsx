
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Award, Book, Clock, TrendingUp, Calendar, Target, CheckCircle } from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('this-month');

  const overallStats = {
    skillsLevel: 72,
    coursesCompleted: 8,
    certificationsEarned: 3,
    practiceHours: 145,
    learningStreak: 12,
    skillsImproved: 6
  };

  const skillProgress = [
    { skill: 'Python Programming', level: 85, progress: 15, category: 'Programming' },
    { skill: 'Data Analysis', level: 78, progress: 22, category: 'Data Science' },
    { skill: 'Machine Learning', level: 45, progress: 35, category: 'AI & ML' },
    { skill: 'React Development', level: 92, progress: 8, category: 'Web Development' },
    { skill: 'SQL', level: 70, progress: 18, category: 'Database' },
    { skill: 'Digital Marketing', level: 60, progress: 25, category: 'Marketing' }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: 'Python Fundamentals',
      type: 'Course Completion',
      date: '2024-03-15',
      badge: 'programming',
      icon: Book
    },
    {
      id: 2,
      title: 'Data Analysis Project',
      type: 'Project Completion',
      date: '2024-03-12',
      badge: 'data-science',
      icon: Award
    },
    {
      id: 3,
      title: '30-Day Learning Streak',
      type: 'Milestone',
      date: '2024-03-10',
      badge: 'consistency',
      icon: TrendingUp
    },
    {
      id: 4,
      title: 'JavaScript Certification',
      type: 'Certification',
      date: '2024-03-08',
      badge: 'programming',
      icon: Award
    }
  ];

  const learningPaths = [
    {
      name: 'Data Science Mastery',
      progress: 65,
      totalCourses: 12,
      completedCourses: 8,
      estimatedCompletion: '6 weeks',
      nextMilestone: 'Machine Learning Fundamentals'
    },
    {
      name: 'Full-Stack Development',
      progress: 40,
      totalCourses: 15,
      completedCourses: 6,
      estimatedCompletion: '10 weeks',
      nextMilestone: 'Backend Development with Node.js'
    },
    {
      name: 'Digital Marketing Professional',
      progress: 80,
      totalCourses: 8,
      completedCourses: 6,
      estimatedCompletion: '2 weeks',
      nextMilestone: 'Advanced Analytics'
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 1.5 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.8 }
  ];

  const recommendations = [
    {
      title: 'Complete Machine Learning Basics',
      description: 'You\'re 75% through this course. Finish to unlock advanced topics.',
      priority: 'high',
      timeEstimate: '2 hours'
    },
    {
      title: 'Practice SQL Queries',
      description: 'Strengthen your database skills with daily practice exercises.',
      priority: 'medium',
      timeEstimate: '30 mins/day'
    },
    {
      title: 'Join React Community Project',
      description: 'Apply your React skills in a real-world collaborative project.',
      priority: 'medium',
      timeEstimate: '3-4 weeks'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Progress Dashboard</h2>
          <p className="text-muted-foreground">Track your learning journey and skill development</p>
        </CardContent>
      </Card>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{overallStats.skillsLevel}%</div>
            <div className="text-xs text-muted-foreground">Overall Skills Level</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{overallStats.coursesCompleted}</div>
            <div className="text-xs text-muted-foreground">Courses Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{overallStats.certificationsEarned}</div>
            <div className="text-xs text-muted-foreground">Certifications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{overallStats.practiceHours}</div>
            <div className="text-xs text-muted-foreground">Practice Hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{overallStats.learningStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-600 mb-1">{overallStats.skillsImproved}</div>
            <div className="text-xs text-muted-foreground">Skills Improved</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Skills Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillProgress.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium">{skill.skill}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{skill.level}%</span>
                        <div className="text-xs text-green-600">+{skill.progress}% this month</div>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                            {rec.priority} priority
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {rec.timeEstimate}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <div className="space-y-4">
            {learningPaths.map((path, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{path.name}</h3>
                    <Badge variant="outline">
                      {path.completedCourses}/{path.totalCourses} completed
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Next Milestone:</span>
                        <div className="text-muted-foreground">{path.nextMilestone}</div>
                      </div>
                      <div>
                        <span className="font-medium">Estimated Completion:</span>
                        <div className="text-muted-foreground">{path.estimatedCompletion}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Weekly Learning Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                      <div className="bg-blue-100 rounded h-16 flex items-end justify-center p-1">
                        <div 
                          className="bg-blue-600 rounded-sm w-full"
                          style={{ height: `${(day.hours / 4) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1">{day.hours}h</div>
                    </div>
                  ))}
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">18.9h</div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">2.7h</div>
                    <div className="text-sm text-muted-foreground">Daily Average</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">+25%</div>
                    <div className="text-sm text-muted-foreground">vs Last Week</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4">
            {recentAchievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={achievement.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {new Date(achievement.date).toLocaleDateString()}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {achievement.badge}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Keep Going!</h3>
              <p className="text-muted-foreground mb-4">
                You're making great progress. Complete 2 more courses to unlock the next badge tier.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View All Badges
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
