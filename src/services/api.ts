import type { Lesson, Question } from '../types/api.types';

const BASE_URL = 'https://skora-backend.onrender.com'; 

export const auth = {
  // STRICT: Only returns what is in memory. No defaults.
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
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, options);
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
    
    // If no ID is found, we don't even call the server
    if (!id) throw new Error("NO_SESSION");

    try {
      return await fetchJson<any>(`/users/${id}`);
    } catch (err) {
      // Fallback search by ID in master list
      const allUsers = await fetchJson<any[]>('/users/');
      const found = allUsers.find((u: any) => u.id === id);
      if (found) return found;
      throw new Error("USER_NOT_FOUND");
    }
  },

  getUserCompletions: async () => {
    const id = auth.getUserId();
    if (!id) return [];
    try {
      return await fetchJson<any>(`/courses/users/${id}/completions/`);
    } catch {
      return await fetchJson<any>(`/courses/users/${id}/completions`);
    }
  },

  getCourses: () => fetchJson<any>('/courses/'),
  getLessons: (courseId: number) => fetchJson<any>(`/courses/${courseId}/lessons/`),
};