import React from 'react';
import { useEHRDC, useTranslation } from '../ehrdc/EHRDCProvider';
import { EHRDCCard, EHRDCStatsCard, EHRDCActionCard } from '../ehrdc/EHRDCCard';
import { EHRDCButton } from '../ehrdc/EHRDCButton';

export const EmployerDashboard = () => {
  const { preferences, user } = useEHRDC();
  const { t } = useTranslation();

  const activeJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Technology',
      applications: 45,
      interviews: 8,
      status: 'Active',
      posted: '2024-01-10',
      deadline: '2024-02-10'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      department: 'Marketing',
      applications: 32,
      interviews: 5,
      status: 'Active',
      posted: '2024-01-15',
      deadline: '2024-02-15'
    },
    {
      id: 3,
      title: 'Data Scientist',
      department: 'Analytics',
      applications: 28,
      interviews: 3,
      status: 'Draft',
      posted: '2024-01-18',
      deadline: '2024-02-18'
    }
  ];

  const candidatePipeline = [
    {
      id: 1,
      name: 'Ahmed Al Mansouri',
      position: 'Senior React Developer',
      stage: 'Final Interview',
      score: 92,
      experience: '5 years',
      education: 'Computer Science, AUS'
    },
    {
      id: 2,
      name: 'Fatima Al Zahra',
      position: 'Marketing Manager',
      stage: 'Technical Assessment',
      score: 88,
      experience: '7 years',
      education: 'Marketing, AUD'
    },
    {
      id: 3,
      name: 'Omar Al Rashid',
      position: 'Data Scientist',
      stage: 'Initial Screening',
      score: 85,
      experience: '4 years',
      education: 'Data Science, UAEU'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      message: 'New application for Senior React Developer',
      time: '2 hours ago',
      icon: 'assignment'
    },
    {
      id: 2,
      type: 'interview',
      message: 'Interview scheduled with Ahmed Al Mansouri',
      time: '4 hours ago',
      icon: 'event'
    },
    {
      id: 3,
      type: 'hire',
      message: 'Sarah Al Ameri accepted the offer',
      time: '1 day ago',
      icon: 'check_circle'
    },
    {
      id: 4,
      type: 'job',
      message: 'Marketing Manager job posted successfully',
      time: '2 days ago',
      icon: 'work'
    }
  ];

  const hiringMetrics = [
    { metric: 'Time to Hire', value: '18 days', change: '-3 days', changeType: 'positive' },
    { metric: 'Cost per Hire', value: 'AED 8,500', change: '-12%', changeType: 'positive' },
    { metric: 'Quality of Hire', value: '4.2/5', change: '+0.3', changeType: 'positive' },
    { metric: 'Offer Acceptance', value: '85%', change: '+5%', changeType: 'positive' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[var(--dubai-primary)] to-[var(--dubai-primary-dark)] rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {preferences.language === 'en' ? `Welcome, ${user.name || 'Employer'}!` : `مرحباً، ${user.name || 'صاحب العمل'}!`}
        </h1>
        <p className="opacity-90">
          {preferences.language === 'en' 
            ? 'Manage your hiring process efficiently. You have 105 new applications and 16 interviews scheduled this week.'
            : 'أدر عملية التوظيف بكفاءة. لديك 105 طلبات جديدة و 16 مقابلة مجدولة هذا الأسبوع.'
          }
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Active Jobs' : 'الوظائف النشطة'}
          value="12"
          change="+2"
          changeType="positive"
          icon="work"
        />
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Applications' : 'الطلبات'}
          value="105"
          change="+23"
          changeType="positive"
          icon="assignment"
        />
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Interviews' : 'المقابلات'}
          value="16"
          change="+4"
          changeType="positive"
          icon="event"
        />
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Hires This Month' : 'التوظيفات هذا الشهر'}
          value="8"
          change="+3"
          changeType="positive"
          icon="person_add"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Jobs */}
          <EHRDCCard
            title={t('employer.manage-jobs')}
            icon="work"
          >
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.department}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">{job.applications}</span> {preferences.language === 'en' ? 'Applications' : 'طلبات'}
                    </div>
                    <div>
                      <span className="font-medium">{job.interviews}</span> {preferences.language === 'en' ? 'Interviews' : 'مقابلات'}
                    </div>
                    <div>
                      {preferences.language === 'en' ? 'Posted:' : 'نُشر:'} {job.posted}
                    </div>
                    <div>
                      {preferences.language === 'en' ? 'Deadline:' : 'الموعد النهائي:'} {job.deadline}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <EHRDCButton variant="primary" size="sm">
                      {preferences.language === 'en' ? 'View Applications' : 'عرض الطلبات'}
                    </EHRDCButton>
                    <EHRDCButton variant="outline" size="sm">
                      {preferences.language === 'en' ? 'Edit Job' : 'تعديل الوظيفة'}
                    </EHRDCButton>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <EHRDCButton variant="outline">
                  {preferences.language === 'en' ? 'View All Jobs' : 'عرض جميع الوظائف'}
                </EHRDCButton>
              </div>
            </div>
          </EHRDCCard>

          {/* Candidate Pipeline */}
          <EHRDCCard
            title={t('employer.candidate-pipeline')}
            icon="people"
          >
            <div className="space-y-4">
              {candidatePipeline.map((candidate) => (
                <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="h-10 w-10 bg-[var(--ehrdc-primary)] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {candidate.score}% {preferences.language === 'en' ? 'Match' : 'مطابقة'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">{preferences.language === 'en' ? 'Stage:' : 'المرحلة:'}</span> {candidate.stage}
                    </div>
                    <div>
                      <span className="font-medium">{preferences.language === 'en' ? 'Experience:' : 'الخبرة:'}</span> {candidate.experience}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{candidate.education}</p>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <EHRDCButton variant="primary" size="sm">
                      {preferences.language === 'en' ? 'View Profile' : 'عرض الملف'}
                    </EHRDCButton>
                    <EHRDCButton variant="outline" size="sm">
                      {preferences.language === 'en' ? 'Schedule Interview' : 'جدولة مقابلة'}
                    </EHRDCButton>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <EHRDCButton variant="outline">
                  {preferences.language === 'en' ? 'View All Candidates' : 'عرض جميع المرشحين'}
                </EHRDCButton>
              </div>
            </div>
          </EHRDCCard>

          {/* Hiring Metrics */}
          <EHRDCCard
            title={t('employer.analytics')}
            icon="analytics"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hiringMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-1">{metric.metric}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </EHRDCCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <EHRDCCard
            title={t('dashboard.quick-actions')}
            icon="flash_on"
          >
            <div className="space-y-3">
              <EHRDCActionCard
                title={t('employer.post-job')}
                description={preferences.language === 'en' ? 'Create a new job posting' : 'إنشاء إعلان وظيفة جديد'}
                action={
                  <EHRDCButton variant="primary" size="sm" icon="add">
                    {preferences.language === 'en' ? 'Post' : 'نشر'}
                  </EHRDCButton>
                }
              />
              
              <EHRDCActionCard
                title={preferences.language === 'en' ? 'Review Applications' : 'مراجعة الطلبات'}
                description={preferences.language === 'en' ? 'Check pending applications' : 'تحقق من الطلبات المعلقة'}
                action={
                  <EHRDCButton variant="outline" size="sm" icon="assignment">
                    {preferences.language === 'en' ? 'Review' : 'مراجعة'}
                  </EHRDCButton>
                }
              />
              
              <EHRDCActionCard
                title={preferences.language === 'en' ? 'Schedule Interviews' : 'جدولة المقابلات'}
                description={preferences.language === 'en' ? 'Manage interview calendar' : 'إدارة تقويم المقابلات'}
                action={
                  <EHRDCButton variant="outline" size="sm" icon="event">
                    {preferences.language === 'en' ? 'Schedule' : 'جدولة'}
                  </EHRDCButton>
                }
              />
              
              <EHRDCActionCard
                title={t('employer.company-profile')}
                description={preferences.language === 'en' ? 'Update company information' : 'تحديث معلومات الشركة'}
                action={
                  <EHRDCButton variant="outline" size="sm" icon="business">
                    {preferences.language === 'en' ? 'Edit' : 'تعديل'}
                  </EHRDCButton>
                }
              />
            </div>
          </EHRDCCard>

          {/* Recent Activity */}
          <EHRDCCard
            title={t('dashboard.recent-activity')}
            icon="history"
          >
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-[var(--ehrdc-primary-50)] rounded-full flex items-center justify-center">
                      <span className="material-icons text-[var(--ehrdc-primary)] text-sm">
                        {activity.icon}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <EHRDCButton variant="outline" size="sm">
                  {preferences.language === 'en' ? 'View All Activity' : 'عرض جميع الأنشطة'}
                </EHRDCButton>
              </div>
            </div>
          </EHRDCCard>

          {/* Emiratization Progress */}
          <EHRDCCard
            title={preferences.language === 'en' ? 'Emiratization Progress' : 'تقدم التوطين'}
            icon="flag"
          >
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--ehrdc-primary-50)] rounded-full mb-3">
                  <span className="text-2xl font-bold text-[var(--ehrdc-primary)]">65%</span>
                </div>
                <p className="text-sm text-gray-600">
                  {preferences.language === 'en' ? 'Current Emiratization Rate' : 'معدل التوطين الحالي'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{preferences.language === 'en' ? 'Emirati Employees' : 'الموظفون الإماراتيون'}</span>
                  <span className="font-medium">130 / 200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[var(--ehrdc-primary)] h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              
              <div className="text-center">
                <EHRDCButton variant="outline" size="sm">
                  {preferences.language === 'en' ? 'View Report' : 'عرض التقرير'}
                </EHRDCButton>
              </div>
            </div>
          </EHRDCCard>
        </div>
      </div>
    </div>
  );
};

