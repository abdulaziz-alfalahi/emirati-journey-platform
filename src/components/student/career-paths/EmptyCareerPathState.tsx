
import React from 'react';
import { BookX } from 'lucide-react';

interface EmptyCareerPathStateProps {
  message?: string;
  action?: string;
}

const EmptyCareerPathState: React.FC<EmptyCareerPathStateProps> = ({
  message = "You haven't enrolled in any career paths yet.",
  action = "Explore available paths to get started."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BookX className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">{message}</h3>
      <p className="text-muted-foreground">{action}</p>
    </div>
  );
};

export default EmptyCareerPathState;
