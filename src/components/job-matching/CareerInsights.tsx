
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Award, Users, BarChart3, Lightbulb } from 'lucide-react';

export const CareerInsights: React.FC = () => {
  const insights = [
    {
      title: 'Market Demand',
      value: '85%',
      description: 'Your skills are in high demand',
      trend: '+12%',
      color: 'green'
    },
    {
      title: 'Salary Potential',
      value: 'AED 18K',
      description: 'Average salary for your experience',
      trend: '+8%',
      color: 'blue'
    },
    {
      title: 'Skill Match',
      value: '92%',
      description: 'Match with current job market',
      trend: '+5%',
      color: 'purple'
    },
    {
      title: 'Competition Level',
      value: 'Medium',
      description: 'Competition in your field',
      trend: 'Stable',
      color: 'yellow'
    }
  ];

  const skillGaps = [
    { skill: 'Machine Learning', current: 70, required: 90, gap: 20 },
    { skill: 'Cloud Computing', current: 60, required: 85, gap: 25 },
    { skill: 'Data Analysis', current: 80, required: 95, gap: 15 },
    { skill: 'Project Management', current: 65, required: 80, gap: 15 }
  ];

  const recommendations = [
    {
      title: 'Enhance Cloud Skills',
      description: 'Complete AWS certification to increase job prospects by 40%',
      priority: 'High',
      timeFrame: '2-3 months'
    },
    {
      title: 'Build Portfolio Projects',
      description: 'Create 2-3 machine learning projects to demonstrate expertise',
      priority: 'Medium',
      timeFrame: '1-2 months'
    },
    {
      title: 'Network Expansion',
      description: 'Connect with 50+ professionals in AI/ML field',
      priority: 'Low',
      timeFrame: '3-6 months'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Career Insights Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="border border-ehrdc-neutral-light">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm text-muted-foreground">{insight.title}</h3>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1">{insight.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{insight.description}</div>
              <Badge variant="secondary" className="text-green-600">
                {insight.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skill Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ehrdc-teal" />
            Skill Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillGaps.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <span className="text-sm text-muted-foreground">
                    Gap: {skill.gap} points
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {skill.current}%</span>
                    <span>Required: {skill.required}%</span>
                  </div>
                  <Progress value={skill.current} className="h-2" />
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
            <Lightbulb className="h-5 w-5 text-ehrdc-teal" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border border-ehrdc-neutral-light">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{rec.title}</h3>
                    <Badge variant={rec.priority === 'High' ? 'destructive' : rec.priority === 'Medium' ? 'default' : 'secondary'}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{rec.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Award className="h-3 w-3" />
                    Timeline: {rec.timeFrame}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
