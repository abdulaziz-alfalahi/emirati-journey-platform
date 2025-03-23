
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LocationMap from '../LocationMap';
import { toast } from 'sonner';

interface LocationData {
  address: string;
  coordinates?: [number, number];
  formattedAddress: string;
}

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
  const [locationInfo, setLocationInfo] = useState<LocationData>({
    address: location || '',
    coordinates: coordinates ? [...coordinates] : undefined, // Create a new array to avoid referencing the original
    formattedAddress: location || ''
  });
  
  // Add key state to force remount of the map component when tab changes
  const [mapKey, setMapKey] = useState<number>(0);

  useEffect(() => {
    // Create a new copy of coordinates to ensure it's serializable
    const newCoords = coordinates ? [...coordinates] : undefined;
    
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

  const handleLocationSelect = useCallback((locationData: { 
    address: string; 
    coordinates: [number, number]; 
    formattedAddress: string;
  }) => {
    console.log('Location selected:', locationData);
    
    // Create a new object with new arrays to ensure it's serializable
    const serializedLocation: LocationData = {
      address: locationData.address,
      coordinates: [...locationData.coordinates], // Create a new array
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
