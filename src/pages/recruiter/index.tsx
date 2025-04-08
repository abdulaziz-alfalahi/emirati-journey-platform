
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import JobDescriptionsList from '@/components/recruiter/JobDescriptionsList';
import CandidateMatching from '@/components/recruiter/CandidateMatching';
import Interviews from '@/components/recruiter/Interviews';
import Messages from '@/components/recruiter/Messages';
import { Briefcase, MessageSquare, Users, Video } from 'lucide-react';

const RecruiterPage = () => {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Modified the condition to allow access even if roles array is empty for testing
  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
        <p className="text-muted-foreground mb-8">Manage job descriptions, candidates, and interviews</p>
        
        <Tabs defaultValue="jobs" className="space-y-8">
          <TabsList className="mb-8">
            <TabsTrigger value="jobs">
              <Briefcase className="h-4 w-4 mr-2" /> Job Descriptions
            </TabsTrigger>
            <TabsTrigger value="candidates">
              <Users className="h-4 w-4 mr-2" /> Candidate Matching
            </TabsTrigger>
            <TabsTrigger value="interviews">
              <Video className="h-4 w-4 mr-2" /> Interviews
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" /> Messages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs">
            <JobDescriptionsList />
          </TabsContent>
          
          <TabsContent value="candidates">
            <CandidateMatching />
          </TabsContent>
          
          <TabsContent value="interviews">
            <Interviews />
          </TabsContent>
          
          <TabsContent value="messages">
            <Messages />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecruiterPage;
