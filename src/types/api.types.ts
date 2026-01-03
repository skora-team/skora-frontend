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
  text: string;
  is_correct?: boolean;
}

export interface Question {
  id: number;
  text: string;
  type: string;
  options?: AnswerOption[];
}