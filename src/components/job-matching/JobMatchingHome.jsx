
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import JobExplorer from './JobExplorer';
import { Search, Filter, Sparkles } from 'lucide-react';

export function JobMatchingHome() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Smart Job Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Find jobs that match your skills and preferences with AI-powered search.</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Searching</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Get personalized job recommendations based on your profile.</p>
            <Button variant="outline" className="w-full">View Recommendations</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-green-600" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Refine your search with advanced filtering options.</p>
            <Button variant="outline" className="w-full">Set Preferences</Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Job Explorer */}
      <Card>
        <CardHeader>
          <CardTitle>Job Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <JobExplorer />
        </CardContent>
      </Card>
    </div>
  );
}
