
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

const sectorGrowthPredictions = [
  { 
    sector: 'Technology', 
    currentEmployees: 125000,
    predicted2025: 165000,
    predicted2027: 220000,
    growthRate: 12.5,
    driverFactors: ['AI adoption', 'Digital transformation', 'Smart city initiatives']
  },
  { 
    sector: 'Healthcare', 
    currentEmployees: 180000,
    predicted2025: 215000,
    predicted2027: 260000,
    growthRate: 8.2,
    driverFactors: ['Aging population', 'Medical tourism', 'Healthcare digitization']
  },
  { 
    sector: 'Tourism & Hospitality', 
    currentEmployees: 220000,
    predicted2025: 285000,
    predicted2027: 350000,
    growthRate: 10.5,
    driverFactors: ['Expo impact', 'Cultural initiatives', 'Entertainment expansion']
  },
  { 
    sector: 'Finance & Banking', 
    currentEmployees: 95000,
    predicted2025: 115000,
    predicted2027: 140000,
    growthRate: 8.8,
    driverFactors: ['Fintech growth', 'Cryptocurrency regulation', 'Investment banking']
  }
];

export const SectorGrowthTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Growth Projections</CardTitle>
        <CardDescription>Employment forecasts by major economic sectors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sectorGrowthPredictions.map((sector, index) => (
            <div key={sector.sector} className="p-6 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{sector.sector}</h3>
                  <p className="text-sm text-muted-foreground">
                    {sector.growthRate}% annual growth rate
                  </p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Growing
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Current (2024)</p>
                  <p className="text-2xl font-bold">{sector.currentEmployees.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">2025 Projection</p>
                  <p className="text-2xl font-bold text-blue-600">{sector.predicted2025.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">2027 Projection</p>
                  <p className="text-2xl font-bold text-green-600">{sector.predicted2027.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Key Growth Drivers:</p>
                <div className="flex flex-wrap gap-2">
                  {sector.driverFactors.map((factor, idx) => (
                    <Badge key={idx} variant="secondary">{factor}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
