
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, TrendingUp, Users, MapPin, ExternalLink, Briefcase, Calendar, Star } from 'lucide-react';

export const EmployerConnections: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  const skillDemand = [
    { skill: 'Python Programming', demand: 95, growth: '+15%', jobs: 450, salary: 'AED 8,000-15,000' },
    { skill: 'Data Analysis', demand: 88, growth: '+22%', jobs: 380, salary: 'AED 7,000-14,000' },
    { skill: 'React Development', demand: 82, growth: '+18%', jobs: 320, salary: 'AED 9,000-16,000' },
    { skill: 'Digital Marketing', demand: 79, growth: '+12%', jobs: 290, salary: 'AED 6,000-12,000' },
    { skill: 'Cybersecurity', demand: 91, growth: '+28%', jobs: 180, salary: 'AED 10,000-18,000' },
    { skill: 'Cloud Computing', demand: 85, growth: '+25%', jobs: 220, salary: 'AED 9,500-17,000' },
    { skill: 'Machine Learning', demand: 78, growth: '+35%', jobs: 150, salary: 'AED 12,000-20,000' },
    { skill: 'UX/UI Design', demand: 73, growth: '+14%', jobs: 200, salary: 'AED 7,500-14,000' }
  ];

  const topEmployers = [
    {
      id: 1,
      name: 'Emirates NBD',
      industry: 'Banking & Finance',
      size: 'Large (10,000+)',
      location: 'Dubai, UAE',
      hiringSkills: ['Data Analysis', 'Python', 'Cybersecurity', 'Digital Marketing'],
      openPositions: 25,
      averageSalary: 'AED 12,000-18,000',
      benefits: ['Health Insurance', 'Annual Bonus', 'Training Budget', 'Flexible Hours'],
      cultureScore: 4.2,
      description: 'Leading banking group seeking digital talent for transformation initiatives'
    },
    {
      id: 2,
      name: 'Dubai Municipality',
      industry: 'Government',
      size: 'Large (5,000+)',
      location: 'Dubai, UAE',
      hiringSkills: ['Data Science', 'IoT', 'AI/ML', 'Cloud Computing'],
      openPositions: 18,
      averageSalary: 'AED 10,000-16,000',
      benefits: ['Government Benefits', 'Job Security', 'Professional Development', 'Work-Life Balance'],
      cultureScore: 4.0,
      description: 'Smart city initiatives driving demand for cutting-edge technology skills'
    },
    {
      id: 3,
      name: 'Careem',
      industry: 'Technology',
      size: 'Medium (1,000-5,000)',
      location: 'Dubai, UAE',
      hiringSkills: ['React', 'Node.js', 'Mobile Development', 'Data Engineering'],
      openPositions: 32,
      averageSalary: 'AED 11,000-19,000',
      benefits: ['Stock Options', 'Flexible Work', 'Learning Budget', 'Health Coverage'],
      cultureScore: 4.5,
      description: 'Super app platform expanding across MENA region with rapid growth'
    },
    {
      id: 4,
      name: 'ADNOC',
      industry: 'Energy',
      size: 'Large (20,000+)',
      location: 'Abu Dhabi, UAE',
      hiringSkills: ['Data Analytics', 'IoT', 'Cybersecurity', 'AI/ML'],
      openPositions: 15,
      averageSalary: 'AED 13,000-20,000',
      benefits: ['Housing Allowance', 'Transportation', 'Insurance', 'Career Growth'],
      cultureScore: 4.1,
      description: 'Energy giant investing heavily in digital transformation and sustainability'
    },
    {
      id: 5,
      name: 'Noon',
      industry: 'E-commerce',
      size: 'Medium (1,000-5,000)',
      location: 'Dubai, UAE',
      hiringSkills: ['Python', 'React', 'Data Science', 'Digital Marketing'],
      openPositions: 28,
      averageSalary: 'AED 9,000-16,000',
      benefits: ['Employee Discounts', 'Flexible Hours', 'Learning Opportunities', 'Team Events'],
      cultureScore: 4.3,
      description: 'Leading e-commerce platform revolutionizing online shopping in the region'
    },
    {
      id: 6,
      name: 'Dubai Health Authority',
      industry: 'Healthcare',
      size: 'Large (10,000+)',
      location: 'Dubai, UAE',
      hiringSkills: ['Data Analytics', 'Python', 'Healthcare IT', 'Cybersecurity'],
      openPositions: 12,
      averageSalary: 'AED 8,500-15,000',
      benefits: ['Medical Benefits', 'Continuing Education', 'Research Opportunities', 'Public Service'],
      cultureScore: 3.9,
      description: 'Healthcare innovation and digital health initiatives for better patient outcomes'
    }
  ];

  const filteredEmployers = topEmployers.filter(employer => {
    const matchesIndustry = selectedIndustry === 'all' || employer.industry === selectedIndustry;
    const matchesSize = selectedSize === 'all' || employer.size.includes(selectedSize);
    return matchesIndustry && matchesSize;
  });

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Talent Dubai Meetup',
      employer: 'Multiple Employers',
      date: '2024-04-20',
      type: 'Networking',
      skills: ['Programming', 'Data Science', 'UX Design']
    },
    {
      id: 2,
      title: 'Emirates NBD Digital Careers Fair',
      employer: 'Emirates NBD',
      date: '2024-04-25',
      type: 'Career Fair',
      skills: ['Data Analysis', 'Cybersecurity', 'Digital Marketing']
    },
    {
      id: 3,
      title: 'Government Digital Transformation Workshop',
      employer: 'Dubai Government',
      date: '2024-05-02',
      type: 'Workshop',
      skills: ['Cloud Computing', 'IoT', 'AI/ML']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Employer Connections</h2>
          <p className="text-muted-foreground">Discover which digital skills are in highest demand by UAE employers</p>
        </CardContent>
      </Card>

      {/* Skills in Demand */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Skills in High Demand
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillDemand.slice(0, 6).map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{skill.skill}</h4>
                    <Badge variant="outline" className="text-xs">
                      {skill.demand}% demand
                    </Badge>
                    <Badge variant="secondary" className="text-xs text-green-700">
                      {skill.growth} growth
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <Briefcase className="h-4 w-4 inline mr-1" />
                      {skill.jobs} open positions
                    </div>
                    <div>
                      <span className="font-medium">Salary Range:</span> {skill.salary}
                    </div>
                    <div>
                      <Button size="sm" variant="outline">
                        View Jobs
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employer Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Industry</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Banking & Finance">Banking & Finance</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Company Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="Small">Small (1-100)</SelectItem>
                  <SelectItem value="Medium">Medium (100-1,000)</SelectItem>
                  <SelectItem value="Large">Large (1,000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Jobs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Employers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Top Hiring Employers</h3>
        {filteredEmployers.map((employer) => (
          <Card key={employer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{employer.name}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{employer.industry}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{employer.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{employer.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{employer.cultureScore}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{employer.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Skills in Demand</h4>
                      <div className="flex flex-wrap gap-2">
                        {employer.hiringSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {employer.benefits.slice(0, 3).map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {employer.benefits.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{employer.benefits.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">Salary Range:</span>
                      <span className="text-muted-foreground ml-1">{employer.averageSalary}</span>
                    </div>
                    <div className="text-blue-600 font-medium">
                      {employer.openPositions} open positions
                    </div>
                  </div>
                </div>

                <div className="lg:w-48 flex flex-col gap-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Jobs
                  </Button>
                  <Button variant="outline" className="w-full">
                    Company Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Employer Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{event.employer}</span>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {event.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Register
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
