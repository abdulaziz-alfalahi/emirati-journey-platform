
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollaborativeAssessment } from '@/types/collaborativeAssessments';

interface DashboardStatsProps {
  assessments: CollaborativeAssessment[] | undefined;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ assessments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{assessments?.length || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {assessments?.filter(a => a.status === 'in_progress').length || 0}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {assessments?.filter(a => a.status === 'completed').length || 0}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">As Evaluator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
        </CardContent>
      </Card>
    </div>
  );
};
