
import React, { useMemo } from 'react';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data
const historicalWorkforceData = [
  { year: '2020', actual: 785000, sector: 'All', confidence: 100 },
  { year: '2021', actual: 812000, sector: 'All', confidence: 100 },
  { year: '2022', actual: 834000, sector: 'All', confidence: 100 },
  { year: '2023', actual: 850000, sector: 'All', confidence: 100 },
  { year: '2024', actual: 875000, sector: 'All', confidence: 100 },
];

const predictedWorkforceData = [
  { year: '2025', predicted: 905000, lower: 885000, upper: 925000, confidence: 85 },
  { year: '2026', predicted: 938000, lower: 910000, upper: 965000, confidence: 78 },
  { year: '2027', predicted: 975000, lower: 940000, upper: 1010000, confidence: 72 },
  { year: '2028', predicted: 1015000, lower: 975000, upper: 1055000, confidence: 65 },
  { year: '2029', predicted: 1058000, lower: 1010000, upper: 1105000, confidence: 58 },
];

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return '#27AE60';
  if (confidence >= 70) return '#F39C12';
  return '#E74C3C';
};

export const WorkforceForecastTab: React.FC = () => {
  const combinedWorkforceData = useMemo(() => {
    return [
      ...historicalWorkforceData,
      ...predictedWorkforceData.map(item => ({
        year: item.year,
        actual: null,
        predicted: item.predicted,
        lower: item.lower,
        upper: item.upper,
        confidence: item.confidence
      }))
    ];
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Workforce Growth Forecast</CardTitle>
          <CardDescription>Historical data with AI-powered predictions and confidence intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={combinedWorkforceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'actual') return [`${value?.toLocaleString()} people`, 'Historical'];
                  if (name === 'predicted') return [`${value?.toLocaleString()} people`, 'Predicted'];
                  if (name === 'upper') return [`${value?.toLocaleString()} people`, 'Upper Bound'];
                  if (name === 'lower') return [`${value?.toLocaleString()} people`, 'Lower Bound'];
                  return [value, name];
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="upper" 
                stackId="1" 
                stroke="#E74C3C" 
                fill="#E74C3C" 
                fillOpacity={0.1}
                name="Upper Bound"
              />
              <Area 
                type="monotone" 
                dataKey="lower" 
                stackId="1" 
                stroke="#E74C3C" 
                fill="transparent" 
                name="Lower Bound"
              />
              <Line type="monotone" dataKey="actual" stroke="#3BACB6" strokeWidth={3} name="Historical" />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#601E88" 
                strokeWidth={3} 
                strokeDasharray="5 5"
                name="Predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prediction Confidence Levels</CardTitle>
          <CardDescription>Model confidence decreases with longer forecast horizons</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={predictedWorkforceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => [`${value}%`, 'Confidence Level']} />
              <Bar dataKey="confidence" name="Confidence %">
                {predictedWorkforceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getConfidenceColor(entry.confidence)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
