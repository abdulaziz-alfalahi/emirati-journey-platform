import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { debounce } from 'lodash';

interface UseMapInitializationProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  initialLocation: string;
  onLocationSelect: (location: LocationData) => void;
  getEffectiveToken: () => string | null;
  persistentCircle?: boolean;
}

interface LocationData {
  address: string;
  coordinates: [number, number];
  formattedAddress: string;
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
    
    if (!mapRef.current || !mapStyleLoaded) return;
    
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
    } catch (error) {
      console.error("Error updating privacy circle:", error);
    }
  }, [mapStyleLoaded]);
  
  // Create a debounced geocode function
  const geocodeLocation = useCallback(debounce(async (lng: number, lat: number) => {
    try {
      // Get the token
      const token = getEffectiveToken();
      
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
  
  // Function to add marker and circle after style is loaded
  const setupMapFeatures = useCallback((map: mapboxgl.Map, lng: number, lat: number) => {
    // Add marker
    if (markerRef.current) {
      markerRef.current.remove();
    }
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
    
    // Add privacy circle
    updatePrivacyCircle(lng, lat);
    
    // Geocode the location
    geocodeLocation(lng, lat);
  }, [updatePrivacyCircle, geocodeLocation]);
  
  // Initialize the map when the component mounts
  useEffect(() => {
    // Skip if map is already being rendered
    if (renderingMapRef.current || !mapContainerRef.current) {
      return;
    }
    
    const accessToken = getEffectiveToken();
    console.log('Initializing map - token available:', !!accessToken);
    
    if (!accessToken) {
      console.error('Mapbox access token not found');
      renderingMapRef.current = false;
      return;
    }
    
    renderingMapRef.current = true;
    
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
          setupMapFeatures(map, lng, lat);
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
        
        // Only add/update marker and circle if map style is loaded
        if (mapStyleLoaded) {
          setupMapFeatures(map, lng, lat);
        }
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
      
      // Handle errors
      map.on('error', (e) => {
        console.error('Mapbox error:', e);
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
      return;
    }
  }, [getEffectiveToken, initialLocation, mapContainerRef, parseInitialLocation, setupMapFeatures, mapStyleLoaded]);
  
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
    
    // Update marker and circle
    setupMapFeatures(map, locationData.lng, locationData.lat);
    
    // Notify about the selected location
    const newLocation: LocationData = {
      address: locationData.name,
      coordinates: [locationData.lng, locationData.lat],
      formattedAddress: locationData.name
    };
    
    onLocationSelect(newLocation);
  }, [initialLocation, mapStyleLoaded, parseInitialLocation, setupMapFeatures, onLocationSelect]);
  
  // If persistent circle is turned on, ensure it's visible when map is ready
  useEffect(() => {
    if (!persistentCircle || !mapRef.current || !mapStyleLoaded || !lastValidLocationRef.current) return;
    
    const { lng, lat } = lastValidLocationRef.current;
    updatePrivacyCircle(lng, lat);
    
  }, [persistentCircle, updatePrivacyCircle, mapStyleLoaded]);

  return {
    mapStyleLoaded,
    resetMap
  };
};
