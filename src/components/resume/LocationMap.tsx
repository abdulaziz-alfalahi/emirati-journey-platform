
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// A more reliable token for development - still recommended to replace with your own
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoiYXBwLXRlc3QtdG9rZW4iLCJhIjoiY2x0OXB5MGdnMDFmNjJrcGR5ZjMxanZleCJ9.ZNk3gy0m1T0QIl_86vV_rw';

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
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const [tokenFetchAttempted, setTokenFetchAttempted] = useState<boolean>(false);
  const [circleAdded, setCircleAdded] = useState<boolean>(false);
  const [customToken, setCustomToken] = useState<string>('');
  const [mapError, setMapError] = useState<string | null>(null);

  // Function to fetch Mapbox token from Supabase edge function or localStorage
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
        try {
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
          }
        } catch (edgeFunctionError) {
          console.error('Edge function error:', edgeFunctionError);
          // Continue to fallback
        }
      }
      
      // If we get here, use the default token as a fallback
      console.log('Using default Mapbox token as fallback');
      setMapboxToken(DEFAULT_MAPBOX_TOKEN);
      localStorage.setItem('MAPBOX_ACCESS_TOKEN', DEFAULT_MAPBOX_TOKEN);
    } catch (error) {
      console.error('Error fetching Mapbox token:', error);
      // Set default token as last resort
      setMapboxToken(DEFAULT_MAPBOX_TOKEN);
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
      f.place_type?.includes('neighborhood') || 
      f.place_type?.includes('district')
    );
    
    if (neighborhood) return neighborhood.place_name;
    
    // Fall back to place (city)
    const place = features.find(f => f.place_type?.includes('place'));
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
      
      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Map could not be loaded. Please try again later.');
      });
      
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please try again later.');
      toast.error("Map initialization failed", {
        description: "Please check your internet connection or try again later.",
        duration: 5000,
      });
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
      setMapError(null);
      toast.success('Mapbox token saved successfully');
    }
  };
  
  // If we're waiting for a token, show a loading spinner
  if (isTokenLoading) {
    return (
      <div className="rounded border border-gray-300 p-4 flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }
  
  // If we have an error, show error message and token input
  if (mapError) {
    return (
      <div className="rounded border border-gray-300 p-4 space-y-4">
        <p className="text-red-500">{mapError}</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            placeholder="Enter your Mapbox token"
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value)}
          />
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={saveCustomToken}
          >
            Save
          </button>
        </div>
        <p className="text-sm text-gray-500">
          You can get a Mapbox token by signing up at <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
        </p>
      </div>
    );
  }
  
  // If we don't have a token at all (which shouldn't happen now), show token input
  if (!mapboxToken) {
    return (
      <div className="rounded border border-gray-300 p-4 space-y-4">
        <p className="text-red-500">Mapbox API token required</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            placeholder="Enter your Mapbox token"
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value)}
          />
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={saveCustomToken}
          >
            Save
          </button>
        </div>
        <p className="text-sm text-gray-500">
          You can get a Mapbox token by signing up at <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div ref={mapContainer} className="h-80 rounded border border-gray-300" />
      {selectedLocation && (
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm font-medium">Selected coordinates: {selectedLocation[1].toFixed(4)}, {selectedLocation[0].toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
