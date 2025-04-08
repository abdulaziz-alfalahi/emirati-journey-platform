
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Personal } from '../types';

interface PersonalInfoFieldsProps {
  data: Personal;
  onChange: (data: Personal) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  data,
  onChange
}) => {
  // Create a safe data object with fallbacks for nullish values
  const safeData = {
    fullName: data?.fullName || '',
    jobTitle: data?.jobTitle || '',
    email: data?.email || '',
    phone: data?.phone || '',
    location: data?.location || '',
    linkedin: data?.linkedin || '',
    website: data?.website || '',
    ...data
  };

  const handleInputChange = (field: keyof Personal) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(`Updating ${field} to:`, value);
    
    const updatedData = {
      ...safeData,
      [field]: value
    };
    
    onChange(updatedData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={safeData.fullName}
            onChange={handleInputChange('fullName')}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={safeData.jobTitle}
            onChange={handleInputChange('jobTitle')}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={safeData.email}
            onChange={handleInputChange('email')}
            placeholder="john.doe@example.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={safeData.phone}
            onChange={handleInputChange('phone')}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={safeData.location}
          onChange={handleInputChange('location')}
          placeholder="San Francisco, CA"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            value={safeData.linkedin}
            onChange={handleInputChange('linkedin')}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            value={safeData.website}
            onChange={handleInputChange('website')}
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFields;
