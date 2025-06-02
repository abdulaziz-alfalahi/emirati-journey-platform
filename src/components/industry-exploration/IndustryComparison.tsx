
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, TrendingUp, DollarSign, Users, Clock, 
  Star, Plus, X, Target, Briefcase 
} from 'lucide-react';

export const IndustryComparison: React.FC = () => {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['energy', 'technology']);

  const industries = {
    energy: {
      name: 'Energy & Oil',
      growth: 15,
      avgSalary: 21500,
      emiratization: 65,
      workLifeBalance: 4,
      entryRequirements: 'Moderate',
      jobSecurity: 5,
      innovationLevel: 3,
      stressLevel: 3,
      skills: ['Engineering', 'Safety Management', 'Technical Analysis'],
      pros: ['High job security', 'Excellent benefits', 'Career stability'],
      cons: ['Traditional hierarchy', 'Limited flexibility', 'Location constraints']
    },
    technology: {
      name: 'Technology & AI',
      growth: 45,
      avgSalary: 29000,
      emiratization: 55,
      workLifeBalance: 4,
      entryRequirements: 'Moderate',
      jobSecurity: 4,
      innovationLevel: 5,
      stressLevel: 4,
      skills: ['Programming', 'Problem Solving', 'Continuous Learning'],
      pros: ['High innovation', 'Flexible work', 'Growth potential'],
      cons: ['Fast-paced changes', 'Skill obsolescence risk', 'Competition']
    },
    finance: {
      name: 'Banking & Finance',
      growth: 22,
      avgSalary: 23000,
      emiratization: 78,
      workLifeBalance: 3,
      entryRequirements: 'High',
      jobSecurity: 4,
      innovationLevel: 3,
      stressLevel: 4,
      skills: ['Financial Analysis', 'Risk Management', 'Compliance'],
      pros: ['High compensation', 'Professional prestige', 'Career advancement'],
      cons: ['High pressure', 'Long hours', 'Regulatory complexity']
    },
    tourism: {
      name: 'Tourism & Hospitality',
      growth: 35,
      avgSalary: 14500,
      emiratization: 45,
      workLifeBalance: 3,
      entryRequirements: 'Easy',
      jobSecurity: 3,
      innovationLevel: 3,
      stressLevel: 3,
      skills: ['Customer Service', 'Languages', 'Cultural Awareness'],
      pros: ['People interaction', 'Cultural diversity', 'Service satisfaction'],
      cons: ['Seasonal fluctuations', 'Lower wages', 'Physical demands']
    },
    healthcare: {
      name: 'Healthcare',
      growth: 25,
      avgSalary: 35000,
      emiratization: 72,
      workLifeBalance: 3,
      entryRequirements: 'High',
      jobSecurity: 5,
      innovationLevel: 4,
      stressLevel: 5,
      skills: ['Medical Knowledge', 'Empathy', 'Decision Making'],
      pros: ['High impact', 'Job security', 'Respected profession'],
      cons: ['High stress', 'Long training', 'Emotional demands']
    },
    construction: {
      name: 'Construction & Real Estate',
      growth: 18,
      avgSalary: 17500,
      emiratization: 35,
      workLifeBalance: 2,
      entryRequirements: 'Moderate',
      jobSecurity: 3,
      innovationLevel: 3,
      stressLevel: 4,
      skills: ['Project Management', 'Technical Skills', 'Safety Awareness'],
      pros: ['Tangible results', 'Project variety', 'Good compensation'],
      cons: ['Physical demands', 'Weather dependency', 'Safety risks']
    }
  };

  const availableIndustries = Object.keys(industries).filter(
    id => !selectedIndustries.includes(id)
  );

  const addIndustry = (industryId: string) => {
    if (selectedIndustries.length < 3) {
      setSelectedIndustries([...selectedIndustries, industryId]);
    }
  };

  const removeIndustry = (industryId: string) => {
    setSelectedIndustries(selectedIndustries.filter(id => id !== industryId));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const getRequirementColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Industry Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ehrdc-teal">
            <BarChart3 className="h-5 w-5" />
            Industry Comparison Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-sm font-medium">Selected Industries:</span>
            {selectedIndustries.map(id => (
              <Badge key={id} variant="default" className="flex items-center gap-2 bg-ehrdc-teal">
                {industries[id as keyof typeof industries].name}
                <button onClick={() => removeIndustry(id)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {selectedIndustries.length < 3 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-ehrdc-neutral-dark/70">Add industry:</span>
              {availableIndustries.map(id => (
                <Button
                  key={id}
                  size="sm"
                  variant="outline"
                  onClick={() => addIndustry(id)}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {industries[id as keyof typeof industries].name}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ehrdc-neutral-light">
                  <th className="text-left p-3 font-semibold text-ehrdc-teal">Criteria</th>
                  {selectedIndustries.map(id => (
                    <th key={id} className="text-center p-3 font-semibold text-ehrdc-teal min-w-40">
                      {industries[id as keyof typeof industries].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Growth Rate */}
                <tr className="border-b border-ehrdc-neutral-light/50">
                  <td className="p-3 font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Growth Rate
                  </td>
                  {selectedIndustries.map(id => (
                    <td key={id} className="text-center p-3">
                      <div className="text-lg font-semibold text-green-600">
                        {industries[id as keyof typeof industries].growth}%
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Average Salary */}
                <tr className="border-b border-ehrdc-neutral-light/50">
                  <td className="p-3 font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    Avg Salary (AED)
                  </td>
                  {selectedIndustries.map(id => (
                    <td key={id} className="text-center p-3">
                      <div className="text-lg font-semibold text-blue-600">
                        {industries[id as keyof typeof industries].avgSalary.toLocaleString()}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Emiratization Rate */}
                <tr className="border-b border-ehrdc-neutral-light/50">
                  <td className="p-3 font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-ehrdc-teal" />
                    Emiratization Rate
                  </td>
                  {selectedIndustries.map(id => (
                    <td key={id} className="text-center p-3">
                      <div className="text-lg font-semibold text-ehrdc-teal">
                        {industries[id as keyof typeof industries].emiratization}%
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Work-Life Balance */}
                <tr className="border-b border-ehrdc-neutral-light/50">
                  <td className="p-3 font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    Work-Life Balance
                  </td>
                  {selectedIndustries.map(id => (
                    <td key={id} className="text-center p-3">
                      <div className="flex justify-center">
                        {renderStars(industries[id as keyof typeof industries].workLifeBalance)}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Entry Requirements */}
                <tr className="border-b border-ehrdc-neutral-light/50">
                  <td className="p-3 font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-orange-600" />
                    Entry Requirements
                  </td>
                  {selectedIndustries.map(id => (
                    <td key={id} className="text-center p-3">
                      <Badge className={getRequirementColor(industries[id as keyof typeof industries].entryRequirements)}>
                        {industries[id as keyof typeof industries].entryRequirements}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* Job Security */}
                <tr className="border-b border-ehrdc-neutral-light/50">
                  <td className="p-3 font-medium">Job Security</td>
                  {selectedIndustries.map(id => (
                    <td key={id} className="text-center p-3">
                      <div className="flex justify-center">
                        {renderStars(industries[id as keyof typeof industries].jobSecurity)}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Innovation Level */}
                <tr className="border-b border-ehrdc-neutral-light/50">
                  <td className="p-3 font-medium">Innovation Level</td>
                  {selectedIndustries.map(id => (
                    <td key={id} className="text-center p-3">
                      <div className="flex justify-center">
                        {renderStars(industries[id as keyof typeof industries].innovationLevel)}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedIndustries.map(id => {
          const industry = industries[id as keyof typeof industries];
          return (
            <Card key={id}>
              <CardHeader>
                <CardTitle className="text-ehrdc-teal">{industry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Key Skills */}
                  <div>
                    <h4 className="font-medium mb-2">Key Skills Required</h4>
                    <div className="flex flex-wrap gap-1">
                      {industry.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pros */}
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">Advantages</h4>
                    <ul className="text-sm space-y-1">
                      {industry.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Challenges</h4>
                    <ul className="text-sm space-y-1">
                      {industry.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
