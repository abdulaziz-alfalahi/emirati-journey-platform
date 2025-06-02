
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ServiceToCareerPathway } from '@/components/national-service/ServiceToCareerPathway';
import { BenefitsShowcase } from '@/components/national-service/BenefitsShowcase';
import { DocumentationCenter } from '@/components/national-service/DocumentationCenter';
import { PostServicePrograms } from '@/components/national-service/PostServicePrograms';
import { SupportNetwork } from '@/components/national-service/SupportNetwork';
import { RecognitionGallery } from '@/components/national-service/RecognitionGallery';
import { EmployerPartnershipPortal } from '@/components/national-service/EmployerPartnershipPortal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, Award, FileText, GraduationCap, Users, Star, 
  Building, Map, TrendingUp, Heart, Medal, Flag 
} from 'lucide-react';

const NationalServicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pathway');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-900 via-ehrdc-teal to-green-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40L20 20v40l20-20zm20 0L40 20v40l20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Shield className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                National Service to Career
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Transform your military service experience into a successful civilian career with dedicated support and opportunities
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-red-50 font-semibold">
                  Begin Transition
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                  Explore Benefits
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">95%</div>
                <div className="text-gray-600">Employment Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">15%</div>
                <div className="text-gray-600">Average Salary Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">500+</div>
                <div className="text-gray-600">Partner Employers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Honor Quote */}
        <section className="py-12 bg-gradient-to-r from-red-100 to-green-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Flag className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
              "Service to nation builds character, discipline, and leadership - qualities that drive success in every career path."
            </blockquote>
            <p className="mt-4 text-ehrdc-teal font-semibold">- UAE National Service Vision</p>
          </div>
        </section>

        {/* Main Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8 bg-white border">
              <TabsTrigger value="pathway" className="flex items-center gap-2 text-ehrdc-teal">
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Pathway</span>
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex items-center gap-2 text-ehrdc-teal">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Benefits</span>
              </TabsTrigger>
              <TabsTrigger value="documentation" className="flex items-center gap-2 text-ehrdc-teal">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center gap-2 text-ehrdc-teal">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Programs</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2 text-ehrdc-teal">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Support</span>
              </TabsTrigger>
              <TabsTrigger value="recognition" className="flex items-center gap-2 text-ehrdc-teal">
                <Medal className="h-4 w-4" />
                <span className="hidden sm:inline">Recognition</span>
              </TabsTrigger>
              <TabsTrigger value="employers" className="flex items-center gap-2 text-ehrdc-teal">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Employers</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pathway">
              <ServiceToCareerPathway />
            </TabsContent>
            
            <TabsContent value="benefits">
              <BenefitsShowcase />
            </TabsContent>
            
            <TabsContent value="documentation">
              <DocumentationCenter />
            </TabsContent>
            
            <TabsContent value="programs">
              <PostServicePrograms />
            </TabsContent>
            
            <TabsContent value="support">
              <SupportNetwork />
            </TabsContent>
            
            <TabsContent value="recognition">
              <RecognitionGallery />
            </TabsContent>
            
            <TabsContent value="employers">
              <EmployerPartnershipPortal />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NationalServicePage;
