
import { NavGroup } from '@/components/layout/types';
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
  Trophy
} from 'lucide-react';

export const navigationGroups: NavGroup[] = [
  {
    id: 'education',
    name: 'Education',
    description: 'Educational programs and learning opportunities',
    items: [
      {
        name: 'Summer Camps',
        href: '/summer-camps',
        description: 'Educational summer programs for youth development',
        icon: Calendar
      },
      {
        name: 'School Programs',
        href: '/school-programs',
        description: 'Special programs for school students',
        icon: BookOpen
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
      }
    ]
  },
  {
    id: 'career',
    name: 'Career Development',
    description: 'Professional growth and career opportunities',
    items: [
      {
        name: 'Internships',
        href: '/internships',
        description: 'Professional internship opportunities',
        icon: Briefcase
      },
      {
        name: 'Professional Certifications',
        href: '/professional-certifications',
        description: 'Industry-recognized certifications',
        icon: Award
      },
      {
        name: 'Career Advisory',
        href: '/career-advisory',
        description: 'Professional career guidance',
        icon: Users
      },
      {
        name: 'Mentor Matching',
        href: '/mentor-matching',
        description: 'Connect with experienced mentors',
        icon: Heart
      }
    ]
  },
  {
    id: 'skills',
    name: 'Skills & Development',
    description: 'Skill development and training programs',
    items: [
      {
        name: 'Digital Skills Development',
        href: '/digital-skills-development',
        description: 'Technology and digital literacy programs',
        icon: Lightbulb
      },
      {
        name: 'Assessments',
        href: '/assessments',
        description: 'Skill assessment and evaluation',
        icon: Trophy
      },
      {
        name: 'Training Programs',
        href: '/training',
        description: 'Professional skill training',
        icon: BookOpen
      },
      {
        name: 'Youth Development',
        href: '/youth-development',
        description: 'Programs for youth empowerment',
        icon: Users
      }
    ]
  },
  {
    id: 'community',
    name: 'Community',
    description: 'Community engagement and networking',
    items: [
      {
        name: 'Communities',
        href: '/communities',
        description: 'Join professional communities',
        icon: Users
      },
      {
        name: 'National Service',
        href: '/national-service',
        description: 'National service opportunities',
        icon: Building2
      },
      {
        name: 'Share Success Stories',
        href: '/share-success-stories',
        description: 'Share your achievements and inspire others',
        icon: Trophy
      },
      {
        name: 'Mentorship',
        href: '/mentorship',
        description: 'Mentorship programs and opportunities',
        icon: Heart
      }
    ]
  }
];
