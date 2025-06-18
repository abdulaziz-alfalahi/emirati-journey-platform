
import React from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Monitor, Users, BookOpen, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const LMSPage: React.FC = () => {
  const stats = [
    { value: "500+", label: "Online Courses", icon: Monitor },
    { value: "10,000+", label: "Active Learners", icon: Users },
    { value: "50+", label: "Subjects", icon: BookOpen },
    { value: "1,200+", label: "Certifications Issued", icon: Trophy }
  ];

  const courses = [
    {
      title: "Digital Marketing Fundamentals",
      instructor: "Dr. Ahmed Al-Rashid",
      progress: 75,
      students: 234,
      duration: "6 weeks"
    },
    {
      title: "Data Science with Python",
      instructor: "Prof. Sarah Hassan",
      progress: 45,
      students: 189,
      duration: "8 weeks"
    },
    {
      title: "Project Management Essentials",
      instructor: "Mohammed Al-Maktoum",
      progress: 90,
      students: 156,
      duration: "4 weeks"
    }
  ];

  const tabs = [
    {
      id: "courses",
      label: "My Courses",
      icon: <Monitor className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <p className="text-muted-foreground">by {course.instructor}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{course.students} students</span>
                    <span>{course.duration}</span>
                  </div>
                  <Button className="w-full">Continue Learning</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <EducationPathwayLayout
      title="Learning Management System"
      description="Access comprehensive online learning resources and track your educational progress"
      icon={<Monitor className="h-12 w-12 text-blue-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="courses"
      actionButtonText="Browse Courses"
      actionButtonHref="#courses"
      academicProgress={[
        {
          courseId: "1",
          courseName: "Digital Marketing Fundamentals",
          progress: 75,
          totalModules: 8,
          completedModules: 6,
          status: "active",
          nextDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      ]}
      academicYear="2024-2025"
    />
  );
};

export default LMSPage;
