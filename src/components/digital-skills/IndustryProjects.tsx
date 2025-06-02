
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Clock, Users, Award, MapPin, Calendar, ArrowRight } from 'lucide-react';

export const IndustryProjects: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Analytics Dashboard',
      company: 'Dubai Mall Group',
      industry: 'Retail',
      description: 'Build a comprehensive analytics dashboard to track customer behavior, sales trends, and inventory management for one of the largest retail groups in the UAE.',
      skills: ['Python', 'Data Analysis', 'Tableau', 'SQL'],
      difficulty: 'Intermediate',
      duration: '6-8 weeks',
      participants: 15,
      spots: 3,
      startDate: '2024-04-15',
      mentor: 'Sarah Al-Zaabi, Senior Data Scientist',
      requirements: ['Basic Python knowledge', 'SQL fundamentals', 'Data visualization experience'],
      outcomes: ['Industry experience', 'Portfolio project', 'Networking opportunities', 'Potential job offers'],
      status: 'accepting'
    },
    {
      id: 2,
      title: 'Smart City IoT Platform',
      company: 'Dubai Municipality',
      industry: 'Government',
      description: 'Develop IoT solutions for smart city initiatives including traffic management, waste monitoring, and environmental sensors across Dubai.',
      skills: ['IoT', 'JavaScript', 'Cloud Computing', 'Data Analytics'],
      difficulty: 'Advanced',
      duration: '8-10 weeks',
      participants: 12,
      spots: 2,
      startDate: '2024-05-01',
      mentor: 'Ahmed Al-Mansoori, IoT Solutions Architect',
      requirements: ['Programming experience', 'Cloud platform knowledge', 'IoT basics'],
      outcomes: ['Government project experience', 'Smart city expertise', 'Technical leadership'],
      status: 'accepting'
    },
    {
      id: 3,
      title: 'Fintech Mobile Application',
      company: 'Emirates NBD',
      industry: 'Banking',
      description: 'Create a mobile banking feature focused on financial wellness and budgeting tools for young professionals in the UAE.',
      skills: ['React Native', 'UI/UX Design', 'Financial APIs', 'Security'],
      difficulty: 'Intermediate',
      duration: '10-12 weeks',
      participants: 20,
      spots: 5,
      startDate: '2024-04-22',
      mentor: 'Fatima Al-Kaabi, Senior Mobile Developer',
      requirements: ['Mobile development basics', 'UI/UX understanding', 'API integration'],
      outcomes: ['Banking sector experience', 'Mobile app in portfolio', 'Fintech knowledge'],
      status: 'accepting'
    },
    {
      id: 4,
      title: 'Healthcare Data Platform',
      company: 'Dubai Health Authority',
      industry: 'Healthcare',
      description: 'Build a data analytics platform to improve patient care outcomes and optimize hospital resource allocation.',
      skills: ['Python', 'Machine Learning', 'Healthcare Data', 'Privacy & Security'],
      difficulty: 'Advanced',
      duration: '12-14 weeks',
      participants: 10,
      spots: 0,
      startDate: '2024-03-15',
      mentor: 'Dr. Khalid Al-Rashid, Chief Data Officer',
      requirements: ['Advanced analytics skills', 'Healthcare domain knowledge', 'Privacy regulations'],
      outcomes: ['Healthcare technology expertise', 'ML implementation experience'],
      status: 'full'
    },
    {
      id: 5,
      title: 'Tourism Recommendation Engine',
      company: 'Visit Dubai',
      industry: 'Tourism',
      description: 'Develop an AI-powered recommendation system to personalize tourist experiences and improve visitor satisfaction.',
      skills: ['Machine Learning', 'Python', 'Recommendation Systems', 'Web Development'],
      difficulty: 'Intermediate',
      duration: '8-10 weeks',
      participants: 18,
      spots: 4,
      startDate: '2024-05-10',
      mentor: 'Layla Al-Suwaidi, AI Research Lead',
      requirements: ['ML fundamentals', 'Python proficiency', 'Web development basics'],
      outcomes: ['AI/ML experience', 'Tourism industry insights', 'Scalable system design'],
      status: 'accepting'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesIndustry = selectedIndustry === 'all' || project.industry === selectedIndustry;
    const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
    return matchesIndustry && matchesDifficulty;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepting': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'starting': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepting': return 'Accepting Applications';
      case 'full': return 'Full';
      case 'starting': return 'Starting Soon';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Industry Projects</h2>
          <p className="text-muted-foreground">Gain real-world experience working on projects with leading UAE companies</p>
        </CardContent>
      </Card>

      {/* Filters */}
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
                  <SelectItem value="Banking">Banking & Finance</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="Tourism">Tourism & Hospitality</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Award className="h-4 w-4 mr-2" />
                My Applications
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{project.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.industry}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Skills You'll Use</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Project Details</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>Duration: {project.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>Team size: {project.participants} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Starts: {new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-sm">Mentor</h4>
                    <p className="text-sm text-muted-foreground">{project.mentor}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Requirements</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {project.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-600 rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">What You'll Gain</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {project.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:w-48 flex flex-col gap-3">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{project.spots}</div>
                    <div className="text-sm text-muted-foreground">spots remaining</div>
                  </div>
                  
                  <Badge variant={
                    project.difficulty === 'Beginner' ? 'secondary' :
                    project.difficulty === 'Intermediate' ? 'default' : 'destructive'
                  } className="justify-center">
                    {project.difficulty} Level
                  </Badge>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={project.status === 'full'}
                  >
                    {project.status === 'full' ? 'Project Full' : 'Apply Now'}
                    {project.status !== 'full' && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Stories */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="text-sm italic mb-2">
                "Working on the fintech project with Emirates NBD gave me hands-on experience with mobile development 
                and led to a full-time offer after graduation."
              </p>
              <p className="text-xs text-muted-foreground">- Mariam Al-Ali, Software Developer</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <p className="text-sm italic mb-2">
                "The healthcare analytics project taught me how to work with sensitive data and opened doors 
                to the healthcare tech industry."
              </p>
              <p className="text-xs text-muted-foreground">- Omar Hassan, Data Analyst</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
