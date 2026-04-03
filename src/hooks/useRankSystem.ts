import { useEffect, useState, useCallback } from 'react';

export interface RankInfo {
  rankId: 'recruit' | 'apprentice' | 'warrior' | 'champion' | 'legend';
  rankName: string;
  icon: string;
  level: number;
  lessonsCompleted: number;
  lessonsForNextRank: number;
  progressToNextRank: number; // 0-100%
  unlockedCosmetics: string[];
  description: string;
}

const RANKS = [
  {
    id: 'recruit' as const,
    name: 'Recruit',
    icon: '🥚',
    minLessons: 0,
    maxLessons: 3,
    description: 'Just started your journey',
    unlockedCosmetics: [],
  },
  {
    id: 'apprentice' as const,
    name: 'Apprentice',
    icon: '🌱',
    minLessons: 4,
    maxLessons: 7,
    description: 'Learning the basics',
    unlockedCosmetics: ['emerald_frame', 'scholar_title'],
  },
  {
    id: 'warrior' as const,
    name: 'Warrior',
    icon: '⚔️',
    minLessons: 8,
    maxLessons: 12,
    description: 'Ready for real challenges',
    unlockedCosmetics: ['gold_frame', 'warrior_title', 'red_theme'],
  },
  {
    id: 'champion' as const,
    name: 'Champion',
    icon: '🔥',
    minLessons: 13,
    maxLessons: 18,
    description: 'Mastering your skills',
    unlockedCosmetics: ['platinum_frame', 'champion_title', 'purple_theme'],
  },
  {
    id: 'legend' as const,
    name: 'Legend',
    icon: '👑',
    minLessons: 19,
    maxLessons: Infinity,
    description: 'You are the expert',
    unlockedCosmetics: ['diamond_frame', 'legend_title', 'gold_theme', 'halo_effect'],
  },
];

const STORAGE_KEY = 'user_rank_cosmetics';

export function useRankSystem(lessonsCompleted: number = 0) {
  const [rankInfo, setRankInfo] = useState<RankInfo | null>(null);
  const [allCosmetics, setAllCosmetics] = useState<Set<string>>(new Set());

  // Calculate rank from lessons completed
  const calculateRank = useCallback((lessons: number) => {
    const rank = RANKS.find(r => lessons >= r.minLessons && lessons <= r.maxLessons);
    return rank || RANKS[0]; // Default to Recruit
  }, []);

  // Initialize and update rank
  useEffect(() => {
    const currentRank = calculateRank(lessonsCompleted);
    
    // Find next rank
    const nextRankIndex = RANKS.findIndex(r => r.id === currentRank.id) + 1;
    const nextRank = nextRankIndex < RANKS.length ? RANKS[nextRankIndex] : null;
    
    // Calculate progress to next rank
    let lessonsForNextRank = nextRank ? nextRank.minLessons : currentRank.maxLessons + 1;
    let progressToNextRank = 100;
    
    if (nextRank) {
      const lessonsNeeded = nextRank.minLessons - currentRank.minLessons;
      const lessonsInCurrent = lessonsCompleted - currentRank.minLessons;
      progressToNextRank = Math.min(100, Math.round((lessonsInCurrent / lessonsNeeded) * 100));
    }

    // Calculate newly unlocked cosmetics
    const unlockedSet = new Set<string>();
    RANKS.forEach(r => {
      if (lessonsCompleted >= r.minLessons) {
        r.unlockedCosmetics.forEach(c => unlockedSet.add(c));
      }
    });

    // Load and update saved cosmetics
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedCosmetics = saved ? JSON.parse(saved) : [];
    const merged = new Set([...unlockedSet, ...savedCosmetics]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(merged)));
    setAllCosmetics(merged);

    setRankInfo({
      rankId: currentRank.id,
      rankName: currentRank.name,
      icon: currentRank.icon,
      level: RANKS.findIndex(r => r.id === currentRank.id) + 1,
      lessonsCompleted,
      lessonsForNextRank,
      progressToNextRank,
      unlockedCosmetics: Array.from(unlockedSet),
      description: currentRank.description,
    });
  }, [lessonsCompleted, calculateRank]);

  const getRankByLessons = useCallback((lessons: number) => {
    return calculateRank(lessons);
  }, [calculateRank]);

  const isCosmticUnlocked = useCallback(
    (cosmeticId: string) => allCosmetics.has(cosmeticId),
    [allCosmetics]
  );

  return {
    rankInfo,
    allCosmetics: Array.from(allCosmetics),
    isCosmticUnlocked,
    getRankByLessons,
  };
}
