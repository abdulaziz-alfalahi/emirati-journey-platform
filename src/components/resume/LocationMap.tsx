
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface LocationMapProps {
  initialLocation?: string;
  onLocationSelect: (location: { 
    address: string; 
    coordinates: [number, number]; 
    formattedAddress: string;
  }) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ initialLocation, onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const privacyCircle = useRef<mapboxgl.GeoJSONSource | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const { user } = useAuth();

  // Fetch Mapbox token
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        // Try to get from admin API first (if user is logged in and admin)
        if (user) {
          const { data, error } = await supabase.functions.invoke('get-api-keys');
          if (!error && data && data.MAPBOX_ACCESS_TOKEN) {
            setMapboxToken(data.MAPBOX_ACCESS_TOKEN);
            // Also save to local storage as backup
            localStorage.setItem('MAPBOX_ACCESS_TOKEN', data.MAPBOX_ACCESS_TOKEN);
            return;
          }
        }
        
        // Fallback to local storage
        const storedToken = localStorage.getItem('MAPBOX_ACCESS_TOKEN');
        if (storedToken) {
          setMapboxToken(storedToken);
          return;
        }
        
        // If no token is available, check if we're in development mode
        if (import.meta.env.DEV) {
          setError('Mapbox token not found. Please add it in the API Keys page.');
        }
      } catch (e) {
        console.error('Error fetching Mapbox token:', e);
        setError('Failed to load Mapbox token. Please try again later.');
      }
    };

    fetchMapboxToken();
  }, [user]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Set the token
    mapboxgl.accessToken = mapboxToken;

    const initializeMap = async () => {
      setLoading(true);
      
      try {
        // Initial coordinates (centered on UAE)
        let initialCoordinates: [number, number] = [55.2708, 25.2048]; // Dubai coordinates
        
        // If we have an initial location string, try to geocode it
        if (initialLocation) {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(initialLocation)}.json?access_token=${mapboxToken}`
            );
            const data = await response.json();
            
            if (data.features && data.features.length > 0) {
              const [lng, lat] = data.features[0].center;
              initialCoordinates = [lng, lat];
            }
          } catch (e) {
            console.error('Geocoding failed:', e);
            // Continue with default coordinates if geocoding fails
          }
        }
        
        // Create new map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: initialCoordinates,
          zoom: 13
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add geocoder control
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxToken,
          mapboxgl: mapboxgl,
          marker: false, // We'll add our own marker
          placeholder: 'Search for your general area',
          countries: 'ae', // Limit to UAE
        });
        
        map.current.addControl(geocoder, 'top-left');

        // Add marker and privacy circle on load
        map.current.on('load', () => {
          // Add the privacy circle source
          map.current?.addSource('privacy-circle', {
            type: 'geojson',
            data: createGeoJSONCircle(initialCoordinates, 0.5) // 500m radius
          });
          
          privacyCircle.current = map.current?.getSource('privacy-circle') as mapboxgl.GeoJSONSource;

          // Add the privacy circle layer
          map.current?.addLayer({
            id: 'privacy-circle-fill',
            type: 'fill',
            source: 'privacy-circle',
            paint: {
              'fill-color': '#4264fb',
              'fill-opacity': 0.2
            }
          });
          
          map.current?.addLayer({
            id: 'privacy-circle-outline',
            type: 'line',
            source: 'privacy-circle',
            paint: {
              'line-color': '#4264fb',
              'line-width': 2
            }
          });

          // Add marker
          marker.current = new mapboxgl.Marker({ draggable: true })
            .setLngLat(initialCoordinates)
            .addTo(map.current as mapboxgl.Map);

          // Update on marker drag
          marker.current.on('dragend', updateLocation);
        });

        // Update on map click
        map.current.on('click', (e) => {
          if (marker.current) {
            marker.current.setLngLat(e.lngLat);
            updateLocation();
          }
        });

        // Update on geocoder result
        geocoder.on('result', (e) => {
          if (marker.current && e.result && e.result.center) {
            marker.current.setLngLat(e.result.center);
            updateLocation(e.result.place_name);
          }
        });

        setLoading(false);
      } catch (e) {
        console.error('Map initialization error:', e);
        setError('Failed to load the map. Please try again later.');
        setLoading(false);
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [initialLocation, mapboxToken]);

  // Create a GeoJSON circle feature for the privacy area
  const createGeoJSONCircle = (center: [number, number], radiusInKm: number, points: number = 64) => {
    const coords = {
      latitude: center[1],
      longitude: center[0]
    };

    const km = radiusInKm;
    const ret = [];
    const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]); // Close the loop

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [ret]
      },
      properties: {}
    };
  };

  // Update location based on marker position
  const updateLocation = async (placeName?: string) => {
    if (!marker.current || !map.current || !mapboxToken) return;

    const coordinates = marker.current.getLngLat().toArray() as [number, number];

    // Update privacy circle
    if (privacyCircle.current) {
      privacyCircle.current.setData(createGeoJSONCircle(coordinates, 0.5) as any);
    }

    // Reverse geocode to get address if not provided
    let formattedAddress = placeName || '';
    if (!formattedAddress) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxToken}`
        );
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          formattedAddress = data.features[0].place_name;
        }
      } catch (e) {
        console.error('Reverse geocoding failed:', e);
        formattedAddress = `${coordinates[1].toFixed(4)}, ${coordinates[0].toFixed(4)}`;
      }
    }

    // Pass the location data to the parent component
    onLocationSelect({
      address: formattedAddress,
      coordinates: coordinates,
      formattedAddress: formattedAddress
    });
  };

  // If no token, show token input
  if (!mapboxToken) {
    return (
      <div className="relative w-full h-[400px] rounded-md overflow-hidden flex flex-col items-center justify-center border border-input bg-muted p-6">
        <div className="text-center space-y-4 max-w-md">
          <h3 className="text-lg font-medium">Mapbox API Key Required</h3>
          <p className="text-sm text-muted-foreground">
            To use the location feature, please provide your Mapbox API key. You can add it in the API Keys page if you're an administrator.
          </p>
          <div className="space-y-2">
            <label htmlFor="mapbox-token" className="text-sm font-medium">
              Mapbox Access Token (will be stored in browser only)
            </label>
            <input
              id="mapbox-token"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="pk.eyJ1Ijoi..."
              onChange={(e) => {
                const token = e.target.value.trim();
                if (token) {
                  setMapboxToken(token);
                  localStorage.setItem('MAPBOX_ACCESS_TOKEN', token);
                  toast.success("Mapbox token saved in browser storage");
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Your token will only be stored in your browser's local storage and not sent to any server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-md overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0 rounded-md border border-input" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-primary">Loading map...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-destructive">{error}</div>
        </div>
      )}
      <div className="absolute bottom-2 left-2 right-2 bg-white/80 p-2 text-xs text-gray-600 rounded-md backdrop-blur-sm">
        Note: For privacy reasons, only a 500-meter area around your selection will be used. Your exact location is not stored.
      </div>
    </div>
  );
};

export default LocationMap;
