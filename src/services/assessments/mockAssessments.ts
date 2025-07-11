
import { Assessment } from "../../types/assessments";

export const mockAssessments: Assessment[] = [
  {
    id: "ASSMT001",
    title: "JavaScript Coding Challenge",
    description: "A comprehensive test of JavaScript programming skills, including ES6 features, async programming, and DOM manipulation.",
    center_id: "CENTER001",
    assessment_type: "skills",
    duration_minutes: 60,
    price_amount: 0,
    price_currency: "AED",
    skills_tested: ["JavaScript", "ES6", "React", "Algorithms"],
    requirements: "Computer with a modern browser and stable internet connection",
    eligibility_criteria: { role: "Software Engineer", experience_level: "Entry to Mid" },
    is_active: true,
    created_at: "2025-04-15T10:30:00Z",
    updated_at: null
  },
  {
    id: "ASSMT002",
    title: "Numerical Reasoning Assessment",
    description: "Test designed to measure the ability to interpret and analyze numerical data, charts, and statistics.",
    center_id: "CENTER002",
    assessment_type: "capabilities",
    duration_minutes: 30,
    price_amount: 99,
    price_currency: "AED",
    skills_tested: ["Data Interpretation", "Mathematical Reasoning", "Statistical Analysis"],
    requirements: "Calculator allowed",
    eligibility_criteria: { role: "Financial Analyst", education_minimum: "Bachelor's degree" },
    is_active: true,
    created_at: "2025-04-18T14:45:00Z",
    updated_at: null
  },
  {
    id: "ASSMT003",
    title: "Leadership Potential Evaluation",
    description: "Assessment to identify leadership capabilities, decision-making skills, and management potential.",
    center_id: "CENTER003",
    assessment_type: "behaviors",
    duration_minutes: 45,
    price_amount: 150,
    price_currency: "AED",
    skills_tested: ["Decision Making", "Team Management", "Strategic Thinking", "Conflict Resolution"],
    requirements: "Minimum 2 years work experience",
    eligibility_criteria: { role: "Team Lead", experience_minimum: "2 years" },
    is_active: true,
    created_at: "2025-05-01T09:15:00Z",
    updated_at: null
  },
  {
    id: "ASSMT004",
    title: "UI/UX Design Challenge",
    description: "Practical assessment of UI/UX design skills, including wireframing, prototyping, and user journey mapping.",
    center_id: "CENTER001",
    assessment_type: "skills",
    duration_minutes: 90,
    price_amount: 120,
    price_currency: "AED",
    skills_tested: ["UI Design", "Wireframing", "Figma", "User Research"],
    requirements: "Access to design software (Figma, Adobe XD, or Sketch)",
    eligibility_criteria: { role: "UI/UX Designer", portfolio_required: true },
    is_active: true,
    created_at: "2025-05-10T13:00:00Z",
    updated_at: null
  },
  {
    id: "ASSMT005",
    title: "Sales Aptitude Test",
    description: "Assessment to evaluate sales capabilities, negotiation skills, and customer engagement strategies.",
    center_id: "CENTER004",
    assessment_type: "capabilities",
    duration_minutes: 40,
    price_amount: 75,
    price_currency: "AED",
    skills_tested: ["Negotiation", "Lead Generation", "Client Management", "Sales Strategy"],
    requirements: "None",
    eligibility_criteria: { role: "Sales Manager", target_industries: ["Technology", "Finance", "Healthcare"] },
    is_active: true,
    created_at: "2025-05-15T11:30:00Z",
    updated_at: null
  },
  {
    id: "ASSMT006",
    title: "Personality Profile Assessment",
    description: "Comprehensive personality assessment based on the Big Five personality traits to evaluate cultural fit and work style.",
    center_id: "CENTER002",
    assessment_type: "behaviors",
    duration_minutes: 35,
    price_amount: 50,
    price_currency: "AED",
    skills_tested: ["Self-Awareness", "Team Collaboration", "Work Style", "Communication Style"],
    requirements: "Quiet environment recommended",
    eligibility_criteria: null,
    is_active: true,
    created_at: "2025-05-22T16:00:00Z",
    updated_at: null
  },
  {
    id: "ASSMT007",
    title: "DevOps Infrastructure Challenge",
    description: "Technical assessment for DevOps engineers covering infrastructure as code, CI/CD pipelines, and cloud platforms.",
    center_id: "CENTER001",
    assessment_type: "skills",
    duration_minutes: 75,
    price_amount: 200,
    price_currency: "AED",
    skills_tested: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    requirements: "Computer with internet access and a GitHub account",
    eligibility_criteria: { role: "DevOps Engineer", experience_minimum: "3 years" },
    is_active: true,
    created_at: "2025-06-01T10:00:00Z",
    updated_at: null
  },
  {
    id: "ASSMT008",
    title: "Project Management Simulation",
    description: "Interactive simulation to assess project management skills in a realistic scenario with changing requirements and constraints.",
    center_id: "CENTER003",
    assessment_type: "capabilities",
    duration_minutes: 120,
    price_amount: 175,
    price_currency: "AED",
    skills_tested: ["Risk Management", "Resource Allocation", "Stakeholder Management", "Schedule Planning"],
    requirements: "Project management experience",
    eligibility_criteria: { role: "Project Manager", certification_preferred: ["PMP", "Prince2", "Agile"] },
    is_active: true,
    created_at: "2025-06-10T14:30:00Z",
    updated_at: null
  },
  {
    id: "ASSMT009",
    title: "Data Science Challenge",
    description: "Applied data science assessment including data cleaning, analysis, visualization, and machine learning model building.",
    center_id: "CENTER004",
    assessment_type: "skills",
    duration_minutes: 90,
    price_amount: 225,
    price_currency: "AED",
    skills_tested: ["Python", "Data Analysis", "Machine Learning", "Data Visualization"],
    requirements: "Familiarity with Python, pandas, scikit-learn",
    eligibility_criteria: { role: "Data Scientist", education_minimum: "Master's degree in relevant field" },
    is_active: true,
    created_at: "2025-06-20T11:15:00Z",
    updated_at: null
  },
  {
    id: "ASSMT010",
    title: "Situational Judgment Test",
    description: "Assessment presenting workplace scenarios to evaluate decision-making, problem-solving, and interpersonal skills.",
    center_id: "CENTER002",
    assessment_type: "behaviors",
    duration_minutes: 45,
    price_amount: 85,
    price_currency: "AED",
    skills_tested: ["Critical Thinking", "Problem Solving", "Interpersonal Skills", "Ethics"],
    requirements: "None",
    eligibility_criteria: null,
    is_active: false,
    created_at: "2025-06-25T15:45:00Z",
    updated_at: "2025-06-30T09:00:00Z"
  }
];
