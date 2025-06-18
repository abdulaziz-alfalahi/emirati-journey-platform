
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, 
  Users, 
  Briefcase, 
  GraduationCap,
  TrendingUp,
  Award,
  Globe,
  Lightbulb
} from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emirati-teal to-emirati-gold bg-clip-text text-transparent">
            Emirati Pathways Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your comprehensive platform for career development, education, and professional growth in the UAE
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-emirati-teal border-emirati-teal">
              Career Development
            </Badge>
            <Badge variant="outline" className="text-emirati-gold border-emirati-gold">
              Professional Growth
            </Badge>
            <Badge variant="outline" className="text-emirati-red border-emirati-red">
              Education & Training
            </Badge>
          </div>

          {user ? (
            <div className="mb-8">
              <p className="text-lg mb-4">Welcome back, {user.user_metadata?.full_name || user.email}!</p>
              <Button size="lg" className="bg-emirati-teal hover:bg-emirati-teal/90">
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-emirati-teal hover:bg-emirati-teal/90">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 mx-auto text-emirati-teal mb-4" />
              <CardTitle>Education Programs</CardTitle>
              <CardDescription>
                Discover educational opportunities and skill development programs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Briefcase className="h-12 w-12 mx-auto text-emirati-gold mb-4" />
              <CardTitle>Career Opportunities</CardTitle>
              <CardDescription>
                Explore job opportunities and internship programs across the UAE
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-emirati-red mb-4" />
              <CardTitle>Mentorship</CardTitle>
              <CardDescription>
                Connect with experienced professionals and industry leaders
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 mx-auto text-emirati-green mb-4" />
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Track your progress and gain insights into your career journey
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-emirati-teal" />
                Latest Programs
              </CardTitle>
              <CardDescription>
                New educational and training programs available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-emirati-teal pl-4">
                  <h4 className="font-semibold">Digital Skills Bootcamp</h4>
                  <p className="text-sm text-muted-foreground">
                    12-week intensive program in AI and machine learning
                  </p>
                </div>
                <div className="border-l-4 border-emirati-gold pl-4">
                  <h4 className="font-semibold">Leadership Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Executive leadership program for emerging leaders
                  </p>
                </div>
                <div className="border-l-4 border-emirati-red pl-4">
                  <h4 className="font-semibold">Entrepreneurship Hub</h4>
                  <p className="text-sm text-muted-foreground">
                    Support and resources for startup founders
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-emirati-gold" />
                Success Stories
              </CardTitle>
              <CardDescription>
                Inspiring stories from our community members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emirati-teal/10 to-transparent p-4 rounded-lg">
                  <p className="text-sm italic mb-2">
                    "The platform helped me transition from student to a successful AI engineer at a leading tech company."
                  </p>
                  <p className="font-semibold text-emirati-teal">- Sarah Al-Mansouri</p>
                </div>
                <div className="bg-gradient-to-r from-emirati-gold/10 to-transparent p-4 rounded-lg">
                  <p className="text-sm italic mb-2">
                    "Through the mentorship program, I launched my fintech startup and secured Series A funding."
                  </p>
                  <p className="font-semibold text-emirati-gold">- Ahmed Al-Zaabi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Language Toggle Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-emirati-green" />
              Language Support
            </CardTitle>
            <CardDescription>
              Platform available in multiple languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <p>Current Language: <strong>{language === 'en' ? 'English' : 'العربية'}</strong></p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              >
                Switch to {language === 'en' ? 'العربية' : 'English'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-emirati-teal to-emirati-gold text-white">
          <CardContent className="text-center py-12">
            <Lightbulb className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of Emiratis building successful careers and making an impact
            </p>
            <Button size="lg" variant="secondary" className="text-emirati-teal">
              Join the Platform
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
