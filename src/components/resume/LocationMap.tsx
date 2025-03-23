
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// This token is just a fallback in case we can't get the token from Supabase
// The real token should come from Supabase Edge Function
const FALLBACK_MAPBOX_TOKEN = 'pk.eyJ1IjoiYWJkdWxheml6LWFsZmFsYWhpIiwiYSI6ImNtOGxoM3MyODE3dHgyanM1NXJvNWV6bjUifQ.DxkAfLeJXnYFLFjjl75N0Q';

interface LocationMapProps {
  initialLocation?: string;
  onLocationSelect: (locationData: { 
    address: string; 
    coordinates: [number, number]; 
    formattedAddress: string;
  }) => void;
  value?: string; // For backward compatibility
  onChange?: (location: string) => void; // For backward compatibility
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  initialLocation, 
  onLocationSelect,
  value, 
  onChange 
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const geocoderInstance = useRef<MapboxGeocoder | null>(null);
  const circleRadius = 250; // 500 meter diameter (radius = 250)
  const privacyCircleId = 'privacy-circle';
  const privacyCircleSourceId = 'privacy-circle-source';
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(FALLBACK_MAPBOX_TOKEN);
  const [isLoadingToken, setIsLoadingToken] = useState<boolean>(true);
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);
  
  // Prevent re-initialization of the map
  const mapInitializedRef = useRef<boolean>(false);

  // Fetch Mapbox token from Supabase Edge Function
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        setIsLoadingToken(true);
        console.log('Fetching Mapbox token from Supabase...');
        
        const { data, error } = await supabase.functions.invoke('get-api-keys', {
          method: 'GET'
        });
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          setMapboxToken(FALLBACK_MAPBOX_TOKEN);
          toast.error('Could not fetch Mapbox token. Using fallback token.', {
            description: "Map functionality might be limited."
          });
        } else if (data && data.mapbox_access_token) {
          console.log('Successfully fetched Mapbox token');
          setMapboxToken(data.mapbox_access_token);
        } else {
          console.warn('No Mapbox token found in the response. Using fallback token.');
          setMapboxToken(FALLBACK_MAPBOX_TOKEN);
        }
      } catch (err) {
        console.error('Exception when fetching Mapbox token:', err);
        setMapboxToken(FALLBACK_MAPBOX_TOKEN);
      } finally {
        setIsLoadingToken(false);
      }
    };

    fetchMapboxToken();
  }, []);

  // Function to update privacy circle on the map
  const updatePrivacyCircle = useCallback((coordinates: [number, number]) => {
    if (!map.current) return;
    
    setSelectedLocation(coordinates);
    
    try {
      // Check if the map is loaded
      if (!map.current.isStyleLoaded()) {
        console.log("Map style not loaded yet, waiting...");
        map.current.once('style.load', () => {
          updatePrivacyCircle(coordinates);
        });
        return;
      }
      
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
      
      console.log("Privacy circle updated at:", coordinates);
    } catch (error) {
      console.error('Error updating privacy circle:', error);
    }
  }, []);
  
  // Format the address for privacy by removing specific details
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

  // Initialize map
  useEffect(() => {
    // Avoid reinitializing if map is already created or token is not loaded
    if (mapInitializedRef.current || isLoadingToken || !mapboxToken || !mapContainer.current) return;
    
    try {
      console.log('Initializing map with token:', mapboxToken.substring(0, 10) + '...');
      
      // Set the mapbox token
      mapboxgl.accessToken = mapboxToken;
      
      // Create map - force triggering a render
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [55.2708, 25.2048], // Default to Dubai
        zoom: 10,
        attributionControl: false,
        renderWorldCopies: false, // Prevents multiple world copies
        preserveDrawingBuffer: true // Helps with rendering issues
      });
      
      // Prevent reinitialization
      mapInitializedRef.current = true;
      
      // Once the map is fully loaded, handle UI updates
      map.current.once('load', () => {
        console.log('Map loaded successfully');
        setMapInitialized(true);
        
        // Add navigation controls after the map loads
        map.current?.addControl(
          new mapboxgl.NavigationControl(),
          'top-right'
        );
        
        // Add geocoder (search) after the map loads
        if (!geocoderInstance.current) {
          geocoderInstance.current = new MapboxGeocoder({
            accessToken: mapboxToken,
            mapboxgl: mapboxgl,
            marker: false,
            placeholder: 'Search for a location',
            zoom: 13
          });
          
          map.current?.addControl(geocoderInstance.current);
        }
        
        // Set initial marker position if value provided
        const locationValue = initialLocation || value;
        if (locationValue) {
          try {
            // Try to parse as JSON first (from old implementation)
            try {
              const location = JSON.parse(locationValue);
              if (location.longitude && location.latitude) {
                console.log('Setting initial location from JSON:', location);
                map.current?.setCenter([location.longitude, location.latitude]);
                updatePrivacyCircle([location.longitude, location.latitude]);
                setSelectedAddress(location.name || 'Selected Location');
              }
            } catch (e) {
              // If not JSON, just use as address string
              console.log('Using location as string:', locationValue);
              setSelectedAddress(locationValue);
            }
          } catch (e) {
            console.error('Error parsing location:', e);
          }
        }
        
        // Handle geocoder result
        if (geocoderInstance.current) {
          geocoderInstance.current.on('result', (e) => {
            console.log('Geocoder result:', e.result);
            const coords = e.result.center;
            if (coords) {
              // Update privacy circle
              updatePrivacyCircle([coords[0], coords[1]]);
              
              // Format the address to be more general
              const formattedAddress = formatAddressForPrivacy([e.result]);
              setSelectedAddress(formattedAddress);
              
              // Call onLocationSelect callback
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
              
              // For backward compatibility
              if (onChange) {
                const location = {
                  longitude: coords[0],
                  latitude: coords[1],
                  name: formattedAddress
                };
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
              setSelectedAddress(formattedAddress);
              
              // Call onLocationSelect callback
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
              
              // For backward compatibility
              if (onChange) {
                const location = {
                  longitude: e.lngLat.lng,
                  latitude: e.lngLat.lat,
                  name: formattedAddress
                };
                onChange(JSON.stringify(location));
              }
            })
            .catch(error => {
              console.error('Error reverse geocoding:', error);
              
              // Fall back to using custom location
              const customLocation = 'Custom Location';
              setSelectedAddress(customLocation);
              
              onLocationSelect({
                address: customLocation,
                coordinates: [e.lngLat.lng, e.lngLat.lat],
                formattedAddress: customLocation
              });
              
              if (onChange) {
                const location = {
                  longitude: e.lngLat.lng,
                  latitude: e.lngLat.lat,
                  name: customLocation
                };
                onChange(JSON.stringify(location));
              }
            });
        });
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
      // Clean up only if map was initialized
      if (map.current) {
        console.log('Cleaning up map instance');
        if (geocoderInstance.current) {
          try {
            map.current.removeControl(geocoderInstance.current);
          } catch (e) {
            console.error('Error removing geocoder:', e);
          }
          geocoderInstance.current = null;
        }
        map.current.remove();
        map.current = null;
        // Reset initialization flag on unmount
        mapInitializedRef.current = false;
        setMapInitialized(false);
      }
    };
  }, [mapboxToken, initialLocation, value, onChange, onLocationSelect, updatePrivacyCircle, isLoadingToken]);
  
  // If we're loading the token, show loading state
  if (isLoadingToken) {
    return (
      <div className="rounded border border-gray-300 p-4 h-80 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }
  
  // If we have an error, show error message
  if (mapError) {
    return (
      <div className="rounded border border-gray-300 p-4 space-y-4">
        <p className="text-red-500">{mapError}</p>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Reload Map
        </button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div 
        ref={mapContainer} 
        className="h-80 rounded border border-gray-300"
        style={{ position: 'relative' }}
      />
      {(selectedLocation || selectedAddress) && (
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          {selectedAddress && (
            <p className="text-sm font-medium mb-1">Selected location: {selectedAddress}</p>
          )}
          {selectedLocation && (
            <p className="text-xs text-gray-500">Coordinates: {selectedLocation[1].toFixed(4)}, {selectedLocation[0].toFixed(4)}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationMap;
