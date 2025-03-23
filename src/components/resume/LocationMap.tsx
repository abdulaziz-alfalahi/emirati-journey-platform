
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
  const [mapboxToken, setMapboxToken] = useState<string>(FALLBACK_MAPBOX_TOKEN);
  const [isLoadingToken, setIsLoadingToken] = useState<boolean>(true);
  const { user } = useAuth();
  
  // Using refs to track state without causing rerenders
  const mapInitializedRef = useRef<boolean>(false);
  const privacyCircleRef = useRef<{
    added: boolean;
    coordinates: [number, number] | null;
    address: string | null;
  }>({
    added: false,
    coordinates: null,
    address: null
  });
  const stylesLoadedRef = useRef<boolean>(false);
  
  // Format the address for privacy by removing specific details
  const formatAddressForPrivacy = useCallback((features: any[]) => {
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
  }, []);

  // Parse location string to extract coordinates
  const parseLocationString = useCallback((locationString: string) => {
    try {
      // Try parsing as JSON first (common format for stored locations)
      try {
        const location = JSON.parse(locationString);
        if (location.longitude !== undefined && location.latitude !== undefined) {
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
  
  // Function to ensure privacy circle is displayed on the map
  const ensurePrivacyCircle = useCallback((coordinates: [number, number], address: string) => {
    if (!map.current) return;
    
    try {
      // Make sure the map style is loaded
      if (!map.current.isStyleLoaded()) {
        stylesLoadedRef.current = false;
        console.log("Map style not loaded yet, will add circle when style loads");
        
        // Store coordinates and address for when style loads
        privacyCircleRef.current = {
          added: false,
          coordinates: coordinates,
          address: address
        };
        return;
      }
      
      stylesLoadedRef.current = true;
      
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
      map.current.easeTo({
        center: coordinates,
        duration: 500
      });
      
      // Update ref to track that circle has been added
      privacyCircleRef.current = {
        added: true,
        coordinates: coordinates,
        address: address
      };
      
      console.log("Privacy circle successfully added at:", coordinates);
    } catch (error) {
      console.error('Error adding privacy circle:', error);
    }
  }, []);
  
  // Update privacy circle and related state
  const updateLocation = useCallback((coordinates: [number, number], address: string) => {
    // Update refs
    privacyCircleRef.current = {
      ...privacyCircleRef.current,
      coordinates: coordinates,
      address: address
    };
    
    // Add circle to map
    ensurePrivacyCircle(coordinates, address);
    
    // Call callback functions
    onLocationSelect({
      address: address,
      coordinates: coordinates,
      formattedAddress: address
    });
    
    // For backward compatibility
    if (onChange) {
      const location = {
        longitude: coordinates[0],
        latitude: coordinates[1],
        name: address
      };
      onChange(JSON.stringify(location));
    }
  }, [ensurePrivacyCircle, onLocationSelect, onChange]);

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
    // Don't initialize if already initialized, token is loading, or container is missing
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
        preserveDrawingBuffer: true,
        renderWorldCopies: false,
        failIfMajorPerformanceCaveat: true
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
            privacyCircleRef.current = {
              added: false,
              coordinates: parsedLocation.coordinates,
              address: parsedLocation.address || 'Selected Location'
            };
          } else if (parsedLocation.address) {
            console.log('Using location as string:', parsedLocation.address);
            privacyCircleRef.current = {
              ...privacyCircleRef.current,
              address: parsedLocation.address
            };
          }
        } catch (e) {
          console.error('Error parsing initial location:', e);
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
        stylesLoadedRef.current = true;
        
        // Add the privacy circle if we have coordinates
        if (privacyCircleRef.current.coordinates) {
          ensurePrivacyCircle(
            privacyCircleRef.current.coordinates,
            privacyCircleRef.current.address || 'Selected Location'
          );
        }
      });
      
      // Handle geocoder result
      if (geocoderInstance.current) {
        geocoderInstance.current.on('result', (e) => {
          console.log('Geocoder result:', e.result);
          const coords = e.result.center;
          if (coords) {
            // Format the address to be more general
            const formattedAddress = formatAddressForPrivacy([e.result]);
            
            // Update location with new coordinates and address
            updateLocation([coords[0], coords[1]], formattedAddress);
          }
        });
      }
      
      // Add click event to the map for selecting location
      map.current.on('click', (e) => {
        console.log('Map clicked at:', e.lngLat);
        
        // Reverse geocode to get address for the coordinates
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${mapboxToken}`)
          .then(response => response.json())
          .then(data => {
            // Format the address for privacy
            const formattedAddress = formatAddressForPrivacy(data.features);
            
            // Update location with new coordinates and address
            updateLocation([e.lngLat.lng, e.lngLat.lat], formattedAddress);
          })
          .catch(error => {
            console.error('Error reverse geocoding:', error);
            
            // Fall back to using custom location
            const customLocation = 'Custom Location';
            
            // Update location with new coordinates and fallback address
            updateLocation([e.lngLat.lng, e.lngLat.lat], customLocation);
          });
      });
      
      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
      });
      
      // When the map is idle (after animations, panning, etc)
      map.current.on('idle', () => {
        // Check if we need to add or restore the privacy circle
        if (privacyCircleRef.current.coordinates && stylesLoadedRef.current) {
          // If the circle is missing but we have coordinates, restore it
          if (!map.current?.getLayer(privacyCircleId) && privacyCircleRef.current.added) {
            console.log('Restoring privacy circle');
            ensurePrivacyCircle(
              privacyCircleRef.current.coordinates,
              privacyCircleRef.current.address || 'Selected Location'
            );
          }
        }
      });
      
      // When style is reloaded, we need to re-add the circle
      map.current.on('styledataloading', () => {
        stylesLoadedRef.current = false;
      });
      
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error("Map initialization failed", {
        description: "Please check your internet connection or try again later.",
        duration: 5000,
      });
    }
    
    return () => {
      // Clean up only if map was initialized
      if (map.current) {
        console.log('Cleaning up map instance');
        try {
          if (geocoderInstance.current) {
            map.current.removeControl(geocoderInstance.current);
            geocoderInstance.current = null;
          }
          map.current.remove();
        } catch (e) {
          console.error('Error removing map:', e);
        }
        
        map.current = null;
        mapInitializedRef.current = false;
        stylesLoadedRef.current = false;
        privacyCircleRef.current = {
          added: false,
          coordinates: null,
          address: null
        };
      }
    };
  }, [mapboxToken, initialLocation, value, ensurePrivacyCircle, updateLocation, isLoadingToken, parseLocationString, formatAddressForPrivacy]);
  
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
  
  return (
    <div className="animate-fade-in">
      <div 
        ref={mapContainer} 
        className="h-80 rounded border border-gray-300"
        style={{ position: 'relative' }}
      />
      {privacyCircleRef.current.address && (
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm font-medium">Selected location: {privacyCircleRef.current.address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
