import { useState, useEffect, useCallback } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

type AchievementId = 
  | 'perfect_score' 
  | 'hot_streak' 
  | 'speed_runner' 
  | 'comeback_kid' 
  | 'consistency';

const ACHIEVEMENTS: Record<AchievementId, Omit<Achievement, 'unlocked' | 'unlockedAt'>> = {
  perfect_score: {
    id: 'perfect_score',
    name: 'Flawless',
    description: 'Score 10/10 on a lesson',
    icon: '🏆',
  },
  hot_streak: {
    id: 'hot_streak',
    name: 'On Fire',
    description: 'Get 5+ consecutive correct answers',
    icon: '🔥',
  },
  speed_runner: {
    id: 'speed_runner',
    name: 'Speed Runner',
    description: 'Complete a lesson in under 2 minutes',
    icon: '⚡',
  },
  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Score 8+ after a low previous score',
    icon: '💪',
  },
  consistency: {
    id: 'consistency',
    name: 'Consistency Master',
    description: 'Complete 3 lessons in one session',
    icon: '📚',
  },
};

const STORAGE_KEY = 'achievements';
const SESSION_STORAGE_KEY = 'session_lesson_count';

interface SessionMetrics {
  lessonCount: number;
  lastScores: Record<number, number>;
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load achievements from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const unlockedIds = JSON.parse(saved) as AchievementId[];
      const loaded = Object.values(ACHIEVEMENTS).map(ach => ({
        ...ach,
        unlocked: unlockedIds.includes(ach.id as AchievementId),
        unlockedAt: undefined,
      }));
      setAchievements(loaded);
    } else {
      const initial = Object.values(ACHIEVEMENTS).map(ach => ({
        ...ach,
        unlocked: false,
      }));
      setAchievements(initial);
    }
  }, []);

  // Initialize session metrics
  const getSessionMetrics = useCallback((): SessionMetrics => {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return { lessonCount: 0, lastScores: {} };
  }, []);

  // Update session metrics
  const updateSessionMetrics = useCallback((updates: Partial<SessionMetrics>) => {
    const current = getSessionMetrics();
    const updated = { ...current, ...updates };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
  }, [getSessionMetrics]);

  // Check and unlock achievements
  const checkAchievements = useCallback(
    (
      score: number,
      totalQuestions: number,
      streak: number,
      timeSeconds: number,
      lessonId: number
    ) => {
      const newlyUnlockedIds: AchievementId[] = [];
      const session = getSessionMetrics();

      // Perfect Score
      if (score === totalQuestions && !achievements.find(a => a.id === 'perfect_score')?.unlocked) {
        newlyUnlockedIds.push('perfect_score');
      }

      // Hot Streak
      if (streak >= 5 && !achievements.find(a => a.id === 'hot_streak')?.unlocked) {
        newlyUnlockedIds.push('hot_streak');
      }

      // Speed Runner (2 minutes = 120 seconds)
      if (timeSeconds < 120 && !achievements.find(a => a.id === 'speed_runner')?.unlocked) {
        newlyUnlockedIds.push('speed_runner');
      }

      // Comeback Kid (score 8+ after previous <5)
      const prevScore = session.lastScores[lessonId];
      if (
        score >= 8 &&
        prevScore !== undefined &&
        prevScore < 5 &&
        !achievements.find(a => a.id === 'comeback_kid')?.unlocked
      ) {
        newlyUnlockedIds.push('comeback_kid');
      }

      // Consistency (3 lessons completed)
      const newLessonCount = session.lessonCount + 1;
      if (
        newLessonCount >= 3 &&
        !achievements.find(a => a.id === 'consistency')?.unlocked
      ) {
        newlyUnlockedIds.push('consistency');
      }

      // Update session
      updateSessionMetrics({
        lessonCount: newLessonCount,
        lastScores: { ...session.lastScores, [lessonId]: score },
      });

      // Save newly unlocked achievements
      if (newlyUnlockedIds.length > 0) {
        const currentUnlocked = achievements
          .filter(a => a.unlocked)
          .map(a => a.id as AchievementId);
        const allUnlocked = [...currentUnlocked, ...newlyUnlockedIds];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allUnlocked));

        setAchievements(prev =>
          prev.map(ach => ({
            ...ach,
            unlocked: allUnlocked.includes(ach.id as AchievementId),
            unlockedAt: newlyUnlockedIds.includes(ach.id as AchievementId)
              ? Date.now()
              : ach.unlockedAt,
          }))
        );
      }

      return newlyUnlockedIds;
    },
    [achievements, getSessionMetrics, updateSessionMetrics]
  );

  const resetSessionMetrics = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  return {
    achievements,
    checkAchievements,
    resetSessionMetrics,
  };
}
