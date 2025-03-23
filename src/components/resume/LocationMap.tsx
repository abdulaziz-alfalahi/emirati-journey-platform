import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { debounce } from 'lodash';

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

  // Fetch Mapbox API key
  const { data: apiKeys, isLoading: isLoadingApiKeys } = useQuery({
    queryKey: ['mapbox-api-key'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-api-keys');
      if (error) throw error;
      return data;
    },
  });

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
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKeys?.mapbox_access_token || apiKeys?.MAPBOX_ACCESS_TOKEN}`
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
  }, 300), [apiKeys, onLocationSelect]);
  
  // Initialize the map when the component mounts
  useEffect(() => {
    // Skip if API keys aren't loaded or map is already being rendered
    if (isLoadingApiKeys || renderingMapRef.current || !mapContainerRef.current) {
      return;
    }
    
    console.log('Initializing map');
    renderingMapRef.current = true;
    
    const accessToken = apiKeys?.mapbox_access_token || apiKeys?.MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('Mapbox access token not found');
      renderingMapRef.current = false;
      return;
    }
    
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
  }, [apiKeys, isLoadingApiKeys, initialLocation, parseInitialLocation, updatePrivacyCircle, geocodeLocation, persistentCircle]);
  
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
      <div 
        ref={mapContainerRef} 
        className="rounded-md overflow-hidden border border-gray-300" 
        style={{ height, width: '100%' }}
      />
      {isLoadingApiKeys && (
        <div className="flex justify-center items-center h-full w-full absolute top-0 left-0 bg-white bg-opacity-70">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
