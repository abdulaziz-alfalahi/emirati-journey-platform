
import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, BarChart3, MapPin, Briefcase } from 'lucide-react';

const SalaryExplorerPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg p-8 mb-8 text-white">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Salary Explorer</h1>
          </div>
          <p className="text-xl opacity-90 mb-6">
            Explore salary ranges, compensation packages, and market rates across industries and locations in the UAE.
          </p>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Coming Soon</CardTitle>
          <CardDescription>
            We're developing a comprehensive salary exploration tool with UAE market data.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Market Rates</h3>
              <p className="text-sm text-muted-foreground">
                Access real-time salary data and compensation benchmarks across UAE industries.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Location Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Compare salaries across different emirates and cities in the UAE.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <Briefcase className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Role Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed compensation breakdowns by job level, experience, and specialization.
              </p>
            </div>
          </div>
          <Button className="ehrdc-button-primary">
            Get Notified When Available
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default SalaryExplorerPage;
