
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, Target, MapPin, Filter } from 'lucide-react';

export const InteractiveIndustryMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedGrowth, setSelectedGrowth] = useState('all');
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

  const industries = [
    {
      id: 'energy',
      name: 'Energy & Oil',
      color: '#1E40AF',
      size: 'large',
      position: { x: 20, y: 20 },
      growth: 15,
      employment: 250000,
      emiratization: 65,
      description: 'Leading the UAE economy with renewable energy initiatives'
    },
    {
      id: 'finance',
      name: 'Banking & Finance',
      color: '#059669',
      size: 'large',
      position: { x: 60, y: 25 },
      growth: 22,
      employment: 180000,
      emiratization: 78,
      description: 'Hub for regional and international financial services'
    },
    {
      id: 'tourism',
      name: 'Tourism & Hospitality',
      color: '#DC2626',
      size: 'medium',
      position: { x: 15, y: 60 },
      growth: 35,
      employment: 320000,
      emiratization: 45,
      description: 'Driving visitor economy and cultural exchange'
    },
    {
      id: 'technology',
      name: 'Technology & AI',
      color: '#7C3AED',
      size: 'medium',
      position: { x: 75, y: 55 },
      growth: 45,
      employment: 150000,
      emiratization: 55,
      description: 'Emerging sector with AI and innovation focus'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      color: '#059669',
      size: 'medium',
      position: { x: 45, y: 70 },
      growth: 25,
      employment: 200000,
      emiratization: 72,
      description: 'Essential services with growing medical tourism'
    },
    {
      id: 'construction',
      name: 'Construction & Real Estate',
      color: '#D97706',
      size: 'large',
      position: { x: 35, y: 15 },
      growth: 18,
      employment: 400000,
      emiratization: 35,
      description: 'Infrastructure development and urban planning'
    },
    {
      id: 'logistics',
      name: 'Logistics & Trade',
      color: '#0891B2',
      size: 'medium',
      position: { x: 80, y: 30 },
      growth: 28,
      employment: 220000,
      emiratization: 48,
      description: 'Gateway between East and West trade routes'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      color: '#9333EA',
      size: 'small',
      position: { x: 25, y: 45 },
      growth: 20,
      employment: 180000,
      emiratization: 42,
      description: 'Diversification through local production'
    }
  ];

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large': return 'w-20 h-20';
      case 'medium': return 'w-16 h-16';
      case 'small': return 'w-12 h-12';
      default: return 'w-16 h-16';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-ehrdc-teal" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Emirates</SelectItem>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
                <SelectItem value="other">Other Emirates</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedGrowth} onValueChange={setSelectedGrowth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Growth Rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Growth Rates</SelectItem>
                <SelectItem value="high">High Growth (30%+)</SelectItem>
                <SelectItem value="medium">Medium Growth (20-30%)</SelectItem>
                <SelectItem value="stable">Stable Growth (10-20%)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              Reset Filters
            </Button>
          </div>

          <div className="text-sm text-ehrdc-neutral-dark/70">
            Hover over industry bubbles to see detailed statistics
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ehrdc-teal">UAE Industry Landscape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-ehrdc-neutral-light/30 rounded-lg p-8 min-h-96">
            {/* Map Background */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-100/50 to-ehrdc-light-teal/20"></div>
            </div>

            {/* Industry Bubbles */}
            {industries.map((industry) => (
              <div
                key={industry.id}
                className={`absolute cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center text-white font-semibold text-xs hover:scale-110 ${getSizeClass(industry.size)}`}
                style={{
                  backgroundColor: industry.color,
                  left: `${industry.position.x}%`,
                  top: `${industry.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: hoveredIndustry === industry.id ? 20 : 10
                }}
                onMouseEnter={() => setHoveredIndustry(industry.id)}
                onMouseLeave={() => setHoveredIndustry(null)}
              >
                <span className="text-center leading-tight">{industry.name.split(' ')[0]}</span>
                
                {/* Hover Tooltip */}
                {hoveredIndustry === industry.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-4 min-w-64 text-ehrdc-neutral-dark z-30">
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    
                    <h3 className="font-semibold text-lg mb-2 text-ehrdc-teal">{industry.name}</h3>
                    <p className="text-sm mb-3 text-ehrdc-neutral-dark/70">{industry.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span>Growth: {industry.growth}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>{(industry.employment / 1000).toFixed(0)}K jobs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-ehrdc-teal" />
                        <span>Emiratization: {industry.emiratization}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>All Emirates</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-md">
              <h4 className="font-semibold mb-2 text-ehrdc-teal">Industry Size</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-ehrdc-teal"></div>
                  <span className="text-xs">Major (200K+ jobs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-ehrdc-teal"></div>
                  <span className="text-xs">Growing (100K-200K)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-ehrdc-teal"></div>
                  <span className="text-xs">Emerging (&lt;100K)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-ehrdc-teal">28%</div>
                <div className="text-sm text-ehrdc-neutral-dark/70">Average Growth Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-ehrdc-teal" />
              <div>
                <div className="text-2xl font-bold text-ehrdc-teal">58%</div>
                <div className="text-sm text-ehrdc-neutral-dark/70">Avg Emiratization Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-ehrdc-teal">1.9M</div>
                <div className="text-sm text-ehrdc-neutral-dark/70">Total Employment</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
