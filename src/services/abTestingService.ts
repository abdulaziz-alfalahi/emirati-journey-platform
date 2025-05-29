
export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  weight: number; // Percentage of users who should see this variant (0-100)
  config: Record<string, any>;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  variants: ABTestVariant[];
  targetMetric: string;
}

export interface ABTestAssignment {
  userId: string;
  testId: string;
  variantId: string;
  assignedAt: string;
}

export interface ABTestEvent {
  id: string;
  userId: string;
  testId: string;
  variantId: string;
  eventType: string;
  eventData?: Record<string, any>;
  timestamp: string;
}

// Mock A/B test configurations for recommendation algorithms
const recommendationTests: ABTest[] = [
  {
    id: 'rec-algorithm-v1',
    name: 'Recommendation Algorithm Comparison',
    description: 'Testing different weighting algorithms for recommendations',
    isActive: true,
    startDate: '2024-01-01T00:00:00Z',
    targetMetric: 'click_through_rate',
    variants: [
      {
        id: 'control',
        name: 'Current Algorithm',
        description: 'Existing weighted scoring system',
        weight: 50,
        config: {
          skillsWeight: 0.4,
          experienceWeight: 0.25,
          educationWeight: 0.2,
          locationWeight: 0.1,
          freshnessWeight: 0.05
        }
      },
      {
        id: 'skills-focused',
        name: 'Skills-Focused Algorithm',
        description: 'Higher weight on skills matching',
        weight: 50,
        config: {
          skillsWeight: 0.6,
          experienceWeight: 0.2,
          educationWeight: 0.1,
          locationWeight: 0.05,
          freshnessWeight: 0.05
        }
      }
    ]
  }
];

// Mock storage
let assignments: ABTestAssignment[] = [];
let events: ABTestEvent[] = [];

export const getActiveTests = (): ABTest[] => {
  return recommendationTests.filter(test => test.isActive);
};

export const getUserTestAssignment = (userId: string, testId: string): ABTestAssignment | null => {
  return assignments.find(a => a.userId === userId && a.testId === testId) || null;
};

export const assignUserToTest = (userId: string, testId: string): ABTestAssignment => {
  // Check if user is already assigned
  const existing = getUserTestAssignment(userId, testId);
  if (existing) return existing;

  // Find the test
  const test = recommendationTests.find(t => t.id === testId);
  if (!test || !test.isActive) {
    throw new Error('Test not found or inactive');
  }

  // Assign to variant based on weights
  const random = Math.random() * 100;
  let cumulativeWeight = 0;
  let selectedVariant = test.variants[0]; // Default to first variant

  for (const variant of test.variants) {
    cumulativeWeight += variant.weight;
    if (random <= cumulativeWeight) {
      selectedVariant = variant;
      break;
    }
  }

  const assignment: ABTestAssignment = {
    userId,
    testId,
    variantId: selectedVariant.id,
    assignedAt: new Date().toISOString()
  };

  assignments.push(assignment);
  console.log('A/B Test Assignment:', assignment);
  return assignment;
};

export const trackTestEvent = (
  userId: string, 
  testId: string, 
  eventType: string, 
  eventData?: Record<string, any>
): void => {
  const assignment = getUserTestAssignment(userId, testId);
  if (!assignment) return;

  const event: ABTestEvent = {
    id: `event-${Date.now()}`,
    userId,
    testId,
    variantId: assignment.variantId,
    eventType,
    eventData,
    timestamp: new Date().toISOString()
  };

  events.push(event);
  console.log('A/B Test Event:', event);
};

export const getTestResults = (testId: string) => {
  const testEvents = events.filter(e => e.testId === testId);
  const testAssignments = assignments.filter(a => a.testId === testId);

  const variantStats = testAssignments.reduce((stats, assignment) => {
    const variantId = assignment.variantId;
    if (!stats[variantId]) {
      stats[variantId] = {
        assignments: 0,
        clicks: 0,
        conversions: 0,
        feedback: 0
      };
    }
    stats[variantId].assignments++;
    return stats;
  }, {} as Record<string, any>);

  // Count events per variant
  testEvents.forEach(event => {
    const variantId = event.variantId;
    if (variantStats[variantId]) {
      switch (event.eventType) {
        case 'click':
          variantStats[variantId].clicks++;
          break;
        case 'conversion':
          variantStats[variantId].conversions++;
          break;
        case 'feedback':
          variantStats[variantId].feedback++;
          break;
      }
    }
  });

  // Calculate rates
  Object.keys(variantStats).forEach(variantId => {
    const stats = variantStats[variantId];
    stats.clickThroughRate = stats.assignments > 0 ? (stats.clicks / stats.assignments) * 100 : 0;
    stats.conversionRate = stats.assignments > 0 ? (stats.conversions / stats.assignments) * 100 : 0;
    stats.feedbackRate = stats.assignments > 0 ? (stats.feedback / stats.assignments) * 100 : 0;
  });

  return variantStats;
};

export const getRecommendationConfig = (userId: string): Record<string, number> => {
  // Get user's assignment for the recommendation algorithm test
  const assignment = getUserTestAssignment(userId, 'rec-algorithm-v1');
  
  if (!assignment) {
    // Assign user to test
    const newAssignment = assignUserToTest(userId, 'rec-algorithm-v1');
    const test = recommendationTests.find(t => t.id === 'rec-algorithm-v1');
    const variant = test?.variants.find(v => v.id === newAssignment.variantId);
    return variant?.config || {};
  }

  const test = recommendationTests.find(t => t.id === assignment.testId);
  const variant = test?.variants.find(v => v.id === assignment.variantId);
  return variant?.config || {};
};
