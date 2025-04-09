
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, CheckCircle, Users } from 'lucide-react';
import { Toaster } from 'sonner';
import { Program, Assessment } from '@/types/training-center';
import OverviewTab from './training-center/OverviewTab';
import ProgramsTab from './training-center/ProgramsTab';
import AssessmentsTab from './training-center/AssessmentsTab';
import TraineesTab from './training-center/TraineesTab';

interface TrainingCenterDashboardProps {
  activeTab: string;
}

const TrainingCenterDashboard: React.FC<TrainingCenterDashboardProps> = ({ activeTab }) => {
  const [programs, setPrograms] = useState<Program[]>([
    { 
      id: 1, 
      title: 'Digital Skills Bootcamp', 
      trainees: 76, 
      startDate: '2025-04-20', 
      status: 'active',
      description: 'Comprehensive digital skills training program covering web development, digital marketing, and data analysis.',
      documents: [
        { id: 1, name: 'Curriculum.pdf', type: 'PDF', uploadDate: '2025-03-15', size: '2.4 MB' },
        { id: 2, name: 'Schedule.docx', type: 'DOCX', uploadDate: '2025-03-16', size: '1.1 MB' }
      ]
    },
    { 
      id: 2, 
      title: 'Leadership & Management', 
      trainees: 42, 
      startDate: 'Ongoing', 
      status: 'active',
      description: 'Advanced leadership training for emerging managers and team leaders.',
      documents: [
        { id: 3, name: 'LeadershipHandbook.pdf', type: 'PDF', uploadDate: '2025-02-10', size: '3.8 MB' }
      ]
    },
    { 
      id: 3, 
      title: 'Financial Literacy', 
      trainees: 0, 
      startDate: '2025-05-10', 
      status: 'planned',
      description: 'Foundation course in personal and business financial management.'
    },
    { 
      id: 4, 
      title: 'Project Management Certification', 
      trainees: 28, 
      startDate: '2025-04-15', 
      status: 'active',
      description: 'Professional certification program for project management methodologies.',
      documents: [
        { id: 4, name: 'PMPGuide.pdf', type: 'PDF', uploadDate: '2025-03-01', size: '5.2 MB' },
        { id: 5, name: 'CaseStudies.pptx', type: 'PPTX', uploadDate: '2025-03-05', size: '4.7 MB' }
      ]
    },
  ]);

  const [assessments, setAssessments] = useState<Assessment[]>([
    { id: 1, title: 'Technical Certification Exam', candidates: 35, date: '2025-04-18', type: 'certification' },
    { id: 2, title: 'Soft Skills Assessment', candidates: 48, date: '2025-04-22', type: 'skills' },
    { id: 3, title: 'Leadership Potential Evaluation', candidates: 19, date: '2025-05-05', type: 'behaviors' }
  ]);

  return (
    <Tabs defaultValue={activeTab} className="space-y-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview"><GraduationCap className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
        <TabsTrigger value="programs"><BookOpen className="h-4 w-4 mr-2" /> Programs</TabsTrigger>
        <TabsTrigger value="assessments"><CheckCircle className="h-4 w-4 mr-2" /> Assessments</TabsTrigger>
        <TabsTrigger value="trainees"><Users className="h-4 w-4 mr-2" /> Trainees</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        <OverviewTab 
          programs={programs}
          assessments={assessments}
        />
      </TabsContent>
      
      <TabsContent value="programs" className="space-y-8">
        <ProgramsTab
          programs={programs}
          setPrograms={setPrograms}
        />
      </TabsContent>
      
      <TabsContent value="assessments" className="space-y-8">
        <AssessmentsTab 
          assessments={assessments}
        />
      </TabsContent>
      
      <TabsContent value="trainees" className="space-y-8">
        <TraineesTab />
      </TabsContent>
      
      <Toaster />
    </Tabs>
  );
};

export default TrainingCenterDashboard;
