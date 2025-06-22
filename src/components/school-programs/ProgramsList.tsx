
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { ProgramFilters } from '@/types/schoolPrograms';

interface ProgramsListProps {
  type: 'available' | 'enrolled' | 'managed';
  filters: ProgramFilters;
  searchQuery: string;
}

const ProgramsList: React.FC<ProgramsListProps> = ({ type, filters, searchQuery }) => {
  const { t } = useTranslation('school-programs');
  const { isRTL } = useLanguage();

  // Mock data for programs
  const programs = [
    {
      id: '1',
      title: t('programs.innovationLab.title'),
      description: t('programs.innovationLab.description'),
      institution: 'Dubai International School',
      gradeLevel: ['Elementary'],
      subjectArea: ['STEM'],
      programType: ['After School'],
      ageRange: t('programs.innovationLab.ageGroup'),
      duration: t('programs.innovationLab.duration'),
      schedule: 'Tuesdays & Thursdays, 3:30pm - 5:00pm',
      location: t('programs.innovationLab.location'),
      startDate: '2024-09-15',
      enrollmentStatus: 'Open',
      spotsAvailable: 15,
      image: 'https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?w=500&h=350&fit=crop&crop=focalpoint'
    },
    {
      id: '2',
      title: t('programs.leadershipDevelopment.title'),
      description: t('programs.leadershipDevelopment.description'),
      institution: 'Emirates Heritage Academy',
      gradeLevel: ['Middle School', 'High School'],
      subjectArea: ['Languages'],
      programType: ['Weekend'],
      ageRange: t('programs.leadershipDevelopment.ageGroup'),
      duration: t('programs.leadershipDevelopment.duration'),
      schedule: 'Saturdays, 10:00am - 1:00pm',
      location: t('programs.leadershipDevelopment.location'),
      startDate: '2024-09-10',
      enrollmentStatus: 'Open',
      spotsAvailable: 8,
      image: 'https://images.unsplash.com/photo-1588580000645-4562a6d2c839?w=500&h=350&fit=crop&crop=focalpoint'
    },
    {
      id: '3',
      title: t('programs.advancedStem.title'),
      description: t('programs.advancedStem.description'),
      institution: 'Business Leaders Academy',
      gradeLevel: ['High School'],
      subjectArea: ['Business'],
      programType: ['Summer', 'Intensive'],
      ageRange: t('programs.advancedStem.ageGroup'),
      duration: t('programs.advancedStem.duration'),
      schedule: 'Monday-Thursday, 9:00am - 2:00pm',
      location: t('programs.advancedStem.location'),
      startDate: '2024-07-05',
      enrollmentStatus: 'Coming Soon',
      spotsAvailable: 20,
      image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=500&h=350&fit=crop&crop=focalpoint'
    }
  ];

  // Filter programs based on filters and search
  const filteredPrograms = programs.filter(program => {
    // Filter by grade level
    if (filters.gradeLevel && filters.gradeLevel.length > 0) {
      if (!filters.gradeLevel.some(level => program.gradeLevel.includes(level))) {
        return false;
      }
    }
    
    // Filter by subject area
    if (filters.subjectArea && filters.subjectArea.length > 0) {
      if (!filters.subjectArea.some(area => program.subjectArea.includes(area))) {
        return false;
      }
    }
    
    // Filter by program type
    if (filters.programType && filters.programType.length > 0) {
      if (!filters.programType.some(type => program.programType.includes(type))) {
        return false;
      }
    }
    
    // Search by title or institution
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        program.title.toLowerCase().includes(query) || 
        program.institution.toLowerCase().includes(query) ||
        program.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  if (filteredPrograms.length === 0) {
    return (
      <Card className="bg-muted/20">
        <CardContent className="py-12 text-center">
          <School className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('ui.search.noResults')}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t('ui.search.noResultsDescription')}
          </p>
          {type === 'available' && (
            <Button variant="outline" className="mt-4">
              {t('ui.filters.clearFilters')}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {filteredPrograms.map((program) => (
        <Card key={program.id} className="hover:shadow-md transition-shadow overflow-hidden">
          <CardContent className="p-0">
            <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/3 h-48 md:h-auto bg-muted relative overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 space-x-2 ${isRTL ? 'right-3' : 'left-3'}`}>
                  {program.programType.map((type) => (
                    <Badge key={type} className="bg-white/90 text-ehrdc-teal text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <div className={`mb-2 flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="font-semibold text-xl">{program.title}</h3>
                  <Badge className={
                    program.enrollmentStatus === 'Open' ? 'bg-green-100 text-green-800' : 
                    program.enrollmentStatus === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  } variant="secondary">
                    {program.enrollmentStatus === 'Open' ? t('ui.status.registrationOpen') : 
                     program.enrollmentStatus === 'Coming Soon' ? t('ui.status.registrationClosed') :
                     program.enrollmentStatus}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {program.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <School className="h-4 w-4 text-ehrdc-teal" />
                    <span>{program.institution}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Users className="h-4 w-4 text-ehrdc-teal" />
                    <span>{program.ageRange}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Clock className="h-4 w-4 text-ehrdc-teal" />
                    <span>{program.duration}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin className="h-4 w-4 text-ehrdc-teal" />
                    <span>{program.location}</span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="h-4 w-4 text-ehrdc-teal" />
                  <span className="text-sm">
                    {t('info.startDate')} {new Date(program.startDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className={`flex flex-wrap items-center justify-between gap-4 mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {program.gradeLevel.map((level) => (
                      <Badge key={level} variant="outline" className="text-xs">{level}</Badge>
                    ))}
                    {program.subjectArea.map((area) => (
                      <Badge key={area} variant="outline" className="text-xs">{area}</Badge>
                    ))}
                  </div>
                  
                  <Button className="ehrdc-button-primary">
                    {type === 'enrolled' ? t('ui.buttons.viewDetails') : 
                     type === 'managed' ? 'Manage Program' : t('ui.buttons.applyNow')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgramsList;
