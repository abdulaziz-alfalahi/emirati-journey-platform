
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Shield, PieChart, DollarSign, FileText, Heart, Target, Users, Book } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';
import { FinancialPlanningDashboard } from '@/components/retirement-planning/FinancialPlanningDashboard';
import { PensionCalculator } from '@/components/retirement-planning/PensionCalculator';

interface FinancialPlanningContentProps {
  category: 'budgeting' | 'investments' | 'retirement' | 'insurance' | 'education' | 'advisory';
}

export const FinancialPlanningContent: React.FC<FinancialPlanningContentProps> = ({ category }) => {
  const renderContent = () => {
    switch (category) {
      case 'budgeting':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-ehrdc-teal" />
                  Budgeting & Expense Tracking
                </CardTitle>
                <CardDescription>
                  Manage your finances with comprehensive budgeting tools and expense tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: 'Monthly Budget Planner',
                      description: 'Create and manage monthly budgets',
                      icon: <Calculator className="h-5 w-5" />,
                      status: 'available'
                    },
                    {
                      title: 'Expense Tracker',
                      description: 'Track daily expenses and spending patterns',
                      icon: <DollarSign className="h-5 w-5" />,
                      status: 'available'
                    },
                    {
                      title: 'Savings Goal Tracker',
                      description: 'Set and track savings goals',
                      icon: <Target className="h-5 w-5" />,
                      status: 'available'
                    }
                  ].map((tool, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          {tool.icon}
                          <Badge variant="secondary">{tool.status}</Badge>
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="w-full">Use Tool</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'investments':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-ehrdc-teal" />
                  Investment Planning & Portfolio Management
                </CardTitle>
                <CardDescription>
                  Build and manage your investment portfolio with expert guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: 'Portfolio Analyzer',
                      description: 'Analyze your investment portfolio performance',
                      icon: <PieChart className="h-5 w-5" />,
                      status: 'available'
                    },
                    {
                      title: 'Risk Assessment',
                      description: 'Evaluate your investment risk tolerance',
                      icon: <Shield className="h-5 w-5" />,
                      status: 'available'
                    },
                    {
                      title: 'UAE Market Insights',
                      description: 'Local market analysis and opportunities',
                      icon: <TrendingUp className="h-5 w-5" />,
                      status: 'available'
                    }
                  ].map((tool, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          {tool.icon}
                          <Badge variant="secondary">{tool.status}</Badge>
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="w-full">Use Tool</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'retirement':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DirhamSign className="h-5 w-5 text-ehrdc-teal" />
                  Retirement Planning & Pension Management
                </CardTitle>
                <CardDescription>
                  Comprehensive retirement planning tools and pension optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialPlanningDashboard 
                  onAssessmentStart={() => console.log('Starting assessment')}
                  onToolSelect={(tool) => console.log('Selected tool:', tool)}
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'insurance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-ehrdc-teal" />
                  Insurance & Risk Management
                </CardTitle>
                <CardDescription>
                  Protect your financial future with comprehensive insurance planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: 'Health Insurance Planner',
                      description: 'Compare and select health insurance plans',
                      icon: <Heart className="h-5 w-5" />,
                      status: 'available'
                    },
                    {
                      title: 'Life Insurance Calculator',
                      description: 'Calculate optimal life insurance coverage',
                      icon: <Calculator className="h-5 w-5" />,
                      status: 'available'
                    },
                    {
                      title: 'Property Insurance Guide',
                      description: 'Protect your assets with proper coverage',
                      icon: <Shield className="h-5 w-5" />,
                      status: 'available'
                    }
                  ].map((tool, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          {tool.icon}
                          <Badge variant="secondary">{tool.status}</Badge>
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="w-full">Use Tool</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-ehrdc-teal" />
                  Financial Education & Resources
                </CardTitle>
                <CardDescription>
                  Enhance your financial literacy with comprehensive educational resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: 'Personal Finance Basics',
                      description: 'Learn fundamental personal finance concepts',
                      duration: '2 hours',
                      level: 'Beginner'
                    },
                    {
                      title: 'Investment Fundamentals',
                      description: 'Understanding different investment options',
                      duration: '3 hours',
                      level: 'Intermediate'
                    },
                    {
                      title: 'Retirement Planning Guide',
                      description: 'Comprehensive retirement planning strategies',
                      duration: '4 hours',
                      level: 'Intermediate'
                    },
                    {
                      title: 'UAE Financial System',
                      description: 'Navigate UAE banking and financial services',
                      duration: '2.5 hours',
                      level: 'Beginner'
                    }
                  ].map((course, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{course.level}</Badge>
                          <span className="text-sm text-muted-foreground">{course.duration}</span>
                        </div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="w-full">Start Course</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'advisory':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-ehrdc-teal" />
                  Professional Financial Advisory Services
                </CardTitle>
                <CardDescription>
                  Connect with certified financial advisors and specialists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: 'Personal Financial Advisor',
                      description: 'One-on-one financial planning consultation',
                      specialties: ['Retirement Planning', 'Investment Strategy', 'Tax Planning'],
                      availability: 'Available'
                    },
                    {
                      title: 'Retirement Specialist',
                      description: 'Expert guidance on retirement planning',
                      specialties: ['Pension Optimization', 'Healthcare Planning', 'Estate Planning'],
                      availability: 'Available'
                    },
                    {
                      title: 'Investment Advisor',
                      description: 'Professional investment portfolio management',
                      specialties: ['Portfolio Analysis', 'Risk Management', 'Market Strategy'],
                      availability: 'Limited'
                    },
                    {
                      title: 'Insurance Specialist',
                      description: 'Comprehensive insurance planning',
                      specialties: ['Health Insurance', 'Life Insurance', 'Property Coverage'],
                      availability: 'Available'
                    }
                  ].map((advisor, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant={advisor.availability === 'Available' ? 'success' : 'secondary'}>
                            {advisor.availability}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{advisor.title}</CardTitle>
                        <CardDescription>{advisor.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {advisor.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            disabled={advisor.availability !== 'Available'}
                          >
                            Schedule Consultation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Content for {category} coming soon...</p>
            </CardContent>
          </Card>
        );
    }
  };

  return <div>{renderContent()}</div>;
};
