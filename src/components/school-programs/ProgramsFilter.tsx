
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter } from 'lucide-react';
import { ProgramFilters } from '@/types/schoolPrograms';

interface ProgramsFilterProps {
  selectedFilters: ProgramFilters;
  searchQuery: string;
  onFilterChange: (filters: ProgramFilters) => void;
  onSearchChange: (query: string) => void;
}

const ProgramsFilter: React.FC<ProgramsFilterProps> = ({
  selectedFilters,
  searchQuery,
  onFilterChange,
  onSearchChange
}) => {
  const gradeLevels = ['Elementary', 'Middle School', 'High School', 'All Grades'];
  const subjectAreas = ['STEM', 'Languages', 'Arts', 'Business', 'Sports', 'Music', 'Science', 'Mathematics'];
  const programTypes = ['After School', 'Weekend', 'Summer', 'Holiday', 'Online', 'Intensive'];
  const institutions = ['Dubai International School', 'Emirates Heritage Academy', 'Business Leaders Academy', 'Science Innovation Center'];

  const handleFilterChange = (filterType: keyof ProgramFilters, value: string, checked: boolean) => {
    const currentValues = selectedFilters[filterType] as string[] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFilterChange({
      ...selectedFilters,
      [filterType]: newValues
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search">Search Programs</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title, institution..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Grade Level */}
        <div>
          <Label className="text-sm font-medium">Grade Level</Label>
          <div className="mt-2 space-y-2">
            {gradeLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`grade-${level}`}
                  checked={selectedFilters.gradeLevel?.includes(level) || false}
                  onCheckedChange={(checked) => 
                    handleFilterChange('gradeLevel', level, checked as boolean)
                  }
                />
                <Label htmlFor={`grade-${level}`} className="text-sm">
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Area */}
        <div>
          <Label className="text-sm font-medium">Subject Area</Label>
          <div className="mt-2 space-y-2">
            {subjectAreas.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={selectedFilters.subjectArea?.includes(subject) || false}
                  onCheckedChange={(checked) => 
                    handleFilterChange('subjectArea', subject, checked as boolean)
                  }
                />
                <Label htmlFor={`subject-${subject}`} className="text-sm">
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Program Type */}
        <div>
          <Label className="text-sm font-medium">Program Type</Label>
          <div className="mt-2 space-y-2">
            {programTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedFilters.programType?.includes(type) || false}
                  onCheckedChange={(checked) => 
                    handleFilterChange('programType', type, checked as boolean)
                  }
                />
                <Label htmlFor={`type-${type}`} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Institution */}
        <div>
          <Label className="text-sm font-medium">Institution</Label>
          <div className="mt-2 space-y-2">
            {institutions.map((institution) => (
              <div key={institution} className="flex items-center space-x-2">
                <Checkbox
                  id={`inst-${institution}`}
                  checked={selectedFilters.institution?.includes(institution) || false}
                  onCheckedChange={(checked) => 
                    handleFilterChange('institution', institution, checked as boolean)
                  }
                />
                <Label htmlFor={`inst-${institution}`} className="text-sm text-xs">
                  {institution}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramsFilter;
