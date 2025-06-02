
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, Users, Star, Filter, Search, Play, Award } from 'lucide-react';

export const CourseCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Python Programming Fundamentals',
      category: 'Programming',
      provider: 'Tech Academy UAE',
      level: 'Beginner',
      format: 'Self-paced',
      duration: '8 weeks',
      price: 'Free',
      rating: 4.8,
      students: 2500,
      description: 'Learn Python programming from scratch with hands-on projects',
      skills: ['Python', 'Programming Logic', 'Data Structures'],
      certification: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Data Analysis with Excel',
      category: 'Data Analytics',
      provider: 'Business Institute',
      level: 'Beginner',
      format: 'Instructor-led',
      duration: '4 weeks',
      price: 'AED 500',
      rating: 4.6,
      students: 1800,
      description: 'Master Excel for data analysis and business intelligence',
      skills: ['Excel', 'Data Visualization', 'Pivot Tables'],
      certification: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Introduction to Machine Learning',
      category: 'AI & ML',
      provider: 'AI Learning Center',
      level: 'Intermediate',
      format: 'Bootcamp',
      duration: '12 weeks',
      price: 'AED 2500',
      rating: 4.9,
      students: 850,
      description: 'Comprehensive introduction to machine learning concepts and applications',
      skills: ['Machine Learning', 'Python', 'Statistics'],
      certification: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      category: 'Digital Marketing',
      provider: 'Marketing Pro',
      level: 'Intermediate',
      format: 'Workshop',
      duration: '6 weeks',
      price: 'AED 1200',
      rating: 4.7,
      students: 1200,
      description: 'Learn to create and execute effective digital marketing campaigns',
      skills: ['SEO', 'Social Media', 'Analytics'],
      certification: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Cybersecurity Fundamentals',
      category: 'Cybersecurity',
      provider: 'Security Institute',
      level: 'Beginner',
      format: 'Self-paced',
      duration: '10 weeks',
      price: 'AED 800',
      rating: 4.5,
      students: 950,
      description: 'Build foundational knowledge in cybersecurity and threat management',
      skills: ['Network Security', 'Risk Assessment', 'Incident Response'],
      certification: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'Cloud Computing with AWS',
      category: 'Cloud Computing',
      provider: 'Cloud Academy',
      level: 'Intermediate',
      format: 'Instructor-led',
      duration: '8 weeks',
      price: 'AED 1800',
      rating: 4.8,
      students: 720,
      description: 'Master Amazon Web Services and cloud computing concepts',
      skills: ['AWS', 'Cloud Architecture', 'DevOps'],
      certification: true,
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesFormat = selectedFormat === 'all' || course.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesFormat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Course Catalog</h2>
          <p className="text-muted-foreground">Discover courses, workshops, and certifications to advance your digital skills</p>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                <SelectItem value="AI & ML">AI & ML</SelectItem>
                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                <SelectItem value="UX/UI Design">UX/UI Design</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="Self-paced">Self-paced</SelectItem>
                <SelectItem value="Instructor-led">Instructor-led</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Bootcamp">Bootcamp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
              <Play className="h-12 w-12 text-blue-600" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="outline" className="text-xs">
                  {course.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.provider}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {course.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{course.price}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                    {course.certification && (
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Certificate
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    Enroll Now
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Courses
        </Button>
      </div>
    </div>
  );
};
