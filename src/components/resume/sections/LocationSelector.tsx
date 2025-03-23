import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LocationMap from '../LocationMap';
import { toast } from 'sonner';
import { LocationData } from '../types/location';

interface LocationSelectorProps {
  location: string;
  coordinates?: [number, number];
  onLocationChange: (location: string, coordinates?: [number, number]) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  location, 
  coordinates, 
  onLocationChange 
}) => {
  const [locationTab, setLocationTab] = useState<string>(coordinates ? 'map' : 'text');
  const [locationInfo, setLocationInfo] = useState<{
    address: string;
    coordinates?: [number, number]; 
    formattedAddress: string;
  }>({
    address: location || '',
    coordinates: coordinates ? [coordinates[0], coordinates[1]] : undefined, // Ensure it's a proper tuple
    formattedAddress: location || ''
  });
  
  // Add key state to force remount of the map component when tab changes
  const [mapKey, setMapKey] = useState<number>(0);

  useEffect(() => {
    // Create a new copy of coordinates to ensure it's a proper tuple
    const newCoords = coordinates ? [coordinates[0], coordinates[1]] as [number, number] : undefined;
    
    if (
      location !== locationInfo.formattedAddress || 
      JSON.stringify(newCoords) !== JSON.stringify(locationInfo.coordinates)
    ) {
      setLocationInfo({
        address: location || '',
        coordinates: newCoords,
        formattedAddress: location || ''
      });
      
      if (coordinates && locationTab === 'text') {
        setLocationTab('map');
        // Force map remount
        setMapKey(prev => prev + 1);
      } else if (!coordinates && locationTab === 'map') {
        setLocationTab('text');
      }
    }
  }, [location, coordinates, locationInfo.formattedAddress, locationInfo.coordinates, locationTab]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const newLocationInfo = {
      ...locationInfo,
      address: value,
      formattedAddress: value
    };
    
    if (locationTab === 'text') {
      newLocationInfo.coordinates = undefined;
    }
    
    setLocationInfo(newLocationInfo);
    
    onLocationChange(
      value,
      locationTab === 'text' ? undefined : locationInfo.coordinates
    );
  };

  const handleLocationSelect = useCallback((locationData: LocationData) => {
    console.log('Location selected:', locationData);
    
    // Ensure we're working with a properly typed tuple for coordinates
    if (!Array.isArray(locationData.coordinates) || locationData.coordinates.length !== 2) {
      console.error('Invalid coordinates format:', locationData.coordinates);
      return;
    }
    
    // Create a new object with proper tuple typing for coordinates
    const serializedLocation = {
      address: locationData.address,
      coordinates: [locationData.coordinates[0], locationData.coordinates[1]] as [number, number],
      formattedAddress: locationData.formattedAddress
    };
    
    setLocationInfo(serializedLocation);
    
    onLocationChange(
      serializedLocation.formattedAddress,
      serializedLocation.coordinates
    );
    
    toast.success("Location selected", {
      description: `Selected: ${locationData.formattedAddress}`,
      duration: 3000,
    });
  }, [onLocationChange]);

  const handleTabChange = (value: string) => {
    console.log('Tab changed to:', value);
    
    // Force map remount when switching to map tab
    if (value === 'map') {
      setMapKey(prev => prev + 1);
    }
    
    setLocationTab(value);
    
    if (value === 'text' && locationInfo.formattedAddress && locationTab === 'map') {
      const newLocationInfo = {
        ...locationInfo,
        address: locationInfo.formattedAddress,
      };
      
      setLocationInfo(newLocationInfo);
      
      onLocationChange(
        locationInfo.formattedAddress,
        undefined
      );
    }
  };

  const getLocationStringForMap = useCallback(() => {
    if (locationInfo.coordinates) {
      return JSON.stringify({
        longitude: locationInfo.coordinates[0],
        latitude: locationInfo.coordinates[1],
        name: locationInfo.formattedAddress
      });
    }
    return locationInfo.formattedAddress || '';
  }, [locationInfo.coordinates, locationInfo.formattedAddress]);

  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="location">Location</Label>
      <Tabs value={locationTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Enter Manually</TabsTrigger>
          <TabsTrigger value="map">Select on Map</TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="mt-2">
          <Input
            id="location"
            name="location"
            value={locationInfo.address}
            onChange={handleAddressChange}
            placeholder="e.g., Dubai, UAE"
          />
        </TabsContent>
        <TabsContent value="map" className="mt-2">
          <p className="text-sm text-gray-500 mb-2">
            Selecting your residence area on the map will help us provide you with commute details to potential vacancies while protecting your privacy.
          </p>
          <LocationMap 
            key={`map-${mapKey}`}
            initialLocation={getLocationStringForMap()}
            onLocationSelect={handleLocationSelect}
            persistentCircle={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationSelector;
