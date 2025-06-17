
import React, { useState } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import GraduateProgramsFilter from '@/components/graduate-programs/GraduateProgramsFilter';
import GraduateProgramsList from '@/components/graduate-programs/GraduateProgramsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Award, TrendingUp } from 'lucide-react';

const GraduateProgramsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    university: '',
    degreeLevel: '',
    fieldOfStudy: '',
    programFormat: '',
    fundingType: '',
  });

  // Mock data for filter options
  const universities = [
    'American University of Sharjah',
    'United Arab Emirates University',
    'Khalifa University',
    'American University of Dubai',
    'Zayed University'
  ];

  const degreeLevels = [
    "Master's",
    'PhD',
    'Professional',
    'Executive'
  ];

  const fieldsOfStudy = [
    'Engineering',
    'Business Administration',
    'Computer Science',
    'Medicine',
    'Education',
    'Law',
    'Arts & Humanities'
  ];

  const stats = [
    {
      value: '150+',
      label: 'Available Programs',
      description: 'Graduate programs across UAE universities',
      icon: GraduationCap,
    },
    {
      value: '25+',
      label: 'Partner Universities',
      description: 'Leading educational institutions',
      icon: Award,
    },
    {
      value: '85%',
      label: 'Success Rate',
      description: 'Students completing their programs',
      icon: TrendingUp,
    },
    {
      value: '10K+',
      label: 'Alumni Network',
      description: 'Graduate program alumni',
      icon: Users,
    },
  ];

  return (
    <EducationPathwayLayout
      title="Graduate Programs"
      description="Advance your career with master's, doctoral, and professional programs from leading UAE universities"
      icon={<GraduationCap className="h-8 w-8" />}
      stats={stats}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">
              Unlock Your Potential with Graduate Education
            </CardTitle>
            <CardDescription className="text-blue-700 text-lg">
              Explore master's degrees, PhD programs, and professional certifications 
              designed to advance your career and expertise in the UAE's dynamic economy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/80 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Master's Programs</h4>
                <p className="text-sm text-blue-600">
                  Specialized degrees to deepen your expertise in your chosen field.
                </p>
              </div>
              <div className="bg-white/80 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">PhD Programs</h4>
                <p className="text-sm text-blue-600">
                  Research-focused doctoral programs for academic and industry leadership.
                </p>
              </div>
              <div className="bg-white/80 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Professional Certificates</h4>
                <p className="text-sm text-blue-600">
                  Industry-recognized credentials for career advancement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <GraduateProgramsFilter
              filters={filters}
              onFilterChange={setFilters}
              universities={universities}
              degreeLevels={degreeLevels}
              fieldsOfStudy={fieldsOfStudy}
            />
          </div>

          {/* Programs List */}
          <div className="lg:col-span-3">
            <GraduateProgramsList filters={filters} />
          </div>
        </div>
      </div>
    </EducationPathwayLayout>
  );
};

export default GraduateProgramsPage;
