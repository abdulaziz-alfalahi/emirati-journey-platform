
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, TrendingUp, Award, Building, Users, 
  DollarSign, Calendar, Star, CheckCircle 
} from 'lucide-react';

export const EmiratizationOpportunities: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const emiratizationData = {
    overview: {
      totalTarget: 75,
      currentRate: 58,
      improvement: 12,
      beneficiaries: 125000
    },
    industries: [
      {
        name: 'Banking & Finance',
        currentRate: 78,
        target: 85,
        trend: 'up',
        jobs: 15000,
        programs: ['Graduate Training Programs', 'Leadership Development', 'Mentorship Schemes'],
        incentives: ['Fast-track promotions', 'Professional certifications', 'International exposure']
      },
      {
        name: 'Healthcare',
        currentRate: 72,
        target: 80,
        trend: 'up',
        jobs: 12000,
        programs: ['Medical Residency Programs', 'Nursing Excellence', 'Healthcare Leadership'],
        incentives: ['Continuing education', 'Research opportunities', 'Career advancement']
      },
      {
        name: 'Energy & Oil',
        currentRate: 65,
        target: 75,
        trend: 'stable',
        jobs: 18000,
        programs: ['Engineering Development', 'Technical Excellence', 'Innovation Labs'],
        incentives: ['Technical training', 'Innovation projects', 'Leadership roles']
      },
      {
        name: 'Technology & AI',
        currentRate: 55,
        target: 70,
        trend: 'up',
        jobs: 8000,
        programs: ['AI Talent Program', 'Digital Skills Bootcamp', 'Innovation Accelerator'],
        incentives: ['Cutting-edge projects', 'Global conferences', 'Startup opportunities']
      },
      {
        name: 'Tourism & Hospitality',
        currentRate: 45,
        target: 60,
        trend: 'up',
        jobs: 20000,
        programs: ['Hospitality Excellence', 'Cultural Ambassador', 'Service Leadership'],
        incentives: ['International training', 'Cultural programs', 'Management track']
      },
      {
        name: 'Construction & Real Estate',
        currentRate: 35,
        target: 50,
        trend: 'up',
        jobs: 25000,
        programs: ['Project Management', 'Engineering Excellence', 'Sustainable Building'],
        incentives: ['Project leadership', 'Green building certification', 'Innovation awards']
      }
    ],
    programs: [
      {
        id: 1,
        name: 'Emirati Talent Accelerator',
        industry: 'Cross-Industry',
        duration: '12 months',
        participants: 500,
        description: 'Comprehensive leadership development program for high-potential Emiratis',
        benefits: ['Executive mentoring', 'International assignments', 'MBA sponsorship'],
        eligibility: ['UAE National', 'Bachelor\'s degree', '2+ years experience'],
        nextIntake: '2024-04-01',
        applicationDeadline: '2024-03-15'
      },
      {
        id: 2,
        name: 'Digital Leaders Initiative',
        industry: 'Technology',
        duration: '18 months',
        participants: 200,
        description: 'Developing Emirati leaders in digital transformation and AI',
        benefits: ['Tech certifications', 'Silicon Valley exposure', 'Innovation projects'],
        eligibility: ['UAE National', 'STEM background', 'Digital experience'],
        nextIntake: '2024-05-01',
        applicationDeadline: '2024-04-15'
      },
      {
        id: 3,
        name: 'Healthcare Excellence Program',
        industry: 'Healthcare',
        duration: '24 months',
        participants: 150,
        description: 'Advanced medical and healthcare management training',
        benefits: ['International fellowships', 'Research funding', 'Leadership positions'],
        eligibility: ['UAE National', 'Medical/Health degree', 'Clinical experience'],
        nextIntake: '2024-06-01',
        applicationDeadline: '2024-05-15'
      }
    ],
    incentives: [
      {
        category: 'Financial',
        items: [
          'Competitive salary packages above market rate',
          'Performance bonuses and profit sharing',
          'Education and training allowances',
          'Family support benefits'
        ]
      },
      {
        category: 'Career Development',
        items: [
          'Fast-track career progression paths',
          'Leadership development programs',
          'International assignment opportunities',
          'Mentorship by industry experts'
        ]
      },
      {
        category: 'Work-Life Balance',
        items: [
          'Flexible working arrangements',
          'Extended annual leave',
          'Family-friendly policies',
          'Health and wellness programs'
        ]
      },
      {
        category: 'Recognition',
        items: [
          'Annual Emiratization excellence awards',
          'Public recognition programs',
          'Innovation and achievement bonuses',
          'Professional development sponsorship'
        ]
      }
    ]
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 transform rotate-180" />;
      default: return <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-ehrdc-teal" />
              <div>
                <div className="text-2xl font-bold text-ehrdc-teal">75%</div>
                <div className="text-sm text-ehrdc-neutral-dark/70">National Target</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-ehrdc-teal">58%</div>
                <div className="text-sm text-ehrdc-neutral-dark/70">Current Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-ehrdc-teal">+12%</div>
                <div className="text-sm text-ehrdc-neutral-dark/70">5-Year Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-ehrdc-teal">125K</div>
                <div className="text-sm text-ehrdc-neutral-dark/70">Beneficiaries</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 bg-white border">
          <TabsTrigger value="overview" className="text-ehrdc-teal">Industry Overview</TabsTrigger>
          <TabsTrigger value="programs" className="text-ehrdc-teal">Special Programs</TabsTrigger>
          <TabsTrigger value="incentives" className="text-ehrdc-teal">Incentives</TabsTrigger>
          <TabsTrigger value="apply" className="text-ehrdc-teal">How to Apply</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-ehrdc-teal">Emiratization by Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {emiratizationData.industries.map((industry, index) => (
                  <div key={index} className="p-4 border border-ehrdc-neutral-light rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-ehrdc-teal">{industry.name}</h3>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(industry.trend)}
                        <span className="text-sm text-ehrdc-neutral-dark/70">
                          {industry.jobs.toLocaleString()} opportunities
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Current Rate</span>
                          <span className="text-sm font-semibold">{industry.currentRate}%</span>
                        </div>
                        <Progress value={industry.currentRate} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Target</span>
                          <span className="text-sm font-semibold">{industry.target}%</span>
                        </div>
                        <Progress value={industry.target} className="h-2" />
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Gap to Target</div>
                        <div className="text-lg font-semibold text-orange-600">
                          {industry.target - industry.currentRate}%
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Development Programs</h4>
                        <div className="space-y-1">
                          {industry.programs.map((program, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs mr-2 mb-1">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Special Incentives</h4>
                        <div className="space-y-1">
                          {industry.incentives.map((incentive, idx) => (
                            <div key={idx} className="text-xs text-ehrdc-neutral-dark/70 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {incentive}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid gap-6">
            {emiratizationData.programs.map((program) => (
              <Card key={program.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-ehrdc-teal mb-2">{program.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-ehrdc-neutral-dark/70">
                        <Badge variant="outline">{program.industry}</Badge>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {program.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {program.participants} participants
                        </div>
                      </div>
                    </div>
                    <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                      Apply Now
                    </Button>
                  </div>

                  <p className="text-ehrdc-neutral-dark/70 mb-4">{program.description}</p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Program Benefits</h4>
                      <div className="space-y-1">
                        {program.benefits.map((benefit, idx) => (
                          <div key={idx} className="text-sm text-ehrdc-neutral-dark/70 flex items-center gap-2">
                            <Star className="h-3 w-3 text-yellow-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                      <div className="space-y-1">
                        {program.eligibility.map((criteria, idx) => (
                          <div key={idx} className="text-sm text-ehrdc-neutral-dark/70 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {criteria}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Important Dates</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Application Deadline:</span>
                          <div className="text-red-600">{new Date(program.applicationDeadline).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="font-medium">Next Intake:</span>
                          <div className="text-ehrdc-teal">{new Date(program.nextIntake).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="incentives" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {emiratizationData.incentives.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-ehrdc-teal">{category.category} Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-ehrdc-neutral-light/20 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-ehrdc-neutral-dark">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-ehrdc-teal">How to Access Emiratization Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Application Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-ehrdc-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                      <div>
                        <h4 className="font-medium">Create Your Profile</h4>
                        <p className="text-sm text-ehrdc-neutral-dark/70">Complete your EHRDC profile with education and experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-ehrdc-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                      <div>
                        <h4 className="font-medium">Browse Opportunities</h4>
                        <p className="text-sm text-ehrdc-neutral-dark/70">Explore industries and programs that match your interests</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-ehrdc-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                      <div>
                        <h4 className="font-medium">Submit Applications</h4>
                        <p className="text-sm text-ehrdc-neutral-dark/70">Apply to programs and positions that align with your goals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-ehrdc-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                      <div>
                        <h4 className="font-medium">Interview & Assessment</h4>
                        <p className="text-sm text-ehrdc-neutral-dark/70">Participate in interviews and skills assessments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-ehrdc-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
                      <div>
                        <h4 className="font-medium">Start Your Journey</h4>
                        <p className="text-sm text-ehrdc-neutral-dark/70">Begin your specialized training and career development</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Required Documents</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      UAE National ID (Emirates ID)
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Educational certificates and transcripts
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Professional experience certificates
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Updated CV/Resume
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Professional references
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Portfolio (if applicable)
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                      Start Application Process
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
