
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface ScholarshipsFilterProps {
  selectedFilters: {
    providerType: string[];
    amount: [number | null, number | null];
  };
  searchQuery: string;
  onFilterChange: (filters: {
    providerType: string[];
    amount: [number | null, number | null];
  }) => void;
  onSearchChange: (query: string) => void;
}

export const ScholarshipsFilter: React.FC<ScholarshipsFilterProps> = ({
  selectedFilters,
  searchQuery,
  onFilterChange,
  onSearchChange
}) => {
  const providerTypes = [
    { id: 'government', label: 'Government' },
    { id: 'private_sector', label: 'Private Sector' },
    { id: 'university', label: 'University' }
  ];

  const handleProviderTypeChange = (id: string) => {
    let updatedTypes: string[];

    if (selectedFilters.providerType.includes(id)) {
      updatedTypes = selectedFilters.providerType.filter(type => type !== id);
    } else {
      updatedTypes = [...selectedFilters.providerType, id];
    }

    onFilterChange({
      ...selectedFilters,
      providerType: updatedTypes
    });
  };

  const handleAmountChange = (values: number[]) => {
    onFilterChange({
      ...selectedFilters,
      amount: [values[0] || null, values[1] || null]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filter Scholarships</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="search" className="text-sm font-medium">Search</Label>
            <Input
              id="search"
              placeholder="Search scholarships..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Provider Type</h3>
            <div className="space-y-2">
              {providerTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`provider-${type.id}`}
                    checked={selectedFilters.providerType.includes(type.id)}
                    onCheckedChange={() => handleProviderTypeChange(type.id)}
                  />
                  <Label 
                    htmlFor={`provider-${type.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Scholarship Amount (AED)</h3>
            <div className="pt-4 px-2">
              <Slider 
                defaultValue={[0, 100000]} 
                max={100000} 
                step={5000}
                onValueChange={handleAmountChange}
              />
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>0 AED</span>
                <span>100,000+ AED</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
