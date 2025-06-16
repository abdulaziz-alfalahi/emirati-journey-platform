
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Clock, Star, ArrowRight, Target } from 'lucide-react';
import { PersonalizedRecommendation } from '@/types/professionalGrowthAnalytics';

interface RecommendationsPanelProps {
  recommendations: PersonalizedRecommendation[];
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ recommendations }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skill': return '🎯';
      case 'certification': return '🏆';
      case 'networking': return '🤝';
      case 'mentorship': return '👥';
      case 'project': return '💼';
      default: return '💡';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Personalized Recommendations
        </h3>
        <p className="text-muted-foreground">AI-powered suggestions for your professional development journey</p>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <Card key={recommendation.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getTypeIcon(recommendation.type)}</div>
                  <div>
                    <CardTitle className="text-base">{recommendation.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {recommendation.type}
                    </Badge>
                  </div>
                </div>
                <Badge variant={getPriorityColor(recommendation.priority)}>
                  {recommendation.priority} priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{recommendation.estimatedTime}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Key Benefits:</h5>
                  <ul className="space-y-1">
                    {recommendation.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Take Action
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Recommendations Available</h3>
            <p className="text-muted-foreground">
              Complete more professional development activities to receive personalized recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
