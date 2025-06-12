import React, { useState, useEffect } from 'react';
import LifelongEngagementLayout from '@/components/layout/LifelongEngagementLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Star, Award, TrendingUp, Users, Send, Eye } from 'lucide-react';

interface SuccessStory {
  id: string;
  title: string;
  story_content: string;
  category: string;
  impact_metrics: string;
  submission_date: string;
  created_at: string;
}

const ShareSuccessStoriesPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    story_content: '',
    category: '',
    impact_metrics: ''
  });

  const categories = [
    'Career Advancement',
    'Education',
    'Personal Growth',
    'Entrepreneurship',
    'Leadership',
    'Skills Development',
    'Community Impact'
  ];

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast({
        title: "Error",
        description: "Failed to load success stories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit your success story.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title || !formData.story_content || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('success_stories')
        .insert({
          title: formData.title,
          story_content: formData.story_content,
          category: formData.category,
          impact_metrics: formData.impact_metrics,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Story Submitted!",
        description: "Your success story has been submitted for review. It will be published once approved.",
      });

      // Reset form
      setFormData({
        title: '',
        story_content: '',
        category: '',
        impact_metrics: ''
      });

    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your story. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <LifelongEngagementLayout
        heroTitle="Share Your Success Story: Inspire Others"
        heroDescription="Your journey can light the way for someone else. Share your achievements and inspire our community."
      >
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </LifelongEngagementLayout>
    );
  }

  return (
    <LifelongEngagementLayout
      heroTitle="Share Your Success Story: Inspire Others"
      heroDescription="Your journey can light the way for someone else. Share your achievements and inspire our community."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Story Submission Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Submit Your Success Story
              </CardTitle>
              <CardDescription>
                Share your journey and inspire others in our community. All stories are reviewed before publication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Story Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., From Graduate to Tech Lead in 3 Years"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story_content">Your Story *</Label>
                  <Textarea
                    id="story_content"
                    value={formData.story_content}
                    onChange={(e) => handleInputChange('story_content', e.target.value)}
                    placeholder="Tell us about your journey, challenges you overcame, and how our platform helped you achieve success..."
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact_metrics">Impact & Achievements</Label>
                  <Input
                    id="impact_metrics"
                    value={formData.impact_metrics}
                    onChange={(e) => handleInputChange('impact_metrics', e.target.value)}
                    placeholder="e.g., 200% salary increase, Promoted to Tech Lead"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Moderation Note:</strong> All submitted stories will be reviewed by our team before being published to ensure quality and appropriateness.
                  </p>
                </div>

                <Button type="submit" disabled={submitting || !user} className="w-full">
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Story
                    </>
                  )}
                </Button>

                {!user && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please sign in to submit your success story.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories Display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              Community Success Stories
            </h2>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {stories.length} Stories
            </Badge>
          </div>

          {stories.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Stories Yet</h3>
                <p className="text-muted-foreground">
                  Be the first to share your success story and inspire others!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {stories.map((story) => (
                <Card key={story.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">{story.title}</CardTitle>
                      <Badge variant="outline" className="ml-2 flex-shrink-0">
                        {story.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {story.story_content}
                    </p>
                    
                    {story.impact_metrics && (
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {story.impact_metrics}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Submitted {new Date(story.submission_date).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>Community Member</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </LifelongEngagementLayout>
  );
};

export default ShareSuccessStoriesPage;
