
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock, MapPin } from 'lucide-react';

export const WorkLifeBalance: React.FC = () => {
  const balanceData = [
    {
      career: 'Software Engineer',
      workLifeBalance: 75,
      averageHours: '40-45',
      flexibility: 'High',
      remoteWork: 'Yes',
      stressLevel: 'Medium'
    },
    {
      career: 'Data Scientist',
      workLifeBalance: 70,
      averageHours: '42-48',
      flexibility: 'High',
      remoteWork: 'Yes',
      stressLevel: 'Medium'
    },
    {
      career: 'Product Manager',
      workLifeBalance: 65,
      averageHours: '45-50',
      flexibility: 'Medium',
      remoteWork: 'Hybrid',
      stressLevel: 'High'
    }
  ];

  const getFlexibilityColor = (flexibility: string) => {
    switch (flexibility) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStressColor = (stress: string) => {
    switch (stress) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-ehrdc-teal" />
            Work-Life Balance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {balanceData.map((career, index) => (
              <Card key={index} className="border border-ehrdc-neutral-light">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{career.career}</h3>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Overall Balance Score</div>
                      <div className="flex items-center gap-2">
                        <Progress value={career.workLifeBalance} className="w-24 h-3" />
                        <span className="font-semibold text-ehrdc-teal">{career.workLifeBalance}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Hours/Week</div>
                        <div className="font-medium">{career.averageHours}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Flexibility</div>
                      <Badge className={getFlexibilityColor(career.flexibility)}>
                        {career.flexibility}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Remote Work</div>
                        <div className="font-medium">{career.remoteWork}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Stress Level</div>
                      <Badge className={getStressColor(career.stressLevel)}>
                        {career.stressLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
