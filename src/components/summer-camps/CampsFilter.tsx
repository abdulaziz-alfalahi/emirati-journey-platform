
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { CampFilters } from '@/types/summerCamps';
import { Search, Filter, X } from 'lucide-react';

interface CampsFilterProps {
  filters: CampFilters;
  onFiltersChange: (filters: CampFilters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = [
  'Sports',
  'Arts & Crafts',
  'Science & Technology',
  'Adventure',
  'Language',
  'Music',
  'Drama',
  'Leadership'
];

const ageGroups = [
  '5-7 years',
  '8-10 years',
  '11-13 years',
  '14-16 years',
  '17+ years'
];

const locations = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
];

const CampsFilter: React.FC<CampsFilterProps> = ({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = Array.isArray(filters.category) ? filters.category : [];
    const newCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      category: newCategories
    });
  };

  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    const currentAgeGroups = Array.isArray(filters.ageGroup) ? filters.ageGroup : [];
    const newAgeGroups = checked
      ? [...currentAgeGroups, ageGroup]
      : currentAgeGroups.filter(ag => ag !== ageGroup);
    
    onFiltersChange({
      ...filters,
      ageGroup: newAgeGroups
    });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const currentLocations = Array.isArray(filters.location) ? filters.location : [];
    const newLocations = checked
      ? [...currentLocations, location]
      : currentLocations.filter(l => l !== location);
    
    onFiltersChange({
      ...filters,
      location: newLocations
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const hasActiveFilters = () => {
    return (
      searchQuery ||
      (Array.isArray(filters.category) && filters.category.length > 0) ||
      (Array.isArray(filters.ageGroup) && filters.ageGroup.length > 0) ||
      (Array.isArray(filters.location) && filters.location.length > 0) ||
      filters.priceRange ||
      filters.dateRange
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters() && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search camps..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {isExpanded && (
          <>
            {/* Categories */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={Array.isArray(filters.category) && filters.category.includes(category)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Groups */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Age Groups</Label>
              <div className="space-y-2">
                {ageGroups.map((ageGroup) => (
                  <div key={ageGroup} className="flex items-center space-x-2">
                    <Checkbox
                      id={`age-${ageGroup}`}
                      checked={Array.isArray(filters.ageGroup) && filters.ageGroup.includes(ageGroup)}
                      onCheckedChange={(checked) => 
                        handleAgeGroupChange(ageGroup, checked as boolean)
                      }
                    />
                    <Label htmlFor={`age-${ageGroup}`} className="text-sm">
                      {ageGroup}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Locations</Label>
              <div className="grid grid-cols-2 gap-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={Array.isArray(filters.location) && filters.location.includes(location)}
                      onCheckedChange={(checked) => 
                        handleLocationChange(location, checked as boolean)
                      }
                    />
                    <Label htmlFor={`location-${location}`} className="text-sm">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Active filters display */}
        {hasActiveFilters() && (
          <div className="pt-3 border-t">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(filters.category) && filters.category.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleCategoryChange(category, false)}
                  />
                </Badge>
              ))}
              {Array.isArray(filters.ageGroup) && filters.ageGroup.map((ageGroup) => (
                <Badge key={ageGroup} variant="secondary" className="text-xs">
                  {ageGroup}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleAgeGroupChange(ageGroup, false)}
                  />
                </Badge>
              ))}
              {Array.isArray(filters.location) && filters.location.map((location) => (
                <Badge key={location} variant="secondary" className="text-xs">
                  {location}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleLocationChange(location, false)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CampsFilter;
