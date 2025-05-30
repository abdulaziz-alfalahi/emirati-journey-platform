
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skillsDemandForecast = [
  { skill: 'AI/Machine Learning', current: 4850, predicted2025: 12500, predicted2027: 28000, growth: 185, demandLevel: 'Very High' },
  { skill: 'Cybersecurity', current: 6420, predicted2025: 11200, predicted2027: 18500, growth: 145, demandLevel: 'Very High' },
  { skill: 'Cloud Computing', current: 5680, predicted2025: 13500, predicted2027: 25000, growth: 160, demandLevel: 'Very High' },
  { skill: 'Data Analysis', current: 12680, predicted2025: 18500, predicted2027: 28000, growth: 85, demandLevel: 'High' },
  { skill: 'Digital Marketing', current: 15420, predicted2025: 22000, predicted2027: 32000, growth: 65, demandLevel: 'High' },
  { skill: 'Software Development', current: 9850, predicted2025: 16800, predicted2027: 28500, growth: 75, demandLevel: 'High' },
];

export const SkillsDemandTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Future Skills Demand Forecast</CardTitle>
          <CardDescription>Projected demand for key skills based on market trends and technology adoption</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={skillsDemandForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => `${value?.toLocaleString()} professionals`} />
              <Legend />
              <Bar dataKey="current" fill="#3BACB6" name="Current (2024)" />
              <Bar dataKey="predicted2025" fill="#601E88" name="Predicted 2025" />
              <Bar dataKey="predicted2027" fill="#E74C3C" name="Predicted 2027" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills Growth Rate Analysis</CardTitle>
          <CardDescription>Expected percentage growth in demand by 2027</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsDemandForecast.map((skill, index) => (
              <div key={skill.skill} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{skill.skill}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current:</span>
                    <span>{skill.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>2027 Projected:</span>
                    <span>{skill.predicted2027.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant={skill.growth >= 100 ? 'destructive' : skill.growth >= 50 ? 'default' : 'secondary'}>
                      +{skill.growth}% Growth
                    </Badge>
                    <Badge variant="outline">
                      {skill.demandLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
