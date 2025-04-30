
// Export everything from the careerPathService
export * from '../careerPathService';

// Re-export functions with correct names
export { getAllCareerPaths as getCareerPaths } from '../careerPathService';

// Export the seed function 
export { seedCareerPaths } from './db-seed';
