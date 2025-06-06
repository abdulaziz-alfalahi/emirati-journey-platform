
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GitCompare, Plus, X, TrendingUp, Users, Clock } from 'lucide-react';

export const CareerComparisonTool: React.FC = () => {
  const [selectedCareers, setSelectedCareers] = useState<string[]>(['software-engineer', 'data-scientist']);

  const careerOptions = [
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'ux-designer', label: 'UX Designer' },
    { value: 'marketing-manager', label: 'Marketing Manager' },
    { value: 'business-analyst', label: 'Business Analyst' }
  ];

  const careerData = {
    'software-engineer': {
      title: 'Software Engineer',
      avgSalary: 'AED 15,000',
      growthRate: '12%',
      jobAvailability: 'High',
      workLifeBalance: 75,
      skillsRequired: ['Programming', 'Problem Solving', 'Algorithms'],
      education: 'Bachelor\'s in Computer Science',
      experience: '2-5 years'
    },
    'data-scientist': {
      title: 'Data Scientist',
      avgSalary: 'AED 18,000',
      growthRate: '15%',
      jobAvailability: 'Very High',
      workLifeBalance: 70,
      skillsRequired: ['Statistics', 'Machine Learning', 'Python'],
      education: 'Master\'s in Data Science',
      experience: '3-6 years'
    },
    'product-manager': {
      title: 'Product Manager',
      avgSalary: 'AED 20,000',
      growthRate: '10%',
      jobAvailability: 'Medium',
      workLifeBalance: 65,
      skillsRequired: ['Strategy', 'Communication', 'Analytics'],
      education: 'Bachelor\'s + MBA preferred',
      experience: '5-8 years'
    }
  };

  const addCareer = (career: string) => {
    if (selectedCareers.length < 3 && !selectedCareers.includes(career)) {
      setSelectedCareers([...selectedCareers, career]);
    }
  };

  const removeCareer = (career: string) => {
    setSelectedCareers(selectedCareers.filter(c => c !== career));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-ehrdc-teal" />
            Career Path Comparison Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select onValueChange={addCareer}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Add career to compare" />
              </SelectTrigger>
              <SelectContent>
                {careerOptions
                  .filter(option => !selectedCareers.includes(option.value))
                  .map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary">
              {selectedCareers.length}/3 careers selected
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {selectedCareers.map((careerId) => {
              const career = careerData[careerId as keyof typeof careerData];
              if (!career) return null;

              return (
                <Card key={careerId} className="border-2 border-ehrdc-neutral-light">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCareer(careerId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Salary</p>
                        <p className="font-semibold text-lg text-ehrdc-teal">{career.avgSalary}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Growth Rate</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">{career.growthRate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Job Availability</p>
                      <Badge variant={career.jobAvailability === 'Very High' ? 'default' : 
                                   career.jobAvailability === 'High' ? 'secondary' : 'outline'}>
                        <Users className="h-3 w-3 mr-1" />
                        {career.jobAvailability}
                      </Badge>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted-foreground">Work-Life Balance</p>
                        <span className="text-sm font-medium">{career.workLifeBalance}%</span>
                      </div>
                      <Progress value={career.workLifeBalance} className="h-2" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {career.skillsRequired.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Education</p>
                        <p className="text-sm">{career.education}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm">{career.experience}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedCareers.length > 1 && (
            <div className="mt-6 text-center">
              <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                Generate Detailed Comparison Report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
