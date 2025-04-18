
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrainingMaterialUpload } from '@/components/training/TrainingMaterialUpload';
import { TrainingMaterialsList } from '@/components/training/TrainingMaterialsList';
import { EmptyState } from '@/components/common/EmptyState';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Create a query client
const queryClient = new QueryClient();

const TrainingMaterialsPage = () => {
  const { user, roles } = useAuth();
  
  const isTrainingCenter = roles.includes('training_center');

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Training Materials</h1>
          <p className="text-muted-foreground mb-6">Access and manage training resources</p>
          
          {isTrainingCenter ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Training Center Controls</CardTitle>
                <CardDescription>
                  Manage training materials for your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upload">Upload Materials</TabsTrigger>
                    <TabsTrigger value="manage">Manage Materials</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload">
                    <TrainingMaterialUpload />
                  </TabsContent>
                  <TabsContent value="manage">
                    <TrainingMaterialsList isManagement={true} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            user ? (
              <TrainingMaterialsList isManagement={false} />
            ) : (
              <EmptyState 
                title="Authentication Required"
                description="Please sign in to access training materials."
              />
            )
          )}
        </div>
      </QueryClientProvider>
    </Layout>
  );
};

export default TrainingMaterialsPage;
