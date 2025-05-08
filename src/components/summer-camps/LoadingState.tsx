
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const LoadingState: React.FC = () => {
  return (
    <Card>
      <CardContent className="py-10 text-center">
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <h3 className="mt-4 text-lg font-medium">Loading camps...</h3>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
