export interface CourseSummary {
  id: number;
  title: string;
  description?: string;
}

export interface Lesson {
  id: number;
  title: string;
  order_index: number;
  course_id: number;
  content?: string;
}

export interface AnswerOption {
  id: number;
  question_id?: number;
  text?: string;
  option_text?: string;
  answer_text?: string;
  is_correct?: boolean;
}

export interface Question {
  id: number;
  text?: string;
  question_text?: string;
  type: string;
  options?: AnswerOption[];
  answer_options?: AnswerOption[];
}

export interface UserAnswerIn {
  question_id: number;
  answer_id: number;
}

export interface QuizSubmission {
  answers: UserAnswerIn[];
}

export interface QuizResult {
  score: number;
  total_questions: number;
  correct_count: number;
  results: Record<string, boolean>;
}

export interface Completion {
  user_id: number;
  lesson_id: number;
  course_id?: number;
  score?: number;
}

export interface LessonProgress {
  lesson_id: number;
  title: string;
  order_index: number;
  is_completed: boolean;
  score?: number | null;
}

export interface CourseProgress {
  user_id: number;
  course_id: number;
  total_lessons: number;
  completed_lessons: number;
  progress_percent: number;
  next_lesson_id?: number | null;
  lessons: LessonProgress[];
}

export interface RecommendationTarget {
  courseId: number | null;
  lessonId: number | null;
  title?: string;
  strategy?: string;
  message?: string;
  reason?: string;
  recommendedQuizDifficulty?: string;
  confidence?: number;
  isComplete?: boolean;
}