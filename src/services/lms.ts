
import type { Course, CourseEnrollment } from '@/types/lms';

// CourseFilters interface for filtering courses
export interface CourseFilters {
  status?: string;
  category?: string;
  difficulty_level?: string;
}

// Mock implementation of LMS service
export const lmsService = {
  async getCourses(filters: CourseFilters = {}): Promise<Course[]> {
    // Mock data for now - this would normally fetch from Supabase
    return [
      {
        id: '1',
        title: 'Introduction to Programming',
        description: 'Learn the basics of programming with JavaScript',
        instructor_id: 'instructor-1',
        category: 'Technology',
        difficulty_level: 'beginner',
        duration_hours: 40,
        price: 299,
        currency: 'AED',
        thumbnail_url: '/images/course-programming.jpg',
        status: 'published',
        is_featured: true,
        prerequisites: ['Basic computer literacy'],
        learning_objectives: ['Understand programming fundamentals', 'Write basic JavaScript code'],
        tags: ['programming', 'javascript', 'beginner'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'Digital Marketing Fundamentals',
        description: 'Master the essentials of digital marketing',
        instructor_id: 'instructor-2',
        category: 'Marketing',
        difficulty_level: 'intermediate',
        duration_hours: 30,
        price: 399,
        currency: 'AED',
        thumbnail_url: '/images/course-marketing.jpg',
        status: 'published',
        is_featured: false,
        prerequisites: ['Basic marketing knowledge'],
        learning_objectives: ['Understand digital marketing strategies', 'Create effective campaigns'],
        tags: ['marketing', 'digital', 'intermediate'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
  },

  async createCourse(courseData: any): Promise<Course> {
    // Mock course creation
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      title: courseData.title,
      description: courseData.description,
      instructor_id: 'current-user-id',
      category: courseData.category,
      difficulty_level: courseData.difficulty_level || 'beginner',
      duration_hours: courseData.duration_hours || 0,
      price: courseData.price || 0,
      currency: courseData.currency || 'AED',
      thumbnail_url: courseData.thumbnail_url,
      status: 'draft',
      is_featured: false,
      prerequisites: courseData.prerequisites || [],
      learning_objectives: courseData.learning_objectives || [],
      tags: courseData.tags || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Mock: Created course', newCourse);
    return newCourse;
  },

  async enrollInCourse(courseId: string): Promise<void> {
    // Mock enrollment - this would normally make an API call
    console.log(`Mock: Enrolling in course: ${courseId}`);
  },

  async getUserEnrollments(): Promise<CourseEnrollment[]> {
    // Mock user enrollments
    return [
      {
        id: '1',
        user_id: 'current-user-id',
        course_id: '1',
        enrolled_at: '2024-01-15T00:00:00Z',
        status: 'active',
        progress_percentage: 75,
        completed_at: undefined,
        certificate_issued_at: undefined
      },
      {
        id: '2',
        user_id: 'current-user-id',
        course_id: '2',
        enrolled_at: '2024-01-20T00:00:00Z',
        status: 'completed',
        progress_percentage: 100,
        completed_at: '2024-02-20T00:00:00Z',
        certificate_issued_at: '2024-02-21T00:00:00Z'
      }
    ];
  }
};
