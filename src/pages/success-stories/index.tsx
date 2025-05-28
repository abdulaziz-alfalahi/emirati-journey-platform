
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Users, FileText, Eye } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SuccessStoriesShowcase from '@/components/success-stories/SuccessStoriesShowcase';
import StorySubmissionForm from '@/components/success-stories/StorySubmissionForm';
import EditorialReviewDashboard from '@/components/success-stories/EditorialReviewDashboard';
import { useAuth } from '@/context/AuthContext';

const SuccessStoriesPage: React.FC = () => {
  const { roles } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');
  
  const isAdmin = roles.includes('administrator');
  const isEditor = roles.includes('administrator') || isAdmin;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="browse" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Browse Stories</span>
              </TabsTrigger>
              <TabsTrigger value="submit" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Share Your Story</span>
              </TabsTrigger>
              {isEditor && (
                <TabsTrigger value="review" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Editorial Review</span>
                </TabsTrigger>
              )}
            </TabsList>
            
            {activeTab === 'browse' && (
              <Button onClick={() => setActiveTab('submit')} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Share Your Story</span>
              </Button>
            )}
          </div>

          <TabsContent value="browse">
            <SuccessStoriesShowcase />
          </TabsContent>

          <TabsContent value="submit">
            <StorySubmissionForm 
              onSubmissionComplete={() => setActiveTab('browse')}
            />
          </TabsContent>

          {isEditor && (
            <TabsContent value="review">
              <EditorialReviewDashboard />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default SuccessStoriesPage;
