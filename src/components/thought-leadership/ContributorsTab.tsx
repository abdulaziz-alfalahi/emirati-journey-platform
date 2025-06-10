
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building, MapPin, Users, FileText, Video, Mic, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Contributor {
  author_name: string;
  author_title?: string;
  author_organization?: string;
  content_count: number;
  article_count: number;
  research_count: number;
  video_count: number;
  podcast_count: number;
  tags: string[];
}

interface ContributorsTabProps {
  searchQuery: string;
}

export const ContributorsTab: React.FC<ContributorsTabProps> = ({ searchQuery }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributors();
  }, [searchQuery]);

  const fetchContributors = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('thought_leadership_content')
        .select('author_name, author_title, author_organization, content_type, tags')
        .eq('status', 'published');

      if (searchQuery.trim()) {
        query = query.or(`author_name.ilike.%${searchQuery}%,author_organization.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Group by author and aggregate content counts
      const contributorMap = new Map<string, Contributor>();

      data?.forEach((item) => {
        const key = item.author_name;
        const existing = contributorMap.get(key);

        if (existing) {
          existing.content_count += 1;
          if (item.content_type === 'article') existing.article_count += 1;
          if (item.content_type === 'research_paper') existing.research_count += 1;
          if (item.content_type === 'video') existing.video_count += 1;
          if (item.content_type === 'podcast') existing.podcast_count += 1;
          
          // Merge tags
          if (item.tags) {
            const newTags = item.tags.filter((tag: string) => !existing.tags.includes(tag));
            existing.tags.push(...newTags);
          }
        } else {
          contributorMap.set(key, {
            author_name: item.author_name,
            author_title: item.author_title,
            author_organization: item.author_organization,
            content_count: 1,
            article_count: item.content_type === 'article' ? 1 : 0,
            research_count: item.content_type === 'research_paper' ? 1 : 0,
            video_count: item.content_type === 'video' ? 1 : 0,
            podcast_count: item.content_type === 'podcast' ? 1 : 0,
            tags: item.tags || []
          });
        }
      });

      const contributorsList = Array.from(contributorMap.values())
        .sort((a, b) => b.content_count - a.content_count);

      setContributors(contributorsList);
    } catch (error) {
      console.error('Error fetching contributors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold mb-2">Thought Leaders & Contributors</h3>
        <p className="text-muted-foreground">
          Discover insights from prominent Emirati leaders, experts, and industry professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor, index) => (
          <Card key={contributor.author_name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-ehrdc-teal text-white">
                    {contributor.author_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">{contributor.author_name}</CardTitle>
                  {contributor.author_title && (
                    <CardDescription className="text-sm">
                      {contributor.author_title}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {contributor.author_organization && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Building className="h-4 w-4" />
                  {contributor.author_organization}
                </div>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Total Content
                  </span>
                  <Badge variant="secondary">{contributor.content_count}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {contributor.article_count > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Articles</span>
                      <span className="text-muted-foreground">{contributor.article_count}</span>
                    </div>
                  )}
                  {contributor.research_count > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Research</span>
                      <span className="text-muted-foreground">{contributor.research_count}</span>
                    </div>
                  )}
                  {contributor.video_count > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Videos</span>
                      <span className="text-muted-foreground">{contributor.video_count}</span>
                    </div>
                  )}
                  {contributor.podcast_count > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Podcasts</span>
                      <span className="text-muted-foreground">{contributor.podcast_count}</span>
                    </div>
                  )}
                </div>
              </div>

              {contributor.tags.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-2">Expertise Areas:</div>
                  <div className="flex flex-wrap gap-1">
                    {contributor.tags.slice(0, 4).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {contributor.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{contributor.tags.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // In a real implementation, this would filter content by author
                  console.log('View all content by', contributor.author_name);
                }}
              >
                View All Content
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {contributors.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No contributors found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? 'Try adjusting your search terms.' : 'No contributors are currently available.'}
          </p>
        </div>
      )}
    </div>
  );
};
