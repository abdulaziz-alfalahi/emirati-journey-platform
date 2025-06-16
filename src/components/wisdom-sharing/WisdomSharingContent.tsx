
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Share, Users, Star } from 'lucide-react';

interface WisdomSharingContentProps {
  activeTab: string;
}

export const WisdomSharingContent: React.FC<WisdomSharingContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'stories':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-ehrdc-teal" />
                  Wisdom Stories Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore inspiring stories and valuable life lessons shared by community elders.
                </p>
                <Button>Browse Stories</Button>
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
