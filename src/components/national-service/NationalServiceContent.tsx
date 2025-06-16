
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Award, Flag } from 'lucide-react';

interface NationalServiceContentProps {
  activeTab: string;
}

export const NationalServiceContent: React.FC<NationalServiceContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'opportunities':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-ehrdc-teal" />
                  National Service Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover meaningful ways to serve your country and contribute to national development.
                </p>
                <Button>View Opportunities</Button>
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
