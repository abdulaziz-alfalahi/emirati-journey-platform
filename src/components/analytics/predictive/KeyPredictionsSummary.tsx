
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const KeyPredictionsSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Workforce Growth (2029)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">+20.9%</div>
          <div className="text-sm text-muted-foreground">1.06M projected workforce</div>
          <Badge variant="outline" className="mt-2">High Confidence</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Top Growth Sector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">Technology</div>
          <div className="text-sm text-muted-foreground">12.5% annual growth</div>
          <Badge variant="outline" className="mt-2">220K by 2027</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Skills Gap Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">AI/ML</div>
          <div className="text-sm text-muted-foreground">185% demand increase</div>
          <Badge variant="destructive" className="mt-2">Critical Shortage</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Emiratization Target</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">61.8%</div>
          <div className="text-sm text-muted-foreground">Projected by 2029</div>
          <Badge variant="outline" className="mt-2">On Track</Badge>
        </CardContent>
      </Card>
    </div>
  );
};
