
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { toast as sonnerToast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Video } from 'lucide-react';

const ApiKeysPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [affindaApiKey, setAffindaApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [mapboxApiKey, setMapboxApiKey] = useState('');
  const [hirevueApiKey, setHirevueApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch existing API keys on component mount
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchApiKeys();
    }
  }, [user, isLoading, navigate]);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-api-keys');
      
      if (error) {
        console.error('Error fetching API keys:', error);
        toast({
          title: 'Error',
          description: 'Failed to load API keys.',
          variant: 'destructive',
        });
        return;
      }
      
      if (data) {
        // Set the API key values if they exist
        setAffindaApiKey(
          data.affinda_api_key || 
          data.affindaApiKey || 
          data.AFFINDA_API_KEY || 
          ''
        );
        
        setOpenaiApiKey(
          data.openai_api_key ||
          data.openaiApiKey ||
          data.OPENAI_API_KEY ||
          ''
        );
        
        setMapboxApiKey(
          data.mapbox_access_token ||
          data.mapboxAccessToken ||
          data.MAPBOX_ACCESS_TOKEN ||
          ''
        );
        
        setHirevueApiKey(
          data.hirevue_api_key ||
          data.hirevueApiKey ||
          data.HIREVUE_API_KEY ||
          ''
        );
      }
      
      setIsLoaded(true);
    } catch (error) {
      console.error('Error in fetchApiKeys:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while loading API keys.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveApiKeys = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    // Show loading toast
    const loadingToastId = 'saving-api-keys';
    sonnerToast.loading('Saving API keys...', {
      id: loadingToastId,
      duration: 10000,
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('update-api-keys', {
        body: {
          affinda_api_key: affindaApiKey,
          openai_api_key: openaiApiKey,
          mapbox_access_token: mapboxApiKey,
          hirevue_api_key: hirevueApiKey,
        },
      });
      
      // Dismiss loading toast
      sonnerToast.dismiss(loadingToastId);
      
      if (error) {
        console.error('Error updating API keys:', error);
        sonnerToast.error('Failed to save API keys.');
        return;
      }
      
      sonnerToast.success('API keys saved successfully');
      
    } catch (error) {
      console.error('Error in handleSaveApiKeys:', error);
      
      // Dismiss loading toast
      sonnerToast.dismiss(loadingToastId);
      
      sonnerToast.error('An unexpected error occurred while saving API keys.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex items-center gap-2 mb-6">
          <Key className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">API Keys</h1>
        </div>
        <p className="mb-6 text-muted-foreground">
          Manage your API keys for integrating with various services. These keys are stored securely in your database.
        </p>
        
        <Tabs defaultValue="resume" className="space-y-4">
          <TabsList>
            <TabsTrigger value="resume">Resume & Job Processing</TabsTrigger>
            <TabsTrigger value="ai">AI Matching</TabsTrigger>
            <TabsTrigger value="maps">Location & Commute</TabsTrigger>
            <TabsTrigger value="videoconf">Video Conferencing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resume" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resume & Job Processing API Keys</CardTitle>
                <CardDescription>
                  Configure API keys for resume parsing and job description processing services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="affinda-api-key">Affinda API Key</Label>
                  <Input
                    id="affinda-api-key"
                    type="password"
                    value={affindaApiKey}
                    onChange={(e) => setAffindaApiKey(e.target.value)}
                    placeholder="Enter your Affinda API key"
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for advanced resume parsing and job description processing. Get your API key from the{' '}
                    <a 
                      href="https://api.affinda.com/docs" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Affinda dashboard
                    </a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Matching Services</CardTitle>
                <CardDescription>
                  Configure API keys for AI-powered candidate and job matching services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-api-key">OpenAI API Key</Label>
                  <Input
                    id="openai-api-key"
                    type="password"
                    value={openaiApiKey}
                    onChange={(e) => setOpenaiApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API key"
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for AI-powered candidate and job matching. Get your API key from the{' '}
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      OpenAI dashboard
                    </a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="maps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location & Commute Services</CardTitle>
                <CardDescription>
                  Configure API keys for mapping and commute calculation services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mapbox-api-key">Mapbox Access Token</Label>
                  <Input
                    id="mapbox-api-key"
                    type="password"
                    value={mapboxApiKey}
                    onChange={(e) => setMapboxApiKey(e.target.value)}
                    placeholder="Enter your Mapbox access token"
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for displaying maps, selecting candidate residence areas, job locations, and calculating commute times. Get your access token from the{' '}
                    <a 
                      href="https://account.mapbox.com/access-tokens/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mapbox dashboard
                    </a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videoconf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Video Conferencing Services</CardTitle>
                <CardDescription>
                  Configure API keys for video conferencing and remote interviews.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hirevue-api-key">HireVue API Key</Label>
                  <Input
                    id="hirevue-api-key"
                    type="password"
                    value={hirevueApiKey}
                    onChange={(e) => setHirevueApiKey(e.target.value)}
                    placeholder="Enter your HireVue API key"
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for video interviewing, candidate assessments, and scheduling virtual career advisory sessions. Get your API key from the{' '}
                    <a 
                      href="https://www.hirevue.com/platform/developer" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      HireVue Developer Portal
                    </a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Button 
            onClick={handleSaveApiKeys} 
            disabled={isSaving || !isLoaded}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isSaving ? 'Saving...' : 'Save All API Keys'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ApiKeysPage;
