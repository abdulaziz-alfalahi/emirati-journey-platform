
import React, { useState, useEffect } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import type { EducationStat, EducationTab, AcademicProgress, AcademicAnnouncement, Achievement } from '@/components/layouts/EducationPathwayLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScholarshipsList from '@/components/scholarships/ScholarshipsList';
import ScholarshipsFilter from '@/components/scholarships/ScholarshipsFilter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlusCircle, School, GraduationCap, Award, Globe, Users, TrendingUp, Calendar, Target, FileText, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ScholarshipsCreate from '@/components/scholarships/ScholarshipsCreate';
import ScholarshipsApplied from '@/components/scholarships/ScholarshipsApplied';
import ScholarshipsManage from '@/components/scholarships/ScholarshipsManage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IconButton } from '@/components/ui/icon-button';
import { useToast } from '@/hooks/use-toast';
import { getScholarships, getUserApplications } from '@/services/scholarshipService';
import type { Scholarship, Application } from '@/types/scholarships';

const ScholarshipsPage = () => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    providerType: string[];
    amount: [number | null, number | null];
  }>({
    providerType: [],
    amount: [null, null],
  });

  // Check if the user can create scholarships
  const canCreateScholarship = roles?.some(role => 
    ['educational_institution', 'government_representative', 'private_sector_recruiter', 'administrator'].includes(role)
  );

  // Check if the user can apply for scholarships
  const canApplyForScholarship = roles?.some(role => 
    ['school_student', 'university_student', 'national_service_participant'].includes(role)
  );

  // Load scholarships and applications
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Load scholarships
        const scholarshipsData = await getScholarships();
        setScholarships(scholarshipsData);
        
        // Load user applications if they can apply
        if (canApplyForScholarship) {
          const applicationsData = await getUserApplications(user.id);
          setApplications(applicationsData);
        }
      } catch (error) {
        console.error('Error loading scholarship data:', error);
        toast({
          title: "Error",
          description: "Failed to load scholarship data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, canApplyForScholarship, toast]);

  // Transform applications to academic progress format
  const academicProgress: AcademicProgress[] = applications.map(application => ({
    courseId: application.scholarship_id,
    courseName: application.scholarship?.title || 'Scholarship Application',
    progress: application.status === 'approved' ? 100 : 
             application.status === 'rejected' ? 0 : 50,
    totalModules: 5, // Mock: Application steps
    completedModules: application.status === 'approved' ? 5 : 
                     application.status === 'rejected' ? 1 : 3,
    status: application.status === 'approved' ? 'completed' : 
           application.status === 'rejected' ? 'pending' : 'active',
    nextDeadline: application.scholarship?.application_deadline ? 
      new Date(application.scholarship.application_deadline) : undefined
  }));

  // Education stats for the layout
  const stats: EducationStat[] = [
    {
      value: scholarships.length.toString(),
      label: "Available Scholarships",
      icon: School
    },
    {
      value: applications.length.toString(),
      label: "My Applications",
      icon: FileText
    },
    {
      value: applications.filter(app => app.status === 'approved').length.toString(),
      label: "Approved Awards",
      icon: Award
    },
    {
      value: applications.filter(app => app.status === 'pending').length.toString(),
      label: "Pending Reviews",
      icon: Clock
    }
  ];

  // Enhanced scholarship discovery content
  const scholarshipDiscoveryContent = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-blue-100 shadow-sm p-4">
            <h3 className="font-medium text-lg mb-4 text-blue-900">Filter Scholarships</h3>
            <ScholarshipsFilter 
              onFilterChange={setSelectedFilters}
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
        </div>
        
        {/* Scholarships List */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Available Scholarships</h2>
            {canCreateScholarship && (
              <IconButton 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-blue-900 hover:bg-blue-800 text-white"
                icon={<PlusCircle className="h-4 w-4" />}
              >
                Create Scholarship
              </IconButton>
            )}
          </div>
          <ScholarshipsList 
            type="available" 
            filters={selectedFilters}
            searchQuery={searchQuery}
            canApply={canApplyForScholarship}
          />
        </div>
      </div>
    </div>
  );

  // Application tracking content
  const applicationTrackingContent = (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Application Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-amber-600" />
              <div>
                <div className="text-2xl font-bold text-amber-700">
                  {applications.filter(app => app.status === 'pending').length}
                </div>
                <div className="text-sm text-amber-600">Pending Review</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-700">
                  {applications.filter(app => app.status === 'approved').length}
                </div>
                <div className="text-sm text-green-600">Approved</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  {applications.length}
                </div>
                <div className="text-sm text-blue-600">Total Applications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ScholarshipsApplied 
        filters={selectedFilters}
        searchQuery={searchQuery}
      />
    </div>
  );

  // Document management content
  const documentManagementContent = (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Document Library</h3>
        <p className="text-blue-700 mb-4">
          Manage your scholarship application documents in one place. Upload once and reuse across multiple applications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <h4 className="font-medium text-blue-900">Transcripts</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">Academic transcripts and certificates</p>
              <button className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Upload Documents
              </button>
            </CardContent>
          </Card>
          
          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-6 w-6 text-green-600" />
                <h4 className="font-medium text-green-900">Personal Essays</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">Personal statements and essays</p>
              <button className="w-full bg-green-100 text-green-700 hover:bg-green-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Upload Essays
              </button>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-6 w-6 text-purple-600" />
                <h4 className="font-medium text-purple-900">Recommendations</h4>
              </div>
              <p className="text-sm text-purple-700 mb-3">Letters of recommendation</p>
              <button className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Request Letters
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Management content for providers
  const managementContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-900">Managed Scholarships</h2>
        <IconButton 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white"
          icon={<PlusCircle className="h-4 w-4" />}
        >
          Create Scholarship
        </IconButton>
      </div>
      <ScholarshipsManage
        onOpenCreateDialog={() => setIsCreateDialogOpen(true)}
        filters={selectedFilters}
        searchQuery={searchQuery}
      />
    </div>
  );

  // Education tabs configuration
  const tabs: EducationTab[] = [
    {
      id: "discover",
      label: "Discover",
      icon: <School className="h-4 w-4" />,
      content: scholarshipDiscoveryContent
    },
    {
      id: "applications",
      label: "My Applications",
      icon: <Target className="h-4 w-4" />,
      content: applicationTrackingContent
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FileText className="h-4 w-4" />,
      content: documentManagementContent
    }
  ];

  // Add management tab for providers
  if (canCreateScholarship) {
    tabs.push({
      id: "manage",
      label: "Manage",
      icon: <Award className="h-4 w-4" />,
      content: managementContent
    });
  }

  // Academic announcements
  const announcements: AcademicAnnouncement[] = [
    {
      id: "1",
      title: "New Scholarship Opportunities Available",
      message: "Several new scholarships have been added for the 2024-2025 academic year. Apply now!",
      type: "info",
      date: new Date(),
      urgent: false
    },
    {
      id: "2",
      title: "Application Deadline Reminder",
      message: "Don't forget to submit your scholarship applications before the upcoming deadlines.",
      type: "warning", 
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      urgent: true
    }
  ];

  // Achievements
  const achievements: Achievement[] = applications
    .filter(app => app.status === 'approved')
    .map(app => ({
      id: app.id,
      title: "Scholarship Awarded",
      description: `Congratulations! You've been awarded the ${app.scholarship?.title} scholarship.`,
      icon: Award,
      dateEarned: new Date(app.submitted_at),
      category: "academic" as const
    }));

  return (
    <>
      <EducationPathwayLayout
        title="Scholarship Discovery & Management"
        description="Discover educational scholarships across the UAE, manage your applications, and track your progress toward achieving your academic goals and career aspirations."
        icon={<GraduationCap className="h-12 w-12 text-blue-600" />}
        stats={stats}
        tabs={tabs}
        defaultTab="discover"
        actionButtonText="Explore Scholarships"
        actionButtonHref="#discover"
        academicProgress={academicProgress}
        announcements={announcements}
        achievements={achievements.length > 0 ? achievements : undefined}
        currentGPA={3.7} // Mock GPA - would come from user profile
        academicYear="2024-2025"
        institutionalBranding={{
          institutionName: "UAE Scholarship Portal",
          primaryColor: "#1e3a8a",
          secondaryColor: "#059669"
        }}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-blue-900">
              Create New Scholarship
            </DialogTitle>
          </DialogHeader>
          <div className="border-t border-blue-100 pt-4 mt-2">
            <ScholarshipsCreate onSuccess={() => setIsCreateDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScholarshipsPage;
