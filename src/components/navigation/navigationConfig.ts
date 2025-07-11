// import { NavGroup } from '@/components/layout/types';
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
  UserCheck,
  FileText,
  MapPin,
  Monitor,
  Compass,
  Search,
  Shield,
  BarChart3,
  DollarSign,
  CheckSquare,
  User,
  GitCompare
} from 'lucide-react';

export const navigationGroups: any[] = [
  {
    id: 'education',
    name: 'Education Pathway',
    description: 'Educational programs and learning opportunities',
    items: [
      {
        name: 'School Programs',
        href: '/school-programs',
        description: 'Special programs for school students',
        icon: BookOpen
      },
      {
        name: 'Summer Camps',
        href: '/summer-camps',
        description: 'Educational summer programs for youth development',
        icon: Calendar
      },
      {
        name: 'Scholarships',
        href: '/scholarships',
        description: 'Educational funding opportunities',
        icon: Award
      },
      {
        name: 'University Programs',
        href: '/university-programs',
        description: 'Higher education pathways',
        icon: GraduationCap
      },
      {
        name: 'Graduate Programs',
        href: '/graduate-programs',
        description: 'Master\'s, PhD, and advanced degree programs',
        icon: GraduationCap
      },
      {
        name: 'Learning Management System',
        href: '/lms',
        description: 'Online learning platform',
        icon: Monitor
      }
    ]
  },
  {
    id: 'career',
    name: 'Career Entry',
    description: 'Professional growth and career opportunities',
    items: [
      {
        name: 'Career Planning Hub',
        href: '/career-planning-hub',
        description: 'Comprehensive career development platform with journey planning, path comparison, and market insights',
        icon: Compass
      },
      {
        name: 'Industry Exploration',
        href: '/industry-exploration',
        description: 'Discover UAE industry opportunities',
        icon: Compass
      },
      {
        name: 'Financial Planning',
        href: '/financial-planning',
        description: 'Comprehensive financial wellness and planning tools',
        icon: DollarSign
      },
      {
        name: 'Resume Builder',
        href: '/resume-builder',
        description: 'Build your professional resume',
        icon: FileText
      },
      {
        name: 'Portfolio',
        href: '/portfolio',
        description: 'Create stunning digital portfolios to showcase your work',
        icon: User
      },
      {
        name: 'Interview Preparation',
        href: '/interview-preparation',
        description: 'Prepare for job interviews',
        icon: Users
      },
      {
        name: 'Internships',
        href: '/internships',
        description: 'Professional internship opportunities',
        icon: Briefcase
      },
      {
        name: 'Job Matching',
        href: '/job-matching',
        description: 'Find opportunities that match your skills',
        icon: Search
      },
      {
        name: 'Career Advisory',
        href: '/career-advisory',
        description: 'Professional career guidance',
        icon: UserCheck
      }
    ]
  },
  {
    id: 'professional',
    name: 'Professional Growth',
    description: 'Skill development and training programs',
    items: [
      {
        name: 'Assessments',
        href: '/assessments',
        description: 'Skill assessment and evaluation',
        icon: CheckSquare
      },
      {
        name: 'Analytics',
        href: '/analytics',
        description: 'View insights and analytics',
        icon: BarChart3
      },
      {
        name: 'Digital Skills Development',
        href: '/digital-skills-development',
        description: 'Technology and digital literacy programs',
        icon: Lightbulb
      },
      {
        name: 'Training Programs',
        href: '/training',
        description: 'Professional skill training',
        icon: BookOpen
      },
      {
        name: 'Professional Certifications',
        href: '/professional-certifications',
        description: 'Industry-recognized certifications',
        icon: Award
      },
      {
        name: 'Blockchain Credentials',
        href: '/blockchain-credentials',
        description: 'Digital credential verification',
        icon: Shield
      },
      {
        name: 'Mentorship',
        href: '/mentorship',
        description: 'Connect with experienced mentors',
        icon: Heart
      },
      {
        name: 'Communities',
        href: '/communities',
        description: 'Join professional communities',
        icon: Users
      }
    ]
  },
  {
    id: 'lifelong',
    name: 'Lifelong Engagement',
    description: 'Community engagement and continuous learning',
    items: [
      {
        name: 'Youth Development',
        href: '/youth-development',
        description: 'Programs for youth empowerment',
        icon: Users
      },
      {
        name: 'National Service',
        href: '/national-service',
        description: 'National service opportunities',
        icon: Building2
      },
      {
        name: 'Thought Leadership',
        href: '/thought-leadership',
        description: 'Industry insights and expert perspectives',
        icon: Lightbulb
      },
      {
        name: 'Success Stories',
        href: '/share-success-stories',
        description: 'Share your achievements and inspire others',
        icon: Trophy
      },
      {
        name: 'Retiree Services',
        href: '/retiree',
        description: 'Post-career opportunities and retirement benefits',
        icon: Users
      }
    ]
  }
];