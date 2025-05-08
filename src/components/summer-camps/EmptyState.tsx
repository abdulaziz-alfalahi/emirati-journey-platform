
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface EmptyStateProps {
  type: "available" | "registered" | "managed";
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const messages = {
    available: {
      title: "No Camps Available",
      description: "There are no summer camps available matching your filter criteria."
    },
    registered: {
      title: "Not Registered for Any Camps",
      description: "You haven't registered for any summer camps yet. Browse available camps to find one that interests you."
    },
    managed: {
      title: "No Managed Camps",
      description: "You don't have any summer camps set up yet. Create your first camp to start managing registrations."
    }
  };

  return (
    <Card className="bg-white border shadow-sm">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{messages[type].title}</CardTitle>
        <CardDescription>{messages[type].description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-2">
        {type === "managed" && (
          <p className="text-sm text-muted-foreground">
            Click "Create New Camp" to set up your first educational summer program.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
