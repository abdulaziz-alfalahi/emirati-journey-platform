import React from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Award, Users, DollarSign, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ScholarshipsPage: React.FC = () => {
  const stats = [
    { value: "200+", label: "Available Scholarships", icon: Award },
    { value: "1,500+", label: "Recipients Annually", icon: Users },
    { value: "AED 50M+", label: "Total Awards", icon: DollarSign },
    { value: "15+", label: "Partner Universities", icon: GraduationCap }
  ];

  const scholarships = [
    {
      title: "Excellence Merit Scholarship",
      description: "Full tuition coverage for outstanding academic achievement",
      amount: "Full Tuition",
      eligibility: "GPA 3.8+",
      deadline: "March 15, 2024"
    },
    {
      title: "STEM Innovation Grant",
      description: "Supporting students pursuing science and technology degrees",
      amount: "AED 75,000",
      eligibility: "STEM Field",
      deadline: "April 1, 2024"
    },
    {
      title: "Community Leadership Award",
      description: "Recognizing students with exceptional community service",
      amount: "AED 50,000",
      eligibility: "100+ Service Hours",
      deadline: "May 1, 2024"
    }
  ];

  const tabs = [
    {
      id: "available",
      label: "Available Scholarships",
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                <p className="text-muted-foreground">{scholarship.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Award Amount:</span>
                    <Badge variant="default">{scholarship.amount}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Eligibility:</span>
                    <span>{scholarship.eligibility}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Deadline:</span>
                    <span className="text-red-600">{scholarship.deadline}</span>
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
      title="Scholarships"
      description="Discover financial support opportunities to pursue your educational dreams and academic excellence"
      icon={<Award className="h-12 w-12 text-yellow-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="available"
      actionButtonText="Browse Scholarships"
      actionButtonHref="#available"
      academicYear="2024-2025"
    />
  );
};

export default ScholarshipsPage;
