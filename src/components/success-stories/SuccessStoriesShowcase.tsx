import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen,
  Lightbulb,
  Award,
  Building
} from 'lucide-react';
import { SuccessStory } from '@/types/successStories';
import { SuccessStoriesService } from '@/services/successStoriesService';
import StoryCard from './StoryCard';
import SocialShareButtons from './SocialShareButtons';
import MediaPlayer from './MediaPlayer';

interface SuccessStoriesShowcaseProps {
  variant?: 'full' | 'featured' | 'compact';
  limit?: number;
  showFilters?: boolean;
}

const SuccessStoriesShowcase: React.FC<SuccessStoriesShowcaseProps> = ({ 
  variant = 'full', 
  limit,
  showFilters = true 
}) => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [featuredStories, setFeaturedStories] = useState<SuccessStory[]>([]);
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadStories();
  }, []);

  useEffect(() => {
    filterStories();
  }, [stories, searchTerm, selectedCategory, sortBy]);

  const loadStories = async () => {
    setIsLoading(true);
    try {
      const allStories = await SuccessStoriesService.getStories({ 
        status: 'published', 
        limit: limit 
      });
      const featured = await SuccessStoriesService.getFeaturedStories(3);
      
      setStories(allStories);
      setFeaturedStories(featured);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterStories = () => {
    let filtered = [...stories];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => story.category === selectedCategory);
    }

    // Sort stories
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.view_count + b.likes_count) - (a.view_count + a.likes_count));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredStories(filtered);
  };

  const categoryIcons = {
    career_progression: <TrendingUp className="h-4 w-4" />,
    entrepreneurship: <Building className="h-4 w-4" />,
    education: <BookOpen className="h-4 w-4" />,
    innovation: <Lightbulb className="h-4 w-4" />,
    leadership: <Users className="h-4 w-4" />,
    skills_development: <Award className="h-4 w-4" />
  };

  const categoryLabels = {
    career_progression: 'Career Growth',
    entrepreneurship: 'Entrepreneurship',
    education: 'Education',
    innovation: 'Innovation',
    leadership: 'Leadership',
    skills_development: 'Skills Development'
  };

  if (variant === 'featured') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Featured Success Stories</h2>
          <p className="text-muted-foreground">Inspiring journeys from UAE's rising stars</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard 
                key={story.id} 
                story={story} 
                variant="featured"
                onReadMore={setSelectedStory}
              />
            ))}
          </div>
        )}

        <StoryViewDialog story={selectedStory} onClose={() => setSelectedStory(null)} />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Latest Success Stories</h3>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <div className="h-12 w-12 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredStories.slice(0, limit || 5).map((story) => (
              <StoryCard 
                key={story.id} 
                story={story} 
                variant="compact"
                onReadMore={setSelectedStory}
              />
            ))}
          </div>
        )}
        
        <StoryViewDialog story={selectedStory} onClose={() => setSelectedStory(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover inspiring career journeys and achievements from UAE's talented professionals
        </p>
      </div>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Star className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">Featured Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard 
                key={story.id} 
                story={story} 
                variant="featured"
                onReadMore={setSelectedStory}
              />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Find Stories</span>
            </CardTitle>
            <CardDescription>Filter and search through our collection of success stories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center space-x-2">
                        {categoryIcons[value as keyof typeof categoryIcons]}
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('newest');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardHeader>
              <div className="px-6">
                <div className="h-40 bg-muted rounded"></div>
              </div>
              <CardContent className="pt-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredStories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No stories found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search terms or filters to find more stories.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard 
              key={story.id} 
              story={story} 
              onReadMore={setSelectedStory}
            />
          ))}
        </div>
      )}

      <StoryViewDialog story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
};

// Story View Dialog Component
const StoryViewDialog: React.FC<{ story: SuccessStory | null; onClose: () => void }> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{story.title}</DialogTitle>
              <DialogDescription className="text-base">{story.summary}</DialogDescription>
            </div>
            <Badge variant="outline" className="ml-4">
              {story.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
          
          {story.media.video_testimonial ? (
            <MediaPlayer
              type="video"
              src={story.media.video_testimonial.url}
              title="Video Testimonial"
              thumbnail={story.media.video_testimonial.thumbnail || story.media.featured_image}
              duration={story.media.video_testimonial.duration}
              className="w-full"
            />
          ) : story.media.featured_image && (
            <img 
              src={story.media.featured_image} 
              alt={story.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-base leading-relaxed">{story.content}</p>
          </div>
          
          {/* Audio Clips Section */}
          {story.media.audio_clips && story.media.audio_clips.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Audio Highlights</h4>
              <div className="space-y-3">
                {story.media.audio_clips.map((clip, index) => (
                  <MediaPlayer
                    key={index}
                    type="audio"
                    src={clip.url}
                    title={clip.title}
                    duration={clip.duration}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Image Gallery */}
          {story.media.gallery && story.media.gallery.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Gallery</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {story.media.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          
          {story.metrics && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Impact & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {story.metrics.career_growth && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Career Growth</h4>
                      <p className="font-semibold">{story.metrics.career_growth}</p>
                    </div>
                  )}
                  {story.metrics.impact && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Impact</h4>
                      <p className="font-semibold">{story.metrics.impact}</p>
                    </div>
                  )}
                  {story.metrics.timeline && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Timeline</h4>
                      <p className="font-semibold">{story.metrics.timeline}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <div className="border-t pt-6">
            <SocialShareButtons story={story} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessStoriesShowcase;
