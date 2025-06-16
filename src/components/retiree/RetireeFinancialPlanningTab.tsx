
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, PieChart, TrendingUp, Shield, FileText, ExternalLink, Heart } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';
import { FinancialPlanningDashboard } from '@/components/retirement-planning/FinancialPlanningDashboard';
import { PensionCalculator } from '@/components/retirement-planning/PensionCalculator';

export const RetireeFinancialPlanningTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
    if (tool === 'pension-calculator') {
      setActiveTab('pension-calculator');
    }
  };

  const financialResources = [
    {
      title: 'UAE Pension System Overview',
      description: 'Complete guide to UAE pension benefits and entitlements',
      url: '#',
      category: 'Benefits'
    },
    {
      title: 'Tax Planning for Retirees',
      description: 'Understanding tax implications of retirement income',
      url: '#',
      category: 'Tax'
    },
    {
      title: 'Social Security Benefits',
      description: 'Navigating social security and government benefits',
      url: '#',
      category: 'Benefits'
    },
    {
      title: 'Financial Fraud Protection',
      description: 'Protecting yourself from financial scams and fraud',
      url: '#',
      category: 'Security'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Financial Planning for Retirees</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive financial planning tools and resources to help you manage your retirement finances effectively and securely.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pension-calculator">Pension Calculator</TabsTrigger>
          <TabsTrigger value="health-check">Health Check</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <FinancialPlanningDashboard 
            onAssessmentStart={() => setActiveTab('health-check')}
            onToolSelect={handleToolSelect}
          />
        </TabsContent>

        <TabsContent value="pension-calculator" className="space-y-6">
          <PensionCalculator />
        </TabsContent>

        <TabsContent value="health-check" className="space-y-6">
          {/* Financial Health Check */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                Financial Health Check
              </CardTitle>
              <CardDescription>
                Get a quick assessment of your retirement financial readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <div className="text-sm text-muted-foreground">Pension Security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">78%</div>
                    <div className="text-sm text-muted-foreground">Healthcare Coverage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">62%</div>
                    <div className="text-sm text-muted-foreground">Emergency Fund</div>
                  </div>
                </div>
                <Button className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Take Full Financial Assessment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Assessment Areas */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Income Security Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Pension Adequacy</span>
                    <Badge variant="success">Strong</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Social Security Optimization</span>
                    <Badge variant="outline">Review Needed</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Investment Income</span>
                    <Badge variant="secondary">Moderate</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Detailed Income Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Healthcare & Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Health Insurance Coverage</span>
                    <Badge variant="success">Adequate</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Long-term Care Planning</span>
                    <Badge variant="outline">Needs Attention</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emergency Fund</span>
                    <Badge variant="secondary">Building</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Healthcare Planning Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Financial Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Financial Resources & Guides
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {financialResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read Guide
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Professional Support */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>
                  Learn about retirement planning and financial wellness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Retirement Planning Guide</span>
                    <Button variant="outline" size="sm">Read</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">UAE Pension System Overview</span>
                    <Button variant="outline" size="sm">Read</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Healthcare Cost Planning</span>
                    <Button variant="outline" size="sm">Read</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estate Planning Basics</span>
                    <Button variant="outline" size="sm">Read</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Support</CardTitle>
                <CardDescription>
                  Connect with financial advisors and specialists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="h-4 w-4 mr-2" />
                    Schedule Financial Consultation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Healthcare Planning Advisor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Estate Planning Attorney
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Insurance Specialist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
