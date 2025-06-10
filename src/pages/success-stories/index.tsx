
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Users, FileText, Eye, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SuccessStoriesShowcase from '@/components/success-stories/SuccessStoriesShowcase';
import StorySubmissionForm from '@/components/success-stories/StorySubmissionForm';
import { useAuth } from '@/context/AuthContext';

const SuccessStoriesPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Star className="h-8 w-8 text-yellow-500" />
            Emirati Journeys: Stories of Triumph
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover inspiring success stories from Emiratis across various fields and life stages. 
            Share your own journey to inspire others and celebrate the achievements that make our nation proud.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="browse" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Explore Stories</span>
              </TabsTrigger>
              <TabsTrigger value="submit" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Share Your Story</span>
              </TabsTrigger>
              {user && (
                <TabsTrigger value="my-submissions" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>My Submissions</span>
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
              onSubmissionComplete={() => setActiveTab('my-submissions')}
            />
          </TabsContent>

          {user && (
            <TabsContent value="my-submissions">
              <SuccessStoriesShowcase showOnlyUserStories={true} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default SuccessStoriesPage;
