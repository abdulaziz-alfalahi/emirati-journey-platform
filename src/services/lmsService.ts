
import { supabase } from '@/integrations/supabase/client';
import type {
  Course,
  CourseModule,
  Lesson,
  Quiz,
  QuizQuestion,
  CourseEnrollment,
  LessonProgress,
  QuizAttempt,
  Certificate,
  CreateCourseData,
  CreateModuleData,
  CreateLessonData,
  CreateQuizData,
  QuizQuestionData
} from '@/types/lms';

export class LMSService {
  // Course management
  async createCourse(courseData: CreateCourseData): Promise<Course> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('courses')
      .insert({
        ...courseData,
        instructor_id: user.user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCourses(filters?: { status?: string; category?: string; featured?: boolean }): Promise<Course[]> {
    let query = supabase.from('courses').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.featured) {
      query = query.eq('is_featured', filters.featured);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getCourse(id: string): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateCourse(id: string, updates: Partial<CreateCourseData>): Promise<Course> {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Module management
  async createModule(courseId: string, moduleData: CreateModuleData): Promise<CourseModule> {
    const { data, error } = await supabase
      .from('course_modules')
      .insert({
        ...moduleData,
        course_id: courseId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCourseModules(courseId: string): Promise<CourseModule[]> {
    const { data, error } = await supabase
      .from('course_modules')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Lesson management
  async createLesson(moduleId: string, lessonData: CreateLessonData): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .insert({
        ...lessonData,
        module_id: moduleId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getModuleLessons(moduleId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Quiz management
  async createQuiz(lessonId: string, quizData: CreateQuizData): Promise<Quiz> {
    const { data, error } = await supabase
      .from('quizzes')
      .insert({
        ...quizData,
        lesson_id: lessonId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addQuizQuestion(quizId: string, questionData: QuizQuestionData): Promise<QuizQuestion> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert({
        ...questionData,
        quiz_id: quizId,
        order_index: 1 // Will be updated based on existing questions
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getQuizQuestions(quizId: string): Promise<QuizQuestion[]> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Enrollment management
  async enrollInCourse(courseId: string): Promise<CourseEnrollment> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: user.user.id,
        course_id: courseId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserEnrollments(): Promise<CourseEnrollment[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        courses:course_id (
          title,
          description,
          thumbnail_url,
          category
        )
      `)
      .eq('user_id', user.user.id)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Progress tracking
  async updateLessonProgress(lessonId: string, enrollmentId: string): Promise<LessonProgress> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.user.id,
        lesson_id: lessonId,
        enrollment_id: enrollmentId,
        is_completed: true,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserLessonProgress(enrollmentId: string): Promise<LessonProgress[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.user.id)
      .eq('enrollment_id', enrollmentId);

    if (error) throw error;
    return data || [];
  }

  // Quiz attempts
  async submitQuizAttempt(
    quizId: string,
    enrollmentId: string,
    answers: Record<string, any>,
    score: number,
    maxScore: number
  ): Promise<QuizAttempt> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    // Get attempt number
    const { data: existingAttempts } = await supabase
      .from('quiz_attempts')
      .select('attempt_number')
      .eq('user_id', user.user.id)
      .eq('quiz_id', quizId)
      .order('attempt_number', { ascending: false })
      .limit(1);

    const attemptNumber = existingAttempts?.length ? existingAttempts[0].attempt_number + 1 : 1;

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: user.user.id,
        quiz_id: quizId,
        enrollment_id: enrollmentId,
        score,
        max_score: maxScore,
        percentage: (score / maxScore) * 100,
        answers,
        attempt_number: attemptNumber,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Certificate generation
  async generateCertificate(courseId: string, enrollmentId: string): Promise<Certificate> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const certificateNumber = `CERT-${Date.now()}-${user.user.id.slice(0, 8)}`;

    const { data, error } = await supabase
      .from('certificates')
      .insert({
        user_id: user.user.id,
        course_id: courseId,
        enrollment_id: enrollmentId,
        certificate_number: certificateNumber,
        template_data: {
          issueDate: new Date().toISOString(),
          recipientName: user.user.email
        }
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserCertificates(): Promise<Certificate[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('certificates')
      .select(`
        *,
        courses:course_id (
          title,
          instructor_id
        )
      `)
      .eq('user_id', user.user.id)
      .order('issued_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export const lmsService = new LMSService();
