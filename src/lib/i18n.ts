import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all existing translation files
import commonEn from '../locales/en/common.json';
import commonAr from '../locales/ar/common.json';
import navigationEn from '../locales/en/navigation.json';
import navigationAr from '../locales/ar/navigation.json';
import homeEn from '../locales/en/home.json';
import homeAr from '../locales/ar/home.json';
import formsEn from '../locales/en/forms.json';
import formsAr from '../locales/ar/forms.json';
import lmsEn from '../locales/en/lms.json';
import lmsAr from '../locales/ar/lms.json';
import careerPlanningHubEn from '../locales/en/career-planning-hub.json';
import careerPlanningHubAr from '../locales/ar/career-planning-hub.json';
import graduateProgramsEn from '../locales/en/graduate-programs.json';
import graduateProgramsAr from '../locales/ar/graduate-programs.json';
import industryExplorationEn from '../locales/en/industry-exploration.json';
import industryExplorationAr from '../locales/ar/industry-exploration.json';
import scholarshipsEn from '../locales/en/scholarships.json';
import scholarshipsAr from '../locales/ar/scholarships.json';
import schoolProgramsEn from '../locales/en/school-programs.json';
import schoolProgramsAr from '../locales/ar/school-programs.json';
import summerCampsEn from '../locales/en/summer-camps.json';
import summerCampsAr from '../locales/ar/summer-camps.json';
import universityProgramsEn from '../locales/en/university-programs.json';
import universityProgramsAr from '../locales/ar/university-programs.json';
import financialPlanningEn from '../locales/en/financial-planning.json';
import financialPlanningAr from '../locales/ar/financial-planning.json';
import portfolioEn from '../locales/en/portfolio.json';
import portfolioAr from '../locales/ar/portfolio.json';
import resumeBuilderEn from '../locales/en/resume-builder.json';
import resumeBuilderAr from '../locales/ar/resume-builder.json';
import internshipsEn from '../locales/en/internships.json';
import internshipsAr from '../locales/ar/internships.json';
import interviewPreparationEn from '../locales/en/interview-preparation.json';
import interviewPreparationAr from '../locales/ar/interview-preparation.json';
import careerAdvisoryEn from '../locales/en/career-advisory.json';
import careerAdvisoryAr from '../locales/ar/career-advisory.json';
import jobsEn from '../locales/en/jobs.json';
import jobsAr from '../locales/ar/jobs.json';
import analyticsEn from '../locales/en/analytics.json';
import analyticsAr from '../locales/ar/analytics.json';
import assessmentsEn from '../locales/en/assessments.json';
import assessmentsAr from '../locales/ar/assessments.json';

// Import new translation files for missing pages
import digitalSkillsEn from '../locales/en/digital-skills-development.json';
import digitalSkillsAr from '../locales/ar/digital-skills-development.json';
import professionalCertificationsEn from '../locales/en/professional-certifications.json';
import professionalCertificationsAr from '../locales/ar/professional-certifications.json';
import mentorshipEn from '../locales/en/mentorship.json';
import mentorshipAr from '../locales/ar/mentorship.json';
import blockchainCredentialsEn from '../locales/en/blockchain-credentials.json';
import blockchainCredentialsAr from '../locales/ar/blockchain-credentials.json';
import communitiesEn from '../locales/en/communities.json';
import communitiesAr from '../locales/ar/communities.json';

// MISSING IMPORTS - NOW ADDED
import credentialsEn from '../locales/en/credentials.json';
import credentialsAr from '../locales/ar/credentials.json';
import networkingEn from '../locales/en/networking.json';
import networkingAr from '../locales/ar/networking.json';

// NEW: Training translation files
import trainingEn from '../locales/en/training.json';
import trainingAr from '../locales/ar/training.json';

// ✅ NEW: Lifelong Engagement translation files
import youthDevelopmentEn from '../locales/en/youth-development.json';
import youthDevelopmentAr from '../locales/ar/youth-development.json';
import nationalServiceEn from '../locales/en/national-service.json';
import nationalServiceAr from '../locales/ar/national-service.json';
import thoughtLeadershipEn from '../locales/en/thought-leadership.json';
import thoughtLeadershipAr from '../locales/ar/thought-leadership.json';
import shareSuccessStoriesEn from '../locales/en/share-success-stories.json';
import shareSuccessStoriesAr from '../locales/ar/share-success-stories.json';
import retireeEn from '../locales/en/retiree.json';
import retireeAr from '../locales/ar/retiree.json';

const resources = {
  en: {
    // Existing namespaces
    common: commonEn,
    navigation: navigationEn,
    home: homeEn,
    forms: formsEn,
    lms: lmsEn,
    'career-planning-hub': careerPlanningHubEn,
    'graduate-programs': graduateProgramsEn,
    'industry-exploration': industryExplorationEn,
    scholarships: scholarshipsEn,
    'school-programs': schoolProgramsEn,
    'summer-camps': summerCampsEn,
    'university-programs': universityProgramsEn,
    'financial-planning': financialPlanningEn,
    portfolio: portfolioEn,
    'resume-builder': resumeBuilderEn,
    internships: internshipsEn,
    'interview-preparation': interviewPreparationEn,
    'career-advisory': careerAdvisoryEn,
    jobs: jobsEn,
    analytics: analyticsEn,
    assessments: assessmentsEn,
    // New namespaces for missing pages
    'digital-skills-development': digitalSkillsEn,
    'professional-certifications': professionalCertificationsEn,
    mentorship: mentorshipEn,
    'blockchain-credentials': blockchainCredentialsEn,
    communities: communitiesEn,
    // PREVIOUSLY MISSING - NOW ADDED
    credentials: credentialsEn,
    networking: networkingEn,
    // NEW: Training namespace
    training: trainingEn,
    // ✅ NEW: Lifelong Engagement namespaces
    'youth-development': youthDevelopmentEn,
    'national-service': nationalServiceEn,
    'thought-leadership': thoughtLeadershipEn,
    'share-success-stories': shareSuccessStoriesEn,
    retiree: retireeEn,
  },
  ar: {
    // Existing namespaces
    common: commonAr,
    navigation: navigationAr,
    home: homeAr,
    forms: formsAr,
    lms: lmsAr,
    'career-planning-hub': careerPlanningHubAr,
    'graduate-programs': graduateProgramsAr,
    'industry-exploration': industryExplorationAr,
    scholarships: scholarshipsAr,
    'school-programs': schoolProgramsAr,
    'summer-camps': summerCampsAr,
    'university-programs': universityProgramsAr,
    'financial-planning': financialPlanningAr,
    portfolio: portfolioAr,
    'resume-builder': resumeBuilderAr,
    internships: internshipsAr,
    'interview-preparation': interviewPreparationAr,
    'career-advisory': careerAdvisoryAr,
    jobs: jobsAr,
    analytics: analyticsAr,
    assessments: assessmentsAr,
    // New namespaces for missing pages
    'digital-skills-development': digitalSkillsAr,
    'professional-certifications': professionalCertificationsAr,
    mentorship: mentorshipAr,
    'blockchain-credentials': blockchainCredentialsAr,
    communities: communitiesAr,
    // PREVIOUSLY MISSING - NOW ADDED
    credentials: credentialsAr,
    networking: networkingAr,
    // NEW: Training namespace
    training: trainingAr,
    // ✅ NEW: Lifelong Engagement namespaces
    'youth-development': youthDevelopmentAr,
    'national-service': nationalServiceAr,
    'thought-leadership': thoughtLeadershipAr,
    'share-success-stories': shareSuccessStoriesAr,
    retiree: retireeAr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;

