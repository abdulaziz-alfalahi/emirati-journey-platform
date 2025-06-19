
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
      name: t('groups.educationPathway.title'),
      description: t('groups.educationPathway.description'),
      items: [
        {
          name: t('groups.educationPathway.items.summerCamps.title'),
          href: '/summer-camps',
          description: t('groups.educationPathway.items.summerCamps.description'),
          icon: Calendar
        },
        {
          name: t('groups.educationPathway.items.schoolPrograms.title'),
          href: '/school-programs',
          description: t('groups.educationPathway.items.schoolPrograms.description'),
          icon: BookOpen
        },
        {
          name: t('groups.educationPathway.items.scholarships.title'),
          href: '/scholarships',
          description: t('groups.educationPathway.items.scholarships.description'),
          icon: Award
        },
        {
          name: t('groups.educationPathway.items.universityPrograms.title'),
          href: '/university-programs',
          description: t('groups.educationPathway.items.universityPrograms.description'),
          icon: GraduationCap
        },
        {
          name: t('groups.educationPathway.items.graduatePrograms.title'),
          href: '/graduate-programs',
          description: t('groups.educationPathway.items.graduatePrograms.description'),
          icon: GraduationCap
        },
        {
          name: t('groups.educationPathway.items.professionalCertifications.title'),
          href: '/professional-certifications',
          description: t('groups.educationPathway.items.professionalCertifications.description'),
          icon: Award
        },
        {
          name: t('groups.educationPathway.items.digitalSkills.title'),
          href: '/digital-skills-development',
          description: t('groups.educationPathway.items.digitalSkills.description'),
          icon: Monitor
        }
      ]
    },
    {
      id: 'career',
      name: t('groups.careerEntry.title'),
      description: t('groups.careerEntry.description'),
      items: [
        {
          name: t('groups.careerEntry.items.careerPlanningHub.title'),
          href: '/career-planning-hub',
          description: t('groups.careerEntry.items.careerPlanningHub.description'),
          icon: Compass
        },
        {
          name: t('groups.careerEntry.items.assessments.title'),
          href: '/assessments',
          description: t('groups.careerEntry.items.assessments.description'),
          icon: CheckSquare
        },
        {
          name: t('groups.careerEntry.items.cvBuilder.title'),
          href: '/cv-builder',
          description: t('groups.careerEntry.items.cvBuilder.description'),
          icon: FileText
        },
        {
          name: t('groups.careerEntry.items.resumeBuilder.title'),
          href: '/resume-builder',
          description: t('groups.careerEntry.items.resumeBuilder.description'),
          icon: FileText
        },
        {
          name: t('groups.careerEntry.items.interviewPreparation.title'),
          href: '/interview-preparation',
          description: t('groups.careerEntry.items.interviewPreparation.description'),
          icon: Users
        },
        {
          name: t('groups.careerEntry.items.jobMatching.title'),
          href: '/job-matching',
          description: t('groups.careerEntry.items.jobMatching.description'),
          icon: Search
        },
        {
          name: t('groups.careerEntry.items.internships.title'),
          href: '/internships',
          description: t('groups.careerEntry.items.internships.description'),
          icon: Briefcase
        },
        {
          name: t('groups.careerEntry.items.careerComparison.title'),
          href: '/career-comparison',
          description: t('groups.careerEntry.items.careerComparison.description'),
          icon: GitCompare
        }
      ]
    },
    {
      id: 'professional',
      name: t('groups.professionalGrowth.title'),
      description: t('groups.professionalGrowth.description'),
      items: [
        {
          name: t('groups.professionalGrowth.items.training.title'),
          href: '/training',
          description: t('groups.professionalGrowth.items.training.description'),
          icon: BookOpen
        },
        {
          name: t('groups.professionalGrowth.items.mentorship.title'),
          href: '/mentorship',
          description: t('groups.professionalGrowth.items.mentorship.description'),
          icon: Heart
        },
        {
          name: t('groups.professionalGrowth.items.portfolio.title'),
          href: '/portfolio',
          description: t('groups.professionalGrowth.items.portfolio.description'),
          icon: User
        },
        {
          name: t('groups.professionalGrowth.items.careerJourney.title'),
          href: '/career-journey',
          description: t('groups.professionalGrowth.items.careerJourney.description'),
          icon: MapPin
        },
        {
          name: t('groups.professionalGrowth.items.communities.title'),
          href: '/communities',
          description: t('groups.professionalGrowth.items.communities.description'),
          icon: Users
        },
        {
          name: t('groups.professionalGrowth.items.analytics.title'),
          href: '/analytics',
          description: t('groups.professionalGrowth.items.analytics.description'),
          icon: BarChart3
        },
        {
          name: t('groups.professionalGrowth.items.blockchainCredentials.title'),
          href: '/blockchain-credentials',
          description: t('groups.professionalGrowth.items.blockchainCredentials.description'),
          icon: Shield
        },
        {
          name: t('groups.professionalGrowth.items.lms.title'),
          href: '/lms',
          description: t('groups.professionalGrowth.items.lms.description'),
          icon: Monitor
        }
      ]
    },
    {
      id: 'lifelong',
      name: t('groups.lifelongEngagement.title'),
      description: t('groups.lifelongEngagement.description'),
      items: [
        {
          name: t('groups.lifelongEngagement.items.advisoryPositions.title'),
          href: '/advisory-positions',
          description: t('groups.lifelongEngagement.items.advisoryPositions.description'),
          icon: UserCheck
        },
        {
          name: t('groups.lifelongEngagement.items.communityLeadership.title'),
          href: '/community-leadership',
          description: t('groups.lifelongEngagement.items.communityLeadership.description'),
          icon: Users
        },
        {
          name: t('groups.lifelongEngagement.items.legacyProjects.title'),
          href: '/legacy-projects',
          description: t('groups.lifelongEngagement.items.legacyProjects.description'),
          icon: Trophy
        },
        {
          name: t('groups.lifelongEngagement.items.nationalService.title'),
          href: '/national-service',
          description: t('groups.lifelongEngagement.items.nationalService.description'),
          icon: Building2
        },
        {
          name: t('groups.lifelongEngagement.items.thoughtLeadership.title'),
          href: '/thought-leadership',
          description: t('groups.lifelongEngagement.items.thoughtLeadership.description'),
          icon: Lightbulb
        },
        {
          name: t('groups.lifelongEngagement.items.successStories.title'),
          href: '/share-success-stories',
          description: t('groups.lifelongEngagement.items.successStories.description'),
          icon: Trophy
        },
        {
          name: t('groups.lifelongEngagement.items.financialPlanning.title'),
          href: '/financial-planning',
          description: t('groups.lifelongEngagement.items.financialPlanning.description'),
          icon: DollarSign
        },
        {
          name: t('groups.lifelongEngagement.items.retireeServices.title'),
          href: '/retiree',
          description: t('groups.lifelongEngagement.items.retireeServices.description'),
          icon: Users
        }
      ]
    }
  ];
};
