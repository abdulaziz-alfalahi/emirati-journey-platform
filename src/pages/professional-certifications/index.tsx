
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { CertificationExplorer } from '@/components/professional-certifications/CertificationExplorer';
import { CertificationRoadmaps } from '@/components/professional-certifications/CertificationRoadmaps';
import { PreparationResources } from '@/components/professional-certifications/PreparationResources';
import { TestingCenters } from '@/components/professional-certifications/TestingCenters';
import { EmployerRecognition } from '@/components/professional-certifications/EmployerRecognition';
import { SuccessStories } from '@/components/professional-certifications/SuccessStories';
import { CertificationTracking } from '@/components/professional-certifications/CertificationTracking';
import { FinancialSupport } from '@/components/professional-certifications/FinancialSupport';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Search, Calendar, BookOpen, MapPin, Building, Users, DollarSign } from 'lucide-react';

const ProfessionalCertificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explorer');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-slate-800 to-blue-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Award className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                Professional Certifications
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Advance your career with industry-recognized certifications valued by UAE employers
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-slate-800 hover:bg-white/90 font-semibold">
                  Explore Certifications
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
                  View Career Roadmaps
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-2">500+</div>
                <div className="text-slate-600">Available Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-2">25+</div>
                <div className="text-slate-600">Industry Sectors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-2">85%</div>
                <div className="text-slate-600">Career Advancement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-2">15</div>
                <div className="text-slate-600">Testing Centers in UAE</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
              <TabsTrigger value="explorer" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Explorer</span>
              </TabsTrigger>
              <TabsTrigger value="roadmaps" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Roadmaps</span>
              </TabsTrigger>
              <TabsTrigger value="preparation" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Preparation</span>
              </TabsTrigger>
              <TabsTrigger value="testing" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Testing</span>
              </TabsTrigger>
              <TabsTrigger value="employers" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Employers</span>
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Stories</span>
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Tracking</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Support</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explorer">
              <CertificationExplorer />
            </TabsContent>
            
            <TabsContent value="roadmaps">
              <CertificationRoadmaps />
            </TabsContent>
            
            <TabsContent value="preparation">
              <PreparationResources />
            </TabsContent>
            
            <TabsContent value="testing">
              <TestingCenters />
            </TabsContent>
            
            <TabsContent value="employers">
              <EmployerRecognition />
            </TabsContent>
            
            <TabsContent value="stories">
              <SuccessStories />
            </TabsContent>
            
            <TabsContent value="tracking">
              <CertificationTracking />
            </TabsContent>
            
            <TabsContent value="financial">
              <FinancialSupport />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalCertificationsPage;
