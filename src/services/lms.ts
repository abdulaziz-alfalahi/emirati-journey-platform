
export interface Course {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty_level: string;
  instructor_id: string;
  status: string;
  price?: number;
  duration_hours?: number;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseFilters {
  status?: string;
  category?: string;
  difficulty_level?: string;
}

export const lmsService = {
  async getCourses(filters: CourseFilters = {}): Promise<Course[]> {
    // Mock data for now - this would normally fetch from Supabase
    return [
      {
        id: '1',
        title: 'Introduction to Programming',
        description: 'Learn the basics of programming with JavaScript',
        category: 'Technology',
        difficulty_level: 'beginner',
        instructor_id: 'instructor-1',
        status: 'published',
        price: 299,
        duration_hours: 40,
        thumbnail_url: '/images/course-programming.jpg',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'Digital Marketing Fundamentals',
        description: 'Master the essentials of digital marketing',
        category: 'Marketing',
        difficulty_level: 'intermediate',
        instructor_id: 'instructor-2',
        status: 'published',
        price: 399,
        duration_hours: 30,
        thumbnail_url: '/images/course-marketing.jpg',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
  },

  async enrollInCourse(courseId: string): Promise<void> {
    // Mock enrollment - this would normally make an API call
    console.log(`Enrolling in course: ${courseId}`);
  }
};
