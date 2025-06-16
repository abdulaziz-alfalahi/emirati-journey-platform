
export interface FinancialAssessment {
  id: string;
  user_id: string;
  current_income: number;
  monthly_expenses: number;
  current_savings: number;
  debt_amount: number;
  retirement_goal_age: number;
  desired_retirement_income: number;
  risk_tolerance: 'conservative' | 'moderate' | 'aggressive';
  assessment_date: string;
  readiness_score: number;
}

export interface RetirementBenefit {
  id: string;
  user_id: string;
  pension_amount: number;
  social_security_amount: number;
  healthcare_coverage: string;
  benefit_start_date: string;
  optimization_recommendations: string[];
  estimated_monthly_total: number;
}

export interface HealthcarePlan {
  id: string;
  user_id: string;
  insurance_type: 'basic' | 'comprehensive' | 'premium';
  monthly_premium: number;
  coverage_details: string[];
  long_term_care_included: boolean;
  estimated_annual_costs: number;
  recommendations: string[];
}

export interface EstateDocument {
  id: string;
  user_id: string;
  document_type: 'will' | 'trust' | 'power_of_attorney' | 'healthcare_directive';
  document_name: string;
  status: 'draft' | 'in_review' | 'completed' | 'needs_update';
  created_date: string;
  last_updated: string;
  beneficiaries: string[];
}

export interface RetirementPlanningSystem {
  financialAssessment: {
    currentFinancialPosition: FinancialAssessmentTool;
    retirementReadiness: ReadinessCalculator;
    gapAnalysis: RetirementGapAnalysis;
    improvementPlan: FinancialImprovementPlan;
  };
  benefitOptimization: {
    pensionCalculator: PensionCalculationTool;
    socialSecurityOptimizer: SocialSecurityTool;
    healthcareBenefits: HealthcareBenefitGuide;
    benefitCoordination: BenefitCoordinationSystem;
  };
  healthcarePlanning: {
    insuranceSelection: InsuranceSelectionTool;
    longTermCarePlanning: LongTermCarePlanner;
    healthcareCostEstimator: HealthcareCostTool;
    careCoordination: CareCoordinationSystem;
  };
}

export interface FinancialAssessmentTool {
  calculateReadinessScore: (assessment: FinancialAssessment) => number;
  generateImprovementPlan: (assessment: FinancialAssessment) => string[];
  estimateRetirementGap: (assessment: FinancialAssessment) => number;
}

export interface ReadinessCalculator {
  assessCurrentPosition: (financialData: any) => number;
  projectRetirementNeeds: (goalAge: number, desiredIncome: number) => number;
  calculateSavingsRequired: (currentAge: number, retirementAge: number, gap: number) => number;
}

export interface RetirementGapAnalysis {
  currentSavingsProjection: number;
  requiredSavings: number;
  monthlyGap: number;
  recommendations: string[];
}

export interface FinancialImprovementPlan {
  shortTermGoals: string[];
  mediumTermGoals: string[];
  longTermGoals: string[];
  actionItems: string[];
  timelineMonths: number;
}

export interface PensionCalculationTool {
  calculateMonthlyPension: (yearsOfService: number, finalSalary: number) => number;
  optimizeWithdrawalStrategy: (pensionAmount: number, otherIncome: number) => string[];
  estimateTaxImplications: (pensionAmount: number) => number;
}

export interface SocialSecurityTool {
  calculateBenefits: (contributionYears: number, averageIncome: number) => number;
  optimizeClaimingStrategy: (birthDate: string, retirementGoals: any) => string[];
  estimateLifetimeBenefits: (claimingAge: number, expectedLifespan: number) => number;
}

export interface HealthcareBenefitGuide {
  compareInsurancePlans: (plans: HealthcarePlan[]) => HealthcarePlan[];
  estimateAnnualCosts: (plan: HealthcarePlan, healthConditions: string[]) => number;
  recommendOptimalPlan: (userProfile: any, budget: number) => HealthcarePlan;
}

export interface BenefitCoordinationSystem {
  coordinateMultipleBenefits: (benefits: RetirementBenefit[]) => string[];
  optimizeTiming: (benefits: RetirementBenefit[], retirementDate: string) => string[];
  maximizeTotalBenefits: (benefits: RetirementBenefit[]) => number;
}

export interface InsuranceSelectionTool {
  compareOptions: (options: HealthcarePlan[]) => HealthcarePlan[];
  calculateCostBenefit: (plan: HealthcarePlan, userProfile: any) => number;
  recommendCoverage: (healthStatus: string, budget: number) => string[];
}

export interface LongTermCarePlanner {
  estimateCareNeeds: (age: number, healthStatus: string) => string[];
  calculateCareCosts: (careLevel: string, location: string) => number;
  recommendInsurance: (userProfile: any) => string[];
}

export interface HealthcareCostTool {
  projectAnnualCosts: (age: number, healthConditions: string[]) => number;
  estimateLifetimeCosts: (currentAge: number, expectedLifespan: number) => number;
  budgetForHealthcare: (retirementIncome: number) => number;
}

export interface CareCoordinationSystem {
  findProviders: (location: string, specialties: string[]) => any[];
  coordinateServices: (careNeeds: string[]) => string[];
  manageAppointments: (providers: any[]) => any[];
}
