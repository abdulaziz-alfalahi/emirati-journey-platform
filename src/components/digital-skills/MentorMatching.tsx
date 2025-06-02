
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Star, MessageCircle, Calendar, MapPin, Briefcase, Award } from 'lucide-react';

export const MentorMatching: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [showContactForm, setShowContactForm] = useState<number | null>(null);

  const mentors = [
    {
      id: 1,
      name: 'Sarah Al-Zaabi',
      title: 'Senior Data Scientist',
      company: 'Dubai Future Foundation',
      domain: 'Data Science',
      experience: '8+ years',
      rating: 4.9,
      reviews: 45,
      location: 'Dubai, UAE',
      expertise: ['Machine Learning', 'Python', 'Statistical Analysis', 'Business Intelligence'],
      bio: 'Passionate about democratizing data science in the UAE. I help aspiring data scientists build practical skills and navigate their career paths.',
      mentees: 25,
      availability: 'Weekends',
      languages: ['Arabic', 'English'],
      avatar: '/api/placeholder/64/64'
    },
    {
      id: 2,
      name: 'Ahmed Al-Mansoori',
      title: 'Lead Software Engineer',
      company: 'Careem',
      domain: 'Software Development',
      experience: '10+ years',
      rating: 4.8,
      reviews: 62,
      location: 'Dubai, UAE',
      expertise: ['React', 'Node.js', 'System Architecture', 'Team Leadership'],
      bio: 'Former startup founder turned tech lead. I focus on helping developers build scalable applications and advance their careers in tech.',
      mentees: 18,
      availability: 'Evenings',
      languages: ['Arabic', 'English'],
      avatar: '/api/placeholder/64/64'
    },
    {
      id: 3,
      name: 'Fatima Al-Kaabi',
      title: 'Cybersecurity Director',
      company: 'Abu Dhabi Global Market',
      domain: 'Cybersecurity',
      experience: '12+ years',
      rating: 5.0,
      reviews: 38,
      location: 'Abu Dhabi, UAE',
      expertise: ['Information Security', 'Risk Management', 'Compliance', 'Incident Response'],
      bio: 'Dedicated to building cybersecurity talent in the UAE. I help professionals understand both technical and strategic aspects of security.',
      mentees: 15,
      availability: 'Flexible',
      languages: ['Arabic', 'English'],
      avatar: '/api/placeholder/64/64'
    },
    {
      id: 4,
      name: 'Omar Hassan',
      title: 'UX Design Manager',
      company: 'Noon',
      domain: 'UX/UI Design',
      experience: '7+ years',
      rating: 4.7,
      reviews: 33,
      location: 'Dubai, UAE',
      expertise: ['User Research', 'Design Systems', 'Prototyping', 'Design Strategy'],
      bio: 'Advocate for user-centered design in the Middle East. I mentor designers on both craft skills and business impact of design.',
      mentees: 22,
      availability: 'Weekdays',
      languages: ['Arabic', 'English'],
      avatar: '/api/placeholder/64/64'
    },
    {
      id: 5,
      name: 'Layla Al-Suwaidi',
      title: 'AI Research Lead',
      company: 'Mohamed bin Zayed University of AI',
      domain: 'AI & Machine Learning',
      experience: '9+ years',
      rating: 4.9,
      reviews: 29,
      location: 'Abu Dhabi, UAE',
      expertise: ['Deep Learning', 'NLP', 'Computer Vision', 'Research Methodology'],
      bio: 'Researcher and practitioner bridging academia and industry. I help students and professionals enter the exciting field of AI.',
      mentees: 12,
      availability: 'Flexible',
      languages: ['Arabic', 'English'],
      avatar: '/api/placeholder/64/64'
    }
  ];

  const filteredMentors = mentors.filter(mentor => 
    selectedDomain === 'all' || mentor.domain === selectedDomain
  );

  const handleContactMentor = (mentorId: number) => {
    setShowContactForm(mentorId);
  };

  const ContactForm = ({ mentor }: { mentor: typeof mentors[0] }) => (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h4 className="font-semibold mb-3">Contact {mentor.name}</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Subject</label>
            <Input placeholder="What would you like to discuss?" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Message</label>
            <Textarea 
              placeholder="Tell the mentor about your background and what you're hoping to achieve..."
              className="min-h-[100px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Preferred Meeting Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="in-person">In-Person Meeting</SelectItem>
                <SelectItem value="messaging">Text Messaging</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Send Request
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowContactForm(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Mentor Matching</h2>
          <p className="text-muted-foreground">Connect with industry professionals for personalized guidance in your digital skills journey</p>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filter by Domain</label>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Software Development">Software Development</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="UX/UI Design">UX/UI Design</SelectItem>
                  <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              My Mentoring Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{mentor.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{mentor.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{mentor.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{mentor.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-sm text-muted-foreground">({mentor.reviews})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mentor.domain}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Experience:</span>
                      <div className="text-muted-foreground">{mentor.experience}</div>
                    </div>
                    <div>
                      <span className="font-medium">Mentees:</span>
                      <div className="text-muted-foreground">{mentor.mentees} active</div>
                    </div>
                    <div>
                      <span className="font-medium">Availability:</span>
                      <div className="text-muted-foreground">{mentor.availability}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleContactMentor(mentor.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Mentor
                  </Button>
                  <Button variant="outline">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {showContactForm === mentor.id && <ContactForm mentor={mentor} />}
          </div>
        ))}
      </div>

      {/* How It Works */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">How Mentorship Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">1. Find Your Mentor</h4>
              <p className="text-sm text-muted-foreground">
                Browse mentors by expertise, industry, and availability to find your perfect match
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">2. Connect & Schedule</h4>
              <p className="text-sm text-muted-foreground">
                Send a message introducing yourself and schedule your first mentoring session
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">3. Learn & Grow</h4>
              <p className="text-sm text-muted-foreground">
                Get personalized guidance, feedback, and support to accelerate your career growth
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
