
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Target,
  FileText,
  Clock,
  Users,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface AnalyticsMetric {
  label: string;
  value: number;
  target: number;
  status: 'excellent' | 'good' | 'needs_improvement';
  trend: 'up' | 'down' | 'stable';
}

interface SectionAnalysis {
  section: string;
  completeness: number;
  quality: number;
  wordCount: number;
  recommendations: string[];
}

const ResumeAnalytics: React.FC = () => {
  const overallMetrics: AnalyticsMetric[] = [
    {
      label: 'Overall Completeness',
      value: 87,
      target: 95,
      status: 'good',
      trend: 'up'
    },
    {
      label: 'ATS Compatibility',
      value: 92,
      target: 90,
      status: 'excellent',
      trend: 'stable'
    },
    {
      label: 'Readability Score',
      value: 78,
      target: 85,
      status: 'needs_improvement',
      trend: 'up'
    },
    {
      label: 'Keyword Density',
      value: 85,
      target: 80,
      status: 'excellent',
      trend: 'up'
    }
  ];

  const sectionAnalysis: SectionAnalysis[] = [
    {
      section: 'Professional Summary',
      completeness: 95,
      quality: 88,
      wordCount: 87,
      recommendations: ['Add more quantified achievements', 'Include industry-specific keywords']
    },
    {
      section: 'Work Experience',
      completeness: 90,
      quality: 92,
      wordCount: 245,
      recommendations: ['Perfect section - well structured and detailed']
    },
    {
      section: 'Skills',
      completeness: 85,
      quality: 80,
      wordCount: 34,
      recommendations: ['Add skill proficiency levels', 'Include more technical skills']
    },
    {
      section: 'Education',
      completeness: 100,
      quality: 85,
      wordCount: 56,
      recommendations: ['Consider adding relevant coursework or projects']
    },
    {
      section: 'Languages',
      completeness: 75,
      quality: 70,
      wordCount: 18,
      recommendations: ['Add proficiency levels', 'Include more languages if applicable']
    }
  ];

  const competitiveAnalysis = {
    yourScore: 87,
    industryAverage: 72,
    topPercentile: 94,
    similarRoles: [
      { role: 'Senior Project Manager', averageScore: 74, yourAdvantage: '+13 points' },
      { role: 'Program Manager', averageScore: 71, yourAdvantage: '+16 points' },
      { role: 'Operations Manager', averageScore: 69, yourAdvantage: '+18 points' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'needs_improvement':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'needs_improvement':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Resume Analytics Dashboard
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get detailed insights into your resume performance with analytics and benchmarking against UAE market standards
        </p>
      </div>

      {/* Overall Performance */}
      <Card className="border-l-4 border-l-ehrdc-teal">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-ehrdc-teal" />
            Overall Performance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {overallMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getStatusIcon(metric.status)}
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    {metric.value}%
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{metric.label}</h3>
                <Badge className={`text-xs ${getStatusColor(metric.status)}`}>
                  {metric.status.replace('_', ' ')}
                </Badge>
                <Progress value={metric.value} className="mt-2 h-2" />
                <p className="text-xs text-gray-500 mt-1">Target: {metric.target}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">Section Analysis</TabsTrigger>
          <TabsTrigger value="competitive">Market Comparison</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Action Items</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sectionAnalysis.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-ehrdc-teal" />
                      {section.section}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {section.wordCount} words
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Completeness</span>
                        <span className="text-sm font-medium">{section.completeness}%</span>
                      </div>
                      <Progress value={section.completeness} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Quality</span>
                        <span className="text-sm font-medium">{section.quality}%</span>
                      </div>
                      <Progress value={section.quality} className="h-2" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations:</h4>
                    <ul className="space-y-1">
                      {section.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-ehrdc-teal mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-ehrdc-teal" />
                Market Position Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {competitiveAnalysis.yourScore}%
                  </div>
                  <p className="text-sm text-gray-600">Your Score</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600 mb-1">
                    {competitiveAnalysis.industryAverage}%
                  </div>
                  <p className="text-sm text-gray-600">Industry Average</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {competitiveAnalysis.topPercentile}%
                  </div>
                  <p className="text-sm text-gray-600">Top 10%</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Comparison with Similar Roles</h4>
                <div className="space-y-3">
                  {competitiveAnalysis.similarRoles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">{role.role}</h5>
                        <p className="text-sm text-gray-600">Industry average: {role.averageScore}%</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800">
                          {role.yourAdvantage}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-ehrdc-teal" />
                  Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">+12%</div>
                      <p className="text-sm text-gray-600">Improvement this month</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Update</span>
                      <span className="text-sm font-medium">87% (+3%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Previous Week</span>
                      <span className="text-sm font-medium">84% (+5%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Initial Score</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-ehrdc-teal" />
                  Visibility Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">95%</div>
                      <p className="text-xs text-gray-600">ATS Pass Rate</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">3.2x</div>
                      <p className="text-xs text-gray-600">Interview Rate</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Keyword Match</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Format Score</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Readability</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                  High Priority Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-1">Improve Readability</h4>
                    <p className="text-sm text-red-600">Current score: 78%, Target: 85%</p>
                    <p className="text-xs text-red-500 mt-1">Break down long sentences and use bullet points</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-1">Add Missing Keywords</h4>
                    <p className="text-sm text-red-600">Include "digital transformation" and "agile"</p>
                    <p className="text-xs text-red-500 mt-1">Could improve match rate by 12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                  Medium Priority Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-1">Enhance Skills Section</h4>
                    <p className="text-sm text-yellow-600">Add proficiency levels to skills</p>
                    <p className="text-xs text-yellow-500 mt-1">Improves recruiter assessment</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-1">Quantify Achievements</h4>
                    <p className="text-sm text-yellow-600">Add more numbers and percentages</p>
                    <p className="text-xs text-yellow-500 mt-1">Makes impact more tangible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Strengths to Maintain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Excellent ATS compatibility</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Strong keyword optimization</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Professional formatting</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Comprehensive work history</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Industry-relevant experience</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Clear value proposition</span>
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

export default ResumeAnalytics;
