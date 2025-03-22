
import React, { useState } from 'react';
import { PersonalInfo } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LocationMap from '../LocationMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ResumePersonalSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const ResumePersonalSection: React.FC<ResumePersonalSectionProps> = ({ data, onChange }) => {
  const [locationTab, setLocationTab] = useState<string>(data.coordinates ? 'map' : 'text');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
    onChange({
      ...data,
      location: locationData.formattedAddress,
      coordinates: locationData.coordinates
    });
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
            <Tabs value={locationTab} onValueChange={setLocationTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Enter Manually</TabsTrigger>
                <TabsTrigger value="map">Select on Map</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-2">
                <Input
                  id="location"
                  name="location"
                  value={data.location}
                  onChange={handleChange}
                  placeholder="e.g., Dubai, UAE"
                />
              </TabsContent>
              <TabsContent value="map" className="mt-2">
                <p className="text-sm text-gray-500 mb-2">
                  Selecting your residence area on the map will help us provide you with commute details to potential vacancies while protecting your privacy.
                </p>
                <LocationMap 
                  initialLocation={data.location}
                  onLocationSelect={handleLocationSelect}
                />
                <Input
                  id="location"
                  name="location"
                  value={data.location}
                  onChange={handleChange}
                  className="mt-2"
                  placeholder="Location will be updated when selected on map"
                  readOnly
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
