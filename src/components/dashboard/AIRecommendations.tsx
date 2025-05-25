
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Briefcase, GraduationCap, Award, Users, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { recommendationEngine, Recommendation, RecommendationFilters } from '@/services/recommendationEngine';
import { useToast } from '@/components/ui/use-toast';

const AIRecommendations = () => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'jobs' | 'training' | 'scholarships' | 'internships'>('all');

  useEffect(() => {
    if (user && roles.length > 0) {
      fetchRecommendations();
    }
  }, [user, roles]);

  const fetchRecommendations = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const filters: RecommendationFilters = {
        includeJobs: true,
        includeTraining: true,
        includeScholarships: true,
        includeInternships: true,
        minScore: 20,
        maxResults: 12
      };

      const recs = await recommendationEngine.generateRecommendations(user.id, roles, filters);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load recommendations. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredRecommendations = () => {
    if (activeFilter === 'all') return recommendations;
    return recommendations.filter(rec => rec.type === activeFilter);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job': return <Briefcase className="h-4 w-4" />;
      case 'training': return <GraduationCap className="h-4 w-4" />;
      case 'scholarship': return <Award className="h-4 w-4" />;
      case 'internship': return <Users className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-blue-500';
      case 'training': return 'bg-green-500';
      case 'scholarship': return 'bg-purple-500';
      case 'internship': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Personalized opportunities based on your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredRecommendations = getFilteredRecommendations();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5" />
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Personalized opportunities based on your profile and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as any)}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({recommendations.length})</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({recommendations.filter(r => r.type === 'job').length})</TabsTrigger>
            <TabsTrigger value="training">Training ({recommendations.filter(r => r.type === 'training').length})</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships ({recommendations.filter(r => r.type === 'scholarship').length})</TabsTrigger>
            <TabsTrigger value="internships">Internships ({recommendations.filter(r => r.type === 'internship').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeFilter} className="mt-6">
            {filteredRecommendations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No recommendations available yet.</p>
                <p className="text-sm">Complete your profile to get personalized suggestions.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecommendations.map((recommendation) => (
                  <Card key={recommendation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-full text-white ${getTypeColor(recommendation.type)}`}>
                            {getTypeIcon(recommendation.type)}
                          </div>
                          <Badge variant="secondary" className="capitalize">
                            {recommendation.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <Badge 
                            variant="outline" 
                            className={`text-white ${getScoreColor(recommendation.score)}`}
                          >
                            {Math.round(recommendation.score)}%
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{recommendation.title}</CardTitle>
                      {recommendation.provider && (
                        <CardDescription className="text-sm">
                          {recommendation.provider}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {recommendation.description}
                      </p>
                      
                      {recommendation.matchedSkills.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium mb-1">Matched Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {recommendation.matchedSkills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {recommendation.matchedSkills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{recommendation.matchedSkills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-1 mb-3">
                        {recommendation.reasons.slice(0, 2).map((reason, index) => (
                          <p key={index} className="text-xs text-muted-foreground flex items-start">
                            <span className="mr-1">•</span>
                            {reason}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        {recommendation.location && (
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {recommendation.location}
                          </div>
                        )}
                        {recommendation.deadline && (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Due: {new Date(recommendation.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {recommendations.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <Button 
              onClick={fetchRecommendations} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Refresh Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
