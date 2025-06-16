
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Share, Users, Star } from 'lucide-react';
import { WisdomSharingHub } from '@/components/community-engagement/WisdomSharingHub';

interface WisdomSharingContentProps {
  activeTab: string;
}

export const WisdomSharingContent: React.FC<WisdomSharingContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'stories':
        return <WisdomSharingHub stories={[]} mentorships={[]} />;
      
      case 'share':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="h-5 w-5 text-ehrdc-teal" />
                  Share Your Wisdom
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your life experiences and knowledge are valuable gifts to the community. Share your story to inspire and guide others.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                    Write Your Story
                  </Button>
                  <Button variant="outline">
                    Record Video Story
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Story Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: BookOpen, label: 'Life Lessons', description: 'Share wisdom from your journey' },
                    { icon: Users, label: 'Professional Skills', description: 'Share career expertise' },
                    { icon: Star, label: 'Cultural Traditions', description: 'Preserve heritage knowledge' },
                    { icon: Share, label: 'Personal Stories', description: 'Inspire through experience' }
                  ].map((category, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="pt-6 text-center">
                        <category.icon className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                        <h3 className="font-semibold mb-1">{category.label}</h3>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'mentorship':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-ehrdc-teal" />
                  Wisdom Mentorship Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with the next generation to share your knowledge and guide their journey.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                    Become a Mentor
                  </Button>
                  <Button variant="outline">
                    View Mentorship Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Career Mentorship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Share your professional expertise with young professionals starting their careers.
                  </p>
                  <Button variant="outline" className="w-full">Join Program</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Life Skills Mentorship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Guide young people in developing essential life skills and making important decisions.
                  </p>
                  <Button variant="outline" className="w-full">Join Program</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'featured':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-ehrdc-teal" />
                  Featured Wisdom Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover the most inspiring and impactful stories shared by our community elders.
                </p>
                <Button>Explore Featured Stories</Button>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Content for {activeTab} coming soon...</p>
            </CardContent>
          </Card>
        );
    }
  };

  return <div>{renderContent()}</div>;
};
