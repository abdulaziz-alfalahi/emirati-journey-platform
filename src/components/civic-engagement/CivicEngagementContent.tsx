
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, Users, MessageSquare, Building } from 'lucide-react';

interface CivicEngagementContentProps {
  activeTab: string;
}

export const CivicEngagementContent: React.FC<CivicEngagementContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'initiatives':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5 text-ehrdc-teal" />
                  Active Civic Initiatives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Participate in ongoing civic initiatives that shape your community's future.
                </p>
                <Button>View All Initiatives</Button>
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
