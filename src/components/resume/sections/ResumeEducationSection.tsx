
import React from 'react';
import { Education } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';

interface ResumeEducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const ResumeEducationSection: React.FC<ResumeEducationSectionProps> = ({ education, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      current: false
    };
    
    onChange([...education, newEducation]);
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    onChange(updatedEducation);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    onChange(updatedEducation);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button variant="outline" size="sm" onClick={addEducation}>
          <Plus size={16} className="mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent>
        {education.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No education added. Click "Add Education" to get started.
          </div>
        ) : (
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={edu.id} className="p-4 border rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-medium mb-4">Education {index + 1}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeEducation(index)}
                    className="text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                    <Input
                      id={`institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="e.g., Khalifa University"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="e.g., Bachelor of Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`field-${index}`}>Field of Study</Label>
                    <Input
                      id={`field-${index}`}
                      value={edu.field}
                      onChange={(e) => updateEducation(index, 'field', e.target.value)}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location (Optional)</Label>
                    <Input
                      id={`location-${index}`}
                      value={edu.location || ''}
                      onChange={(e) => updateEducation(index, 'location', e.target.value)}
                      placeholder="e.g., Abu Dhabi, UAE"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <Switch
                      id={`current-${index}`}
                      checked={edu.current}
                      onCheckedChange={(checked) => {
                        updateEducation(index, 'current', checked);
                        if (checked) {
                          updateEducation(index, 'endDate', undefined);
                        }
                      }}
                    />
                    <Label htmlFor={`current-${index}`}>I am currently studying here</Label>
                  </div>
                  
                  {!edu.current && (
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        type="month"
                        value={edu.endDate || ''}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={edu.description || ''}
                      onChange={(e) => updateEducation(index, 'description', e.target.value)}
                      placeholder="Additional information about your studies, achievements, etc."
                      className="min-h-[80px]"
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

export default ResumeEducationSection;
