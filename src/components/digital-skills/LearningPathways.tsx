
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Clock, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';

export const LearningPathways: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState('data-analytics');

  const learningPaths = {
    'data-analytics': {
      title: 'Data Literacy & Analytics',
      description: 'Master data analysis, visualization, and interpretation skills',
      duration: '12-16 weeks',
      difficulty: 'Beginner to Advanced',
      enrolledUsers: 1250,
      completionRate: 85,
      stages: [
        {
          title: 'Data Fundamentals',
          duration: '3 weeks',
          courses: [
            'Introduction to Data Analysis',
            'Excel for Data Analysis',
            'Data Visualization Basics'
          ],
          skills: ['Data Types', 'Basic Statistics', 'Excel Functions'],
          completed: true
        },
        {
          title: 'Advanced Analytics',
          duration: '4 weeks',
          courses: [
            'Power BI Fundamentals',
            'Tableau Essentials',
            'SQL for Data Analysis'
          ],
          skills: ['Business Intelligence', 'Data Modeling', 'SQL Queries'],
          completed: false
        },
        {
          title: 'Data Science Foundations',
          duration: '5 weeks',
          courses: [
            'Python for Data Science',
            'Statistical Analysis',
            'Machine Learning Basics'
          ],
          skills: ['Python Programming', 'Statistical Modeling', 'Predictive Analytics'],
          completed: false
        }
      ]
    },
    'programming': {
      title: 'Programming & Development',
      description: 'Build software development skills from scratch to professional level',
      duration: '20-24 weeks',
      difficulty: 'Beginner to Advanced',
      enrolledUsers: 2100,
      completionRate: 78,
      stages: [
        {
          title: 'Programming Basics',
          duration: '6 weeks',
          courses: [
            'Introduction to Programming',
            'JavaScript Fundamentals',
            'HTML & CSS Basics'
          ],
          skills: ['Logic Building', 'Syntax Understanding', 'Web Basics'],
          completed: false
        },
        {
          title: 'Frontend Development',
          duration: '8 weeks',
          courses: [
            'React.js Development',
            'Responsive Design',
            'Frontend Tools & Workflow'
          ],
          skills: ['React', 'CSS Frameworks', 'Version Control'],
          completed: false
        }
      ]
    },
    'cybersecurity': {
      title: 'Cybersecurity',
      description: 'Protect systems and data with comprehensive security knowledge',
      duration: '16-20 weeks',
      difficulty: 'Intermediate to Advanced',
      enrolledUsers: 850,
      completionRate: 82,
      stages: [
        {
          title: 'Security Fundamentals',
          duration: '4 weeks',
          courses: [
            'Information Security Basics',
            'Network Security',
            'Risk Assessment'
          ],
          skills: ['Security Principles', 'Threat Analysis', 'Risk Management'],
          completed: false
        }
      ]
    }
  };

  const currentPath = learningPaths[selectedPath as keyof typeof learningPaths];
  const overallProgress = currentPath.stages.filter(stage => stage.completed).length / currentPath.stages.length * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Learning Pathways</h2>
          <p className="text-muted-foreground">Structured learning journeys designed for career advancement</p>
        </CardContent>
      </Card>

      {/* Path Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Choose Your Learning Path</label>
              <Select value={selectedPath} onValueChange={setSelectedPath}>
                <SelectTrigger className="max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data-analytics">Data Literacy & Analytics</SelectItem>
                  <SelectItem value="programming">Programming & Development</SelectItem>
                  <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                  <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                  <SelectItem value="ux-design">UX/UI Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
          </div>

          {/* Path Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">{currentPath.title}</h3>
              <p className="text-muted-foreground mb-4">{currentPath.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Duration: {currentPath.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>Level: {currentPath.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>{currentPath.enrolledUsers.toLocaleString()} enrolled</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Your Progress</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Completion</span>
                    <span>{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentPath.stages.filter(s => s.completed).length} of {currentPath.stages.length} stages completed
                </div>
              </div>
            </div>

            <div className="text-right">
              <Button className="bg-blue-600 hover:bg-blue-700 mb-2">
                {overallProgress > 0 ? 'Continue Learning' : 'Start Path'}
              </Button>
              <div className="text-sm text-muted-foreground">
                {currentPath.completionRate}% completion rate
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Stages */}
      <div className="space-y-6">
        {currentPath.stages.map((stage, index) => (
          <Card key={index} className={stage.completed ? 'border-green-200 bg-green-50/50' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold ${
                    stage.completed 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    {stage.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{stage.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{stage.duration}</span>
                      <span>{stage.courses.length} courses</span>
                    </div>
                  </div>
                </div>
                <Badge variant={stage.completed ? 'default' : 'outline'}>
                  {stage.completed ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Courses</h4>
                  <ul className="space-y-2">
                    {stage.courses.map((course, courseIndex) => (
                      <li key={courseIndex} className="text-sm flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stage.completed ? 'bg-green-600' : 'bg-blue-600'}`} />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {stage.completed ? (
                    <Button variant="outline" className="w-full">
                      Review Materials
                    </Button>
                  ) : (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {index === 0 || currentPath.stages[index - 1]?.completed ? 'Start Stage' : 'Locked'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pathway Statistics */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Pathway Insights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{currentPath.completionRate}%</div>
              <div className="text-sm text-muted-foreground">Average Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Job Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">+35%</div>
              <div className="text-sm text-muted-foreground">Average Salary Increase</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
