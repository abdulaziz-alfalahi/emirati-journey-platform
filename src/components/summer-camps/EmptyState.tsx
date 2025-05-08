
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Airplane } from 'lucide-react';

interface EmptyStateProps {
  type: "available" | "registered" | "managed";
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const messages = {
    available: {
      title: "No Aviation Programs Available",
      description: "There are no aviation programs available matching your filter criteria."
    },
    registered: {
      title: "Not Registered for Any Aviation Programs",
      description: "You haven't registered for any aviation programs yet. Browse available programs to find one that interests you."
    },
    managed: {
      title: "No Managed Aviation Programs",
      description: "You don't have any aviation programs set up yet. Create your first program to start managing registrations."
    }
  };

  return (
    <Card className="bg-white border shadow-sm">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
          <Airplane className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{messages[type].title}</CardTitle>
        <CardDescription>{messages[type].description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-2">
        {type === "managed" && (
          <p className="text-sm text-muted-foreground">
            Click "Create New Program" to set up your first educational aviation program.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
