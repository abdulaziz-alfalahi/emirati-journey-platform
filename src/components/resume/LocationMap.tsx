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
  
  // Refs to prevent re-renders and maintain state
  const mapInitializedRef = useRef<boolean>(false);
  const circleAddedRef = useRef<boolean>(false);
  const initialCoordinatesRef = useRef<[number, number] | null>(null);
  const selectedLocationRef = useRef<[number, number] | null>(null);
  const styleLoadedRef = useRef<boolean>(false);

  // Parse location string to extract coordinates
  const parseLocationString = useCallback((locationString: string) => {
    try {
      // Try parsing as JSON first (common format for stored locations)
      try {
        const location = JSON.parse(locationString);
        if (location.longitude && location.latitude) {
          return {
            coordinates: [location.longitude, location.latitude] as [number, number],
            address: location.name || 'Selected Location'
          };
        }
      } catch (e) {
        // Not a JSON string, continue
      }
      
      // Check if it matches a coordinates pattern
      const coordsMatch = locationString.match(/\[?(-?\d+\.?\d*),\s*(-?\d+\.?\d*)\]?/);
      if (coordsMatch) {
        return {
          coordinates: [parseFloat(coordsMatch[1]), parseFloat(coordsMatch[2])] as [number, number],
          address: locationString
        };
      }
      
      // Just use as text address
      return {
        coordinates: null,
        address: locationString
      };
    } catch (e) {
      console.error('Error parsing location string:', e);
      return {
        coordinates: null,
        address: locationString
      };
    }
  }, []);

  // Function to update privacy circle on the map
  const updatePrivacyCircle = useCallback((coordinates: [number, number]) => {
    if (!map.current) return;
    
    // Update refs to maintain state between renders
    setSelectedLocation(coordinates);
    selectedLocationRef.current = coordinates;
    
    try {
      // Check if the map is loaded
      if (!map.current.isStyleLoaded()) {
        console.log("Map style not loaded yet, waiting for style.load event");
        return;
      }
      
      styleLoadedRef.current = true;
      
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
      
      // Update the center of the map to the selected location
      map.current.setCenter(coordinates);
      
      // Update ref to track that circle has been added
      circleAddedRef.current = true;
      
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

  // Initialize map
  useEffect(() => {
    // Avoid reinitializing if map is already created or token is not loaded
    if (mapInitializedRef.current || isLoadingToken || !mapboxToken || !mapContainer.current) return;
    
    try {
      console.log('Initializing map with token:', mapboxToken.substring(0, 10) + '...');
      
      // Set the mapbox token
      mapboxgl.accessToken = mapboxToken;
      
      // Create map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [55.2708, 25.2048], // Default to Dubai
        zoom: 10,
        attributionControl: false,
        preserveDrawingBuffer: true, // Helps with rendering issues
        renderWorldCopies: false // Prevents multiple world copies which can cause flickering
      });
      
      // Prevent reinitialization
      mapInitializedRef.current = true;
      
      // Process initial location value before map loads
      const locationValue = initialLocation || value;
      if (locationValue) {
        try {
          const parsedLocation = parseLocationString(locationValue);
          
          if (parsedLocation.coordinates) {
            console.log('Setting initial location from parsed coordinates:', parsedLocation.coordinates);
            initialCoordinatesRef.current = parsedLocation.coordinates;
            selectedLocationRef.current = parsedLocation.coordinates;
            setSelectedLocation(parsedLocation.coordinates);
            setSelectedAddress(parsedLocation.address);
          } else {
            console.log('Using location as string:', parsedLocation.address);
            setSelectedAddress(parsedLocation.address);
          }
        } catch (e) {
          console.error('Error parsing location:', e);
        }
      }
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Add geocoder (search) control
      if (!geocoderInstance.current) {
        geocoderInstance.current = new MapboxGeocoder({
          accessToken: mapboxToken,
          mapboxgl: mapboxgl,
          marker: false,
          placeholder: 'Search for a location',
          zoom: 13
        });
        
        map.current.addControl(geocoderInstance.current);
      }
      
      // When map style loads
      map.current.on('style.load', () => {
        console.log('Map style loaded');
        styleLoadedRef.current = true;
        
        // Re-add the privacy circle if we have coordinates
        if (selectedLocationRef.current) {
          updatePrivacyCircle(selectedLocationRef.current);
        } else if (initialCoordinatesRef.current) {
          updatePrivacyCircle(initialCoordinatesRef.current);
        }
      });
      
      // Handle geocoder result
      if (geocoderInstance.current) {
        geocoderInstance.current.on('result', (e) => {
          console.log('Geocoder result:', e.result);
          const coords = e.result.center;
          if (coords) {
            // Set the map center
            map.current?.setCenter([coords[0], coords[1]]);
            
            // Update privacy circle
            updatePrivacyCircle([coords[0], coords[1]]);
            
            // Format the address to be more general
            const formattedAddress = formatAddressForPrivacy([e.result]);
            setSelectedAddress(formattedAddress);
            
            // Call onLocationSelect callback
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
      
      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Map could not be loaded. Please try again later.');
      });
      
      // When the map moves due to user interaction, we need to maintain the selected location
      map.current.on('moveend', () => {
        // Don't reset the center if we have a selected location
        if (selectedLocationRef.current && map.current) {
          // Check if the circle needs to be redrawn
          if (styleLoadedRef.current && !map.current.getLayer(privacyCircleId) && circleAddedRef.current) {
            updatePrivacyCircle(selectedLocationRef.current);
          }
        }
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
        circleAddedRef.current = false;
        styleLoadedRef.current = false;
      }
    };
  }, [mapboxToken, initialLocation, value, onChange, onLocationSelect, updatePrivacyCircle, isLoadingToken, parseLocationString]);
  
  // Keep the privacy circle updated when selectedLocation changes (e.g. after style reloads)
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded() && selectedLocation) {
      updatePrivacyCircle(selectedLocation);
    }
  }, [selectedLocation, updatePrivacyCircle]);

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
      {selectedAddress && (
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm font-medium">Selected location: {selectedAddress}</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
