
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, MapPin, ExternalLink, Mail, Phone, Award } from 'lucide-react';
import { EducationalInstitution } from '@/types/schoolPrograms';

const InstitutionDirectory: React.FC = () => {
  // Mock data - In a real app, this would come from an API
  const institutions: EducationalInstitution[] = [
    {
      id: '1',
      name: 'Dubai International School',
      type: 'international',
      description: 'Leading international school offering world-class education with focus on STEM and innovation.',
      location: 'Al Barsha, Dubai',
      website_url: 'https://dubaiintl.ae',
      contact_email: 'info@dubaiintl.ae',
      contact_phone: '+971-4-123-4567',
      logo_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100',
      programs_count: 15,
      established_year: 1995,
      accreditation: ['IB', 'CIS', 'NEASC'],
      specializations: ['STEM', 'Arts', 'Languages'],
      grade_levels_served: ['Elementary', 'Middle School', 'High School'],
      created_at: '2024-01-01',
      updated_at: null
    },
    {
      id: '2',
      name: 'Emirates Heritage Academy',
      type: 'private',
      description: 'Dedicated to preserving and promoting Emirati culture and Arabic language excellence.',
      location: 'Jumeirah, Dubai',
      website_url: 'https://heritage.ae',
      contact_email: 'info@heritage.ae',
      contact_phone: '+971-4-234-5678',
      logo_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100',
      programs_count: 8,
      established_year: 2005,
      accreditation: ['UAE MOE', 'KHDA'],
      specializations: ['Arabic Language', 'Islamic Studies', 'Cultural Heritage'],
      grade_levels_served: ['Elementary', 'Middle School'],
      created_at: '2024-01-01',
      updated_at: null
    },
    {
      id: '3',
      name: 'Business Leaders Academy',
      type: 'specialized',
      description: 'Innovative academy focusing on entrepreneurship and business skills for young minds.',
      location: 'Downtown Dubai',
      website_url: 'https://businessleaders.ae',
      contact_email: 'info@businessleaders.ae',
      contact_phone: '+971-4-345-6789',
      logo_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100',
      programs_count: 12,
      established_year: 2010,
      accreditation: ['UAE MOE', 'Business Education Council'],
      specializations: ['Entrepreneurship', 'Business Studies', 'Leadership'],
      grade_levels_served: ['Elementary', 'Middle School', 'High School'],
      created_at: '2024-01-01',
      updated_at: null
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'public': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-green-100 text-green-800';
      case 'international': return 'bg-purple-100 text-purple-800';
      case 'specialized': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {institutions.map((institution) => (
        <Card key={institution.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {institution.logo_url ? (
                  <img 
                    src={institution.logo_url} 
                    alt={institution.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-ehrdc-teal rounded-lg flex items-center justify-center">
                    <School className="h-6 w-6 text-white" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-lg">{institution.name}</CardTitle>
                  <Badge className={getTypeColor(institution.type)}>
                    {institution.type.charAt(0).toUpperCase() + institution.type.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {institution.description}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-ehrdc-teal" />
                <span>{institution.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-ehrdc-teal" />
                <span>{institution.programs_count} Programs Available</span>
              </div>
              
              {institution.established_year && (
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-ehrdc-teal" />
                  <span>Established {institution.established_year}</span>
                </div>
              )}
            </div>

            {/* Specializations */}
            <div>
              <h4 className="text-sm font-medium mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-1">
                {institution.specializations.map((spec) => (
                  <Badge key={spec} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Grade Levels */}
            <div>
              <h4 className="text-sm font-medium mb-2">Grade Levels</h4>
              <div className="flex flex-wrap gap-1">
                {institution.grade_levels_served.map((grade) => (
                  <Badge key={grade} variant="secondary" className="text-xs">
                    {grade}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Accreditations */}
            <div>
              <h4 className="text-sm font-medium mb-2">Accreditations</h4>
              <div className="flex flex-wrap gap-1">
                {institution.accreditation.map((acc) => (
                  <Badge key={acc} className="text-xs bg-green-100 text-green-800">
                    {acc}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 pt-2 border-t">
              {institution.contact_email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-ehrdc-teal" />
                  <a 
                    href={`mailto:${institution.contact_email}`}
                    className="text-ehrdc-teal hover:underline"
                  >
                    {institution.contact_email}
                  </a>
                </div>
              )}
              
              {institution.contact_phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-ehrdc-teal" />
                  <a 
                    href={`tel:${institution.contact_phone}`}
                    className="text-ehrdc-teal hover:underline"
                  >
                    {institution.contact_phone}
                  </a>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                View Programs
              </Button>
              {institution.website_url && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(institution.website_url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InstitutionDirectory;
