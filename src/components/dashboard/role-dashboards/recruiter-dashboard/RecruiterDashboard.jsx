
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Briefcase, Users, Video } from 'lucide-react';
import OverviewTab from './tabs/OverviewTab';
import JobsTab from './tabs/JobsTab';
import CandidatesTab from './tabs/CandidatesTab';
import InterviewsTab from './tabs/InterviewsTab';

interface RecruiterDashboardProps {
  activeTab: string;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="jobs"><Briefcase className="h-4 w-4 mr-2" /> Jobs</TabsTrigger>
      <TabsTrigger value="candidates"><Users className="h-4 w-4 mr-2" /> Candidates</TabsTrigger>
      <TabsTrigger value="interviews"><Video className="h-4 w-4 mr-2" /> Interviews</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <OverviewTab />
    </TabsContent>
    
    <TabsContent value="jobs" className="space-y-8">
      <JobsTab />
    </TabsContent>
    
    <TabsContent value="candidates" className="space-y-8">
      <CandidatesTab />
    </TabsContent>
    
    <TabsContent value="interviews" className="space-y-8">
      <InterviewsTab />
    </TabsContent>
  </Tabs>
);

export default RecruiterDashboard;
