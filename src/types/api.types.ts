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