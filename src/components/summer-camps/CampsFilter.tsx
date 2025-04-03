
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { CampFilters } from '@/types/summerCamps';

interface CampsFilterProps {
  onFilterChange: (filters: CampFilters) => void;
  onSearchChange: (query: string) => void;
  selectedFilters: CampFilters;
  searchQuery: string;
}

const categories = [
  { id: 'technology', label: 'Technology' },
  { id: 'science', label: 'Science' },
  { id: 'arts', label: 'Arts' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'sports', label: 'Sports' },
];

const ageGroups = [
  { id: '6-9', label: '6-9 years' },
  { id: '8-14', label: '8-14 years' },
  { id: '10-16', label: '10-16 years' },
  { id: '10-18', label: '10-18 years' },
  { id: '12-16', label: '12-16 years' },
  { id: '14-18', label: '14-18 years' },
];

const locations = [
  { id: 'abu-dhabi', label: 'Abu Dhabi' },
  { id: 'dubai', label: 'Dubai' },
  { id: 'sharjah', label: 'Sharjah' },
  { id: 'ajman', label: 'Ajman' },
  { id: 'rak', label: 'Ras Al Khaimah' },
];

const CampsFilter: React.FC<CampsFilterProps> = ({ 
  onFilterChange, 
  onSearchChange, 
  selectedFilters, 
  searchQuery 
}) => {
  
  const handleCategoryChange = (category: string) => {
    const currentCategories = selectedFilters.category || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    onFilterChange({
      ...selectedFilters,
      category: newCategories.length > 0 ? newCategories : undefined,
    });
  };
  
  const handleAgeGroupChange = (ageGroup: string) => {
    const currentAgeGroups = selectedFilters.ageGroup || [];
    const newAgeGroups = currentAgeGroups.includes(ageGroup)
      ? currentAgeGroups.filter(a => a !== ageGroup)
      : [...currentAgeGroups, ageGroup];
    
    onFilterChange({
      ...selectedFilters,
      ageGroup: newAgeGroups.length > 0 ? newAgeGroups : undefined,
    });
  };
  
  const handleLocationChange = (location: string) => {
    const currentLocations = selectedFilters.location || [];
    const newLocations = currentLocations.includes(location)
      ? currentLocations.filter(l => l !== location)
      : [...currentLocations, location];
    
    onFilterChange({
      ...selectedFilters,
      location: newLocations.length > 0 ? newLocations : undefined,
    });
  };
  
  const handleReset = () => {
    onFilterChange({});
    onSearchChange('');
  };
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search camps..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Filter Camps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={(selectedFilters.category || []).includes(category.label)}
                      onCheckedChange={() => handleCategoryChange(category.label)}
                    />
                    <Label 
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Age Groups</h3>
              <div className="space-y-2">
                {ageGroups.map((ageGroup) => (
                  <div key={ageGroup.id} className="flex items-center">
                    <Checkbox 
                      id={`age-${ageGroup.id}`} 
                      checked={(selectedFilters.ageGroup || []).includes(ageGroup.id)}
                      onCheckedChange={() => handleAgeGroupChange(ageGroup.id)}
                    />
                    <Label 
                      htmlFor={`age-${ageGroup.id}`}
                      className="ml-2 text-sm"
                    >
                      {ageGroup.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Locations</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center">
                    <Checkbox 
                      id={`location-${location.id}`} 
                      checked={(selectedFilters.location || []).includes(location.label)}
                      onCheckedChange={() => handleLocationChange(location.label)}
                    />
                    <Label 
                      htmlFor={`location-${location.id}`}
                      className="ml-2 text-sm"
                    >
                      {location.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampsFilter;
