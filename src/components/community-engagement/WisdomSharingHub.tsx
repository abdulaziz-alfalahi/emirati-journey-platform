
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, MessageCircle, Users, Share2, Star } from 'lucide-react';
import { WisdomSharingPlatform, MentorshipConnection } from '@/types/community-engagement';

interface WisdomSharingHubProps {
  stories: WisdomSharingPlatform[];
  mentorships: MentorshipConnection[];
}

export const WisdomSharingHub: React.FC<WisdomSharingHubProps> = ({
  stories,
  mentorships
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'mentorship' | 'skills'>('stories');

  const mockStories: WisdomSharingPlatform[] = [
    {
      id: '1',
      title: 'Lessons from 40 Years in Engineering',
      content: 'Throughout my career building infrastructure across the UAE, I learned that the most important foundation is the relationships you build with your team...',
      author_id: 'user1',
      category: 'professional_skill',
      tags: ['engineering', 'leadership', 'teamwork'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes_count: 45,
      comments_count: 12,
      is_featured: true
    },
    {
      id: '2',
      title: 'Traditional Emirati Cooking Wisdom',
      content: 'My grandmother taught me that cooking is about more than ingredients - it\'s about preserving our culture and bringing families together...',
      author_id: 'user2',
      category: 'cultural_tradition',
      tags: ['cooking', 'culture', 'family'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes_count: 38,
      comments_count: 8,
      is_featured: false
    }
  ];

  const getCategoryColor = (category: WisdomSharingPlatform['category']) => {
    switch (category) {
      case 'life_lesson': return 'bg-blue-100 text-blue-800';
      case 'professional_skill': return 'bg-green-100 text-green-800';
      case 'cultural_tradition': return 'bg-purple-100 text-purple-800';
      case 'personal_story': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCategory = (category: WisdomSharingPlatform['category']) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Wisdom Sharing Hub</h2>
          <p className="text-muted-foreground">Share your knowledge and learn from the community</p>
        </div>
        <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
          <Share2 className="h-4 w-4 mr-2" />
          Share Your Wisdom
        </Button>
      </div>

      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'stories'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          <BookOpen className="h-4 w-4 inline mr-2" />
          Wisdom Stories
        </button>
        <button
          onClick={() => setActiveTab('mentorship')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'mentorship'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Mentorship
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'skills'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          <Star className="h-4 w-4 inline mr-2" />
          Skill Exchange
        </button>
      </div>

      {activeTab === 'stories' && (
        <div className="grid gap-6">
          {mockStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getCategoryColor(story.category)}>
                        {formatCategory(story.category)}
                      </Badge>
                      {story.is_featured && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{story.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {story.likes_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {story.comments_count}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'mentorship' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-ehrdc-teal" />
                Mentorship Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with experienced community members or share your expertise with the next generation.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  Become a Mentor
                </Button>
                <Button variant="outline">
                  Find a Mentor
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-ehrdc-teal/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-ehrdc-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Leadership Mentorship</h3>
                    <p className="text-sm text-muted-foreground">Share 30+ years of business experience</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">2 Mentees Available</Badge>
                  <Button size="sm" variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Cultural Heritage Preservation</h3>
                    <p className="text-sm text-muted-foreground">Teaching traditional crafts and storytelling</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Monthly Sessions</Badge>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-ehrdc-teal" />
                Skill Exchange Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Share your skills and learn new ones through our community exchange program.
              </p>
              <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                Offer Your Skills
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">Arabic Calligraphy</h3>
                    <p className="text-sm text-muted-foreground">Traditional art form teaching</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Offering</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expert Level • Group Sessions</span>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">Digital Photography</h3>
                    <p className="text-sm text-muted-foreground">Modern photography techniques</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Seeking</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Beginner Level • One-on-One</span>
                  <Button size="sm" variant="outline">Offer Help</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
