export type LessonStatus = 'completed' | 'unlocked' | 'locked';

export interface Lesson {
  id: number;
  title: string;
  status: LessonStatus;
}

export interface Course {
  id: number;
  title: string;
  lessons: Lesson[];
}