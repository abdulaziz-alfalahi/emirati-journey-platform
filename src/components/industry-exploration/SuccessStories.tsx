
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Quote, MapPin, Briefcase, Star, Calendar } from 'lucide-react';

export const SuccessStories: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const stories = [
    {
      id: 1,
      name: 'Ahmed Al Mansoori',
      title: 'Senior AI Engineer',
      industry: 'Technology',
      company: 'Dubai Future Foundation',
      image: '/api/placeholder/150/150',
      quote: 'The transition from traditional engineering to AI was challenging but incredibly rewarding. The UAE\'s investment in future technologies opened doors I never imagined.',
      journey: 'Mechanical Engineer → Software Developer → AI Specialist → Senior AI Engineer',
      duration: '5 years',
      keyTips: ['Continuous learning is essential', 'Embrace new technologies', 'Network within the tech community'],
      format: 'text',
      videoUrl: null,
      achievements: ['Led 3 major AI projects', 'Certified in Machine Learning', 'Speaker at Dubai AI Summit'],
      location: 'Dubai'
    },
    {
      id: 2,
      name: 'Fatima Al Zahra',
      title: 'Investment Director',
      industry: 'Finance',
      company: 'Abu Dhabi Investment Authority',
      image: '/api/placeholder/150/150',
      quote: 'Breaking into finance as an Emirati woman required determination, but the support systems in place helped me thrive and lead investment strategies.',
      journey: 'Finance Graduate → Analyst → Portfolio Manager → Investment Director',
      duration: '8 years',
      keyTips: ['Build strong analytical skills', 'Develop cultural intelligence', 'Seek mentorship opportunities'],
      format: 'video',
      videoUrl: '/api/placeholder/video',
      achievements: ['Managed $2B+ portfolio', 'CFA Certification', 'Forbes 30 Under 30'],
      location: 'Abu Dhabi'
    },
    {
      id: 3,
      name: 'Mohammed Al Rashid',
      title: 'Renewable Energy Manager',
      industry: 'Energy',
      company: 'Masdar',
      image: '/api/placeholder/150/150',
      quote: 'Transitioning from oil & gas to renewable energy aligned with my values and UAE\'s vision. It\'s been an exciting journey in a rapidly evolving field.',
      journey: 'Petroleum Engineer → Project Engineer → Energy Analyst → Renewable Energy Manager',
      duration: '6 years',
      keyTips: ['Stay updated with global trends', 'Develop project management skills', 'Understand sustainability principles'],
      format: 'text',
      videoUrl: null,
      achievements: ['Led 10+ solar projects', 'LEED Green Associate', 'Published 15 research papers'],
      location: 'Abu Dhabi'
    },
    {
      id: 4,
      name: 'Aisha Al Hamadi',
      title: 'Head of Guest Experience',
      industry: 'Tourism',
      company: 'Atlantis, The Palm',
      image: '/api/placeholder/150/150',
      quote: 'Starting in hospitality taught me the value of service excellence. Every guest interaction shapes Dubai\'s reputation as a world-class destination.',
      journey: 'Guest Services → Supervisor → Assistant Manager → Department Head',
      duration: '7 years',
      keyTips: ['Master multiple languages', 'Develop cultural sensitivity', 'Focus on problem-solving'],
      format: 'video',
      videoUrl: '/api/placeholder/video',
      achievements: ['99% guest satisfaction', 'Hospitality Leadership Award', 'Team of 200+ staff'],
      location: 'Dubai'
    },
    {
      id: 5,
      name: 'Dr. Khalid Al Marzouqi',
      title: 'Chief Medical Officer',
      industry: 'Healthcare',
      company: 'Cleveland Clinic Abu Dhabi',
      image: '/api/placeholder/150/150',
      quote: 'Medicine in the UAE combines cutting-edge technology with compassionate care. Leading healthcare initiatives here impacts thousands of lives.',
      journey: 'Medical Student → Resident → Specialist → Department Head → CMO',
      duration: '15 years',
      keyTips: ['Pursue continuous medical education', 'Develop leadership skills', 'Embrace medical technology'],
      format: 'text',
      videoUrl: null,
      achievements: ['Board certified specialist', 'Medical innovation awards', 'Published 50+ papers'],
      location: 'Abu Dhabi'
    },
    {
      id: 6,
      name: 'Sara Al Blooshi',
      title: 'Project Director',
      industry: 'Construction',
      company: 'Emaar Properties',
      image: '/api/placeholder/150/150',
      quote: 'Every building project contributes to UAE\'s skyline and future. Managing mega-projects requires precision, teamwork, and vision.',
      journey: 'Civil Engineer → Site Engineer → Project Manager → Project Director',
      duration: '9 years',
      keyTips: ['Master project management tools', 'Build strong team relationships', 'Focus on safety first'],
      format: 'video',
      videoUrl: '/api/placeholder/video',
      achievements: ['Delivered $5B+ projects', 'PMP Certification', 'Zero safety incidents record'],
      location: 'Dubai'
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesIndustry = selectedIndustry === 'all' || story.industry === selectedIndustry;
    const matchesFormat = selectedFormat === 'all' || story.format === selectedFormat;
    return matchesIndustry && matchesFormat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Success Stories</h2>
          <p className="text-ehrdc-neutral-dark/70 mb-4">
            Learn from Emiratis who have built successful careers across different industries
          </p>

          <div className="flex flex-wrap gap-4">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Tourism">Tourism</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="text">Text Stories</SelectItem>
                <SelectItem value="video">Video Interviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Profile Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-ehrdc-teal">{story.name}</h3>
                  <p className="text-sm text-ehrdc-neutral-dark/70">{story.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{story.industry}</Badge>
                    <div className="flex items-center gap-1 text-xs text-ehrdc-neutral-dark/70">
                      <MapPin className="h-3 w-3" />
                      {story.location}
                    </div>
                  </div>
                </div>
                {story.format === 'video' && (
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Watch
                  </Button>
                )}
              </div>

              {/* Quote */}
              <div className="mb-4 p-4 bg-ehrdc-neutral-light/20 rounded-lg relative">
                <Quote className="absolute top-2 left-2 h-4 w-4 text-ehrdc-teal/50" />
                <p className="text-sm italic text-ehrdc-neutral-dark/80 pl-6">{story.quote}</p>
              </div>

              {/* Career Journey */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Career Journey ({story.duration})</span>
                </div>
                <div className="text-xs text-ehrdc-neutral-dark/70 bg-purple-50 p-2 rounded">
                  {story.journey}
                </div>
              </div>

              {/* Key Achievements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Key Achievements
                </h4>
                <div className="space-y-1">
                  {story.achievements.map((achievement, index) => (
                    <div key={index} className="text-xs text-ehrdc-neutral-dark/70 flex items-center gap-2">
                      <div className="w-1 h-1 bg-ehrdc-teal rounded-full"></div>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Tips */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Career Tips</h4>
                <div className="space-y-1">
                  {story.keyTips.map((tip, index) => (
                    <div key={index} className="text-xs text-ehrdc-neutral-dark/70 flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-ehrdc-neutral-light/50">
                <Button size="sm" className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  Read Full Story
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Connect on LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-ehrdc-teal to-ehrdc-dark-teal text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Share Your Success Story</h3>
          <p className="mb-4 opacity-90">
            Inspire other Emiratis by sharing your career journey and insights
          </p>
          <Button className="bg-white text-ehrdc-teal hover:bg-ehrdc-neutral-light">
            Submit Your Story
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
