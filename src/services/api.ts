import type { Lesson, Question } from '../types/api.types';

const BASE_URL = 'https://skora-backend.onrender.com'; 

export const auth = {
  getUserId: () => {
    const id = localStorage.getItem('operator_id');
    return id ? parseInt(id) : null; 
  },
  setUserId: (id: number) => localStorage.setItem('operator_id', id.toString()),
  logout: () => localStorage.removeItem('operator_id')
};

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${BASE_URL}${path}${path.endsWith('/') ? '' : '/'}`;
    
    const response = await fetch(url, options);

    // If fetching completions returns 404, it usually means 0 progress
    if (response.status === 404 && path.includes('completions')) {
        return [] as any; 
    }

    if (!response.ok) throw new Error(`Status ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`[API ERROR] ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  getUsers: () => fetchJson<any[]>('/users/'),

  getUserProfile: async () => {
    const id = auth.getUserId();
    if (!id) throw new Error("NO_SESSION");
    try {
      return await fetchJson<any>(`/users/${id}`);
    } catch (err) {
      const all = await fetchJson<any[]>('/users/');
      const found = all.find((u: any) => u.id === id);
      if (found) return found;
      throw err;
    }
  },

  // FIXED PATH: Matches your POST endpoint structure
  getUserCompletions: async () => {
    const id = auth.getUserId();
    if (!id) return [];
    try {
      // Changed from /courses/users/ to /users/
      return await fetchJson<any>(`/users/${id}/completions`);
    } catch {
      return []; // Return empty array on any error to keep progress at 0%
    }
  },

  getCourses: () => fetchJson<any>('/courses/'),
  getLessons: (courseId: number) => fetchJson<any>(`/courses/${courseId}/lessons/`),
};