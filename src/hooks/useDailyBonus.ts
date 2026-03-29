import { useState, useEffect, useCallback } from 'react';

const LAST_BONUS_DATE_KEY = 'last_bonus_date';
const DAILY_STREAK_KEY = 'daily_login_streak';
const BONUS_XP = 50;

export interface DailyBonusState {
  eligibleToday: boolean;
  daysInARow: number;
  lastBonusDate: string | null;
}

export function useDailyBonus() {
  const [bonus, setBonus] = useState<DailyBonusState>({
    eligibleToday: false,
    daysInARow: 0,
    lastBonusDate: null,
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const lastBonus = localStorage.getItem(LAST_BONUS_DATE_KEY);
    const streak = parseInt(localStorage.getItem(DAILY_STREAK_KEY) || '0', 10);

    // Check if user already got bonus today
    const eligibleToday = lastBonus !== today;

    // Count days in a row
    let newStreak = streak;
    if (eligibleToday && lastBonus) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      // If last bonus was yesterday, increment streak
      if (lastBonus === yesterdayStr) {
        newStreak = streak + 1;
      } else {
        // Otherwise reset streak
        newStreak = 1;
      }
    } else if (!lastBonus && eligibleToday) {
      newStreak = 1;
    }

    setBonus({
      eligibleToday,
      daysInARow: newStreak,
      lastBonusDate: lastBonus,
    });
  }, []);

  // Claim today's bonus
  const claimBonus = useCallback((): number => {
    const today = new Date().toISOString().split('T')[0];
    const lastBonus = localStorage.getItem(LAST_BONUS_DATE_KEY);

    if (lastBonus === today) {
      return 0; // Already claimed today
    }

    // Calculate streak
    let newStreak = 1;
    if (lastBonus) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastBonus === yesterdayStr) {
        const currentStreak = parseInt(localStorage.getItem(DAILY_STREAK_KEY) || '0', 10);
        newStreak = currentStreak + 1;
      }
    }

    // Save new bonus date and streak
    localStorage.setItem(LAST_BONUS_DATE_KEY, today);
    localStorage.setItem(DAILY_STREAK_KEY, newStreak.toString());

    // Update state
    setBonus({
      eligibleToday: false,
      daysInARow: newStreak,
      lastBonusDate: today,
    });

    return BONUS_XP;
  }, []);

  const getBonusMultiplier = useCallback((daysInARow: number): number => {
    // Bonus multiplier increases with streak
    // Day 1: 1x, Day 2: 1.1x, Day 3: 1.2x, Day 4: 1.3x, Day 5+: 1.5x
    if (daysInARow >= 5) return 1.5;
    return 1 + daysInARow * 0.1;
  }, []);

  return {
    bonus,
    claimBonus,
    getBonusMultiplier,
    bonusXP: BONUS_XP,
  };
}
