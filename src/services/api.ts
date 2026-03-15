import type { Lesson, Question } from '../types/api.types';

const BASE_URL = 'https://skora-backend.onrender.com'; 

export const auth = {
  getUserId: () => {
    const id = localStorage.getItem('operator_id');
    return id ? parseInt(id) : null; 
  },
  setUserId: (id: number) => localStorage.setItem('operator_id', id.toString()),
  logout: () => {
    localStorage.removeItem('operator_id');
    localStorage.removeItem('token');
  }
};

async function fetchJson<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    // 1. Ensure path starts with /
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    } as Record<string, string>;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // 2. Strict Trailing Slash Logic for Render/FastAPI
    // If there's a '?', don't add a slash at the very end.
    // If there's no '?' and no trailing slash, add one.
    let url = `${BASE_URL}${path}`;
    if (!path.includes('?') && !path.endsWith('/')) {
      url += '/';
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 3. Graceful error handling for completions
    if (response.status === 404 || response.status === 405) {
      if (path.includes('completions')) {
        return [] as any; 
      }
    }

    if (!response.ok) throw new Error(`Status ${response.status}`);
    return response.json();
  } catch (error) {
    // If the completions fetch fails, just return an empty array to keep the UI clean
    if (endpoint.includes('completions')) return [] as any;
    
    console.error(`[API ERROR] ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  getUsers: () => fetchJson<any[]>('/users/'),

  getUserProfile: async () => {
    const id = auth.getUserId();
    if (!id) throw new Error("NO_SESSION");
    
    // Try 'me' first, then specific ID, then list find
    try {
      return await fetchJson<any>('/users/me/');
    } catch {
      try {
        return await fetchJson<any>(`/users/${id}/`);
      } catch {
        const all = await fetchJson<any[]>('/users/');
        return all.find((u: any) => u.id === id) || null;
      }
    }
  },

  getUserCompletions: async () => {
    const id = auth.getUserId();
    if (!id) return [];
    
    // Attempt the path from your documentation
    try {
      const data = await fetchJson<any[]>(`/courses/users/${id}/completions/`);
      return Array.isArray(data) ? data : [];
    } catch {
      // If the "Get All" endpoint doesn't exist, return empty array
      // This stops the red 404/405 errors from crashing your dashboard
      return []; 
    }
  },

  getCourses: () => fetchJson<any[]>('/courses/'),
  
  getLessons: (courseId: number) => fetchJson<Lesson[]>(`/courses/${courseId}/lessons/`),

  // Path fixed to match documentation screenshot
  getRandomQuestionsByOrder: (courseId: number, orderIndex: number, count: number = 10) => 
    fetchJson<Question[]>(`/courses/${courseId}/lessons/order/${orderIndex}/questions/random?count=${count}`),
  
  markLessonComplete: (_courseId: number, lessonId: number) => {
    const userId = auth.getUserId();
    // Path fixed to match documentation screenshot
    return fetchJson(`/courses/users/${userId}/completions/${lessonId}/`, {
      method: 'POST'
    });
  }
};