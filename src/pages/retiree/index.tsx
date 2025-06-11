
import React from 'react';
import { Clock, Briefcase, Shield, Users, Award } from 'lucide-react';
import LifelongEngagementLayout from '@/components/layout/LifelongEngagementLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PostCareerOptionsTab from '@/components/retiree/PostCareerOptionsTab';
import RetirementBenefitsTab from '@/components/retiree/RetirementBenefitsTab';

const RetireeServicesPage: React.FC = () => {
  return (
    <LifelongEngagementLayout
      heroTitle="Emirati Retiree Journey: A New Chapter of Purpose and Prosperity"
      heroDescription="Supporting UAE citizens during their retirement journey with specialized services, opportunities, and comprehensive benefits to ensure a fulfilling post-career life."
    >
      {/* Standardized Stats Section */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg flex items-center">
          <Briefcase className="h-10 w-10 text-blue-600 mr-4" />
          <div>
            <h3 className="font-semibold text-lg">50+ Opportunities</h3>
            <p className="text-sm text-muted-foreground">Post-career consulting and volunteering</p>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg flex items-center">
          <Shield className="h-10 w-10 text-green-600 mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Comprehensive Benefits</h3>
            <p className="text-sm text-muted-foreground">Pension, healthcare, and financial planning</p>
          </div>
        </div>
        <div className="bg-amber-50 p-6 rounded-lg flex items-center">
          <Users className="h-10 w-10 text-amber-600 mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Active Community</h3>
            <p className="text-sm text-muted-foreground">Connect with fellow retirees</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="post-career" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="post-career" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Post-Career Options
          </TabsTrigger>
          <TabsTrigger value="retirement-benefits" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Retirement Benefits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="post-career">
          <PostCareerOptionsTab />
        </TabsContent>

        <TabsContent value="retirement-benefits">
          <RetirementBenefitsTab />
        </TabsContent>
      </Tabs>
    </LifelongEngagementLayout>
  );
};

export default RetireeServicesPage;
