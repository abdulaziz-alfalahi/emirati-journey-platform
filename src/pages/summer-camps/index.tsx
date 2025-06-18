
import React from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SummerCampsPage: React.FC = () => {
  const stats = [
    { value: "25+", label: "Summer Programs", icon: Calendar },
    { value: "1,200+", label: "Students Enrolled", icon: Users },
    { value: "15+", label: "Partner Institutions", icon: Award },
    { value: "7", label: "Emirates Covered", icon: MapPin }
  ];

  const camps = [
    {
      title: "STEM Innovation Camp",
      description: "Explore science, technology, engineering, and math through hands-on projects",
      duration: "2 weeks",
      ageGroup: "12-16 years",
      location: "Dubai",
      price: "AED 1,500"
    },
    {
      title: "Entrepreneurship Bootcamp",
      description: "Learn business fundamentals and develop your own startup idea",
      duration: "3 weeks",
      ageGroup: "16-18 years", 
      location: "Abu Dhabi",
      price: "AED 2,000"
    },
    {
      title: "Digital Arts & Design",
      description: "Master digital creativity tools and design principles",
      duration: "2 weeks",
      ageGroup: "14-18 years",
      location: "Sharjah",
      price: "AED 1,800"
    }
  ];

  const tabs = [
    {
      id: "programs",
      label: "Available Programs",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{camp.title}</CardTitle>
                <p className="text-muted-foreground">{camp.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>{camp.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Age Group:</span>
                    <span>{camp.ageGroup}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Location:</span>
                    <span>{camp.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Price:</span>
                    <Badge variant="secondary">{camp.price}</Badge>
                  </div>
                </div>
                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <EducationPathwayLayout
      title="Summer Camps"
      description="Engage in exciting educational summer programs designed to inspire learning and personal growth"
      icon={<Calendar className="h-12 w-12 text-orange-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="programs"
      actionButtonText="Browse Programs"
      actionButtonHref="#programs"
      announcements={[
        {
          id: "1",
          title: "Early Bird Registration Open",
          message: "Register before March 1st and save 20% on all summer camp programs.",
          type: "info",
          date: new Date(),
          urgent: false
        }
      ]}
      academicYear="Summer 2024"
    />
  );
};

export default SummerCampsPage;
