
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Assessment } from '@/types/training-center';
import AssessmentsTab from './training-center/AssessmentsTab';
import ProgramsTab from './training-center/ProgramsTab';
import TraineesTab from './training-center/TraineesTab';
import OverviewTab from './training-center/OverviewTab';

interface TrainingCenterDashboardProps {
  activeTab?: string;
}

const TrainingCenterDashboard: React.FC<TrainingCenterDashboardProps> = ({ activeTab = 'overview' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Sample data for demonstration purposes
  const [samplePrograms, setSamplePrograms] = useState([
    {
      id: 1,
      title: 'Advanced Leadership Development',
      trainees: 48,
      startDate: '2025-04-15',
      status: 'In Progress',
      description: 'A comprehensive program designed to develop leadership skills in mid-career professionals.'
    },
    {
      id: 2,
      title: 'Technical Skills Bootcamp',
      trainees: 35,
      startDate: '2025-05-01',
      status: 'Scheduled',
      description: 'Intensive training focusing on essential technical skills for the modern workplace.'
    },
    {
      id: 3,
      title: 'Professional Certification Program',
      trainees: 22,
      startDate: '2025-03-10',
      status: 'Completed',
      description: 'Prepare participants for industry-recognized professional certifications.'
    }
  ]);

  const sampleAssessments = [
    {
      id: 1,
      title: 'Leadership Capability Assessment',
      candidates: 64,
      date: '2025-04-20',
      type: 'capabilities'
    },
    {
      id: 2,
      title: 'Technical Competency Evaluation',
      candidates: 48,
      date: '2025-04-25',
      type: 'skills'
    },
    {
      id: 3,
      title: 'Behavioral Assessment',
      candidates: 37,
      date: '2025-05-05',
      type: 'behaviors'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Training Center Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your training programs, assessments, and certifications
          </p>
        </div>
      </div>

      <Tabs defaultValue={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="trainees">Trainees</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab programs={samplePrograms} assessments={sampleAssessments} />
        </TabsContent>
        
        <TabsContent value="programs" className="space-y-4">
          <ProgramsTab programs={samplePrograms} setPrograms={setSamplePrograms} />
        </TabsContent>
        
        <TabsContent value="assessments" className="space-y-4">
          <AssessmentsTab />
        </TabsContent>
        
        <TabsContent value="trainees" className="space-y-4">
          <TraineesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingCenterDashboard;
