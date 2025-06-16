
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, Shield, FileText, PieChart, Target, DollarSign, Heart } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';

interface FinancialPlanningDashboardProps {
  onAssessmentStart?: () => void;
  onToolSelect?: (tool: string) => void;
}

export const FinancialPlanningDashboard: React.FC<FinancialPlanningDashboardProps> = ({
  onAssessmentStart,
  onToolSelect
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const financialMetrics = {
    retirementReadiness: 72,
    savingsProgress: 65,
    healthcarePlanning: 45,
    estatePlanning: 30
  };

  const planningTools = [
    {
      id: 'assessment',
      title: 'Financial Assessment',
      description: 'Comprehensive evaluation of your retirement readiness',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Assessment',
      status: 'recommended'
    },
    {
      id: 'pension-calculator',
      title: 'Pension Calculator',
      description: 'Calculate your expected pension benefits',
      icon: <DirhamSign className="h-6 w-6" />,
      category: 'Benefits',
      status: 'available'
    },
    {
      id: 'healthcare-planner',
      title: 'Healthcare Planning',
      description: 'Plan for healthcare costs and insurance needs',
      icon: <Heart className="h-6 w-6" />,
      category: 'Healthcare',
      status: 'available'
    },
    {
      id: 'estate-planner',
      title: 'Estate Planning',
      description: 'Organize your estate and legacy planning',
      icon: <FileText className="h-6 w-6" />,
      category: 'Estate',
      status: 'available'
    },
    {
      id: 'investment-advisor',
      title: 'Investment Guidance',
      description: 'Conservative investment strategies for retirees',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Investment',
      status: 'available'
    },
    {
      id: 'budget-optimizer',
      title: 'Budget Optimizer',
      description: 'Optimize your retirement budget and expenses',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Planning',
      status: 'available'
    }
  ];

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'recommended': return 'success';
      case 'completed': return 'success';
      case 'in-progress': return 'outline';
      default: return 'secondary';
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 75) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Planning Tools</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retirement Readiness</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{financialMetrics.retirementReadiness}%</div>
                <Progress value={financialMetrics.retirementReadiness} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Above average preparation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Progress</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{financialMetrics.savingsProgress}%</div>
                <Progress value={financialMetrics.savingsProgress} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">On track for goals</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Healthcare Planning</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{financialMetrics.healthcarePlanning}%</div>
                <Progress value={financialMetrics.healthcarePlanning} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estate Planning</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{financialMetrics.estatePlanning}%</div>
                <Progress value={financialMetrics.estatePlanning} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Getting started</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Health Summary</CardTitle>
              <CardDescription>
                Your overall financial preparedness for retirement and recommendations for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monthly Retirement Income Goal</span>
                  <span className="text-sm text-muted-foreground">AED 12,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Projected Income</span>
                  <span className="text-sm text-muted-foreground">AED 8,640</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monthly Gap to Address</span>
                  <span className="text-sm font-semibold text-red-600">AED 3,360</span>
                </div>
                <div className="pt-4 border-t">
                  <Button onClick={onAssessmentStart} className="w-full">
                    <Calculator className="h-4 w-4 mr-2" />
                    Start Comprehensive Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {planningTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {tool.icon}
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                    <Badge variant={getBadgeVariant(tool.status)}>
                      {tool.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onToolSelect?.(tool.id)}
                  >
                    Use Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Planning Progress</CardTitle>
              <CardDescription>
                Track your progress across different areas of retirement planning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(financialMetrics).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span>{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Complete Healthcare Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Review insurance options and long-term care planning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <FileText className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Start Estate Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Create essential estate planning documents
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Optimize Investment Strategy</h4>
                    <p className="text-sm text-muted-foreground">
                      Review portfolio allocation for retirement phase
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
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
