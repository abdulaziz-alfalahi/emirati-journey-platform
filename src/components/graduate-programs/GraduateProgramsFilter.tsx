
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
}

interface GraduateProgramsFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  universities: string[];
  degreeLevels: string[];
  fieldsOfStudy: string[];
}

const GraduateProgramsFilter: React.FC<GraduateProgramsFilterProps> = ({
  filters,
  onFilterChange,
  universities,
  degreeLevels,
  fieldsOfStudy,
}) => {
  const handleClearFilters = () => {
    onFilterChange({
      search: '',
      university: '',
      degreeLevel: '',
      fieldOfStudy: '',
    });
  };

  const hasActiveFilters = filters.search || filters.university || filters.degreeLevel || filters.fieldOfStudy;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filter Programs</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-8 px-2 lg:px-3"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search Programs
          </Label>
          <Input
            id="search"
            placeholder="Search by program name..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">University</Label>
          <Select
            value={filters.university}
            onValueChange={(value) => onFilterChange({ ...filters, university: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All Universities" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="all">All Universities</SelectItem>
              {universities.map((university) => (
                <SelectItem key={university} value={university}>
                  {university}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Degree Level</Label>
          <Select
            value={filters.degreeLevel}
            onValueChange={(value) => onFilterChange({ ...filters, degreeLevel: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="all">All Levels</SelectItem>
              {degreeLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Field of Study</Label>
          <Select
            value={filters.fieldOfStudy}
            onValueChange={(value) => onFilterChange({ ...filters, fieldOfStudy: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="all">All Fields</SelectItem>
              {fieldsOfStudy.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraduateProgramsFilter;
