
import React from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { GraduationCap, Users, BookOpen, Award, Target, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GraduateProgramsPage: React.FC = () => {
  const stats = [
    { value: "100+", label: "Graduate Programs", icon: GraduationCap },
    { value: "25+", label: "Partner Universities", icon: Building },
    { value: "2,500+", label: "Graduate Students", icon: Users },
    { value: "90%", label: "Employment Rate", icon: Target }
  ];

  const programs = [
    {
      title: "Master of Business Administration (MBA)",
      university: "American University of Sharjah",
      duration: "18 months",
      type: "Full-time",
      specializations: ["Finance", "Marketing", "Operations"],
      tuition: "AED 85,000"
    },
    {
      title: "Master of Science in Data Science",
      university: "University of Dubai",
      duration: "24 months",
      type: "Part-time",
      specializations: ["Machine Learning", "Big Data", "Analytics"],
      tuition: "AED 72,000"
    },
    {
      title: "Master of Engineering Management",
      university: "Khalifa University",
      duration: "20 months",
      type: "Executive",
      specializations: ["Project Management", "Innovation", "Leadership"],
      tuition: "AED 95,000"
    },
    {
      title: "Master of Public Administration",
      university: "UAE University",
      duration: "16 months",
      type: "Full-time",
      specializations: ["Policy Analysis", "Public Finance", "Governance"],
      tuition: "AED 68,000"
    }
  ];

  const tabs = [
    {
      id: "programs",
      label: "Available Programs",
      icon: <GraduationCap className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                  <Badge variant="secondary">{program.type}</Badge>
                </div>
                <p className="text-muted-foreground">{program.university}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tuition:</span>
                    <span className="font-medium text-ehrdc-teal">{program.tuition}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Specializations:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {program.specializations.map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: "requirements",
      label: "Requirements",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                General Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Bachelor's degree from accredited institution</li>
                <li>• Minimum GPA of 3.0 (or equivalent)</li>
                <li>• English proficiency (IELTS 6.5+ or TOEFL 90+)</li>
                <li>• Statement of purpose</li>
                <li>• Two letters of recommendation</li>
                <li>• Updated CV/Resume</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Program-Specific Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• MBA: GMAT/GRE scores, work experience</li>
                <li>• Data Science: Programming background</li>
                <li>• Engineering: Relevant technical degree</li>
                <li>• Public Admin: Government/NGO experience preferred</li>
                <li>• Portfolio submissions for creative programs</li>
                <li>• Interview rounds for select programs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "funding",
      label: "Funding & Aid",
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Funding Opportunities Available</h3>
          <p className="text-muted-foreground mb-4">
            Explore scholarships, grants, and financial aid options for graduate studies.
          </p>
          <Button>View Funding Options</Button>
        </div>
      )
    }
  ];

  return (
    <EducationPathwayLayout
      title="Graduate Programs"
      description="Master's, PhD, and advanced degree programs from top universities across the UAE for continued academic excellence"
      icon={<GraduationCap className="h-12 w-12 text-purple-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="programs"
      actionButtonText="Explore Programs"
      actionButtonHref="#programs"
      academicYear="2024-2025"
    />
  );
};

export default GraduateProgramsPage;
