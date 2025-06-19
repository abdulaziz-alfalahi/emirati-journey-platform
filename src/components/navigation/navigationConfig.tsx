
import { NavGroup } from '@/components/layout/types';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap,
  Briefcase,
  Users,
  BookOpen,
  Award,
  Calendar,
  Building2,
  Lightbulb,
  Heart,
  Trophy,
  User,
  FileText,
  MapPin,
  Monitor,
  CheckSquare,
  UserCheck,
  Search,
  Shield,
  BarChart3,
  Compass,
  GitCompare,
  DollarSign
} from 'lucide-react';

export const useNavigationGroups = (): NavGroup[] => {
  const { t } = useTranslation('navigation');

  return [
    {
      id: 'education',
      name: t('groups.education.title'),
      description: t('groups.education.description'),
      items: [
        {
          name: t('groups.education.items.summerCamps.title'),
          href: '/summer-camps',
          description: t('groups.education.items.summerCamps.description'),
          icon: Calendar
        },
        {
          name: t('groups.education.items.schoolPrograms.title'),
          href: '/school-programs',
          description: t('groups.education.items.schoolPrograms.description'),
          icon: BookOpen
        },
        {
          name: t('groups.education.items.scholarships.title'),
          href: '/scholarships',
          description: t('groups.education.items.scholarships.description'),
          icon: Award
        },
        {
          name: t('groups.education.items.universityPrograms.title'),
          href: '/university-programs',
          description: t('groups.education.items.universityPrograms.description'),
          icon: GraduationCap
        },
        {
          name: t('groups.education.items.lms.title'),
          href: '/lms',
          description: t('groups.education.items.lms.description'),
          icon: Monitor
        }
      ]
    },
    {
      id: 'career',
      name: t('groups.career.title'),
      description: t('groups.career.description'),
      items: [
        {
          name: t('groups.career.items.planningHub.title'),
          href: '/career-planning-hub',
          description: t('groups.career.items.planningHub.description'),
          icon: Compass
        },
        {
          name: t('groups.career.items.industryExploration.title'),
          href: '/industry-exploration',
          description: t('groups.career.items.industryExploration.description'),
          icon: Compass
        },
        {
          name: t('groups.career.items.graduatePrograms.title'),
          href: '/graduate-programs',
          description: t('groups.career.items.graduatePrograms.description'),
          icon: GraduationCap
        },
        {
          name: t('groups.career.items.internships.title'),
          href: '/internships',
          description: t('groups.career.items.internships.description'),
          icon: Briefcase
        },
        {
          name: t('groups.career.items.jobMatching.title'),
          href: '/job-matching',
          description: t('groups.career.items.jobMatching.description'),
          icon: Search
        },
        {
          name: t('groups.career.items.advisory.title'),
          href: '/career-advisory',
          description: t('groups.career.items.advisory.description'),
          icon: UserCheck
        },
        {
          name: t('groups.career.items.resumeBuilder.title'),
          href: '/resume-builder',
          description: t('groups.career.items.resumeBuilder.description'),
          icon: FileText
        },
        {
          name: t('groups.career.items.portfolio.title'),
          href: '/portfolio',
          description: t('groups.career.items.portfolio.description'),
          icon: User
        },
        {
          name: t('groups.career.items.interviewPrep.title'),
          href: '/interview-preparation',
          description: t('groups.career.items.interviewPrep.description'),
          icon: Users
        }
      ]
    },
    {
      id: 'professional',
      name: t('groups.professional.title'),
      description: t('groups.professional.description'),
      items: [
        {
          name: t('groups.professional.items.digitalSkills.title'),
          href: '/digital-skills-development',
          description: t('groups.professional.items.digitalSkills.description'),
          icon: Lightbulb
        },
        {
          name: t('groups.professional.items.certifications.title'),
          href: '/professional-certifications',
          description: t('groups.professional.items.certifications.description'),
          icon: Award
        },
        {
          name: t('groups.professional.items.training.title'),
          href: '/training',
          description: t('groups.professional.items.training.description'),
          icon: BookOpen
        },
        {
          name: t('groups.professional.items.assessments.title'),
          href: '/assessments',
          description: t('groups.professional.items.assessments.description'),
          icon: CheckSquare
        },
        {
          name: t('groups.professional.items.mentorship.title'),
          href: '/mentorship',
          description: t('groups.professional.items.mentorship.description'),
          icon: Heart
        },
        {
          name: t('groups.professional.items.communities.title'),
          href: '/communities',
          description: t('groups.professional.items.communities.description'),
          icon: Users
        }
      ]
    },
    {
      id: 'lifelong',
      name: t('groups.lifelong.title'),
      description: t('groups.lifelong.description'),
      items: [
        {
          name: t('groups.lifelong.items.nationalService.title'),
          href: '/national-service',
          description: t('groups.lifelong.items.nationalService.description'),
          icon: Building2
        },
        {
          name: t('groups.lifelong.items.youthDevelopment.title'),
          href: '/youth-development',
          description: t('groups.lifelong.items.youthDevelopment.description'),
          icon: Users
        },
        {
          name: t('groups.lifelong.items.successStories.title'),
          href: '/share-success-stories',
          description: t('groups.lifelong.items.successStories.description'),
          icon: Trophy
        },
        {
          name: t('groups.lifelong.items.blockchainCredentials.title'),
          href: '/blockchain-credentials',
          description: t('groups.lifelong.items.blockchainCredentials.description'),
          icon: Shield
        },
        {
          name: t('groups.lifelong.items.analytics.title'),
          href: '/analytics',
          description: t('groups.lifelong.items.analytics.description'),
          icon: BarChart3
        },
        {
          name: t('groups.lifelong.items.financialPlanning.title'),
          href: '/financial-planning',
          description: t('groups.lifelong.items.financialPlanning.description'),
          icon: DollarSign
        },
        {
          name: t('groups.lifelong.items.thoughtLeadership.title'),
          href: '/thought-leadership',
          description: t('groups.lifelong.items.thoughtLeadership.description'),
          icon: Lightbulb
        },
        {
          name: t('groups.lifelong.items.retiree.title'),
          href: '/retiree',
          description: t('groups.lifelong.items.retiree.description'),
          icon: Users
        }
      ]
    }
  ];
};
