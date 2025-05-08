
import { Scholarship } from '@/types/scholarships';
import { format } from 'date-fns';

/**
 * Mock scholarship data for demonstration purposes
 */
export const mockScholarships: Scholarship[] = [
  {
    id: "SCH001",
    title: "STEM Excellence Scholarship",
    description: "Supporting exceptional students pursuing degrees in Science, Technology, Engineering, and Mathematics disciplines. Preference is given to students focusing on renewable energy technologies.",
    provider: "DEWA",
    provider_type: "government",
    eligibility_criteria: {
      education_level: "undergraduate",
      min_gpa: 3.5,
      study_fields: ["engineering", "computer science", "physics", "mathematics"],
      citizenship: "UAE",
      requirements: "Must be enrolled in an accredited university in the UAE or abroad"
    },
    amount: 40000,
    currency: "AED",
    application_deadline: format(new Date(2025, 11, 15), "yyyy-MM-dd"),  // Dec 15, 2025
    requirements: [
      "Academic transcripts",
      "Two recommendation letters",
      "Personal statement",
      "Proof of university enrollment"
    ],
    contact_email: "scholarships@dewa.gov.ae",
    contact_phone: "+971-4-601-9999",
    website_url: "https://www.dewa.gov.ae/scholarships",
    is_active: true,
    created_at: format(new Date(2024, 6, 10), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH002",
    title: "Future Leaders Scholarship",
    description: "Designed for exceptional students demonstrating leadership potential and academic excellence. The program includes mentorship from Dubai Future Foundation executives.",
    provider: "Dubai Future Foundation",
    provider_type: "government",
    eligibility_criteria: {
      education_level: "undergraduate",
      min_gpa: 3.7,
      study_fields: ["business", "public administration", "technology", "innovation"],
      citizenship: "UAE",
      age: "Under 25"
    },
    amount: 50000,
    currency: "AED",
    application_deadline: format(new Date(2025, 10, 30), "yyyy-MM-dd"),  // Nov 30, 2025
    requirements: [
      "Academic records",
      "Leadership essay",
      "Community service history",
      "Interview with selection committee"
    ],
    contact_email: "future.leaders@dubaifuture.gov.ae",
    contact_phone: "+971-4-513-2222",
    website_url: "https://www.dubaifuture.gov.ae/scholarships",
    is_active: true,
    created_at: format(new Date(2024, 5, 15), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH003",
    title: "Transportation Innovation Grant",
    description: "Funding for graduate students focusing on transportation management, logistics, and urban mobility solutions.",
    provider: "RTA",
    provider_type: "government",
    eligibility_criteria: {
      education_level: "graduate",
      min_gpa: 3.2,
      study_fields: ["transportation engineering", "logistics", "urban planning"],
      years_of_experience: "At least 1 year in relevant field",
      research_focus: "Must relate to urban transportation or mobility solutions"
    },
    amount: 35000,
    currency: "AED",
    application_deadline: format(new Date(2026, 1, 28), "yyyy-MM-dd"),  // Feb 28, 2026
    requirements: [
      "Research proposal",
      "Academic transcripts",
      "Professional references",
      "Work portfolio"
    ],
    contact_email: "education@rta.ae",
    contact_phone: "+971-4-284-4444",
    website_url: "https://www.rta.ae/scholarships",
    is_active: true,
    created_at: format(new Date(2024, 7, 5), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH004",
    title: "Aviation Excellence Award",
    description: "Supporting students pursuing careers in aviation, aeronautical engineering, and airline operations.",
    provider: "Emirates Airlines",
    provider_type: "private_sector",
    eligibility_criteria: {
      education_level: "undergraduate",
      min_gpa: 3.3,
      study_fields: ["aviation", "aeronautical engineering", "aviation management"],
      nationality: "Open to all nationalities with preference for UAE nationals",
      additional_skills: "Strong English language proficiency required"
    },
    amount: 45000,
    currency: "AED",
    application_deadline: format(new Date(2025, 8, 15), "yyyy-MM-dd"),  // Sep 15, 2025
    requirements: [
      "Academic records",
      "Personal statement",
      "English proficiency test results",
      "Two recommendation letters"
    ],
    contact_email: "careers.education@emirates.com",
    contact_phone: "+971-600-555555",
    website_url: "https://www.emirates.com/careers/scholarships",
    is_active: true,
    created_at: format(new Date(2024, 4, 20), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH005",
    title: "Public Service Excellence Scholarship",
    description: "Supporting students committed to careers in law enforcement, security, and public safety.",
    provider: "Dubai Police",
    provider_type: "government",
    eligibility_criteria: {
      education_level: "undergraduate",
      min_gpa: 3.0,
      study_fields: ["criminology", "law", "security studies", "forensic science"],
      physical_fitness: "Must pass Dubai Police fitness assessment",
      citizenship: "UAE nationals only"
    },
    amount: 30000,
    currency: "AED",
    application_deadline: format(new Date(2025, 3, 30), "yyyy-MM-dd"),  // Apr 30, 2025
    requirements: [
      "Academic transcripts",
      "Character references",
      "Security clearance",
      "Physical fitness test"
    ],
    contact_email: "education@dubaipolice.gov.ae",
    contact_phone: "+971-4-269-2222",
    website_url: "https://www.dubaipolice.gov.ae/scholarships",
    is_active: true,
    created_at: format(new Date(2024, 2, 15), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH006",
    title: "Engineering Leadership Program",
    description: "Comprehensive scholarship and internship package for engineering students interested in industrial technologies.",
    provider: "General Electric",
    provider_type: "private_sector",
    eligibility_criteria: {
      education_level: "undergraduate",
      min_gpa: 3.4,
      study_fields: ["mechanical engineering", "electrical engineering", "industrial engineering"],
      language_requirements: "Proficiency in English",
      technical_skills: "Programming and CAD experience preferred"
    },
    amount: 38000,
    currency: "AED",
    application_deadline: format(new Date(2025, 9, 30), "yyyy-MM-dd"),  // Oct 30, 2025
    requirements: [
      "Academic records",
      "Technical assessment",
      "Interview",
      "Portfolio of projects"
    ],
    contact_email: "scholarship.applications@ge.com",
    contact_phone: "+971-4-429-6666",
    website_url: "https://www.ge.com/careers/students",
    is_active: true,
    created_at: format(new Date(2024, 3, 10), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH007",
    title: "Digital Innovation Scholarship",
    description: "Supporting students pursuing studies in telecommunications, digital transformation, and information technology.",
    provider: "Huawei",
    provider_type: "private_sector",
    eligibility_criteria: {
      education_level: "undergraduate",
      min_gpa: 3.3,
      study_fields: ["computer science", "telecommunications", "information systems", "data science"],
      additional_requirements: "Must participate in Huawei's Innovation Competition"
    },
    amount: 25000,
    currency: "AED",
    application_deadline: format(new Date(2025, 7, 15), "yyyy-MM-dd"),  // Aug 15, 2025
    requirements: [
      "Academic transcripts",
      "Innovation project proposal",
      "Technical skills assessment",
      "Two academic references"
    ],
    contact_email: "seeds.uae@huawei.com",
    contact_phone: "+971-4-454-9999",
    website_url: "https://www.huawei.com/minisite/seeds-for-the-future/index.html",
    is_active: true,
    created_at: format(new Date(2024, 3, 25), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH008",
    title: "Aerospace Engineering Fellowship",
    description: "Prestigious fellowship for graduate students specializing in aerospace engineering and related disciplines.",
    provider: "Rolls-Royce",
    provider_type: "private_sector",
    eligibility_criteria: {
      education_level: "graduate",
      min_gpa: 3.5,
      study_fields: ["aerospace engineering", "mechanical engineering", "materials science"],
      experience: "Prior internship or project experience preferred",
      skills: "Strong mathematical and analytical skills required"
    },
    amount: 60000,
    currency: "AED",
    application_deadline: format(new Date(2025, 5, 30), "yyyy-MM-dd"),  // Jun 30, 2025
    requirements: [
      "Research proposal",
      "Academic transcripts",
      "Professional portfolio",
      "Three letters of recommendation",
      "Interview with technical panel"
    ],
    contact_email: "graduate.programs@rolls-royce.com",
    contact_phone: "+971-4-365-8888",
    website_url: "https://careers.rolls-royce.com/students-and-graduates",
    is_active: true,
    created_at: format(new Date(2024, 1, 20), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH009",
    title: "Government Excellence Scholarship",
    description: "Comprehensive scholarship for undergraduate and graduate students pursuing careers in government administration and policy.",
    provider: "DIWAN",
    provider_type: "government",
    eligibility_criteria: {
      education_level: ["undergraduate", "graduate"],
      min_gpa: 3.2,
      study_fields: ["public administration", "political science", "government policy", "public relations"],
      citizenship: "UAE nationals only",
      languages: "Arabic and English proficiency required"
    },
    amount: 45000,
    currency: "AED",
    application_deadline: format(new Date(2025, 4, 15), "yyyy-MM-dd"),  // May 15, 2025
    requirements: [
      "Academic transcripts",
      "Language proficiency certificates",
      "Personal statement on career goals in government",
      "Two recommendation letters"
    ],
    contact_email: "scholarships@diwan.gov.ae",
    contact_phone: "+971-4-330-1111",
    website_url: "https://www.diwan.gov.ae/education",
    is_active: true,
    created_at: format(new Date(2024, 2, 5), "yyyy-MM-dd"),
    created_by: "system"
  },
  {
    id: "SCH010",
    title: "Sustainable Energy Research Grant",
    description: "Funding for advanced research in renewable energy technologies and sustainable development.",
    provider: "DEWA",
    provider_type: "government",
    eligibility_criteria: {
      education_level: "graduate",
      min_gpa: 3.6,
      study_fields: ["renewable energy", "sustainable engineering", "environmental science"],
      research_focus: "Must be directly applicable to sustainable energy development",
      publication_record: "Previous research experience preferred"
    },
    amount: 55000,
    currency: "AED",
    application_deadline: format(new Date(2025, 2, 28), "yyyy-MM-dd"),  // Mar 28, 2025
    requirements: [
      "Detailed research proposal",
      "Academic transcripts",
      "Research portfolio",
      "Publication list if applicable",
      "Two academic references"
    ],
    contact_email: "research.grants@dewa.gov.ae",
    contact_phone: "+971-4-601-8888",
    website_url: "https://www.dewa.gov.ae/research",
    is_active: true,
    created_at: format(new Date(2024, 0, 15), "yyyy-MM-dd"),
    created_by: "system"
  }
];
