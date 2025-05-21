
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Briefcase, HeartHandshake, Award, BadgeCheck } from 'lucide-react';

const RetireeServicesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white shadow-subtle border border-gray-100">
              <p className="text-emirati-navy font-medium">For Retirees</p>
            </div>
            <h1 className="text-4xl font-display font-semibold mb-4">Retiree Services</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Supporting UAE citizens during their retirement journey with specialized services and opportunities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emirati-teal/10 flex items-center justify-center text-emirati-teal mb-2">
                  <Clock size={24} />
                </div>
                <CardTitle>Retirement Planning</CardTitle>
                <CardDescription>Comprehensive planning resources to ensure financial security</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access tools and advisors to help maximize your retirement benefits and plan for a 
                  comfortable future aligned with UAE national policies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emirati-teal/10 flex items-center justify-center text-emirati-teal mb-2">
                  <Briefcase size={24} />
                </div>
                <CardTitle>Consulting Opportunities</CardTitle>
                <CardDescription>Share your expertise with the next generation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore part-time consulting roles where you can mentor younger professionals
                  and continue contributing to the UAE's development.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emirati-teal/10 flex items-center justify-center text-emirati-teal mb-2">
                  <HeartHandshake size={24} />
                </div>
                <CardTitle>Community Engagement</CardTitle>
                <CardDescription>Stay connected and give back to your community</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discover volunteer programs and community initiatives where your
                  experience can make a significant difference.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emirati-teal/10 flex items-center justify-center text-emirati-teal mb-2">
                  <BadgeCheck size={24} />
                </div>
                <CardTitle>Recognition Program</CardTitle>
                <CardDescription>Honoring the contributions of UAE's retirees</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our recognition program celebrates retirees who have made outstanding
                  contributions to the nation throughout their careers.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-emirati-navy text-white p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emirati-teal/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emirati-gold/20 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="mb-6">
                We're expanding our retiree services with specialized programs designed to support your
                post-career journey. Check back for updates on our upcoming initiatives.
              </p>
              <button disabled className="bg-white/20 text-white font-medium py-3 px-6 rounded-full border border-white/30 opacity-70 cursor-not-allowed">
                Service Under Development
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RetireeServicesPage;
