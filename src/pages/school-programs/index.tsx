
import React from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { BookOpen, Users, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SchoolProgramsPage: React.FC = () => {
  const stats = [
    { value: "50+", label: "Partner Schools", icon: BookOpen },
    { value: "5,000+", label: "Students Enrolled", icon: Users },
    { value: "20+", label: "Specialized Programs", icon: Award },
    { value: "95%", label: "Success Rate", icon: Target }
  ];

  const programs = [
    {
      title: "Advanced STEM Program",
      description: "Accelerated science and mathematics curriculum for gifted students",
      grades: "Grades 9-12",
      schools: "15 Partner Schools"
    },
    {
      title: "Leadership Development",
      description: "Building tomorrow's leaders through practical leadership experiences",
      grades: "Grades 10-12", 
      schools: "25 Partner Schools"
    },
    {
      title: "Innovation Lab",
      description: "Hands-on technology and engineering projects",
      grades: "Grades 6-12",
      schools: "30 Partner Schools"
    }
  ];

  const tabs = [
    {
      id: "programs",
      label: "Available Programs",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{program.title}</CardTitle>
                <p className="text-muted-foreground">{program.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Target:</span>
                    <span>{program.grades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Availability:</span>
                    <span>{program.schools}</span>
                  </div>
                </div>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <EducationPathwayLayout
      title="School Programs"
      description="Specialized educational programs designed to enhance learning experiences in partnership with schools across the UAE"
      icon={<BookOpen className="h-12 w-12 text-green-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="programs"
      actionButtonText="Explore Programs"
      actionButtonHref="#programs"
      academicYear="2024-2025"
    />
  );
};

export default SchoolProgramsPage;
