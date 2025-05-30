
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { SuccessStory } from '@/types/successStories';
import { SuccessStoriesService } from '@/services/successStoriesService';
import StoryCard from './StoryCard';
import SearchAndFilters from './SearchAndFilters';
import FeaturedStoriesSection from './FeaturedStoriesSection';
import StoriesGrid from './StoriesGrid';
import StoryViewDialog from './StoryViewDialog';

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
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadStories();
  }, []);

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

  // Calculate story counts by category and popular tags
  const { storyCounts, popularTags } = useMemo(() => {
    const counts: Record<string, number> = {};
    const tagFrequency: Record<string, number> = {};

    stories.forEach(story => {
      counts[story.category] = (counts[story.category] || 0) + 1;
      story.tags.forEach(tag => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      });
    });

    const topTags = Object.entries(tagFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);

    return { storyCounts: counts, popularTags: topTags };
  }, [stories]);

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    let filtered = [...stories];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        story.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => story.category === selectedCategory);
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(story => 
        selectedTags.some(tag => story.tags.includes(tag))
      );
    }

    // Sort stories
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.view_count - a.view_count);
        break;
      case 'most_liked':
        filtered.sort((a, b) => b.likes_count - a.likes_count);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [stories, searchTerm, selectedCategory, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setSortBy('newest');
  };

  if (variant === 'featured') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Featured Success Stories</h2>
          <p className="text-muted-foreground">Inspiring journeys from UAE's rising stars</p>
        </div>
        
        <FeaturedStoriesSection
          featuredStories={featuredStories}
          isLoading={isLoading}
          onStorySelect={setSelectedStory}
        />

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
      <FeaturedStoriesSection
        featuredStories={featuredStories}
        isLoading={isLoading}
        onStorySelect={setSelectedStory}
      />

      {/* Enhanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Discover Stories</span>
            </CardTitle>
            <CardDescription>Find the perfect success story that inspires you</CardDescription>
          </CardHeader>
          <CardContent>
            <SearchAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
              storyCounts={storyCounts}
              popularTags={popularTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </CardContent>
        </Card>
      )}

      {/* Stories Grid */}
      <StoriesGrid
        filteredStories={filteredStories}
        totalStories={stories.length}
        isLoading={isLoading}
        onStorySelect={setSelectedStory}
      />

      <StoryViewDialog story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
};

export default SuccessStoriesShowcase;
