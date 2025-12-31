import type{ Lesson, Question } from '../types/api.types';

const BASE_URL = '/api'; 

async function fetchJson<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`[API] Request Failed:`, error);
    throw error;
  }
}

export const api = {
  // 1. Get All Courses
  getCourses: async () => {
    const data = await fetchJson<any>('/courses/');
    if (Array.isArray(data)) return data;
    if (data.courses && Array.isArray(data.courses)) return data.courses;
    return [];
  },
  
  // 2. Get User Completions
  getUserCompletions: async (userId: number = 1) => {
    return fetchJson<any[]>(`/courses/users/${userId}/completions`);
  },

  // 3. Get Lessons (needed to find the Order Index)
  getLessons: (courseId: number) => 
    fetchJson<Lesson[]>(`/courses/${courseId}/lessons`),

  // 4. NEW: Get Random Questions using Order Index
  // Matches: /courses/{course_id}/lessons/order/{order_index}/questions/random
  getRandomQuestionsByOrder: (courseId: number, orderIndex: number, count: number = 10) => 
    fetchJson<Question[]>(`/courses/${courseId}/lessons/order/${orderIndex}/questions/random?count=${count}`),
};