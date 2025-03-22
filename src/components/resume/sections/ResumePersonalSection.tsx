
import React from 'react';
import { PersonalInfo } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={data.location}
              onChange={handleChange}
              placeholder="e.g., Dubai, UAE"
            />
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
          
          <div className="space-y-2 md:col-span-2">
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
