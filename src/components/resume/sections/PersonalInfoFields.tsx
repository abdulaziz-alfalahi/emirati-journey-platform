
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '../types';

interface PersonalInfoFieldsProps {
  data: PersonalInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ data, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={onChange}
            placeholder="e.g., Mohammed Al Mansoori"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={data.jobTitle}
            onChange={onChange}
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
            onChange={onChange}
            placeholder="e.g., mohammed@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={onChange}
            placeholder="e.g., +971 50 123 4567"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={onChange}
            placeholder="e.g., linkedin.com/in/mohammedalmansoori"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={data.website || ''}
            onChange={onChange}
            placeholder="e.g., mohammedalmansoori.com"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoFields;
