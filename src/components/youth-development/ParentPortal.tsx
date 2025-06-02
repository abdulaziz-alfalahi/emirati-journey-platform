
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, TrendingUp, Calendar, Award, MessageCircle, Bell, Shield } from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('ahmed');

  const children = [
    {
      id: 'ahmed',
      name: 'Ahmed Ali',
      age: 16,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      activePrograms: 3,
      completedPrograms: 5,
      upcomingEvents: 2
    },
    {
      id: 'sara',
      name: 'Sara Ali',
      age: 14,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      activePrograms: 2,
      completedPrograms: 3,
      upcomingEvents: 1
    }
  ];

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  const programProgress = [
    {
      program: 'Young Leaders Council',
      progress: 75,
      nextSession: '2024-02-15',
      instructor: 'Dr. Fatima Al-Zahra',
      status: 'On Track'
    },
    {
      program: 'Innovation Lab',
      progress: 60,
      nextSession: '2024-02-18',
      instructor: 'Ahmed Al-Mansouri',
      status: 'Excellent'
    },
    {
      program: 'Community Service Project',
      progress: 90,
      nextSession: '2024-02-20',
      instructor: 'Mariam Al-Khouri',
      status: 'Outstanding'
    }
  ];

  const recentActivities = [
    {
      date: '2024-02-10',
      activity: 'Completed Innovation Workshop Module 3',
      program: 'Innovation Lab',
      score: '95%'
    },
    {
      date: '2024-02-08',
      activity: 'Participated in Leadership Group Discussion',
      program: 'Young Leaders Council',
      score: 'Excellent'
    },
    {
      date: '2024-02-05',
      activity: 'Submitted Community Service Project Proposal',
      program: 'Community Service Project',
      score: 'Outstanding'
    }
  ];

  const notifications = [
    {
      id: '1',
      type: 'reminder',
      message: 'Ahmed has a Leadership Council session tomorrow at 3:00 PM',
      time: '2 hours ago',
      urgent: false
    },
    {
      id: '2',
      type: 'achievement',
      message: 'Sara earned the "Innovation Star" badge!',
      time: '1 day ago',
      urgent: false
    },
    {
      id: '3',
      type: 'alert',
      message: 'Permission required for Ahmed\'s field trip on Feb 25',
      time: '2 days ago',
      urgent: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Outstanding': return 'bg-green-100 text-green-800';
      case 'Excellent': return 'bg-blue-100 text-blue-800';
      case 'On Track': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-ehrdc-teal/10 to-ehrdc-light-teal/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Parent Portal</h2>
              <p className="text-muted-foreground">Monitor your children's development and engagement</p>
            </div>
            <Shield className="h-12 w-12 text-ehrdc-teal" />
          </div>
        </CardContent>
      </Card>

      {/* Child Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">Viewing progress for:</span>
            <div className="flex gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={selectedChild === child.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedChild(child.id)}
                  className={selectedChild === child.id ? 'ehrdc-button-primary' : ''}
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={child.avatar} />
                    <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {child.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-ehrdc-teal">{currentChild.activePrograms}</div>
                <div className="text-sm text-muted-foreground">Active Programs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-ehrdc-teal">{currentChild.completedPrograms}</div>
                <div className="text-sm text-muted-foreground">Completed Programs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-ehrdc-teal">{currentChild.upcomingEvents}</div>
                <div className="text-sm text-muted-foreground">Upcoming Events</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-ehrdc-teal">78%</div>
                <div className="text-sm text-muted-foreground">Average Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Child Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-ehrdc-teal" />
                {currentChild.name}'s Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentChild.avatar} />
                  <AvatarFallback>{currentChild.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{currentChild.name}</h3>
                  <p className="text-muted-foreground">{currentChild.age} years old</p>
                  <Badge className="mt-2 bg-ehrdc-teal text-white">Active Participant</Badge>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Recent Achievements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-ehrdc-teal rounded-full"></div>
                      <span>Completed Innovation Workshop Series</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-ehrdc-teal rounded-full"></div>
                      <span>Earned Leadership Foundation Certificate</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-ehrdc-teal rounded-full"></div>
                      <span>Volunteered 25+ Community Service Hours</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Skills Development Focus</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Leadership</span>
                      <span className="font-medium">Advanced</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Innovation</span>
                      <span className="font-medium">Intermediate</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Communication</span>
                      <span className="font-medium">Advanced</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {programProgress.map((program, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{program.program}</h3>
                    <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Instructor: {program.instructor}</span>
                    <span className="text-sm font-medium">{program.progress}%</span>
                  </div>
                  <Progress value={program.progress} className="h-2 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    Next session: {new Date(program.nextSession).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{activity.activity}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.program} • {new Date(activity.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant="outline">{activity.score}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-ehrdc-teal" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${
                    notification.urgent ? 'border-red-200 bg-red-50' : ''
                  }`}>
                    <div className="flex items-start justify-between">
                      <p className="text-sm">{notification.message}</p>
                      {notification.urgent && (
                        <Badge variant="destructive" className="ml-2">Urgent</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-ehrdc-teal" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full ehrdc-button-primary">
                  Message Instructors
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Parent-Teacher Meeting
                </Button>
                <Button variant="outline" className="w-full">
                  View Detailed Reports
                </Button>
                <Button variant="outline" className="w-full">
                  Update Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
