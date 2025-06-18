
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { Compass, Target, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CareerPlanningHubPage: React.FC = () => {
  const stats = [
    { value: "500+", label: "Career Paths Mapped" },
    { value: "10,000+", label: "Career Plans Created" },
    { value: "85%", label: "Goal Achievement Rate" },
    { value: "200+", label: "Industry Insights" }
  ];

  const planningTools = [
    {
      title: "Career Path Explorer",
      description: "Discover potential career trajectories based on your interests and skills",
      icon: <Compass className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Goal Setting Wizard",
      description: "Set SMART career goals with milestone tracking",
      icon: <Target className="h-8 w-8 text-green-600" />
    },
    {
      title: "Market Intelligence",
      description: "Access real-time job market data and salary insights",
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />
    }
  ];

  const tabs = [
    {
      id: "planning-tools",
      label: "Planning Tools",
      icon: <Compass className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {planningTools.map((tool, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {tool.icon}
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Career Planning Hub"
      description="Your comprehensive platform for career development with advanced planning tools, market intelligence, and personalized guidance"
      heroIcon={<Compass className="h-12 w-12" />}
      primaryActionLabel="Start Planning"
      primaryActionIcon={<Target className="h-4 w-4" />}
      secondaryActionLabel="View Resources"
      stats={stats}
      quote="Success is where preparation and opportunity meet"
      attribution="Bobby Unser"
      quoteIcon={<Target className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="planning-tools"
    />
  );
};

export default CareerPlanningHubPage;
