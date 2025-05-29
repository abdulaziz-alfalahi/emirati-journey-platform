import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Users, 
  Heart,
  MapPin,
  Filter,
  CheckCircle,
  Circle,
  ArrowRight,
  Download
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getUserCareerPaths } from '@/services/careerPathService';
import { UserCareerPath } from '@/types/careerPath';
import ExportJourneyDialog from './ExportJourneyDialog';

interface CareerStage {
  id: string;
  title: string;
  description: string;
  category: 'education' | 'career' | 'personal' | 'retirement';
  ageRange: string;
  completed: boolean;
  current: boolean;
  recommended: boolean;
  icon: React.ComponentType<any>;
  requirements?: string[];
  benefits?: string[];
  duration?: string;
}

interface CareerPath {
  id: string;
  title: string;
  industry: string;
  stages: CareerStage[];
  totalProgress: number;
}

const CareerJourneyMap: React.FC = () => {
  const { user } = useAuth();
  const [userCareerPaths, setUserCareerPaths] = useState<UserCareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const journeyMapRef = useRef<HTMLDivElement>(null);

  // Sample career paths data (in real app, this would come from the database)
  const emiratiCareerPaths: CareerPath[] = [
    {
      id: 'tech-professional',
      title: 'Technology Professional',
      industry: 'Technology',
      totalProgress: 45,
      stages: [
        {
          id: 'primary-education',
          title: 'Primary & Secondary Education',
          description: 'Complete foundational education in UAE schools',
          category: 'education',
          ageRange: '6-18',
          completed: true,
          current: false,
          recommended: false,
          icon: GraduationCap,
          duration: '12 years',
          requirements: ['UAE curriculum completion', 'EmSAT preparation']
        },
        {
          id: 'university-tech',
          title: 'Technology Degree',
          description: 'Bachelor\'s in Computer Science or related field',
          category: 'education',
          ageRange: '18-22',
          completed: true,
          current: false,
          recommended: false,
          icon: GraduationCap,
          duration: '4 years',
          requirements: ['High school completion', 'University entrance exam']
        },
        {
          id: 'internship',
          title: 'Technology Internship',
          description: 'Gain practical experience in tech companies',
          category: 'career',
          ageRange: '20-23',
          completed: false,
          current: true,
          recommended: true,
          icon: Briefcase,
          duration: '3-6 months',
          benefits: ['Industry experience', 'Professional network', 'Skill application']
        },
        {
          id: 'junior-developer',
          title: 'Junior Developer',
          description: 'Start career as entry-level developer',
          category: 'career',
          ageRange: '22-25',
          completed: false,
          current: false,
          recommended: true,
          icon: Briefcase,
          duration: '2-3 years'
        },
        {
          id: 'senior-developer',
          title: 'Senior Developer',
          description: 'Advanced technical role with leadership responsibilities',
          category: 'career',
          ageRange: '25-35',
          completed: false,
          current: false,
          recommended: false,
          icon: TrendingUp,
          duration: '5-10 years'
        },
        {
          id: 'tech-manager',
          title: 'Technology Manager',
          description: 'Lead technology teams and projects',
          category: 'career',
          ageRange: '30-45',
          completed: false,
          current: false,
          recommended: false,
          icon: Users,
          duration: '10+ years'
        },
        {
          id: 'family-planning',
          title: 'Family & Personal Development',
          description: 'Balance career with family life and personal growth',
          category: 'personal',
          ageRange: '25-40',
          completed: false,
          current: false,
          recommended: true,
          icon: Heart,
          duration: 'Ongoing'
        },
        {
          id: 'retirement-planning',
          title: 'Retirement Planning',
          description: 'Financial planning and career transition preparation',
          category: 'retirement',
          ageRange: '50-60',
          completed: false,
          current: false,
          recommended: false,
          icon: Award,
          duration: '10+ years'
        }
      ]
    },
    {
      id: 'business-leader',
      title: 'Business Leadership',
      industry: 'Business',
      totalProgress: 30,
      stages: [
        {
          id: 'primary-education-biz',
          title: 'Primary & Secondary Education',
          description: 'Complete foundational education in UAE schools',
          category: 'education',
          ageRange: '6-18',
          completed: true,
          current: false,
          recommended: false,
          icon: GraduationCap,
          duration: '12 years'
        },
        {
          id: 'business-degree',
          title: 'Business Administration Degree',
          description: 'Bachelor\'s in Business, Economics, or Management',
          category: 'education',
          ageRange: '18-22',
          completed: true,
          current: false,
          recommended: false,
          icon: GraduationCap,
          duration: '4 years'
        },
        {
          id: 'business-internship',
          title: 'Business Internship',
          description: 'Gain experience in UAE corporations',
          category: 'career',
          ageRange: '20-23',
          completed: false,
          current: true,
          recommended: true,
          icon: Briefcase,
          duration: '3-6 months'
        },
        {
          id: 'junior-analyst',
          title: 'Junior Business Analyst',
          description: 'Entry-level position in business analysis',
          category: 'career',
          ageRange: '22-26',
          completed: false,
          current: false,
          recommended: true,
          icon: Briefcase,
          duration: '2-4 years'
        },
        {
          id: 'manager',
          title: 'Department Manager',
          description: 'Lead business units and teams',
          category: 'career',
          ageRange: '26-35',
          completed: false,
          current: false,
          recommended: false,
          icon: TrendingUp,
          duration: '5-10 years'
        },
        {
          id: 'director',
          title: 'Executive Director',
          description: 'Senior leadership role in organization',
          category: 'career',
          ageRange: '35-50',
          completed: false,
          current: false,
          recommended: false,
          icon: Users,
          duration: '10+ years'
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchUserCareerPaths = async () => {
      if (!user) return;
      
      try {
        const paths = await getUserCareerPaths(user.id);
        setUserCareerPaths(paths);
      } catch (error) {
        console.error('Error fetching user career paths:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserCareerPaths();
  }, [user]);

  const filteredPaths = emiratiCareerPaths.filter(path => {
    if (selectedPath !== 'all' && path.id !== selectedPath) return false;
    if (selectedCategory !== 'all') {
      return path.stages.some(stage => stage.category === selectedCategory);
    }
    return true;
  });

  const getStageIcon = (stage: CareerStage) => {
    const IconComponent = stage.icon;
    let colorClass = 'text-gray-400';
    
    if (stage.completed) colorClass = 'text-green-600';
    else if (stage.current) colorClass = 'text-blue-600';
    else if (stage.recommended) colorClass = 'text-orange-600';
    
    return <IconComponent className={`h-6 w-6 ${colorClass}`} />;
  };

  const getStageStatus = (stage: CareerStage) => {
    if (stage.completed) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (stage.current) return <Circle className="h-4 w-4 text-blue-600 fill-current" />;
    return <Circle className="h-4 w-4 text-gray-400" />;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'career': return 'bg-green-100 text-green-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'retirement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportData = {
    selectedPath,
    selectedCategory,
    filteredPaths,
    userCareerPaths,
    exportedAt: new Date().toISOString()
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Career Journey Map</h2>
          <p className="text-muted-foreground">
            Track your progress and explore potential career paths in the UAE
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Map
          </Button>
          
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedPath} onValueChange={setSelectedPath}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select career path" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Career Paths</SelectItem>
              {emiratiCareerPaths.map(path => (
                <SelectItem key={path.id} value={path.id}>
                  {path.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="retirement">Retirement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-blue-600 fill-current" />
              <span>Current Stage</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-orange-600" />
              <span>Recommended Next</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-gray-400" />
              <span>Future Stage</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Paths - with ref for export */}
      <div ref={journeyMapRef} className="space-y-8">
        {filteredPaths.map(path => (
          <Card key={path.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {path.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{path.industry} Industry</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Overall Progress</div>
                  <div className="flex items-center gap-2">
                    <Progress value={path.totalProgress} className="w-24" />
                    <span className="text-sm font-medium">{path.totalProgress}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {path.stages
                  .filter(stage => selectedCategory === 'all' || stage.category === selectedCategory)
                  .map((stage, index, filteredStages) => (
                  <div key={stage.id} className="relative">
                    {index < filteredStages.length - 1 && (
                      <div className="absolute left-6 top-12 h-16 w-0.5 bg-gray-200" />
                    )}
                    
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                          {getStageIcon(stage)}
                        </div>
                        {getStageStatus(stage)}
                      </div>
                      
                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{stage.title}</h3>
                              <Badge variant="secondary" className={getCategoryColor(stage.category)}>
                                {stage.category}
                              </Badge>
                              {stage.current && (
                                <Badge variant="default">Current</Badge>
                              )}
                              {stage.recommended && (
                                <Badge variant="outline" className="border-orange-500 text-orange-600">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-2">{stage.description}</p>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>Age: {stage.ageRange}</span>
                              {stage.duration && <span>Duration: {stage.duration}</span>}
                            </div>
                          </div>
                        </div>
                        
                        {(stage.requirements || stage.benefits) && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stage.requirements && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Requirements</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {stage.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <div className="h-1 w-1 bg-gray-400 rounded-full" />
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {stage.benefits && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Benefits</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {stage.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <div className="h-1 w-1 bg-green-500 rounded-full" />
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {stage.recommended && (
                          <div className="mt-4">
                            <Button size="sm" className="flex items-center gap-2">
                              Start Planning
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ExportJourneyDialog
        isOpen={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        elementRef={journeyMapRef}
        journeyData={exportData}
      />
    </div>
  );
};

export default CareerJourneyMap;
