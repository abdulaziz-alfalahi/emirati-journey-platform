
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Award,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { ProfessionalGrowthAnalytics } from '@/types/professionalGrowthAnalytics';

interface SkillsAnalyticsProps {
  analytics: ProfessionalGrowthAnalytics;
}

export const SkillsAnalytics: React.FC<SkillsAnalyticsProps> = ({ analytics }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock skill categories data
  const skillCategories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      progress: 75,
      skills: [
        { name: 'JavaScript', level: 8, maxLevel: 10 },
        { name: 'Python', level: 7, maxLevel: 10 },
        { name: 'Cloud Architecture', level: 6, maxLevel: 10 },
        { name: 'DevOps', level: 5, maxLevel: 10 }
      ]
    },
    {
      id: 'leadership',
      name: 'Leadership',
      progress: 60,
      skills: [
        { name: 'Team Management', level: 7, maxLevel: 10 },
        { name: 'Strategic Planning', level: 6, maxLevel: 10 },
        { name: 'Communication', level: 8, maxLevel: 10 },
        { name: 'Decision Making', level: 5, maxLevel: 10 }
      ]
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      progress: 85,
      skills: [
        { name: 'Problem Solving', level: 9, maxLevel: 10 },
        { name: 'Collaboration', level: 8, maxLevel: 10 },
        { name: 'Adaptability', level: 8, maxLevel: 10 },
        { name: 'Critical Thinking', level: 7, maxLevel: 10 }
      ]
    },
    {
      id: 'industry',
      name: 'Industry Knowledge',
      progress: 70,
      skills: [
        { name: 'Digital Transformation', level: 7, maxLevel: 10 },
        { name: 'Data Analytics', level: 6, maxLevel: 10 },
        { name: 'Cybersecurity', level: 5, maxLevel: 10 },
        { name: 'AI/ML Concepts', level: 4, maxLevel: 10 }
      ]
    }
  ];

  const skillGaps = [
    { skill: 'Advanced AI/ML', currentLevel: 3, requiredLevel: 7, importance: 'high' as const },
    { skill: 'Blockchain Technology', currentLevel: 2, requiredLevel: 6, importance: 'medium' as const },
    { skill: 'Public Speaking', currentLevel: 4, requiredLevel: 8, importance: 'high' as const },
    { skill: 'Financial Management', currentLevel: 3, requiredLevel: 6, importance: 'low' as const }
  ];

  const industryBenchmarks = [
    { skill: 'JavaScript', userLevel: 8, industryAverage: 6.5, percentile: 75 },
    { skill: 'Leadership', userLevel: 6, industryAverage: 5.5, percentile: 60 },
    { skill: 'Communication', userLevel: 8, industryAverage: 6.0, percentile: 80 },
    { skill: 'Data Analytics', userLevel: 6, industryAverage: 7.0, percentile: 45 }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Skills</p>
                <p className="text-xl font-bold">{analytics.overallProgress.skillsDevelopment.skillsAcquired}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-xl font-bold">{analytics.overallProgress.skillsDevelopment.completionPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Time Invested</p>
                <p className="text-xl font-bold">{analytics.overallProgress.skillsDevelopment.timeInvested}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Target Level</p>
                <p className="text-xl font-bold">{analytics.overallProgress.skillsDevelopment.targetLevel}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Skills Progress</TabsTrigger>
          <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="development">Development Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </Button>
            {skillCategories.map(category => (
              <Button 
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Skills by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCategories.map(category => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <Badge variant="outline">{category.progress}% Complete</Badge>
                  </div>
                  <Progress value={category.progress} className="mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map(skill => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}/{skill.maxLevel}
                          </span>
                        </div>
                        <Progress value={(skill.level / skill.maxLevel) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillGaps.map((gap, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{gap.skill}</h4>
                      <Badge variant={
                        gap.importance === 'high' ? 'destructive' : 
                        gap.importance === 'medium' ? 'default' : 'secondary'
                      }>
                        {gap.importance} priority
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Level: {gap.currentLevel}/10</span>
                        <span>Required Level: {gap.requiredLevel}/10</span>
                      </div>
                      <div className="relative">
                        <Progress value={(gap.currentLevel / 10) * 100} className="h-2" />
                        <div 
                          className="absolute top-0 w-1 h-2 bg-red-500 rounded"
                          style={{ left: `${(gap.requiredLevel / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Gap: {gap.requiredLevel - gap.currentLevel} levels
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Industry Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryBenchmarks.map((benchmark, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{benchmark.skill}</h4>
                      <Badge variant={benchmark.percentile >= 70 ? 'success' : benchmark.percentile >= 50 ? 'default' : 'secondary'}>
                        {benchmark.percentile}th percentile
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Your Level: {benchmark.userLevel}/10</span>
                        <span>Industry Average: {benchmark.industryAverage}/10</span>
                      </div>
                      <div className="relative">
                        <Progress value={(benchmark.userLevel / 10) * 100} className="h-3" />
                        <div 
                          className="absolute top-0 w-1 h-3 bg-orange-500 rounded"
                          style={{ left: `${(benchmark.industryAverage / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {benchmark.userLevel >= benchmark.industryAverage ? 'Above' : 'Below'} industry average
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skill Development Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Short Term */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Next 3 Months
                  </h4>
                  <div className="space-y-2 ml-5">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Advanced JavaScript Patterns</h5>
                      <p className="text-sm text-muted-foreground">Online course • 2-3 weeks</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Public Speaking Workshop</h5>
                      <p className="text-sm text-muted-foreground">Workshop • 1 week</p>
                    </div>
                  </div>
                </div>

                {/* Medium Term */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    3-12 Months
                  </h4>
                  <div className="space-y-2 ml-5">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">AI/ML Specialization</h5>
                      <p className="text-sm text-muted-foreground">Certification program • 3-4 months</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Leadership Development Program</h5>
                      <p className="text-sm text-muted-foreground">Corporate program • 6 months</p>
                    </div>
                  </div>
                </div>

                {/* Long Term */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    1+ Years
                  </h4>
                  <div className="space-y-2 ml-5">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Executive MBA</h5>
                      <p className="text-sm text-muted-foreground">Graduate degree • 18-24 months</p>
                    </div>
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
