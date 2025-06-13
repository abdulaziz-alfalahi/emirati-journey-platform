
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { SearchInput } from '@/components/ui/search-input';
import { useDebouncedFilters } from '@/hooks/use-debounced-search';
import { useSearchAnalytics } from '@/services/searchAnalytics';
import type { TrainingFilters as TrainingFiltersType } from '@/types/training';

interface TrainingFiltersProps {
  filters: TrainingFiltersType;
  onFiltersChange: (filters: TrainingFiltersType) => void;
  onClearFilters: () => void;
}

export const TrainingFilters: React.FC<TrainingFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const { trackSearch, trackFilter } = useSearchAnalytics('TrainingFilters');
  
  const { debouncedFilters, isUpdating, batchUpdateFilters } = useDebouncedFilters(
    filters,
    350,
    (newFilters) => {
      onFiltersChange(newFilters);
      
      // Track analytics
      const changedKeys = Object.keys(newFilters).filter(key => 
        newFilters[key as keyof TrainingFiltersType] !== filters[key as keyof TrainingFiltersType]
      );
      
      if (changedKeys.includes('search')) {
        trackSearch(newFilters.search || '', 0, 0, false);
      }
      
      if (changedKeys.length > 0) {
        trackFilter(changedKeys.length, changedKeys.length, 350);
      }
    }
  );

  const handleFilterChange = (key: keyof TrainingFiltersType, value: any) => {
    batchUpdateFilters({ [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== null
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Programs
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Programs</Label>
          <SearchInput
            placeholder="Search by title or description..."
            value={filters.search || ''}
            onChange={(value) => handleFilterChange('search', value)}
            debounceDelay={350}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            value={filters.category || ''} 
            onValueChange={(value) => handleFilterChange('category', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="technical_skills">Technical Skills</SelectItem>
              <SelectItem value="trade_skills">Trade Skills</SelectItem>
              <SelectItem value="service_skills">Service Skills</SelectItem>
              <SelectItem value="entrepreneurship_business">Business & Entrepreneurship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Training Mode */}
        <div className="space-y-2">
          <Label>Training Mode</Label>
          <Select 
            value={filters.training_mode || ''} 
            onValueChange={(value) => handleFilterChange('training_mode', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Modes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Modes</SelectItem>
              <SelectItem value="in_person">In-Person</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Certification Offered */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="certification"
            checked={filters.certification_offered || false}
            onCheckedChange={(checked) => 
              handleFilterChange('certification_offered', checked ? true : undefined)
            }
          />
          <Label htmlFor="certification" className="text-sm font-normal">
            Certificate upon completion
          </Label>
        </div>

        {/* Job Placement Assistance */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="job-placement"
            checked={filters.job_placement_assistance || false}
            onCheckedChange={(checked) => 
              handleFilterChange('job_placement_assistance', checked ? true : undefined)
            }
          />
          <Label htmlFor="job-placement" className="text-sm font-normal">
            Job placement assistance
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};
