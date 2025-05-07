
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const EmptyCareerPathState: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Career Paths Found</CardTitle>
        <CardDescription>
          You haven't enrolled in any career paths yet.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default EmptyCareerPathState;
