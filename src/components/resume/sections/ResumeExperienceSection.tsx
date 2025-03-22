
import React, { useState } from 'react';
import { WorkExperience } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';

interface ResumeExperienceSectionProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

const ResumeExperienceSection: React.FC<ResumeExperienceSectionProps> = ({ experiences, onChange }) => {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      current: false,
      description: ''
    };
    
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    onChange(updatedExperiences);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    onChange(updatedExperiences);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button variant="outline" size="sm" onClick={addExperience}>
          <Plus size={16} className="mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent>
        {experiences.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No work experience added. Click "Add Experience" to get started.
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="p-4 border rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-medium mb-4">Position {index + 1}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeExperience(index)}
                    className="text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                      id={`company-${index}`}
                      value={experience.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="e.g., Abu Dhabi National Oil Company"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input
                      id={`position-${index}`}
                      value={experience.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      placeholder="e.g., Digital Transformation Manager"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location (Optional)</Label>
                    <Input
                      id={`location-${index}`}
                      value={experience.location || ''}
                      onChange={(e) => updateExperience(index, 'location', e.target.value)}
                      placeholder="e.g., Abu Dhabi, UAE"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <Switch
                      id={`current-${index}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        updateExperience(index, 'current', checked);
                        if (checked) {
                          updateExperience(index, 'endDate', undefined);
                        }
                      }}
                    />
                    <Label htmlFor={`current-${index}`}>I currently work here</Label>
                  </div>
                  
                  {!experience.current && (
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        type="month"
                        value={experience.endDate || ''}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description-${index}`}>Job Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={experience.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements in this role"
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeExperienceSection;
