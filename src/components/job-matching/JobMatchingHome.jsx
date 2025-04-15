import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobExplorer from './JobExplorer';
export function JobMatchingHome() {
  return <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Career Exploration</h1>
      
      <Tabs defaultValue="explore" className="space-y-6">
        
        
        <TabsContent value="explore" className="space-y-6">
          <JobExplorer />
        </TabsContent>
      </Tabs>
    </div>;
}