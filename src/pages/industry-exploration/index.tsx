
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { Building, TrendingUp, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const IndustryExplorationPage: React.FC = () => {
  const stats = [
    { value: "25+", label: "Key Industries" },
    { value: "1,000+", label: "Companies Profiled" },
    { value: "500+", label: "Industry Insights" },
    { value: "95%", label: "Data Accuracy" }
  ];

  const industries = [
    {
      name: "Technology & Innovation",
      companies: 150,
      growth: "+15%",
      opportunities: "High"
    },
    {
      name: "Financial Services",
      companies: 200,
      growth: "+8%",
      opportunities: "Medium"
    },
    {
      name: "Healthcare",
      companies: 120,
      growth: "+12%",
      opportunities: "High"
    }
  ];

  const tabs = [
    {
      id: "industries",
      label: "Key Industries",
      icon: <Building className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{industry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Companies:</span>
                    <span>{industry.companies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Growth Rate:</span>
                    <Badge variant="secondary">{industry.growth}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Opportunities:</span>
                    <Badge variant={industry.opportunities === 'High' ? 'default' : 'secondary'}>
                      {industry.opportunities}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Industry Exploration"
      description="Discover thriving industries in the UAE and understand market opportunities across different sectors"
      heroIcon={<Building className="h-12 w-12" />}
      primaryActionLabel="Explore Industries"
      primaryActionIcon={<Building className="h-4 w-4" />}
      secondaryActionLabel="View Trends"
      stats={stats}
      quote="The best way to predict the future is to create it"
      attribution="Peter Drucker"
      quoteIcon={<TrendingUp className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="industries"
    />
  );
};

export default IndustryExplorationPage;
