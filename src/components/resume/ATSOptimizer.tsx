
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Zap,
  FileText,
  BarChart3,
  Lightbulb,
  Download
} from 'lucide-react';

interface ATSScore {
  overall: number;
  formatting: number;
  keywords: number;
  structure: number;
  readability: number;
}

interface KeywordAnalysis {
  keyword: string;
  frequency: number;
  relevance: 'high' | 'medium' | 'low';
  suggestion: string;
}

interface ATSRecommendation {
  type: 'critical' | 'warning' | 'suggestion';
  category: string;
  issue: string;
  solution: string;
  impact: string;
}

const ATSOptimizer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Mock ATS analysis data
  const atsScore: ATSScore = {
    overall: 87,
    formatting: 95,
    keywords: 82,
    structure: 90,
    readability: 78
  };

  const keywordAnalysis: KeywordAnalysis[] = [
    {
      keyword: 'project management',
      frequency: 3,
      relevance: 'high',
      suggestion: 'Increase frequency to 4-5 mentions'
    },
    {
      keyword: 'agile methodology',
      frequency: 1,
      relevance: 'high',
      suggestion: 'Add more context around agile experience'
    },
    {
      keyword: 'stakeholder management',
      frequency: 0,
      relevance: 'medium',
      suggestion: 'Consider adding this skill if applicable'
    },
    {
      keyword: 'UAE market experience',
      frequency: 2,
      relevance: 'high',
      suggestion: 'Perfect frequency for local market'
    }
  ];

  const recommendations: ATSRecommendation[] = [
    {
      type: 'critical',
      category: 'Keywords',
      issue: 'Missing high-relevance keywords',
      solution: 'Add "digital transformation" and "cross-functional leadership"',
      impact: 'Could increase match rate by 15%'
    },
    {
      type: 'warning',
      category: 'Formatting',
      issue: 'Complex table formatting detected',
      solution: 'Replace tables with simple bullet points',
      impact: 'Improves ATS parsing accuracy'
    },
    {
      type: 'suggestion',
      category: 'Structure',
      issue: 'Skills section could be more prominent',
      solution: 'Move skills section higher in the resume',
      impact: 'Better visibility for keyword matching'
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAnalysisComplete(true);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ATS Optimization Center
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Optimize your resume to pass Applicant Tracking Systems used by UAE employers. Get detailed analysis and actionable recommendations.
        </p>
      </div>

      {/* Job Description Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-ehrdc-teal" />
            Job Description Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste the job description you're targeting (optional but recommended)
            </label>
            <Textarea
              placeholder="Paste the complete job description here to get tailored optimization recommendations..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-ehrdc-teal hover:bg-ehrdc-teal/90"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>
            
            {analysisComplete && (
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisComplete && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Score */}
            <Card className="border-l-4 border-l-ehrdc-teal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    ATS Compatibility Score
                  </h3>
                  <div className={`text-4xl font-bold ${getScoreColor(atsScore.overall)}`}>
                    {atsScore.overall}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Formatting', score: atsScore.formatting },
                    { label: 'Keywords', score: atsScore.keywords },
                    { label: 'Structure', score: atsScore.structure },
                    { label: 'Readability', score: atsScore.readability }
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className={`rounded-full p-3 mb-2 ${getScoreBgColor(item.score)}`}>
                        <div className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <Progress value={item.score} className="mt-1 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
                  <p className="text-gray-600">Issues Resolved</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
                  <p className="text-gray-600">Warnings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-ehrdc-teal mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">95%</h3>
                  <p className="text-gray-600">Target Score</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywordAnalysis.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{keyword.keyword}</span>
                          <Badge 
                            variant={keyword.relevance === 'high' ? 'default' : 'secondary'}
                            className={
                              keyword.relevance === 'high' ? 'bg-green-100 text-green-800' :
                              keyword.relevance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {keyword.relevance} relevance
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{keyword.suggestion}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {keyword.frequency}
                        </div>
                        <p className="text-xs text-gray-500">mentions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className={`border-l-4 ${
                  rec.type === 'critical' ? 'border-l-red-500' :
                  rec.type === 'warning' ? 'border-l-yellow-500' :
                  'border-l-blue-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      {rec.type === 'critical' && <XCircle className="h-5 w-5 text-red-500 mt-1" />}
                      {rec.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />}
                      {rec.type === 'suggestion' && <Lightbulb className="h-5 w-5 text-blue-500 mt-1" />}
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{rec.category}</h3>
                          <Badge variant="outline" className={
                            rec.type === 'critical' ? 'border-red-200 text-red-700' :
                            rec.type === 'warning' ? 'border-yellow-200 text-yellow-700' :
                            'border-blue-200 text-blue-700'
                          }>
                            {rec.type}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-2">{rec.issue}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Solution:</strong> {rec.solution}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Impact:</strong> {rec.impact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="benchmarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-ehrdc-teal" />
                  Industry Benchmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">UAE Job Market Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">Top 15%</div>
                        <p className="text-sm text-gray-600">Your resume ranks in the top 15% for ATS compatibility in the UAE market</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">3.2x</div>
                        <p className="text-sm text-gray-600">Higher chance of passing initial screening compared to average</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Similar Roles Comparison</h4>
                    <div className="space-y-3">
                      {[
                        { role: 'Senior Project Manager', score: 87, yours: true },
                        { role: 'Project Manager', score: 83, yours: false },
                        { role: 'Program Manager', score: 79, yours: false },
                        { role: 'Operations Manager', score: 76, yours: false }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <span className={`font-medium ${item.yours ? 'text-ehrdc-teal' : 'text-gray-700'}`}>
                            {item.role} {item.yours && '(Your Role)'}
                          </span>
                          <div className="flex items-center gap-3">
                            <Progress value={item.score} className="w-24 h-2" />
                            <span className="font-bold">{item.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ATSOptimizer;
