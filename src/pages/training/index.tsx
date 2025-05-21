
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TrainingOpportunities from '@/components/home/TrainingOpportunities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, Briefcase } from 'lucide-react';

const TrainingPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Training Opportunities</h1>
        <p className="text-muted-foreground mb-6">Discover personalized training programs to enhance your skills</p>
        
        <Tabs defaultValue="recommended" className="space-y-8">
          <TabsList>
            <TabsTrigger value="recommended">
              <GraduationCap className="h-4 w-4 mr-2" />
              Recommended
            </TabsTrigger>
            <TabsTrigger value="all">
              <BookOpen className="h-4 w-4 mr-2" />
              All Programs
            </TabsTrigger>
            <TabsTrigger value="enrolled">
              <Briefcase className="h-4 w-4 mr-2" />
              Enrolled
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended" className="space-y-6">
            <TrainingOpportunities limit={6} />
          </TabsContent>
          
          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Training Programs</CardTitle>
                <CardDescription>Browse all available training opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">All training programs will be listed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enrolled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Enrolled Programs</CardTitle>
                <CardDescription>Training programs you are currently enrolled in</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You are not currently enrolled in any training programs.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TrainingPage;
