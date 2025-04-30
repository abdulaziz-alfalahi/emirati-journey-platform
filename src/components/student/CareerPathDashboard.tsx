
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CareerPathSelector from './CareerPathSelector';
import UserCareerPaths from './UserCareerPaths';

const CareerPathDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-paths');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Career Pathways</h2>
      <p className="text-muted-foreground">
        Explore career paths or track your progress on your chosen career journey.
      </p>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-paths">My Career Paths</TabsTrigger>
          <TabsTrigger value="explore">Explore Career Paths</TabsTrigger>
        </TabsList>
        <TabsContent value="my-paths" className="pt-4">
          <UserCareerPaths />
        </TabsContent>
        <TabsContent value="explore" className="pt-4">
          <CareerPathSelector />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerPathDashboard;
