
import React from 'react';
import { Toaster } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { CVProvider } from '@/context/CVContext';
import PersonalInfoForm from '@/components/cv-builder/PersonalInfoForm';
import SummaryForm from '@/components/cv-builder/SummaryForm';
import ExperienceForm from '@/components/cv-builder/ExperienceForm';
import EducationForm from '@/components/cv-builder/EducationForm';
import SkillsLanguagesForm from '@/components/cv-builder/SkillsLanguagesForm';
import CVUploader from '@/components/cv-builder/CVUploader';
import CVPreview from '@/components/cv-builder/CVPreview';

const CVBuilderPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">CV Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CVProvider>
              <Card>
                <CardContent className="p-6">
                  <CVUploader className="mb-6" />
                  
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="skills">Skills & Languages</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="mt-0">
                      <PersonalInfoForm />
                    </TabsContent>
                    
                    <TabsContent value="summary" className="mt-0">
                      <SummaryForm />
                    </TabsContent>
                    
                    <TabsContent value="experience" className="mt-0">
                      <ExperienceForm />
                    </TabsContent>
                    
                    <TabsContent value="education" className="mt-0">
                      <EducationForm />
                    </TabsContent>
                    
                    <TabsContent value="skills" className="mt-0">
                      <SkillsLanguagesForm />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </CVProvider>
          </div>
          
          <div className="lg:col-span-1">
            <CVPreview />
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default CVBuilderPage;
