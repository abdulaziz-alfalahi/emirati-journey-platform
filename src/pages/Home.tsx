
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to EHRDC Platform
        </h1>
        <p className="text-xl text-gray-600">
          Your gateway to career development and professional growth
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Career Journey</CardTitle>
            <CardDescription>
              Navigate your professional development path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Explore opportunities and plan your career progression.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Training Programs</CardTitle>
            <CardDescription>
              Enhance your skills with professional training
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access a wide range of training opportunities.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Matching</CardTitle>
            <CardDescription>
              Find the perfect job match for your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Connect with employers looking for your expertise.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
