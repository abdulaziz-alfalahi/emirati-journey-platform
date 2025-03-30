
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { toast as sonnerToast } from 'sonner';

const ApiKeysPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [affindaApiKey, setAffindaApiKey] = useState('');
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
    sonnerToast.loading('Saving API keys...', {
      id: 'saving-api-keys',
      duration: 10000,
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('update-api-keys', {
        body: {
          affinda_api_key: affindaApiKey,
        },
      });
      
      // Dismiss loading toast
      sonnerToast.dismiss('saving-api-keys');
      
      if (error) {
        console.error('Error updating API keys:', error);
        sonnerToast.error('Failed to save API keys.');
        return;
      }
      
      sonnerToast.success('API keys saved successfully');
      
    } catch (error) {
      console.error('Error in handleSaveApiKeys:', error);
      
      // Dismiss loading toast
      sonnerToast.dismiss('saving-api-keys');
      
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
        <h1 className="text-3xl font-bold mb-6">API Keys</h1>
        <p className="mb-6 text-muted-foreground">
          Manage your API keys for integrating with various services.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Resume Parsing API Keys</CardTitle>
            <CardDescription>
              Configure API keys for resume parsing services.
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
                Used for advanced resume parsing. Get your API key from the{' '}
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
          <CardFooter>
            <Button 
              onClick={handleSaveApiKeys} 
              disabled={isSaving || !isLoaded}
            >
              {isSaving ? 'Saving...' : 'Save API Keys'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ApiKeysPage;
