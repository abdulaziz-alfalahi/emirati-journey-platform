
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LocationMapProps {
  initialLocation?: string;
  onLocationSelect: (locationData: { 
    address: string; 
    coordinates: [number, number]; 
    formattedAddress: string;
  }) => void;
  value?: string; // Keep compatibility with old implementation
  onChange?: (location: string) => void; // Keep compatibility with old implementation
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  initialLocation, 
  onLocationSelect,
  value, // For backward compatibility
  onChange // For backward compatibility
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const circleRadius = 250; // 500 meter diameter (radius = 250)
  const privacyCircleId = 'privacy-circle';
  const privacyCircleSourceId = 'privacy-circle-source';
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const geocoder = useRef<MapboxGeocoder | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [customToken, setCustomToken] = useState<string>('');
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const [tokenFetchAttempted, setTokenFetchAttempted] = useState<boolean>(false);
  const [circleAdded, setCircleAdded] = useState<boolean>(false);

  // Function to fetch Mapbox token from Supabase edge function
  const fetchMapboxToken = useCallback(async () => {
    if (tokenFetchAttempted) return; // Prevent multiple fetch attempts
    setTokenFetchAttempted(true);
    setIsTokenLoading(true);
    
    try {
      // First try to get the token from localStorage
      const localToken = localStorage.getItem('MAPBOX_ACCESS_TOKEN');
      
      // If there's a token in localStorage, use it
      if (localToken) {
        console.log('Using Mapbox token from localStorage');
        setMapboxToken(localToken);
        setIsTokenLoading(false);
        return;
      }
      
      // Try to get the token from the edge function
      if (user) {
        console.log('Fetching Mapbox token from edge function as authenticated user');
        const { data, error } = await supabase.functions.invoke('get-api-keys');
        
        if (error) {
          console.error('Error fetching API keys:', error);
          throw error;
        }
        
        if (data) {
          console.log('API keys received:', Object.keys(data));
          
          // Check for any valid mapbox token (case-insensitive)
          const mapboxKeyNames = [
            'MAPBOX_ACCESS_TOKEN', 
            'mapbox_access_token',
            'mapboxAccessToken',
            'mapbox-access-token'
          ];
          
          for (const keyName of mapboxKeyNames) {
            if (data[keyName]) {
              console.log(`Found Mapbox token with key: ${keyName}`);
              setMapboxToken(data[keyName]);
              localStorage.setItem('MAPBOX_ACCESS_TOKEN', data[keyName]);
              setIsTokenLoading(false);
              return;
            }
          }
          
          // If no specific key is found, check ALL keys to see if any might be the Mapbox token
          for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string' && 
                (key.toLowerCase().includes('mapbox') || 
                 key.toLowerCase().includes('map'))) {
              console.log(`Found potential Mapbox token with key: ${key}`);
              setMapboxToken(value);
              localStorage.setItem('MAPBOX_ACCESS_TOKEN', value);
              setIsTokenLoading(false);
              return;
            }
          }
          
          console.log('No Mapbox token found in API keys. Available keys:', Object.keys(data));
        } else {
          console.log('No data returned from API keys endpoint');
        }
      } else {
        console.log('User not authenticated, skipping API key fetch');
      }
      
      // If no token is found, show an error
      setTokenError('No Mapbox token available. Please enter one below or contact an administrator.');
    } catch (error) {
      console.error('Error fetching Mapbox token:', error);
      setTokenError('Failed to fetch Mapbox token. Please enter one below or contact an administrator.');
    } finally {
      setIsTokenLoading(false);
    }
  }, [user, tokenFetchAttempted]);

  useEffect(() => {
    fetchMapboxToken();
  }, [fetchMapboxToken]);
  
  // Function to format the address for privacy by removing specific details
  const formatAddressForPrivacy = (features: any[]) => {
    if (!features || features.length === 0) return 'Custom Location';
    
    // Try to find neighborhood or district first
    const neighborhood = features.find(f => 
      f.place_type.includes('neighborhood') || 
      f.place_type.includes('district')
    );
    
    if (neighborhood) return neighborhood.place_name;
    
    // Fall back to place (city)
    const place = features.find(f => f.place_type.includes('place'));
    if (place) return place.place_name;
    
    // Last resort, use the first feature but try to extract just the area name
    const firstFeature = features[0];
    
    // If we have a full address, try to extract just the area parts
    if (firstFeature.context && firstFeature.context.length > 0) {
      // Skip the first part (street address) and start with neighborhood/district
      const contextParts = firstFeature.context.map((c: any) => c.text);
      return contextParts.join(', ');
    }
    
    // If all else fails, return the full place name
    return firstFeature.place_name || 'Custom Location';
  };
  
  // Function to update privacy circle on the map
  const updatePrivacyCircle = useCallback((coordinates: [number, number]) => {
    if (!map.current) return;
    
    setSelectedLocation(coordinates);
    
    try {
      // Always remove the previous source and layer if they exist
      if (map.current.getLayer(privacyCircleId)) {
        map.current.removeLayer(privacyCircleId);
      }
      
      if (map.current.getSource(privacyCircleSourceId)) {
        map.current.removeSource(privacyCircleSourceId);
      }
      
      // Add the source and layer again
      map.current.addSource(privacyCircleSourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates
          },
          properties: {}
        }
      });
      
      // Add a circle layer
      map.current.addLayer({
        id: privacyCircleId,
        type: 'circle',
        source: privacyCircleSourceId,
        paint: {
          'circle-radius': circleRadius,
          'circle-color': '#ea384c',
          'circle-opacity': 0.2,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ea384c',
          'circle-stroke-opacity': 0.4
        }
      });
      
      setCircleAdded(true);
    } catch (error) {
      console.error('Error updating privacy circle:', error);
    }
  }, []);
  
  // Function to initialize map
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;
    
    try {
      console.log('Initializing map with token:', mapboxToken.substring(0, 10) + '...');
      
      // Set the mapbox token
      mapboxgl.accessToken = mapboxToken;
      
      // Create map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [55.2708, 25.2048], // Default to Dubai
        zoom: 10
      });
      
      // Add geocoder (search)
      geocoder.current = new MapboxGeocoder({
        accessToken: mapboxToken,
        mapboxgl: mapboxgl,
        marker: false
      });
      
      map.current.addControl(geocoder.current);
      
      // Set initial marker position if value provided
      const locationValue = initialLocation || value;
      if (locationValue) {
        try {
          // Try to parse as JSON first (from old implementation)
          try {
            const location = JSON.parse(locationValue);
            if (location.longitude && location.latitude) {
              console.log('Setting initial location from JSON:', location);
              map.current.setCenter([location.longitude, location.latitude]);
              
              // Wait for the map to be loaded before adding the circle
              map.current.once('load', () => {
                updatePrivacyCircle([location.longitude, location.latitude]);
              });
            }
          } catch (e) {
            // If not JSON, just use as address string
            console.log('Using location as string:', locationValue);
          }
        } catch (e) {
          console.error('Error parsing location:', e);
        }
      }
      
      // Wait for map to load before adding handlers
      map.current.on('load', () => {
        console.log('Map loaded, setting up event handlers');
        
        // Handle geocoder result
        if (geocoder.current) {
          geocoder.current.on('result', (e) => {
            console.log('Geocoder result:', e.result);
            const coords = e.result.center;
            if (coords) {
              // Update privacy circle
              updatePrivacyCircle([coords[0], coords[1]]);
              
              // Format the address to be more general
              const formattedAddress = formatAddressForPrivacy([e.result]);
              
              // Handle both callback types for compatibility
              if (onLocationSelect) {
                console.log('Calling onLocationSelect with:', {
                  address: formattedAddress,
                  coordinates: [coords[0], coords[1]],
                  formattedAddress: formattedAddress
                });
                
                onLocationSelect({
                  address: formattedAddress,
                  coordinates: [coords[0], coords[1]],
                  formattedAddress: formattedAddress
                });
              }
              
              if (onChange) {
                const location = {
                  longitude: coords[0],
                  latitude: coords[1],
                  name: formattedAddress
                };
                console.log('Calling onChange with:', JSON.stringify(location));
                onChange(JSON.stringify(location));
              }
            }
          });
        }
        
        // Add click event to the map for selecting location
        map.current.on('click', (e) => {
          console.log('Map clicked at:', e.lngLat);
          
          // Update privacy circle
          updatePrivacyCircle([e.lngLat.lng, e.lngLat.lat]);
          
          // Reverse geocode to get address for the coordinates
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${mapboxToken}`)
            .then(response => response.json())
            .then(data => {
              // Format the address for privacy
              const formattedAddress = formatAddressForPrivacy(data.features);
              
              // Handle both callback types for compatibility
              if (onLocationSelect) {
                console.log('Calling onLocationSelect after map click with:', {
                  address: formattedAddress,
                  coordinates: [e.lngLat.lng, e.lngLat.lat],
                  formattedAddress: formattedAddress
                });
                
                onLocationSelect({
                  address: formattedAddress,
                  coordinates: [e.lngLat.lng, e.lngLat.lat],
                  formattedAddress: formattedAddress
                });
              }
              
              if (onChange) {
                const location = {
                  longitude: e.lngLat.lng,
                  latitude: e.lngLat.lat,
                  name: formattedAddress
                };
                console.log('Calling onChange after map click with:', JSON.stringify(location));
                onChange(JSON.stringify(location));
              }
            })
            .catch(error => {
              console.error('Error reverse geocoding:', error);
              
              // Fall back to using custom location
              if (onLocationSelect) {
                onLocationSelect({
                  address: 'Custom Location',
                  coordinates: [e.lngLat.lng, e.lngLat.lat],
                  formattedAddress: 'Custom Location'
                });
              }
              
              if (onChange) {
                const location = {
                  longitude: e.lngLat.lng,
                  latitude: e.lngLat.lat,
                  name: 'Custom Location'
                };
                onChange(JSON.stringify(location));
              }
            });
        });
      });
      
      // Add event listener for style changes (which can remove layers)
      map.current.on('style.load', () => {
        console.log('Map style loaded/changed, re-adding circle if needed');
        if (selectedLocation) {
          // Small delay to ensure the map is ready
          setTimeout(() => {
            updatePrivacyCircle(selectedLocation);
          }, 100);
        }
      });
      
      // Add event listener for map move end
      map.current.on('moveend', () => {
        console.log('Map move ended, ensuring circle is visible');
        if (selectedLocation) {
          // Re-add the circle after map movements
          updatePrivacyCircle(selectedLocation);
        }
      });
      
    } catch (error) {
      console.error('Error initializing map:', error);
      setTokenError('Failed to initialize map. Please verify your Mapbox token.');
    }
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken, initialLocation, value, onChange, onLocationSelect, updatePrivacyCircle]);
  
  const saveCustomToken = () => {
    if (customToken) {
      localStorage.setItem('MAPBOX_ACCESS_TOKEN', customToken);
      setMapboxToken(customToken);
      setTokenError(null);
      toast.success('Mapbox token saved successfully');
    }
  };
  
  // If we're waiting for a token or have an error, show a placeholder
  if (isTokenLoading) {
    return (
      <div className="rounded border border-gray-300 p-4 flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }
  
  if (tokenError) {
    return (
      <div className="rounded border border-gray-300 p-4 space-y-4">
        <p className="text-red-500">{tokenError}</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            placeholder="Enter your Mapbox token"
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value)}
          />
          <button 
            className="bg-emirati-teal text-white px-4 py-2 rounded"
            onClick={saveCustomToken}
          >
            Save
          </button>
        </div>
        <p className="text-sm text-gray-500">
          You can get a Mapbox token by signing up at <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>, or go to the <a href="/api-keys" className="text-blue-500 underline">API Keys</a> page to set it globally.
        </p>
      </div>
    );
  }
  
  return (
    <div ref={mapContainer} className="h-80 rounded border border-gray-300" />
  );
};

export default LocationMap;
