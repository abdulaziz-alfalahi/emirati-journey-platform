
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProfessionalCertificationsList } from '@/components/professional-certifications/ProfessionalCertificationsList';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Building2, TrendingUp, Users } from 'lucide-react';

const ProfessionalCertificationsPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Professional Certifications
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Elevate Your Career with Industry-Recognized Credentials
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Discover professional certification programs that will enhance your skills, 
              increase your earning potential, and advance your career in today's competitive market.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Available Certifications</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
                <p className="text-gray-600">Industry Sectors</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">35%</h3>
                <p className="text-gray-600">Average Salary Increase</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
                <p className="text-gray-600">Certified Professionals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              "Professional certifications are not just credentials—they're investments in your future, 
              opening doors to new opportunities and demonstrating your commitment to excellence."
            </blockquote>
            <cite className="text-lg text-gray-600">— Career Development Expert</cite>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Professional Certifications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse our comprehensive directory of professional certification programs 
                across various industries and specializations.
              </p>
            </div>

            <ProfessionalCertificationsList />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfessionalCertificationsPage;
