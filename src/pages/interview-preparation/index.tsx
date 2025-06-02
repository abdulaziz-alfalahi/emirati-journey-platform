
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { InterviewSimulator } from '@/components/interview-preparation/InterviewSimulator';
import { QuestionLibrary } from '@/components/interview-preparation/QuestionLibrary';
import { AnswerBuilder } from '@/components/interview-preparation/AnswerBuilder';
import { MockInterviewScheduling } from '@/components/interview-preparation/MockInterviewScheduling';
import { InterviewTypesGuide } from '@/components/interview-preparation/InterviewTypesGuide';
import { CulturalIntelligence } from '@/components/interview-preparation/CulturalIntelligence';
import { TechnicalAssessment } from '@/components/interview-preparation/TechnicalAssessment';
import { PostInterviewActions } from '@/components/interview-preparation/PostInterviewActions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, BookOpen, PenTool, Calendar, Users, Globe, 
  Code, CheckCircle, Target, Star, Lightbulb, Heart
} from 'lucide-react';

const InterviewPreparationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('simulator');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ehrdc-teal via-blue-500 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm15 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Target className="h-16 w-16" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
                Interview Excellence
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Master the art of interviewing with AI-powered practice, expert guidance, and cultural intelligence
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Practice
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Mock Interview
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Confidence Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">10,000+</div>
                <div className="text-gray-600">Practice Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">500+</div>
                <div className="text-gray-600">Question Types</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">50+</div>
                <div className="text-gray-600">Industry Experts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="py-12 bg-gradient-to-r from-green-100 to-blue-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
              "Every interview is an opportunity to showcase your unique value - prepare with confidence, interview with courage."
            </blockquote>
            <p className="mt-4 text-ehrdc-teal font-semibold">- UAE Career Excellence Initiative</p>
          </div>
        </section>

        {/* Main Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 mb-8 bg-white border">
              <TabsTrigger value="simulator" className="flex items-center gap-2 text-ehrdc-teal">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Simulator</span>
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center gap-2 text-ehrdc-teal">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Questions</span>
              </TabsTrigger>
              <TabsTrigger value="builder" className="flex items-center gap-2 text-ehrdc-teal">
                <PenTool className="h-4 w-4" />
                <span className="hidden sm:inline">Builder</span>
              </TabsTrigger>
              <TabsTrigger value="mock" className="flex items-center gap-2 text-ehrdc-teal">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Mock</span>
              </TabsTrigger>
              <TabsTrigger value="types" className="flex items-center gap-2 text-ehrdc-teal">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Types</span>
              </TabsTrigger>
              <TabsTrigger value="cultural" className="flex items-center gap-2 text-ehrdc-teal">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Cultural</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center gap-2 text-ehrdc-teal">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Technical</span>
              </TabsTrigger>
              <TabsTrigger value="followup" className="flex items-center gap-2 text-ehrdc-teal">
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Follow-up</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="simulator">
              <InterviewSimulator />
            </TabsContent>
            
            <TabsContent value="questions">
              <QuestionLibrary />
            </TabsContent>
            
            <TabsContent value="builder">
              <AnswerBuilder />
            </TabsContent>
            
            <TabsContent value="mock">
              <MockInterviewScheduling />
            </TabsContent>
            
            <TabsContent value="types">
              <InterviewTypesGuide />
            </TabsContent>
            
            <TabsContent value="cultural">
              <CulturalIntelligence />
            </TabsContent>
            
            <TabsContent value="technical">
              <TechnicalAssessment />
            </TabsContent>
            
            <TabsContent value="followup">
              <PostInterviewActions />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPreparationPage;
