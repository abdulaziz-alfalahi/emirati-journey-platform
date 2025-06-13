
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Target,
  Plus,
  Check,
  X,
  Lightbulb,
  Award,
  Briefcase,
  BookOpen
} from 'lucide-react';

interface SmartSuggestion {
  id: string;
  type: 'skill' | 'achievement' | 'keyword' | 'content';
  category: string;
  title: string;
  content: string;
  reason: string;
  confidence: number;
  source: 'ai_analysis' | 'market_data' | 'best_practice';
  applied: boolean;
}

interface JobRole {
  title: string;
  industry: string;
  level: 'entry' | 'mid' | 'senior' | 'executive';
}

const SmartSuggestions: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [industry, setIndustry] = useState('');
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());

  const suggestions: SmartSuggestion[] = [
    {
      id: '1',
      type: 'skill',
      category: 'Technical Skills',
      title: 'Digital Transformation',
      content: 'Add digital transformation expertise to your skills section',
      reason: 'High demand skill in UAE market with 340% growth in job postings',
      confidence: 92,
      source: 'market_data',
      applied: false
    },
    {
      id: '2',
      type: 'achievement',
      category: 'Leadership',
      title: 'Team Leadership Achievement',
      content: 'Led cross-functional team of 12 members to deliver $2.5M project ahead of schedule',
      reason: 'Quantified leadership achievements increase interview callbacks by 65%',
      confidence: 88,
      source: 'best_practice',
      applied: false
    },
    {
      id: '3',
      type: 'keyword',
      category: 'Industry Keywords',
      title: 'UAE Vision 2071',
      content: 'Reference alignment with UAE Vision 2071 initiatives in your summary',
      reason: 'Shows cultural awareness and strategic thinking valued by UAE employers',
      confidence: 85,
      source: 'ai_analysis',
      applied: false
    },
    {
      id: '4',
      type: 'content',
      category: 'Professional Summary',
      title: 'Value Proposition Statement',
      content: 'Results-driven professional with 8+ years of experience driving digital innovation in the UAE market',
      reason: 'Clear value propositions improve resume effectiveness by 45%',
      confidence: 90,
      source: 'best_practice',
      applied: false
    },
    {
      id: '5',
      type: 'skill',
      category: 'Soft Skills',
      title: 'Cultural Intelligence',
      content: 'Multicultural team management and cross-cultural communication',
      reason: 'Essential skill for UAE\'s diverse workforce environment',
      confidence: 87,
      source: 'market_data',
      applied: false
    }
  ];

  const trendingSkills = [
    { skill: 'AI & Machine Learning', growth: '+280%', demand: 'Very High' },
    { skill: 'Sustainability Management', growth: '+195%', demand: 'High' },
    { skill: 'Blockchain Technology', growth: '+156%', demand: 'High' },
    { skill: 'Data Analytics', growth: '+145%', demand: 'Very High' },
    { skill: 'Digital Marketing', growth: '+132%', demand: 'High' },
    { skill: 'Cybersecurity', growth: '+128%', demand: 'Very High' }
  ];

  const achievementTemplates = [
    {
      category: 'Revenue Impact',
      template: 'Increased revenue by [X]% through [specific action] resulting in $[amount] additional annual profit',
      example: 'Increased revenue by 23% through implementation of new sales strategy resulting in $1.2M additional annual profit'
    },
    {
      category: 'Cost Reduction',
      template: 'Reduced operational costs by [X]% by [specific method] saving $[amount] annually',
      example: 'Reduced operational costs by 15% by streamlining procurement processes saving $500K annually'
    },
    {
      category: 'Team Leadership',
      template: 'Led team of [X] professionals to [achievement] within [timeframe]',
      example: 'Led team of 15 professionals to complete digital transformation project 2 months ahead of schedule'
    },
    {
      category: 'Process Improvement',
      template: 'Improved [process] efficiency by [X]% through [method] impacting [number] stakeholders',
      example: 'Improved customer service efficiency by 40% through automation implementation impacting 5,000+ customers'
    }
  ];

  const applySuggestion = (suggestionId: string) => {
    setAppliedSuggestions(prev => new Set([...prev, suggestionId]));
  };

  const rejectSuggestion = (suggestionId: string) => {
    // Handle rejection logic
    console.log('Rejected suggestion:', suggestionId);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'ai_analysis':
        return <Brain className="h-4 w-4" />;
      case 'market_data':
        return <TrendingUp className="h-4 w-4" />;
      case 'best_practice':
        return <Award className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI-Powered Smart Suggestions
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get personalized recommendations based on UAE job market data, AI analysis, and industry best practices
        </p>
      </div>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-ehrdc-teal" />
            Target Role Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <Input placeholder="e.g., Senior Project Manager" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance & Banking</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Personalized Suggestions
          </Button>
        </CardContent>
      </Card>

      {/* Suggestions Tabs */}
      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
          <TabsTrigger value="trending">Trending Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievement Templates</TabsTrigger>
          <TabsTrigger value="keywords">Industry Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className={`transition-all duration-200 ${
              appliedSuggestions.has(suggestion.id) ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getSourceIcon(suggestion.source)}
                      <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.category}
                      </Badge>
                      <Badge className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}>
                        {suggestion.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-2">{suggestion.content}</p>
                    <p className="text-sm text-gray-600 mb-4">{suggestion.reason}</p>
                    
                    {!appliedSuggestions.has(suggestion.id) ? (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => applySuggestion(suggestion.id)}
                          className="bg-ehrdc-teal hover:bg-ehrdc-teal/90"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Apply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => rejectSuggestion(suggestion.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Applied to resume</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Trending Skills in UAE Market
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={
                            skill.demand === 'Very High' ? 'border-red-200 text-red-700 bg-red-50' :
                            'border-yellow-200 text-yellow-700 bg-yellow-50'
                          }
                        >
                          {skill.demand} Demand
                        </Badge>
                        <span className="text-sm text-green-600 font-medium">{skill.growth}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Briefcase className="h-5 w-5 mr-2 text-ehrdc-teal" />
                    {template.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Template:</h4>
                    <p className="text-sm text-gray-600">{template.template}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700 mb-2">Example:</h4>
                    <p className="text-sm text-blue-600">{template.example}</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Industry-Specific Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Technology</h4>
                  <div className="space-y-2">
                    {['Digital transformation', 'Agile methodology', 'Cloud computing', 'Data analytics', 'Cybersecurity'].map(keyword => (
                      <div key={keyword} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{keyword}</span>
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Finance</h4>
                  <div className="space-y-2">
                    {['Risk management', 'Regulatory compliance', 'Financial modeling', 'Investment analysis', 'Islamic banking'].map(keyword => (
                      <div key={keyword} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{keyword}</span>
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">General</h4>
                  <div className="space-y-2">
                    {['UAE Vision 2071', 'Sustainability', 'Cultural intelligence', 'Emiratization', 'Innovation'].map(keyword => (
                      <div key={keyword} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{keyword}</span>
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartSuggestions;
