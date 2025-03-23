
import React, { useState, useEffect, useCallback } from 'react';
import { PersonalInfo } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LocationMap from '../LocationMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ResumePersonalSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const ResumePersonalSection: React.FC<ResumePersonalSectionProps> = ({ data, onChange }) => {
  const [locationTab, setLocationTab] = useState<string>(data.coordinates ? 'map' : 'text');
  const [locationInfo, setLocationInfo] = useState<{
    address: string;
    coordinates?: [number, number];
    formattedAddress: string;
  }>({
    address: data.location || '',
    coordinates: data.coordinates || undefined,
    formattedAddress: data.location || ''
  });
  
  // Add key state to force remount of the map component when tab changes
  const [mapKey, setMapKey] = useState<number>(0);

  useEffect(() => {
    if (
      data.location !== locationInfo.formattedAddress || 
      JSON.stringify(data.coordinates) !== JSON.stringify(locationInfo.coordinates)
    ) {
      setLocationInfo({
        address: data.location || '',
        coordinates: data.coordinates || undefined,
        formattedAddress: data.location || ''
      });
      
      if (data.coordinates && locationTab === 'text') {
        setLocationTab('map');
        // Force map remount
        setMapKey(prev => prev + 1);
      } else if (!data.coordinates && locationTab === 'map') {
        setLocationTab('text');
      }
    }
  }, [data.location, data.coordinates, locationInfo.formattedAddress, locationInfo.coordinates, locationTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'location') {
      const newLocationInfo = {
        ...locationInfo,
        address: value,
        formattedAddress: value
      };
      
      if (locationTab === 'text') {
        newLocationInfo.coordinates = undefined;
      }
      
      setLocationInfo(newLocationInfo);
      
      onChange({
        ...data,
        location: value,
        coordinates: locationTab === 'text' ? undefined : locationInfo.coordinates
      });
      
      return;
    }
    
    onChange({
      ...data,
      [name]: value
    });
  };

  const handleLocationSelect = useCallback((locationData: { 
    address: string; 
    coordinates: [number, number]; 
    formattedAddress: string;
  }) => {
    console.log('Location selected:', locationData);
    
    setLocationInfo(locationData);
    
    onChange({
      ...data,
      location: locationData.formattedAddress,
      coordinates: locationData.coordinates
    });
    
    toast.success("Location selected", {
      description: `Selected: ${locationData.formattedAddress}`,
      duration: 3000,
    });
  }, [data, onChange]);

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
      
      onChange({
        ...data,
        location: locationInfo.formattedAddress,
        coordinates: undefined
      });
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
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="e.g., Mohammed Al Mansoori"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={data.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="e.g., mohammed@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="e.g., +971 50 123 4567"
            />
          </div>
          
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
                  onChange={handleChange}
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
          
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={data.linkedin || ''}
              onChange={handleChange}
              placeholder="e.g., linkedin.com/in/mohammedalmansoori"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              name="website"
              value={data.website || ''}
              onChange={handleChange}
              placeholder="e.g., mohammedalmansoori.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePersonalSection;
