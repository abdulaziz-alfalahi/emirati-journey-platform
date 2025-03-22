
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, MapPin, Linkedin, FileKey } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ApiKeysState {
  mapbox_access_token: string;
  linkedin_client_id: string;
  linkedin_client_secret: string;
  uaepass_client_id: string;
  uaepass_client_secret: string;
}

interface ApiKeyDefinition {
  id: keyof ApiKeysState;
  name: string;
  description: string;
  icon: React.ElementType;
  isSecret?: boolean;
}

const apiKeyDefinitions: ApiKeyDefinition[] = [
  {
    id: 'mapbox_access_token',
    name: 'Mapbox Access Token',
    description: 'Used for maps and location functionality throughout the platform.',
    icon: MapPin
  },
  {
    id: 'linkedin_client_id',
    name: 'LinkedIn Client ID',
    description: 'Used for LinkedIn authentication and data import.',
    icon: Linkedin
  },
  {
    id: 'linkedin_client_secret',
    name: 'LinkedIn Client Secret',
    description: 'Used for LinkedIn authentication and data import.',
    icon: Linkedin,
    isSecret: true
  },
  {
    id: 'uaepass_client_id',
    name: 'UAEPass Client ID',
    description: 'Used for UAEPass authentication integration.',
    icon: FileKey
  },
  {
    id: 'uaepass_client_secret',
    name: 'UAEPass Client Secret',
    description: 'Used for UAEPass authentication integration.',
    icon: FileKey,
    isSecret: true
  }
];

const ApiKeysPage = () => {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeysState>({
    mapbox_access_token: '',
    linkedin_client_id: '',
    linkedin_client_secret: '',
    uaepass_client_id: '',
    uaepass_client_secret: '',
  });
  const [saveError, setSaveError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Check if user is an admin or super user
  const isAuthorized = roles.includes('administrator') || roles.includes('super_user');

  useEffect(() => {
    // Redirect if not authorized
    if (!isLoading && !isAuthorized) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
    
    // Fetch existing API keys if authorized
    if (isAuthorized) {
      fetchApiKeys();
    }
  }, [isLoading, isAuthorized, navigate]);

  const fetchApiKeys = async () => {
    try {
      setIsLoaded(false);
      const { data, error } = await supabase.functions.invoke('get-api-keys', {
        method: 'GET'
      });
      
      if (error) {
        console.error('Error fetching API keys:', error);
        toast({
          title: "Failed to load API keys",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      if (data) {
        // Populate the form with existing data
        const updatedKeys = { ...apiKeys };
        Object.keys(data).forEach(key => {
          const keyLower = key.toLowerCase();
          if (keyLower in updatedKeys) {
            updatedKeys[keyLower as keyof ApiKeysState] = data[key] || '';
          }
        });
        setApiKeys(updatedKeys);
        console.log("API keys loaded:", Object.keys(data).filter(k => data[k]));
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast({
        title: "Error loading API keys",
        description: "An unexpected error occurred while loading API keys.",
        variant: "destructive"
      });
    } finally {
      setIsLoaded(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const lowerName = name.toLowerCase() as keyof ApiKeysState;
    setApiKeys(prev => ({
      ...prev,
      [lowerName]: value
    }));
  };

  const saveApiKeys = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);
      setErrorDetails(null);
      
      const keysToSave = Object.fromEntries(
        Object.entries(apiKeys).filter(([_, value]) => value !== '')
      );
      
      console.log('Saving API keys:', Object.keys(keysToSave));
      
      const { data, error } = await supabase.functions.invoke('update-api-keys', {
        body: keysToSave
      });
      
      if (error) {
        console.error('Error saving API keys:', error);
        setSaveError(`Failed to save API keys: ${error.message}`);
        
        // Check if it's likely a server error without using the status property
        if (error.message.includes('Edge Function returned a non-2xx status code')) {
          setErrorDetails(`The server encountered an error. Please try again or contact the administrator.`);
        }
        
        toast({
          title: "Failed to save API keys",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "API keys updated",
        description: "API keys have been successfully saved to the database."
      });
      
      // Refresh the keys to confirm they were saved
      fetchApiKeys();
    } catch (error: any) {
      console.error('Error saving API keys:', error);
      setSaveError(`Failed to save API keys: ${error.message || 'Unknown error'}`);
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving API keys.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">API Keys Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage platform integration API keys
            </p>
          </div>
          <Shield className="h-12 w-12 text-emirati-teal" />
        </div>

        {!isAuthorized && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>
              You don't have permission to access this page. This page is only accessible to administrators and super users.
            </AlertDescription>
          </Alert>
        )}

        {isAuthorized && (
          <div className="space-y-8">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-amber-800">
              <p className="text-sm">
                <strong>Important:</strong> API keys are sensitive information. They are stored securely and are only available to administrators.
              </p>
            </div>

            {saveError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  {saveError}
                  {errorDetails && (
                    <div className="mt-2 text-sm opacity-80">
                      {errorDetails}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {!isLoaded ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emirati-teal mx-auto mb-4"></div>
                <p>Loading API keys...</p>
              </div>
            ) : (
              <>
                {apiKeyDefinitions.map((keyDef) => (
                  <Card key={keyDef.id}>
                    <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                      <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center">
                        <keyDef.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle>{keyDef.name}</CardTitle>
                        <CardDescription>{keyDef.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor={keyDef.id}>{keyDef.name}</Label>
                        <Input
                          id={keyDef.id}
                          name={keyDef.id}
                          type={keyDef.isSecret ? "password" : "text"}
                          placeholder={`Enter ${keyDef.name}...`}
                          value={apiKeys[keyDef.id]}
                          onChange={handleInputChange}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-end">
                  <Button 
                    onClick={saveApiKeys} 
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save API Keys'}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ApiKeysPage;
