
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Target, TrendingUp, Award } from 'lucide-react';

export const PersonalizedInsights: React.FC = () => {
  const insights = [
    {
      type: 'Best Match',
      career: 'Data Scientist',
      score: 92,
      reasons: ['Strong analytical skills', 'Math background', 'Interest in AI/ML'],
      recommendation: 'Perfect fit for your profile'
    },
    {
      type: 'Growth Potential',
      career: 'Software Engineer',
      score: 88,
      reasons: ['High market demand', 'Remote work options', 'Continuous learning'],
      recommendation: 'Great long-term prospects'
    },
    {
      type: 'Salary Leader',
      career: 'Product Manager',
      score: 85,
      reasons: ['Highest earning potential', 'Leadership opportunities', 'Cross-functional role'],
      recommendation: 'Consider for senior positions'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Best Match': return <Target className="h-5 w-5" />;
      case 'Growth Potential': return <TrendingUp className="h-5 w-5" />;
      case 'Salary Leader': return <Award className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-ehrdc-teal" />
            Personalized Career Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {insights.map((insight, index) => (
              <Card key={index} className="border-2 border-ehrdc-neutral-light">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-ehrdc-teal">
                        {getIcon(insight.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{insight.career}</h3>
                        <Badge variant="outline" className="mt-1">
                          {insight.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getScoreColor(insight.score)}>
                      {insight.score}% Match
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-sm text-muted-foreground">Why this matches you:</h4>
                    <ul className="space-y-1">
                      {insight.reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-ehrdc-teal rounded-full"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-ehrdc-teal">{insight.recommendation}</p>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
              Get Detailed Career Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
