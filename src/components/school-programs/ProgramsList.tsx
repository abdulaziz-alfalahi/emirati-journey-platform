
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, DollarSign, School, BookOpen } from 'lucide-react';
import { SchoolProgram, ProgramFilters } from '@/types/schoolPrograms';
import ProgramDetailsModal from './ProgramDetailsModal';

interface ProgramsListProps {
  type: 'available' | 'enrolled' | 'managed';
  filters: ProgramFilters;
  searchQuery: string;
}

const ProgramsList: React.FC<ProgramsListProps> = ({ type, filters, searchQuery }) => {
  const [selectedProgram, setSelectedProgram] = useState<SchoolProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - In a real app, this would come from an API
  const mockPrograms: SchoolProgram[] = [
    {
      id: '1',
      title: 'Advanced STEM Academy',
      institution: 'Dubai International School',
      description: 'Comprehensive STEM program focusing on robotics, coding, and scientific research for high school students.',
      subject_area: 'STEM',
      grade_level: 'High School',
      program_type: 'After School',
      age_range: '15-18',
      duration: '10 months',
      schedule: 'Mon, Wed, Fri 3:30-5:30 PM',
      location: 'Dubai International School, Al Barsha',
      capacity: 30,
      enrolled: 24,
      price: 5000,
      currency: 'AED',
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      learning_outcomes: [
        'Master fundamental programming concepts',
        'Design and build robotic systems',
        'Conduct scientific research projects',
        'Develop critical thinking skills'
      ],
      requirements: [
        'Grade 9-12 students',
        'Basic math proficiency',
        'Interest in technology and science',
        'Commitment to full program duration'
      ],
      tags: ['Robotics', 'Programming', 'Science', 'Research'],
      status: 'active',
      registration_deadline: '2024-09-15',
      start_date: '2024-10-01',
      end_date: '2025-06-30',
      created_at: '2024-01-15',
      updated_at: null,
      contact_email: 'stem@dubaiintl.ae',
      contact_phone: '+971-4-123-4567'
    },
    {
      id: '2',
      title: 'Arabic Literary Excellence',
      institution: 'Emirates Heritage Academy',
      description: 'Intensive Arabic language and literature program celebrating Emirati cultural heritage.',
      subject_area: 'Languages',
      grade_level: 'Middle School',
      program_type: 'Weekend',
      age_range: '11-14',
      duration: '6 months',
      schedule: 'Saturdays 9:00 AM - 12:00 PM',
      location: 'Emirates Heritage Academy, Jumeirah',
      capacity: 25,
      enrolled: 18,
      price: 3000,
      currency: 'AED',
      image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
      learning_outcomes: [
        'Advanced Arabic writing skills',
        'Appreciation of Emirati literature',
        'Cultural knowledge and heritage',
        'Public speaking in Arabic'
      ],
      requirements: [
        'Grade 6-8 students',
        'Basic Arabic proficiency',
        'Interest in literature and culture',
        'Regular attendance required'
      ],
      tags: ['Arabic', 'Literature', 'Culture', 'Heritage'],
      status: 'active',
      registration_deadline: '2024-08-30',
      start_date: '2024-09-15',
      end_date: '2025-03-15',
      created_at: '2024-01-10',
      updated_at: null,
      contact_email: 'arabic@heritage.ae',
      contact_phone: '+971-4-234-5678'
    },
    {
      id: '3',
      title: 'Young Entrepreneurs Program',
      institution: 'Business Leaders Academy',
      description: 'Entrepreneurship and business skills program for elementary students.',
      subject_area: 'Business',
      grade_level: 'Elementary',
      program_type: 'After School',
      age_range: '8-11',
      duration: '4 months',
      schedule: 'Tuesdays & Thursdays 3:00-4:30 PM',
      location: 'Business Leaders Academy, Downtown',
      capacity: 20,
      enrolled: 15,
      price: 2500,
      currency: 'AED',
      image_url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400',
      learning_outcomes: [
        'Basic business concepts',
        'Creative problem solving',
        'Teamwork and collaboration',
        'Presentation skills'
      ],
      requirements: [
        'Grade 3-5 students',
        'Curiosity about business',
        'Good communication skills',
        'Parent support for projects'
      ],
      tags: ['Entrepreneurship', 'Business', 'Leadership', 'Innovation'],
      status: 'active',
      registration_deadline: '2024-09-01',
      start_date: '2024-09-15',
      end_date: '2025-01-15',
      created_at: '2024-01-20',
      updated_at: null,
      contact_email: 'young@businessleaders.ae',
      contact_phone: '+971-4-345-6789'
    }
  ];

  const filteredPrograms = mockPrograms.filter(program => {
    // Apply search filter
    if (searchQuery && !program.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !program.institution.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !program.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply grade level filter
    if (filters.gradeLevel && filters.gradeLevel.length > 0 &&
        !filters.gradeLevel.includes(program.grade_level)) {
      return false;
    }

    // Apply subject area filter
    if (filters.subjectArea && filters.subjectArea.length > 0 &&
        !filters.subjectArea.includes(program.subject_area)) {
      return false;
    }

    // Apply program type filter
    if (filters.programType && filters.programType.length > 0 &&
        !filters.programType.includes(program.program_type)) {
      return false;
    }

    return true;
  });

  const handleProgramClick = (program: SchoolProgram) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'full': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (filteredPrograms.length === 0) {
    return (
      <div className="text-center py-12">
        <School className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">No programs found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms to find more programs.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div onClick={() => handleProgramClick(program)}>
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={program.image_url} 
                  alt={program.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(program.status)}>
                    {program.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{program.title}</CardTitle>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <School className="h-4 w-4 mr-1" />
                  {program.institution}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {program.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-ehrdc-teal" />
                    {program.grade_level}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-ehrdc-teal" />
                    {program.duration}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-ehrdc-teal" />
                    {program.location.split(',')[0]}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-ehrdc-teal" />
                    {program.enrolled}/{program.capacity}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-ehrdc-teal" />
                    <span className="font-semibold">{program.price.toLocaleString()} {program.currency}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {program.subject_area}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 pt-2">
                  {program.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {program.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{program.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
      
      {selectedProgram && (
        <ProgramDetailsModal
          program={selectedProgram}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProgramsList;
