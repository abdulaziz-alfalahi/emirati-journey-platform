
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, TrendingUp, Users, DollarSign, GraduationCap, 
  Building, MapPin, Target, Briefcase, Star 
} from 'lucide-react';

export const IndustryProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const industries = [
    {
      id: 'energy',
      name: 'Energy & Oil',
      category: 'Traditional',
      importance: 'Backbone of UAE economy, driving 30% of GDP',
      keyPlayers: ['ADNOC', 'Emirates Nuclear Energy Corporation', 'Masdar'],
      qualifications: ['Engineering degrees', 'Technical certifications', 'Safety training'],
      salaryRange: 'AED 8,000 - 35,000',
      careerPath: 'Technician → Engineer → Senior Engineer → Manager → Director',
      trends: ['Renewable energy expansion', 'Digital transformation', 'Sustainability focus'],
      emiratization: 65,
      growth: 15,
      workLifeBalance: 4,
      entryLevel: 'Moderate',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'finance',
      name: 'Banking & Finance',
      category: 'Services',
      importance: 'Regional financial hub connecting global markets',
      keyPlayers: ['Emirates NBD', 'ADCB', 'Dubai Islamic Bank', 'ADGM'],
      qualifications: ['Finance/Economics degrees', 'CFA certification', 'Risk management'],
      salaryRange: 'AED 6,000 - 40,000',
      careerPath: 'Analyst → Associate → VP → Director → Managing Director',
      trends: ['Islamic finance growth', 'Fintech innovation', 'Digital banking'],
      emiratization: 78,
      growth: 22,
      workLifeBalance: 3,
      entryLevel: 'High',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'technology',
      name: 'Technology & AI',
      category: 'Emerging',
      importance: 'Key driver of UAE Vision 2071 and digital transformation',
      keyPlayers: ['Dubai Future Foundation', 'Microsoft UAE', 'Careem', 'Noon'],
      qualifications: ['Computer Science', 'AI/ML specialization', 'Cloud certifications'],
      salaryRange: 'AED 8,000 - 50,000',
      careerPath: 'Developer → Senior Dev → Team Lead → Architect → CTO',
      trends: ['AI implementation', 'Smart city initiatives', 'Blockchain adoption'],
      emiratization: 55,
      growth: 45,
      workLifeBalance: 4,
      entryLevel: 'Moderate',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'tourism',
      name: 'Tourism & Hospitality',
      category: 'Services',
      importance: 'Diversification pillar attracting 20M+ visitors annually',
      keyPlayers: ['Emirates Group', 'Jumeirah', 'Atlantis', 'Dubai Tourism'],
      qualifications: ['Hospitality management', 'Languages', 'Customer service'],
      salaryRange: 'AED 4,000 - 25,000',
      careerPath: 'Associate → Supervisor → Manager → Director → GM',
      trends: ['Sustainable tourism', 'Cultural experiences', 'Luxury segment growth'],
      emiratization: 45,
      growth: 35,
      workLifeBalance: 3,
      entryLevel: 'Easy',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      category: 'Essential',
      importance: 'Growing medical tourism and aging population needs',
      keyPlayers: ['DHA', 'SEHA', 'Mediclinic', 'Cleveland Clinic Abu Dhabi'],
      qualifications: ['Medical degrees', 'DHA/MOH licensing', 'Specialized training'],
      salaryRange: 'AED 10,000 - 60,000',
      careerPath: 'Resident → Specialist → Consultant → Head of Department',
      trends: ['Telemedicine', 'Medical tourism', 'Preventive care focus'],
      emiratization: 72,
      growth: 25,
      workLifeBalance: 3,
      entryLevel: 'High',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'construction',
      name: 'Construction & Real Estate',
      category: 'Traditional',
      importance: 'Infrastructure development supporting economic growth',
      keyPlayers: ['Emaar', 'Aldar', 'TDIC', 'Dubai Properties'],
      qualifications: ['Engineering/Architecture', 'Project management', 'Safety certifications'],
      salaryRange: 'AED 5,000 - 30,000',
      careerPath: 'Engineer → Project Engineer → Manager → Director',
      trends: ['Sustainable building', 'Smart construction', 'Modular development'],
      emiratization: 35,
      growth: 18,
      workLifeBalance: 2,
      entryLevel: 'Moderate',
      image: '/api/placeholder/400/200'
    }
  ];

  const filteredIndustries = industries.filter(industry => {
    const matchesSearch = industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         industry.importance.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || industry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getEntryLevelColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Traditional">Traditional</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Emerging">Emerging</SelectItem>
                <SelectItem value="Essential">Essential</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 text-sm text-ehrdc-neutral-dark/70">
            Showing {filteredIndustries.length} of {industries.length} industries
          </div>
        </CardContent>
      </Card>

      {/* Industry Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIndustries.map((industry) => (
          <Card key={industry.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-ehrdc-teal/20 to-ehrdc-light-teal/10 rounded-t-lg flex items-center justify-center">
              <Building className="h-16 w-16 text-ehrdc-teal" />
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-ehrdc-teal mb-1">{industry.name}</h3>
                  <Badge variant="outline" className="text-xs">{industry.category}</Badge>
                </div>
                <Badge className={getEntryLevelColor(industry.entryLevel)}>
                  {industry.entryLevel} Entry
                </Badge>
              </div>

              <p className="text-sm text-ehrdc-neutral-dark/70 mb-4">{industry.importance}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-ehrdc-neutral-light/20 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold">{industry.growth}%</span>
                  </div>
                  <div className="text-xs text-ehrdc-neutral-dark/70">Growth</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="h-4 w-4 text-ehrdc-teal" />
                    <span className="text-sm font-semibold">{industry.emiratization}%</span>
                  </div>
                  <div className="text-xs text-ehrdc-neutral-dark/70">Emiratization</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    {renderStars(industry.workLifeBalance)}
                  </div>
                  <div className="text-xs text-ehrdc-neutral-dark/70">Work-Life</div>
                </div>
              </div>

              {/* Salary Range */}
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Salary Range:</span>
                <span className="text-sm text-ehrdc-neutral-dark/70">{industry.salaryRange}</span>
              </div>

              {/* Key Players */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-4 w-4 text-ehrdc-teal" />
                  <span className="text-sm font-medium">Key Players:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {industry.keyPlayers.slice(0, 3).map((player, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {player}
                    </Badge>
                  ))}
                  {industry.keyPlayers.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{industry.keyPlayers.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Career Path */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Career Path:</span>
                </div>
                <div className="text-xs text-ehrdc-neutral-dark/70 bg-purple-50 p-2 rounded">
                  {industry.careerPath}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Add to Compare
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Industries
        </Button>
      </div>
    </div>
  );
};
