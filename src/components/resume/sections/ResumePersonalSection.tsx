
import React from 'react';
import { PersonalInfo } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInfoFields from './PersonalInfoFields';
import LocationSelector from './LocationSelector';

interface ResumePersonalSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const ResumePersonalSection: React.FC<ResumePersonalSectionProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    onChange({
      ...data,
      [name]: value
    });
  };

  const handleLocationChange = (location: string, coordinates?: [number, number]) => {
    // Make sure the data being passed is cloneable (no complex objects)
    try {
      // Using JSON.stringify/parse to ensure only serializable data is passed
      const safeLocation = location ? JSON.parse(JSON.stringify(location)) : location;
      const safeCoordinates = coordinates ? JSON.parse(JSON.stringify(coordinates)) : coordinates;
      
      onChange({
        ...data,
        location: safeLocation,
        coordinates: safeCoordinates
      });
    } catch (error) {
      console.error("Error processing location data:", error);
      // Fallback to just updating the location string
      onChange({
        ...data,
        location
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalInfoFields 
            data={data} 
            onChange={handleChange} 
          />
          
          <LocationSelector 
            location={data.location} 
            coordinates={data.coordinates}
            onLocationChange={handleLocationChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePersonalSection;
