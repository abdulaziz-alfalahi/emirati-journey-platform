
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Database, Palette, Shield, Play, Clock, Users, CheckCircle } from 'lucide-react';

export const PracticeLab: React.FC = () => {
  const [activeEnvironment, setActiveEnvironment] = useState('coding');

  const environments = {
    coding: {
      title: 'Coding Playground',
      description: 'Practice programming in various languages with instant feedback',
      icon: Code,
      exercises: [
        {
          id: 1,
          title: 'Python Basics: Variables and Data Types',
          difficulty: 'Beginner',
          duration: '15 mins',
          language: 'Python',
          completed: true,
          description: 'Learn to work with variables, strings, numbers, and basic operations'
        },
        {
          id: 2,
          title: 'JavaScript DOM Manipulation',
          difficulty: 'Intermediate',
          duration: '30 mins',
          language: 'JavaScript',
          completed: false,
          description: 'Practice selecting and modifying HTML elements using JavaScript'
        },
        {
          id: 3,
          title: 'React Component Building',
          difficulty: 'Advanced',
          duration: '45 mins',
          language: 'JavaScript',
          completed: false,
          description: 'Create reusable React components with props and state'
        }
      ]
    },
    data: {
      title: 'Data Analysis Lab',
      description: 'Work with real datasets using professional analysis tools',
      icon: Database,
      exercises: [
        {
          id: 1,
          title: 'Sales Data Exploration',
          difficulty: 'Beginner',
          duration: '20 mins',
          language: 'Excel',
          completed: false,
          description: 'Analyze quarterly sales data using pivot tables and charts'
        },
        {
          id: 2,
          title: 'Customer Segmentation Analysis',
          difficulty: 'Intermediate',
          duration: '40 mins',
          language: 'Python',
          completed: false,
          description: 'Use clustering algorithms to segment customers by behavior'
        }
      ]
    },
    design: {
      title: 'Design Studio',
      description: 'Create user interfaces and design systems',
      icon: Palette,
      exercises: [
        {
          id: 1,
          title: 'Mobile App Wireframing',
          difficulty: 'Beginner',
          duration: '25 mins',
          language: 'Figma',
          completed: false,
          description: 'Design wireframes for a mobile banking app'
        },
        {
          id: 2,
          title: 'Design System Creation',
          difficulty: 'Advanced',
          duration: '60 mins',
          language: 'Figma',
          completed: false,
          description: 'Build a comprehensive design system with components'
        }
      ]
    },
    security: {
      title: 'Security Simulation',
      description: 'Practice cybersecurity in safe, controlled environments',
      icon: Shield,
      exercises: [
        {
          id: 1,
          title: 'Password Security Assessment',
          difficulty: 'Beginner',
          duration: '15 mins',
          language: 'Tools',
          completed: false,
          description: 'Learn to evaluate and improve password security'
        },
        {
          id: 2,
          title: 'Network Vulnerability Scan',
          difficulty: 'Intermediate',
          duration: '35 mins',
          language: 'Tools',
          completed: false,
          description: 'Identify and assess network security vulnerabilities'
        }
      ]
    }
  };

  const currentEnv = environments[activeEnvironment as keyof typeof environments];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice Lab</h2>
          <p className="text-muted-foreground">Hands-on practice in virtual environments tailored for skill development</p>
        </CardContent>
      </Card>

      {/* Environment Selection */}
      <Tabs value={activeEnvironment} onValueChange={setActiveEnvironment}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          {Object.entries(environments).map(([key, env]) => {
            const IconComponent = env.icon;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{env.title.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(environments).map(([key, env]) => (
          <TabsContent key={key} value={key}>
            <div className="space-y-6">
              {/* Environment Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <env.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{env.title}</h3>
                      <p className="text-muted-foreground mb-4">{env.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span>1,250+ active users</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span>24/7 availability</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Launch Environment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Practice Exercises */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold">Practice Exercises</h3>
                {env.exercises.map((exercise) => (
                  <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{exercise.title}</h4>
                            {exercise.completed && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{exercise.description}</p>
                          <div className="flex items-center gap-4">
                            <Badge variant={
                              exercise.difficulty === 'Beginner' ? 'secondary' :
                              exercise.difficulty === 'Intermediate' ? 'default' : 'destructive'
                            }>
                              {exercise.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {exercise.duration}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {exercise.language}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button 
                            size="sm" 
                            className={exercise.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                          >
                            {exercise.completed ? 'Review' : 'Start'}
                          </Button>
                          {!exercise.completed && (
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Environment Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Environment Features</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Real-time Feedback</h4>
                      <p className="text-sm text-muted-foreground">
                        Get instant feedback on your code and solutions as you work
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Collaborative Features</h4>
                      <p className="text-sm text-muted-foreground">
                        Share your workspace and collaborate with peers in real-time
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Progress Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor your progress and see detailed analytics of your practice sessions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
