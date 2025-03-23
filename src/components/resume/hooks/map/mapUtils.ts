
import mapboxgl from 'mapbox-gl';
import { LocationData } from '../../types/location';

/**
 * Geocodes a location using Mapbox API
 */
export const geocodeLocation = async (
  lng: number, 
  lat: number, 
  token: string | null
): Promise<LocationData | null> => {
  try {
    if (!token) {
      console.error('No Mapbox token available for geocoding');
      return null;
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
      return {
        address: placeName,
        coordinates: [lng, lat] as [number, number],
        formattedAddress: placeName
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding location:', error);
    return null;
  }
};

/**
 * Parses a location string into coordinates and name
 */
export const parseInitialLocation = (locationStr: string, inConsoleOperation = false): {
  lng: number;
  lat: number;
  name: string;
} => {
  try {
    if (inConsoleOperation) return { lng: 55.2708, lat: 25.2048, name: '' };
    
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
};

/**
 * Updates the privacy circle on the map
 */
export const updatePrivacyCircle = (
  map: mapboxgl.Map,
  circleRef: React.MutableRefObject<mapboxgl.GeoJSONSource | null>,
  circleLayerAddedRef: React.MutableRefObject<boolean>,
  lng: number,
  lat: number
): void => {
  if (!map || !map.isStyleLoaded()) {
    return;
  }
  
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
};

/**
 * Sets up map features like marker and privacy circle
 */
export const setupMapFeatures = (
  map: mapboxgl.Map,
  markerRef: React.MutableRefObject<mapboxgl.Marker | null>,
  circleRef: React.MutableRefObject<mapboxgl.GeoJSONSource | null>,
  circleLayerAddedRef: React.MutableRefObject<boolean>,
  lng: number,
  lat: number,
  mapStyleLoaded: boolean,
  geocodeCallback: (lng: number, lat: number) => void
): void => {
  // Add marker
  if (markerRef.current) {
    markerRef.current.remove();
  }
  
  markerRef.current = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);
  
  // Add privacy circle only if map style is loaded
  if (mapStyleLoaded && map.isStyleLoaded()) {
    updatePrivacyCircle(map, circleRef, circleLayerAddedRef, lng, lat);
  }
  
  // Geocode the location
  geocodeCallback(lng, lat);
};
