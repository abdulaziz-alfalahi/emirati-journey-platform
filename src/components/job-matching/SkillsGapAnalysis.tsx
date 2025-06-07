
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart2, Target, TrendingUp, BookOpen } from 'lucide-react';

export const SkillsGapAnalysis: React.FC = () => {
  const skillGaps = [
    { skill: 'Machine Learning', current: 70, required: 90, gap: 20, priority: 'High' },
    { skill: 'Cloud Computing', current: 60, required: 85, gap: 25, priority: 'High' },
    { skill: 'Data Analysis', current: 80, required: 95, gap: 15, priority: 'Medium' },
    { skill: 'Project Management', current: 65, required: 80, gap: 15, priority: 'Medium' },
    { skill: 'React Development', current: 85, required: 90, gap: 5, priority: 'Low' },
    { skill: 'DevOps', current: 45, required: 75, gap: 30, priority: 'High' }
  ];

  const recommendations = [
    {
      title: 'Enhance Cloud Skills',
      description: 'Complete AWS certification to increase job prospects by 40%',
      priority: 'High',
      timeFrame: '2-3 months',
      skills: ['AWS', 'Azure', 'Google Cloud']
    },
    {
      title: 'Build ML Portfolio',
      description: 'Create 2-3 machine learning projects to demonstrate expertise',
      priority: 'High',
      timeFrame: '1-2 months',
      skills: ['Python', 'TensorFlow', 'Scikit-learn']
    },
    {
      title: 'DevOps Foundation',
      description: 'Learn containerization and CI/CD best practices',
      priority: 'Medium',
      timeFrame: '3-4 months',
      skills: ['Docker', 'Kubernetes', 'Jenkins']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills Gap Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ehrdc-teal" />
            Skills Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillGaps.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{skill.skill}</span>
                    <Badge className={getPriorityColor(skill.priority)}>
                      {skill.priority} Priority
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Gap: {skill.gap} points
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {skill.current}%</span>
                    <span>Required: {skill.required}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={skill.current} className="h-2" />
                    <div 
                      className="absolute top-0 h-2 bg-ehrdc-teal/20 rounded-full"
                      style={{ 
                        left: `${skill.current}%`, 
                        width: `${skill.required - skill.current}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-ehrdc-teal" />
            Skill Development Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{rec.title}</h3>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{rec.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {rec.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3 w-3" />
                      Timeline: {rec.timeFrame}
                    </div>
                    <Button size="sm">
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-ehrdc-teal" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Take Skills Assessment</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Get a detailed analysis of your current skill levels
              </span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Browse Learning Paths</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Find courses and resources to bridge your skill gaps
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
