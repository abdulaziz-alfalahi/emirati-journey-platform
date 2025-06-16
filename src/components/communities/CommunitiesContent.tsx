
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Calendar, Plus } from 'lucide-react';

interface CommunitiesContentProps {
  activeTab: string;
}

export const CommunitiesContent: React.FC<CommunitiesContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-ehrdc-teal" />
                      Community {i}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Connect with like-minded individuals and share meaningful experiences.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{50 + i * 10} members</span>
                      <Button size="sm">Join Community</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 'my-communities':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Active Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You are currently a member of 3 active communities. Continue engaging and building meaningful connections.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'events':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-ehrdc-teal" />
                  Upcoming Community Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join upcoming community events and strengthen your connections with fellow members.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'create':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-ehrdc-teal" />
                  Create a New Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Start a new community around shared interests and bring people together.
                </p>
                <Button>Create Community</Button>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return <div>{renderContent()}</div>;
};
