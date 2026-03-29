import { useState, useCallback, useEffect } from 'react';

export interface GameStateMetrics {
  streak: number;
  totalXP: number;
  xpMultiplier: number;
  answeredQuestions: Set<number>;
  correctCount: number;
}

const STORAGE_KEY = (lessonId: number) => `game_state_lesson_${lessonId}`;

export function useGameState(lessonId: number) {
  const [metrics, setMetrics] = useState<GameStateMetrics>({
    streak: 0,
    totalXP: 0,
    xpMultiplier: 1,
    answeredQuestions: new Set(),
    correctCount: 0,
  });

  const [lastXPGain, setLastXPGain] = useState<{ amount: number; timestamp: number } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY(lessonId));
    if (saved) {
      const parsed = JSON.parse(saved);
      setMetrics({
        ...parsed,
        answeredQuestions: new Set(parsed.answeredQuestions),
      });
    }
  }, [lessonId]);

  // Calculate XP gained based on streak
  const calculateXP = useCallback((isCorrect: boolean): number => {
    const baseXP = 10;
    if (!isCorrect) return 0;
    
    const multiplier = 1 + (metrics.streak * 0.05); // 5% per streak
    return Math.floor(baseXP * multiplier);
  }, [metrics.streak]);

  // Handle answer result
  const recordAnswer = useCallback((questionId: number, isCorrect: boolean) => {
    setMetrics(prev => {
      const updated = { ...prev };
      updated.answeredQuestions.add(questionId);

      if (isCorrect) {
        updated.streak += 1;
        updated.xpMultiplier = 1 + (updated.streak * 0.05);
        const xpGain = Math.floor(10 * updated.xpMultiplier);
        updated.totalXP += xpGain;
        updated.correctCount += 1;
        
        // Trigger animation
        setLastXPGain({ amount: xpGain, timestamp: Date.now() });
        setTimeout(() => setLastXPGain(null), 1500);
      } else {
        updated.streak = 0;
        updated.xpMultiplier = 1;
      }

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY(lessonId), JSON.stringify({
        ...updated,
        answeredQuestions: Array.from(updated.answeredQuestions),
      }));

      return updated;
    });
  }, [lessonId]);

  // Reset on retry
  const resetMetrics = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY(lessonId));
    setMetrics({
      streak: 0,
      totalXP: 0,
      xpMultiplier: 1,
      answeredQuestions: new Set(),
      correctCount: 0,
    });
    setLastXPGain(null);
  }, [lessonId]);

  return {
    metrics,
    recordAnswer,
    resetMetrics,
    lastXPGain,
    calculateXP,
  };
}
