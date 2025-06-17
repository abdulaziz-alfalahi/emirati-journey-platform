
import React, { useState } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Book, Award, Users, School, MapPin, Clock, Star } from 'lucide-react';
import CampsList from '@/components/summer-camps/CampsList';
import CampsFilter from '@/components/summer-camps/CampsFilter';
import { useAuth } from '@/context/AuthContext';
import { CampFilters } from '@/types/summerCamps';
import { Button } from '@/components/ui/button';

const SummerCampsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<CampFilters>({});

  const stats = [
    { value: "40+", label: "Summer Camps", icon: School },
    { value: "12", label: "Categories", icon: Book },
    { value: "500+", label: "Students Enrolled", icon: Users },
    { value: "100%", label: "Certified Programs", icon: Award }
  ];

  const tabs = [
    {
      id: 'available',
      label: 'Available Camps',
      icon: <School className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg">Filter Camps</CardTitle>
                </CardHeader>
                <CardContent>
                  <CampsFilter 
                    onFilterChange={setSelectedFilters} 
                    onSearchChange={setSearchQuery}
                    selectedFilters={selectedFilters}
                    searchQuery={searchQuery}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Available Summer Camps</h2>
                  {roles.includes('educational_institution') && (
                    <Button className="ehrdc-button-primary">
                      <Calendar className="h-4 w-4 mr-2" />
                      Create New Camp
                    </Button>
                  )}
                </div>
                <CampsList 
                  type="available" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'registered',
      label: 'My Camps',
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">My Registered Camps</h2>
          <CampsList 
            type="registered" 
            filters={selectedFilters}
            searchQuery={searchQuery}
          />
        </div>
      )
    },
    {
      id: 'calendar',
      label: 'Schedule',
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Camp Schedule & Calendar</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Robotics Camp</div>
                      <div className="text-sm text-muted-foreground">Mon, 9:00 AM - 12:00 PM</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Today</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Art & Design Workshop</div>
                      <div className="text-sm text-muted-foreground">Tue, 2:00 PM - 5:00 PM</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Tomorrow</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Camp Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <School className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Dubai Knowledge Park</div>
                      <div className="text-sm text-muted-foreground">15 camps available</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <School className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Dubai Sports City</div>
                      <div className="text-sm text-muted-foreground">8 camps available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    ...(roles.includes('educational_institution') ? [{
      id: 'managed',
      label: 'Manage',
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Managed Camps</h2>
            <Button className="ehrdc-button-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Create New Camp
            </Button>
          </div>
          <CampsList 
            type="managed" 
            filters={selectedFilters}
            searchQuery={searchQuery}
          />
        </div>
      )
    }] : [])
  ];

  return (
    <EducationPathwayLayout
      title="Summer Knowledge Camps"
      description="Discover and register for educational summer camps across Dubai, designed to enrich students' learning experiences during school breaks with hands-on activities and expert instruction."
      icon={<School className="h-8 w-8 text-blue-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="available"
      actionButtonText="Browse All Camps"
      actionButtonHref="#available"
    />
  );
};

export default SummerCampsPage;
