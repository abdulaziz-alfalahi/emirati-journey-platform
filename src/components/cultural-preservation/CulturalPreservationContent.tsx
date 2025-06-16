
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, Music, Camera, Palette } from 'lucide-react';

interface CulturalPreservationContentProps {
  activeTab: string;
}

export const CulturalPreservationContent: React.FC<CulturalPreservationContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-ehrdc-teal" />
                  Cultural Heritage Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore our rich collection of Emirati cultural artifacts and heritage items.
                </p>
                <Button>Explore Heritage</Button>
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
