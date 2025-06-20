
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Star } from 'lucide-react';

const SummerCampsPage: React.FC = () => {
  const camps = [
    {
      id: '1',
      title: 'STEM Explorer Camp',
      organizer: 'Dubai Future Foundation',
      description: 'Hands-on science, technology, engineering, and mathematics activities',
      category: 'STEM',
      age_group: '8-12 years',
      start_date: '2024-07-01',
      end_date: '2024-07-15',
      duration: '2 weeks',
      location: 'Dubai Science Park',
      capacity: 30,
      enrolled: 22,
      price: 1200,
      image_url: '/images/stem-camp.jpg',
      tags: ['Science', 'Technology', 'Hands-on'],
      rating: 4.8
    },
    {
      id: '2',
      title: 'Arabic Heritage Camp',
      organizer: 'UAE Cultural Foundation',
      description: 'Explore UAE culture, traditions, and Arabic language',
      category: 'Cultural',
      age_group: '6-14 years',
      start_date: '2024-07-08',
      end_date: '2024-07-22',
      duration: '2 weeks',
      location: 'Heritage Village Dubai',
      capacity: 25,
      enrolled: 18,
      price: 800,
      image_url: '/images/heritage-camp.jpg',
      tags: ['Culture', 'Arabic', 'Traditions'],
      rating: 4.9
    },
    {
      id: '3',
      title: 'Sports & Fitness Camp',
      organizer: 'Dubai Sports Council',
      description: 'Multi-sport activities and fitness training for young athletes',
      category: 'Sports',
      age_group: '10-16 years',
      start_date: '2024-07-15',
      end_date: '2024-07-29',
      duration: '2 weeks',
      location: 'Dubai Sports City',
      capacity: 40,
      enrolled: 35,
      price: 950,
      image_url: '/images/sports-camp.jpg',
      tags: ['Sports', 'Fitness', 'Team Building'],
      rating: 4.7
    }
  ];

  const handleEnroll = (campId: string) => {
    console.log(`Enrolling in camp: ${campId}`);
    // Handle enrollment logic here
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.target.value;
    console.log(`Filter changed to: ${filterType}`);
    // Handle filter logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Summer Camps 2024</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting summer programs designed to inspire learning, creativity, and fun for children and teens.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <select 
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="STEM">STEM</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Arts">Arts</option>
          </select>

          <select 
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Ages</option>
            <option value="6-8">6-8 years</option>
            <option value="8-12">8-12 years</option>
            <option value="10-16">10-16 years</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-gray-600">Available Camps</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">Enrolled Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">4.8★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-600">Weeks Duration</div>
            </CardContent>
          </Card>
        </div>

        {/* Camps Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <Card key={camp.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{camp.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{camp.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{camp.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {camp.organizer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{camp.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{camp.start_date} - {camp.end_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{camp.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{camp.enrolled}/{camp.capacity} enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Ages: {camp.age_group}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {camp.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-green-600">
                    AED {camp.price.toLocaleString()}
                  </div>
                  <Button 
                    onClick={() => handleEnroll(camp.id)}
                    disabled={camp.enrolled >= camp.capacity}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {camp.enrolled >= camp.capacity ? 'Full' : 'Enroll Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Join the Fun?</h3>
              <p className="text-gray-600 mb-6">
                Don't miss out on these amazing summer experiences. Register now to secure your spot!
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Browse All Camps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SummerCampsPage;
