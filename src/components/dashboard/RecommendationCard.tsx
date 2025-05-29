
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink, 
  Info, 
  Star,
  TrendingUp,
  MapPin,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { Recommendation } from '@/services/recommendationEngine';
import { submitRecommendationFeedback, trackRecommendationInteraction } from '@/services/recommendationFeedbackService';
import { useToast } from '@/components/ui/use-toast';

interface RecommendationCardProps {
  recommendation: Recommendation;
  userId: string;
  onFeedbackSubmitted?: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendation, 
  userId, 
  onFeedbackSubmitted 
}) => {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [explanationDialogOpen, setExplanationDialogOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job': return '💼';
      case 'training': return '🎓';
      case 'scholarship': return '🏆';
      case 'internship': return '👥';
      default: return '✨';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500 text-white';
    if (score >= 60) return 'bg-yellow-500 text-white';
    return 'bg-orange-500 text-white';
  };

  const handleClick = async () => {
    await trackRecommendationInteraction({
      userId,
      recommendationId: recommendation.id,
      interactionType: 'clicked'
    });
  };

  const handleView = async () => {
    await trackRecommendationInteraction({
      userId,
      recommendationId: recommendation.id,
      interactionType: 'viewed'
    });
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackType) {
      toast({
        title: 'Please select feedback type',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRecommendationFeedback({
        userId,
        recommendationId: recommendation.id,
        recommendationType: recommendation.type,
        feedbackType: feedbackType as any,
        rating: rating || undefined,
        comments: comments || undefined
      });

      toast({
        title: 'Feedback submitted',
        description: 'Thank you for helping us improve our recommendations!'
      });

      setFeedbackDialogOpen(false);
      setFeedbackType('');
      setRating(0);
      setComments('');
      onFeedbackSubmitted?.();
    } catch (error) {
      toast({
        title: 'Error submitting feedback',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    handleView();
  }, []);

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{getTypeIcon(recommendation.type)}</span>
              <Badge variant="secondary" className="capitalize">
                {recommendation.type}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getScoreColor(recommendation.score)}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {Math.round(recommendation.score)}%
              </Badge>
              <Dialog open={explanationDialogOpen} onOpenChange={setExplanationDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Info className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Why this recommendation?</DialogTitle>
                    <DialogDescription>
                      Here's why we think this might be a good fit for you
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Key Reasons
                      </h4>
                      <ul className="space-y-1">
                        {recommendation.reasons.map((reason, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <span className="mr-2">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {recommendation.matchedSkills.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Skill Matches</h4>
                        <div className="flex flex-wrap gap-1">
                          {recommendation.matchedSkills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Match Score Breakdown</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Overall Compatibility:</span>
                          <span className="font-medium">{Math.round(recommendation.score)}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Based on your skills, experience, and career goals
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <CardTitle className="text-lg leading-tight">{recommendation.title}</CardTitle>
          {recommendation.provider && (
            <p className="text-sm text-muted-foreground">{recommendation.provider}</p>
          )}
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {recommendation.description}
          </p>

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

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={handleClick}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Details
            </Button>
            
            <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Feedback
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rate this recommendation</DialogTitle>
                  <DialogDescription>
                    Help us improve our recommendations by sharing your feedback
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">How relevant is this recommendation?</Label>
                    <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="helpful" id="helpful" />
                        <Label htmlFor="helpful" className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Very relevant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="applied" id="applied" />
                        <Label htmlFor="applied">Applied/Interested</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not_helpful" id="not_helpful" />
                        <Label htmlFor="not_helpful" className="flex items-center">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Not relevant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not_interested" id="not_interested" />
                        <Label htmlFor="not_interested">Not interested</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Overall rating (optional)</Label>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          className="p-1"
                          onClick={() => setRating(star)}
                        >
                          <Star 
                            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comments" className="text-sm font-medium">
                      Additional comments (optional)
                    </Label>
                    <Textarea
                      id="comments"
                      placeholder="Any specific feedback or suggestions?"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Separator />
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setFeedbackDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleFeedbackSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RecommendationCard;
