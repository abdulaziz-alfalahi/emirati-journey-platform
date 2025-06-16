
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, Calendar, Award } from 'lucide-react';

interface IntergenerationalProgramsContentProps {
  activeTab: string;
}

export const IntergenerationalProgramsContent: React.FC<IntergenerationalProgramsContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'programs':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-ehrdc-teal" />
                  Available Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover programs that bring different generations together for meaningful exchanges.
                </p>
                <Button>Browse Programs</Button>
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
