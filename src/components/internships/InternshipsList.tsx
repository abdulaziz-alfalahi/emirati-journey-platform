
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Calendar, DollarSign, Users, Building2 } from 'lucide-react';
import { Internship } from '@/types/internships';

const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    description: 'Join our development team to work on cutting-edge web applications',
    company: 'Tech Innovators LLC',
    location: 'Dubai, UAE',
    start_date: '2024-06-01',
    end_date: '2024-08-31',
    application_deadline: '2024-05-15',
    is_paid: true,
    stipend_amount: 3000,
    currency: 'AED',
    requirements: ['Computer Science student', 'Basic programming knowledge'],
    skills_required: ['JavaScript', 'React', 'Node.js'],
    industry: 'Technology',
    department: 'Engineering',
    education_level: 'Bachelor',
    contact_email: 'internships@techinnovators.ae',
    contact_phone: '+971-4-123-4567',
    website_url: 'https://techinnovators.ae',
    is_active: true,
    created_at: '2024-01-15T00:00:00Z',
    created_by: 'admin'
  },
  {
    id: '2',
    title: 'Marketing Intern',
    description: 'Support our marketing campaigns and digital strategy initiatives',
    company: 'Emirates Marketing Group',
    location: 'Abu Dhabi, UAE',
    start_date: '2024-07-01',
    end_date: '2024-09-30',
    application_deadline: '2024-06-01',
    is_paid: true,
    stipend_amount: 2500,
    currency: 'AED',
    requirements: ['Marketing or Business student', 'Creative mindset'],
    skills_required: ['Social Media', 'Content Creation', 'Analytics'],
    industry: 'Marketing',
    department: 'Marketing',
    education_level: 'Bachelor',
    contact_email: 'careers@emiratesmarketing.ae',
    is_active: true,
    created_at: '2024-01-20T00:00:00Z',
    created_by: 'admin'
  }
];

export const InternshipsList: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<{
    industry: string[];
    location: string[];
    isPaid: boolean | null;
  }>({
    industry: [],
    location: [],
    isPaid: null
  });

  const { data: internships = [], isLoading, error } = useQuery({
    queryKey: ['internships', selectedFilters],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockInternships;
    }
  });

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-ehrdc-teal" />
        <span className="ml-2 text-lg">Loading internships...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load internships</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-ehrdc-teal">Available Internships</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {internships.length} opportunities
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {internships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-ehrdc-teal line-clamp-2">
                  {internship.title}
                </CardTitle>
                {internship.is_paid && (
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                )}
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="h-4 w-4 mr-1" />
                <span className="font-medium">{internship.company}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-700 line-clamp-3">{internship.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{internship.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Apply by {formatDate(internship.application_deadline)}</span>
                </div>
                
                {internship.is_paid && internship.stipend_amount && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{formatCurrency(internship.stipend_amount, internship.currency || 'AED')}/month</span>
                  </div>
                )}
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{internship.industry}</span>
                </div>
              </div>

              {internship.skills_required && internship.skills_required.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Required Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {internship.skills_required.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {internship.skills_required.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{internship.skills_required.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                  Apply Now
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {internships.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No internships found</p>
            <p className="text-sm">Try adjusting your search filters</p>
          </div>
        </div>
      )}
    </div>
  );
};
