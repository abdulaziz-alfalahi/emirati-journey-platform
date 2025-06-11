
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { NationalServiceResourcesList } from '@/components/national-service/NationalServiceResourcesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, Award, Users, GraduationCap, Map, Flag, 
  Clock, Target, Heart, Star
} from 'lucide-react';

const NationalServicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
        {/* Standardized Hero Section */}
        <CareerEntryHeroSection
          title="National Service: Serving the Nation"
          description="Building character, discipline, and national pride through dedicated service to the UAE"
          icon={<Shield className="h-12 w-12" />}
          primaryActionLabel="Learn About Service"
          primaryActionIcon={<Map className="h-5 w-5" />}
          secondaryActionLabel="Check Eligibility"
          secondaryActionIcon={<Users className="h-5 w-5" />}
        />

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">100,000+</div>
                <div className="text-muted-foreground">Citizens Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">12</div>
                <div className="text-muted-foreground">Months Duration</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">95%</div>
                <div className="text-muted-foreground">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">85%</div>
                <div className="text-muted-foreground">Career Advancement</div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspirational Quote Section */}
        <section className="py-16 bg-gradient-to-r from-ehrdc-teal to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Flag className="h-12 w-12" />
              </div>
            </div>
            <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
              "National Service builds the leaders of tomorrow, strengthening our nation through unity, discipline, and shared purpose."
            </blockquote>
            <cite className="text-lg opacity-90">— UAE National Service Vision</cite>
          </div>
        </section>

        {/* Main Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white border min-w-max">
                <TabsTrigger value="overview" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="eligibility" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Eligibility</span>
                </TabsTrigger>
                <TabsTrigger value="benefits" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Benefits</span>
                </TabsTrigger>
                <TabsTrigger value="post_service" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Post-Service</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview">
              <div className="space-y-6">
                {/* Overview Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-ehrdc-teal" />
                        Mission & Values
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Instill values of loyalty, belonging, and national pride while developing leadership skills and physical fitness.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-ehrdc-teal" />
                        Service Duration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">High School Graduates:</span>
                          <Badge>12 months</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">University Graduates:</span>
                          <Badge>9 months</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-ehrdc-teal" />
                        Key Outcomes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Enhanced discipline and responsibility</li>
                        <li>• Leadership and teamwork skills</li>
                        <li>• Physical and mental fitness</li>
                        <li>• Strong professional network</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <NationalServiceResourcesList category="overview" />
              </div>
            </TabsContent>
            
            <TabsContent value="eligibility">
              <div className="space-y-6">
                {/* Eligibility Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-ehrdc-teal" />
                      Eligibility Requirements
                    </CardTitle>
                    <CardDescription>
                      Check if you meet the requirements for UAE National Service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Basic Requirements</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            UAE National (Males aged 18-30)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Pass medical examination
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Meet physical fitness standards
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            No serious criminal record
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Exemptions & Deferrals</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Students (deferment available)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Medical conditions
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Sole breadwinner cases
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Special circumstances
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                        Check Your Eligibility
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <NationalServiceResourcesList category="eligibility" />
              </div>
            </TabsContent>
            
            <TabsContent value="benefits">
              <div className="space-y-6">
                {/* Benefits Overview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-ehrdc-teal" />
                        During Service
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        <li>• Monthly allowance</li>
                        <li>• Accommodation & meals</li>
                        <li>• Medical coverage</li>
                        <li>• Training & development</li>
                        <li>• Uniform & equipment</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-ehrdc-teal" />
                        Post-Service
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        <li>• Government job priority</li>
                        <li>• University advantages</li>
                        <li>• Professional development</li>
                        <li>• Alumni network access</li>
                        <li>• Leadership certificate</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-ehrdc-teal" />
                        Long-term
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        <li>• Enhanced career prospects</li>
                        <li>• Leadership experience</li>
                        <li>• Strong network</li>
                        <li>• Personal growth</li>
                        <li>• National recognition</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <NationalServiceResourcesList category="benefits" />
              </div>
            </TabsContent>
            
            <TabsContent value="post_service">
              <div className="space-y-6">
                {/* Post-Service Opportunities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-ehrdc-teal" />
                      Post-Service Opportunities
                    </CardTitle>
                    <CardDescription>
                      Continue your journey with enhanced career prospects and educational opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Career Services</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Job placement assistance</li>
                          <li>• Resume building workshops</li>
                          <li>• Interview preparation</li>
                          <li>• Career counseling</li>
                          <li>• Industry connections</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Educational Support</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• University application support</li>
                          <li>• Scholarship programs</li>
                          <li>• Professional certifications</li>
                          <li>• Continuing education</li>
                          <li>• Skills development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <NationalServiceResourcesList category="post_service" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NationalServicePage;
