
import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitCompare, TrendingUp, Users, BookOpen } from 'lucide-react';

const CareerComparisonPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-8 mb-8 text-white">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <GitCompare className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Career Path Comparison</h1>
          </div>
          <p className="text-xl opacity-90 mb-6">
            Compare different career paths, analyze job market trends, and make informed decisions about your professional future.
          </p>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Coming Soon</CardTitle>
          <CardDescription>
            We're building an advanced career comparison tool to help you make informed career decisions.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Market Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Compare salary trends, job availability, and growth prospects across different career paths.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Skill Requirements</h3>
              <p className="text-sm text-muted-foreground">
                Analyze required skills, qualifications, and competencies for different roles.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Learning Pathways</h3>
              <p className="text-sm text-muted-foreground">
                Discover educational requirements and professional development opportunities.
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

export default CareerComparisonPage;
