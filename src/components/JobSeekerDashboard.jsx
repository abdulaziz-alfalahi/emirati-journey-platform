import React from 'react';
import { useEHRDC, useTranslation } from '../ehrdc/EHRDCProvider';
import { EHRDCCard, EHRDCStatsCard, EHRDCActionCard, EHRDCProgressCard } from '../ehrdc/EHRDCCard';
import { EHRDCButton } from '../ehrdc/EHRDCButton';

export const JobSeekerDashboard = () => {
  const { preferences, user } = useEHRDC();
  const { t } = useTranslation();

  const profileCompletion = {
    completed: 7,
    total: 10,
    sections: [
      { name: 'Personal Information', completed: true },
      { name: 'Education', completed: true },
      { name: 'Work Experience', completed: true },
      { name: 'Skills', completed: true },
      { name: 'Certifications', completed: false },
      { name: 'Languages', completed: true },
      { name: 'Portfolio', completed: false },
      { name: 'References', completed: true },
      { name: 'Career Preferences', completed: true },
      { name: 'Availability', completed: false }
    ]
  };

  const jobRecommendations = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Emirates NBD',
      location: 'Dubai',
      match: 95,
      salary: 'AED 15,000 - 20,000',
      type: 'Full-time',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Dubai Municipality',
      location: 'Dubai',
      match: 88,
      salary: 'AED 12,000 - 16,000',
      type: 'Full-time',
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'ADNOC',
      location: 'Abu Dhabi',
      match: 82,
      salary: 'AED 10,000 - 14,000',
      type: 'Full-time',
      posted: '3 days ago'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      position: 'Frontend Developer',
      company: 'Dubai Internet City',
      status: 'Interview Scheduled',
      date: '2024-01-15',
      statusColor: 'text-blue-600'
    },
    {
      id: 2,
      position: 'UX Designer',
      company: 'Careem',
      status: 'Under Review',
      date: '2024-01-12',
      statusColor: 'text-yellow-600'
    },
    {
      id: 3,
      position: 'Product Manager',
      company: 'Noon',
      status: 'Rejected',
      date: '2024-01-10',
      statusColor: 'text-red-600'
    }
  ];

  const skillAssessments = [
    { skill: 'JavaScript', level: 85, color: 'bg-blue-500' },
    { skill: 'React', level: 90, color: 'bg-green-500' },
    { skill: 'Node.js', level: 75, color: 'bg-yellow-500' },
    { skill: 'Python', level: 60, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[var(--ehrdc-primary)] to-[var(--ehrdc-primary-light)] rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {preferences.language === 'en' ? `Welcome back, ${user.name || 'Job Seeker'}!` : `مرحباً بعودتك، ${user.name || 'الباحث عن عمل'}!`}
        </h1>
        <p className="opacity-90">
          {preferences.language === 'en' 
            ? 'Continue building your career with EHRDC. You have 3 new job matches and 1 interview scheduled.'
            : 'استمر في بناء مسيرتك المهنية مع مجلس تنمية الموارد البشرية. لديك 3 وظائف جديدة مطابقة ومقابلة واحدة مجدولة.'
          }
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Profile Views' : 'مشاهدات الملف'}
          value="127"
          change="+12%"
          changeType="positive"
          icon="visibility"
        />
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Applications' : 'الطلبات'}
          value="23"
          change="+3"
          changeType="positive"
          icon="assignment"
        />
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Interviews' : 'المقابلات'}
          value="5"
          change="+2"
          changeType="positive"
          icon="event"
        />
        <EHRDCStatsCard
          title={preferences.language === 'en' ? 'Job Matches' : 'الوظائف المطابقة'}
          value="18"
          change="+5"
          changeType="positive"
          icon="work"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Completion */}
          <EHRDCProgressCard
            title={t('jobseeker.profile-completion')}
            progress={profileCompletion.completed}
            total={profileCompletion.total}
            description={preferences.language === 'en' 
              ? 'Complete your profile to get better job recommendations'
              : 'أكمل ملفك الشخصي للحصول على توصيات وظائف أفضل'
            }
            icon="person"
          />

          {/* Job Recommendations */}
          <EHRDCCard
            title={t('jobseeker.job-recommendations')}
            icon="recommend"
          >
            <div className="space-y-4">
              {jobRecommendations.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {job.match}% {preferences.language === 'en' ? 'Match' : 'مطابقة'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>{job.salary}</span>
                    <span>{job.type} • {job.posted}</span>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <EHRDCButton variant="primary" size="sm">
                      {preferences.language === 'en' ? 'Apply Now' : 'تقدم الآن'}
                    </EHRDCButton>
                    <EHRDCButton variant="outline" size="sm">
                      {preferences.language === 'en' ? 'Save' : 'حفظ'}
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

          {/* Recent Applications */}
          <EHRDCCard
            title={t('jobseeker.application-status')}
            icon="assignment_turned_in"
          >
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{app.position}</h4>
                    <p className="text-sm text-gray-600">{app.company}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${app.statusColor}`}>
                      {app.status}
                    </span>
                    <p className="text-xs text-gray-500">{app.date}</p>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <EHRDCButton variant="outline">
                  {preferences.language === 'en' ? 'View All Applications' : 'عرض جميع الطلبات'}
                </EHRDCButton>
              </div>
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
                title={preferences.language === 'en' ? 'Update CV' : 'تحديث السيرة الذاتية'}
                description={preferences.language === 'en' ? 'Keep your CV current' : 'حافظ على سيرتك الذاتية محدثة'}
                action={
                  <EHRDCButton variant="outline" size="sm" icon="edit">
                    {preferences.language === 'en' ? 'Edit' : 'تعديل'}
                  </EHRDCButton>
                }
              />
              
              <EHRDCActionCard
                title={preferences.language === 'en' ? 'Skill Assessment' : 'تقييم المهارات'}
                description={preferences.language === 'en' ? 'Test your skills' : 'اختبر مهاراتك'}
                action={
                  <EHRDCButton variant="outline" size="sm" icon="quiz">
                    {preferences.language === 'en' ? 'Start' : 'ابدأ'}
                  </EHRDCButton>
                }
              />
              
              <EHRDCActionCard
                title={preferences.language === 'en' ? 'Training Programs' : 'برامج التدريب'}
                description={preferences.language === 'en' ? 'Enhance your skills' : 'عزز مهاراتك'}
                action={
                  <EHRDCButton variant="outline" size="sm" icon="school">
                    {preferences.language === 'en' ? 'Browse' : 'تصفح'}
                  </EHRDCButton>
                }
              />
            </div>
          </EHRDCCard>

          {/* Skill Assessment */}
          <EHRDCCard
            title={t('jobseeker.skill-assessment')}
            icon="assessment"
          >
            <div className="space-y-4">
              {skillAssessments.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.skill}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <EHRDCButton variant="outline" size="sm">
                  {preferences.language === 'en' ? 'Take Assessment' : 'خذ التقييم'}
                </EHRDCButton>
              </div>
            </div>
          </EHRDCCard>

          {/* Career Path */}
          <EHRDCCard
            title={t('jobseeker.career-path')}
            icon="trending_up"
          >
            <div className="space-y-3">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--ehrdc-primary-50)] rounded-full mb-3">
                  <span className="material-icons text-[var(--ehrdc-primary)] text-2xl">
                    timeline
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {preferences.language === 'en' ? 'Software Engineer' : 'مهندس برمجيات'}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {preferences.language === 'en' ? 'Your current career path' : 'مسارك المهني الحالي'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="material-icons text-green-500 mr-2 rtl:mr-0 rtl:ml-2">check_circle</span>
                  <span>{preferences.language === 'en' ? 'Junior Developer' : 'مطور مبتدئ'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="material-icons text-[var(--ehrdc-primary)] mr-2 rtl:mr-0 rtl:ml-2">radio_button_checked</span>
                  <span>{preferences.language === 'en' ? 'Mid-level Developer' : 'مطور متوسط'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="material-icons mr-2 rtl:mr-0 rtl:ml-2">radio_button_unchecked</span>
                  <span>{preferences.language === 'en' ? 'Senior Developer' : 'مطور أول'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="material-icons mr-2 rtl:mr-0 rtl:ml-2">radio_button_unchecked</span>
                  <span>{preferences.language === 'en' ? 'Tech Lead' : 'قائد تقني'}</span>
                </div>
              </div>
              
              <EHRDCButton variant="outline" size="sm" className="w-full">
                {preferences.language === 'en' ? 'View Career Map' : 'عرض خريطة المهنة'}
              </EHRDCButton>
            </div>
          </EHRDCCard>
        </div>
      </div>
    </div>
  );
};

