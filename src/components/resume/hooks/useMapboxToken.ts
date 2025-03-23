
import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useMapboxToken = () => {
  const [customMapboxToken, setCustomMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(false);
  const [tokenRetryCount, setTokenRetryCount] = useState<number>(0);
  const tokenRetryCountRef = useRef<number>(0);

  // Fetch Mapbox API key with retry logic
  const { 
    data: apiKeys, 
    isLoading: isLoadingApiKeys, 
    error: apiKeysError
  } = useQuery({
    queryKey: ['mapbox-api-key', tokenRetryCount],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-api-keys', {
          method: 'POST'
        });
        
        if (error) {
          throw error;
        }
        
        // Check if Mapbox token exists
        if (!data || (!data.mapbox_access_token && !data.MAPBOX_ACCESS_TOKEN)) {
          // Try with GET instead
          const getResponse = await supabase.functions.invoke('get-api-keys', {
            method: 'GET'
          });
          
          if (getResponse.error || !getResponse.data || 
              (!getResponse.data.mapbox_access_token && !getResponse.data.MAPBOX_ACCESS_TOKEN)) {
            throw new Error("Mapbox token not found");
          }
          
          return getResponse.data;
        }
        
        return data;
      } catch (error) {
        setShowTokenInput(true);
        return null;
      }
    },
    retry: 2,
    retryDelay: 1000,
  });

  // Effect to check if we need to show token input
  useEffect(() => {
    if (apiKeysError || (apiKeys && !apiKeys.mapbox_access_token && !apiKeys.MAPBOX_ACCESS_TOKEN)) {
      setShowTokenInput(true);
    } else if (apiKeys && (apiKeys.mapbox_access_token || apiKeys.MAPBOX_ACCESS_TOKEN)) {
      setShowTokenInput(false);
    }
  }, [apiKeys, apiKeysError]);

  // Effect to load a saved token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_custom_token');
    
    if (savedToken) {
      setCustomMapboxToken(savedToken);
    }
  }, []);

  // Handle token submission
  const handleTokenSubmit = useCallback(() => {
    if (!customMapboxToken.trim()) {
      toast.error("Please enter a valid Mapbox token");
      return false;
    }
    
    // Save token to localStorage for persistence
    localStorage.setItem('mapbox_custom_token', customMapboxToken);
    toast.success("Mapbox token applied");
    
    // Force a re-render to initialize the map with the new token
    return true;
  }, [customMapboxToken]);

  // Get the effective token from available sources
  const getEffectiveToken = useCallback(() => {
    return apiKeys?.mapbox_access_token || 
      apiKeys?.MAPBOX_ACCESS_TOKEN || 
      localStorage.getItem('mapbox_custom_token') || 
      customMapboxToken;
  }, [apiKeys, customMapboxToken]);

  return {
    customMapboxToken,
    setCustomMapboxToken,
    showTokenInput,
    setShowTokenInput,
    isLoadingApiKeys,
    handleTokenSubmit,
    getEffectiveToken
  };
};
