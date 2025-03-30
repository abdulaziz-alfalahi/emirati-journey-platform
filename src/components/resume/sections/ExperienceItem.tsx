
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUp, ArrowDown, Trash } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceItemProps {
  experience: Experience;
  onChange: (experience: Experience) => void;
  onRemove: (id: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (field: keyof Experience, value: any) => {
    onChange({
      ...experience,
      [field]: value
    });
  };

  const handleCurrentChange = (checked: boolean) => {
    onChange({
      ...experience,
      current: checked,
      endDate: checked ? null : experience.endDate
    });
  };

  return (
    <Card className="relative">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-medium">{experience.position || 'New Position'}</h4>
            <p className="text-sm text-muted-foreground">{experience.company || 'Company Name'}</p>
          </div>
          <div className="space-x-1">
            {onMoveUp && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMoveUp}
                title="Move up"
              >
                <ArrowUp size={16} />
              </Button>
            )}
            {onMoveDown && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMoveDown}
                title="Move down"
              >
                <ArrowDown size={16} />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onRemove(experience.id)}
              title="Remove"
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`position-${experience.id}`}>Position</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div>
                <Label htmlFor={`company-${experience.id}`}>Company</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`location-${experience.id}`}>Location (Optional)</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  value={experience.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.current || false}
                    onCheckedChange={(checked) => handleCurrentChange(checked === true)}
                  />
                  <Label htmlFor={`current-${experience.id}`}>
                    I currently work here
                  </Label>
                </div>
                {!experience.current && (
                  <Input
                    id={`endDate-${experience.id}`}
                    value={experience.endDate || ''}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${experience.id}`}>Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your responsibilities and achievements"
                rows={4}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceItem;
