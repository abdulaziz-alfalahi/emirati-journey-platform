
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, BookOpen, GraduationCap, Briefcase, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PathwayStage {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  status: 'completed' | 'current' | 'upcoming';
  duration?: string;
  requirements?: string[];
}

interface CareerPathwayProps {
  studentName?: string;
  selectedCareer?: string;
}

const CareerPathway: React.FC<CareerPathwayProps> = ({
  studentName = "Ahmed",
  selectedCareer = "Computer Science"
}) => {
  const [activeTab, setActiveTab] = useState('education');

  // Sample career pathways data
  const educationPathway: PathwayStage[] = [
    {
      id: 'high-school',
      title: 'High School',
      description: 'STEM-focused secondary education with emphasis on mathematics and physics',
      icon: <BookOpen className="h-5 w-5 text-emirati-teal" />,
      skills: ['Mathematics', 'Physics', 'Critical Thinking', 'English Language'],
      status: 'completed',
      duration: '3 years'
    },
    {
      id: 'bachelor',
      title: 'Bachelor in Computer Science',
      description: 'Undergraduate degree with focus on programming, algorithms and data structures',
      icon: <GraduationCap className="h-5 w-5 text-emirati-teal" />,
      skills: ['Programming', 'Algorithms', 'Data Structures', 'Database Management'],
      status: 'current',
      duration: '4 years',
      requirements: ['High School Diploma', 'Math Score > 90%']
    },
    {
      id: 'masters',
      title: 'Master in Artificial Intelligence',
      description: 'Specialized graduate degree in machine learning and AI applications',
      icon: <Award className="h-5 w-5 text-emirati-teal" />,
      skills: ['Machine Learning', 'Neural Networks', 'Data Science', 'Research Methods'],
      status: 'upcoming',
      duration: '2 years',
      requirements: ['Bachelor Degree', 'GPA > 3.5']
    }
  ];

  const careerPathway: PathwayStage[] = [
    {
      id: 'internship',
      title: 'Software Developer Intern',
      description: 'Practical experience in a software development team, working on real projects',
      icon: <Briefcase className="h-5 w-5 text-emirati-teal" />,
      skills: ['Coding', 'Version Control', 'Team Collaboration', 'Problem Solving'],
      status: 'completed',
      duration: '3 months'
    },
    {
      id: 'junior-dev',
      title: 'Junior Software Developer',
      description: 'Entry-level professional role developing applications and software systems',
      icon: <Briefcase className="h-5 w-5 text-emirati-teal" />,
      skills: ['Full-stack Development', 'Testing', 'Debugging', 'Agile Methodologies'],
      status: 'upcoming',
      duration: '2-3 years',
      requirements: ['Bachelor Degree', 'Programming Skills']
    },
    {
      id: 'senior-dev',
      title: 'Senior Software Developer',
      description: 'Lead development efforts and mentor junior team members',
      icon: <Star className="h-5 w-5 text-emirati-teal" />,
      skills: ['System Architecture', 'Technical Leadership', 'Code Review', 'Project Planning'],
      status: 'upcoming',
      duration: '3-5 years',
      requirements: ['5+ years experience', 'Advanced technical skills']
    }
  ];

  const renderPathwayStages = (stages: PathwayStage[]) => (
    <div className="mt-6 space-y-8">
      {stages.map((stage, index) => (
        <div key={stage.id} className="relative">
          {/* Connector line between stages */}
          {index < stages.length - 1 && (
            <div className="absolute left-6 top-10 h-full w-0.5 bg-gray-200 -z-10"></div>
          )}
          
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex items-center justify-center h-12 w-12 rounded-full shrink-0",
              stage.status === 'completed' ? "bg-green-100" : 
              stage.status === 'current' ? "bg-blue-100" : "bg-gray-100"
            )}>
              {stage.icon}
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{stage.title}</h3>
                  <Badge variant={
                    stage.status === 'completed' ? "success" : 
                    stage.status === 'current' ? "default" : "secondary"
                  }>
                    {stage.status === 'completed' ? 'Completed' : 
                     stage.status === 'current' ? 'Current' : 'Upcoming'}
                  </Badge>
                </div>
                {stage.duration && (
                  <span className="text-sm text-muted-foreground">{stage.duration}</span>
                )}
              </div>
              
              <p className="mt-1 text-muted-foreground">{stage.description}</p>
              
              <div className="mt-2">
                <div className="text-sm font-medium mb-1">Key Skills:</div>
                <div className="flex flex-wrap gap-1">
                  {stage.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="bg-muted">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {stage.requirements && (
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Requirements:</div>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground">
                    {stage.requirements.map(req => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          Career Pathway Visualization
        </CardTitle>
        <CardDescription>
          Your personalized education and career journey for {selectedCareer}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="education">Education Pathway</TabsTrigger>
            <TabsTrigger value="career">Career Pathway</TabsTrigger>
          </TabsList>
          <TabsContent value="education">
            {renderPathwayStages(educationPathway)}
          </TabsContent>
          <TabsContent value="career">
            {renderPathwayStages(careerPathway)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CareerPathway;
