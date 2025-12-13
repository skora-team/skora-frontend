// src/types.ts
export type LessonStatus = 'completed' | 'unlocked' | 'locked';

export interface Lesson {
  id: number;
  title: string;
  status: LessonStatus;
  description: string; // <-- ADD THIS LINE
}

export interface Course {
  id: number;
  title: string;
  lessons: Lesson[];
}