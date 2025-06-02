
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Quote, Award, School, Star } from 'lucide-react';

interface SuccessStory {
  id: string;
  student_name: string;
  age: number;
  program_title: string;
  institution: string;
  story: string;
  achievement: string;
  image_url?: string;
  program_year: string;
  rating: number;
}

const SuccessStories: React.FC = () => {
  // Mock data - In a real app, this would come from an API
  const stories: SuccessStory[] = [
    {
      id: '1',
      student_name: 'Aisha Al Mansouri',
      age: 16,
      program_title: 'Advanced STEM Academy',
      institution: 'Dubai International School',
      story: 'The STEM Academy completely transformed my understanding of science and technology. Through hands-on robotics projects and coding challenges, I discovered my passion for artificial intelligence. The program\'s mentorship and collaborative environment helped me develop both technical skills and leadership qualities.',
      achievement: 'Won National Youth Innovation Award and accepted to MIT Early Admission Program',
      image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      program_year: '2023',
      rating: 5
    },
    {
      id: '2',
      student_name: 'Omar Hassan',
      age: 13,
      program_title: 'Arabic Literary Excellence',
      institution: 'Emirates Heritage Academy',
      story: 'This program deepened my connection to our rich Emirati heritage and Arabic literature. The weekly sessions with renowned poets and authors inspired me to start writing my own stories. I learned to appreciate the beauty of our language and culture in ways I never imagined.',
      achievement: 'Published first collection of Arabic poetry and won Young Writers Competition',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      program_year: '2023',
      rating: 5
    },
    {
      id: '3',
      student_name: 'Fatima Al Zahra',
      age: 10,
      program_title: 'Young Entrepreneurs Program',
      institution: 'Business Leaders Academy',
      story: 'I never thought a 10-year-old could start a business, but this program showed me anything is possible! I learned about marketing, customer service, and teamwork while creating my own eco-friendly crafts business. The confidence I gained here changed how I see challenges.',
      achievement: 'Started successful recycling craft business and donated profits to local charity',
      image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      program_year: '2024',
      rating: 5
    },
    {
      id: '4',
      student_name: 'Ahmed Al Maktoum',
      age: 17,
      program_title: 'Leadership Development Program',
      institution: 'Emirates Future Leaders Institute',
      story: 'The leadership program taught me that true leadership is about serving others and making a positive impact in my community. Through community service projects and mentorship opportunities, I learned valuable skills in project management, public speaking, and team building.',
      achievement: 'Elected Student Council President and organized city-wide youth volunteer initiative',
      image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      program_year: '2023',
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Inspiring Success Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover how our school programs have transformed the lives of young Emirati students, 
          helping them achieve their dreams and make meaningful contributions to their communities.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  {story.image_url ? (
                    <AvatarImage src={story.image_url} alt={story.student_name} />
                  ) : (
                    <AvatarFallback className="bg-ehrdc-teal text-white">
                      {story.student_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <CardTitle className="text-lg">{story.student_name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Age {story.age} • Class of {story.program_year}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <School className="h-4 w-4 text-ehrdc-teal" />
                    <span className="text-sm font-medium">{story.program_title}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">{story.institution}</p>
                  
                  <div className="flex items-center gap-1 mt-2">
                    {renderStars(story.rating)}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-6 w-6 text-ehrdc-teal opacity-50" />
                <p className="text-sm leading-relaxed pl-4 italic">
                  "{story.story}"
                </p>
              </div>
              
              {/* Achievement Badge */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-green-800 mb-1">Achievement</h4>
                    <p className="text-sm text-green-700">{story.achievement}</p>
                  </div>
                </div>
              </div>
              
              {/* Program Badge */}
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-ehrdc-teal border-ehrdc-teal">
                  {story.program_title}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Program Year: {story.program_year}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-ehrdc-teal to-ehrdc-light-teal text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Share Your Success Story</h3>
          <p className="mb-4 opacity-90">
            Have you participated in one of our school programs? We'd love to hear about your experience!
          </p>
          <button className="bg-white text-ehrdc-teal px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Submit Your Story
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessStories;
