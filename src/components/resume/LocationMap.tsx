
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { debounce } from 'lodash';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LocationData {
  address: string;
  coordinates: [number, number];
  formattedAddress: string;
}

interface LocationMapProps {
  initialLocation?: string;
  onLocationSelect: (location: LocationData) => void;
  height?: string;
  persistentCircle?: boolean;
}

const LocationMap: React.FC<LocationMapProps> = ({
  initialLocation = '',
  onLocationSelect,
  height = '400px',
  persistentCircle = false
}) => {
  // Create refs to store instances that should persist across renders
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const circleRef = useRef<mapboxgl.GeoJSONSource | null>(null);
  const circleLayerAddedRef = useRef<boolean>(false);
  
  // Store the last valid location to prevent resets
  const lastValidLocationRef = useRef<{
    lng: number;
    lat: number;
    zoom: number;
  } | null>(null);
  
  // Track if map has been initialized
  const mapInitializedRef = useRef<boolean>(false);
  
  // Store selected location
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  
  // Keep track of when map style is loaded
  const [mapStyleLoaded, setMapStyleLoaded] = useState(false);
  
  // Flag to prevent rendering the map more than once
  const renderingMapRef = useRef(false);

  // Add a state for custom Mapbox token input
  const [customMapboxToken, setCustomMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(false);
  const [tokenRetryCount, setTokenRetryCount] = useState<number>(0);
  const tokenRetryCountRef = useRef<number>(0);

  // Fetch Mapbox API key with retry logic
  const { data: apiKeys, isLoading: isLoadingApiKeys, error: apiKeysError, refetch } = useQuery({
    queryKey: ['mapbox-api-key', tokenRetryCount],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-api-keys', {
          method: 'POST'
        });
        
        if (error) {
          console.error("Error fetching API keys:", error);
          throw error;
        }
        
        console.log("API keys retrieved:", Object.keys(data));
        
        // Check if Mapbox token exists
        if (!data || (!data.mapbox_access_token && !data.MAPBOX_ACCESS_TOKEN)) {
          console.error("No Mapbox token found in API keys");
          
          // Try to fetch with GET instead
          const getResponse = await supabase.functions.invoke('get-api-keys', {
            method: 'GET'
          });
          
          if (getResponse.error || !getResponse.data || 
              (!getResponse.data.mapbox_access_token && !getResponse.data.MAPBOX_ACCESS_TOKEN)) {
            console.error("No Mapbox token found in API keys (GET fallback)");
            throw new Error("Mapbox token not found");
          }
          
          return getResponse.data;
        }
        
        return data;
      } catch (error) {
        console.error("Error fetching API keys:", error);
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
      console.log("Showing token input due to missing API key");
      setShowTokenInput(true);
    } else if (apiKeys && (apiKeys.mapbox_access_token || apiKeys.MAPBOX_ACCESS_TOKEN)) {
      console.log("Hiding token input as API key is available");
      setShowTokenInput(false);
      
      // If we have a token and the map isn't initialized, retry initialization
      if (!mapInitializedRef.current && !renderingMapRef.current) {
        console.log("Map not initialized, triggering re-render");
        renderingMapRef.current = false;
        setMapStyleLoaded(false);
      }
    }
  }, [apiKeys, apiKeysError]);

  // Handle token submission
  const handleTokenSubmit = () => {
    if (!customMapboxToken.trim()) {
      toast.error("Please enter a valid Mapbox token");
      return;
    }
    
    // Save token to localStorage for persistence
    localStorage.setItem('mapbox_custom_token', customMapboxToken);
    
    // Reset the map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    
    mapInitializedRef.current = false;
    renderingMapRef.current = false;
    circleLayerAddedRef.current = false;
    
    toast.success("Mapbox token applied");
    
    // Force a re-render to initialize the map with the new token
    setMapStyleLoaded(false);
  };

  // Effect to retry fetching API keys if the first attempt failed
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_custom_token');
    
    if (savedToken) {
      setCustomMapboxToken(savedToken);
      console.log("Loaded token from localStorage");
    }
    
    const retryTimer = setTimeout(() => {
      // If we failed to get the API key initially, try again after a short delay
      if (apiKeysError && tokenRetryCountRef.current < 3) {
        console.log(`Retrying API key fetch (attempt ${tokenRetryCountRef.current + 1})`);
        tokenRetryCountRef.current += 1;
        setTokenRetryCount(prev => prev + 1);
        refetch();
      }
    }, 2000);
    
    return () => clearTimeout(retryTimer);
  }, [apiKeysError, refetch]);

  // Parse initial location string
  const parseInitialLocation = useCallback((locationStr: string) => {
    console.log('Parsing initial location:', locationStr);
    
    try {
      // Try to parse as JSON first
      const parsedLocation = JSON.parse(locationStr);
      if (parsedLocation.longitude && parsedLocation.latitude) {
        return {
          lng: parsedLocation.longitude,
          lat: parsedLocation.latitude,
          name: parsedLocation.name || ''
        };
      }
    } catch (e) {
      // Not JSON, continue
    }
    
    // Default to Dubai if no valid location
    return { lng: 55.2708, lat: 25.2048, name: locationStr || 'Dubai, UAE' };
  }, []);
  
  // Function to add or update the privacy circle
  const updatePrivacyCircle = useCallback((lng: number, lat: number) => {
    console.log('Updating privacy circle at:', lng, lat);
    
    if (!mapRef.current) return;
    
    const map = mapRef.current;
    
    // Create a GeoJSON source for the circle if it doesn't exist
    if (!circleLayerAddedRef.current) {
      // Add the source for the circle
      map.addSource('privacy-circle', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          properties: {}
        }
      });
      
      // Add the circle layer
      map.addLayer({
        id: 'privacy-circle-layer',
        type: 'circle',
        source: 'privacy-circle',
        paint: {
          'circle-radius': 1000, // radius in meters
          'circle-color': 'rgba(255, 0, 0, 0.2)',
          'circle-stroke-width': 2,
          'circle-stroke-color': 'rgba(255, 0, 0, 0.7)'
        }
      });
      
      circleLayerAddedRef.current = true;
      circleRef.current = map.getSource('privacy-circle') as mapboxgl.GeoJSONSource;
    } else if (circleRef.current) {
      // Update the existing circle
      circleRef.current.setData({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: {}
      });
    }
  }, []);
  
  // Create a debounced geocode function
  const geocodeLocation = useCallback(debounce(async (lng: number, lat: number) => {
    try {
      // Get the token from various sources
      const token = 
        apiKeys?.mapbox_access_token || 
        apiKeys?.MAPBOX_ACCESS_TOKEN || 
        localStorage.getItem('mapbox_custom_token') || 
        customMapboxToken;
      
      if (!token) {
        console.error('No Mapbox token available for geocoding');
        return;
      }
      
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const placeName = data.features[0].place_name;
        console.log('Geocoded address:', placeName);
        
        const newLocation: LocationData = {
          address: placeName,
          coordinates: [lng, lat],
          formattedAddress: placeName
        };
        
        setSelectedLocation(newLocation);
        onLocationSelect(newLocation);
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
    }
  }, 300), [apiKeys, onLocationSelect, customMapboxToken]);
  
  // Initialize the map when the component mounts
  useEffect(() => {
    // Skip if map is already being rendered
    if (renderingMapRef.current || !mapContainerRef.current) {
      return;
    }
    
    console.log('Initializing map - token available:', !!apiKeys?.mapbox_access_token || !!apiKeys?.MAPBOX_ACCESS_TOKEN || !!localStorage.getItem('mapbox_custom_token'));
    renderingMapRef.current = true;
    
    // Get token from various sources
    const accessToken = 
      apiKeys?.mapbox_access_token || 
      apiKeys?.MAPBOX_ACCESS_TOKEN || 
      localStorage.getItem('mapbox_custom_token') || 
      customMapboxToken;
    
    if (!accessToken) {
      console.error('Mapbox access token not found');
      renderingMapRef.current = false;
      setShowTokenInput(true);
      return;
    }
    
    try {
      mapboxgl.accessToken = accessToken;
      
      // Parse initial location
      const initialLocationData = parseInitialLocation(initialLocation);
      lastValidLocationRef.current = {
        lng: initialLocationData.lng,
        lat: initialLocationData.lat,
        zoom: 12
      };
      
      // Create the map
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLocationData.lng, initialLocationData.lat],
        zoom: 12
      });
      
      // Save map instance in ref
      mapRef.current = map;
      
      // Handle style load
      map.on('style.load', () => {
        console.log('Map style loaded');
        setMapStyleLoaded(true);
        
        // Add initial marker and circle
        if (lastValidLocationRef.current) {
          const { lng, lat } = lastValidLocationRef.current;
          
          // Add marker
          if (markerRef.current) {
            markerRef.current.remove();
          }
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
          
          // Add privacy circle
          updatePrivacyCircle(lng, lat);
          
          // Geocode the initial location
          geocodeLocation(lng, lat);
        }
        
        mapInitializedRef.current = true;
      });
      
      // Add click handler
      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        console.log('Map clicked at:', lng, lat);
        
        // Update last valid location
        lastValidLocationRef.current = {
          lng,
          lat,
          zoom: map.getZoom()
        };
        
        // Update marker
        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
        }
        
        // Update circle
        updatePrivacyCircle(lng, lat);
        
        // Geocode the location
        geocodeLocation(lng, lat);
      });
      
      // Handle map movement end - ensure we keep our state in sync
      map.on('moveend', () => {
        const center = map.getCenter();
        const zoom = map.getZoom();
        
        // Only update if moved by user (not programmatically)
        if (lastValidLocationRef.current && 
            (Math.abs(center.lng - lastValidLocationRef.current.lng) > 0.001 || 
             Math.abs(center.lat - lastValidLocationRef.current.lat) > 0.001)) {
          lastValidLocationRef.current = {
            lng: center.lng,
            lat: center.lat,
            zoom
          };
        }
      });
      
      // Handle map idle (for operations after map has settled)
      map.on('idle', () => {
        // Ensure the circle is visible after the map has settled
        if (persistentCircle && lastValidLocationRef.current && circleLayerAddedRef.current) {
          const { lng, lat } = lastValidLocationRef.current;
          updatePrivacyCircle(lng, lat);
        }
      });
      
      // Handle errors
      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        
        // If we get an API key error, show the token input
        if (e.error && e.error.message && e.error.message.includes('API key')) {
          setShowTokenInput(true);
        }
      });
      
      // Cleanup function
      return () => {
        if (mapRef.current) {
          console.log('Removing map');
          mapRef.current.remove();
          mapRef.current = null;
          circleLayerAddedRef.current = false;
          markerRef.current = null;
          mapInitializedRef.current = false;
        }
        renderingMapRef.current = false;
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      renderingMapRef.current = false;
      setShowTokenInput(true);
      return;
    }
  }, [apiKeys, isLoadingApiKeys, initialLocation, parseInitialLocation, updatePrivacyCircle, geocodeLocation, persistentCircle, customMapboxToken]);
  
  // Update map when initialLocation changes and map is already initialized
  useEffect(() => {
    if (!mapRef.current || !mapStyleLoaded || !initialLocation) return;
    
    console.log('Initial location changed, updating map:', initialLocation);
    
    const locationData = parseInitialLocation(initialLocation);
    const map = mapRef.current;
    
    // Update map center
    map.flyTo({
      center: [locationData.lng, locationData.lat],
      zoom: 12,
      essential: true
    });
    
    // Update last valid location
    lastValidLocationRef.current = {
      lng: locationData.lng,
      lat: locationData.lat,
      zoom: 12
    };
    
    // Update or add marker
    if (markerRef.current) {
      markerRef.current.setLngLat([locationData.lng, locationData.lat]);
    } else {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([locationData.lng, locationData.lat])
        .addTo(map);
    }
    
    // Update privacy circle
    updatePrivacyCircle(locationData.lng, locationData.lat);
    
    // Update selected location
    const newLocation: LocationData = {
      address: locationData.name,
      coordinates: [locationData.lng, locationData.lat],
      formattedAddress: locationData.name
    };
    
    setSelectedLocation(newLocation);
    
  }, [initialLocation, mapStyleLoaded, parseInitialLocation, updatePrivacyCircle]);
  
  // If persistent circle is turned on, keep checking that the circle is visible
  useEffect(() => {
    if (!persistentCircle || !mapRef.current || !circleLayerAddedRef.current || !lastValidLocationRef.current) return;
    
    // Force update the circle periodically
    const interval = setInterval(() => {
      if (mapRef.current && lastValidLocationRef.current) {
        const { lng, lat } = lastValidLocationRef.current;
        updatePrivacyCircle(lng, lat);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [persistentCircle, updatePrivacyCircle]);

  return (
    <div>
      {showTokenInput ? (
        <div className="mb-4 p-4 border border-orange-300 bg-orange-50 rounded-md">
          <p className="text-sm text-orange-800 mb-2">
            Mapbox access token is required to display the map. Please enter your Mapbox public token below.
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              value={customMapboxToken}
              onChange={(e) => setCustomMapboxToken(e.target.value)}
              placeholder="Enter your Mapbox public token"
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit} size="sm">
              Apply Token
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            You can get a Mapbox token by creating an account at{" "}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              mapbox.com
            </a>
            . Find your public token in the Account {'>'} Access tokens section.
          </p>
        </div>
      ) : null}
      
      <div 
        ref={mapContainerRef} 
        className="rounded-md overflow-hidden border border-gray-300" 
        style={{ height, width: '100%' }}
      />
      
      {isLoadingApiKeys && !showTokenInput && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
