
import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { debounce } from 'lodash';
import { LocationData } from '../types/location';

interface UseMapInitializationProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  initialLocation: string;
  onLocationSelect: (location: LocationData) => void;
  getEffectiveToken: () => string | null;
  persistentCircle?: boolean;
}

export const useMapInitialization = ({
  mapContainerRef,
  initialLocation,
  onLocationSelect,
  getEffectiveToken,
  persistentCircle = false
}: UseMapInitializationProps) => {
  // Create refs to store instances that should persist across renders
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
  
  // Keep track of when map style is loaded
  const [mapStyleLoaded, setMapStyleLoaded] = useState(false);
  
  // Flag to prevent rendering the map more than once
  const renderingMapRef = useRef(false);
  
  // Flag to prevent recursive console calls
  const inConsoleOperationRef = useRef(false);

  // Parse initial location string - using try/catch to safely handle JSON parsing
  const parseInitialLocation = useCallback((locationStr: string) => {
    try {
      if (inConsoleOperationRef.current) return { lng: 55.2708, lat: 25.2048, name: '' };
      inConsoleOperationRef.current = true;
      
      // Try to parse as JSON first
      const parsedLocation = JSON.parse(locationStr);
      
      inConsoleOperationRef.current = false;
      
      if (parsedLocation.longitude && parsedLocation.latitude) {
        return {
          lng: parsedLocation.longitude,
          lat: parsedLocation.latitude,
          name: parsedLocation.name || ''
        };
      }
    } catch (e) {
      // Not JSON, continue
      inConsoleOperationRef.current = false;
    }
    
    // Default to Dubai if no valid location
    return { lng: 55.2708, lat: 25.2048, name: locationStr || 'Dubai, UAE' };
  }, []);
  
  // Function to add or update the privacy circle - only called when map style is loaded
  const updatePrivacyCircle = useCallback((lng: number, lat: number) => {
    if (!mapRef.current) {
      return;
    }
    
    // IMPORTANT FIX: Only proceed if map style is fully loaded
    if (!mapStyleLoaded || !mapRef.current.isStyleLoaded()) {
      return;
    }
    
    const map = mapRef.current;
    
    try {
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
            'circle-color': 'rgba(234, 56, 76, 0.2)', // transparent red
            'circle-stroke-width': 2,
            'circle-stroke-color': 'rgba(234, 56, 76, 0.7)' // slightly more opaque red
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
    } catch (error) {
      console.error("Error updating privacy circle:", error);
    }
  }, [mapStyleLoaded]);
  
  // Create a debounced geocode function - with proper error handling
  const geocodeLocation = useCallback(debounce(async (lng: number, lat: number) => {
    try {
      // Get the token
      const token = getEffectiveToken();
      
      if (!token) {
        console.error('No Mapbox token available for geocoding');
        return;
      }
      
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&types=place,locality,neighborhood,district`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        // Find the most appropriate place name (neighborhood, locality, place)
        const place = data.features.find(f => 
          f.place_type.includes('place') || 
          f.place_type.includes('locality') || 
          f.place_type.includes('neighborhood') ||
          f.place_type.includes('district')
        );
        
        const placeName = place ? place.place_name : data.features[0].place_name;
        
        // Create a new location object with properly typed coordinates
        const newLocation: LocationData = {
          address: placeName,
          coordinates: [lng, lat] as [number, number],
          formattedAddress: placeName
        };
        
        // Pass the safely structured object to the callback
        onLocationSelect(newLocation);
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
    }
  }, 300), [getEffectiveToken, onLocationSelect]);
  
  // Reset map instance
  const resetMap = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    
    mapInitializedRef.current = false;
    setMapStyleLoaded(false);
    renderingMapRef.current = false;
    circleLayerAddedRef.current = false;
  }, []);
  
  // Function to setup map features (marker, circle) after style is loaded
  const setupMapFeatures = useCallback((map: mapboxgl.Map, lng: number, lat: number) => {
    // Add marker
    if (markerRef.current) {
      markerRef.current.remove();
    }
    
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
    
    // Add privacy circle only if map style is loaded
    if (mapStyleLoaded && map.isStyleLoaded()) {
      updatePrivacyCircle(lng, lat);
    }
    
    // Geocode the location
    geocodeLocation(lng, lat);
  }, [updatePrivacyCircle, geocodeLocation, mapStyleLoaded]);
  
  // Initialize the map when the component mounts
  useEffect(() => {
    // Skip if map is already being rendered
    if (renderingMapRef.current || !mapContainerRef.current) {
      return;
    }
    
    const accessToken = getEffectiveToken();
    
    if (!accessToken) {
      renderingMapRef.current = false;
      return;
    }
    
    renderingMapRef.current = true;
    
    try {
      // Set the token before creating the map
      mapboxgl.accessToken = accessToken;
      
      // Parse initial location
      const initialLocationData = parseInitialLocation(initialLocation);
      lastValidLocationRef.current = {
        lng: initialLocationData.lng,
        lat: initialLocationData.lat,
        zoom: 12
      };
      
      // Create the map with safe and deliberate parameters
      const mapOptions: mapboxgl.MapOptions = {
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLocationData.lng, initialLocationData.lat],
        zoom: 12
      };
      
      const map = new mapboxgl.Map(mapOptions);
      
      // Save map instance in ref
      mapRef.current = map;
      
      // Handle style load - this is crucial for adding sources and layers
      map.on('style.load', () => {
        setMapStyleLoaded(true);
        
        // Wait a brief moment to ensure style is fully loaded
        setTimeout(() => {
          // Add initial marker and circle after style is loaded
          if (lastValidLocationRef.current && map.isStyleLoaded()) {
            const { lng, lat } = lastValidLocationRef.current;
            setupMapFeatures(map, lng, lat);
          }
          
          mapInitializedRef.current = true;
        }, 100);
      });
      
      // Add click handler - use proper event object destructuring
      map.on('click', (e) => {
        // Safely access coordinates using MapboxGL's API
        const { lng, lat } = e.lngLat;
        
        // Update last valid location using proper properties
        lastValidLocationRef.current = {
          lng: lng,
          lat: lat,
          zoom: map.getZoom()
        };
        
        // Setup map features when user clicks
        setupMapFeatures(map, lng, lat);
      });
      
      // Handle map movement end - ensure we keep our state in sync
      map.on('moveend', () => {
        if (!mapRef.current) return;
        
        const center = mapRef.current.getCenter();
        const zoom = mapRef.current.getZoom();
        
        // Only update if moved by user (not programmatically) and there's a previous location
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
      
      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Cleanup function
      return () => {
        if (mapRef.current) {
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
      return;
    }
  }, [getEffectiveToken, initialLocation, mapContainerRef, parseInitialLocation, setupMapFeatures]);
  
  // Update map when initialLocation changes and map is already initialized
  useEffect(() => {
    if (!mapRef.current || !initialLocation) return;
    
    try {
      const locationData = parseInitialLocation(initialLocation);
      const map = mapRef.current;
      
      // Update map center - using safe values
      map.flyTo({
        center: [locationData.lng, locationData.lat],
        zoom: 12,
        essential: true
      });
      
      // Update last valid location with properly typed values
      lastValidLocationRef.current = {
        lng: locationData.lng,
        lat: locationData.lat,
        zoom: 12
      };
      
      // Update marker and circle
      if (mapStyleLoaded && map.isStyleLoaded()) {
        setupMapFeatures(map, locationData.lng, locationData.lat);
      } else {
        // If style isn't loaded yet, add marker when style loads
        map.once('style.load', () => {
          // Same small timeout to ensure style is fully loaded
          setTimeout(() => {
            setupMapFeatures(map, locationData.lng, locationData.lat);
          }, 100);
        });
      }
    } catch (error) {
      console.error("Error updating map with new location:", error);
    }
  }, [initialLocation, mapStyleLoaded, parseInitialLocation, setupMapFeatures]);
  
  // Effect specifically for adding the privacy circle when the style is loaded
  useEffect(() => {
    if (!mapStyleLoaded || !mapRef.current || !lastValidLocationRef.current) return;
    
    // Wait a bit to ensure the style is completely loaded
    const timer = setTimeout(() => {
      if (persistentCircle && mapRef.current && mapRef.current.isStyleLoaded() && lastValidLocationRef.current) {
        const { lng, lat } = lastValidLocationRef.current;
        updatePrivacyCircle(lng, lat);
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [mapStyleLoaded, persistentCircle, updatePrivacyCircle]);

  return {
    mapStyleLoaded,
    resetMap
  };
};
