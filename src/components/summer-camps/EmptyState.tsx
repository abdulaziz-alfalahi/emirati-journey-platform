
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { School } from 'lucide-react';

interface EmptyStateProps {
  type: "available" | "registered" | "managed";
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  return (
    <Card>
      <CardContent className="py-10 text-center">
        <School className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No camps found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {type === "available" ? 
            "No available camps match your filters. Try adjusting your search criteria." :
            type === "registered" ?
            "You haven't registered for any summer camps yet." :
            "You aren't managing any summer camps yet."
          }
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
