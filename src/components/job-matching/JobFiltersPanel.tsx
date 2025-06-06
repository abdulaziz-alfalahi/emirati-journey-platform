
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, MapPin, DollarSign, Clock, Building } from 'lucide-react';

export const JobFiltersPanel: React.FC = () => {
  const [salaryRange, setSalaryRange] = useState([5000, 25000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const locations = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];
  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Tourism', 'Real Estate', 'Energy'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-ehrdc-teal" />
          Job Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Keyword Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Keywords</label>
          <Input placeholder="Job title, skills, company..." />
        </div>

        {/* Location Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Salary Range (AED)
          </label>
          <Slider
            value={salaryRange}
            onValueChange={setSalaryRange}
            max={50000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>AED {salaryRange[0].toLocaleString()}</span>
            <span>AED {salaryRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Job Type
          </label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <label htmlFor={type} className="text-sm">{type}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Building className="h-4 w-4" />
            Industry
          </label>
          <div className="space-y-2">
            {industries.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox id={industry} />
                <label htmlFor={industry} className="text-sm">{industry}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filters */}
        <div className="space-y-2">
          <Button className="w-full bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full">
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
