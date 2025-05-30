
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

const emiratizationProjections = [
  { year: '2020', actual: 38, target: 40, projected: null },
  { year: '2021', actual: 40, target: 42, projected: null },
  { year: '2022', actual: 42, target: 44, projected: null },
  { year: '2023', actual: 45, target: 47, projected: null },
  { year: '2024', actual: 48, target: 50, projected: null },
  { year: '2025', actual: null, target: 52, projected: 51.2 },
  { year: '2026', actual: null, target: 54, projected: 53.8 },
  { year: '2027', actual: null, target: 56, projected: 56.5 },
  { year: '2028', actual: null, target: 58, projected: 59.1 },
  { year: '2029', actual: null, target: 60, projected: 61.8 },
];

export const EmiratizationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emiratization Progress & Projections</CardTitle>
          <CardDescription>Historical progress vs targets with future projections</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={emiratizationProjections} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => [`${value}%`, 'Emiratization Rate']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3BACB6" 
                strokeWidth={3}
                name="Actual Progress"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#E74C3C" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Government Target"
              />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#601E88" 
                strokeWidth={3}
                strokeDasharray="3 3"
                name="AI Projection"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emiratization Achievement Analysis</CardTitle>
          <CardDescription>Likelihood of meeting government targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">2025 Target</h3>
              <p className="text-2xl font-bold text-green-600">52%</p>
              <p className="text-sm text-muted-foreground">Projected: 51.2%</p>
              <Badge className="mt-2">Likely to Achieve</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <h3 className="font-semibold">2027 Target</h3>
              <p className="text-2xl font-bold text-orange-600">56%</p>
              <p className="text-sm text-muted-foreground">Projected: 56.5%</p>
              <Badge variant="secondary" className="mt-2">On Track</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">2029 Target</h3>
              <p className="text-2xl font-bold text-blue-600">60%</p>
              <p className="text-sm text-muted-foreground">Projected: 61.8%</p>
              <Badge variant="default" className="mt-2">Exceed Target</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
