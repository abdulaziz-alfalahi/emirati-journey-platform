
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GraduateProgramCard from '@/components/graduate-programs/GraduateProgramCard';
import GraduateProgramsFilter from '@/components/graduate-programs/GraduateProgramsFilter';
import { ApplicationTracker } from '@/components/graduate-programs/ApplicationTracker';
import { ProgramExplorer } from '@/components/graduate-programs/ProgramExplorer';
import { AlumniInsights } from '@/components/graduate-programs/AlumniInsights';
import { ProgramCalendar } from '@/components/graduate-programs/ProgramCalendar';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Calendar,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Target,
  Globe
} from 'lucide-react';

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
  programFormat: string;
  fundingType: string;
}

const GraduateProgramsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    university: '',
    degreeLevel: '',
    fieldOfStudy: '',
    programFormat: '',
    fundingType: ''
  });

  // Mock data for programs
  const programs = [
    {
      id: '1',
      university_name: 'American University of Sharjah',
      program_name: 'Master of Science in Computer Science',
      degree_level: 'Master\'s',
      field_of_study: 'Computer Science',
      description: 'Advanced computer science program focusing on AI, machine learning, and software engineering.',
      duration_years: 2,
      application_deadline: '2024-03-15',
      program_url: 'https://aus.edu/cs-masters',
      is_active: true,
      created_at: '2024-01-01'
    },
    {
      id: '2',
      university_name: 'United Arab Emirates University',
      program_name: 'PhD in Engineering',
      degree_level: 'PhD',
      field_of_study: 'Engineering',
      description: 'Research-focused doctoral program in various engineering disciplines.',
      duration_years: 4,
      application_deadline: '2024-04-30',
      program_url: 'https://uaeu.ac.ae/phd-engineering',
      is_active: true,
      created_at: '2024-01-01'
    }
  ];

  const universities = Array.from(new Set(programs.map(p => p.university_name)));
  const degreeLevels = Array.from(new Set(programs.map(p => p.degree_level)));
  const fieldsOfStudy = Array.from(new Set(programs.map(p => p.field_of_study)));

  const filteredPrograms = programs.filter(program => {
    return (
      (!filters.search || program.program_name.toLowerCase().includes(filters.search.toLowerCase()) ||
       program.university_name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.university || program.university_name === filters.university) &&
      (!filters.degreeLevel || program.degree_level === filters.degreeLevel) &&
      (!filters.fieldOfStudy || program.field_of_study === filters.fieldOfStudy)
    );
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30L15 15v30l15-15zm15 0L30 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <GraduationCap className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Graduate Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Advance your career with master's, doctoral, and professional programs from top universities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-gray-50 font-semibold"
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Programs
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-700"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Application Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Graduate Programs</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25</div>
              <div className="text-gray-600">Partner Universities</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
              <div className="text-gray-600">Scholarship Rate</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">30+</div>
              <div className="text-gray-600">Countries Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <GraduateProgramsFilter
                filters={filters}
                onFilterChange={setFilters}
                universities={universities}
                degreeLevels={degreeLevels}
                fieldsOfStudy={fieldsOfStudy}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="browse">Browse Programs</TabsTrigger>
                  <TabsTrigger value="explorer">Program Explorer</TabsTrigger>
                  <TabsTrigger value="tracker">Application Tracker</TabsTrigger>
                  <TabsTrigger value="alumni">Alumni Insights</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar & Events</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {filteredPrograms.length} Programs Found
                    </h2>
                    <div className="flex gap-2">
                      <Select defaultValue="deadline">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deadline">Application Deadline</SelectItem>
                          <SelectItem value="name">Program Name</SelectItem>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="level">Degree Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {filteredPrograms.map((program) => (
                      <GraduateProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="explorer" className="space-y-6">
                  <ProgramExplorer />
                </TabsContent>

                <TabsContent value="tracker" className="space-y-6">
                  <ApplicationTracker />
                </TabsContent>

                <TabsContent value="alumni" className="space-y-6">
                  <AlumniInsights />
                </TabsContent>

                <TabsContent value="calendar" className="space-y-6">
                  <ProgramCalendar />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GraduateProgramsPage;
