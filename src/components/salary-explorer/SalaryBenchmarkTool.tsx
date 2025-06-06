
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp } from 'lucide-react';

export const SalaryBenchmarkTool: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  const benchmarkData = {
    'software-engineer': {
      'dubai': { junior: 12000, mid: 18000, senior: 28000 },
      'abu-dhabi': { junior: 11000, mid: 17000, senior: 26000 },
      'sharjah': { junior: 9000, mid: 14000, senior: 22000 }
    },
    'data-scientist': {
      'dubai': { junior: 15000, mid: 22000, senior: 35000 },
      'abu-dhabi': { junior: 14000, mid: 20000, senior: 32000 },
      'sharjah': { junior: 11000, mid: 17000, senior: 27000 }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-ehrdc-teal" />
            Salary Benchmark Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software-engineer">Software Engineer</SelectItem>
                <SelectItem value="data-scientist">Data Scientist</SelectItem>
                <SelectItem value="product-manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior (6+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
            Generate Benchmark Report
          </Button>

          {selectedRole && selectedLocation && selectedExperience && (
            <Card className="border-2 border-ehrdc-teal">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-ehrdc-teal">
                    AED {benchmarkData[selectedRole as keyof typeof benchmarkData]?.[selectedLocation as keyof typeof benchmarkData['software-engineer']]?.[selectedExperience as keyof typeof benchmarkData['software-engineer']['dubai']]?.toLocaleString() || 'N/A'}
                  </h3>
                  <p className="text-muted-foreground">Monthly Salary Range</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Market Position</span>
                    <span className="font-medium">75th Percentile</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
