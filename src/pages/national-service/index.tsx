
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Shield, Users, Calendar, TrendingUp, Award, FileText, CheckCircle, Heart } from 'lucide-react';
import { NationalServiceResourcesList } from '@/components/national-service/NationalServiceResourcesList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NationalServiceOverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-ehrdc-teal" />
            About National Service
          </CardTitle>
          <CardDescription>
            Understanding the UAE National Service program and its role in citizen development
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The UAE National Service program is a cornerstone of national development, designed to instill values of 
            loyalty, belonging, and dedication to the homeland while preparing young Emiratis for future challenges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-ehrdc-light-teal/10 rounded-lg">
              <h4 className="font-semibold text-ehrdc-teal mb-2">Core Values</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Loyalty and patriotism</li>
                <li>• Leadership and teamwork</li>
                <li>• Discipline and responsibility</li>
                <li>• Physical and mental resilience</li>
              </ul>
            </div>
            <div className="p-4 bg-ehrdc-light-teal/10 rounded-lg">
              <h4 className="font-semibold text-ehrdc-teal mb-2">Program Benefits</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Leadership development</li>
                <li>• Career advancement opportunities</li>
                <li>• Professional skill building</li>
                <li>• Network expansion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EligibilityTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-ehrdc-teal" />
            Eligibility Requirements
          </CardTitle>
          <CardDescription>
            Criteria and requirements for UAE National Service participation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-ehrdc-teal">Mandatory Service</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">Required</Badge>
                  <div>
                    <p className="font-medium">Male Emirati Citizens</p>
                    <p className="text-sm text-muted-foreground">Ages 18-30, not enrolled in higher education</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-ehrdc-teal">Voluntary Service</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">Optional</Badge>
                  <div>
                    <p className="font-medium">Female Emirati Citizens</p>
                    <p className="text-sm text-muted-foreground">Ages 18-30, voluntary participation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 text-ehrdc-teal">General Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                <p className="font-medium">UAE Citizenship</p>
                <p className="text-sm text-muted-foreground">Valid Emirates ID required</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Heart className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                <p className="font-medium">Medical Fitness</p>
                <p className="text-sm text-muted-foreground">Health assessment required</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                <p className="font-medium">Clean Record</p>
                <p className="text-sm text-muted-foreground">No criminal background</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ApplicationProcessTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-ehrdc-teal" />
            Application Process
          </CardTitle>
          <CardDescription>
            Step-by-step guide to applying for UAE National Service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Online Registration",
                description: "Complete the online application form with personal details and documentation"
              },
              {
                step: 2,
                title: "Document Submission",
                description: "Submit required documents including Emirates ID, educational certificates, and medical records"
              },
              {
                step: 3,
                title: "Medical Examination",
                description: "Undergo comprehensive medical and fitness assessment"
              },
              {
                step: 4,
                title: "Interview Process",
                description: "Participate in assessment interviews and aptitude tests"
              },
              {
                step: 5,
                title: "Acceptance & Enrollment",
                description: "Receive acceptance notification and complete enrollment procedures"
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-ehrdc-teal text-white rounded-full flex items-center justify-center font-semibold">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-ehrdc-teal">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-ehrdc-light-teal/10 rounded-lg">
            <h4 className="font-semibold text-ehrdc-teal mb-2">Ready to Apply?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Start your National Service journey today and contribute to the UAE's continued development.
            </p>
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
              Begin Application
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BenefitsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-ehrdc-teal" />
            Program Benefits
          </CardTitle>
          <CardDescription>
            Comprehensive benefits and opportunities through National Service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4 text-ehrdc-teal">Personal Development</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Leadership skills enhancement</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Physical fitness improvement</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Discipline and time management</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Cultural awareness and national pride</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-ehrdc-teal">Career Advantages</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Government sector employment priority</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Professional certification programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Networking opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Enhanced resume credentials</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 text-ehrdc-teal">Financial Support</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-ehrdc-teal mb-1">5,000</div>
                <p className="text-sm">Monthly Allowance (AED)</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-ehrdc-teal mb-1">100%</div>
                <p className="text-sm">Healthcare Coverage</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-ehrdc-teal mb-1">Free</div>
                <p className="text-sm">Training & Equipment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ResourcesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <NationalServiceResourcesList />
    </div>
  );
};

const NationalServicePage: React.FC = () => {
  const stats = [
    { value: "45,000+", label: "Citizens Served", icon: Users },
    { value: "12", label: "Months Duration", icon: Calendar },
    { value: "96%", label: "Completion Rate", icon: TrendingUp },
    { value: "85%", label: "Career Advancement", icon: Award }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Shield className="h-4 w-4" />,
      content: <NationalServiceOverviewTab />
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      icon: <CheckCircle className="h-4 w-4" />,
      content: <EligibilityTab />
    },
    {
      id: 'application',
      label: 'Application Process',
      icon: <FileText className="h-4 w-4" />,
      content: <ApplicationProcessTab />
    },
    {
      id: 'benefits',
      label: 'Benefits',
      icon: <Award className="h-4 w-4" />,
      content: <BenefitsTab />
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: <FileText className="h-4 w-4" />,
      content: <ResourcesTab />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="UAE National Service: Building Tomorrow's Leaders"
      description="Discover how UAE National Service shapes young Emiratis into confident leaders, instilling values of loyalty, discipline, and national pride while preparing them for successful careers and lifelong contribution to the nation."
      icon={<Shield className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="overview"
    />
  );
};

export default NationalServicePage;
