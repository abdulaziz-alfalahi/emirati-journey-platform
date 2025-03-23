
import React, { useState, useEffect } from 'react';
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
  
  // Update parent data when locationInfo changes
  useEffect(() => {
    // Only update if there are changes to avoid infinite loops
    const locationChanged = data.location !== locationInfo.formattedAddress;
    const coordinatesChanged = 
      JSON.stringify(data.coordinates) !== JSON.stringify(locationInfo.coordinates);
    
    if (locationChanged || coordinatesChanged) {
      onChange({
        ...data,
        location: locationInfo.formattedAddress,
        coordinates: locationInfo.coordinates
      });
    }
  }, [locationInfo, data, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle location text input separately
    if (name === 'location') {
      setLocationInfo(prev => ({
        ...prev,
        address: value,
        formattedAddress: value
      }));
      
      // Clear coordinates if entering location manually
      if (locationTab === 'text') {
        setLocationInfo(prev => ({
          ...prev,
          coordinates: undefined
        }));
      }
      return;
    }
    
    onChange({
      ...data,
      [name]: value
    });
  };

  const handleLocationSelect = (locationData: { 
    address: string; 
    coordinates: [number, number]; 
    formattedAddress: string;
  }) => {
    console.log('Location selected:', locationData);
    
    // Update local state first
    setLocationInfo(locationData);
    
    toast.success("Location selected", {
      description: `Selected: ${locationData.formattedAddress}`,
      duration: 3000,
    });
  };

  // When switching to map tab, ensure we have the latest data
  const handleTabChange = (value: string) => {
    setLocationTab(value);
    
    // If switching to text tab, use the formatted address in the text input
    if (value === 'text' && locationInfo.formattedAddress) {
      setLocationInfo(prev => ({
        ...prev,
        address: locationInfo.formattedAddress
      }));
    }
  };

  // Prepare location string for the map component
  const getLocationStringForMap = () => {
    if (data.coordinates) {
      return JSON.stringify({
        longitude: data.coordinates[0],
        latitude: data.coordinates[1],
        name: data.location
      });
    }
    return data.location || '';
  };

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
                  initialLocation={getLocationStringForMap()}
                  onLocationSelect={handleLocationSelect}
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
