import {
  Home,
  BookOpen,
  Briefcase,
  GraduationCap,
  Settings,
  Bell,
  MessageSquare,
  BarChart,
  Building2,
  Contact2,
  FileText,
  LayoutDashboard,
  LucideIcon,
  LogOut
} from "lucide-react"

import { MainNavItem } from "@/types"

interface DesktopMenuProps {
  isRecruiter?: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: SidebarNavItem[]
    }
)

export type DocumentationConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig = (isRecruiter: boolean = false): DocumentationConfig => {
  const baseSidebarNav: SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Job Matching",
      href: "/job-matching",
      icon: Briefcase,
    },
    {
      title: "Matching",
      href: "/matching",
      icon: Users,
    },
    {
      title: "Resume Builder",
      href: "/resume-builder",
      icon: FileText,
    },
    {
      title: "CV Builder",
      href: "/cv-builder",
      icon: FileText,
    },
    {
      title: "Scholarships",
      href: "/scholarships",
      icon: GraduationCap,
    },
    {
      title: "Internships",
      href: "/internships",
      icon: Building2,
    },
    {
      title: "Assessments",
      href: "/assessments",
      icon: BarChart,
    },
    {
      title: "Training Materials",
      href: "/training-materials",
      icon: BookOpen,
    },
    {
      title: "Career Advisory",
      href: "/career-advisory",
      icon: Contact2,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/profile",
      icon: Settings,
    },
  ];

  const recruiterSidebarNav: SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: "/recruiter",
      icon: LayoutDashboard,
    },
    {
      title: "Job Descriptions",
      href: "/job-descriptions",
      icon: Briefcase,
    },
    {
      title: "Candidate Matching",
      href: "/recruiter",
      icon: Users,
    },
    {
      title: "Interviews",
      href: "/recruiter",
      icon: Contact2,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/profile",
      icon: Settings,
    },
  ];

  return {
    mainNav: [],
    sidebarNav: isRecruiter ? recruiterSidebarNav : baseSidebarNav,
  }
}
