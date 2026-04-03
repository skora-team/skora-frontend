import { useState, useEffect, useCallback } from 'react';

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: number;
  progress: number;
  target: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuestState {
  quests: Quest[];
  dailyBonus: number;
  allCompleted: boolean;
  lastResetDate: string;
}

const STORAGE_KEY = 'user_daily_quests';

const QUEST_TEMPLATES: Omit<Quest, 'progress' | 'completed'>[] = [
  {
    id: 'master_lesson',
    title: 'Master a Lesson',
    description: 'Answer 9 out of 10 questions correctly',
    icon: '⚔️',
    reward: 75,
    target: 9,
    difficulty: 'medium'
  },
  {
    id: 'build_streak',
    title: 'Fire it Up',
    description: 'Build a 5-question streak without wrong answers',
    icon: '🔥',
    reward: 60,
    target: 5,
    difficulty: 'medium'
  },
  {
    id: 'speed_challenge',
    title: 'Speed Runner',
    description: 'Complete a lesson in under 2 minutes',
    icon: '⚡',
    reward: 50,
    target: 120, // seconds
    difficulty: 'easy'
  }
];

export function useQuestSystem() {
  const [state, setState] = useState<QuestState>(() => {
    // Load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Check if we need to reset (new day)
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      
      if (parsed.lastResetDate !== todayStr) {
        // Reset for new day
        return generateNewDayQuests(todayStr);
      }
      
      return parsed;
    }
    
    // First time
    const todayStr = new Date().toISOString().split('T')[0];
    return generateNewDayQuests(todayStr);
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Mark quest as completed
  const completeQuest = useCallback((questId: string) => {
    setState(prev => {
      const quests = prev.quests.map(q => 
        q.id === questId ? { ...q, completed: true, progress: q.target } : q
      );
      const allCompleted = quests.every(q => q.completed);
      return {
        ...prev,
        quests,
        allCompleted
      };
    });
  }, []);

  // Update quest progress
  const updateQuestProgress = useCallback((questId: string, progress: number) => {
    setState(prev => {
      const quests = prev.quests.map(q => {
        if (q.id === questId) {
          const newProgress = Math.min(progress, q.target);
          const completed = newProgress >= q.target;
          return { ...q, progress: newProgress, completed };
        }
        return q;
      });
      const allCompleted = quests.every(q => q.completed);
      return {
        ...prev,
        quests,
        allCompleted
      };
    });
  }, []);

  // Get total XP reward for completed quests (including bonus)
  const calculateTotalReward = useCallback(() => {
    const questXp = state.quests
      .filter(q => q.completed)
      .reduce((sum, q) => sum + q.reward, 0);
    
    const dailyBonus = state.allCompleted ? 50 : 0;
    return { questXp, dailyBonus, total: questXp + dailyBonus };
  }, [state.quests, state.allCompleted]);

  // Reset all quests (for manual reset if needed)
  const resetQuests = useCallback(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    setState(generateNewDayQuests(todayStr));
  }, []);

  return {
    state,
    quests: state.quests,
    allCompleted: state.allCompleted,
    completeQuest,
    updateQuestProgress,
    calculateTotalReward,
    resetQuests
  };
}

// Helper function to generate new day quests
function generateNewDayQuests(dateStr: string): QuestState {
  const quests: Quest[] = QUEST_TEMPLATES.map(template => ({
    ...template,
    progress: 0,
    completed: false
  }));

  return {
    quests,
    dailyBonus: 0,
    allCompleted: false,
    lastResetDate: dateStr
  };
}
