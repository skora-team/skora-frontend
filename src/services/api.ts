import type { AnswerOption, Completion, CourseProgress, Lesson, Question, QuizResult, QuizSubmission, RecommendationTarget } from '../types/api.types';

const BASE_URL = 'http://127.0.0.1:8000'; 
const PROGRESS_VERSION_KEY = 'progress_version';

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

function bumpProgressVersion() {
  localStorage.setItem(PROGRESS_VERSION_KEY, Date.now().toString());
}

function getProgressVersion() {
  return localStorage.getItem(PROGRESS_VERSION_KEY) ?? '0';
}

async function getOrHydrateUserId(): Promise<number | null> {
  const existingId = auth.getUserId();
  if (existingId) return existingId;

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const me = await fetchJson<{ id: number }>('/me/');
    if (me?.id) {
      auth.setUserId(me.id);
      return me.id;
    }
  } catch (error) {
    console.error('[SESSION] Failed to hydrate user id from /me:', error);
  }

  return null;
}

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

    const method = (options.method || 'GET').toUpperCase();

    // 3. Graceful error handling for completion reads only
    if (response.status === 404 || response.status === 405) {
      if (path.includes('completions') && method === 'GET') {
        return [] as any; 
      }
    }

    if (!response.ok) throw new Error(`Status ${response.status}`);
    return response.json();
  } catch (error) {
    const method = (options.method || 'GET').toUpperCase();

    // If completion reads fail, return empty array to keep dashboard UI stable
    if (endpoint.includes('completions') && method === 'GET') return [] as any;
    
    console.error(`[API ERROR] ${endpoint}:`, error);
    throw error;
  }
}

function normalizeRecommendationTarget(payload: unknown): RecommendationTarget {
  const source = (payload && typeof payload === 'object') ? payload as Record<string, unknown> : {};
  const courseId = typeof source.recommended_course_id === 'number' ? source.recommended_course_id : null;
  const lessonId = typeof source.recommended_lesson_id === 'number' ? source.recommended_lesson_id : null;
  const strategy = typeof source.strategy === 'string' ? source.strategy : undefined;
  const message = typeof source.message === 'string' ? source.message : undefined;
  const reason = typeof source.reason === 'string' ? source.reason : undefined;
  const recommendedQuizDifficulty = typeof source.recommended_quiz_difficulty === 'string'
    ? source.recommended_quiz_difficulty
    : undefined;
  const confidence = typeof source.confidence === 'number' ? source.confidence : undefined;
  const isComplete = strategy === 'complete' || lessonId === null;

  return {
    courseId,
    lessonId,
    strategy,
    message,
    reason,
    recommendedQuizDifficulty,
    confidence,
    isComplete
  };
}

export const api = {
  getUsers: () => fetchJson<any[]>('/users/'),

  getUserProfile: async () => {
    const id = await getOrHydrateUserId();
    if (!id) throw new Error("NO_SESSION");
    
    // Try the documented authenticated endpoint first, then list find.
    try {
      return await fetchJson<any>('/me/');
    } catch {
      try {
        const all = await fetchJson<any[]>('/users/');
        return all.find((u: any) => u.id === id) || null;
      } catch {
        return null;
      }
    }
  },

  getUserCompletions: async () => {
    const id = await getOrHydrateUserId();
    if (!id) return [];
    const progressVersion = getProgressVersion();
    
    // Attempt the path from your documentation
    try {
      const data = await fetchJson<Completion[]>(`/courses/users/${id}/completions/?v=${progressVersion}`);
      return Array.isArray(data) ? data : [];
    } catch {
      // If the "Get All" endpoint doesn't exist, return empty array
      // This stops the red 404/405 errors from crashing your dashboard
      return []; 
    }
  },

  getCourses: () => fetchJson<any[]>('/courses/'),

  getNextLearningRecommendation: async () => {
    const userId = await getOrHydrateUserId();
    if (!userId) throw new Error('NO_SESSION');
    const payload = await fetchJson<Record<string, unknown>>(`/courses/users/${userId}/recommendations/next`);
    return normalizeRecommendationTarget(payload);
  },

  getCourseProgress: async (courseId: number) => {
    const userId = await getOrHydrateUserId();
    if (!userId) throw new Error('NO_SESSION');
    const progressVersion = getProgressVersion();
    return fetchJson<CourseProgress>(`/courses/users/${userId}/courses/${courseId}/progress?v=${progressVersion}`);
  },
  
  getLessons: (courseId: number) => fetchJson<Lesson[]>(`/courses/${courseId}/lessons/`),

  getQuestionAnswers: (courseId: number, lessonId: number, questionId: number) =>
    fetchJson<AnswerOption[]>(`/courses/${courseId}/lessons/${lessonId}/questions/${questionId}/answers`),

  // Path fixed to match documentation screenshot
  getRandomQuestionsByOrder: (courseId: number, orderIndex: number, count: number = 10) => 
    fetchJson<Question[]>(`/courses/${courseId}/lessons/order/${orderIndex}/questions/random?count=${count}`),

  submitLessonQuiz: (lessonId: number, submission: QuizSubmission) =>
    fetchJson<QuizResult>(`/lessons/${lessonId}/submit`, {
      method: 'POST',
      body: JSON.stringify(submission)
    }),
  
  markLessonComplete: async (courseId: number, lessonId: number, score: number) => {
    const userId = await getOrHydrateUserId();
    if (!userId) throw new Error('NO_SESSION');
    return fetchJson<Completion>(`/users/${userId}/completions?lesson_id=${lessonId}&course_id=${courseId}&score=${score}`, {
      method: 'POST'
    }).then((completion) => {
      bumpProgressVersion();
      return completion;
    });
  }
};