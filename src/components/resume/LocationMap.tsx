import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface LocationMapProps {
  value?: string;
  onChange: (location: string) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ value, onChange }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const geocoder = useRef<MapboxGeocoder | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [customToken, setCustomToken] = useState<string>('');
  const { user } = useAuth();

  // Function to fetch Mapbox token from Supabase edge function
  const fetchMapboxToken = useCallback(async () => {
    try {
      // First try to get the token from the edge function (if logged in)
      if (user) {
        const { data, error } = await supabase.functions.invoke('get-api-keys');
        if (!error && data && data.MAPBOX_ACCESS_TOKEN) {
          setMapboxToken(data.MAPBOX_ACCESS_TOKEN);
          // Also save to local storage as backup
          localStorage.setItem('MAPBOX_ACCESS_TOKEN', data.MAPBOX_ACCESS_TOKEN);
          return;
        }
      }
      
      // Otherwise try to get from localStorage
      const localToken = localStorage.getItem('MAPBOX_ACCESS_TOKEN');
      if (localToken) {
        setMapboxToken(localToken);
        return;
      }
      
      // If no token is found, show an error
      setTokenError('No Mapbox token available. Please enter one below or contact an administrator.');
    } catch (error) {
      console.error('Error fetching Mapbox token:', error);
      setTokenError('Failed to fetch Mapbox token. Please enter one below or contact an administrator.');
    }
  }, [user]);

  useEffect(() => {
    fetchMapboxToken();
  }, [fetchMapboxToken]);
  
  // Function to initialize map
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;
    
    try {
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
      
      // Create a marker
      marker.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([55.2708, 25.2048]) 
        .addTo(map.current);
      
      // Set initial marker position if value provided
      if (value) {
        try {
          const location = JSON.parse(value);
          map.current.setCenter([location.longitude, location.latitude]);
          marker.current.setLngLat([location.longitude, location.latitude]);
        } catch (e) {
          console.error('Error parsing location:', e);
        }
      }
      
      // Handle geocoder result
      geocoder.current.on('result', (e) => {
        const coords = e.result.center;
        if (marker.current && coords) {
          marker.current.setLngLat(coords);
          const location = {
            longitude: coords[0],
            latitude: coords[1],
            name: e.result.place_name
          };
          onChange(JSON.stringify(location));
        }
      });
      
      // Handle marker dragend
      marker.current.on('dragend', () => {
        const lngLat = marker.current?.getLngLat();
        if (lngLat) {
          const location = {
            longitude: lngLat.lng,
            latitude: lngLat.lat,
            name: 'Custom Location'
          };
          onChange(JSON.stringify(location));
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
  }, [mapboxToken, value, onChange]);
  
  const saveCustomToken = () => {
    if (customToken) {
      localStorage.setItem('MAPBOX_ACCESS_TOKEN', customToken);
      setMapboxToken(customToken);
      setTokenError(null);
    }
  };
  
  // If we're waiting for a token or have an error, show a placeholder
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
          You can get a Mapbox token by signing up at <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
        </p>
      </div>
    );
  }
  
  if (!mapboxToken) {
    return (
      <div className="rounded border border-gray-300 p-4 flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }
  
  return (
    <div ref={mapContainer} className="h-80 rounded border border-gray-300" />
  );
};

export default LocationMap;
