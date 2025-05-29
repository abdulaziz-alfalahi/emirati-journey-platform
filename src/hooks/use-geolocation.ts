
import { useState, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useMobileDetection } from './use-mobile-detection';
import { toast } from 'sonner';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
}

export const useGeolocation = () => {
  const { isCapacitor } = useMobileDetection();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LocationCoordinates | null>(null);

  const getCurrentPosition = useCallback(async (): Promise<LocationCoordinates | null> => {
    setIsLoading(true);
    try {
      let position;
      
      if (isCapacitor) {
        position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        });
      } else {
        // Fallback to web geolocation
        position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000
          });
        });
      }

      const coords: LocationCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude || undefined,
        speed: position.coords.speed || undefined,
        heading: position.coords.heading || undefined
      };

      setLocation(coords);
      return coords;
    } catch (error) {
      console.error('Geolocation error:', error);
      toast.error('Failed to get location');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isCapacitor]);

  const requestPermissions = useCallback(async () => {
    if (!isCapacitor) {
      // For web, permissions are handled by the browser
      return true;
    }

    try {
      const permissions = await Geolocation.requestPermissions();
      return permissions.location === 'granted';
    } catch (error) {
      console.error('Geolocation permission error:', error);
      return false;
    }
  }, [isCapacitor]);

  const watchPosition = useCallback((callback: (position: LocationCoordinates) => void) => {
    if (!isCapacitor) {
      // Fallback to web geolocation
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords: LocationCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          callback(coords);
        },
        (error) => console.error('Watch position error:', error),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }

    const watchId = Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 10000
    }, (position) => {
      if (position) {
        const coords: LocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        callback(coords);
      }
    });

    return () => {
      if (watchId) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
  }, [isCapacitor]);

  return {
    getCurrentPosition,
    requestPermissions,
    watchPosition,
    location,
    isLoading,
    isAvailable: isCapacitor || 'geolocation' in navigator
  };
};
